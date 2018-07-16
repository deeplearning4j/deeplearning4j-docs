---
title: core
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasActivation.java) </span>
## KerasActivation

Imports an Activation layer from Keras.


<b>KerasActivation</b> 
```java
public KerasActivation(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasActivation</b> 
```java
public KerasActivation(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


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
<b>getActivationLayer</b> 
```java
public ActivationLayer getActivationLayer() 
```


Get DL4J ActivationLayer.

- return ActivationLayer


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasDense.java) </span>
## KerasDense

Imports a Dense layer from Keras.


<b>KerasDense</b> 
```java
public KerasDense(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasDense</b> 
```java
public KerasDense(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasDense</b> 
```java
public KerasDense(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getDenseLayer</b> 
```java
public DenseLayer getDenseLayer() 
```


Get DL4J DenseLayer.

- return DenseLayer


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

- return number of trainable parameters (2)


---
<b>Methods</b>

---
<b>setWeights</b> 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for layer.

- param weights Dense layer weights


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasDropout.java) </span>
## KerasDropout

Imports a Dropout layer from Keras.


<b>KerasDropout</b> 
```java
public KerasDropout(Map<String, Object> layerConfig)
                    throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig       dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasDropout</b> 
```java
public KerasDropout(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
                    throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig               dictionary containing Keras layer configuration
- param enforceTrainingConfig     whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getOutputType</b> 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param  inputType    Array of InputTypes
- return              output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


---
<b>Methods</b>

---
<b>getDropoutLayer</b> 
```java
public DropoutLayer getDropoutLayer() 
```


Get DL4J DropoutLayer.

- return  DropoutLayer


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasFlatten.java) </span>
## KerasFlatten

Imports a Keras Flatten layer as a DL4J {Cnn,Rnn}ToFeedForwardInputPreProcessor.


<b>KerasFlatten</b> 
```java
public KerasFlatten(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasFlatten</b> 
```java
public KerasFlatten(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>isInputPreProcessor</b> 
```java
public boolean isInputPreProcessor() 
```


Whether this Keras layer maps to a DL4J InputPreProcessor.

- return true


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

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasLambda.java) </span>
## KerasLambda

Wraps a DL4J SameDiffLambda into a KerasLayer


<b>KerasLambda</b> 
```java
public KerasLambda(Map<String, Object> layerConfig, SameDiffLayer sameDiffLayer)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasLambda</b> 
```java
public KerasLambda(Map<String, Object> layerConfig, boolean enforceTrainingConfig,
                       SameDiffLayer sameDiffLayer)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


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
<b>getSameDiffLayer</b> 
```java
public SameDiffLayer getSameDiffLayer() 
```


Get DL4J SameDiffLayer.

- return SameDiffLayer


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasMerge.java) </span>
## KerasMerge

Imports a Keras Merge layer as a DL4J Merge (graph) vertex.

TODO: handle axes arguments that alter merge behavior (requires changes to DL4J?)


<b>KerasMerge</b> 
```java
public KerasMerge(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasMerge</b> 
```java
public KerasMerge(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasMerge</b> 
```java
public KerasMerge(Map<String, Object> layerConfig, ElementWiseVertex.Op mergeMode, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary and merge mode passed in.

- param layerConfig           dictionary containing Keras layer configuration
- param mergeMode             ElementWiseVertex merge mode
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasMerge</b> 
```java
public KerasMerge(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getOutputType</b> 
```java
public InputType getOutputType(InputType... inputType) 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasPermute.java) </span>
## KerasPermute

Imports Permute layer from Keras


<b>KerasPermute</b> 
```java
public KerasPermute(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasPermute</b> 
```java
public KerasPermute(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>isInputPreProcessor</b> 
```java
public boolean isInputPreProcessor() 
```


KerasPermute is an InputPreProcessor


---
<b>Methods</b>

---
<b>getInputPreprocessor</b> 
```java
public InputPreProcessor getInputPreprocessor(InputType... inputType) throws
            InvalidKerasConfigurationException 
```


Gets appropriate DL4J InputPreProcessor for given InputTypes.

- param inputType Array of InputTypes
- return DL4J InputPreProcessor
- throws InvalidKerasConfigurationException Invalid Keras config
- see InputPreProcessor


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

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasRepeatVector.java) </span>
## KerasRepeatVector

Imports a Keras RepeatVector layer


<b>KerasRepeatVector</b> 
```java
public KerasRepeatVector(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasRepeatVector</b> 
```java
public KerasRepeatVector(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig               dictionary containing Keras layer configuration
- param enforceTrainingConfig     whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>getOutputType</b> 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param  inputType    Array of InputTypes
- return              output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


---
<b>Methods</b>

---
<b>getRepeatVectorLayer</b> 
```java
public RepeatVector getRepeatVectorLayer() 
```


Get DL4J RepeatVector.

- return  RepeatVector


----

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasReshape.java) </span>
## KerasReshape

Imports Reshape layer from Keras


<b>KerasReshape</b> 
```java
public KerasReshape(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasReshape</b> 
```java
public KerasReshape(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<b>isInputPreProcessor</b> 
```java
public boolean isInputPreProcessor() 
```


Whether this Keras layer maps to a DL4J InputPreProcessor.

- return true


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

<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasSpatialDropout.java) </span>
## KerasSpatialDropout

Keras wrapper for DL4J dropout layer with SpatialDropout, works 1D-3D.


<b>KerasSpatialDropout</b> 
```java
public KerasSpatialDropout(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasSpatialDropout</b> 
```java
public KerasSpatialDropout(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


---
<b>Constructors</b>

---
<b>KerasSpatialDropout</b> 
```java
public KerasSpatialDropout(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


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
<b>getSpatialDropoutLayer</b> 
```java
public DropoutLayer getSpatialDropoutLayer() 
```


Get DL4J DropoutLayer with spatial dropout.

- return DropoutLayer

