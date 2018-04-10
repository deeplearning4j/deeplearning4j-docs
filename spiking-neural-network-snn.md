---
title: Spiking Neural Networks
layout: default
---

# A Beginner's Guide to Spiking Neural Networks

Spiking is a way to encode digital communications over a long distance (the spike rate and timing of individual spikes relative to others are the variations by which a spiking signal is encoded), because analog values are destroyed when sent a long distance over an active medium. Think smoke signals in the American West, talking drums in West Africa, or Morse Code on the telegraphs of the 19th and early 20th centuries. 

But analog signals work fine locally, so in a sense, spikes are similar to packets in mesh interconnect. Pure spiking works in all-purpose machines like CPUs and GPUs, but the hardware's numeric capacity is wasted, and it doesn't use scarce random access memory bandwidth optimally.

Like most algorithms, SNNs can be baked onto silicon. When companies like IBM and Intel discuss their "neuromorphic" chips, such as IBM's TrueNorth, they're usually referring to a custom chip, or ASIC, that contains a spiking mechanism in the form of an signal accumulator that fires once a certain type of input surpasses a threshhold. 

Spiking neural networks can learn using gradient descent.

## SNN Advantages

* Low energy usage
* Greater parallelizability due to local-only interactions
* (Maybe) better able to learn non-differentiable functions

## Further Reading on Spiking Neural Networks

* [Gradient Descent for Spiking Neural Networks](https://arxiv.org/abs/1706.04698)
* [Spiking Neuron Models. Single Neurons, Populations, Plasticity](http://icwww.epfl.ch/~gerstner/SPNM/SPNM.html)
* [STDP-based spiking deep convolutional neural networks for object recognition](https://arxiv.org/abs/1611.01421)
* [Convolutional Networks for Fast, Energy-Efficient Neuromorphic Computing](https://arxiv.org/abs/1603.08270)
* [TrueHappiness: Neuromorphic Emotion Recognition on TrueNorth](https://arxiv.org/abs/1601.04183)
* [The Brain as an Efficient and Robust Adaptive Learner](http://www.cell.com/neuron/abstract/S0896-6273(17)30417-8)
* [Bayesian Spiking Neurons I: Inference](https://www.mitpressjournals.org/doi/abs/10.1162/neco.2008.20.1.91)
* [Predictive Coding of Dynamical Variables in Balanced Spiking Networks](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003258)

## <a name="intro">More Machine Learning Tutorials</a>

For people just getting started with deep learning, the following tutorials and videos provide an easy entrance to the fundamental ideas of deep neural networks:

* [Recurrent Networks and LSTMs](./lstm.html)
* [Deep Reinforcement Learning](./deepreinforcementlearning.html)
* [Deep Convolutional Networks](./convolutionalnetwork.html)
* [Multilayer Perceptron (MLPs) for Classification](./multilayerperceptron.html)
* [Generative Adversarial Networks (GANs)](./generative-adversarial-network.html)
* [Symbolic Reasoning & Deep Learning](./symbolicreasoning.html)
* [Using Graph Data with Deep Learning](./graphanalytics.html)
* [AI vs. Machine Learning vs. Deep Learning](./ai-machinelearning-deeplearning.html)
* [Markov Chain Monte Carlo & Machine Learning](/markovchainmontecarlo.html)
* [MNIST for Beginners](./mnist-for-beginners.html)
* [Restricted Boltzmann Machines](./restrictedboltzmannmachine.html)
* [Eigenvectors, PCA, Covariance and Entropy](./eigenvector.html)
* [Glossary of Deep-Learning and Neural-Net Terms](./glossary.html)
* [Word2vec and Natural-Language Processing](./word2vec.html)
* [Deeplearning4j Examples via Quickstart](./quickstart.html)
* [Neural Networks Demystified](https://www.youtube.com/watch?v=bxe2T-V8XRs) (A seven-video series)
* [Inference: Machine Learning Model Server](./machine-learning-server.html)
