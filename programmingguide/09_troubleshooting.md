---
title: DeepLearning4j Troubleshooting
layout: default
---

# DeepLearning4j: Troubleshooting Neural Networks

In this section, we'll talk about troubleshooting neural networks using DL4J. Training neural networks is difficult. The settings of the hyperparameters play a huge role in how the neural network learns from the training data. If the hyperparameters are chosen poorly, the neural network may learn very slowly or not at all. This section will help you troubleshoot, if you find that your neural network is not learning well. 

- [**Data Normalization**](#data) 
- [**Weight Initialization**](#weight) 
- [**Training Epochs**](#training)
- [**Regularization**](#regularization)
- [**Activation Functions**](#activation)
- [**Learning Rate**](#learning)

## <a name="data">Data Normalization</a>

One consideration is how the data is scaled before starting the training process. For variables that can take continuous values, it is helpful for them to range from -1 to 1, 0 to 1, or normalized with a mean of 0 and a standard deviation of 1. Preprocessing the variables in these ways can help neural networks learn, because the variables will all be in the same scale. 

For variables that are discrete, it is helpful to use so-called 1-hot representation. For example, if your variable takes 3 classes, then [1,0,0] will represent the first class, [0,1,0] will represent the second class, and [0,0,1] will represent the third class. If you do decide to scale or normalize the variables, make sure to apply the same transformation to all splits of the data.

To normalize the data, use code similar to the snippet below before training a neural network. We assume that `trainingData` and `testData` are `DataSetIterators` of the training and testing splits, respcetively. 

```
DataNormalization normalizer = new NormalizerStandardize();
normalizer.fit(trainingData);           //Collect the statistics (mean/stdev) from the training data. This does not modify the input data
normalizer.transform(trainingData);     //Apply normalization to the training data
normalizer.transform(testData);         //Apply normalization to the test data. This is using statistics calculated from the *training* set
```

To scale the variables, a `NormalizerMinMaxScaler` should be used as shown below. As you can see, the process between different scaling and normalizers are similar.

```
NormalizerMinMaxScaler preProcessor = new NormalizerMinMaxScaler();
preProcessor.fit(trainingData);
preProcessor.transform(trainingData);    
preProcessor.transform(testData);    
```

## <a name="weight">Weight Initialization</a>

How the weights of a neural network are initialized can play a big role in learning. It's important to set the weights of nodes across a neural network differently, because we want the nodes to follow different gradients throughout training. To initialize the weights, use the `.weightInit(WeightInit)` method in the neural network configuration. Weights should be neither too small nor too large; Xavier weight initialization is a sensible choice to ensure that is the case. For networks with rectified linear (relu) or leaky relu activations, RELU weight initialization can be used.

Below is an example of a neural network configuration using the Xavier weight initialization for the hidden and output layers. To use other initializations, just change `WeightInit.XAVIE`R in the `.weightInit()` method. Other examples include `WeightInit.RELU` and `WeightInit.UNIFORM`.

```
MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .updater(new Sgd(learningRate))
    .list()
    .layer(0, new DenseLayer.Builder().nIn(numInputs).nOut(numHiddenNodes)
        .weightInit(WeightInit.XAVIER)
        .activation(Activation.RELU)
        .build())
    .layer(1, new OutputLayer.Builder(LossFunction.NEGATIVELOGLIKELIHOOD)
    .weightInit(WeightInit.XAVIER)
    .activation(Activation.SOFTMAX)
    .nIn(numHiddenNodes).nOut(numOutputs).build())
.pretrain(false).backprop(true).build();
```

## <a name="training">Training Epochs</a>

A training epoch is defined as "one full pass through the training set." Thus, if you use 10 epochs to train the data, the neural network will be trained by a sample 10 times in total. Generally, you should use multiple epochs to train your data. But it is important to note that if too many epochs are used, then the neural network is likely to overfit on the training data. On the other hand, if too few epochs are used, then the neural network won't have enough time to learn. 

One useful method for choosing the number of epochs to use is "early stopping," which will help prevent the neural network from overfitting. The basic notion of early stopping is simple. We first split the data into training and testing splits. At the end of every epoch (or every n epochs), we can evaluate the performance on the test set. If the neural network outperforms the previous best model, then we save the neural network at the current epoch. At the end we will take the best performing neural network. 

We will now show an example of an application of early stopping. Assume `myTrainData` and `myTestData` are `DataSetIterators` that contain our splits of the data, and that `myNetworkConfiguration` contains the configuration of the neural network.

```
MultiLayerConfiguration myNetworkConfiguration = ...;
DataSetIterator myTrainData = ...;
DataSetIterator myTestData = ...;
```

We must then configure how early stopping is applied. The `epochterminationConditions` tell us that training will last 30 epochs maximum and the `iterationTerminationConditions` tell us that the training will stop if the training time surpasses 20 minutes. The loss will be calculated on `myTestData` every epoch, and the models will be saved in `directory`.

```
EarlyStoppingConfiguration esConf = new EarlyStoppingConfiguration.Builder()
	.epochTerminationConditions(new MaxEpochsTerminationCondition(30))
	.iterationTerminationConditions(new MaxTimeIterationTerminationCondition(20, TimeUnit.MINUTES))
	.scoreCalculator(new DataSetLossCalculator(myTestData, true))
  	.evaluateEveryNEpochs(1)
	.modelSaver(new LocalFileModelSaver(directory))
	.build();
```

To set early stopping for `myTrainData`, we initialize an `EarlyStoppingTrainer`, and to actually apply early stopping, we can use the `fit()` method of the `EarlyStoppingTrainer`.

```
EarlyStoppingTrainer trainer = new EarlyStoppingTrainer(esConf,myNetworkConfiguration,myTrainData);

//Conduct early stopping training:
EarlyStoppingResult result = trainer.fit();
```

We can then print out the results and save the best model using the `getBestModel()` of `EarlyStoppingResult`.

```
//Print out the results:
System.out.println("Termination reason: " + result.getTerminationReason());
System.out.println("Termination details: " + result.getTerminationDetails());
System.out.println("Total epochs: " + result.getTotalEpochs());
System.out.println("Best epoch number: " + result.getBestModelEpoch());
System.out.println("Score at best epoch: " + result.getBestModelScore());

//Get the best model:
MultiLayerNetwork bestModel = result.getBestModel();
```

## <a name="regularization">Regularization</a>

Regularization is a way to avoid overfitting on the training data. Overfitting occurs when the model performs well on the training data but not on the test data or any other data, for that matter. One way to think about it is that the overfitted neural network has memorized the training data, instead of finding actual relationships and correlations between the features and the response, input and output. 

`l1` and `l2` are common regularization methods that penalize the weights of the neural network when they get too large. However, we must be careful to not regularize too much, lest the neural network not learn at all. To use l1/l2/dropout regularization, use `.regularization(true)` followed by `.l1(x)`, `.l2(y)`, respectively in the neural network configuration.

Dropout is also a common regularization method. The common dropout value is 0.5. The idea is that dropout randomly sets nodes to 0 -- it let's the values passing through them "drop out" -- which encourages the neural network to rely on other nodes as features. Thus, the neural network learns to make generalized representations of the data that are not too reliant on any one feature. For more information about dropout, see [this page](https://www.cs.toronto.edu/~hinton/absps/JMLRdropout.pdf). To add dropout to a neural network, use `.dropout(z)` after setting `.regularization(true)` in the neural network configuration.

## <a name="activation">Activation Function</a>

The choice of the activation will depend on the data, and on which layers you are looking at. For hidden layers, relu or leakyrelu are commonly used activation functions. Tanh and sigmoid may cause vanishing gradient problems, which means the gradient approaches 0 and is therefore difficult for a neural net to move along as it minimizes error. This hinders how the neural network learns from the data.

For the output layer, the choice of activation function depends on the task at hand. If classification is used, you need the softmax activation function so the outputs become probabilities. For regression purposes, the identity function should be used. 

## <a name="learning">Learning Rate</a>

The learning rate is the most important hyperparameter of the neural network. If the learning rate is too small, then the neural network will learn too slowly; if the learning rate is too large, then the neural network may not learn at all. Typically, the learning rate is between 0.1 and 1e^-6, but the right amount will depend on the specific dataset used.

One way to set the learning rate is to test different learning rates using some sort of grid of values. We show an example  using random search. We first define a range of learning rate values using a `ParameterSpace` class. Here they can range from 0.0001 to 0.1. We can also optimize other hyperparameters simultaneously, such as the size of the layer in this example.

```
ParameterSpace<Double> learningRateHyperparam = new ContinuousParameterSpace(0.0001, 0.1);
ParameterSpace<Integer> layerSizeHyperparam = new IntegerParameterSpace(16,256);
```

Next, we define a `MultiLayerSpace` instance, which is similar to a `MultiLayerNetwork` but can take in values to optimizer like the learning rate and layer size. 

```
 MultiLayerSpace hyperparameterSpace = new MultiLayerSpace.Builder()
   .weightInit(WeightInit.XAVIER)
    //Learning rate hyperparameter: search over different values, applied to all models
	.updater(new SgdSpace(learningRateHyperparam))
    .addLayer( new DenseLayerSpace.Builder()
        .nIn(784)  
        .activation(Activation.LEAKYRELU)
        //One hyperparameter to infer: layer size
        .nOut(layerSizeHyperparam)
        .build())
    .addLayer( new OutputLayerSpace.Builder()
        .nOut(10)
    .activation(Activation.SOFTMAX)
    .lossFunction(LossFunctions.LossFunction.MCXENT).build())
    .build();
```

The next line determines how we generate candidate values. Here we will use a random-search generator.

```
CandidateGenerator candidateGenerator = new RandomSearchGenerator(hyperparameterSpace);
```

Next, we assume that `trainData` and `testData` are dataset iterators and we use a `dataProvider` class to combine `trainData` and `testData`.

```
DataProvider<DataSetIterator> dataProvider = new DataSetIteratorProvider(trainData, testData);
```

Once models are generated and tested, we need to save them in a directory. The following code will save the models in the directories `arbiterExample/0`, `arbiterExample/1` and so on.

```
String baseSaveDirectory = "directory/";
File f = new File(baseSaveDirectory);
if(f.exists()) f.delete();
f.mkdir();
ResultSaver<DL4JConfiguration,MultiLayerNetwork,Object> modelSaver = new LocalMultiLayerNetworkSaver<>(baseSaveDirectory);
```

We also want some score function to optimizer. Here we optimizer the accuracy using the testing set.

```
ScoreFunction<MultiLayerNetwork,DataSetIterator> scoreFunction = new TestSetAccuracyScoreFunction();
```

Then we make a termination condition to stop after 15 minutes or 20 candidates. 

```
TerminationCondition[] terminationConditions = {new MaxTimeCondition(15, TimeUnit.MINUTES), new MaxCandidatesCondition(20)};
```

Using all the previous configurations, we put them together and set up the execution. 

```
OptimizationConfiguration<DL4JConfiguration, MultiLayerNetwork, DataSetIterator, Object> configuration
        = new OptimizationConfiguration.Builder<DL4JConfiguration, MultiLayerNetwork, DataSetIterator, Object>()
    .candidateGenerator(candidateGenerator)
    .dataProvider(dataProvider)
    .modelSaver(modelSaver)
    .scoreFunction(scoreFunction)
    .terminationConditions(terminationConditions)
    .build();

IOptimizationRunner<DL4JConfiguration,MultiLayerNetwork,Object> runner
    = new LocalOptimizationRunner<>(configuration, new MultiLayerNetworkTaskCreator<>());
```

To actually execute the optimization, we start an Arbiter UI and finally execute it.

```
ArbiterUIServer server = ArbiterUIServer.getInstance();
runner.addListeners(new UIOptimizationRunnerStatusListener(server));

//Start the hyperparameter optimization
runner.execute();
```

Note that `randomSearch` or `gridSearch` may be used to optimize over any of the hyperparameters of the neural network. This includes, but is not limited to, the regularization, hidden nodes, learning rate, mini-batch size, etc. Finding a good or optimal configuration of the hyperparameters is critical to the success of the neural network.

### DL4J Programming Guide  

1. [Intro: Deep Learning, Defined](01_intro)
2. [Process Overview](02_process)
3. [Program & Code Structure](03_code_structure)
4. [Convolutional Network Example](04_convnet)
5. [LSTM Network Example](05_lstm)
6. [Feed-Forward Network Example](06_feedforwardnet)
7. [Natural Language Processing](07_nlp)
8. [AI Model Deployment](08_deploy)
9. [Troubleshooting Neural Networks](09_troubleshooting)
