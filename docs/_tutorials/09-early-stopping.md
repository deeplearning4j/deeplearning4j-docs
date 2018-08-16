---
title:  Early Stopping
short_title:  Early Stopping
description: Deep learning tutorial using Eclipse Deeplearning4j for  Early Stopping
category: Tutorials
json_link: 09.%20Early%20Stopping.json
---

### Note

Please view the [README](https://github.com/deeplearning4j/dl4j-
examples/blob/master/tutorials/README.md) to learn about installing, setting up
dependencies, and importing notebooks in Zeppelin

### Background

When training neural networks, it is important to avoid
overfitting the training data. Overfitting occurs when the neural network learns
the noise in the training data and thus does not generalize well to data it has
not been trained on. One hyperparameter that affects whether the neural network
will overfit or not is the number of epochs or complete passes through the
training split. If we use too many epochs, then the neural network is likely to
overfit. On the other hand, if we use too few epochs, the neural network might
not have the chance to learn fully from the training data.

Early stopping is
one mechanism used to manually set the number of epochs to prevent underfitting
and overfitting. The idea behind early stopping is intuitive. First the data is
split into training and testing sets. At the end of each epoch, the neural
network is evaluated on the test set. If the neural network outperforms the
previous best model, then we save the neural network. The best overall model is
then taken to be the final model. 

In this tutorial we will show how to use
early stopping with deeplearning4j (DL4J). We will apply the method on a feed
forward neural network using the MNIST dataset, which is a dataset consisting of
handwritten digits.

### Imports

```java
import org.apache.commons.io.FilenameUtils;
import org.nd4j.linalg.activations.Activation
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator
import org.deeplearning4j.datasets.iterator.impl.MnistDataSetIterator
import org.deeplearning4j.earlystopping.EarlyStoppingConfiguration;
import org.deeplearning4j.earlystopping.EarlyStoppingModelSaver;
import org.deeplearning4j.earlystopping.EarlyStoppingResult;
import org.deeplearning4j.earlystopping.saver.LocalFileModelSaver;
import org.deeplearning4j.earlystopping.scorecalc.DataSetLossCalculator;
import org.deeplearning4j.earlystopping.termination.MaxEpochsTerminationCondition;
import org.deeplearning4j.earlystopping.termination.MaxTimeIterationTerminationCondition;
import org.deeplearning4j.earlystopping.trainer.EarlyStoppingTrainer;
import org.deeplearning4j.eval.Evaluation
import org.deeplearning4j.nn.api.OptimizationAlgorithm
import org.deeplearning4j.nn.conf.MultiLayerConfiguration
import org.deeplearning4j.nn.conf.NeuralNetConfiguration
import org.deeplearning4j.nn.conf.Updater
import org.deeplearning4j.nn.conf.layers.DenseLayer
import org.deeplearning4j.nn.conf.layers.OutputLayer
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork
import org.deeplearning4j.nn.weights.WeightInit
import org.deeplearning4j.optimize.listeners.ScoreIterationListener
import org.nd4j.linalg.api.ndarray.INDArray
import org.nd4j.linalg.dataset.DataSet
import org.nd4j.linalg.lossfunctions.LossFunctions.LossFunction
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.io.File;
import java.util.concurrent.TimeUnit;

```

Now that we have imported everything needed to run this tutorial, we can start
by setting the parameters for the neural network and initializing the data. We
will set the maximum number of epochs to run early stopping on to be 15.

```java
val numRows = 28
val numColumns = 28
val outputNum = 10 
val batchSize = 128
val rngSeed = 123

val mnistTrain: DataSetIterator = new MnistDataSetIterator(batchSize, true, rngSeed)
val mnistTest: DataSetIterator = new MnistDataSetIterator(batchSize, false, rngSeed)


```

Next we will set the neural network configuration using the MultiLayerNetwork
class of DL4J and initialize the MultiLayerNetwork.

```java
val conf : MultiLayerConfiguration = new NeuralNetConfiguration.Builder()
        .seed(rngSeed) //include a random seed for reproducibility
        // use stochastic gradient descent as an optimization algorithm
        .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
        .iterations(1)
        .learningRate(0.006) //specify the learning rate
        .updater(Updater.NESTEROVS)
        .regularization(true).l2(1e-4)
        .list()
        .layer(0, new DenseLayer.Builder() //create the first, input layer with xavier initialization
                .nIn(numRows * numColumns)
                .nOut(1000)
                .activation(Activation.RELU)
                .weightInit(WeightInit.XAVIER)
                .build())
        .layer(1, new OutputLayer.Builder(LossFunction.NEGATIVELOGLIKELIHOOD) //create hidden layer
                .nIn(1000)
                .nOut(outputNum)
                .activation(Activation.SOFTMAX)
                .weightInit(WeightInit.XAVIER)
                .build())
        .pretrain(false).backprop(true) //use backpropagation to adjust weights
        .build()
                
val model : MultiLayerNetwork = new MultiLayerNetwork(conf)
```

If we weren't using early stopping, we would proceed by training the neural
network using for loops and the fit method of the MultiLayerNetwork. But since
we are using early stopping we need to configure how early stopping will be
applied. Looking at the next cell, we will use a maximum epoch number of 10 and
a maximum training time of 5 minutes. The evaluation will be done on mnistTest
after each epoch. Each model will be saved in the DL4JEarlyStoppingExample
directory that we specified.

Once the EarlyStoppingConfiguration is specified,
we only need to initialize an EarlyStoppingTrainer using the training data and
the two previous configuraitons. The results are obtained just by calling the
fit method of EarlyStoppingTrainer.

```java
val tempDir : String = System.getProperty("java.io.tmpdir")
val exampleDirectory : String = FilenameUtils.concat(tempDir, "DL4JEarlyStoppingExample/")
val dirFile : File = new File(exampleDirectory)
dirFile.mkdir()

val saver  = new LocalFileModelSaver(exampleDirectory)

val esConf  = new EarlyStoppingConfiguration.Builder()
		.epochTerminationConditions(new MaxEpochsTerminationCondition(10))
		.iterationTerminationConditions(new MaxTimeIterationTerminationCondition(5, TimeUnit.MINUTES))
		.scoreCalculator(new DataSetLossCalculator(mnistTest, true))
        .evaluateEveryNEpochs(1)
		.modelSaver(saver)
		.build()

val trainer  = new EarlyStoppingTrainer(esConf,conf,mnistTrain)
val result = trainer.fit()
```

We can then print out the details of the best model.

```java
println("Termination reason: " + result.getTerminationReason())
println("Termination details: " + result.getTerminationDetails())
println("Total epochs: " + result.getTotalEpochs())
println("Best epoch number: " + result.getBestModelEpoch())
println("Score at best epoch: " + result.getBestModelScore())
```
