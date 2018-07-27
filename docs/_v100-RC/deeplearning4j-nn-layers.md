---
title: Supported Layers
short_title: Layers
description: Supported neural network layers.
category: Models
weight: 3
---

## What are layers?

Each layer in a neural network configuration represents a unit of hidden units. When layers are stacked together, they represent a *deep neural network*.

## Using layers

All layers available in Eclipse Deeplearning4j can be used either in a `MultiLayerNetwork` or `ComputationGraph`. When configuring a neural network, you pass the layer configuration and the network will instantiate the layer for you.

## Layers vs. vertices

If you are configuring complex networks such as InceptionV4, you will need to use the `ComputationGraph` API and join different branches together using vertices. Check the vertices for more information.

## General layers

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ActivationLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ActivationLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ActivationLayer"><div class="card card-body">

#### activation 
```java
public Builder activation(String activationFunction) 
```


Layer activation function.
Typical values include:<br>
"relu" (rectified linear), "tanh", "sigmoid", "softmax",
"hardtanh", "leakyrelu", "maxout", "softsign", "softplus"
- deprecated Use {- link #activation(Activation)} or {- link - activation(IActivation)}


</div></div>


### DenseLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/DenseLayer.java) </span>

If true (default): include bias parameters in the model. False: no bias.







### EmbeddingLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingLayer.java) </span>

Embedding layer: feed-forward layer that expects single integers per example as input (class numbers, in range 0 to numClass-1)
as input. This input has shape [numExamples,1] instead of [numExamples,numClasses] for the equivalent one-hot representation.
Mathematically, EmbeddingLayer is equivalent to using a DenseLayer with a one-hot representation for the input; however,
it can be much more efficient with a large number of classes (as a dense layer + one-hot input does a matrix multiply
with all but one value being zero).<br>
<b>Note</b>: can only be used as the first layer for a network<br>
<b>Note 2</b>: For a given example index i, the output is activationFunction(weights.getRow(i) + bias), hence the
weight rows can be considered a vector/embedding for each example.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingLayer"><div class="card card-body">

#### hasBias 
```java
public Builder hasBias(boolean hasBias)
```


If true: include bias parameters in the layer. False (default): no bias.

- param hasBias If true: include bias parameters in this layer


</div></div>


### EmbeddingSequenceLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingSequenceLayer.java) </span>

Embedding layer for sequences: feed-forward layer that expects fixed-length number (inputLength) of integers/indices
per example as input, ranged from 0 to numClasses - 1. This input thus has shape [numExamples, inputLength].
The output of this layer is 3D, namely of shape [numExamples, nOut, inputLength].
<b>Note</b>: can only be used as the first layer for a network<br>
<b>Note 2</b>: For a given example index i, the output is activationFunction(weights.getRow(i) + bias), hence the
weight rows can be considered a vector/embedding of each index.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingSequenceLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingSequenceLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingSequenceLayer"><div class="card card-body">

#### hasBias 
```java
public Builder hasBias(boolean hasBias) 
```


If true: include bias parameters in the layer. False (default): no bias.

- param hasBias If true: include bias parameters in this layer

#### inputLength 
```java
public Builder inputLength(int inputLength) 
```


Set input sequence length for this embedding layer.

- param inputLength input sequence length
- return Builder

#### inferInputLength 
```java
public Builder inferInputLength(boolean inferInputLength) 
```


Set input sequence inference mode for embedding layer.

- param inferInputLength whether to infer input length
- return Builder


</div></div>


### GlobalPoolingLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/GlobalPoolingLayer.java) </span>

Global pooling layer - used to do pooling over time for RNNs, and 2d pooling for CNNs.<br>

Global pooling layer can also handle mask arrays when dealing with variable length inputs. Mask arrays are assumed
to be 2d, and are fed forward through the network during training or post-training forward pass:<br>
- Time series: mask arrays are shape [miniBatchSize, maxTimeSeriesLength] and contain values 0 or 1 only<br>
- CNNs: mask have shape [miniBatchSize, height] or [miniBatchSize, width]. Important: the current implementation assumes
that for CNNs + variable length (masking), the input shape is [miniBatchSize, channels, height, 1] or
[miniBatchSize, channels, 1, width] respectively. This is the case with global pooling in architectures like CNN for
sentence classification.<br>


Behaviour with default settings:<br>
- 3d (time series) input with shape [miniBatchSize, vectorSize, timeSeriesLength] -> 2d output [miniBatchSize, vectorSize]<br>
- 4d (CNN) input with shape [miniBatchSize, channels, height, width] -> 2d output [miniBatchSize, channels]<br>
- 5d (CNN3D) input with shape [miniBatchSize, channels, depth, height, width] -> 2d output [miniBatchSize, channels]<br>


Alternatively, by setting collapseDimensions = false in the configuration, it is possible to retain the reduced dimensions
as 1s: this gives
- [miniBatchSize, vectorSize, 1] for RNN output,
- [miniBatchSize, channels, 1, 1] for CNN output, and
- [miniBatchSize, channels, 1, 1, 1] for CNN3D output.
<br>


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/GlobalPoolingLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/GlobalPoolingLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/GlobalPoolingLayer"><div class="card card-body">

#### poolingDimensions 
```java
public Builder poolingDimensions(int... poolingDimensions) 
```


Pooling dimensions. Note: most of the time, this doesn't need to be set, and the defaults can be used.
Default for RNN data: pooling dimension 2 (time).
Default for CNN data: pooling dimensions 2,3 (height and width)
Default for CNN3D data: pooling dimensions 2,3,4 (depth, height and width)

- param poolingDimensions Pooling dimensions to use

#### poolingType 
```java
public Builder poolingType(PoolingType poolingType) 
```


- param poolingType Pooling type for global pooling

#### collapseDimensions 
```java
public Builder collapseDimensions(boolean collapseDimensions) 
```


Whether to collapse dimensions when pooling or not. Usually you do want to do this. Default: true.
If true:<br>
- 3d (time series) input with shape [miniBatchSize, vectorSize, timeSeriesLength] -> 2d output [miniBatchSize, vectorSize]<br>
- 4d (CNN) input with shape [miniBatchSize, channels, height, width] -> 2d output [miniBatchSize, channels]<br>
- 5d (CNN3D) input with shape [miniBatchSize, channels, depth, height, width] -> 2d output [miniBatchSize, channels]<br>


If false:<br>
- 3d (time series) input with shape [miniBatchSize, vectorSize, timeSeriesLength] -> 3d output [miniBatchSize, vectorSize, 1]<br>
- 4d (CNN) input with shape [miniBatchSize, channels, height, width] -> 2d output [miniBatchSize, channels, 1, 1]<br>
- 5d (CNN3D) input with shape [miniBatchSize, channels, depth, height, width] -> 2d output [miniBatchSize, channels, 1, 1, 1]<br>

- param collapseDimensions Whether to collapse the dimensions or not

#### pnorm 
```java
public Builder pnorm(int pnorm) 
```


P-norm constant. Only used if using {- link PoolingType#PNORM} for the pooling type

- param pnorm P-norm constant


</div></div>


### LocalResponseNormalization
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocalResponseNormalization.java) </span>

Created by nyghtowl on 10/29/15.

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocalResponseNormalization" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocalResponseNormalization">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocalResponseNormalization"><div class="card card-body">

#### k 
```java
public Builder k(double k) 
```


LRN scaling constant k. Default: 2

- param k

#### n 
```java
public Builder n(double n) 
```


Number of adjacent kernel maps to use when doing LRN. default: 5

- param n    Number of adjacent kernel maps

#### alpha 
```java
public Builder alpha(double alpha) 
```


LRN scaling constant alpha. Default: 1e-4

- param alpha    Scaling constant

#### beta 
```java
public Builder beta(double beta) 
```


Scaling constant beta. Default: 0.75

- param beta    Scaling constant


</div></div>


### LocallyConnected1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D.java) </span>

SameDiff version of a 1D locally connected layer.



<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D"><div class="card card-body">

#### setInputSize 
```java
public Builder setInputSize(int inputSize)
```


Set input filter size for this locally connected 1D layer

- param inputSize height of the input filters
- return Builder


</div></div>


### LocallyConnected2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected2D.java) </span>

SameDiff version of a 2D locally connected layer.



<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected2D" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected2D">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected2D"><div class="card card-body">

#### setInputSize 
```java
public Builder setInputSize(int... inputSize)
```


Set input filter size (h,w) for this locally connected 2D layer

- param inputSize pair of height and width of the input filters to this layer
- return Builder


</div></div>


### LossLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LossLayer.java) </span>

LossLayer is a flexible output "layer" that performs a loss function on
an input without MLP logic.




### OutputLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/OutputLayer.java) </span>

Output layer with different objective co-occurrences for different objectives.
This includes classification as well as regression




### Pooling1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Pooling1D.java) </span>

1D Pooling layer.

Supports the following pooling types: MAX, AVG, SUM, PNORM, NONE



### Pooling2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Pooling2D.java) </span>

2D Pooling layer.

Supports the following pooling types: MAX, AVG, SUM, PNORM, NONE



### Subsampling1DLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Subsampling1DLayer.java) </span>

1D (temporal) subsampling layer. Currently, we just subclass off the
SubsamplingLayer and hard code the "width" dimension to 1. Also, this
layer accepts RNN InputTypes instead of CNN InputTypes.

This approach treats a multivariate time series with L timesteps and
P variables as an L x 1 x P image (L rows high, 1 column wide, P
channels deep). The kernel should be H<L pixels high and W=1 pixels
wide.

TODO: We will eventually want to NOT subclass off of SubsamplingLayer.




### Upsampling1D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D.java) </span>

Upsampling 1D layer


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D"><div class="card card-body">

#### size 
```java
public Builder size(int size) 
```


Upsampling size int

- param size    upsampling size in single spatial dimension of this 1D layer

#### size 
```java
public Builder size(int[] size) 
```


Upsampling size int array with a single element

- param size    upsampling size in single spatial dimension of this 1D layer


</div></div>


### Upsampling2D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D.java) </span>

Upsampling 2D layer


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D"><div class="card card-body">

#### size 
```java
public Builder size(int size) 
```


Upsampling size int, used for both height and width

- param size upsampling size in height and width dimensions

#### size 
```java
public Builder size(int[] size) 
```


Upsampling size array

- param size upsampling size in height and width dimensions


</div></div>


### Upsampling3D
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling3D.java) </span>

