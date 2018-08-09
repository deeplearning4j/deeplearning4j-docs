---
title: Keras Advanced Activations
short_title: Advanced Activations
description: Supported Keras advanced layer activations.
category: Keras Import
weight: 4
---

## Keras advanced activations

### KerasLeakyReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/advanced/activations/KerasLeakyReLU.java) </span>

Imports LeakyReLU layer from Keras


##### KerasLeakyReLU 
```java
public KerasLeakyReLU(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Invalid Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Invalid Keras config

##### getActivationLayer 
```java
public ActivationLayer getActivationLayer() 
```


Get DL4J ActivationLayer.

- return ActivationLayer




### KerasPReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/advanced/activations/KerasPReLU.java) </span>

Imports PReLU layer from Keras


##### KerasPReLU 
```java
public KerasPReLU(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Invalid Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Invalid Keras config

##### getPReLULayer 
```java
public PReLULayer getPReLULayer() 
```


Get DL4J ActivationLayer.

- return ActivationLayer

##### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for layer.

- param weights Dense layer weights




### KerasThresholdedReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/advanced/activations/KerasThresholdedReLU.java) </span>

Imports ThresholdedReLU layer from Keras


##### KerasThresholdedReLU 
```java
public KerasThresholdedReLU(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Invalid Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Invalid Keras config

##### getActivationLayer 
```java
public ActivationLayer getActivationLayer() 
```


Get DL4J ActivationLayer.

- return ActivationLayer

