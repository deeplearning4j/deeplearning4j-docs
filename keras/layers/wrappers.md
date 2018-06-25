---
title: wrappers
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/wrappers/KerasBidirectional.java) </span>
## KerasBidirectional

Builds a DL4J Bidirectional layer from a Keras Bidirectional layer wrapper


<b>KerasBidirectional</b> 
```java
public KerasBidirectional(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasBidirectional</b> 
```java
public KerasBidirectional(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasBidirectional</b> 
```java
public KerasBidirectional(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getUnderlyingRecurrentLayer</b> 
```java
public Layer getUnderlyingRecurrentLayer() 
```


Return the underlying recurrent layer of this bidirectional layer

- return Layer, recurrent layer


---
<b>Methods</b>

---
<b>getBidirectionalLayer</b> 
```java
public Bidirectional getBidirectionalLayer() 
```


Get DL4J Bidirectional layer.

- return Bidirectional Layer


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
<b>getNumParams</b> 
```java
public int getNumParams() 
```


Returns number of trainable parameters in layer.

- return number of trainable parameters


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
- throws InvalidKerasConfigurationException Invalid Keras configuration exception
- see org.deeplearning4j.nn.conf.InputPreProcessor


---
<b>Methods</b>

---
<b>setWeights</b> 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for Bidirectional layer.

- param weights Map of weights

