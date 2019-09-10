---
title:  Instacart Single Task Example
short_title:  Instacart Single Task Example
description: Deep learning tutorial using Eclipse Deeplearning4j for  Instacart Single Task Example
category: Tutorials
json_link: 18.%20Instacart%20Single%20Task%20Example.json
---

### Note

Please view the
[README](https://github.com/eclipse/deeplearning4j/tree/master/dl4j-
examples/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

This tutorial will be similar to the Instacart Multitask
tutorial. The only difference is that we will not use multitasking to train our
neural network. Recall the data originially comes from a Kaggle challenge
(kaggle.com/c/instacart-market-basket-analysis). We removed users that only made
1 order using the instacart app and then took 5000 users out of the remaining to
be part of the data for this tutorial. 

For each order, we have information on
the product the user purchased. For example, there is information on the product
name, what aisle it is found in, and the department it falls under. To construct
features, we extracted indicators representing whether or not a user purchased a
product in the given aisles for each order. In total there are 134 aisles. The
targets were whether or not a user will buy a product in the breakfast
department in the next order. As mentioned, we will not use any auxiliary
targets.

Because of temporal dependencies within the data, we used a LSTM
network for our model.

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
import org.deeplearning4j.datasets.datavec.SequenceRecordReaderDataSetIterator;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
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
```

We first initialize CSVSequenceRecordReaders, which will parse the raw data into
record-like format. Then the SequenceRecordReaderDataSetIterators can be created
using the RecordReaders. Since each example has sequences of different lengths,
an alignment mode of align end is needed.

```java
val trainFeatures = new CSVSequenceRecordReader(1, ",");
trainFeatures.initialize( new NumberedFileInputSplit(featureBaseDir + "/%d.csv", 1, 4000));
val trainLabels = new CSVSequenceRecordReader(1, " ");
trainLabels.initialize(new NumberedFileInputSplit(targetsBaseDir + "/%d.csv", 1, 4000));

val train = new SequenceRecordReaderDataSetIterator(trainFeatures, trainLabels, 32,
    2, false, SequenceRecordReaderDataSetIterator.AlignmentMode.ALIGN_END);

val testFeatures = new CSVSequenceRecordReader(1, ",");
testFeatures.initialize( new NumberedFileInputSplit(featureBaseDir + "/%d.csv", 4001, 5000));
val testLabels = new CSVSequenceRecordReader(1, " ");
testLabels.initialize(new NumberedFileInputSplit(targetsBaseDir + "/%d.csv", 4001, 5000));

val test = new SequenceRecordReaderDataSetIterator(testFeatures, testLabels, 32,
    2, false, SequenceRecordReaderDataSetIterator.AlignmentMode.ALIGN_END);;
```

 

### Neural Network

The next task is to set up the neural network configuration. We will use a
MultiLayerNetwork and the configuration will be similar to the multitask model
from before. Again we use one GravesLSTM layer but this time only one
RnnOutputLayer.

```java
val conf = new NeuralNetConfiguration.Builder()
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .seed(12345)
    .dropOut(0.25)
    .weightInit(WeightInit.XAVIER)
    .updater(Updater.ADAM)
    .list()
    .layer(0, new LSTM.Builder()
        .activation(Activation.TANH)
        .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)
        .gradientNormalizationThreshold(10)
        .nIn(134)
        .nOut(150)
        .build())
    .layer(1, new RnnOutputLayer.Builder(LossFunction.XENT)
        .activation(Activation.SOFTMAX)
        .nIn(150)
        .nOut(2)
        .build())
.pretrain(false).backprop(true)
.build();
```

We must then initialize the neural network.

```java
val net = new MultiLayerNetwork(conf);
net.init();
```

### Model Training

To train the model, we use 5 epochs with a for loop and simply call the fit
method of the MultiLayerNetwork.

```java
for( epoch <- 1 to 5){
    println("Epoch "+ epoch);
    net.fit( train );
    train.reset();
}
```

### Model Evaluation

We will now evaluate our trained model. Note that we will use the area under the
curve (AUC) metric of the ROC curve.

```java
// Evaluate the model

val roc = new ROC(100);

while(test.hasNext()){
    val next = test.next();
    val features = next.getFeatures();
    val output = net.output(features);
    roc.evalTimeSeries(next.getLabels(), output);
}
println(roc.calculateAUC());
```

We achieve a AUC of 0.64!
