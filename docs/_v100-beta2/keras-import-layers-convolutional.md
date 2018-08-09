---
title: Keras Import Convolutional Layers
short_title: Convolutional Layers
description: Supported Keras convolutional layers.
category: Keras Import
weight: 4
---

## Keras layers

### KerasAtrousConvolution1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasAtrousConvolution1D.java) </span>

Keras 1D atrous / dilated convolution layer. Note that in keras 2 this layer has been
removed and dilations are now available through the "dilated" argument in regular Conv1D layers

author: Max Pumperla

#### KerasAtrousConvolution1D 
```java
public KerasAtrousConvolution1D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasAtrousConvolution1D" aria-expanded="false" aria-controls="KerasAtrousConvolution1D">Show methods</button>
<div class="collapse" id="KerasAtrousConvolution1D"><div class="card card-body">

#### getAtrousConvolution1D 
```java
public Convolution1DLayer getAtrousConvolution1D() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasAtrousConvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasAtrousConvolution2D.java) </span>

Keras 1D atrous / dilated convolution layer. Note that in keras 2 this layer has been
removed and dilations are now available through the "dilated" argument in regular Conv1D layers

author: Max Pumperla

#### KerasAtrousConvolution2D 
```java
public KerasAtrousConvolution2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasAtrousConvolution2D" aria-expanded="false" aria-controls="KerasAtrousConvolution2D">Show methods</button>
<div class="collapse" id="KerasAtrousConvolution2D"><div class="card card-body">

#### getAtrousConvolution2D 
```java
public ConvolutionLayer getAtrousConvolution2D() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasConvolution1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasConvolution1D.java) </span>

Imports a 1D Convolution layer from Keras.


#### KerasConvolution1D 
```java
public KerasConvolution1D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer
- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasConvolution1D" aria-expanded="false" aria-controls="KerasConvolution1D">Show methods</button>
<div class="collapse" id="KerasConvolution1D"><div class="card card-body">

#### getConvolution1DLayer 
```java
public Convolution1DLayer getConvolution1DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig       dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException
- throws UnsupportedKerasConfigurationException

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException

#### getInputPreprocessor 
```java
public InputPreProcessor getInputPreprocessor(InputType... inputType) throws InvalidKerasConfigurationException 
```


Gets appropriate DL4J InputPreProcessor for given InputTypes.

- param inputType Array of InputTypes
- return DL4J InputPreProcessor
- throws InvalidKerasConfigurationException Invalid Keras configuration exception
- see org.deeplearning4j.nn.conf.InputPreProcessor

#### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Set weights for layer.

- param weights   Map from parameter name to INDArray.


</div></div>


### KerasConvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasConvolution2D.java) </span>

Imports a 2D Convolution layer from Keras.


#### KerasConvolution2D 
```java
public KerasConvolution2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasConvolution2D" aria-expanded="false" aria-controls="KerasConvolution2D">Show methods</button>
<div class="collapse" id="KerasConvolution2D"><div class="card card-body">

#### getConvolution2DLayer 
```java
public ConvolutionLayer getConvolution2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasConvolution3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasConvolution3D.java) </span>

Imports a 3D Convolution layer from Keras.


#### KerasConvolution3D 
```java
public KerasConvolution3D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasConvolution3D" aria-expanded="false" aria-controls="KerasConvolution3D">Show methods</button>
<div class="collapse" id="KerasConvolution3D"><div class="card card-body">

#### getConvolution3DLayer 
```java
public ConvolutionLayer getConvolution3DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasConvolutionUtils
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasConvolutionUtils.java) </span>

Utility functionality for Keras convolution layers.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasConvolutionUtils" aria-expanded="false" aria-controls="KerasConvolutionUtils">Show methods</button>
<div class="collapse" id="KerasConvolutionUtils"><div class="card card-body">

