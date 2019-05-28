---
title:  Logistic Regression
short_title:  Logistic Regression
description: Deep learning tutorial using Eclipse Deeplearning4j for  Logistic Regression
category: Tutorials
json_link: 03.%20Logistic%20Regression.json
---

### Note

View the [README.md](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies and importing notebooks in Zeppelin.

### Background
---

With deep learning, we can compose a deep neural network to
suit the input data and its features. The goal is to train the network on the
data to make predictions, and those predictions are tied to the outcomes that
you care about; i.e. is this transaction fraudulent or not, or which object is
contained in the photo? There are different techniques to configure a neural
network, and all of them build a relational hierarchy between the inputs and
outputs.

In this tutorial, we are going to configure the simplest neural
network and that is logistic regression model network. 

Regression is a process
that helps show the relations between the independant variables (inputs) and the
dependant variables (outputs). Logistic regression is one in which the dependant
variable is categorical rather than continuous - meaning that it can predict
only a limited number of classes or categories, like a switch you flip on or
off. For example, it can predict that an image contains a cat or a dog, or it
can classify input in ten buckets with the integers 0 through 9.

A simple
logisitic regression calculates 'x*w + b = y'. Where 'x' is an isntance of input
data, 'w' is the weight or coefficient that transforms that input, 'b' is the
bias and 'y' is the output, or prediction about the data. The biological terms
show how this artificial neuron loosely maps to a neuron in the human brain. The
most important point is how data flows through and is transformed by this
structure.

|---|---|---|
|**Logistic Regression** | ![How a logistic regression
is
calculcated](https://i.pinimg.com/736x/61/fe/81/61fe81589ab491d1d3ba612b3bdf5b51
--convolutional-neural-network-neuron-model.jpg) |
[Source](https://i.pinimg.com/736x/61/fe/81/61fe81589ab491d1d3ba612b3bdf5b51
--convolutional-neural-network-neuron-model.jpg) |

### What will we learn in this tutorial?
We're going to configure the simplest
network, with just one input layer and one output layer, to show how logistic
regression works.

### Imports

```java
import org.deeplearning4j.nn.api.OptimizationAlgorithm
import org.deeplearning4j.nn.conf.graph.MergeVertex
import org.deeplearning4j.nn.conf.layers.{DenseLayer, GravesLSTM, OutputLayer, RnnOutputLayer}
import org.deeplearning4j.nn.conf.{ComputationGraphConfiguration, MultiLayerConfiguration, NeuralNetConfiguration}
import org.deeplearning4j.nn.graph.ComputationGraph
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.learning.config.Nesterovs
import org.nd4j.linalg.lossfunctions.LossFunctions
```

### Configuring logistic regression layers
We are going to first build the
layers and then feed these layers into the network configuration.

```java
//Building the output layer
val outputLayer : OutputLayer = new OutputLayer.Builder()
    .nIn(784) //The number of inputs feed from the input layer
    .nOut(10) //The number of output values the output layer is supposed to take
    .weightInit(WeightInit.XAVIER) //The algorithm to use for weights initialization
    .activation(Activation.SOFTMAX) //Softmax activate converts the output layer into a probability distribution
    .build() //Building our output layer
```

```java
//Since this is a simple network with a stack of layers we're going to configure a MultiLayerNetwork
val logisticRegressionConf : MultiLayerConfiguration = new NeuralNetConfiguration.Builder()
    .seed(123).learningRate(0.1).iterations(1).optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT).updater(new Nesterovs(0.9)) //High Level Configuration
    .list() //For configuring MultiLayerNetwork we call the list method
    .layer(0, outputLayer) //    <----- output layer fed here
    .pretrain(false).backprop(true) //Pretraining and Backprop Configuration
    .build() //Building Configuration
```

**This is how our configuration here looks like:**

|---|---|---|
|**Logistic
Regression** | ![How a logistic regression visually looks like in neural
networks](https://isaacchanghau.github.io/images/deeplearning/activationfunction/softmax.png)
|
[Source](https://isaacchanghau.github.io/images/deeplearning/activationfunction/softmax.png)
|
---
The layer with x1, x2, x3, ..., xn is out input layer. While the one with
z1, z2, z3, ..., zk is our output layer. See how the weights and biases are
connected, and how softmax is applied to give the probability distribution.

### Why we didn't build an input layer
---
You may be wondering why didn't we
write any code for building our input layer. The input layer is only a set of
inputs values fed into the network. It doesn't perform a calculation. It's just
an input sequence (raw or pre-processed data) coming into the network, data to
be trained on or to be evaluated. Later, we are going to work with data
iterators, which feed input to a network in a specific pattern, and which can be
thought of as an input layer of the network.

 

### What's next?
- See this [tutorial](https://deeplearning4j.org/tutorials/04-feed-forward) to learn about
configuring a more complex network: a 'feedforward neural network'. We will also
introduce the concept of hidden layers.
