---
title: Early Stopping
short_title: Early Stopping
description: Terminate a training session given certain conditions.
category: Tuning & Training
weight: 10
---

## What is early stopping?

When training neural networks, numerous decisions need to be made regarding the settings (hyperparameters) used, in order to obtain good performance. Once such hyperparameter is the number of training epochs: that is, how many full passes of the data set (epochs) should be used? If we use too few epochs, we might underfit (i.e., not learn everything we can from the training data); if we use too many epochs, we might overfit (i.e., fit the 'noise' in the training data, and not the signal).

Early stopping attempts to remove the need to manually set this value. It can also be considered a type of regularization method (like L1/L2 weight decay and dropout) in that it can stop the network from overfitting.

The idea behind early stopping is relatively simple:

* Split data into training and test sets
* At the end of each epoch (or, every N epochs):
  * evaluate the network performance on the test set
  * if the network outperforms the previous best model: save a copy of the network at the current epoch
* Take as our final model the model that has the best test set performance


This is shown graphically below:

![Early Stopping](/images/guide/earlystopping.png)

The best model is the one saved at the time of the vertical dotted line - i.e., the model with the best accuracy on the test set.


Using DL4J's early stopping functionality requires you to provide a number of configuration options:

* A score calculator, such as the *DataSetLossCalculator*([JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculator.html), [Source Code](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculator.java)) for a Multi Layer Network, or *DataSetLossCalculatorCG* ([JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculatorCG.html), [Source Code](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculatorCG.java)) for a Computation Graph. Is used to calculate at every epoch (for example: the loss function value on a test set, or the accuracy on the test set)
* How frequently we want to calculate the score function (default: every epoch)
* One or more termination conditions, which tell the training process when to stop. There are two classes of termination conditions:
  * Epoch termination conditions: evaluated every N epochs
  * Iteration termination conditions: evaluated once per minibatch
* A model saver, that defines how models are saved

An example, with an epoch termination condition of maximum of 30 epochs, a maximum of 20 minutes training time, calculating the score every epoch, and saving the intermediate results to disk:

```java

MultiLayerConfiguration myNetworkConfiguration = ...;
DataSetIterator myTrainData = ...;
DataSetIterator myTestData = ...;

EarlyStoppingConfiguration esConf = new EarlyStoppingConfiguration.Builder()
		.epochTerminationConditions(new MaxEpochsTerminationCondition(30))
		.iterationTerminationConditions(new MaxTimeIterationTerminationCondition(20, TimeUnit.MINUTES))
		.scoreCalculator(new DataSetLossCalculator(myTestData, true))
        .evaluateEveryNEpochs(1)
		.modelSaver(new LocalFileModelSaver(directory))
		.build();

EarlyStoppingTrainer trainer = new EarlyStoppingTrainer(esConf,myNetworkConfiguration,myTrainData);

//Conduct early stopping training:
EarlyStoppingResult result = trainer.fit();

//Print out the results:
System.out.println("Termination reason: " + result.getTerminationReason());
System.out.println("Termination details: " + result.getTerminationDetails());
System.out.println("Total epochs: " + result.getTotalEpochs());
System.out.println("Best epoch number: " + result.getBestModelEpoch());
System.out.println("Score at best epoch: " + result.getBestModelScore());

//Get the best model:
MultiLayerNetwork bestModel = result.getBestModel();

```

You can also implement your own iteration and epoch termination conditions.

## Early Stopping w/ Parallel Wrapper

The early stopping implementation described above will only work with a single device. However, `EarlyStoppingParallelTrainer` provides similar functionality as early stopping and allows you to optimize for either multiple CPUs or GPUs. `EarlyStoppingParallelTrainer` wraps your model in a `ParallelWrapper` class and performs localized distributed training.

Note that `EarlyStoppingParallelTrainer` doesn't support all of the functionality as its single device counterpart. It is not UI-compatible and may not work with complex iteration listeners. This is due to how the model is distributed and copied in the background.

## API










### AutoencoderScoreCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/AutoencoderScoreCalculator.java) </span>

Score function for a MultiLayerNetwork or ComputationGraph with a single




### ClassificationScoreCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/ClassificationScoreCalculator.java) </span>

as accuracy, F1 score, etc.
Used for both MultiLayerNetwork and ComputationGraph




### DataSetLossCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculator.java) </span>

Calculate the score (loss function value) on a given data set (usually a test set)




### DataSetLossCalculatorCG
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculatorCG.java) </span>

Given a DataSetIterator: calculate
the total loss for the model on that data set.
Typically used to calculate the loss on a test set.




### ROCScoreCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/ROCScoreCalculator.java) </span>

Calculate ROC AUC (area under ROC curve) or AUCPR (area under precision recall curve) for a MultiLayerNetwork or
ComputationGraph




### RegressionScoreCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/RegressionScoreCalculator.java) </span>

Calculate the regression score of the network (MultiLayerNetwork or ComputationGraph) on a test set, using the




### VAEReconErrorScoreCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/VAEReconErrorScoreCalculator.java) </span>

Score function for variational autoencoder reconstruction error for a MultiLayerNetwork or ComputationGraph.<br>
VariationalAutoencoder layer must be first layer in the network


##### minimizeScore 
```java
public boolean minimizeScore() 
```


Constructor for reconstruction ERROR

- param metric
- param iterator




### VAEReconProbScoreCalculator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/scorecalc/VAEReconProbScoreCalculator.java) </span>

Score calculator for variational autoencoder reconstruction probability or reconstruction log probability for a
MultiLayerNetwork or ComputationGraph. VariationalAutoencoder layer must be first layer in the network<br>


##### minimizeScore 
```java
public boolean minimizeScore() 
```


Constructor for average reconstruction probability

- param iterator Iterator
- param reconstructionProbNumSamples Number of samples. See {- link VariationalAutoencoder#reconstructionProbability(INDArray, int)}
for details
- param logProb If true: calculate (negative) log probability. False: probability




### BestScoreEpochTerminationCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/termination/BestScoreEpochTerminationCondition.java) </span>

Created by Sadat Anwar on 3/26/16.

Stop the training once we achieved an expected score. Normally this will stop if the current score is lower than
the initialized score. If you want to stop the training once the score increases the defined score set the
lesserBetter flag to false (feel free to give the flag a better name)





















### ScoreImprovementEpochTerminationCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/termination/ScoreImprovementEpochTerminationCondition.java) </span>

Terminate training if best model score does not improve for N epochs
