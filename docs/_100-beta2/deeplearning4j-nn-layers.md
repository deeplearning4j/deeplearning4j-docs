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


---

### ActivationLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ActivationLayer.java) </span>

Activation layer is a simple layer that applies the specified activation function to the input activations

##### clone 
```java
public ActivationLayer clone() 
```


- param activation Activation function for the layer

##### activation 
```java
public Builder activation(String activationFunction) 
```


Layer activation function.
Typical values include:<br>
"relu" (rectified linear), "tanh", "sigmoid", "softmax",
"hardtanh", "leakyrelu", "maxout", "softsign", "softplus"
- deprecated Use {- link #activation(Activation)} or {- link - activation(IActivation)}

##### activation 
```java
public Builder activation(IActivation activationFunction) 
```


- param activationFunction Activation function for the layer

##### activation 
```java
public Builder activation(Activation activation) 
```


- param activation Activation function for the layer





---

### DenseLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/DenseLayer.java) </span>

Dense layer: a standard fully connected feed forward layer

##### hasBias 
```java
public Builder hasBias(boolean hasBias)
```


If true (default): include bias parameters in the model. False: no bias.

- param hasBias If true: include bias parameters in this model





---

### DropoutLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/DropoutLayer.java) </span>

Dropout layer. This layer simply applies dropout at training time, and passes activations through unmodified at test


##### build 
```java
public DropoutLayer build() 
```


Create a dropout layer with standard {- link Dropout}, with the specified probability of retaining the
input activation. See {- link Dropout} for the full details

- param dropout Activation retain probability.





---

### EmbeddingLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingLayer.java) </span>

Embedding layer: feed-forward layer that expects single integers per example as input (class numbers, in range 0 to numClass-1)
Mathematically, EmbeddingLayer is equivalent to using a DenseLayer with a one-hot representation for the input; however,
it can be much more efficient with a large number of classes (as a dense layer + one-hot input does a matrix multiply
with all but one value being zero).<br>
<b>Note</b>: can only be used as the first layer for a network<br>
<b>Note 2</b>: For a given example index i, the output is activationFunction(weights.getRow(i) + bias), hence the
weight rows can be considered a vector/embedding for each example.<br>
Note also that embedding layer has an activation function (set to IDENTITY to disable) and optional bias (which is
disabled by default)


##### hasBias 
```java
public Builder hasBias(boolean hasBias)
```


If true: include bias parameters in the layer. False (default): no bias.

- param hasBias If true: include bias parameters in this layer





---

### EmbeddingSequenceLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingSequenceLayer.java) </span>

Embedding layer for sequences: feed-forward layer that expects fixed-length number (inputLength) of integers/indices
per example as input, ranged from 0 to numClasses - 1. This input thus has shape [numExamples, inputLength] or
shape [numExamples, 1, inputLength].<br>
The output of this layer is 3D (sequence/time series), namely of shape [numExamples, nOut, inputLength].
<b>Note</b>: can only be used as the first layer for a network<br>
<b>Note 2</b>: For a given example index i, the output is activationFunction(weights.getRow(i) + bias), hence the
weight rows can be considered a vector/embedding of each index.<br>
Note also that embedding layer has an activation function (set to IDENTITY to disable) and optional bias (which is
disabled by default)


##### hasBias 
```java
public Builder hasBias(boolean hasBias) 
```


If true: include bias parameters in the layer. False (default): no bias.

- param hasBias If true: include bias parameters in this layer

##### inputLength 
```java
public Builder inputLength(int inputLength) 
```


Set input sequence length for this embedding layer.

- param inputLength input sequence length
- return Builder

##### inferInputLength 
```java
public Builder inferInputLength(boolean inferInputLength) 
```


Set input sequence inference mode for embedding layer.

- param inferInputLength whether to infer input length
- return Builder





---

### GlobalPoolingLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/GlobalPoolingLayer.java) </span>

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
as 1s: this gives<br>
- [miniBatchSize, vectorSize, 1] for RNN output,<br>
- [miniBatchSize, channels, 1, 1] for CNN output, and<br>
- [miniBatchSize, channels, 1, 1, 1] for CNN3D output.<br>
<br>


##### poolingDimensions 
```java
public Builder poolingDimensions(int... poolingDimensions) 
```


Pooling dimensions. Note: most of the time, this doesn't need to be set, and the defaults can be used.
Default for RNN data: pooling dimension 2 (time).
Default for CNN data: pooling dimensions 2,3 (height and width)
Default for CNN3D data: pooling dimensions 2,3,4 (depth, height and width)

- param poolingDimensions Pooling dimensions to use

##### poolingType 
```java
public Builder poolingType(PoolingType poolingType) 
```


- param poolingType Pooling type for global pooling

##### collapseDimensions 
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

##### pnorm 
```java
public Builder pnorm(int pnorm) 
```


P-norm constant. Only used if using {- link PoolingType#PNORM} for the pooling type

- param pnorm P-norm constant





---

### LocalResponseNormalization
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocalResponseNormalization.java) </span>

Local response normalization layer<br>
See section 3.3 of <a href="http://www.cs.toronto.edu/~fritz/absps/imagenet.pdf">http://www.cs.toronto.edu/~fritz/absps/imagenet.pdf</a>

##### k 
```java
public Builder k(double k) 
```


LRN scaling constant k. Default: 2

- param k Scaling constant

##### n 
```java
public Builder n(double n) 
```


Number of adjacent kernel maps to use when doing LRN. default: 5

- param n    Number of adjacent kernel maps

##### alpha 
```java
public Builder alpha(double alpha) 
```


LRN scaling constant alpha. Default: 1e-4

- param alpha    Scaling constant

##### beta 
```java
public Builder beta(double beta) 
```


Scaling constant beta. Default: 0.75

- param beta    Scaling constant





---

### LocallyConnected1D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D.java) </span>

SameDiff version of a 1D locally connected layer.


##### nIn 
```java
public Builder nIn(int nIn) 
```


- param nIn Number of inputs to the layer (input size)

##### nOut 
```java
public Builder nOut(int nOut) 
```


- param nOut Number of outputs (output size)

##### activation 
```java
public Builder activation(Activation activation) 
```


- param activation Activation function for the layer

##### kernelSize 
```java
public Builder kernelSize(int k) 
```


- param k Kernel size for the layer

##### stride 
```java
public Builder stride(int s) 
```


- param s Stride for the layer

##### padding 
```java
public Builder padding(int p) 
```


- param p Padding for the layer. Not used if {- link ConvolutionMode#Same} is set

##### convolutionMode 
```java
public Builder convolutionMode(ConvolutionMode cm) 
```


- param cm Convolution mode for the layer. See {- link ConvolutionMode} for details

##### dilation 
```java
public Builder dilation(int d) 
```


- param d Dilation for the layer

##### hasBias 
```java
public Builder hasBias(boolean hasBias)
```


- param hasBias If true (default is false) the layer will have a bias

##### setInputSize 
```java
public Builder setInputSize(int inputSize)
```


Set input filter size for this locally connected 1D layer

- param inputSize height of the input filters
- return Builder





---

### LocallyConnected2D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected2D.java) </span>

SameDiff version of a 2D locally connected layer.



##### nIn 
```java
public Builder nIn(int nIn) 
```


- param nIn Number of inputs to the layer (input size)

##### nOut 
```java
public Builder nOut(int nOut) 
```


- param nOut Number of outputs (output size)

##### activation 
```java
public Builder activation(Activation activation) 
```


- param activation Activation function for the layer

##### kernelSize 
```java
public Builder kernelSize(int... k) 
```


- param k Kernel size for the layer. Must be 2 values (height/width)

##### stride 
```java
public Builder stride(int... s) 
```


- param s Stride for the layer. Must be 2 values (height/width)

##### padding 
```java
public Builder padding(int... p) 
```


- param p Padding for the layer. Not used if {- link ConvolutionMode#Same} is set. Must be 2 values (height/width)

##### convolutionMode 
```java
public Builder convolutionMode(ConvolutionMode cm) 
```


- param cm Convolution mode for the layer. See {- link ConvolutionMode} for details

##### dilation 
```java
public Builder dilation(int... d) 
```


- param d Dilation for the layer. Must be 2 values (height/width)

##### hasBias 
```java
public Builder hasBias(boolean hasBias)
```


- param hasBias If true (default is false) the layer will have a bias

##### setInputSize 
```java
public Builder setInputSize(int... inputSize)
```


Set input filter size (h,w) for this locally connected 2D layer

- param inputSize pair of height and width of the input filters to this layer
- return Builder





---

### LossLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LossLayer.java) </span>

LossLayer is a flexible output layer that performs a loss function on an input without MLP logic.<br>
but LossLayer does not have any parameters. Consequently, setting nIn/nOut isn't supported - the output size
is the same size as the input activations.


##### nIn 
```java
public Builder nIn(int nIn) 
```


- param lossFunction Loss function for the loss layer





---

### OutputLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/OutputLayer.java) </span>

Output layer used for training via backpropagation based on labels and a specified loss function.
Can be configured for both classification and regression.
Note that OutputLayer has parameters - it contains a fully-connected layer (effectively contains a DenseLayer)
internally. This allows the output size to be different to the layer input size.


##### build 
```java
public OutputLayer build() 
```


- param lossFunction Loss function for the output layer





---

### Pooling1D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Pooling1D.java) </span>


Supports the following pooling types: MAX, AVG, SUM, PNORM, NONE




---

### Pooling2D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Pooling2D.java) </span>


Supports the following pooling types: MAX, AVG, SUM, PNORM, NONE




---

### Subsampling1DLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Subsampling1DLayer.java) </span>

1D (temporal) subsampling layer - also known as pooling layer.<br>

Supports the following pooling types: MAX, AVG, SUM, PNORM





---

### Upsampling1D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D.java) </span>

Upsampling 1D layer<br>
Example:
<pre>
If input (for a single example, with channels down page, and sequence from left to right) is:
[ A1, A2, A3]
[ B1, B2, B3]
Then output with size = 2 is:
[ A1, A1, A2, A2, A3, A3]
[ B1, B1, B2, B2, B3, B2]
</pre>


##### size 
```java
public Builder size(int size) 
```


Upsampling size

- param size    upsampling size in single spatial dimension of this 1D layer

##### size 
```java
public Builder size(int[] size) 
```


Upsampling size int array with a single element. Array must be length 1

- param size    upsampling size in single spatial dimension of this 1D layer





---

### Upsampling2D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D.java) </span>

Upsampling 2D layer<br>
Repeats each value (or rather, set of depth values) in the height and width dimensions by size[0] and size[1]
times respectively.<br>
Example:
<pre>
Input (slice for one example and channel)
[ A, B ]
[ C, D ]
Size = [2, 2]
Output (slice for one example and channel)
[ A, A, B, B ]
[ A, A, B, B ]
[ C, C, D, D ]
[ C, C, D, D ]
</pre>


##### size 
```java
public Builder size(int size) 
```


Upsampling size int, used for both height and width

- param size upsampling size in height and width dimensions

##### size 
```java
public Builder size(int[] size) 
```


Upsampling size array

- param size upsampling size in height and width dimensions





---

### Upsampling3D
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling3D.java) </span>

Upsampling 3D layer<br>
Repeats each value (all channel values for each x/y/z location) by size[0], size[1] and size[2]<br>


##### size 
```java
public Builder size(int size) 
```


Upsampling size as int, so same upsampling size is used for depth, width and height

- param size upsampling size in height, width and depth dimensions

##### size 
```java
public Builder size(int[] size) 
```


Upsampling size as int, so same upsampling size is used for depth, width and height

- param size upsampling size in height, width and depth dimensions





---

### ZeroPadding1DLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding1DLayer.java) </span>

Zero padding 1D layer for convolutional neural networks.
Allows padding to be done separately for top and bottom.


##### build 
```java
public ZeroPadding1DLayer build() 
```


- param padding  Padding for both the left and right





---

### ZeroPadding3DLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPadding3DLayer.java) </span>

Zero padding 3D layer for convolutional neural networks.
Allows padding to be done separately for "left" and "right"
in all three spatial dimensions.


##### build 
```java
public ZeroPadding3DLayer build() 
```


- param padding Padding for both the left and right in all three spatial dimensions





---

### ZeroPaddingLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/ZeroPaddingLayer.java) </span>

Zero padding layer for convolutional neural networks (2D CNNs).
Allows padding to be done separately for top/bottom/left/right


##### build 
```java
public ZeroPaddingLayer build() 
```



- param padHeight Padding for both the top and bottom
- param padWidth  Padding for both the left and right





---

### ElementWiseMultiplicationLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/ElementWiseMultiplicationLayer.java) </span>

- w is a learnable weight vector of length nOut<br>
- "." is element-wise multiplication<br>
- b is a bias vector<br>
<br>
Note that the input and output sizes of the element-wise layer are the same for this layer

created by jingshu

##### getMemoryReport 
```java
public LayerMemoryReport getMemoryReport(InputType inputType) 
```


This is a report of the estimated memory consumption for the given layer

- param inputType Input type to the layer. Memory consumption is often a function of the input type
- return Memory report for the layer





---

### RepeatVector
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/RepeatVector.java) </span>

RepeatVector layer configuration.

RepeatVector takes a mini-batch of vectors of shape (mb, length) and a repeat factor n and outputs
a 3D tensor of shape (mb, n, length) in which x is repeated n times.


##### repetitionFactor 
```java
public Builder repetitionFactor(int n) 
```


Set repetition factor for RepeatVector layer

- param n upsampling size in height and width dimensions





---

### Yolo2OutputLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer.java) </span>

Output (loss) layer for YOLOv2 object detection model, based on the papers:
YOLO9000: Better, Faster, Stronger - Redmon & Farhadi (2016) - <a href="https://arxiv.org/abs/1612.08242">https://arxiv.org/abs/1612.08242</a><br>
and<br>
You Only Look Once: Unified, Real-Time Object Detection - Redmon et al. (2016) -
<a href="http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf">http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf</a>
<br>
This loss function implementation is based on the YOLOv2 version of the paper. However, note that it doesn't
currently support simultaneous training on both detection and classification datasets as described in the
YOlO9000 paper.<br>

Note: Input activations to the Yolo2OutputLayer should have shape: [minibatch, b(5+c), H, W], where:<br>
b = number of bounding boxes (determined by config - see papers for details)<br>
c = number of classes<br>
H = output/label height<br>
W = output/label width<br>
<br>
Important: In practice, this means that the last convolutional layer before your Yolo2OutputLayer should have output
depth of b(5+c). Thus if you change the number of bounding boxes, or change the number of object classes,
the number of channels (nOut of the last convolution layer) needs to also change.
<br>
Label format: [minibatch, 4+C, H, W]<br>
Order for labels depth: [x1,y1,x2,y2,(class labels)]<br>
x1 = box top left position<br>
y1 = as above, y axis<br>
x2 = box bottom right position<br>
y2 = as above y axis<br>
Note: labels are represented as a multiple of grid size - for a 13x13 grid, (0,0) is top left, (13,13) is bottom right<br>
Note also that mask arrays are not required - this implementation infers the presence or absence of objects in each grid
cell from the class labels (which should be 1-hot if an object is present, or all 0s otherwise).


##### lambdaCoord 
```java
public Builder lambdaCoord(double lambdaCoord)
```


Loss function coefficient for position and size/scale components of the loss function.
Default (as per paper): 5

- param lambdaCoord Lambda value for size/scale component of loss function

##### lambbaNoObj 
```java
public Builder lambbaNoObj(double lambdaNoObj)
```


Loss function coefficient for the "no object confidence" components of the loss function.
Default (as per paper): 0.5

- param lambdaNoObj Lambda value for no-object (confidence) component of the loss function

##### lossPositionScale 
```java
public Builder lossPositionScale(ILossFunction lossPositionScale)
```


Loss function for position/scale component of the loss function

- param lossPositionScale Loss function for position/scale

##### lossClassPredictions 
```java
public Builder lossClassPredictions(ILossFunction lossClassPredictions)
```


Loss function for the class predictions - defaults to L2 loss (i.e., sum of squared errors, as per the
paper), however Loss MCXENT could also be used (which is more common for classification).

- param lossClassPredictions Loss function for the class prediction error component of the YOLO loss function

##### boundingBoxPriors 
```java
public Builder boundingBoxPriors(INDArray boundingBoxes)
```


Bounding box priors dimensions [width, height]. For N bounding boxes, input has shape [rows, columns] = [N, 2]
Note that dimensions should be specified as fraction of grid size. For example, a network with 13x13 output,
a value of 1.0 would correspond to one grid cell; a value of 13 would correspond to the entire image.

- param boundingBoxes Bounding box prior dimensions (width, height)





---

### MaskLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/util/MaskLayer.java) </span>

MaskLayer applies the mask array to the forward pass activations, and backward pass gradients, passing through
this layer. It can be used with 2d (feed-forward), 3d (time series) or 4d (CNN) activations.





---

### MaskZeroLayer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/util/MaskZeroLayer.java) </span>

Wrapper which masks timesteps with 0 activation.
Assumes that the input shape is [batch_size, input_size, timesteps].

##### getOutputType 
```java
public InputType getOutputType(int layerIndex, InputType inputType) 
```


- param underlying The underlying layer to wrap and mask activations for

