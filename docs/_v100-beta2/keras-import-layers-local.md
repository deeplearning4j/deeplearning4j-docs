---
title: Keras Import Local Layers
short_title: Local Layers
description: Supported Keras local layers.
category: Keras Import
weight: 4
---

## Keras local layers

### KerasLocallyConnected1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/local/KerasLocallyConnected1D.java) </span>

Imports a 1D locally connected layer from Keras.


##### KerasLocallyConnected1D 
```java
public KerasLocallyConnected1D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getLocallyConnected1DLayer 
```java
public LocallyConnected1D getLocallyConnected1DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config

##### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for 1D locally connected layer.

- param weights Map from parameter name to INDArray.




### KerasLocallyConnected2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/local/KerasLocallyConnected2D.java) </span>

Imports a 2D locally connected layer from Keras.


##### KerasLocallyConnected2D 
```java
public KerasLocallyConnected2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getLocallyConnected2DLayer 
```java
public LocallyConnected2D getLocallyConnected2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config

##### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for 2D locally connected layer.

- param weights Map from parameter name to INDArray.

