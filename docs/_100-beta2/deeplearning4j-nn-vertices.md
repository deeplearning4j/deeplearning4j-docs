---
title: Supported Vertices
short_title: Vertices
description: Computation graph nodes for advanced configuration.
category: Models
weight: 4
---

## What is a vertex?

In Eclipse Deeplearning4j a vertex is a type of layer that acts as a node in a `ComputationGraph`. It can accept multiple inputs, provide multiple outputs, and can help construct popular networks such as InceptionV4.

## Available classes








---

### L2NormalizeVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/L2NormalizeVertex.java) </span>

L2NormalizeVertex performs L2 normalization on a single input.





---

### L2Vertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/L2Vertex.java) </span>

L2Vertex calculates the L2 least squares error of two inputs.

For example, in Triplet Embedding you can input an anchor and a pos/neg class and use two parallel
L2 vertices to calculate two real numbers which can be fed into a LossLayer to calculate TripletLoss.








---

### PoolHelperVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/PoolHelperVertex.java) </span>

A custom layer for removing the first column and row from an input. This is meant to allow
importation of Caffe's GoogLeNet from https://gist.github.com/joelouismarino/a2ede9ab3928f999575423b9887abd14.





---

### ReshapeVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/ReshapeVertex.java) </span>

Adds the ability to reshape and flatten the tensor in the computation graph. This is the equivalent
to the next layer. ReshapeVertex also ensures the shape is valid for the backward pass.





---

### ScaleVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/ScaleVertex.java) </span>

A ScaleVertex is used to scale the size of activations of a single layer<br>
For example, ResNet activations can be scaled in repeating blocks to keep variance
under control.





---

### ShiftVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/ShiftVertex.java) </span>

A ShiftVertex is used to shift the activations of a single layer<br>
One could use it to add a bias or as part of some other calculation.
For example, Highway Layers need them in two places. One, it's often
useful to have the gate weights have a large negative bias. (Of course
for this, we could just initialize the biases that way.)
But, _also_ it needs to do this:
(1-sigmoid(weight  input + bias)) () input + sigmoid(weight  input + bias) () activation(w2  input + bias) (() is hadamard product)
So, here, we could have
1. a DenseLayer that does the sigmoid
2. a ScaleVertex(-1) and
3. a ShiftVertex(1)
to accomplish that.





---

### StackVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/StackVertex.java) </span>

StackVertex allows for stacking of inputs so that they may be forwarded through
a network. This is useful for cases such as Triplet Embedding, where shared parameters
are not supported by the network.

This vertex will automatically stack all available inputs.








---

### UnstackVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/UnstackVertex.java) </span>

UnstackVertex allows for unstacking of inputs so that they may be forwarded through
a network. This is useful for cases such as Triplet Embedding, where embeddings can
be separated and run through subsequent layers.

Works similarly to SubsetVertex, except on dimension 0 of the input. stackSize is
explicitly defined by the user to properly calculate an step.











---

### ReverseTimeSeriesVertex
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/vertex/impl/rnn/ReverseTimeSeriesVertex.java) </span>

ReverseTimeSeriesVertex is used in recurrent neural networks to revert the order of time series.
As a result, the last time step is moved to the beginning of the time series and the first time step
is moved to the end. This allows recurrent layers to backward process time series.

<b>Masks</b>: The input might be masked (to allow for varying time series lengths in one minibatch). In this case the
present input (mask array = 1) will be reverted in place and the padding (mask array = 0) will be left untouched at
the same place. For a time series of length n, this would normally mean, that the first n time steps are reverted and
the following padding is left untouched, but more complex masks are supported (e.g. [1, 0, 1, 0, ...].<br>


##### setBackpropGradientsViewArray 
```java
public void setBackpropGradientsViewArray(INDArray backpropGradientsViewArray) 
```


Gets the current mask array from the provided input
- return The mask or null, if no input was provided