#### getConvolutionModeFromConfig 
```java
public static ConvolutionMode getConvolutionModeFromConfig(Map<String, Object> layerConfig,
                                                               KerasLayerConfiguration conf)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Get (convolution) stride from Keras layer configuration.

- param layerConfig dictionary containing Keras layer configuration
- return Strides array from Keras configuration
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasCropping1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasCropping1D.java) </span>

Imports a Keras Cropping 1D layer.


#### KerasCropping1D 
```java
public KerasCropping1D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasCropping1D" aria-expanded="false" aria-controls="KerasCropping1D">Show methods</button>
<div class="collapse" id="KerasCropping1D"><div class="card card-body">

#### getCropping1DLayer 
```java
public Cropping1D getCropping1DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasCropping2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasCropping2D.java) </span>

Imports a Keras Cropping 2D layer.


#### KerasCropping2D 
```java
public KerasCropping2D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasCropping2D" aria-expanded="false" aria-controls="KerasCropping2D">Show methods</button>
<div class="collapse" id="KerasCropping2D"><div class="card card-body">

#### getCropping2DLayer 
```java
public Cropping2D getCropping2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasCropping3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasCropping3D.java) </span>

Imports a Keras Cropping 3D layer.


#### KerasCropping3D 
```java
public KerasCropping3D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasCropping3D" aria-expanded="false" aria-controls="KerasCropping3D">Show methods</button>
<div class="collapse" id="KerasCropping3D"><div class="card card-body">

#### getCropping3DLayer 
```java
public Cropping3D getCropping3DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasDeconvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasDeconvolution2D.java) </span>

Imports a 2D Deconvolution layer from Keras.


#### KerasDeconvolution2D 
```java
public KerasDeconvolution2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasDeconvolution2D" aria-expanded="false" aria-controls="KerasDeconvolution2D">Show methods</button>
<div class="collapse" id="KerasDeconvolution2D"><div class="card card-body">

#### getDeconvolution2DLayer 
```java
public Deconvolution2D getDeconvolution2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasDepthwiseConvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasDepthwiseConvolution2D.java) </span>

Keras depth-wise convolution 2D layer support


#### KerasDepthwiseConvolution2D 
```java
public KerasDepthwiseConvolution2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasDepthwiseConvolution2D" aria-expanded="false" aria-controls="KerasDepthwiseConvolution2D">Show methods</button>
<div class="collapse" id="KerasDepthwiseConvolution2D"><div class="card card-body">

#### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras configuration
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration

#### getDepthwiseConvolution2DLayer 
```java
public DepthwiseConvolution2D getDepthwiseConvolution2DLayer() 
```


Get DL4J DepthwiseConvolution2D.

- return DepthwiseConvolution2D

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasSeparableConvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasSeparableConvolution2D.java) </span>

Keras separable convolution 2D layer support


#### KerasSeparableConvolution2D 
```java
public KerasSeparableConvolution2D(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasSeparableConvolution2D" aria-expanded="false" aria-controls="KerasSeparableConvolution2D">Show methods</button>
<div class="collapse" id="KerasSeparableConvolution2D"><div class="card card-body">

#### setWeights 
```java
public void setWeights(Map<String, INDArray> weights) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration
- throws InvalidKerasConfigurationException     Invalid Keras configuration
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration

#### getSeparableConvolution2DLayer 
```java
public SeparableConvolution2D getSeparableConvolution2DLayer() 
```


Get DL4J SeparableConvolution2D.

- return SeparableConvolution2D

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasSpaceToDepth
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasSpaceToDepth.java) </span>

Constructor from parsed Keras layer configuration dictionary.


#### KerasSpaceToDepth 
```java
public KerasSpaceToDepth(Map<String, Object> layerConfig, boolean enforceTrainingConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration exception


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasSpaceToDepth" aria-expanded="false" aria-controls="KerasSpaceToDepth">Show methods</button>
<div class="collapse" id="KerasSpaceToDepth"><div class="card card-body">

#### getSpaceToDepthLayer 
```java
public SpaceToDepthLayer getSpaceToDepthLayer() 
```


Get DL4J SpaceToDepth layer.

- return SpaceToDepth layer

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasUpsampling1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasUpsampling1D.java) </span>

Keras Upsampling1D layer support


#### KerasUpsampling1D 
```java
public KerasUpsampling1D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration exception


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasUpsampling1D" aria-expanded="false" aria-controls="KerasUpsampling1D">Show methods</button>
<div class="collapse" id="KerasUpsampling1D"><div class="card card-body">

