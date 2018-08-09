---
title: Keras Import Noise Layers
short_title: Noise Layers
description: Supported Keras noise layers.
category: Keras Import
weight: 4
---

## Keras layers

### KerasAlphaDropout
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/noise/KerasAlphaDropout.java) </span>

Keras wrapper for DL4J dropout layer with AlphaDropout.


#### KerasAlphaDropout 
```java
public KerasAlphaDropout(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasAlphaDropout" aria-expanded="false" aria-controls="KerasAlphaDropout">Show methods</button>
<div class="collapse" id="KerasAlphaDropout"><div class="card card-body">

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getAlphaDropoutLayer 
```java
public DropoutLayer getAlphaDropoutLayer() 
```


Get DL4J DropoutLayer with Alpha dropout.

- return DropoutLayer


</div></div>


### KerasGaussianDropout
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/noise/KerasGaussianDropout.java) </span>

Keras wrapper for DL4J dropout layer with GaussianDropout.


#### KerasGaussianDropout 
```java
public KerasGaussianDropout(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Invalid Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasGaussianDropout" aria-expanded="false" aria-controls="KerasGaussianDropout">Show methods</button>
<div class="collapse" id="KerasGaussianDropout"><div class="card card-body">

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getGaussianDropoutLayer 
```java
public DropoutLayer getGaussianDropoutLayer() 
```


Get DL4J DropoutLayer with Gaussian dropout.

- return DropoutLayer


</div></div>


### KerasGaussianNoise
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/layers/noise/KerasGaussianNoise.java) </span>

Keras wrapper for DL4J dropout layer with GaussianNoise.


#### KerasGaussianNoise 
```java
public KerasGaussianNoise(Integer kerasVersion) throws UnsupportedKerasConfigurationException 
```


Pass-through constructor from KerasLayer

- param kerasVersion major keras version
- throws UnsupportedKerasConfigurationException Unsupported Keras config


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#KerasGaussianNoise" aria-expanded="false" aria-controls="KerasGaussianNoise">Show methods</button>
<div class="collapse" id="KerasGaussianNoise"><div class="card card-body">

#### getOutputType 
```java
public InputType getOutputType(InputType... inputType) throws InvalidKerasConfigurationException 
```


Constructor from parsed Keras layer configuration dictionary.

- param layerConfig dictionary containing Keras layer configuration.
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

#### getGaussianNoiseLayer 
```java
public DropoutLayer getGaussianNoiseLayer() 
```


Get DL4J DropoutLayer with Gaussian dropout.

- return DropoutLayer


</div></div>