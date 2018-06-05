---
title: AI Infrastructure: Machine Learning Operations (MlOps) 
layout: default
---

# AI Infrastructure: Machine Learning Operations (MlOps) 

Machine learning operations is the machine-learning equivalent of DevOps: it solves the problems of implementing machine-learning in production, notably around the technology infrastructure and tooling necessary to deploy machine-learning algorithms and data pipelines reliably and scalably, so as not to destabilize other parts of the stack. 

## Machine Learning Operations (MlOps) vs. Data Science

What does MLOps do? It smooths your AI go-to-market strategy. It saves developer time around standing up a cluster, among other tasks. 

Machine learning operations address a different set of problem than data science and MlOps software solve other problems than data science tooling. Machine learning operations concerns itself with:

* How to handle different file formats
* How to integrate with various data sources and message queues 
* Persistent and reusable data pipelines

--Is your data pipeline consistent with what your data science team built? Can you take your ETL and make it a JSON?
* Installing low-level math libraries such as CUDA and MKL correctly
* Serving, monitoring model performance and updating machine-learning models

--Standing up models in real time in a data stream, connecting it to Kafka
--requires vectorization
* The interaction between machine learning and distributed systems (Spark cluster, running distributed jobs)

--Example: You want to run batch inference; You have 1 petabyte of data in an S3 bucket.

In most situations, data engineers do many of those tasks themselves. 

Machine-learning operations concerns itself with the environment where machine learning will run, and managing the complexity the that, which is in fact a great deal of complexity. In that environment, you will probably have multiple databases over multiple teams, maybe multiple Hadoop clusters. You will need consistent dependencies across the cluster, matching your version of TensorFlow to CUDA, for example. While Anaconda manages Python dependencies, it does not handle ETL or tracking (by this we mean observability: do i have a history of what i'm doing?) or machine learning model performance (do you have a history of what the model is doing?). 

## Machine Learning Server

Machine learning faces challenges to scaling at the four main stages of its workflow:

* ETL (Data pipelines)
* Algorithm training
* Inference
* Monitoring, Management and Updates

The Skymind Intelligence Layer (SKIL) is a [machine learning server](./machine-learning-server.html) that solves the problem of serving machine-learning models at scale during the inference phase. 

### <a name="beginner">More Machine Learning Tutorials</a>

* [Introduction to Neural Networks](./neuralnet-overview.html)
* [Beginner's Guide to Reinforcement Learning](./deepreinforcementlearning.html)
* [Convolutional Networks (CNNs)](./convolutionalnetwork.html)
* [Multilayer Perceptron (MLPs) for Classification](./multilayerperceptron)
* [Generative Adversarial Networks (GANs)](./generative-adversarial-network)
* [Attention Mechanisms and Memory Networks](./attention-memory-network)
* [Graph Data and Deep Learning](./graphanalytics.html)
* [Word2Vec: Neural Embeddings for NLP](./word2vec.html)
* [Symbolic Reasoning (Symbolic AI) & Deep Learning](./symbolicreasoning.html)
* [Markov Chain Monte Carlo & Machine Learning](/markovchainmontecarlo.html)
* [Restricted Boltzmann Machines](./restrictedboltzmannmachine.html)
* [Eigenvectors, Eigenvalues, Covariance, PCA and Entropy](./eigenvector.html)
* [Neural Networks & Regression](./logistic-regression.html)
* [Introduction to Decision Trees](./decision-tree.html)
* [Introduction to Random Forests](./random-forest.html)
* [Open Datasets for Machine Learning](./opendata.html)
* [Deep Learning on Apache Spark](./spark.html)
* [AI vs. Machine Learning vs. Deep Learning](./ai-machinelearning-deeplearning.html)
* [Machine Learning Model Server for Inference in Production](./machine-learning-server.html)
