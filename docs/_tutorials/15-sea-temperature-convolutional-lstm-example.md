---
title:  Sea Temperature Convolutional LSTM Example
short_title:  Sea Temperature Convolutional LSTM Example
description: Deep learning tutorial using Eclipse Deeplearning4j for  Sea Temperature Convolutional LSTM Example
category: Tutorials
json_link: 15.%20Sea%20Temperature%20Convolutional%20LSTM%20Example.json
---

### Note

Please view the
[README](https://github.com/eclipse/deeplearning4j/tree/master/dl4j-
examples/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

In this tutorial we will use a neural network to forecast daily
sea temperatures. The data consists of 2-dimensional temperature grids of 8
seas: Bengal, Korean, Black, Mediterranean, Arabian, Japan, Bohai, and Okhotsk
Seas from 1981 to 2017. The raw data was taken from the Earth System Research
Laboratory (https://www.esrl.noaa.gov/psd/) and preprocessed into CSV file. Each
example consists of fifty 2-dimensional temperature grids, and every grid is
represented by a single row in a CSV file. Thus, each sequence is represented by
a CSV file with 50 rows.

For this task, we will use a convolutional LSTM neural
network to forecast next-day sea temperatures for a given sequence of
temperature grids. Recall, a convolutional network is most often used for image
data like the MNIST dataset (dataset of handwritten images). A convolutional
network is appropriate for this type of gridded data, since each point in the
2-dimensional grid is related to its neighbor points. Furthermore, the data is
sequential, and each temperature grid is related to the previous grids. Because
of these long and short term dependencies, a LSTM is fitting for this task too.
For these two reasons, we will combine the aspects from these two different
neural network architectures into a single convolutional LSTM network.

For more
information on the convolutional LSTM network structure, see https://www.cv-
foundation.org/openaccess/content_cvpr_2015/papers/Ng_Beyond_Short_Snippets_2015_CVPR_paper.pdf

### Imports

```java
import org.deeplearning4j.nn.api.OptimizationAlgorithm;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.LSTM;
import org.deeplearning4j.nn.weights.WeightInit;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator;
import org.deeplearning4j.nn.conf.layers.RnnOutputLayer;
import org.deeplearning4j.datasets.datavec.SequenceRecordReaderDataSetIterator;
import org.nd4j.linalg.lossfunctions.LossFunctions.LossFunction;
import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.nd4j.linalg.dataset.DataSet;
import org.deeplearning4j.nn.conf.preprocessor.RnnToCnnPreProcessor;
import org.deeplearning4j.nn.conf.preprocessor.CnnToRnnPreProcessor;
import org.deeplearning4j.nn.conf.GradientNormalization;
import org.deeplearning4j.nn.conf.layers;
import org.deeplearning4j.eval.RegressionEvaluation;
import org.deeplearning4j.nn.conf.layers.ConvolutionLayer.Builder;
import org.deeplearning4j.nn.conf.layers.ConvolutionLayer;
import org.deeplearning4j.nn.conf.Updater;

import org.datavec.api.records.reader.impl.csv.CSVSequenceRecordReader;
import org.datavec.api.records.reader.SequenceRecordReader;
import org.datavec.api.split.NumberedFileInputSplit;

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
val DATA_URL = "https://bpstore1.blob.core.windows.net/seatemp/sea_temp.tar.gz"
val DATA_PATH = FilenameUtils.concat(System.getProperty("java.io.tmpdir"), "dl4j_seas/")
```

```java
val directory = new File(DATA_PATH)
directory.mkdir() 

val archizePath = DATA_PATH + "sea_temp.tar.gz"
val archiveFile = new File(archizePath)
val extractedPath = DATA_PATH + "sea_temp" 
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
be fed into a neural network. Our training data will have 1700 examples which
will be represented by a single DataSetIterator, and the testing data will have
404 examples which will be represented by a separate DataSet Iterator.

```java
val path = FilenameUtils.concat(DATA_PATH, "sea_temp/") // set parent directory

val featureBaseDir = FilenameUtils.concat(path, "features") // set feature directory
val targetsBaseDir = FilenameUtils.concat(path, "targets") // set label directory
```

We first initialize CSVSequenceRecordReaders, which will parse the raw data into
record-like format. Then the SequenceRecordReaderDataSetIterators can be created
using the RecordReaders. Since each example has exaclty 50 timesteps, an
alignment mode of equal length is needed. Note also that this is a regression-
based task and not a classification one.

```java
val numSkipLines = 1;
val regression = true;
val batchSize = 32;

val trainFeatures = new CSVSequenceRecordReader(numSkipLines, ",");
trainFeatures.initialize( new NumberedFileInputSplit(featureBaseDir + "/%d.csv", 1, 1936));
val trainTargets = new CSVSequenceRecordReader(numSkipLines, ",");
trainTargets.initialize(new NumberedFileInputSplit(targetsBaseDir + "/%d.csv", 1, 1936));

val train = new SequenceRecordReaderDataSetIterator(trainFeatures, trainTargets, batchSize,
                10, regression, SequenceRecordReaderDataSetIterator.AlignmentMode.EQUAL_LENGTH);
                
                
val testFeatures = new CSVSequenceRecordReader(numSkipLines, ",");
testFeatures.initialize( new NumberedFileInputSplit(featureBaseDir + "/%d.csv", 1937, 2089));
val testTargets = new CSVSequenceRecordReader(numSkipLines, ",");
testTargets.initialize(new NumberedFileInputSplit(targetsBaseDir + "/%d.csv", 1937, 2089));

val test = new SequenceRecordReaderDataSetIterator(testFeatures, testTargets, batchSize,
                10, regression, SequenceRecordReaderDataSetIterator.AlignmentMode.EQUAL_LENGTH);
```

 

### Neural Network

The next task is to initialize the  parameters for the convolutional LSTM neural
network and then set up the neural network configuration.

```java
val V_HEIGHT = 13;
val V_WIDTH = 4;
val kernelSize = 2;
val numChannels = 1;
```

In the neural network configuraiton we will use the convolutional layer, LSTM
layer, and output layer in success. In order to do this, we need to use the
RnnToCnnPreProcessor and CnnToRnnPreprocessor. The RnnToCnnPreProcessor is used
to reshape the 3-dimensional input from [batch size, height x width of grid,
time series length ] into a 4 dimensional shape [number of examples x time
series length , channels, width, height] which is suitable as input to a
convolutional layer. The CnnToRnnPreProcessor is then used in a later layer to
convert this convolutional shape back to the original 3-dimensional shape.

```java
val conf = new NeuralNetConfiguration.Builder()
                .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
                .seed(12345)
                .weightInit(WeightInit.XAVIER)
                .list()
                .layer(0, new ConvolutionLayer.Builder(kernelSize, kernelSize)
                        .updater(Updater.ADAGRAD)
                        //.learningRate(0.005)
                        .nIn(1) //1 channel
                        .nOut(7)
                        .stride(2, 2)
                        .activation(Activation.RELU)
                        .build())
                .layer(1, new LSTM.Builder()
                        .activation(Activation.SOFTSIGN)
                        .nIn(84)
                        .nOut(200)
                        .updater(Updater.ADAGRAD)
                        //.learningRate(0.0005)
                        .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)
                        .gradientNormalizationThreshold(10)
                        .build())
                .layer(2, new RnnOutputLayer.Builder(LossFunction.MSE)
                        .activation(Activation.IDENTITY)
                        .nIn(200)
                        .updater(Updater.ADAGRAD)
                        //.learningRate(0.0005)
                        .nOut(52)
                        .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)
                        .gradientNormalizationThreshold(10)
                        .build())
                .inputPreProcessor(0, new RnnToCnnPreProcessor(V_HEIGHT, V_WIDTH, numChannels))
                .inputPreProcessor(1, new CnnToRnnPreProcessor(6, 2, 7 ))
                .pretrain(false).backprop(true)
                .build();
                
val net = new MultiLayerNetwork(conf);
net.init();
```

### Model Training

To train the model, we use 25 epochs with a for loop and simply call the fit
method of the MultiLayerNetwork.

```java
// Train model on training set

for( epoch <- 1 to 25){
    println("Epoch "+ epoch);
    net.fit( train );
    train.reset();
}
```

### Model Evaluation

We will now evaluate our trained model. Note that we will use
RegressionEvaluation, since our task is a regression and not a classification
task.

```java
val eval = net.evaluateRegression(test);

test.reset();
println()

println( eval.stats() );
```
