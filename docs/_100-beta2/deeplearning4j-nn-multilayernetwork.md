---
title: Multilayer Network
short_title: Multilayer Network
description: Simple and sequential network configuration.
category: Models
weight: 3
---

## Why use MultiLayerNetwork?

The `MultiLayerNetwork` class is the simplest network configuration API available in Eclipse Deeplearning4j. This class is useful for beginners or users who do not need a complex and branched network graph. 

You will not want to use `MultiLayerNetwork` configuration if you are creating complex loss functions, using graph vertices, or doing advanced training such as a triplet network. This includes popular complex networks such as InceptionV4.

## Usage

The example below shows how to build a simple linear classifier using `DenseLayer` (a basic multiperceptron layer).

```java
MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
    .seed(seed)
    .iterations(1)
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .learningRate(learningRate)
    .updater(Updater.NESTEROVS).momentum(0.9)
    .list()
    .layer(0, new DenseLayer.Builder().nIn(numInputs).nOut(numHiddenNodes)
            .weightInit(WeightInit.XAVIER)
            .activation("relu")
            .build())
    .layer(1, new OutputLayer.Builder(LossFunction.NEGATIVELOGLIKELIHOOD)
            .weightInit(WeightInit.XAVIER)
            .activation("softmax").weightInit(WeightInit.XAVIER)
            .nIn(numHiddenNodes).nOut(numOutputs).build())
    .pretrain(false).backprop(true).build();
```

You can also create convolutional configurations:

```java
MultiLayerConfiguration.Builder builder = new NeuralNetConfiguration.Builder()
    .seed(seed)
    .iterations(iterations)
    .regularization(true).l2(0.0005)
    .learningRate(0.01)//.biasLearningRate(0.02)
    //.learningRateDecayPolicy(LearningRatePolicy.Inverse).lrPolicyDecayRate(0.001).lrPolicyPower(0.75)
    .weightInit(WeightInit.XAVIER)
    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
    .updater(Updater.NESTEROVS).momentum(0.9)
    .list()
    .layer(0, new ConvolutionLayer.Builder(5, 5)
            //nIn and nOut specify depth. nIn here is the nChannels and nOut is the number of filters to be applied
            .nIn(nChannels)
            .stride(1, 1)
            .nOut(20)
            .activation("identity")
            .build())
    .layer(1, new SubsamplingLayer.Builder(SubsamplingLayer.PoolingType.MAX)
            .kernelSize(2,2)
            .stride(2,2)
            .build())
    .layer(2, new ConvolutionLayer.Builder(5, 5)
            //Note that nIn need not be specified in later layers
            .stride(1, 1)
            .nOut(50)
            .activation("identity")
            .build())
    .layer(3, new SubsamplingLayer.Builder(SubsamplingLayer.PoolingType.MAX)
            .kernelSize(2,2)
            .stride(2,2)
            .build())
    .layer(4, new DenseLayer.Builder().activation("relu")
            .nOut(500).build())
    .layer(5, new OutputLayer.Builder(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
            .nOut(outputNum)
            .activation("softmax")
            .build())
    .backprop(true).pretrain(false);
```

## API


---

### MultiLayerNetwork
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/multilayer/MultiLayerNetwork.java) </span>

MultiLayerNetwork is a neural network with multiple layers in a stack, and usually an output layer.
which allows for an arbitrary directed acyclic graph connection structure between layers.
MultiLayerNetwork is trainable via backprop, with optional pretraining, depending on the type of layers it contains.


##### setCacheMode 
```java
public void setCacheMode(CacheMode mode) 
```


Workspace for working memory for a single layer: forward pass and backward pass
Note that this is opened/closed once per op (activate/backpropGradient call)

##### pretrain 
```java
public void pretrain(DataSetIterator iter) 
```


Initialize the network based on the configuration

- param conf   the configuration json
- param params the parameters

##### pretrain 
```java
public void pretrain(DataSetIterator iter, int numEpochs)
```