#### getUpsampling1DLayer 
```java
public Upsampling1D getUpsampling1DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Invalid Keras configuration exception

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasUpsampling2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasUpsampling2D.java) </span>

Keras Upsampling2D layer support


#### KerasUpsampling2D 
```java
public KerasUpsampling2D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration exception


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasUpsampling2D" aria-expanded="false" aria-controls="KerasUpsampling2D">Show methods</button>
<div class="collapse" id="KerasUpsampling2D"><div class="card card-body">

#### getUpsampling2DLayer 
```java
public Upsampling2D getUpsampling2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Invalid Keras configuration exception

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasUpsampling3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasUpsampling3D.java) </span>

Keras Upsampling3D layer support


#### KerasUpsampling3D 
```java
public KerasUpsampling3D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Unsupported Keras configuration exception


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasUpsampling3D" aria-expanded="false" aria-controls="KerasUpsampling3D">Show methods</button>
<div class="collapse" id="KerasUpsampling3D"><div class="card card-body">

#### getUpsampling3DLayer 
```java
public Upsampling3D getUpsampling3DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras configuration exception
- throws UnsupportedKerasConfigurationException Invalid Keras configuration exception

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasZeroPadding1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasZeroPadding1D.java) </span>

Imports a Keras ZeroPadding 1D layer.


#### KerasZeroPadding1D 
```java
public KerasZeroPadding1D(Map<String, Object> layerConfig)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasZeroPadding1D" aria-expanded="false" aria-controls="KerasZeroPadding1D">Show methods</button>
<div class="collapse" id="KerasZeroPadding1D"><div class="card card-body">

#### getZeroPadding1DLayer 
```java
public ZeroPadding1DLayer getZeroPadding1DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig           dictionary containing Keras layer configuration
- param enforceTrainingConfig whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param inputType Array of InputTypes
- return output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasZeroPadding2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasZeroPadding2D.java) </span>

Imports a Keras ZeroPadding 2D layer.


#### KerasZeroPadding2D 
```java
public KerasZeroPadding2D(Map<String, Object> layerConfig)
                    throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig   dictionary containing Keras layer configuration.

- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasZeroPadding2D" aria-expanded="false" aria-controls="KerasZeroPadding2D">Show methods</button>
<div class="collapse" id="KerasZeroPadding2D"><div class="card card-body">

#### getZeroPadding2DLayer 
```java
public ZeroPaddingLayer getZeroPadding2DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig               dictionary containing Keras layer configuration
- param enforceTrainingConfig     whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param  inputType    Array of InputTypes
- return              output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>


### KerasZeroPadding3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/convolutional/KerasZeroPadding3D.java) </span>

Imports a Keras ZeroPadding 3D layer.


#### KerasZeroPadding3D 
```java
public KerasZeroPadding3D(Map<String, Object> layerConfig)
                    throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig   dictionary containing Keras layer configuration.

- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasZeroPadding3D" aria-expanded="false" aria-controls="KerasZeroPadding3D">Show methods</button>
<div class="collapse" id="KerasZeroPadding3D"><div class="card card-body">

#### getZeroPadding3DLayer 
```java
public ZeroPadding3DLayer getZeroPadding3DLayer() 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig               dictionary containing Keras layer configuration
- param enforceTrainingConfig     whether to enforce training-related configuration options
- throws InvalidKerasConfigurationException Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Get layer output type.

- param  inputType    Array of InputTypes
- return              output type as InputType
- throws InvalidKerasConfigurationException Invalid Keras config


</div></div>