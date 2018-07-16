---
title: recurrent
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/recurrent/KerasLstm.java) </span>
## KerasLstm

Imports a Keras LSTM layer as a DL4J LSTM layer.


<b>KerasLstm</b> 
```java
public KerasLstm(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLstm</b> 
```java
public KerasLstm(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLstm</b> 
```java
public KerasLstm(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration.
- param enforceTrainingConfig whether to load Keras training configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLstm</b> 
```java
public KerasLstm(Map<String, Object> layerConfig, Map<String, ? extends KerasLayer> previousLayers)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig    dictionary containing Keras layer configuration.
- param previousLayers dictionary containing the previous layers in the topology
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLstm</b> 
```java
public KerasLstm(Map<String, Object> layerConfig, boolean enforceTrainingConfig, Map<String, ? extends KerasLayer> previousLayers)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- param previousLayers        - dictionary containing the previous layers in the topology
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getLSTMLayer</b> 
```java
public Layer getLSTMLayer() 
```


Get DL4J Layer. If returnSequences is true, this can be casted to an "LSTM" layer, otherwise it can be casted
to a "LastTimeStep" layer.

- return LSTM Layer


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

- return number of trainable parameters (12)


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


Set weights for layer.

- param weights LSTM layer weights


---
<b>Methods</b>

---
<b>getUnroll</b> 
```java
public boolean getUnroll() 
```


Get whether LSTM layer should be unrolled (for truncated BPTT).

- return whether to unroll the LSTM


---
<b>Methods</b>

---
<b>getGateActivationFromConfig</b> 
```java
public IActivation getGateActivationFromConfig(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Get LSTM gate activation function from Keras layer configuration.

- param layerConfig dictionary containing Keras layer configuration
- return LSTM inner activation function
- throws InvalidKerasConfigurationException Invalid Keras config


---
<b>Methods</b>

---
<b>getForgetBiasInitFromConfig</b> 
```java
public double getForgetBiasInitFromConfig(Map<String, Object> layerConfig, boolean train)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Get LSTM forget gate bias initialization from Keras layer configuration.

- param layerConfig dictionary containing Keras layer configuration
- return LSTM forget gate bias init
- throws InvalidKerasConfigurationException Unsupported Keras config


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/recurrent/KerasRnnUtils.java) </span>
## KerasRnnUtils

Utility functions for Keras RNN layers


<b>getUnrollRecurrentLayer</b> 
```java
public static boolean getUnrollRecurrentLayer(KerasLayerConfiguration conf, Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException 
```


Get unroll parameter to decide whether to unroll RNN with BPTT or not.

- param conf        KerasLayerConfiguration
- param layerConfig dictionary containing Keras layer properties
- return boolean unroll parameter
- throws InvalidKerasConfigurationException Invalid Keras configuration


---
<b>Methods</b>

---
<b>getRecurrentDropout</b> 
```java
public static double getRecurrentDropout(KerasLayerConfiguration conf, Map<String, Object> layerConfig)
            throws UnsupportedKerasConfigurationException, InvalidKerasConfigurationException 
```


Get recurrent weight dropout from Keras layer configuration.
Non-zero dropout rates are currently not supported.

- param conf        KerasLayerConfiguration
- param layerConfig dictionary containing Keras layer properties
- return recurrent dropout rate
- throws InvalidKerasConfigurationException Invalid Keras configuration


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/recurrent/KerasSimpleRnn.java) </span>
## KerasSimpleRnn

Imports a Keras SimpleRNN layer as a DL4J SimpleRnn layer.


<b>KerasSimpleRnn</b> 
```java
public KerasSimpleRnn(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasSimpleRnn</b> 
```java
public KerasSimpleRnn(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasSimpleRnn</b> 
```java
public KerasSimpleRnn(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getSimpleRnnLayer</b> 
```java
public Layer getSimpleRnnLayer() 
```


Get DL4J SimpleRnn layer.

- return SimpleRnn Layer


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

- return number of trainable parameters (12)


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
<b>getUnroll</b> 
```java
public boolean getUnroll() 
```


Get whether SimpleRnn layer should be unrolled (for truncated BPTT).

- return whether RNN should be unrolled (boolean)


---
<b>Methods</b>

---
<b>setWeights</b> 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for layer.

- param weights Simple RNN weights
- throws InvalidKerasConfigurationException Invalid Keras configuration exception

