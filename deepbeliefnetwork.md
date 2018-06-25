---
title: Deep-Belief Networks in Java
layout: default
---

# Tutorial: Deep-Belief Networks & MNIST

NOTE: Deep Belief Networks and RBMs are deprecated. 

A deep-belief network can be defined as a stack of [restricted Boltzmann machines, explained here](./restrictedboltzmannmachine.html), in which each RBM layer communicates with both the previous and subsequent layers. The nodes of any single layer don't communicate with each other laterally. 

This stack of RBMs might end with a a [Softmax](./glossary.html#softmax) layer to create a classifier, or it may simply help cluster unlabeled data in an unsupervised learning scenario. 

With the exception of the first and final layers, each layer in a deep-belief network has a double role: it serves as the hidden layer to the nodes that come before it, and as the input (or "visible") layer to the nodes that come after. It is a network built of single-layer networks. 

Deep-belief networks are used to recognize, cluster and generate images, video sequences and motion-capture data. A continuous deep-belief network is simply an extension of a deep-belief network that accepts a continuum of decimals, rather than binary data. They were introduced by [Geoff Hinton and his students in 2006](http://www.cs.toronto.edu/~hinton/absps/fastnc.pdf).

<p align="center">
<a href="https://docs.skymind.ai/docs/welcome" type="button" class="btn btn-lg btn-success" onClick="ga('send', 'event', ‘quickstart', 'click');">GET STARTED WITH DEEP LEARNING</a>
</p>

## MNIST for Deep-Belief Networks

MNIST is a good place to begin exploring image recognition and DBNs. The first step is to take an image from the dataset and binarize it; i.e. convert its pixels from continuous gray scale to ones and zeros. Typically, every gray-scale pixel with a value higher than 35 becomes a 1, while the rest are set to 0. The MNIST dataset iterator class does that.

### Hyperparameters

See the [parameters common to all multilayer networks](./neuralnet-configuration).

The variable k represents the number of times you run [contrastive divergence](./glossary.html#contrastivedivergence). Each time contrastive divergence is run, it's a sample of the Markov chain. In composing a deep-belief network, a typical value is `1`.

### <a name="resources">Other Beginner's Guides to Machine Learning</a>

* [Introduction to Neural Networks](./neuralnet-overview)
* [LSTMs and Recurrent Networks](./lstm)
* [Word2vec](./word2vec)
* [Restricted Boltzmann Machines](./restrictedboltzmannmachine)
* [Eigenvectors, Covariance, PCA and Entropy](./eigenvector)
* [Neural Networks and Regression](./logistic-regression)
* [Convolutional Networks](./convolutionalnets)
* [Generative Adversarial Networks (GANs)](https://deeplearning4j.org/generative-adversarial-network)
* [Inference: Machine Learning Model Server](./machine-learning-modelserver)
* [Beginner's Guide to Reinforcement Learning](./reinforcementlearning)
