---
title:  Hyperparameter Optimization
short_title:  Hyperparameter Optimization
description: Deep learning tutorial using Eclipse Deeplearning4j for  Hyperparameter Optimization
category: Tutorials
json_link: 11.%20Hyperparameter%20Optimization.json
---

### Note

Please view the [README](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

Neural network hyperparameters are parameters set prior to
training. They include the learning rate, batch size, number of epochs,
regularization, weight initialization, number of hidden layers, number of nodes,
and etc. Unlike the weights and biases of the nodes of the neural network, they
cannot be estimated directly using the data. Setting an optimal or near-optimal
configuration of the hyperparameters can significantly affect neural network
performance. Thus, time should be set aside to tune these hyperparameters.
Deeplearning4j (DL4J) provides functionality to do exactly this task. Arbiter
was created explicitly for tuning neural network models and is part of the DL4J
suite of deep learning tools. In this tutorial, we will show an example of using
Arbiter to tune the learning rate and the number of hidden nodes or layer size
of a neural network model. We will use the MNIST dataset (images of handwritten
digits) to train the neural network.

### Imports

```java
import org.deeplearning4j.api.storage.StatsStorage
import org.deeplearning4j.arbiter.MultiLayerSpace
import org.deeplearning4j.arbiter.layers.DenseLayerSpace
import org.deeplearning4j.arbiter.layers.OutputLayerSpace
import org.deeplearning4j.arbiter.optimize.api.CandidateGenerator
import org.deeplearning4j.arbiter.optimize.api.OptimizationResult
import org.deeplearning4j.arbiter.optimize.api.ParameterSpace
import org.deeplearning4j.arbiter.optimize.api.data.DataProvider
import org.deeplearning4j.arbiter.data.MnistDataProvider
import org.deeplearning4j.arbiter.optimize.api.saving.ResultReference
import org.deeplearning4j.arbiter.optimize.api.saving.ResultSaver
import org.deeplearning4j.arbiter.optimize.api.score.ScoreFunction
import org.deeplearning4j.arbiter.optimize.api.termination.MaxCandidatesCondition
import org.deeplearning4j.arbiter.optimize.api.termination.MaxTimeCondition
import org.deeplearning4j.arbiter.optimize.api.termination.TerminationCondition
import org.deeplearning4j.arbiter.optimize.config.OptimizationConfiguration
import org.deeplearning4j.arbiter.optimize.generator.RandomSearchGenerator
import org.deeplearning4j.arbiter.optimize.parameter.continuous.ContinuousParameterSpace
import org.deeplearning4j.arbiter.optimize.parameter.integer.IntegerParameterSpace
import org.deeplearning4j.arbiter.optimize.runner.IOptimizationRunner
import org.deeplearning4j.arbiter.optimize.runner.LocalOptimizationRunner
import org.deeplearning4j.arbiter.saver.local.FileModelSaver
import org.deeplearning4j.arbiter.scoring.impl.TestSetAccuracyScoreFunction
import org.deeplearning4j.arbiter.task.MultiLayerNetworkTaskCreator
import org.deeplearning4j.datasets.iterator.MultipleEpochsIterator
import org.deeplearning4j.datasets.iterator.impl.MnistDataSetIterator
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator
import org.nd4j.linalg.lossfunctions.LossFunctions
import org.nd4j.shade.jackson.annotation.JsonProperty
import org.nd4j.linalg.factory.Nd4j
import org.nd4j.linalg.cpu.nativecpu.CpuAffinityManager


import java.io.File
import java.io.IOException
import java.util.List
import java.util.Map
import java.util.concurrent.TimeUnit

```

Our goal of this tutorial is to tune the learning rate and the layer size. We
can start by setting up the parameter space of the learning rate and the layer
size. We will consider values between 0.0001 and 0.1 for the learning rate and
integer values between 16 and 256 for the layer size. 

Next, we set up a
MultiLayerSpace, which is similar in structure to the MultiLayerNetwork class
we've seen below. Here, we can set the hyperparameters of the neural network
model. However, we can set the learning rate and the number of hidden nodes
using the ParameterSpaces we've initialized before and not a set value like the
other hyperparameters.

Lastly, we use the CandidateGenerator class to configure
how candidate values of the learning rate and the layer size will be generated.
In this tutorial, we will use random search; thus, values for the learning rate
and the layer size will be generated uniformly within their ranges.

```java
val learningRateHyperparam  = new ContinuousParameterSpace(0.0001, 0.1)
val layerSizeHyperparam  = new IntegerParameterSpace(16,256)            


val hyperparameterSpace  = new MultiLayerSpace.Builder()
    //These next few options: fixed values for all models
    .weightInit(WeightInit.XAVIER)
    .regularization(true)
    .l2(0.0001)
    //Learning rate hyperparameter: search over different values, applied to all models
    .learningRate(learningRateHyperparam)
    .addLayer( new DenseLayerSpace.Builder()
            //Fixed values for this layer:
            .nIn(784)  //Fixed input: 28x28=784 pixels for MNIST
            .activation(Activation.LEAKYRELU)
            //One hyperparameter to infer: layer size
            .nOut(layerSizeHyperparam)
            .build())
    .addLayer( new OutputLayerSpace.Builder()
            .nOut(10)
            .activation(Activation.SOFTMAX)
            .lossFunction(LossFunctions.LossFunction.MCXENT)
            .build())
    .build()
    
val candidateGenerator = new RandomSearchGenerator(hyperparameterSpace, null)   


```

 

To obtain the data, we will use the built-in MnistDataProvider class and use
two training epochs or complete passes through the data and a batch size of 64
for training.

```java
val nTrainEpochs = 2
val batchSize = 64

val dataProvider = new MnistDataProvider(nTrainEpochs, batchSize)
```

 

We've set how we are going to generate new values of the two hyperparameters
we are considering but there still remains the question of how to evaluate them.
We will use the accuracy score metric to evaluate different configurations of
the hyperparameters so we initialize a TestSetAccuracyScoreFunction.

```java
val scoreFunction = new TestSetAccuracyScoreFunction()

```

We also want to set how long the hyperparameter search will last. There are
infinite configurations of the learning rate and hidden layer size, since the
learning rate space is continuous. Thus, we set a termination condition of 15
minutes.

```java
val terminationConditions = { new MaxTimeCondition(15, TimeUnit.MINUTES)}
```

To save the best model, we can set the directory to save it in.

```java
val baseSaveDirectory = "arbiterExample/"
val f = new File(baseSaveDirectory)
if(f.exists()) f.delete()
f.mkdir()
val modelSaver = new FileModelSaver(baseSaveDirectory)
```

Given all the configurations we have already set, we need to put them together
using the OptimizationConfiguration. To execute the hyperparameter search, we
initialize an IOptimizaitonRunner using the OptimizationConfiguration.

```java
val configuration = new OptimizationConfiguration.Builder()
                .candidateGenerator(candidateGenerator)
                .dataProvider(dataProvider)
                .modelSaver(modelSaver)
                .scoreFunction(scoreFunction)
                .terminationConditions(terminationConditions)
                .build()

val runner = new LocalOptimizationRunner(configuration, new MultiLayerNetworkTaskCreator())

//Start the hyperparameter optimization

runner.execute()


```

 
Lastly, we can print out the details of the best model and the results.

```java
val s = "Best score: " + runner.bestScore() + "\n" + "Index of model with best score: " + runner.bestScoreCandidateIndex() + "\n" + "Number of configurations evaluated: " + runner.numCandidatesCompleted() + "\n"
println(s)


//Get all results, and print out details of the best result:
val indexOfBestResult = runner.bestScoreCandidateIndex()
val allResults = runner.getResults()

val bestResult = allResults.get(indexOfBestResult).getResult()
val bestModel = bestResult.getResult().asInstanceOf[MultiLayerNetwork]


println("\n\nConfiguration of best model:\n")
println(bestModel.getLayerWiseConfigurations().toJson())
```
