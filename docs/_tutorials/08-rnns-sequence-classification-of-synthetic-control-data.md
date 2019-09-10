---
title:  RNNs- Sequence Classification of Synthetic Control Data
short_title:  RNNs- Sequence Classification of Synthetic Control Data
description: Deep learning tutorial using Eclipse Deeplearning4j for  RNNs- Sequence Classification of Synthetic Control Data
category: Tutorials
json_link: 08.%20RNNs-%20Sequence%20Classification%20of%20Synthetic%20Control%20Data.json
---

### Note

View the README.md [here](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies and importing notebooks in Zeppelin

### Background

Recurrent neural networks (RNN's) are used when the input is
sequential in nature. Typically RNN's are much more effective than regular feed
forward neural networks for sequential data because they can keep track of
dependencies in the data over multiple time steps. This is possible because the
output of a RNN at a time step depends on the current input and the output of
the previous time step. 

RNN's can also be applied to situations where the
input is sequential but the output isn't. In these cases the output of the last
time step of the RNN is typically taken as the output for the overall
observation. For classification, the output of the last time step will be the
predicted class label for the observation. 

In this notebook we will show how
to build a RNN using the MultiLayerNetwork class of deeplearning4j (DL4J). This
tutorial will focus on applying a RNN for a classification task. We will be
using the MNIST data, which is a dataset that consists of images of handwritten
digits, as the input for the RNN. Although the MNIST data isn't time series in
nature, we can interpret it as such since there are 784 inputs. Thus, each
observation or image will be interpreted to have 784 time steps consisting of
one scalar value for a pixel. Note that we use a RNN for this task for purely
pedagogical reasons. In practice, convolutional neural networks (CNN's) are
better suited for image classification tasks.

### Imports

```java
import org.deeplearning4j.eval.Evaluation
import org.deeplearning4j.nn.api.OptimizationAlgorithm
import org.deeplearning4j.nn.conf.MultiLayerConfiguration
import org.deeplearning4j.nn.conf.NeuralNetConfiguration
import org.deeplearning4j.nn.conf.Updater
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.deeplearning4j.nn.conf.layers.{DenseLayer, GravesLSTM, OutputLayer, RnnOutputLayer}
import org.deeplearning4j.nn.conf.distribution.UniformDistribution
import org.deeplearning4j.nn.conf.layers.GravesLSTM
import org.deeplearning4j.nn.conf.layers.RnnOutputLayer
import org.deeplearning4j.datasets.datavec.SequenceRecordReaderDataSetIterator
import org.deeplearning4j.optimize.listeners.ScoreIterationListener

import org.datavec.api.split.NumberedFileInputSplit
import org.datavec.api.records.reader.impl.csv.CSVSequenceRecordReader

import org.nd4j.linalg.dataset.DataSet
import org.nd4j.linalg.lossfunctions.LossFunctions.LossFunction
import org.nd4j.linalg.api.ndarray.INDArray
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.apache.commons.io.IOUtils

import java.nio.charset.Charset
import java.util.Random
import java.net.URL
```

### Download the dataset

UCI has a number of datasets available for machine
learning, make sure you have enough space on your local disk. The UCI synthetic
control dataset can be found at
[http://archive.ics.uci.edu/ml/datasets/synthetic+control+chart+time+series](http://archive.ics.uci.edu/ml/datasets/synthetic+control+chart+time+series).
The code below will check if the data already exists and download the file.

```java
val dataPath = new File(cache, "/uci_synthetic_control/")

if(!dataPath.exists()) {
    val url = "https://archive.ics.uci.edu/ml/machine-learning-databases/synthetic_control-mld/synthetic_control.data"
    println("Downloading file...")
    val data = IOUtils.toString(new URL(url), Charset.defaultCharset())
    val lines = data.split("\n")

    var lineCount = 0;
    var index = 0

    val linesList = scala.collection.mutable.ListBuffer.empty[String]
    println("Extracting file...")

    for (line <- lines) {
        val count = new java.lang.Integer(lineCount / 100)
        var newLine: String = null
        newLine = line.replaceAll("\\s+", ", " + count.toString() + "\n")
        newLine = line + ", " + count.toString()
        linesList.add(newLine)
        lineCount += 1
    }
    util.Random.shuffle(linesList)

    for (line <- linesList) {
        val outPath = new File(dataPath, index + ".csv")
        FileUtils.writeStringToFile(outPath, line, Charset.defaultCharset())
        index += 1
    }
    println("Done.")
} else {
    println("File already exists.")
}
```

### Iterating from disk

Now that we've saved our dataset to a CSV sequence
format, we need to set up a `CSVSequenceRecordReader` and iterator that will
read our saved sequences and feed them to our network. If you have already saved
your data to disk, you can run this code block (and remaining code blocks) as
much as you want without preprocessing the dataset again. Convenient!

```java
val batchSize = 128
val numLabelClasses = 6

// training data
val trainRR = new CSVSequenceRecordReader(0, ", ")
trainRR.initialize(new NumberedFileInputSplit(dataPath.getAbsolutePath() + "/%d.csv", 0, 449))
val trainIter = new SequenceRecordReaderDataSetIterator(trainRR, batchSize, numLabelClasses, 1)

// testing data
val testRR = new CSVSequenceRecordReader(0, ", ")
testRR.initialize(new NumberedFileInputSplit(dataPath.getAbsolutePath() + "/%d.csv", 450, 599))
val testIter = new SequenceRecordReaderDataSetIterator(testRR, batchSize, numLabelClasses, 1)
```

### Configuring a RNN for Classification
Once everything needed is imported we
can jump into the code. To build the neural network, we can use a set up like
what is shown below. Because there are 784 timesteps and 10 class labels, nIn is
set to 784 and nOut is set to 10 in the MultiLayerNetwork configuration.

```java
val conf = new NeuralNetConfiguration.Builder()
    .seed(123)    //Random number generator seed for improved repeatability. Optional.
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .iterations(1)
    .weightInit(WeightInit.XAVIER)
    .updater(Updater.NESTEROVS)
    .learningRate(0.005)
    .gradientNormalization(GradientNormalization.ClipElementWiseAbsoluteValue)  //Not always required, but helps with this data set
    .gradientNormalizationThreshold(0.5)
    .list()
    .layer(0, new GravesLSTM.Builder().activation(Activation.TANH).nIn(1).nOut(10).build())
    .layer(1, new RnnOutputLayer.Builder(LossFunctions.LossFunction.MCXENT)
            .activation(Activation.SOFTMAX).nIn(10).nOut(numLabelClasses).build())
    .pretrain(false).backprop(true).build();

val model: MultiLayerNetwork = new MultiLayerNetwork(conf)
model.setListeners(new ScoreIterationListener(20))
```

### Training the classifier

To train the model, pass the training iterator to
the model's `fit()` method. We can use a loop to train the model using a
prespecified number of epochs or passes through the training data.

```java
val numEpochs = 1
(1 to numEpochs).foreach(_ => model.fit(trainIter) )
```

### Model Evaluation
Once training is complete we only a couple lines of code to
evaluate the model on a test set. Using a test set to evaluate the model
typically needs to be done in order to avoid overfitting on the training data.
If we overfit on the training data, we have essentially fit to the noise in the
data. 

An `Evaluation` class has more built-in methods if you need to extract a
confusion matrix, and other tools are also available for calculating the Area
Under Curve (AUC).

```java
val evaluation = model.evaluate(testIter)

// print the basic statistics about the trained classifier
println("Accuracy: "+evaluation.accuracy())
println("Precision: "+evaluation.precision())
println("Recall: "+evaluation.recall())
```

### What's next?

- Check out all of our tutorials available [on
Github](https://github.com/eclipse/deeplearning4j/tree/master/dl4j-
examples/tutorials). Notebooks are numbered for easy following.
