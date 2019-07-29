---
title: Neural Network Transfer Learning
short_title: Transfer Learning
description:
category: Tuning & Training
weight: 5
---

## DL4J’s Transfer Learning API

The DL4J transfer learning API enables users to:

* Modify the architecture of an existing model
* Fine tune learning configurations of an existing model.
* Hold parameters of a specified layer constant during training, also referred to as “frozen" 
 
Holding certain layers frozen on a network and training is effectively the same as training on a transformed version of the input, the transformed version being the intermediate outputs at the boundary of the frozen layers. This is the process of “feature extraction” from the input data and will be referred to as “featurizing” in this document. 


## The transfer learning helper

The forward pass to “featurize” the input data on large, pertained networks can be time consuming. DL4J also provides a TransferLearningHelper class with the following capabilities. 

* Featurize an input dataset to save for future use
* Fit the model with frozen layers with a featurized dataset 
* Output from the model with frozen layers given a featurized input.

When running multiple epochs users will save on computation time since the expensive forward pass on the frozen layers/vertices will only have to be conducted once.


## Show me the code

This example will use VGG16 to classify images belonging to five categories of flowers. The dataset will automatically download from http://download.tensorflow.org/example_images/flower_photos.tgz

#### I.  Import a zoo model

As of 0.9.0 (0.8.1-SNAPSHOT) Deeplearning4j has a new native model zoo. Read about the [deeplearning4j-zoo](/model-zoo) module for more information on using pretrained models. Here, we load a pretrained VGG-16 model initialized with weights trained on ImageNet:

```
ZooModel zooModel = new VGG16();
ComputationGraph pretrainedNet = (ComputationGraph) zooModel.initPretrained(PretrainedType.IMAGENET);
```


#### II.  Set up a fine-tune configuration

```
FineTuneConfiguration fineTuneConf = new FineTuneConfiguration.Builder()
            .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
            .updater(new Nesterovs(5e-5))
            .seed(seed)
            .build();
```

#### III.  Build new models based on VGG16

##### A.Modifying only the last layer, keeping other frozen

The final layer of VGG16 does a softmax regression on the 1000 classes in ImageNet. We modify the very last layer to give predictions for five classes keeping the other layers frozen.

```
ComputationGraph vgg16Transfer = new TransferLearning.GraphBuilder(pretrainedNet)
    .fineTuneConfiguration(fineTuneConf)
              .setFeatureExtractor("fc2")
              .removeVertexKeepConnections("predictions") 
              .addLayer("predictions", 
        new OutputLayer.Builder(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
                        .nIn(4096).nOut(numClasses)
                        .weightInit(WeightInit.XAVIER)
                        .activation(Activation.SOFTMAX).build(), "fc2")
              .build();
```
After a mere thirty iterations, which in this case is exposure to 450 images, the model attains an accuracy > 75% on the test dataset. This is rather remarkable considering the complexity of training an image classifier from scratch.

##### B. Attach new layers to the bottleneck (block5_pool)

Here we hold all but the last three dense layers frozen and attach new dense layers onto it. Note that the primary intent here is to demonstrate the use of the API, secondary to what might give better results.

```
ComputationGraph vgg16Transfer = new TransferLearning.GraphBuilder(pretrainedNet)
              .fineTuneConfiguration(fineTuneConf)
              .setFeatureExtractor("block5_pool")
              .nOutReplace("fc2",1024, WeightInit.XAVIER)
              .removeVertexAndConnections("predictions") 
              .addLayer("fc3",new DenseLayer.Builder()
         .activation(Activation.RELU)
         .nIn(1024).nOut(256).build(),"fc2") 
              .addLayer("newpredictions",new OutputLayer
        .Builder(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
                                .activation(Activation.SOFTMAX)
                                .nIn(256).nOut(numClasses).build(),"fc3") 
            .setOutputs("newpredictions") 
            .build();
```

##### C. Fine tune layers from a previously saved model 

Say we have saved off our model from (B) and now want to allow “block_5” layers to train. 

