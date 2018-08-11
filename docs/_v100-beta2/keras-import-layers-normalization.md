---
title: Keras Import Normalization Layers
short_title: Normalization Layers
description: Supported Keras normalization layers.
category: Keras Import
weight: 4
---

## Keras layers


---

### KerasBatchNormalization
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/normalization/KerasBatchNormalization.java) </span>

Imports a BatchNormalization layer from Keras.


##### KerasBatchNormalization 
```java
public KerasBatchNormalization(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getBatchNormalizationLayer 
```java
public BatchNormalization getBatchNormalizationLayer() 
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

##### getNumParams 
```java
public int getNumParams() 
```


Returns number of trainable parameters in layer.

- return number of trainable parameters (4)

##### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for layer.

- param weights Map from parameter name to INDArray.

