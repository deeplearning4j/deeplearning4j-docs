---
title: Arbiter Parameter Spaces
short_title: Parameter Spaces
description: Set a search spaces for parameters.
category: Arbiter
weight: 1
---

## Parameter Spaces

### BooleanSpace
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/BooleanSpace.java) </span>

If argument to setValue is less than or equal to 0.5 it will return True else False




### FixedValue
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/FixedValue.java) </span>

FixedValue is a ParameterSpace that defines only a single fixed value




### ContinuousParameterSpace
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/continuous/ContinuousParameterSpace.java) </span>



<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#ContinuousParameterSpace" aria-expanded="false" aria-controls="ContinuousParameterSpace">Show methods</button>
<div class="collapse" id="ContinuousParameterSpace"><div class="card card-body">

#### getValue 
```java
public Double getValue(double[] input) 
```


ContinuousParameterSpace with uniform distribution between the minimum and maximum values

- param min Minimum value that can be generated
- param max Maximum value that can be generated


</div></div>


### DiscreteParameterSpace
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/discrete/DiscreteParameterSpace.java) </span>

A DiscreteParameterSpace is used for a set of un-ordered values




### IntegerParameterSpace
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/integer/IntegerParameterSpace.java) </span>

some minimum and maximum value


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#IntegerParameterSpace" aria-expanded="false" aria-controls="IntegerParameterSpace">Show methods</button>
<div class="collapse" id="IntegerParameterSpace"><div class="card card-body">

#### getMin 
```java
public int getMin() 
```


Create an IntegerParameterSpace with a uniform distribution between the specified min/max (inclusive)

- param min Min value, inclusive
- param max Max value, inclusive


</div></div>


### MathOp
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/math/MathOp.java) </span>

A simple parameter space that implements scalar mathematical operations on another parameter space. This allows you
to do things like Y = X  2, where X is a parameter space. For example, a layer size hyperparameter could be set
using this to 2x the size of the previous layer




### PairMathOp
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/parameter/math/PairMathOp.java) </span>

A simple parameter space that implements pairwise mathematical operations on another parameter space. This allows you
to do things like Z = X + Y, where X and Y are parameter spaces.











