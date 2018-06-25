---
title: sequential
layout: default
---
# KerasSequentialModel

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras//KerasSequentialModel.java) </span>
Build DL4J MultiLayerNetwork model from Keras Sequential
model configuration.


<b>KerasSequentialModel</b> 
```java
public KerasSequentialModel(KerasModelBuilder modelBuilder)
            throws UnsupportedKerasConfigurationException, IOException, InvalidKerasConfigurationException 
```


(Recommended) Builder-pattern constructor for Sequential model.

- param modelBuilder builder object
- throws IOException                            I/O exception
- throws InvalidKerasConfigurationException     Invalid Keras configuration
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration


---
<b>Constructors</b>

---
<b>KerasSequentialModel</b> 
```java
public KerasSequentialModel(String modelJson, String modelYaml, Hdf5Archive weightsArchive, String weightsRoot,
                                String trainingJson, Hdf5Archive trainingArchive, boolean enforceTrainingConfig,
                                int[] inputShape)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


(Not recommended) Constructor for Sequential model from model configuration
(JSON or YAML), training configuration (JSON), weights, and "training mode"
boolean indicator. When built in training mode, certain unsupported configurations
(e.g., unknown regularizers) will throw Exceptions. When enforceTrainingConfig=false, these
will generate warnings but will be otherwise ignored.

- param modelJson    model configuration JSON string
- param modelYaml    model configuration YAML string
- param trainingJson training configuration JSON string
- throws IOException I/O exception


---
<b>Constructors</b>

---
<b>KerasSequentialModel</b> 
```java
public KerasSequentialModel() 
```


Default constructor


<b>getMultiLayerConfiguration</b> 
```java
public MultiLayerConfiguration getMultiLayerConfiguration()
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Configure a MultiLayerConfiguration from this Keras Sequential model configuration.

- return MultiLayerConfiguration


---
<b>Methods</b>

---
<b>getMultiLayerNetwork</b> 
```java
public MultiLayerNetwork getMultiLayerNetwork()
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Build a MultiLayerNetwork from this Keras Sequential model configuration.

- return MultiLayerNetwork


---
<b>Methods</b>

---
<b>getMultiLayerNetwork</b> 
```java
public MultiLayerNetwork getMultiLayerNetwork(boolean importWeights)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Build a MultiLayerNetwork from this Keras Sequential model configuration and import weights.

- return MultiLayerNetwork

