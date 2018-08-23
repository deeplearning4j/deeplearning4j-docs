---
title: Keras Import Core Layers
short_title: Core Layers
description: Supported Keras layers.
category: Keras Import
weight: 4
---

## Keras core layers


---

### KerasPermute
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasPermute.java) </span>

Imports Permute layer from Keras


##### KerasPermute 
```java
public KerasPermute(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### isInputPreProcessor 
```java
public boolean isInputPreProcessor() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getInputPreprocessor 
```java
public InputPreProcessor getInputPreprocessor(InputType... inputType) throws
            InvalidKerasConfigurationException 
```


Gets appropriate DL4J InputPreProcessor for given InputTypes.

- param inputType Array of InputTypes
- return DL4J InputPreProcessor
- throws InvalidKerasConfigurationException Invalid Keras config
- see InputPreProcessor

##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config





---

### KerasDropout
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasDropout.java) </span>

Imports a Dropout layer from Keras.


##### KerasDropout 
```java
public KerasDropout(Map<String, Object> layerConfig)
                    throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig       dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig               dictionary containing Keras layer configuration
- param enforceTrainingConfig     whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getDropoutLayer 
```java
public DropoutLayer getDropoutLayer() 
```


Get DL4J DropoutLayer.

- return  DropoutLayer





---

### KerasRepeatVector
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasRepeatVector.java) </span>

Imports a Keras RepeatVector layer


##### KerasRepeatVector 
```java
public KerasRepeatVector(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig               dictionary containing Keras layer configuration
- param enforceTrainingConfig     whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getRepeatVectorLayer 
```java
public RepeatVector getRepeatVectorLayer() 
```


Get DL4J RepeatVector.

- return  RepeatVector





---

### KerasReshape
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasReshape.java) </span>

Imports Reshape layer from Keras


##### KerasReshape 
```java
public KerasReshape(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### isInputPreProcessor 
```java
public boolean isInputPreProcessor() 
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





---

### KerasSpatialDropout
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasSpatialDropout.java) </span>

Keras wrapper for DL4J dropout layer with SpatialDropout, works 1D-3D.


##### KerasSpatialDropout 
```java
public KerasSpatialDropout(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getSpatialDropoutLayer 
```java
public DropoutLayer getSpatialDropoutLayer() 
```


Get DL4J DropoutLayer with spatial dropout.

- return DropoutLayer





---

### KerasActivation
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasActivation.java) </span>

Imports an Activation layer from Keras.


##### KerasActivation 
```java
public KerasActivation(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getActivationLayer 
```java
public ActivationLayer getActivationLayer() 
```


Get DL4J ActivationLayer.

- return ActivationLayer





---

### KerasLambda
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasLambda.java) </span>

Wraps a DL4J SameDiffLambda into a KerasLayer


##### KerasLambda 
```java
public KerasLambda(Map<String, Object> layerConfig, SameDiffLayer sameDiffLayer)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getSameDiffLayer 
```java
public SameDiffLayer getSameDiffLayer() 
```


Get DL4J SameDiffLayer.

- return SameDiffLayer





---

### KerasFlatten
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasFlatten.java) </span>

Imports a Keras Flatten layer as a DL4J {Cnn,Rnn}ToFeedForwardInputPreProcessor.


##### KerasFlatten 
```java
public KerasFlatten(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### isInputPreProcessor 
```java
public boolean isInputPreProcessor() 
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





---

### KerasDense
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasDense.java) </span>

Imports a Dense layer from Keras.


##### KerasDense 
```java
public KerasDense(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getDenseLayer 
```java
public DenseLayer getDenseLayer() 
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

- return number of trainable parameters (2)

##### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for layer.

- param weights Dense layer weights





---

### KerasMerge
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/core/KerasMerge.java) </span>

Imports a Keras Merge layer as a DL4J Merge (graph) vertex.

TODO: handle axes arguments that alter merge behavior (requires changes to DL4J?)


##### KerasMerge 
```java
public KerasMerge(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getOutputType 
```java
public InputType getOutputType(InputType... inputType) 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