Upsampling 3D layer


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling3D" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling3D">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling3D"><div class="card card-body">

#### size 
```java
public Builder size(int size) 
```


Upsampling size as int, so same upsampling size is used for depth, width and height

- param size upsampling size in height, width and depth dimensions

#### size 
```java
public Builder size(int[] size) 
```


Upsampling size as int, so same upsampling size is used for depth, width and height

- param size upsampling size in height, width and depth dimensions


</div></div>


### ZeroPadding1DLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding1DLayer.java) </span>

Zero padding 1D layer for convolutional neural networks.
Allows padding to be done separately for top and bottom.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding1DLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding1DLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding1DLayer"><div class="card card-body">

#### build 
```java
public ZeroPadding1DLayer build() 
```


- param padding  Padding for both the left and right


</div></div>


### ZeroPadding3DLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding3DLayer.java) </span>

Zero padding 3D layer for convolutional neural networks.
Allows padding to be done separately for "left" and "right"
in all three spatial dimensions.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding3DLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding3DLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding3DLayer"><div class="card card-body">

#### build 
```java
public ZeroPadding3DLayer build() 
```


- param padding Padding for both the left and right in all three spatial dimensions


</div></div>


### ZeroPaddingLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPaddingLayer.java) </span>

