---
title: Deeplearning4j Autoencoders
short_title: Autoencoders
description: Supported autoencoder configurations.
category: Models
weight: 3
---

## What are autoencoders?

Autoencoders are neural networks for unsupervised learning. Eclipse Deeplearning4j supports certain autoencoder layers such as variational autoencoders.

## Where's Restricted Boltzmann Machine?

RBMs are no longer supported as of version 0.9.x. They are no longer best-in-class for most machine learning problems.

## Supported layers

### AutoEncoder
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/AutoEncoder.java) </span>

Autoencoder.
Add Gaussian noise to input and learn
a reconstruction function.




### BernoulliReconstructionDistribution
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/BernoulliReconstructionDistribution.java) </span>

Bernoulli reconstruction distribution for variational autoencoder.<br>
Outputs are modelled by a Bernoulli distribution - i.e., the Bernoulli distribution should be used for binary data (all
values 0 or 1); the VAE models the probability of the output being 0 or 1.<br>
Consequently, the sigmoid activation function should be used to bound activations to the range of 0 to 1. Activation
functions that do not produce outputs in the range of 0 to 1 (including relu, tanh, and many others) should be avoided.


##### hasLossFunction 
```java
public boolean hasLossFunction() 
```


Create a BernoulliReconstructionDistribution with the default Sigmoid activation function




### CompositeReconstructionDistribution
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/CompositeReconstructionDistribution.java) </span>

CompositeReconstructionDistribution is a reconstruction distribution built from multiple other ReconstructionDistribution
instances.<br>
The typical use is to combine for example continuous and binary data in the same model, or to combine different
distributions for continuous variables. In either case, this class allows users to model (for example) the first 10 values


##### addDistribution 
```java
public Builder addDistribution(int distributionSize, ReconstructionDistribution distribution) 
```


Add another distribution to the composite distribution. This will add the distribution for the next 'distributionSize'
values, after any previously added.
For example, calling addDistribution(10, X) once will result in values 0 to 9 (inclusive) being modelled
by the specified distribution X. Calling addDistribution(10, Y) after that will result in values 10 to 19 (inclusive)
being modelled by distribution Y.

- param distributionSize    Number of values to model with the specified distribution
- param distribution        Distribution to model data with




### ExponentialReconstructionDistribution
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/ExponentialReconstructionDistribution.java) </span>

Exponential reconstruction distribution.<br>
Supports data in range [0,infinity)<br>

Parameterization used here: network models distribution parameter gamma, where gamma = log(lambda), with gamma \in (-inf, inf)

This means that an input from the decoder of gamma = 0 gives lambda = 1
which corresponds to a mean value for the expontial distribution of 1/lambda = 1

Regarding the choice of activation function: the parameterization above supports gamma in the range (-infinity,infinity)
therefore a symmetric activation function such as "identity" or perhaps "tanh" is preferred.


##### hasLossFunction 
```java
public boolean hasLossFunction() 
```


- deprecated Use {- link #ExponentialReconstructionDistribution(Activation)}




### GaussianReconstructionDistribution
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/GaussianReconstructionDistribution.java) </span>

Gaussian reconstruction distribution for variational autoencoder.<br>
Outputs are modelled by a Gaussian distribution, with the mean and variances (diagonal covariance matrix) for each
output determined by the network forward pass.<br>

Specifically, the GaussianReconstructionDistribution models mean and log(stdev^2). This parameterization gives log(1) = 0,
and inputs can be in range (-infinity,infinity). Other parameterizations for variance are of course possible but may be
problematic with respect to the average pre-activation function values and activation function ranges.<br>
For activation functions, identity and perhaps tanh are typical - though tanh (unlike identity) implies a minimum/maximum
possible value for mean and log variance. Asymmetric activation functions such as sigmoid or relu should be avoided.


##### hasLossFunction 
```java
public boolean hasLossFunction() 
```


Create a GaussianReconstructionDistribution with the default identity activation function.




### LossFunctionWrapper
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/LossFunctionWrapper.java) </span>

LossFunctionWrapper allows training of a VAE model with a standard (possibly deterministic) neural network loss function

Note: most functionality is supported, but clearly reconstruction log probability cannot be calculated when using
LossFunctionWrapper, as ILossFunction instances do not have either (a) a probabilistic interpretation, or (b) a
means of calculating the negative log probability.




### ReconstructionDistribution
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/ReconstructionDistribution.java) </span>

to specify the form of the distribution p(data|x). For example, real-valued data could be modelled





### VariationalAutoencoder
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/variational/VariationalAutoencoder.java) </span>

Variational Autoencoder layer

See: Kingma & Welling, 2013: Auto-Encoding Variational Bayes - https://arxiv.org/abs/1312.6114

This implementation allows multiple encoder and decoder layers, the number and sizes of which can be set independently.

