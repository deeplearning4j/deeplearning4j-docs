---
title:  Layers and Preprocessors
short_title:  Layers and Preprocessors
description: Deep learning tutorial using Eclipse Deeplearning4j for  Layers and Preprocessors
category: Tutorials
json_link: 10.%20Layers%20and%20Preprocessors.json
---

### Note

Please view the [README](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

In previous tutorials we learned how to configure different
neural networks such as feed forward, convolutional, and recurrent networks. The
type of neural network is determined by the type of hidden layers they contain.
For example, feed forward neural networks are comprised of dense layers, while
recurrent neural networks can include Graves LSTM (long short-term memory)
layers. In this tutorial we will learn how to use combinations of different
layers in a single neural network using the MultiLayerNetwork class of
deeplearning4j (DL4J). Additionally, we will learn how to use preprocess our
data to more efficiently train the neural networks. The MNIST dataset (images of
handwritten digits) will be used as an example for a convolutional network.

### Imports

```java
import org.deeplearning4j.datasets.iterator.impl.MnistDataSetIterator
import org.deeplearning4j.eval.Evaluation
import org.deeplearning4j.nn.api.OptimizationAlgorithm
import org.deeplearning4j.nn.conf.MultiLayerConfiguration
import org.deeplearning4j.nn.conf.NeuralNetConfiguration
import org.deeplearning4j.nn.conf.Updater
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.deeplearning4j.nn.conf.layers.SubsamplingLayer
import org.deeplearning4j.nn.conf.layers.ConvolutionLayer
import org.deeplearning4j.nn.conf.inputs.InputType
import org.deeplearning4j.eval.Evaluation
import org.deeplearning4j.nn.conf.distribution.UniformDistribution
import org.deeplearning4j.nn.conf.layers.{DenseLayer, OutputLayer}
import org.deeplearning4j.nn.conf.{ComputationGraphConfiguration, MultiLayerConfiguration, NeuralNetConfiguration, Updater}
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.learning.config.Nesterovs
import org.nd4j.linalg.lossfunctions.LossFunctions
import org.nd4j.linalg.api.ndarray.INDArray
import org.nd4j.linalg.dataset.DataSet
import org.nd4j.linalg.lossfunctions.LossFunctions.LossFunction
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator
import org.nd4j.linalg.dataset.api.preprocessor.DataNormalization
import org.nd4j.linalg.dataset.api.preprocessor.ImagePreProcessingScaler
import org.slf4j.Logger
import org.slf4j.LoggerFactory
```

### Convolutional Neural Network Example

Now that everything needed is
imported, we can start by configuring a convolutional neural network for a
MultiLayerNetwork. This network will consist of two convolutional layers, two
max pooling layers, one dense layer, and an output layer. This is easy to do
using DL4J's functionality; we simply add a dense layer after the max pooling
layer to convert the output into vectorized form before passing it to the output
layer. The neural network will then attempt to classify an observation using the
vectorized data in the output layer. 

The only tricky part is getting the
dimensions of the input to the dense layer correctly after the convolutional and
max pooling layers. Note that we first start off with a 28 by 28 matrix and
after applying the convolution layer with a 5 by 5 kernel we end up with twenty
24 by 24 matrices. Once the input is passed through the max pooling layer with a
2 by 2 kernel and a stride of 2 by 2, we end up with twenty 12 by 12 matrices.
After the second convolutional layer with a 5 by 5 kernel, we end up with fifty
8 by 8 matrices. This output is reduced to fifty 4 by 4 matrices after the
second max pooling layer which has the same kernel size and stride of the first
max pooling layer. To vectorize these final matrices, we require an input of
dimension 50*4*4 or 800 in the dense layer.

```java
val nChannels = 1; // Number of input channels
val outputNum = 10; // The number of possible outcomes
val batchSize = 64; // Test batch size
val nEpochs = 1; // Number of training epochs
val iterations = 1; // Number of training iterations
val seed = 123; // Random seed

val conf : MultiLayerConfiguration = new NeuralNetConfiguration.Builder()
    .seed(12345)
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .list()
    .layer(0, new ConvolutionLayer.Builder(5, 5)
        .nIn(1)
        .stride(1, 1)
        .nOut(20)
        .activation(Activation.IDENTITY)
        .build())
    .layer(1, new SubsamplingLayer.Builder(SubsamplingLayer.PoolingType.MAX)
        .kernelSize(2,2)
        .stride(2,2)
        .build())
     .layer(2, new ConvolutionLayer.Builder(5, 5)
        .stride(1, 1)
        .nOut(50)
        .activation(Activation.IDENTITY)
        .build())
    .layer(3, new SubsamplingLayer.Builder(SubsamplingLayer.PoolingType.MAX)
        .kernelSize(2,2)
        .stride(2,2)
        .build())
    .layer(4, new DenseLayer.Builder().activation(Activation.RELU)
        .nIn(800)
        .nOut(500).build())
    .layer(5, new OutputLayer.Builder(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
        .nIn(500)
        .nOut(outputNum)
        .activation(Activation.SOFTMAX)
        .build())
    .setInputType(InputType.convolutionalFlat(28,28,1)) 
	.backprop(true).pretrain(false).build()
	
val model = new MultiLayerNetwork(conf)
```

Before training the neural network, we will instantiate built-in
DataSetIterators for the MNIST data. One example of data preprocessing is
scaling the data. The data we are using in raw form are greyscale images, which
are represented by a single matrix filled with integer values from 0 to 255. A 0
value indicates a black pixel, while a 1 value indicates a white pixel. It is
helpful to scale the image pixel value from 0 to 1 instead of from 0 to 255. To
do this, the ImagePreProcessingScaler class is used directly on the
MnistDataSetIterators. Note that this process is typtical for data
preprocessing. Once this is done, we are ready to train the neural network.

```java
val rngSeed = 12345
val mnistTrain = new MnistDataSetIterator(batchSize, true, rngSeed)
val mnistTest = new MnistDataSetIterator(batchSize, false, rngSeed)

val scaler : DataNormalization = new ImagePreProcessingScaler(0,1);
scaler.fit(mnistTrain);
mnistTrain.setPreProcessor(scaler);
mnistTest.setPreProcessor(scaler);


```

To train the neural network, we use 5 epochs or complete passes through the
training set by simply calling the fit method.

```java
val nEpochs = 5

(1 to nEpochs).foreach{ epoch =>
    model.fit(mnistTrain)
    println("Epoch " + epoch + " complete")
}

```

Lastly, we use the test split of the data to evaluate how well our final model
performs on data it has never seen. We can see that the model performs pretty
well using only 5 epochs!

```java
val eval : Evaluation = model.evaluate(mnistTest)
println(eval.stats())
```