```
ComputationGraph vgg16FineTune = new TransferLearning.GraphBuilder(vgg16Transfer)
              .fineTuneConfiguration(fineTuneConf)
              .setFeatureExtractor(“block4_pool”)
              .build();
```

#### IV.  Saving “featurized” datasets and training with them.

We use the transfer learning helper API. Note this freezes the layers of the model passed in.

Here is how you obtain the featured version of the dataset at the specified layer “fc2”.

```
TransferLearningHelper transferLearningHelper = 
    new TransferLearningHelper(pretrainedNet, "fc2");
while(trainIter.hasNext()) {
        DataSet currentFeaturized = transferLearningHelper.featurize(trainIter.next());
        saveToDisk(currentFeaturized,trainDataSaved,true);
  trainDataSaved++;
}
```

Here is how you can fit with a featured dataset. vgg16Transfer is a model setup in (A) of section III.

```
TransferLearningHelper transferLearningHelper = 
    new TransferLearningHelper(vgg16Transfer);
while (trainIter.hasNext()) {
       transferLearningHelper.fitFeaturized(trainIter.next());
}
```

## Notes

* The TransferLearning builder returns a new instance of a dl4j model. 

Keep in mind this is a second model that leaves the original one untouched. For large pertained network take into consideration memory requirements and adjust your JVM heap space accordingly.

* The trained model helper imports models from Keras without enforcing a training configuration. 

Therefore the last layer (as seen when printing the summary) is a dense layer and not an output layer with a loss function. Therefore to modify nOut of an output layer we delete the layer vertex, keeping it’s connections and add back in a new output layer with the same name, a different nOut, the suitable loss function etc etc. 

* Changing nOuts at a layer/vertex will modify nIn of the layers/vertices it fans into. 

When changing nOut users can specify a weight initialization scheme or a distribution for the layer as well as a separate weight initialization scheme or distribution for the layers it fans out to.

* Frozen layer configurations are not saved when writing the model to disk. 

In other words, a model with frozen layers when serialized and read back in will not have any frozen layers. To continue training holding specific layers constant the user is expected to go through the transfer learning helper or the transfer learning API. There are two ways to “freeze” layers in a dl4j model.

    - On a copy: With the transfer learning API which will return a new model with the relevant frozen layers
    - In place: With the transfer learning helper API which will apply the frozen layers to the given model.

* FineTune configurations will selectively update learning parameters. 

For eg, if a learning rate is specified this learning rate will apply to all unfrozen/trainable layers in the model. However, newly added layers can override this learning rate by specifying their own learning rates in the layer builder.

## Utilities


---

### TransferLearningHelper
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/transferlearning//TransferLearningHelper.java) </span>

This class is intended for use with the transfer learning API.
Often times transfer learning models have "frozen" layers where parameters are held constant during training
For ease of training and quick turn around times, the dataset to be trained on can be featurized and saved to disk.
Featurizing in this case refers to conducting a forward pass on the network and saving the activations from the output
of the frozen layers.
During training the forward pass and the backward pass through the frozen layers can be skipped entirely and the "featurized"
dataset can be fit with the smaller unfrozen part of the computation graph which allows for quicker iterations.
The class internally traverses the computation graph/MLN and builds an instance of the computation graph/MLN that is
equivalent to the unfrozen subset.


##### TransferLearningHelper 
```java
public TransferLearningHelper(ComputationGraph orig, String... frozenOutputAt) 
```


Will modify the given comp graph (in place!) to freeze vertices from input to the vertex specified.

- param orig           Comp graph
- param frozenOutputAt vertex to freeze at (hold params constant during training)


##### errorIfGraphIfMLN 
```java
public void errorIfGraphIfMLN() 
```


Expects a computation graph where some vertices are frozen

- param orig

##### unfrozenGraph 
```java
public ComputationGraph unfrozenGraph() 
```


Returns the unfrozen subset of the original computation graph as a computation graph
Note that with each call to featurizedFit the parameters to the original computation graph are also updated

##### unfrozenMLN 
```java
public MultiLayerNetwork unfrozenMLN() 
```


Returns the unfrozen layers of the MultiLayerNetwork as a multilayernetwork
Note that with each call to featurizedFit the parameters to the original MLN are also updated

