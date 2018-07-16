---
title: local
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/local/KerasLocallyConnected1D.java) </span>
## KerasLocallyConnected1D

Imports a 1D locally connected layer from Keras.


<b>KerasLocallyConnected1D</b> 
```java
public KerasLocallyConnected1D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLocallyConnected1D</b> 
```java
public KerasLocallyConnected1D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLocallyConnected1D</b> 
```java
public KerasLocallyConnected1D(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getLocallyConnected1DLayer</b> 
```java
public LocallyConnected1D getLocallyConnected1DLayer() 
```


Get DL4J LocallyConnected1D layer.

- return Locally connected 1D layer.


---
<b>Methods</b>

---
<b>getOutputType</b> 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


---
<b>Methods</b>

---
<b>setWeights</b> 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for 1D locally connected layer.

- param weights Map from parameter name to INDArray.


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/local/KerasLocallyConnected2D.java) </span>
## KerasLocallyConnected2D

Imports a 2D locally connected layer from Keras.


<b>KerasLocallyConnected2D</b> 
```java
public KerasLocallyConnected2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLocallyConnected2D</b> 
```java
public KerasLocallyConnected2D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLocallyConnected2D</b> 
```java
public KerasLocallyConnected2D(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getLocallyConnected2DLayer</b> 
```java
public LocallyConnected2D getLocallyConnected2DLayer() 
```


Get DL4J LocallyConnected2D layer.

- return Locally connected 2D layer.


---
<b>Methods</b>

---
<b>getOutputType</b> 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


---
<b>Methods</b>

---
<b>setWeights</b> 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for 2D locally connected layer.

- param weights Map from parameter name to INDArray.

