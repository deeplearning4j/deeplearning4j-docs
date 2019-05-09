---
title: Activations
short_title: Activations
description: Special algorithms for gradient descent.
category: Models
weight: 10
---

## What are activations?

At a simple level, activation functions help decide whether a neuron should be activated. This helps determine whether the information that the neuron is receiving is relevant for the input. The activation function is a non-linear transformation that happens over an input signal, and the transformed output is sent to the next neuron.

## Usage

The recommended method to use activations is to add an activation layer in your neural network, and configure your desired activation:

```java
GraphBuilder graphBuilder = new NeuralNetConfiguration.Builder()
	// add hyperparameters and other layers
	.addLayer("softmax", new ActivationLayer(Activation.SOFTMAX), "previous_input")
	// add more layers and output
	.build();
```

## Available activations


---

### ActivationRectifiedTanh
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationRectifiedTanh.java) </span>

Rectified tanh

Essentially max(0, tanh(x))

Underlying implementation is in native code




---

### ActivationELU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationELU.java) </span>

f(x) = alpha  (exp(x) - 1.0); x < 0
= x ; x>= 0

alpha defaults to 1, if not specified




---

### ActivationReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationReLU.java) </span>

f(x) = max(0, x)




---

### ActivationRationalTanh
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationRationalTanh.java) </span>

Rational tanh approximation
From https://arxiv.org/pdf/1508.01292v3

f(x) = 1.7159  tanh(2x/3)
where tanh is approximated as follows,
tanh(y) ~ sgn(y)  { 1 - 1/(1+|y|+y^2+1.41645y^4)}

Underlying implementation is in native code




---

### ActivationThresholdedReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationThresholdedReLU.java) </span>

Thresholded RELU

f(x) = x for x > theta, f(x) = 0 otherwise. theta defaults to 1.0





---

### ActivationReLU6
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationReLU6.java) </span>

f(x) = min(max(input, cutoff), 6)




---

### ActivationHardTanH
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationHardTanH.java) </span>

⎧  1, if x >  1
f(x) =   ⎨ -1, if x < -1
⎩  x, otherwise




---

### ActivationSigmoid
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationSigmoid.java) </span>

f(x) = 1 / (1 + exp(-x))




---

### ActivationGELU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationGELU.java) </span>

GELU activation function - Gaussian Error Linear Units





---

### ActivationPReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationPReLU.java) </span>

/ Parametrized Rectified Linear Unit (PReLU)

f(x) = alpha  x for x < 0, f(x) = x for x >= 0

alpha has the same shape as x and is a learned parameter.





---

### ActivationIdentity
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationIdentity.java) </span>

f(x) = x




---

### ActivationSoftSign
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationSoftSign.java) </span>

f_i(x) = x_i / (1+|x_i|)




---

### ActivationHardSigmoid
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationHardSigmoid.java) </span>

f(x) = min(1, max(0, 0.2x + 0.5))




---

### ActivationSoftmax
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationSoftmax.java) </span>

f_i(x) = exp(x_i - shift) / sum_j exp(x_j - shift)
where shift = max_i(x_i)




---

### ActivationCube
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationCube.java) </span>

f(x) = x^3




---

### ActivationRReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationRReLU.java) </span>

f(x) = max(0,x) + alpha  min(0, x)

alpha is drawn from uniform(l,u) during training and is set to l+u/2 during test
l and u default to 1/8 and 1/3 respectively

<a href="http://arxiv.org/abs/1505.00853">
Empirical Evaluation of Rectified Activations in Convolutional Network</a>




---

### ActivationTanH
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationTanH.java) </span>

f(x) = (exp(x) - exp(-x)) / (exp(x) + exp(-x))




---

### ActivationSELU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationSELU.java) </span>

https://arxiv.org/pdf/1706.02515.pdf




---

### ActivationLReLU
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationLReLU.java) </span>

Leaky RELU
f(x) = max(0, x) + alpha  min(0, x)
alpha defaults to 0.01




---

### ActivationSwish
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationSwish.java) </span>

f(x) = x  sigmoid(x)




---

### ActivationSoftPlus
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/impl//ActivationSoftPlus.java) </span>

f(x) = log(1+e^x)