A note on scores during pretraining: This implementation minimizes the negative of the variational lower bound objective
as described in Kingma & Welling; the mathematics in that paper is based on maximization of the variational lower bound instead.
Thus, scores reported during pretraining in DL4J are the negative of the variational lower bound equation in the paper.
The backpropagation and learning procedure is otherwise as described there.


##### encoderLayerSizes 
```java
public Builder encoderLayerSizes(int... encoderLayerSizes) 
```


Size of the encoder layers, in units. Each encoder layer is functionally equivalent to a {- link org.deeplearning4j.nn.conf.layers.DenseLayer}.
Typically the number and size of the decoder layers (set via {- link #decoderLayerSizes(int...)} is similar to the encoder layers.

- param encoderLayerSizes    Size of each encoder layer in the variational autoencoder

##### decoderLayerSizes 
```java
public Builder decoderLayerSizes(int... decoderLayerSizes) 
```


Size of the decoder layers, in units. Each decoder layer is functionally equivalent to a {- link org.deeplearning4j.nn.conf.layers.DenseLayer}.
Typically the number and size of the decoder layers is similar to the encoder layers (set via {- link #encoderLayerSizes(int...)}.

- param decoderLayerSizes    Size of each deccoder layer in the variational autoencoder

##### reconstructionDistribution 
```java
public Builder reconstructionDistribution(ReconstructionDistribution distribution) 
```


The reconstruction distribution for the data given the hidden state - i.e., P(data|Z).<br>
This should be selected carefully based on the type of data being modelled. For example:<br>
- {- link GaussianReconstructionDistribution} + {identity or tanh} for real-valued (Gaussian) data<br>
- {- link BernoulliReconstructionDistribution} + sigmoid for binary-valued (0 or 1) data<br>

- param distribution    Reconstruction distribution

##### lossFunction 
```java
public Builder lossFunction(IActivation outputActivationFn, LossFunctions.LossFunction lossFunction) 
```


Configure the VAE to use the specified loss function for the reconstruction, instead of a ReconstructionDistribution.
Note that this is NOT following the standard VAE design (as per Kingma & Welling), which assumes a probabilistic
output - i.e., some p(x|z). It is however a valid network configuration, allowing for optimization of more traditional
objectives such as mean squared error.<br>
Note: clearly, setting the loss function here will override any previously set recontruction distribution

- param outputActivationFn Activation function for the output/reconstruction
- param lossFunction       Loss function to use

##### lossFunction 
```java
public Builder lossFunction(Activation outputActivationFn, LossFunctions.LossFunction lossFunction) 
```


Configure the VAE to use the specified loss function for the reconstruction, instead of a ReconstructionDistribution.
Note that this is NOT following the standard VAE design (as per Kingma & Welling), which assumes a probabilistic
output - i.e., some p(x|z). It is however a valid network configuration, allowing for optimization of more traditional
objectives such as mean squared error.<br>
Note: clearly, setting the loss function here will override any previously set recontruction distribution

- param outputActivationFn Activation function for the output/reconstruction
- param lossFunction       Loss function to use

##### lossFunction 
```java
public Builder lossFunction(IActivation outputActivationFn, ILossFunction lossFunction) 
```


Configure the VAE to use the specified loss function for the reconstruction, instead of a ReconstructionDistribution.
Note that this is NOT following the standard VAE design (as per Kingma & Welling), which assumes a probabilistic
output - i.e., some p(x|z). It is however a valid network configuration, allowing for optimization of more traditional
objectives such as mean squared error.<br>
Note: clearly, setting the loss function here will override any previously set recontruction distribution

- param outputActivationFn Activation function for the output/reconstruction
- param lossFunction       Loss function to use

##### pzxActivationFn 
```java
public Builder pzxActivationFn(IActivation activationFunction) 
```


Activation function for the input to P(z|data).<br>
Care should be taken with this, as some activation functions (relu, etc) are not suitable due to being
bounded in range [0,infinity).

- param activationFunction    Activation function for p(z|x)

##### pzxActivationFunction 
```java
public Builder pzxActivationFunction(Activation activation) 
```


Activation function for the input to P(z|data).<br>
Care should be taken with this, as some activation functions (relu, etc) are not suitable due to being
bounded in range [0,infinity).

- param activation    Activation function for p(z|x)

##### nOut 
```java
public Builder nOut(int nOut) 
```


Set the size of the VAE state Z. This is the output size during standard forward pass, and the size of the
distribution P(Z|data) during pretraining.

- param nOut    Size of P(Z|data) and output size

##### numSamples 
```java
public Builder numSamples(int numSamples) 
```


Set the number of samples per data point (from VAE state Z) used when doing pretraining. Default value: 1.

This is parameter L from Kingma and Welling: "In our experiments we found that the number of samples L per
datapoint can be set to 1 as long as the minibatch size M was large enough, e.g. M = 100."

- param numSamples    Number of samples per data point for pretraining

