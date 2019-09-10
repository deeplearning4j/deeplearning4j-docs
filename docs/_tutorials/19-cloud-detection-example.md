---
title:  Cloud Detection Example
short_title:  Cloud Detection Example
description: Deep learning tutorial using Eclipse Deeplearning4j for  Cloud Detection Example
category: Tutorials
json_link: 19.%20Cloud%20Detection%20Example.json
---

### Note

Please view the
[README](https://github.com/eclipse/deeplearning4j/tree/master/dl4j-
examples/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

In this tutorial, we will apply a neural network model to a cloud detection
application using satellite imaging data. The data is from NASA's Multi-angle
Imaging SpectroRadiometer (MISR) which was launched in 1999. The MISR has nine
cameras that view the Earth from nine different directions which allows the MISR
to measure elevations and angular radiance signatures of objects. We will use
the radiances measured from the MISR and features developed using domain
expertise to learn to detect whether clouds are present in polar regions. This
is a particularly challenging task due to the snow and ice covering the ground
surfaces.

### Imports

```java
import org.datavec.api.records.reader.impl.csv.CSVRecordReader;
import org.deeplearning4j.eval.ROC;
import org.deeplearning4j.nn.api.OptimizationAlgorithm;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.Updater;
import org.deeplearning4j.nn.conf.layers.DenseLayer;
import org.deeplearning4j.nn.weights.WeightInit;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.datavec.api.records.reader.RecordReader;
import org.datavec.api.split.FileSplit;
import org.deeplearning4j.datasets.datavec.RecordReaderMultiDataSetIterator;
import org.deeplearning4j.nn.conf.layers.OutputLayer;
import org.deeplearning4j.eval.Evaluation;
import org.nd4j.linalg.dataset.api.iterator.MultiDataSetIterator;
import org.nd4j.linalg.dataset.api.MultiDataSet;
import org.deeplearning4j.nn.conf.ComputationGraphConfiguration;
import org.nd4j.linalg.lossfunctions.LossFunctions;
import org.deeplearning4j.nn.conf.graph.MergeVertex;
import org.deeplearning4j.nn.graph.ComputationGraph;

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

### Data

The data is taken from MISR measurements and expert features of 3 images of
polar regions. For each location in the grid, there is an expert label whether
or not clouds are present and 8 features (radiances + expert labels). Data from
two images will comprise the training set and the left out image is in the test
set.

The data can be found in a tar.gz file located at the url provided below
in the next cell. It is organized into two directories (train and test). In each
directory there are five subdirectories: n1, n2, n3, n4, and n5. The data in n1
contains expert features and the label pertaining to a particular location in an
image. n2, n3, n4, and n5 contain the expert features corresponding to the
nearest locations to the original location. 

We will additionally use features
from a location's nearest neighbors as features to feed into our model, because
there are dependencies across neighboring locations. In other words, if a
location's neighbors have a positive cloud label, it is more likely for the
original location to have a positive cloud label as well. The reverse also
applies as well.

```java
val DATA_URL = "https://bpstore1.blob.core.windows.net/tutorials/Cloud.tar.gz"
val DATA_PATH = FilenameUtils.concat(System.getProperty("java.io.tmpdir"), "dl4j_cloud/")
```

### Download Data

To download the data, we will create a temporary directory that will store the
data files, extract the tar.gz file from the url, and place it in the specified
directory.

```java
val directory = new File(DATA_PATH)
directory.mkdir() 

val archizePath = DATA_PATH + "Cloud.tar.gz"
val archiveFile = new File(archizePath)
val extractedPath = DATA_PATH + "Cloud" 
val extractedFile = new File(extractedPath)

FileUtils.copyURLToFile(new URL(DATA_URL), archiveFile) 

```

 

Next, we must extract the data from the tar.gz file, recreate directories
within the tar.gz file into our temporary directory, and copy the files into our
temporary directory.

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

Our next goal is to convert the raw data (csv files) into a DataSetIterator,
which can then be fed into a neural network for training. We will first obtain
the paths containing the raw data, which is in csv file format.

```java
val path = FilenameUtils.concat(DATA_PATH, "Cloud/") // set parent directory

val trainBaseDir1 = FilenameUtils.concat(path, "train/n1/train.csv") 
val trainBaseDir2 = FilenameUtils.concat(path, "train/n2/train.csv")
val trainBaseDir3 = FilenameUtils.concat(path, "train/n3/train.csv")
val trainBaseDir4 = FilenameUtils.concat(path, "train/n4/train.csv")
val trainBaseDir5 = FilenameUtils.concat(path, "train/n5/train.csv") 

val testBaseDir1 = FilenameUtils.concat(path, "test/n1/test.csv")
val testBaseDir2 = FilenameUtils.concat(path, "test/n2/test.csv")
val testBaseDir3 = FilenameUtils.concat(path, "test/n3/test.csv")
val testBaseDir4 = FilenameUtils.concat(path, "test/n4/test.csv") 
val testBaseDir5 = FilenameUtils.concat(path, "test/n5/test.csv")


```

We then will create two DataSetIterators to feed the data into a neural network.
But first, we will initialize CSVRecordReaders to parse the raw data and convert
it to record-like format. We create separate CSVRecordReaders for the original
location and each nearest neighbor. Since the data is contained in separate
RecordReaders, we will use a RecordReaderMultiDataSetIterator, which allows for
multiple inputs or outputs. We then add the RecordReaders to the DataSetIterator
using the addReader method of the DataSetIterator.Builder() class. We specify
the inputs using the addInput method and the label using the addOutputOneHot
method.

```java
val rrTrain1 = new CSVRecordReader(1);
rrTrain1.initialize(new FileSplit(new File(trainBaseDir1)));
val rrTrain2 = new CSVRecordReader(1);
rrTrain2.initialize(new FileSplit(new File(trainBaseDir2)))

val rrTrain3 = new CSVRecordReader(1);
rrTrain3.initialize(new FileSplit(new File(trainBaseDir3)))

val rrTrain4 = new CSVRecordReader(1);
rrTrain4.initialize(new FileSplit(new File(trainBaseDir4)))

val rrTrain5 = new CSVRecordReader(1);
rrTrain5.initialize(new FileSplit(new File(trainBaseDir5)))


val trainIter = new RecordReaderMultiDataSetIterator.Builder(20)
        .addReader("rr1",rrTrain1)
        .addReader("rr2",rrTrain2)
        .addReader("rr3",rrTrain3)
        .addReader("rr4",rrTrain4)
        .addReader("rr5",rrTrain5)
        .addInput("rr1", 1, 3)
        .addInput("rr2", 0, 2)
        .addInput("rr3", 0, 2)
        .addInput("rr4", 0, 2)
        .addInput("rr5", 0, 2)
        .addOutputOneHot("rr1", 0, 2)
        .build();
```

The same process is applied to the testing data.

```java
val rrTest1 = new CSVRecordReader(1);
rrTest1.initialize(new FileSplit(new File(testBaseDir1)));

val rrTest2 = new CSVRecordReader(1);
rrTest2.initialize(new FileSplit(new File(testBaseDir2)));

val rrTest3 = new CSVRecordReader(1);
rrTest3.initialize(new FileSplit(new File(testBaseDir3)));

val rrTest4 = new CSVRecordReader(1);
rrTest4.initialize(new FileSplit(new File(testBaseDir4)));

val rrTest5 = new CSVRecordReader(1);
rrTest5.initialize(new FileSplit(new File(testBaseDir5)));

val testIter = new RecordReaderMultiDataSetIterator.Builder(20)
        .addReader("rr1",rrTest1)
        .addReader("rr2",rrTest2)
        .addReader("rr3",rrTest3)
        .addReader("rr4",rrTest4)
        .addReader("rr5",rrTest5)
        .addInput("rr1", 1, 3)
        .addInput("rr2", 0, 2)
        .addInput("rr3", 0, 2)
        .addInput("rr4", 0, 2)
        .addInput("rr5", 0, 2)
        .addOutputOneHot("rr1", 0, 2)
        .build();
```

### Neural Net Configuration

Now that the DataSetIterators are initialized, we can now specify the
configuration of the neural network. We will ultimately use a ComputationGraph
since we will have multiple inputs to the network. MultiLayerNetworks cannot be
used when there are multiple inputs and/or outputs. 

To specify the network
architecture and the hyperparameters, we use the NeuralNetConfiguraiton.Builder
class. We can add each input using the addLayer method of the class. Because the
inputs are separate, the addVertex method is used to add a MergeVertex to the
network. This vertex will merge the outputs from the previous input layers into
a combined representation. Finally, a fully connected layer is applied to the
merged output, which passes the activations to the final output layer.

The
other hyperparameters, such as the optimization algorithm, updater, number of
hidden nodes, and etc are also specified in this block of code as well.

```java
val conf = new NeuralNetConfiguration.Builder()
        .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
        .updater(Updater.ADAM)
        .graphBuilder()
        .addInputs("input1", "input2", "input3", "input4", "input5")
        .addLayer("L1", new DenseLayer.Builder()
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.RELU)
            .nIn(3).nOut(50)
            .build(), "input1")
        .addLayer("L2", new DenseLayer.Builder()
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.RELU)
            .nIn(3).nOut(50)
            .build(), "input2")
        .addLayer("L3", new DenseLayer.Builder()
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.RELU)
            .nIn(3).nOut(50)
            .build(), "input3")
        .addLayer("L4", new DenseLayer.Builder()
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.RELU)
            .nIn(3).nOut(50)
            .build(), "input4")
        .addLayer("L5", new DenseLayer.Builder()
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.RELU)
            .nIn(3).nOut(50)
            .build(), "input5")
        .addVertex("merge", new MergeVertex(), "L1", "L2", "L3", "L4", "L5")
        .addLayer("L6", new DenseLayer.Builder()
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.RELU)
            .nIn(250).nOut(125).build(), "merge")
        .addLayer("out", new OutputLayer.Builder()
            .lossFunction(LossFunctions.LossFunction.MCXENT)
            .weightInit(WeightInit.XAVIER)
            .activation(Activation.SOFTMAX)
            .nIn(125)
            .nOut(2).build(), "L6")
        .setOutputs("out")
        .pretrain(false).backprop(true)
        .build();
```

### Model Training

We are now ready to train our model. We initialize our ComptutationGraph and
loop over the number of epochs and call the fit method of the ComputationGraph
to train our specified model.

```java
val model = new ComputationGraph(conf);
model.init()
for ( epoch <- 1 to 5) {
    println("Epoch number: " + epoch );
    model.fit( trainIter );
}
```

 
To evaluate our model, we simply use the evaluateROC method of the
ComptuationGraph class.

```java
val roc = model.evaluateROC(testIter, 100)
```

Finally we can print out the area under the curve (AUC) metric!

```java
println("FINAL TEST AUC: " + roc.calculateAUC());
```
