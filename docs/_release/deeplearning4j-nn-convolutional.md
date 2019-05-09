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


---

### Convolution1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution1D.java) </span>

1D convolution layer. Expects input activations of shape [minibatch,channels,sequenceLength]





---

### Convolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution2D.java) </span>

2D convolution layer





---

### Convolution3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution3D.java) </span>

3D convolution layer configuration


##### hasBias 
```java
public boolean hasBias() 
```


An optional dataFormat: "NDHWC" or "NCDHW". Defaults to "NCDHW".<br> The data format of the input and output
data. <br> For "NCDHW" (also known as 'channels first' format), the data storage order is: [batchSize,
inputChannels, inputDepth, inputHeight, inputWidth].<br> For "NDHWC" ('channels last' format), the data is stored
in the order of: [batchSize, inputDepth, inputHeight, inputWidth, inputChannels].

##### kernelSize 
```java
public Builder kernelSize(int... kernelSize) 
```


The data format for input and output activations.<br> NCDHW: activations (in/out) should have shape
[minibatch, channels, depth, height, width]<br> NDHWC: activations (in/out) should have shape [minibatch,
depth, height, width, channels]<br>

##### stride 
```java
public Builder stride(int... stride) 
```


Set stride size for 3D convolutions in (depth, height, width) order

- param stride kernel size
- return 3D convolution layer builder

##### padding 
```java
public Builder padding(int... padding) 
```


Set padding size for 3D convolutions in (depth, height, width) order

- param padding kernel size
- return 3D convolution layer builder

##### dilation 
```java
public Builder dilation(int... dilation) 
```


Set dilation size for 3D convolutions in (depth, height, width) order

- param dilation kernel size
- return 3D convolution layer builder

##### dataFormat 
```java
public Builder dataFormat(DataFormat dataFormat) 
```


The data format for input and output activations.<br> NCDHW: activations (in/out) should have shape
[minibatch, channels, depth, height, width]<br> NDHWC: activations (in/out) should have shape [minibatch,
depth, height, width, channels]<br>

- param dataFormat Data format to use for activations

##### setKernelSize 
```java
public void setKernelSize(int... kernelSize) 
```


Set kernel size for 3D convolutions in (depth, height, width) order

- param kernelSize kernel size

##### setStride 
```java
public void setStride(int... stride) 
```


Set stride size for 3D convolutions in (depth, height, width) order

- param stride kernel size

##### setPadding 
```java
public void setPadding(int... padding) 
```


Set padding size for 3D convolutions in (depth, height, width) order

- param padding kernel size

##### setDilation 
```java
public void setDilation(int... dilation) 
```


Set dilation size for 3D convolutions in (depth, height, width) order

- param dilation kernel size





---

### Deconvolution2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Deconvolution2D.java) </span>

2D deconvolution layer configuration<br>

Deconvolutions are also known as transpose convolutions or fractionally strided convolutions. In essence,
deconvolutions swap forward and backward pass with regular 2D convolutions.

See the paper by Matt Zeiler for details: <a href="http://www.matthewzeiler.com/wp-content/uploads/2017/07/cvpr2010.pdf">http://www.matthewzeiler.com/wp-content/uploads/2017/07/cvpr2010.pdf</a>

For an intuitive guide to convolution arithmetic and shapes, see:
<a href="https://arxiv.org/abs/1603.07285v1">https://arxiv.org/abs/1603.07285v1</a>


##### hasBias 
```java
public boolean hasBias() 
```


Deconvolution2D layer nIn in the input layer is the number of channels nOut is the number of filters to be used
in the net or in other words the channels The builder specifies the filter/kernel size, the stride and padding
The pooling layer takes the kernel size

##### convolutionMode 
```java
public Builder convolutionMode(ConvolutionMode convolutionMode) 
```


Set the convolution mode for the Convolution layer. See {- link ConvolutionMode} for more details

- param convolutionMode Convolution mode for layer

##### kernelSize 
```java
public Builder kernelSize(int... kernelSize) 
```


Size of the convolution rows/columns

- param kernelSize the height and width of the kernel





---

### Cropping1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping1D.java) </span>

Cropping layer for convolutional (1d) neural networks. Allows cropping to be done separately for top/bottom


##### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param cropTopBottom Amount of cropping to apply to both the top and the bottom of the input activations

##### setCropping 
```java
public void setCropping(int... cropping) 
```


Cropping amount for top/bottom (in that order). Must be length 1 or 2 array.

##### build 
```java
public Cropping1D build() 
```


- param cropping Cropping amount for top/bottom (in that order). Must be length 1 or 2 array.





---

### Cropping2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping2D.java) </span>

Cropping layer for convolutional (2d) neural networks. Allows cropping to be done separately for
top/bottom/left/right


##### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param cropTopBottom Amount of cropping to apply to both the top and the bottom of the input activations
- param cropLeftRight Amount of cropping to apply to both the left and the right of the input activations

##### setCropping 
```java
public void setCropping(int... cropping) 
```


Cropping amount for top/bottom/left/right (in that order). A length 4 array.

##### build 
```java
public Cropping2D build() 
```


- param cropping Cropping amount for top/bottom/left/right (in that order). Must be length 4 array.





---

### Cropping3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping3D.java) </span>

Cropping layer for convolutional (3d) neural networks. Allows cropping to be done separately for upper and lower
bounds of depth, height and width dimensions.


##### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param cropDepth Amount of cropping to apply to both depth boundaries of the input activations
- param cropHeight Amount of cropping to apply to both height boundaries of the input activations
- param cropWidth Amount of cropping to apply to both width boundaries of the input activations

##### setCropping 
```java
public void setCropping(int... cropping) 
```


Cropping amount, a length 6 array, i.e. crop left depth, crop right depth, crop left height, crop right height, crop left width, crop right width

##### build 
```java
public Cropping3D build() 
```


- param cropping Cropping amount, must be length 3 or 6 array, i.e. either crop depth, crop height, crop width
or crop left depth, crop right depth, crop left height, crop right height, crop left width, crop right width

