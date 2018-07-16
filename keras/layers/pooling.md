---
title: pooling
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasGlobalPooling.java) </span>
## KerasGlobalPooling

Imports a Keras Pooling layer as a DL4J Subsampling layer.


<b>KerasGlobalPooling</b> 
```java
public KerasGlobalPooling(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasGlobalPooling</b> 
```java
public KerasGlobalPooling(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getGlobalPoolingLayer</b> 
```java
public GlobalPoolingLayer getGlobalPoolingLayer() 
```


Get DL4J SubsamplingLayer.

- return SubsamplingLayer


---
<b>Methods</b>

---
<b>getInputPreprocessor</b> 
```java
public InputPreProcessor getInputPreprocessor(InputType... inputType) throws InvalidKerasConfigurationException 
```


Gets appropriate DL4J InputPreProcessor for given InputTypes.

- param inputType Array of InputTypes
- return DL4J InputPreProcessor
- throws InvalidKerasConfigurationException Invalid Keras config
- see org.deeplearning4j.nn.conf.InputPreProcessor


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


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPooling1D.java) </span>
## KerasPooling1D

Imports a Keras 1D Pooling layer as a DL4J Subsampling layer.


<b>KerasPooling1D</b> 
```java
public KerasPooling1D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasPooling1D</b> 
```java
public KerasPooling1D(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getSubsampling1DLayer</b> 
```java
public Subsampling1DLayer getSubsampling1DLayer() 
```


Get DL4J Subsampling1DLayer.

- return Subsampling1DLayer


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


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPooling2D.java) </span>
## KerasPooling2D

Imports a Keras 2D Pooling layer as a DL4J Subsampling layer.


<b>KerasPooling2D</b> 
```java
public KerasPooling2D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasPooling2D</b> 
```java
public KerasPooling2D(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getSubsampling2DLayer</b> 
```java
public SubsamplingLayer getSubsampling2DLayer() 
```


Get DL4J SubsamplingLayer.

- return SubsamplingLayer


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


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPooling3D.java) </span>
## KerasPooling3D

Imports a Keras 3D Pooling layer as a DL4J Subsampling3D layer.


<b>KerasPooling3D</b> 
```java
public KerasPooling3D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasPooling3D</b> 
```java
public KerasPooling3D(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getSubsampling3DLayer</b> 
```java
public Subsampling3DLayer getSubsampling3DLayer() 
```


Get DL4J Subsampling3DLayer.

- return Subsampling3DLayer


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


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/pooling/KerasPoolingUtils.java) </span>
## KerasPoolingUtils

Utility functionality for Keras pooling layers.


<b>mapPoolingType</b> 
```java
public static PoolingType mapPoolingType(String className, KerasLayerConfiguration conf)
            throws UnsupportedKerasConfigurationException 
```


Map Keras pooling layers to DL4J pooling types.

- param className name of the Keras pooling class
- return DL4J pooling type
- throws UnsupportedKerasConfigurationException Unsupported Keras config