Zero padding layer for convolutional neural networks.
Allows padding to be done separately for top/bottom/left/right


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPaddingLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPaddingLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPaddingLayer"><div class="card card-body">

#### build 
```java
public ZeroPaddingLayer build() 
```



- param padHeight Padding for both the top and bottom
- param padWidth  Padding for both the left and right


</div></div>


### ElementWiseMultiplicationLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/ElementWiseMultiplicationLayer.java) </span>

Elementwise multiplication layer with weights: implements out = activationFn(input . w + b) where:<br>
- w is a learnable weight vector of length nOut<br>
- "." is element-wise multiplication<br>
- b is a bias vector<br>
<br>
Note that the input and output sizes of the element-wise layer are the same for this layer

created by jingshu

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/ElementWiseMultiplicationLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/ElementWiseMultiplicationLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/ElementWiseMultiplicationLayer"><div class="card card-body">

#### getMemoryReport 
```java
public LayerMemoryReport getMemoryReport(InputType inputType) 
```


This is a report of the estimated memory consumption for the given layer

- param inputType Input type to the layer. Memory consumption is often a function of the input type
- return Memory report for the layer


</div></div>


### RepeatVector
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/RepeatVector.java) </span>

RepeatVector layer configuration.

RepeatVector takes a mini-batch of vectors of shape (mb, length) and a repeat factor n and outputs
a 3D tensor of shape (mb, n, length) in which x is repeated n times.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/RepeatVector" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/RepeatVector">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/RepeatVector"><div class="card card-body">

