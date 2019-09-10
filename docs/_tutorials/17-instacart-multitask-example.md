---
title:  Instacart Multitask Example
short_title:  Instacart Multitask Example
description: Deep learning tutorial using Eclipse Deeplearning4j for  Instacart Multitask Example
category: Tutorials
json_link: 17.%20Instacart%20Multitask%20Example.json
---

### Note

Please view the
[README](https://github.com/eclipse/deeplearning4j/tree/master/dl4j-
examples/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

In this tutorial we will use a LSTM neural network to predict
instacart users' purchasing behavior given a history of their past orders. The
data originially comes from a Kaggle challenge (kaggle.com/c/instacart-market-
basket-analysis). We first removed users that only made 1 order using the
instacart app and then took 5000 users out of the remaining to be part of the
data for this tutorial. 

For each order, we have information on the product the
user purchased. For example, there is information on the product name, what
aisle it is found in, and the department it falls under. To construct features,
we extracted indicators representing whether or not a user purchased a product
in the given aisles for each order. In total there are 134 aisles. The targets
were whether or not a user will buy a product in the breakfast department in the
next order. We also used auxiliary targets to train this LSTM. The auxiliary
targets were whether or not a user will buy a product in the dairy department in
the next order.

We suspect that a LSTM will be effective for this task, because
of the temporal dependencies in the data.

### Imports

```java
import org.deeplearning4j.nn.api.OptimizationAlgorithm;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.Updater;
import org.deeplearning4j.nn.conf.layers.LSTM;
import org.deeplearning4j.nn.weights.WeightInit;
import org.nd4j.linalg.activations.Activation;
import org.deeplearning4j.nn.conf.layers.RnnOutputLayer;
import org.nd4j.linalg.lossfunctions.LossFunctions.LossFunction;
import org.deeplearning4j.nn.conf.GradientNormalization;
import org.deeplearning4j.eval.ROC;
import org.datavec.api.records.reader.impl.csv.CSVSequenceRecordReader;
import org.datavec.api.records.reader.SequenceRecordReader;
import org.datavec.api.split.NumberedFileInputSplit;
import org.deeplearning4j.datasets.datavec.RecordReaderMultiDataSetIterator;
import org.nd4j.linalg.dataset.api.iterator.MultiDataSetIterator;
import org.deeplearning4j.nn.conf.ComputationGraphConfiguration;
import org.deeplearning4j.nn.graph.ComputationGraph;
import org.nd4j.linalg.dataset.api.MultiDataSet;
import org.nd4j.linalg.api.ndarray.INDArray;
import java.io.File;
import java.net.URL;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
```

 

### Download Data

To download the data, we will create a temporary directory that will store the
data files, extract the tar.gz file from the url, and place it in the specified
directory.

```java
val DATA_URL = "https://bpstore1.blob.core.windows.net/tutorials/instacart.tar.gz"
val DATA_PATH = FilenameUtils.concat(System.getProperty("java.io.tmpdir"), "dl4j_instacart/")
```

```java
val directory = new File(DATA_PATH)
directory.mkdir() 

val archizePath = DATA_PATH + "instacart.tar.gz"
val archiveFile = new File(archizePath)
val extractedPath = DATA_PATH + "instacart" 
val extractedFile = new File(extractedPath)

FileUtils.copyURLToFile(new URL(DATA_URL), archiveFile) 
```

We will then extract the data from the tar.gz file, recreate directories within
the tar.gz file into our temporary directories, and copy the files from the
tar.gz file.

```java
var fileCount = 0
var dirCount = 0
val BUFFER_SIZE = 4096
val tais = new TarArchiveInputStream(new GzipCompressorInputStream( new BufferedInputStream( new FileInputStream(archizePath))))

var entry = tais.getNextEntry().asInstanceOf[TarArchiveEntry]

while(entry != null){
    if (entry.isDirectory()) {
        new File(DATA_PATH + entry.getName()).mkdirs()
        dirCount = dirCount + 1
        fileCount = 0
    }
    else {
        
        val data = new Array[scala.Byte](4 * BUFFER_SIZE)

        val fos = new FileOutputStream(DATA_PATH + entry.getName());
        val dest = new BufferedOutputStream(fos, BUFFER_SIZE);
        var count = tais.read(data, 0, BUFFER_SIZE)
        
        while (count != -1) {
            dest.write(data, 0, count)
            count = tais.read(data, 0, BUFFER_SIZE)
        }
        
        dest.close()
        fileCount = fileCount + 1
    }
    if(fileCount % 1000 == 0){
        print(".")
    }
    
    entry = tais.getNextEntry().asInstanceOf[TarArchiveEntry]
}
```

### DataSetIterators

Next we will convert the raw data (csv files) into DataSetIterators, which will
be fed into a neural network. Our training data will have 4000 examples which
will be represented by a single DataSetIterator, and the testing data will have
1000 examples which will be represented by a separate DataSetIterator.

```java
val path = FilenameUtils.concat(DATA_PATH, "instacart/") // set parent directory

val featureBaseDir = FilenameUtils.concat(path, "features") // set feature directory
val targetsBaseDir = FilenameUtils.concat(path, "breakfast") // set label directory
val auxilBaseDir = FilenameUtils.concat(path, "dairy") // set futures directory
```

We first initialize CSVSequenceRecordReaders, which will parse the raw data into
record-like format. Because we will be using multitask learning, we will use two
outputs. Thus we need three RecordReaders in total: one for the input, another
for the first target, and the last for the second target. Next, we will need the
RecordreaderMultiDataSetIterator, since we now have two outputs. We can add our
SequenceRecordReaders using the addSequenceReader methods and specify the input
and both outputs. The ALIGN_END alignment mode is used, since the sequences for
each example vary in length.

We will create DataSetIterators for both the
training data and the test data.

```java
val trainFeatures = new CSVSequenceRecordReader(1, ",");
trainFeatures.initialize( new NumberedFileInputSplit(featureBaseDir + "/%d.csv", 1, 4000));

val trainBreakfast = new CSVSequenceRecordReader(1, ",");
trainBreakfast.initialize( new NumberedFileInputSplit(targetsBaseDir + "/%d.csv", 1, 4000));

val trainDairy = new CSVSequenceRecordReader(1, ",");
trainDairy.initialize(new NumberedFileInputSplit(auxilBaseDir + "/%d.csv", 1, 4000));

val train =  new RecordReaderMultiDataSetIterator.Builder(20)
    .addSequenceReader("rr1", trainFeatures).addInput("rr1")
    .addSequenceReader("rr2",trainBreakfast).addOutput("rr2")
    .addSequenceReader("rr3",trainDairy).addOutput("rr3")
    .sequenceAlignmentMode(RecordReaderMultiDataSetIterator.AlignmentMode.ALIGN_END)
    .build();
```

```java
val testFeatures = new CSVSequenceRecordReader(1, ",");
testFeatures.initialize( new NumberedFileInputSplit(featureBaseDir + "/%d.csv", 4001, 5000));

val testBreakfast = new CSVSequenceRecordReader(1, ",");
testBreakfast.initialize( new NumberedFileInputSplit(targetsBaseDir + "/%d.csv", 4001, 5000));

val testDairy = new CSVSequenceRecordReader(1, ",");
testDairy.initialize(new NumberedFileInputSplit(auxilBaseDir + "/%d.csv", 4001, 5000));

val test =  new RecordReaderMultiDataSetIterator.Builder(20)
    .addSequenceReader("rr1", testFeatures).addInput("rr1")
    .addSequenceReader("rr2",testBreakfast).addOutput("rr2")
    .addSequenceReader("rr3",testDairy).addOutput("rr3")
    .sequenceAlignmentMode(RecordReaderMultiDataSetIterator.AlignmentMode.ALIGN_END)
    .build();
```

 

### Neural Network

The next task is to set up the neural network configuration. We see below that
the ComputationGraph class is used to create a LSTM with two outputs. We can set
the outputs using the setOutputs method of the NeuralNetConfiguraitonBuilder.
One GravesLSTM layer and two RnnOutputLayers will be used. We will also set
other hyperparameters of the model, such as dropout, weight initialization,
updaters, and activation functions.

```java
val conf = new NeuralNetConfiguration.Builder()
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .seed(12345)
    .weightInit(WeightInit.XAVIER)
    .dropOut(0.25)
    .graphBuilder()
    .addInputs("input")
    .addLayer("L1", new LSTM.Builder()
        .nIn(134).nOut(150)
        .updater(Updater.ADAM)
        .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)
        .gradientNormalizationThreshold(10)
        .activation(Activation.TANH)
        .build(), "input")
    .addLayer("out1", new RnnOutputLayer.Builder(LossFunction.XENT)
        .updater(Updater.ADAM)
        .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)
        .gradientNormalizationThreshold(10)
        .activation(Activation.SIGMOID)
        .nIn(150).nOut(1).build(), "L1")
    .addLayer("out2", new RnnOutputLayer.Builder(LossFunction.XENT)
        .updater(Updater.ADAM)
        .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)
        .gradientNormalizationThreshold(10)
        .activation(Activation.SIGMOID)
        .nIn(150).nOut(1).build(), "L1")
    .setOutputs("out1","out2")
    .pretrain(false).backprop(true)
    .build();
```

We must then initialize the neural network.

```java
val net = new ComputationGraph(conf);
net.init();
```

### Model Training

To train the model, we use 5 epochs with a for loop and simply call the fit
method of the ComputationGraph.

```java
for( epoch <- 1 to 5){
    println("Epoch "+ epoch);
    net.fit( train );
    train.reset();
}
```

### Model Evaluation

We will now evaluate our trained model on the original task, which was
predicting whether or not a user will purchase a product in the breakfast
department. Note that we will use the area under the curve (AUC) metric of the
ROC curve.

```java
// Evaluate model

val roc = new ROC();

test.reset();

while(test.hasNext()){
    val next = test.next();
    val features =  next.getFeatures();
    val output = net.output(features(0));
    roc.evalTimeSeries(next.getLabels()(0), output(0));
}

println(roc.calculateAUC());
```

We achieve a AUC of 0.75!
