---
title:  MultiLayerNetwork and ComputationGraph
short_title:  MultiLayerNetwork and ComputationGraph
description: Deep learning tutorial using Eclipse Deeplearning4j for  MultiLayerNetwork and ComputationGraph
category: Tutorials
json_link: 01.%20MultiLayerNetwork%20and%20ComputationGraph.json
---

### Note

View the README.md [here](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies and importing notebooks in Zeppelin

### DL4J Network Architectures
---

DL4J provides the following classes to
configure networks:
1. 'MultiLayerNetwork'
2. 'ComputationGraph'


### 1.
MultiLayerNetwork
'MultiLayerNetwork' consists of a single input layer and a
single output layer with a stack of layers in between them.

### 2.
ComputationGraph
'ComputationGraph' is used for constructing networks with a
more complex architecture than 'MultiLayerNetwork'. 
It can have multiple input
layers, multiple output layers and the layers in between can be connected
through a direct acyclic graph.

---

### Network Configurations
Whether you
create 'MultiLayerNetwork' or 'ComputationGraph', you have to provide a network
configuration to it through 'NeuralNetConfiguration.Builder'.
'NeuralNetConfiguration.Builder', as the name implies, provides a Builder
pattern to configure a network.
To create a 'MultiLayerNetwork', we build a
'MultiLayerConfiguraion' and for 'ComputationGraph', it's
'ComputationGraphConfiguration'.

The pattern goes like this: [High Level
Configuration] -> [Configure Layers] -> [Pretraining and Backprop Configuration]
-> [Build Configuration]

### Required imports

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

### Building a MultiLayerConfiguration

```java
val multiLayerConf: MultiLayerConfiguration = new NeuralNetConfiguration.Builder()
  .seed(123).learningRate(0.1).iterations(1).optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT).updater(new Nesterovs(0.9)) //High Level Configuration
  .list() //For configuring MultiLayerNetwork we call the list method
  .layer(0, new DenseLayer.Builder().nIn(784).nOut(100).weightInit(WeightInit.XAVIER).activation(Activation.RELU).build()) //Configuring Layers
  .layer(1, new OutputLayer.Builder().nIn(100).nOut(10).weightInit(WeightInit.XAVIER).activation(Activation.SIGMOID).build())
  .pretrain(false).backprop(true) //Pretraining and Backprop Configuration
  .build() //Building Configuration
```

 

### What we did here?
---

**- High Level Configuration**

Function
| Details
---------------- | -------------
seed             | For keeping the
network outputs reproducable during runs by initializing weights and other
network randomizations through a seed
learningRate     | For identifying the
network learning rate
iterations       | For identifying the number of
optimization iterations
optimizationAlgo | Optimization Algorithm to use for
training. Run 'OptimizationAlgorithm.values().foreach { println }' to see
different optimization algorithms that you can use.
updater          |
Algorithm to be used for updating the parameters

---
**- Configuration of
Layers**

Here we are calling list() to get the 'ListBuilder'. It provides us
the necessary api to add layers to the network through the 'layer(arg1, arg2)'
function.
- The first parameter is the index of the position where the layer
needs to be added.
- The second parameter is the type of layer we need to add
to the network.

To build and add a layer we use a similar builder pattern as:
Function         | Details
---------------- | -------------
nIn              |
The number of inputs coming from the previous layer. (In the first layer, it
represents the input it is going to take from the input layer)
nOut
| The number of outputs it's going to send to the next layer. (For output layer
it represents the labels here)
weightInit       | The type of weights
initialization to use for the layer parameters. Run 'WeightInit.values().foreach
{ println }' to see different weight initializations that you can use.
activation       | The activation function between layers. Run
'Activation.values().foreach { println }' to see different activations that you
can use.

---
**- Pretraining and Backprop Configuration**

Function
| Details
---------------- | -------------
pretrain         | False if
training from scratch
backprop         | Whether to backprop or not

---
**-
Building a Graph**

Finally, the last build() call builds the configuration
for us

### Reality checking for our MultiLayerConfiguration
You can get your network
configuration as String, JSON or YAML for reality checking.
For JSON we can use
the 'toJson()' function

```java
println(multiLayerConf.toJson)
```

### Creating a MultiLayerNetwork

Finally, to create a 'MultiLayerNetwork', we
pass the configuration to it as shown below

```java
val multiLayerNetwork : MultiLayerNetwork = new MultiLayerNetwork(multiLayerConf)
```

### Building a ComputationGraphConfiguration