#### repetitionFactor 
```java
public Builder repetitionFactor(int n) 
```


Set repetition factor for RepeatVector layer

- param n upsampling size in height and width dimensions


</div></div>


### Yolo2OutputLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer.java) </span>

Output (loss) layer for YOLOv2 object detection model, based on the papers:
YOLO9000: Better, Faster, Stronger - Redmon & Farhadi (2016) - https://arxiv.org/abs/1612.08242<br>
and<br>
You Only Look Once: Unified, Real-Time Object Detection - Redmon et al. (2016) -
http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf<br>

This loss function implementation is based on the YOLOv2 version of the paper. However, note that it doesn't
currently support simultaneous training on both detection and classification datasets as described in the
YOlO9000 paper.

Note: Input activations to the Yolo2OutputLayer should have shape: [minibatch, b(5+c), H, W], where:<br>
b = number of bounding boxes (determined by config)<br>
c = number of classes<br>
H = output/label height<br>
W = output/label width<br>


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer" aria-expanded="false" aria-controls="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer">Show methods</button>
<div class="collapse" id="deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer"><div class="card card-body">

#### lambdaCoord 
```java
public Builder lambdaCoord(double lambdaCoord)
```


Loss function coefficient for position and size/scale components of the loss function.
Default (as per paper): 5

- param lambdaCoord Lambda value for size/scale component of loss function

#### lambbaNoObj 
```java
public Builder lambbaNoObj(double lambdaNoObj)
```


Loss function coefficient for the "no object confidence" components of the loss function.
Default (as per paper): 0.5

- param lambdaNoObj Lambda value for no-object (confidence) component of the loss function

#### lossPositionScale 
```java
public Builder lossPositionScale(ILossFunction lossPositionScale)
```


Loss function for position/scale component of the loss function

- param lossPositionScale Loss function for position/scale

#### lossClassPredictions 
```java
public Builder lossClassPredictions(ILossFunction lossClassPredictions)
```


Loss function for the class predictions - defaults to L2 loss (i.e., sum of squared errors, as per the
paper), however Loss MCXENT could also be used (which is more common for classification).

- param lossClassPredictions Loss function for the class prediction error component of the YOLO loss function

#### boundingBoxPriors 
```java
public Builder boundingBoxPriors(INDArray boundingBoxes)
```


Bounding box priors dimensions [width, height]. For N bounding boxes, input has shape [rows, columns] = [N, 2]
Note that dimensions should be specified as fraction of grid size. For example, a network with 13x13 output,
a value of 1.0 would correspond to one grid cell; a value of 13 would correspond to the entire image.

- param boundingBoxes Bounding box prior dimensions (width, height)


</div></div>


### MaskLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/util/MaskLayer.java) </span>

MaskLayer applies the mask array to the forward pass activations, and backward pass gradients, passing through
this layer. It can be used with 2d (feed-forward), 3d (time series) or 4d (CNN) activations.




### MaskZeroLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/util/MaskZeroLayer.java) </span>


