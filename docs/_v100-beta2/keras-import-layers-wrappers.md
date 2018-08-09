---
title: Keras Import Wrapper Layers
short_title: Wrapper Layers
description: Supported Keras wrapper layers.
category: Keras Import
weight: 4
---

## Keras wrapper layers

### KerasBidirectional
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/wrappers/KerasBidirectional.java) </span>

Builds a DL4J Bidirectional layer from a Keras Bidirectional layer wrapper


##### KerasBidirectional 
```java
public KerasBidirectional(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getUnderlyingRecurrentLayer 
```java
public Layer getUnderlyingRecurrentLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getBidirectionalLayer 
```java
public Bidirectional getBidirectionalLayer() 
```


Get DL4J Bidirectional layer.

- return Bidirectional Layer

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

- return number of trainable parameters

##### getInputPreprocessor 
```java
public InputPreProcessor getInputPreprocessor(InputType... inputType) throws InvalidKerasConfigurationException 
```


Gets appropriate DL4J InputPreProcessor for given InputTypes.

- param inputType Array of InputTypes
- return DL4J InputPreProcessor
- throws InvalidKerasConfigurationException Invalid Keras configuration exception
- see org.deeplearning4j.nn.conf.InputPreProcessor

##### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for Bidirectional layer.

- param weights Map of weights

