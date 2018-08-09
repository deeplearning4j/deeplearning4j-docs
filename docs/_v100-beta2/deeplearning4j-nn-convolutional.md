---
title: Supported Convolutional Layers
short_title: Convolutional
description: Supported convolutional layers.
category: Models
weight: 3
---

## What is a convolutional neural network?

Each layer in a neural network configuration represents a unit of hidden units. When layers are stacked together, they represent a *deep neural network*.

## Available layers

### Convolution1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution1D.java) </span>

1D convolution layer




### Convolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution2D.java) </span>

2D convolution layer




### Convolution3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution3D.java) </span>

3D convolution layer configuration


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Convolution3D" aria-expanded="false" aria-controls="Convolution3D">Show methods</button>
<div class="collapse" id="Convolution3D"><div class="card card-body">

#### hasBias 
```java
public boolean hasBias() 
```


An optional dataFormat from: “NDHWC”, “NCDHW”. Defaults to “NCDHW”. 
The data format of the input and output data. 
the format could be “NCDHW”, the data storage order is: [batchSize, inputChannels, inputDepth, inputHeight, inputWidth].
Alternatively, the format “NDHWC”, the data is stored in the order of: [batchSize, inputDepth, inputHeight, inputWidth, inputChannels].

#### kernelSize 
```java
public Builder kernelSize(int... kernelSize) 
```


Set kernel size for 3D convolutions in (depth, height, width) order

- param kernelSize kernel size
- return 3D convolution layer builder

#### stride 
```java
public Builder stride(int... stride) 
```


Set stride size for 3D convolutions in (depth, height, width) order

- param stride kernel size
- return 3D convolution layer builder

#### padding 
```java
public Builder padding(int... padding) 
```


Set padding size for 3D convolutions in (depth, height, width) order

- param padding kernel size
- return 3D convolution layer builder

#### dilation 
```java
public Builder dilation(int... dilation) 
```


Set dilation size for 3D convolutions in (depth, height, width) order

- param dilation kernel size
- return 3D convolution layer builder


</div></div>


### Deconvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Deconvolution2D.java) </span>

2D deconvolution layer configuration

Deconvolutions are also known as transpose convolutions or fractionally strided convolutions.
In essence, deconvolutions swap forward and backward pass with regular 2D convolutions.

See the paper by Matt Zeiler for details:
http://www.matthewzeiler.com/wp-content/uploads/2017/07/cvpr2010.pdf

For an intuitive guide to convolution arithmetic and shapes, see:
https://arxiv.org/abs/1603.07285v1


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Deconvolution2D" aria-expanded="false" aria-controls="Deconvolution2D">Show methods</button>
<div class="collapse" id="Deconvolution2D"><div class="card card-body">

#### hasBias 
```java
public boolean hasBias()
```


Deconvolution2D layer
nIn in the input layer is the number of channels
nOut is the number of filters to be used in the net or in other words the channels
The builder specifies the filter/kernel size, the stride and padding
The pooling layer takes the kernel size

#### convolutionMode 
```java
public Builder convolutionMode(ConvolutionMode convolutionMode) 
```


Set the convolution mode for the Convolution layer.
See {- link ConvolutionMode} for more details

- param convolutionMode    Convolution mode for layer

#### kernelSize 
```java
public Builder kernelSize(int... kernelSize) 
```


Size of the convolution
rows/columns
- param kernelSize the height and width of the
kernel
- return


</div></div>


### DepthwiseConvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/DepthwiseConvolution2D.java) </span>

2D depth-wise convolution layer configuration.

Performs a channels-wise convolution, which
operates on each of the input maps separately. A channel multiplier is used to
specify the number of outputs per input map. This convolution
is carried out with the specified kernel sizes, stride and padding values.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#DepthwiseConvolution2D" aria-expanded="false" aria-controls="DepthwiseConvolution2D">Show methods</button>
<div class="collapse" id="DepthwiseConvolution2D"><div class="card card-body">

#### depthMultiplier 
```java
public Builder depthMultiplier(int depthMultiplier) 
```


