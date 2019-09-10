---
title: Updaters
short_title: Updaters
description: Special algorithms for gradient descent.
category: Models
weight: 10
---

## What are updaters?

The main difference among the updaters is how they treat the learning rate. Stochastic Gradient Descent, the most common learning algorithm in deep learning, relies on `Theta` (the weights in hidden layers) and `alpha` (the learning rate). Different updaters help optimize the learning rate until the neural network converges on its most performant state.

## Usage

To use the updaters, pass a new class to the `updater()` method in either a `ComputationGraph` or `MultiLayerNetwork`.

```java
ComputationGraphConfiguration conf = new NeuralNetConfiguration.Builder()
    .updater(new Adam(0.01))
    // add your layers and hyperparameters below
    .build();
```

## Available updaters


---

### NadamUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//NadamUpdater.java) </span>

The Nadam updater.
https://arxiv.org/pdf/1609.04747.pdf


##### applyUpdater 
```java
public void applyUpdater(INDArray gradient, int iteration, int epoch) 
```


Calculate the update based on the given gradient

- param gradient  the gradient to get the update for
- param iteration
- return the gradient





---

### NesterovsUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//NesterovsUpdater.java) </span>

Nesterov's momentum.
Keep track of the previous layer's gradient
and use it as a way of updating the gradient.


##### applyUpdater 
```java
public void applyUpdater(INDArray gradient, int iteration, int epoch) 
```


Get the nesterov update

- param gradient  the gradient to get the update for
- param iteration
- return





---

### RmsPropUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//RmsPropUpdater.java) </span>

RMS Prop updates:

http://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf
http://cs231n.github.io/neural-networks-3/#ada





---

### AdaGradUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//AdaGradUpdater.java) </span>

Vectorized Learning Rate used per Connection Weight
<p/>
Adapted from: http://xcorr.net/2014/01/23/adagrad-eliminating-learning-rates-in-stochastic-gradient-descent
See also http://cs231n.github.io/neural-networks-3/#ada


##### applyUpdater 
```java
public void applyUpdater(INDArray gradient, int iteration, int epoch) 
```


Gets feature specific learning rates
Adagrad keeps a history of gradients being passed in.
Note that each gradient passed in becomes adapted over time, hence the opName adagrad

- param gradient  the gradient to get learning rates for
- param iteration





---

### AdaMaxUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//AdaMaxUpdater.java) </span>

The AdaMax updater, a variant of Adam.
http://arxiv.org/abs/1412.6980


##### applyUpdater 
```java
public void applyUpdater(INDArray gradient, int iteration, int epoch) 
```


Calculate the update based on the given gradient

- param gradient  the gradient to get the update for
- param iteration
- return the gradient





---

### NoOpUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//NoOpUpdater.java) </span>

NoOp updater: gradient updater that makes no changes to the gradient





---

### AdamUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//AdamUpdater.java) </span>

The Adam updater.
http://arxiv.org/abs/1412.6980


##### applyUpdater 
```java
public void applyUpdater(INDArray gradient, int iteration, int epoch) 
```


Calculate the update based on the given gradient

- param gradient  the gradient to get the update for
- param iteration
- return the gradient





---

### AdaDeltaUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//AdaDeltaUpdater.java) </span>

http://www.matthewzeiler.com/pubs/googleTR2012/googleTR2012.pdf
https://arxiv.org/pdf/1212.5701v1.pdf

Ada delta updater. More robust adagrad that keeps track of a moving window
average of the gradient rather than the every decaying learning rates of adagrad


##### applyUpdater 
```java
public void applyUpdater(INDArray gradient, int iteration, int epoch) 
```


Get the updated gradient for the given gradient
and also update the state of ada delta.

- param gradient  the gradient to get the
updated gradient for
- param iteration
- return the update gradient





---

### SgdUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//SgdUpdater.java) </span>

SGD updater applies a learning rate only




---

### GradientUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//GradientUpdater.java) </span>

Gradient modifications: Calculates an update and tracks related information for gradient changes over time
for handling updates.





---

### AMSGradUpdater
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning//AMSGradUpdater.java) </span>

The AMSGrad updater<br>
Reference: On the Convergence of Adam and Beyond - https://openreview.net/forum?id=ryQu7f-RZ

