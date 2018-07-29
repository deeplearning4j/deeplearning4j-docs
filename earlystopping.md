---
title: Early Stopping
layout: default
---

# Early Stopping

When training neural networks, numerous decisions need to be made regarding the settings (hyperparameters) used, in order to obtain good performance. Once such hyperparameter is the number of training epochs: that is, how many full passes of the data set (epochs) should be used? If we use too few epochs, we might underfit (i.e., not learn everything we can from the training data); if we use too many epochs, we might overfit (i.e., fit the 'noise' in the training data, and not the signal).

Early stopping attempts to remove the need to manually set this value. It can also be considered a type of regularization method (like L1/L2 weight decay and dropout) in that it can stop the network from overfitting.

The idea behind early stopping is relatively simple:

* Split data into training and test sets
* At the end of each epoch (or, every N epochs):
  * evaluate the network performance on the test set
  * if the network outperforms the previous best model: save a copy of the network at the current epoch
* Take as our final model the model that has the best test set performance


This is shown graphically below:

![Early Stopping](./img/earlystopping.png)

The best model is the one saved at the time of the vertical dotted line - i.e., the model with the best accuracy on the test set.


Using DL4J's early stopping functionality requires you to provide a number of configuration options:

* A score calculator, such as the *DataSetLossCalculator*([JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculator.html), [Source Code](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculator.java)) for a Multi Layer Network, or *DataSetLossCalculatorCG* ([JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculatorCG.html), [Source Code](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/scorecalc/DataSetLossCalculatorCG.java)) for a Computation Graph. These can be used to calculate for example the loss function value or the accuracy on a test set at every epoch. 
* How frequently we want to calculate the score function (default: every epoch)
* One or more termination conditions, which tell the training process when to stop. There are two classes of termination conditions:
  * Epoch termination conditions: evaluated every N epochs
  * Iteration termination conditions: evaluated once per minibatch
* A model saver, that defines how models are saved (see: [LocalFileModelSaver JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/saver/LocalFileModelSaver.html), [LocalFileModelSaver Source Code](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/saver/LocalFileModelSaver.java)  and [InMemoryModelSaver JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/saver/InMemoryModelSaver.html), [InMemoryModelSaver Source Code](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/saver/InMemoryModelSaver.java) )

An example, with an epoch termination condition of maximum of 30 epochs, a maximum of 20 minutes training time, calculating the score every epoch, and saving the intermediate results to disk:

```

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




Examples of epoch termination conditions:

* To terminate training after a specified (maxiumum) number of epochs, use the [MaxEpochsTerminationCondition](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/termination/MaxEpochsTerminationCondition.html)
* To terminate if the test set score does not improve for M consecutive epochs, use [ScoreImprovementEpochTerminationCondition](https://deeplearning4j.org/doc/org/deeplearning4j/earlystopping/termination/ScoreImprovementEpochTerminationCondition.html)

Examples of iteration terminations conditions:

* To terminate training after a specified amount of time (without waiting for an epoch to complete),  use [MaxTimeIterationTerminationCondition](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/earlystopping/termination/MaxTimeIterationTerminationCondition.java)
* To terminate training if the score exceeds a certain value at any point, use [MaxScoreIterationTerminationCondition](https://github.com/deeplearning4j/deeplearning4j/blob/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/termination/MaxScoreIterationTerminationCondition.java). This can be useful for example to terminate the training immediately if the network is poorly tuned or training becomes unstable (such as exploding weights/scores).

The source code for the built in termination classes are in this [directory](https://github.com/deeplearning4j/deeplearning4j/tree/c152293ef8d1094c281f5375ded61ff5f8eb6587/deeplearning4j-core/src/main/java/org/deeplearning4j/earlystopping/termination)

You can of course implement your own iteration and epoch termination conditions.

## Early Stopping w/ Parallel Wrapper

The early stopping implementation described above will only work with a single device. However, `EarlyStoppingParallelTrainer` provides similar functionality as early stopping and allows you to optimize for either multiple CPUs or GPUs. `EarlyStoppingParallelTrainer` wraps your model in a `ParallelWrapper` class and performs localized distributed training.

Note that `EarlyStoppingParallelTrainer` doesn't support all of the functionality as its single device counterpart. It is not UI-compatible and may not work with complex iteration listeners. This is due to how the model is distributed and copied in the background.

[TestParallelEarlyStopping.java](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-scaleout/deeplearning4j-scaleout-parallelwrapper/src/test/java/org/deeplearning4j/parallelism/TestParallelEarlyStopping.java) gives a good example of setting up parallel early stopping in different scenarios.


## Final notes

* Here's a [very simple example using early stopping](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/misc/earlystopping/EarlyStoppingMNIST.java)
* [These unit tests](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-core/src/test/java/org/deeplearning4j/earlystopping/TestEarlyStopping.java) may also be useful.
* Conducting early stopping training on Spark is also possible. The network configuration is the same; however, instead of using the EarlyStoppingTrainer as above, use the [SparkEarlyStoppingTrainer](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/earlystopping/SparkEarlyStoppingTrainer.java)
  *  [These unit tests](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/test/java/org/deeplearning4j/spark/TestEarlyStoppingSpark.java) may also be useful for using early stopping on Spark.
