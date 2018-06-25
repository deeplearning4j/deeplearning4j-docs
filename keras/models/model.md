---
title: model
layout: default
---
# KerasModel

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras//KerasModel.java) </span>
Build ComputationGraph from Keras (Functional API) Model or
Sequential model configuration.


<b>KerasModel</b> 
```java
public KerasModel(KerasModelBuilder modelBuilder)
            throws UnsupportedKerasConfigurationException, IOException, InvalidKerasConfigurationException 
```


(Recommended) Builder-pattern constructor for (Functional API) Model.

- param modelBuilder builder object
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getComputationGraphConfiguration</b> 
```java
public ComputationGraphConfiguration getComputationGraphConfiguration()
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


(Not recommended) Constructor for (Functional API) Model from model configuration
(JSON or YAML), training configuration (JSON), weights, and "training mode"
boolean indicator. When built in training mode, certain unsupported configurations
(e.g., unknown regularizers) will throw Exceptions. When enforceTrainingConfig=false, these
will generate warnings but will be otherwise ignored.

- param modelJson             model configuration JSON string
- param modelYaml             model configuration YAML string
- param enforceTrainingConfig whether to enforce training-related configurations
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Methods</b>

---
<b>getComputationGraph</b> 
```java
public ComputationGraph getComputationGraph()
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Build a ComputationGraph from this Keras Model configuration and import weights.

- return ComputationGraph


---
<b>Methods</b>

---
<b>getComputationGraph</b> 
```java
public ComputationGraph getComputationGraph(boolean importWeights)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Build a ComputationGraph from this Keras Model configuration and (optionally) import weights.

- param importWeights whether to import weights
- return ComputationGraph