##### outputFromFeaturized 
```java
public INDArray outputFromFeaturized(INDArray input) 
```


Use to get the output from a featurized input

- param input featurized data
- return output

##### featurize 
```java
public MultiDataSet featurize(MultiDataSet input) 
```


Runs through the comp graph and saves off a new model that is simply the "unfrozen" part of the origModel
This "unfrozen" model is then used for training with featurized data

##### featurize 
```java
public DataSet featurize(DataSet input) 
```


During training frozen vertices/layers can be treated as "featurizing" the input
The forward pass through these frozen layer/vertices can be done in advance and the dataset saved to disk to iterate
quickly on the smaller unfrozen part of the model
Currently does not support datasets with feature masks

- param input multidataset to feed into the computation graph with frozen layer vertices
- return a multidataset with input features that are the outputs of the frozen layer vertices and the original labels.

##### fitFeaturized 
```java
public void fitFeaturized(MultiDataSetIterator iter) 
```


Fit from a featurized dataset.
The fit is conducted on an internally instantiated subset model that is representative of the unfrozen part of the original model.
After each call on fit the parameters for the original model are updated

- param iter





---

### FineTuneConfiguration
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/transferlearning//FineTuneConfiguration.java) </span>

Configuration for fine tuning. Note that values set here will override values for all non-frozen layers


##### FineTuneConfiguration 
```java
public FineTuneConfiguration build() 
```


Activation function / neuron non-linearity





---

### TransferLearning
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/transferlearning//TransferLearning.java) </span>

The transfer learning API can be used to modify the architecture or the learning parameters of an existing multilayernetwork or computation graph.
It allows one to
- change nOut of an existing layer
- remove and add existing layers/vertices
- fine tune learning configuration (learning rate, updater etc)
- hold parameters for specified layers as a constant

##### fineTuneConfiguration 
```java
public Builder fineTuneConfiguration(FineTuneConfiguration finetuneConfiguration) 
```


Multilayer Network to tweak for transfer learning
- param origModel

##### setFeatureExtractor 
```java
public Builder setFeatureExtractor(int layerNum) 
```


Specify a layer to set as a "feature extractor"
The specified layer and the layers preceding it will be "frozen" with parameters staying constant
- param layerNum
- return Builder

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, WeightInit scheme) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer

- param layerNum The index of the layer to change nOut of
- param nOut     Value of nOut to change to
- param scheme   Weight Init scheme to use for params in layernum and layernum+1
- return Builder

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, Distribution dist) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer

- param layerNum The index of the layer to change nOut of
- param nOut     Value of nOut to change to
- param dist     Distribution to use in conjunction with weight init DISTRIBUTION for params in layernum and layernum+1
- return Builder
- see org.deeplearning4j.nn.weights.WeightInit DISTRIBUTION

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, WeightInit scheme, WeightInit schemeNext) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer
Can specify different weight init schemes for the specified layer and the layer that follows it.

- param layerNum   The index of the layer to change nOut of
- param nOut       Value of nOut to change to
- param scheme     Weight Init scheme to use for params in the layerNum
- param schemeNext Weight Init scheme to use for params in the layerNum+1
- return Builder

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, Distribution dist, Distribution distNext) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer
Can specify different weight init schemes for the specified layer and the layer that follows it.

- param layerNum The index of the layer to change nOut of
- param nOut     Value of nOut to change to
- param dist     Distribution to use for params in the layerNum
- param distNext Distribution to use for parmas in layerNum+1
- return Builder
- see org.deeplearning4j.nn.weights.WeightInitDistribution

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, WeightInit scheme, Distribution distNext) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer
Can specify different weight init schemes for the specified layer and the layer that follows it.

- param layerNum The index of the layer to change nOut of
- param nOut     Value of nOut to change to
- param scheme   Weight init scheme to use for params in layerNum
- param distNext Distribution to use for parmas in layerNum+1
- return Builder
- see org.deeplearning4j.nn.weights.WeightInitDistribution

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, Distribution dist, WeightInit schemeNext) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer
Can specify different weight init schemes for the specified layer and the layer that follows it.

