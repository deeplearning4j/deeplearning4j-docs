---
title:  Feed-forward
short_title:  Feed-forward
description: Deep learning tutorial using Eclipse Deeplearning4j for  Feed-forward
category: Tutorials
json_link: 04.%20Feed-forward.json
---

### Note

Please view the [README](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

In our previous tutorial, we learned about a very simple neural
network model - the logistic regression model. Although you can solve many tasks
with a simple model like that, most of the problems require a much complex
network configuration. Typical Deep leaning model consists of many layers
between the inputs and outputs. In this tutorial, we are going to learn about
one of those configuration i.e. Feed-forward neural networks.

### Feed-Forward
Networks

Feed-forward networks are those in which there is not cyclic
connection between the network layers. The input flows forward towards the
output after going through several intermediate layers. A typical feed-forward
network looks like this:

|---|---|---|
|**Feed-forward network** | ![A typical
feed-forward
network](https://upload.wikimedia.org/wikipedia/en/5/54/Feed_forward_neural_net.gif)
|
[Source](https://upload.wikimedia.org/wikipedia/en/5/54/Feed_forward_neural_net.gif)
|

Here you can see a different layer named as a hidden layer. The layers in
between our input and output layers are called hidden layers. It's called hidden
because we don't directly deal with them and hence not visible. There can be
more than one hidden layer in the network.

Just as our softmax activation after
our output layer in the previous tutorial, there can be activation functions
between each layer of the network. They are responsible to allow (activate) or
disallow our network output to the next layer node. There are different
activation functions such as sigmoid and relu etc.

### Imports

```java
import org.deeplearning4j.nn.api.OptimizationAlgorithm
import org.deeplearning4j.nn.conf.graph.MergeVertex
import org.deeplearning4j.nn.conf.layers.{DenseLayer, GravesLSTM, OutputLayer, RnnOutputLayer}
import org.deeplearning4j.nn.conf.{ComputationGraphConfiguration, MultiLayerConfiguration, NeuralNetConfiguration, Updater}
import org.deeplearning4j.nn.graph.ComputationGraph
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.learning.config.Nesterovs
import org.nd4j.linalg.lossfunctions.LossFunctions
```

### Let's create the feed-forward network configuration

```java
val conf = new NeuralNetConfiguration.Builder()
    .seed(12345)
    .iterations(1)
    .weightInit(WeightInit.XAVIER)
    .updater(Updater.ADAGRAD)
    .activation(Activation.RELU)
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .learningRate(0.05)
    .regularization(true).l2(0.0001)
    .list()
    .layer(0, new DenseLayer.Builder().nIn(784).nOut(250).weightInit(WeightInit.XAVIER).activation(Activation.RELU) //First hidden layer
            .build())
    .layer(1, new OutputLayer.Builder().nIn(250).nOut(10).weightInit(WeightInit.XAVIER).activation(Activation.SOFTMAX) //Output layer
            .lossFunction(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
            .build())
    .pretrain(false).backprop(true)
    .build()
```

### What we did here?

As you can see above that we have made a feed-forward
network configuration with one hidden layer. We have used a RELU activation
between our hidden and output layer. RELUs are one of the most popularly used
activation functions. Activation functions also introduce non-linearities in our
network so that we can learn on more complex features present in our data.
Hidden layers can learn features from the input layer and it can send those
features to be analyzed by our output layer to get the corresponding outputs.
You can similarly make network configurations with more hidden layers as:

```java
//Just make sure the number of inputs of the next layer equals to the number of outputs in the previous layer.
val conf = new NeuralNetConfiguration.Builder()
    .seed(12345)
    .iterations(1)
    .weightInit(WeightInit.XAVIER)
    .updater(Updater.ADAGRAD)
    .activation(Activation.RELU)
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .learningRate(0.05)
    .regularization(true).l2(0.0001)
    .list()
    .layer(0, new DenseLayer.Builder().nIn(784).nOut(250).weightInit(WeightInit.XAVIER).activation(Activation.RELU) //First hidden layer
            .build())
    .layer(1, new OutputLayer.Builder().nIn(250).nOut(100).weightInit(WeightInit.XAVIER).activation(Activation.RELU) //Second hidden layer
            .build())
    .layer(2, new OutputLayer.Builder().nIn(100).nOut(50).weightInit(WeightInit.XAVIER).activation(Activation.RELU) //Third hidden layer
            .build())
    .layer(3, new OutputLayer.Builder().nIn(50).nOut(10).weightInit(WeightInit.XAVIER).activation(Activation.SOFTMAX) //Output layer
            .lossFunction(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
            .build())
    .pretrain(false).backprop(true)
    .build()
```

### What's next?

- Check out all of our tutorials available [on
Github](https://github.com/eclipse/deeplearning4j-examples/tree/master/tutorials).
Notebooks are numbered for easy following.