```java
val computationGraphConf : ComputationGraphConfiguration = new NeuralNetConfiguration.Builder()
      .seed(123).learningRate(0.1).iterations(1).optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT).updater(new Nesterovs(0.9)) //High Level Configuration
      .graphBuilder()  //For configuring ComputationGraph we call the graphBuilder method
      .addInputs("input") //Configuring Layers
      .addLayer("L1", new DenseLayer.Builder().nIn(3).nOut(4).build(), "input")
      .addLayer("out1", new OutputLayer.Builder().lossFunction(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD).nIn(4).nOut(3).build(), "L1")
      .addLayer("out2", new OutputLayer.Builder().lossFunction(LossFunctions.LossFunction.MSE).nIn(4).nOut(2).build(), "L1")
      .setOutputs("out1","out2")
      .pretrain(false).backprop(true) //Pretraining and Backprop Configuration
      .build() //Building configuration
```

### What we did here?
---

The only difference here is the way we are building
layers.
Instead of calling the 'list()' function, we call the 'graphBuilder()'
to get a 'GraphBuilder' for building our 'ComputationGraphConfiguration'
Following table explains what each function of a 'GraphBuilder' does

---
Function         | Details
---------------- | -------------
addInputs        | A
list of strings telling the network what layers to use as input layers
addLayer
| First parameter is the layer name, then the layer object and finally a list of
strings defined previously to feed this layer as inputs
setOutputs       | A
list of strings telling the network what layers to use as output layers

---
The output layers defined here use another function 'lossFunction' to define
what loss function to use. 
Use LossFunctions.LossFunction.values().foreach {
println } to see what loss functions are available.

### Reality checking for our ComputationGraphConfiguration
You can get your
network configuration as String, JSON or YAML for reality checking.
For JSON we
can use the 'toJson()' function

```java
println(computationGraphConf.toJson)
```

### Creating a ComputationGraph
Finally, to create a 'ComputationGraph', we pass
the configuration to it as shown below

```java
val computationGraph : ComputationGraph = new ComputationGraph(computationGraphConf)
```

### More MultiLayerConfiguration Examples
---

### 1. Regularization

```java
//You can add regularization in the higher level configuration in the network through first allowing regularization through 'regularization(true)' and then chaining it to a regularization algorithm -> 'l1()', l2()' etc as shown below:
new NeuralNetConfiguration.Builder().regularization(true).l2(1e-4)
```

### 2. Dropout connects

```java
//When creating layers, you can add a dropout connection by using 'dropout(<dropOut_factor>)'
new NeuralNetConfiguration.Builder()
    .list() 
    .layer(0, new DenseLayer.Builder().dropOut(0.8).build())
```

 

### 3. Bias initialization

```java
//You can initialize the bias of a particular layer by using 'biasInit(<init_value>)'
new NeuralNetConfiguration.Builder()
    .list() 
    .layer(0, new DenseLayer.Builder().biasInit(0).build())
```

### More ComputationGraphConfiguration Examples
---

### 1. Recurrent Network
with Skip Connections

```java
val cgConf1 : ComputationGraphConfiguration = new NeuralNetConfiguration.Builder()
        .learningRate(0.01)
        .graphBuilder()
        .addInputs("input") //can use any label for this
        .addLayer("L1", new GravesLSTM.Builder().nIn(5).nOut(5).build(), "input")
        .addLayer("L2",new RnnOutputLayer.Builder().nIn(5+5).nOut(5).build(), "input", "L1")
        .setOutputs("L2")
        .build();
```

### 2. Multiple Inputs and Merge Vertex

```java
//Here MergeVertex concatenates the layer outputs
val cgConf2 : ComputationGraphConfiguration = new NeuralNetConfiguration.Builder()
        .learningRate(0.01)
        .graphBuilder()
        .addInputs("input1", "input2")
        .addLayer("L1", new DenseLayer.Builder().nIn(3).nOut(4).build(), "input1")
        .addLayer("L2", new DenseLayer.Builder().nIn(3).nOut(4).build(), "input2")
        .addVertex("merge", new MergeVertex(), "L1", "L2")
        .addLayer("out", new OutputLayer.Builder().nIn(4+4).nOut(3).build(), "merge")
        .setOutputs("out")
        .build();
```

### 3. Multi-Task Learning

```java
val cgConf3 : ComputationGraphConfiguration = new NeuralNetConfiguration.Builder()
        .learningRate(0.01)
        .graphBuilder()
        .addInputs("input")
        .addLayer("L1", new DenseLayer.Builder().nIn(3).nOut(4).build(), "input")
        .addLayer("out1", new OutputLayer.Builder()
                .lossFunction(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
                .nIn(4).nOut(3).build(), "L1")
        .addLayer("out2", new OutputLayer.Builder()
                .lossFunction(LossFunctions.LossFunction.MSE)
                .nIn(4).nOut(2).build(), "L1")
        .setOutputs("out1","out2")
        .build();
```
