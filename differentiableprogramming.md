---
title: A Beginner's Guide to Differentiable Programming (DiffProg)
layout: default
---

# A Beginner's Guide to Differentiable Programming (DiffProg)

Differentiable programming is another name for a collection of methods now called [deep learning](./neuralnet-overview). As deep learning attracts more and more hype, attempts are being made to name the field more precisely and differentiate it, so to speak, from popular conceptions of AI. 

## What Is Differentiation?

Differentiable, of course, refers to the calculus technique of differentiation. Differentiation is the act of taking a function's derivative, or its instantaneous rate of change, with respect to one of its variables.

In machine learning, differentiation is used to calculute the relationship between a change in one of an algorithm's variables, and a change related to its output. For example, changing the parameters of a neural network may change the error it generates when making a prediction. 

By altering the neural network's parameters, the algorithm can be adjusted to produce less error. By using backpropagation, an objective function, and an updating mechanism for the parameters, the algorithm's model can be written and rewritten until error is minimized. The creation of that machine-learning model can be called differentiable programming. 

Sometimes the relation between the parameters of a model and the error it produces is difficult or impossible to differentiate. For example, the relationship between actions and rewards in reinforcement learning can be difficult to establish, because rewards in a simulated environment like a game may be sparse, or awarded so occasionally that it is hard to know why. 

## Yann LeCun Proposes a New Buzzword

Yann LeCun described [differentiable programming](https://www.facebook.com/yann.lecun/posts/10155003011462143) like this:

```
Yeah, Differentiable Programming is little more than a rebranding of the modern collection Deep Learning techniques, the same way Deep Learning was a rebranding of the modern incarnations of neural nets with more than two layers.

The important point is that people are now building a new kind of software by assembling networks of parameterized functional blocks and by training them from examples using some form of gradient-based optimization….It’s really very much like a regular program, except it’s parameterized, automatically differentiated, and trainable/optimizable.

An increasingly large number of people are defining the networks procedurally in a data-dependent way (with loops and conditionals), allowing them to change dynamically as a function of the input data fed to them. It's really very much like a regular progam, except it's parameterized, automatically differentiated, and trainable/optimizable. Dynamic networks have become increasingly popular (particularly for NLP), thanks to deep learning frameworks that can handle them such as PyTorch and Chainer (note: our old deep learning framework Lush could handle a particular kind of dynamic nets called Graph Transformer Networks, back in 1994. It was needed for text recognition).

People are now actively working on compilers for imperative differentiable programming languages. This is a very exciting avenue for the development of learning-based AI.

Important note: this won't be sufficient to take us to "true" AI. Other concepts will be needed for that, such as what I used to call predictive learning and now decided to call Imputative Learning. More on this later....
```

Differentiable programming will never be the buzzword that deep learning is. It's too much of a mouthful. LeCun has proposed DP, DiffProg or dProg as less unwieldy substitutes.

<p align="center">
<a href="https://docs.skymind.ai/docs/welcome" type="button" class="btn btn-lg btn-success" onClick="ga('send', 'event', ‘quickstart', 'click');">GET STARTED WITH DIFFERENTIABLE PROGRAMMING</a>
</p>

In a more recent [Reddit AMA](https://www.reddit.com/r/science/comments/7yegux/aaas_ama_hi_were_researchers_from_google/), LeCun went on to say:

```
...With the ability to define dynamic deep architectures (i.e. computation graphs that are defined procedurally and whose structure changes for every new input) is a generalization of deep learning that some have called Differentiable Programming.
```

Frankly, dynamic computation graphs for deep neural networks sounds an awful lot like a kind of deep learning.

### More Resources on Differentiable Programming

* [Automatic differentiation in machine learning: a survey](https://arxiv.org/abs/1502.05767)
* [Software 2.0, by Andrej Karpathy](https://medium.com/@karpathy/software-2-0-a64152b37c35)
* [Slides: Differentiable Programming, Microsoft Research (2016)](http://www.cs.nuim.ie/~gunes/files/Baydin-MSR-Slides-20160201.pdf)
* [Differentiable Programming @Edge.org](https://www.edge.org/response-detail/26794)

## <a name="resources">More Machine Learning Tutorials</a>

* [Eigenvectors, Covariance, PCA and Entropy](./eigenvector)
* [Recurrent Networks and Long Short-Term Memory Units (LSTMs)](./lstm.html)
* [Introduction to Neural Networks](./neuralnet-overview.html)
* [Beginner's Guide to Reinforcement Learning](./deepreinforcementlearning.html)
* [Convolutional Networks (CNNs)](./convolutionalnetwork.html)
* [Multilayer Perceptron (MLPs) for Classification](./multilayerperceptron)
* [Generative Adversarial Networks (GANs)](./generative-adversarial-network)
* [Attention Mechanisms and Memory Networks](./attention-memory-network.html)
* [Graph Data and Deep Learning](./graphanalytics.html)
* [Word2Vec: Neural Embeddings for NLP](./word2vec.html)
* [Symbolic Reasoning (Symbolic AI) & Deep Learning](./symbolicreasoning.html)
* [Markov Chain Monte Carlo & Machine Learning](/markovchainmontecarlo.html)
* [Restricted Boltzmann Machines (RBMs)](./restrictedboltzmannmachine.html)
* [Neural Networks & Regression](./logistic-regression.html)
* [Introduction to Decision Trees](./decision-tree.html)
* [Introduction to Random Forests](./random-forest.html)
* [Open Datasets for Machine Learning](./opendata.html)
* [AI vs. Machine Learning vs. Deep Learning](./ai-machinelearning-deeplearning.html)
* [Inference in Production: Machine Learning Model Server](./machine-learning-server.html)
* [Distributed Deep Learning on Apache Spark](./spark.html)
* [Definition of Artificial Intelligence (AI)](./ai-artificial-intelligence-definition.html)
* [How CIOs Should Think about Machine Learning and AI](./cio-chief-information-officer-machine-learning-ai.html)
* [AI Infrastructure: Machine Learning Operations (MlOps)](./ai-infrastructure-machine-learning-operations-mlops.html)
* [AI Winter: Deep Learning and its Discontents](./ai-winter.html)