Perform layerwise pretraining on all pre-trainable layers in the network (VAEs, Autoencoders, etc), for the specified
number of epochs each. For example, if numEpochs=3, then layer 0 will be fit for 3 epochs, followed by layer 1
for 3 epochs, and so on.<br>
Note that pretraining will be performed on one layer after the other, resetting the DataSetIterator between iterations.<br>
For multiple epochs per layer, appropriately wrap the iterator (for example, a MultipleEpochsIterator) or train
each layer manually using {- link #pretrainLayer(int, DataSetIterator)}

- param iter Training data

##### pretrainLayer 
```java
public void pretrainLayer(int layerIdx, DataSetIterator iter) 
```


Fit for one epoch - see {- link #pretrainLayer(int, DataSetIterator, int)}

##### pretrainLayer 
```java
public void pretrainLayer(int layerIdx, DataSetIterator iter, int numEpochs) 
```


Perform layerwise unsupervised training on a single pre-trainable layer in the network (VAEs, Autoencoders, etc)
for the specified number of epochs<br>
If the specified layer index (0 to numLayers - 1) is not a pretrainable layer, this is a no-op.

- param layerIdx  Index of the layer to train (0 to numLayers-1)
- param iter      Training data
- param numEpochs Number of epochs to fit the specified layer for

##### pretrainLayer 
```java
public void pretrainLayer(int layerIdx, INDArray features) 
```


Perform layerwise unsupervised training on a single pre-trainable layer in the network (VAEs, Autoencoders, etc)<br>
If the specified layer index (0 to numLayers - 1) is not a pretrainable layer, this is a no-op.

- param layerIdx Index of the layer to train (0 to numLayers-1)
- param features Training data array

##### setParams 
```java
public void setParams(INDArray params) 
```


Initialize the MultiLayerNetwork. This should be called once before the network is used.
This is functionally equivalent to calling
{- code init(null, false)}.
- see MultiLayerNetwork#init(INDArray, boolean)

##### activate 
```java
public INDArray activate(TrainingMode training) 
```


Returns a 1 x m vector where the vector is composed of
a flattened vector of all of the weights for the
various neuralNets and output layer

- return the params for this neural net

##### fit 
```java
public void fit(MultiDataSet dataSet) 
```



If this MultiLayerNetwork contains one or more RNN layers: conduct forward pass (prediction)
but using previous stored state for any RNN layers. The activations for the final step are
also stored in the RNN layers for use next time rnnTimeStep() is called.<br>
This method can be used to generate output one or more steps at a time instead of always having to do
forward pass from t=0. Example uses are for streaming data, and for generating samples from network output
one step at a time (where samples are then fed back into the network as input)<br>
If no previous state is present in RNN layers (i.e., initially or after calling rnnClearPreviousState()),
the default initialization (usually 0) is used.<br>
Supports mini-batch (i.e., multiple predictions/forward pass in parallel) as well as for single examples.<br>
- param input Input to network. May be for one or multiple time steps. For single time step:
input has shape [miniBatchSize,inputSize] or [miniBatchSize,inputSize,1]. miniBatchSize=1 for single example.<br>
For multiple time steps: [miniBatchSize,inputSize,inputTimeSeriesLength]
- return Output activations. If output is RNN layer (such as RnnOutputLayer): if input has shape [miniBatchSize,inputSize]
i.e., is 2d, output has shape [miniBatchSize,outputSize] (i.e., also 2d).<br>
Otherwise output is 3d [miniBatchSize,outputSize,inputTimeSeriesLength] when using RnnOutputLayer.

##### fit 
```java
public void fit(@NonNull MultiDataSetIterator iterator, int numEpochs)
```


Perform minibatch training on all minibatches in the MultiDataSetIterator, for the specified number of epochs.
Equvalent to calling {- link #fit(MultiDataSetIterator)} numEpochs times in a loop

- param iterator  Training data (DataSetIterator). Iterator must support resetting
- param numEpochs Number of training epochs, >= 1

##### fit 
```java
public void fit(MultiDataSetIterator iterator) 
```


Perform minibatch training on all minibatches in the MultiDataSetIterator.<br>
Note: The MultiDataSets in the MultiDataSetIterator must have exactly 1 input and output array (as
MultiLayerNetwork only supports 1 input and 1 output)

- param iterator  Training data (DataSetIterator). Iterator must support resetting

##### evaluate 
```java
public Evaluation evaluate(DataSetIterator iterator, List<String> labelsList, int topN) 
```


Evaluate the network (for classification) on the provided data set, with top N accuracy in addition to standard accuracy.
For 'standard' accuracy evaluation only, use topN = 1

- param iterator   Iterator (data) to evaluate on
- param labelsList List of labels. May be null.
- param topN       N value for top N accuracy evaluation
- return Evaluation object, summarizing the results of the evaluation on the provided DataSetIterator

##### summary 
```java
public String summary() 
```


String detailing the architecture of the multilayernetwork.
Columns are LayerIndex with layer type, nIn, nOut, Total number of parameters and the Shapes of the parameters
Will also give information about frozen layers, if any.
- return Summary as a string
- see #memoryInfo(int, InputType)

##### summary 
```java
public String summary(InputType inputType) 
```


String detailing the architecture of the multilayernetwork.
Will also display activation size when given an input type.
Columns are LayerIndex with layer type, nIn, nOut, Total number of parameters, Shapes of the parameters, Input activation shape, Output activation shape
Will also give information about frozen layers, if any.
- return Summary as a string
- see #memoryInfo(int, InputType)

##### memoryInfo 
```java
public String memoryInfo(int minibatch, InputType inputType)
```


Generate information regarding memory use for the network, for the given input type and minibatch size.
Note that when using workspaces or CuDNN, the network should be trained for some iterations so that the memory
workspaces have time to initialize. Without this, the memory requirements during training may be underestimated.

Note also that this is the same information that is generated during an OOM crash when training or performing
inference.

- param minibatch    Minibatch size to estimate memory for
- param inputType    Input type to the network
- return A String with information about network memory use information

##### incrementEpochCount 
```java
public void incrementEpochCount()
```


This method just makes sure there's no state preserved within layers

##### save 
```java
public void save( File f ) throws IOException 
```


Save the MultiLayerNetwork to a file. Restore using {- link #load(File, boolean)}.
Note that this saves the updater (i.e., the state array for momentum/Adam/rmsprop etc), which is desirable
if further training will be undertaken.

- param f File to save the network to
- see ModelSerializer ModelSerializer for more details (and saving/loading via streams)
- see #save(File, boolean)

##### save 
```java
public void save(File f, boolean saveUpdater) throws IOException
```


Save the MultiLayerNetwork to a file. Restore using {- link #load(File, boolean)}.

- param f File to save the network to
- param saveUpdater If true: save the updater (i.e., the state array for momentum/Adam/rmsprop etc), which should
usually be saved if further training is required
- see ModelSerializer ModelSerializer for more details (and saving/loading via streams)
- see #save(File, boolean)

##### load 
```java
public static MultiLayerNetwork load(File f, boolean loadUpdater) throws IOException 
```


Restore a MultiLayerNetwork to a file, saved using {- link #save(File)} or {- link ModelSerializer}
- param f File to load the network from
- param loadUpdater If true: load the updater if it is available (i.e., the state array for momentum/Adam/rmsprop
etc) - use <i>false</i> if no further training is required, or <i>true</i> if further training
will be undertaken
- see ModelSerializer ModelSerializer for more details (and saving/loading via streams)

##### toComputationGraph 
```java
public ComputationGraph toComputationGraph()
```


Convert this MultiLayerNetwork to a ComputationGraph

- return ComputationGraph equivalent to this network (including parameters and updater state)

##### setLearningRate 
```java
public void setLearningRate(double newLr)
```


Set the learning rate for all layers in the network to the specified value. Note that if any learning rate
schedules are currently present, these will be removed in favor of the new (fixed) learning rate.<br>
<br>
<b>Note</b>: <i>This method not free from a performance point of view</i>: a proper learning rate schedule
should be used in preference to calling this method at every iteration.

- param newLr New learning rate for all layers
- see #setLearningRate(ISchedule)
- see #setLearningRate(int, double)

##### setLearningRate 
```java
public void setLearningRate(ISchedule newLr)
```


Set the learning rate schedule for all layers in the network to the specified schedule.
This schedule will replace any/all existing schedules, and also any fixed learning rate values.<br>
Note that the iteration/epoch counts will <i>not</i> be reset. Use {- link MultiLayerConfiguration#setIterationCount(int)}
and {- link MultiLayerConfiguration#setEpochCount(int)} if this is required

- param newLr New learning rate schedule for all layers
- see #setLearningRate(ISchedule)
- see #setLearningRate(int, double)

##### setLearningRate 
```java
public void setLearningRate(int layerNumber, double newLr)
```


Set the learning rate for a single layer in the network to the specified value. Note that if any learning rate
schedules are currently present, these will be removed in favor of the new (fixed) learning rate.<br>
<br>
<b>Note</b>: <i>This method not free from a performance point of view</i>: a proper learning rate schedule
should be used in preference to calling this method at every iteration. Note also that
{- link #setLearningRate(double)} should also be used in preference, when all layers need to be set to a new LR

- param layerNumber Number of the layer to set the LR for
- param newLr New learning rate for a single layer
- see #setLearningRate(ISchedule)
- see #setLearningRate(int, double)

##### setLearningRate 
```java
public void setLearningRate(int layerNumber, ISchedule newLr)
```


Set the learning rate schedule for a single layer in the network to the specified value.<br>
Note also that {- link #setLearningRate(ISchedule)} should also be used in preference, when all layers need
to be set to a new LR schedule.<br>
This schedule will replace any/all existing schedules, and also any fixed learning rate values.<br>
Note also that the iteration/epoch counts will <i>not</i> be reset. Use {- link MultiLayerConfiguration#setIterationCount(int)}
and {- link MultiLayerConfiguration#setEpochCount(int)} if this is required

- param layerNumber Number of the layer to set the LR schedule for
- param newLr New learning rate for a single layer
- see #setLearningRate(ISchedule)
- see #setLearningRate(int, double)

##### getLearningRate 
```java
public Double getLearningRate(int layerNumber)
```


Get the current learning rate, for the specified layer, from the network.
Note: If the layer has no learning rate (no parameters, or an updater without a learning rate) then null is returned
- param layerNumber   Layer number to get the learning rate for
- return Learning rate for the specified layer, or null

##### layerSize 
```java
public int layerSize(int layer) 
```


Return the layer size (number of units) for the specified layer.<br>
Note that the meaning of the "layer size" can depend on the type of layer. For example:<br>
- DenseLayer, OutputLayer, recurrent layers: number of units (nOut configuration option)<br>
- ConvolutionLayer: the channels (number of channels)<br>
- Subsampling layers, global pooling layers, etc: size of 0 is always returned<br>

- param layer Index of the layer to get the size of. Must be in range 0 to nLayers-1 inclusive
- return Size of the layer

##### layerInputSize 
```java
public int layerInputSize(int layer) 
```


Return the input size (number of inputs) for the specified layer.<br>
Note that the meaning of the "input size" can depend on the type of layer. For example:<br>
- DenseLayer, OutputLayer, etc: the feature vector size (nIn configuration option)<br>
- Recurrent layers: the feature vector size <i>per time step</i> (nIn configuration option)<br>
- ConvolutionLayer: the channels (number of channels)<br>
- Subsampling layers, global pooling layers, etc: size of 0 is always returned<br>

- param layer Index of the layer to get the size of. Must be in range 0 to nLayers-1 inclusive
- return Size of the layer

##### equals 
```java
public boolean equals(Object obj) 
```


Indicates whether some other object is "equal to" this one.

The {- code equals} method implements an equivalence relation
on non-null object references:
<ul>
<li>It is <i>reflexive</i>: for any non-null reference value
{- code x}, {- code x.equals(x)} should return
{- code true}.
<li>It is <i>symmetric</i>: for any non-null reference values
{- code x} and {- code y}, {- code x.equals(y)}
should return {- code true} if and only if
{- code y.equals(x)} returns {- code true}.
<li>It is <i>transitive</i>: for any non-null reference values
{- code x}, {- code y}, and {- code z}, if
{- code x.equals(y)} returns {- code true} and
{- code y.equals(z)} returns {- code true}, then
{- code x.equals(z)} should return {- code true}.
<li>It is <i>consistent</i>: for any non-null reference values
{- code x} and {- code y}, multiple invocations of
{- code x.equals(y)} consistently return {- code true}
or consistently return {- code false}, provided no
information used in {- code equals} comparisons on the
objects is modified.
<li>For any non-null reference value {- code x},
{- code x.equals(null)} should return {- code false}.
</ul>

The {- code equals} method for class {- code Object} implements
the most discriminating possible equivalence relation on objects;
that is, for any non-null reference values {- code x} and
{- code y}, this method returns {- code true} if and only
if {- code x} and {- code y} refer to the same object
({- code x == y} has the value {- code true}).

Note that it is generally necessary to override the {- code hashCode}
method whenever this method is overridden, so as to maintain the
general contract for the {- code hashCode} method, which states
that equal objects must have equal hash codes.

- param obj the reference object with which to compare.
- return {- code true} if this object is the same as the obj
argument; {- code false} otherwise.
- see #hashCode()
- see HashMap