- param layerNum   The index of the layer to change nOut of
- param nOut       Value of nOut to change to
- param dist       Distribution to use for parmas in layerNum
- param schemeNext Weight init scheme to use for params in layerNum+1
- return Builder
- see org.deeplearning4j.nn.weights.WeightInitDistribution

##### nOutReplace 
```java
public Builder nOutReplace(int layerNum, int nOut, IWeightInit scheme, IWeightInit schemeNext) 
```


Modify the architecture of a layer by changing nOut
Note this will also affect the layer that follows the layer specified, unless it is the output layer
Can specify different weight init schemes for the specified layer and the layer that follows it.

- param layerNum   The index of the layer to change nOut of
- param nOut       Value of nOut to change to
- param scheme     Weight Init scheme to use for params in the layerNum
- param schemeNext Weight Init scheme to use for params in the layerNum+1

##### nInReplace 
```java
public Builder nInReplace(int layerNum, int nIn, WeightInit scheme) 
```


Modify the architecture of a vertex layer by changing nIn of the specified layer.<br>
Note that only the specified layer will be modified - all other layers will not be changed by this call.

- param layerNum The number of the layer to change nIn of
- param nIn      Value of nIn to change to
- param scheme   Weight init scheme to use for params in layerName
- return Builder

##### nInReplace 
```java
public Builder nInReplace(int layerNum, int nIn, WeightInit scheme, Distribution dist) 
```


Modify the architecture of a vertex layer by changing nIn of the specified layer.<br>
Note that only the specified layer will be modified - all other layers will not be changed by this call.

- param layerNum The number of the layer to change nIn of
- param nIn      Value of nIn to change to
- param scheme   Weight init scheme to use for params in layerName
- return Builder

##### nInReplace 
```java
public Builder nInReplace(int layerNum, int nIn, IWeightInit scheme) 
```


Modify the architecture of a vertex layer by changing nIn of the specified layer.<br>
Note that only the specified layer will be modified - all other layers will not be changed by this call.

- param layerNum The number of the layer to change nIn of
- param nIn      Value of nIn to change to
- param scheme   Weight init scheme to use for params in layerName
- return Builder

##### removeOutputLayer 
```java
public Builder removeOutputLayer() 
```


Helper method to remove the outputLayer of the net.
Only one of the two - removeOutputLayer() or removeLayersFromOutput(layerNum) - can be specified
When removing layers at the very least an output layer should be added with .addLayer(...)

- return Builder

##### removeLayersFromOutput 
```java
public Builder removeLayersFromOutput(int layerNum) 
```


Remove last "n" layers of the net
At least an output layer must be added back in
- param layerNum number of layers to remove
- return Builder

##### addLayer 
```java
public Builder addLayer(Layer layer) 
```


Add layers to the net
Required if layers are removed. Can be called multiple times and layers will be added in the order with which they were called.
At the very least an outputLayer must be added (output layer should be added last - as per the note on order)
Learning configs (like updaters, learning rate etc) specified with the layer here will be honored

- param layer layer conf to add (similar to the NeuralNetConfiguration .list().layer(...)
- return Builder

##### setInputPreProcessor 
```java
public Builder setInputPreProcessor(int layer, InputPreProcessor processor) 
```


Specify the preprocessor for the added layers
for cases where they cannot be inferred automatically.

- param processor to be used on the data
- return Builder

##### validateOutputLayerConfig 
```java
public GraphBuilder validateOutputLayerConfig(boolean validateOutputLayerConfig)
```


Returns a model with the fine tune configuration and specified architecture changes.
.init() need not be called. Can be directly fit.

- return MultiLayerNetwork

##### build 
```java
public ComputationGraph build() 
```


Modify the architecture of a vertex layer by changing nIn of the specified layer.<br>
Note that only the specified layer will be modified - all other layers will not be changed by this call.

- param layerName The name of the layer to change nIn of
- param nIn       Value of nIn to change to
- param scheme    Weight init scheme to use for params in layerName and the layers following it
- return GraphBuilder

