---
title: Keras Import Pooling Layers
short_title: Pooling Layers
description: Supported Keras pooling layers.
category: Keras Import
weight: 4
---

## Keras pooling layers

### KerasGlobalPooling
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasGlobalPooling.java) </span>

Imports a Keras Pooling layer as a DL4J Subsampling layer.


##### KerasGlobalPooling 
```java
public KerasGlobalPooling(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getGlobalPoolingLayer 
```java
public GlobalPoolingLayer getGlobalPoolingLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getInputPreprocessor 
```java
public InputPreProcessor getInputPreprocessor(InputType... inputType) throws InvalidKerasConfigurationException 
```


Gets appropriate DL4J InputPreProcessor for given InputTypes.

- param inputType Array of InputTypes
- return DL4J InputPreProcessor
- throws InvalidKerasConfigurationException Invalid Keras config
- see org.deeplearning4j.nn.conf.InputPreProcessor

##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config




### KerasPooling1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPooling1D.java) </span>

Imports a Keras 1D Pooling layer as a DL4J Subsampling layer.


##### KerasPooling1D 
```java
public KerasPooling1D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getSubsampling1DLayer 
```java
public Subsampling1DLayer getSubsampling1DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
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




### KerasPooling2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPooling2D.java) </span>

Imports a Keras 2D Pooling layer as a DL4J Subsampling layer.


##### KerasPooling2D 
```java
public KerasPooling2D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getSubsampling2DLayer 
```java
public SubsamplingLayer getSubsampling2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
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




### KerasPooling3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPooling3D.java) </span>

Imports a Keras 3D Pooling layer as a DL4J Subsampling3D layer.


##### KerasPooling3D 
```java
public KerasPooling3D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getSubsampling3DLayer 
```java
public Subsampling3DLayer getSubsampling3DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
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




### KerasPoolingUtils
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPoolingUtils.java) </span>

Utility functionality for Keras pooling layers.


##### mapPoolingType 
```java
public static PoolingType mapPoolingType(String className, KerasLayerConfiguration conf)
            throws UnsupportedKerasConfigurationException 
```


Map Keras pooling layers to DL4J pooling types.

- param className name of the Keras pooling class
- return DL4J pooling type
- throws UnsupportedKerasConfigurationException Unsupported Keras config

