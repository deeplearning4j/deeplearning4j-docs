---
title: AI Infrastructure: Machine Learning Operations (MlOps) 
layout: default
---

# AI Infrastructure: Machine Learning Operations (MlOps) 

Machine learning operations is the machine-learning equivalent of DevOps: it solves the problems of implementing machine-learning in production, notably around the technology infrastructure and tooling necessary to deploy machine-learning algorithms and data pipelines reliably and scalably, so as not to destabilize other parts of the stack. 

## Workloads in Machine Learning Operations 

There are four basic workloads relevant to machine learning operations, listed here in rough order of importance. 

* Batch inference (scoring)
* Real-time inference
* Auditing AI model performance
* Debugging AI jobs

Once an AI model has been trained to produce accurate predictions, it has to be deployed. Like all technology deployed to production, AI models need infrastructure that allows the people responsible for systems and operations to observe what they are doing, whether they are meeting their SLAs, and debug them if necessary. Each of the workloads named above has slightly different metrics by which performance should be judged. 

### Batch Inference

Batch inference, or scoring a large, historical dataset, assumes that the dataset is large, maybe larger than other machine-learning workloads in production.

With Deeplearning4j, batch inference can be performed by connecting to a Spark cluster, and running a Spark job on a that dataset. To do that, you would access a distributed file system or a data store like S3. (You also might use EMR or Azure.) In short, you run data-processing jobs, and score the data on a distributed system, and save the results offline. Indeed, batch inference is an offline job, as opposed to real-time scoring. 

Batch inference involves no REST API -- it can be performed using Spark alone. So you take a distributed data store, run a Spark job, score the data and store the results. 

The performance metric that should be applied to batch inference is: How many hours does it take this job to run?

### Real-time Inference

Real-time inference is an online process that runs data streams from message queues like Kafka and real-time streaming engines like Flink. This type of scoring will rely on interfaces such as REST APIs or gRPC. 

The most important metric to gauge the performance of models for real-time inference is latency, and the way to ensure latency is either dynamic scaling or auto-scaling. These two types of scaling are slightly different. 

Dynamic scaling tries to maintain consistent infrastructure. For example, an AI cluster with dynamic scaling would be able to monitor the server devoted to inference and, should one fail, would spin up another to replace it and keep the capacity of the inference cluster steady. 

Auto-scaling relates to latency. A cluster enabled for auto-scaling can monitor the latency of the decisions produced by AI models, and would spin up an arbitrary number of new servers to maintain the necessary latency in the face of data surges. 

### Auditing AI model performance

Machine-learning operations should prompt the people managing AI deployments to update or retune AI models when their performance lapses, which happens frequently as data and models drift apart and the real-world behavior reflected in the data evolves. AI infrastructure should enable a continuous training loop based on feedback from the software monitoring the deployed models. In a sense, the ideal machine-learning model should monitor itself.

### Debugging AI Models



## Machine Learning Operations (MlOps) vs. Data Science

What does MLOps do? It smooths your AI go-to-market strategy. It saves developer time around standing up a cluster, among other tasks. 

Machine learning operations address a different set of problem than data science and MlOps software solve other problems than data science tooling. Machine learning operations concerns itself with:

* How to handle different file formats
* How to integrate with various data sources and message queues 
* Persistent and reusable data pipelines
    * Example: Is your data pipeline consistent with what your data science team built? Can you take your ETL and make it a JSON?
* Installing low-level math libraries such as CUDA and MKL correctly
* Serving, monitoring model performance and updating machine-learning models
    * Example: Standing up models in real time in a data stream, connecting it to Kafka
* The interaction between machine learning and distributed systems (Spark cluster, running distributed jobs)
    * Example: You want to run batch inference; You have 1 petabyte of data in an S3 bucket.

In most situations, data engineers do many of those tasks themselves. 

Machine-learning operations concerns itself with the environment where machine learning will run, and managing the complexity the that, which is in fact a great deal of complexity. In that environment, you will probably have multiple databases over multiple teams, maybe multiple Hadoop clusters. You will need consistent dependencies across the cluster, matching your version of TensorFlow to CUDA, for example. While Anaconda manages Python dependencies, it does not handle ETL or tracking (by this we mean observability: do you have a history of what you're doing?) or machine learning model performance (do you have a history of what the model is doing?). 

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