Set channels multiplier for depth-wise convolution

- param depthMultiplier integer value, for each input map we get depthMultiplier
outputs in channels-wise step.
- return Builder

#### kernelSize 
```java
public Builder kernelSize(int... kernelSize) 
```


Size of the convolution
rows/columns

- param kernelSize the height and width of the
kernel
- return


</div></div>


### SeparableConvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/SeparableConvolution2D.java) </span>

2D Separable convolution layer configuration.

Separable convolutions split a regular convolution operation into two
simpler operations, which are usually computationally more efficient.

The first step in a separable convolution is a channels-wise convolution, which
operates on each of the input maps separately. A channels multiplier is used to
specify the number of outputs per input map in this step. This convolution
is carried out with the specified kernel sizes, stride and padding values.

The second step is a point-wise operation, in which the intermediary outputs
of the channels-wise convolution are mapped to the desired number of feature
maps, by using a 1x1 convolution.

The result of chaining these two operations will result in a tensor of the
same shape as that for a standard conv2d operation.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#SeparableConvolution2D" aria-expanded="false" aria-controls="SeparableConvolution2D">Show methods</button>
<div class="collapse" id="SeparableConvolution2D"><div class="card card-body">

#### hasBias 
```java
public boolean hasBias()
```


SeparableConvolution2D layer
nIn in the input layer is the number of channels
nOut is the number of filters to be used in the net or in other words the channels
The builder specifies the filter/kernel size, the stride and padding
The pooling layer takes the kernel size

#### constrainPointWise 
```java
public Builder constrainPointWise(LayerConstraint... constraints) 
```


Set channels multiplier of channels-wise step in separable convolution

- param depthMultiplier integer value, for each input map we get depthMultipler
outputs in channels-wise step.
- return Builder

#### kernelSize 
```java
public Builder kernelSize(int... kernelSize) 
```


Size of the convolution
rows/columns
- param kernelSize the height and width of the
kernel
- return


</div></div>


### Cropping1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping1D.java) </span>

Cropping layer for convolutional (1d) neural networks.
Allows cropping to be done separately for top/bottom


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Cropping1D" aria-expanded="false" aria-controls="Cropping1D">Show methods</button>
<div class="collapse" id="Cropping1D"><div class="card card-body">

#### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param cropTopBottom Amount of cropping to apply to both the top and the bottom of the input activations

#### build 
```java
public Cropping1D build() 
```


- param cropping Cropping amount for top/bottom(in that order). Must be length 1 or 2 array.


</div></div>


### Cropping2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping2D.java) </span>

Cropping layer for convolutional (2d) neural networks.
Allows cropping to be done separately for top/bottom/left/right


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Cropping2D" aria-expanded="false" aria-controls="Cropping2D">Show methods</button>
<div class="collapse" id="Cropping2D"><div class="card card-body">

#### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param cropTopBottom Amount of cropping to apply to both the top and the bottom of the input activations
- param cropLeftRight Amount of cropping to apply to both the left and the right of the input activations

#### build 
```java
public Cropping2D build() 
```


- param cropping Cropping amount for top/bottom/left/right (in that order). Must be length 4 array.


</div></div>


### Cropping3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping3D.java) </span>

Cropping layer for convolutional (3d) neural networks.
Allows cropping to be done separately for upper and lower bounds of
depth, height and width dimensions.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#Cropping3D" aria-expanded="false" aria-controls="Cropping3D">Show methods</button>
<div class="collapse" id="Cropping3D"><div class="card card-body">

#### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param cropDepth  Amount of cropping to apply to both depth boundaries of the input activations
- param cropHeight Amount of cropping to apply to both height boundaries of the input activations
- param cropWidth  Amount of cropping to apply to both width boundaries of the input activations

#### build 
```java
public Cropping3D build() 
```


- param cropping Cropping amount, must be length 3 or 6 array, i.e. either
crop depth, crop height, crop width or
crop left depth, crop right depth, crop left height, crop right height, crop left width,
crop right width


</div></div>