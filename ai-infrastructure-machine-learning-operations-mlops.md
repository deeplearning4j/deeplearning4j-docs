---
title: AI Infrastructure & Machine Learning Operations (MlOps)
layout: default
redirect_to:
  - https://skymind.ai/wiki/ai-infrastructure-machine-learning-operations-mlops
---

# AI Infrastructure & Machine Learning Operations (MlOps)

AI infrastructure and machine learning operations, also known as AIOps or MlOps, are nearly synonymous. Both terms refer to the technology stack required to get machine learning algorithms into production in a stable, scalable and reliable way. 

The AI infrastructure stack extends from the data science tools used to select and train machine learning algorithms down to the hardware that those algorithms use to process data, and include the data bases and message queues they use to store and move the datasets that act as their fuel. 

AI infrastructure encompasses almost every stage of the [machine-learning workflow](./machine-learning-workflow.html). It enables data scientists, data engineers, software engineers and DevOps teams to access and manage the computing resources to test, train and deploy AI algorithms. 

Early in the workflow, that includes exploratory data analysis and running large-scale queries on data you've stored. In the middle, AI infrastructure involves training algorithms, probably on a cluster of distributed GPUs. Late in the workflow, it entails deploying those machine-learning models for inference in a reliable and scalable way, much as you would deploy a web site on a web server that your business counts on not to crash. 

"Machine learning operations", or MlOps, is the machine-learning equivalent of DevOps: it solves the problems of implementing machine-learning in production, to deploying machine-learning algorithms and data pipelines so as not to destabilize other parts of the stack. 

Machine learning faces challenges to scaling at every turn. Here are the four main stages of its workflow:

* ETL (Data pipelines)
* Algorithm training
* Inference
* Monitoring, Management and Updates

The Skymind Intelligence Layer (SKIL) is a [machine learning server](./machine-learning-server.html) that solves the problem of serving machine-learning models at scale during the inference phase, the final stage of MlOps. 

## Workloads in Machine Learning Operations 

There are four basic workloads relevant to machine learning operations, listed here in rough order of importance. 

* Batch inference (scoring)
* Real-time inference
* Auditing AI model performance
* Debugging AI jobs

Once an AI model has been trained to produce accurate predictions, it has to be deployed. Like all technology deployed to production, AI models need infrastructure that allows the people responsible for systems and operations to observe what they are doing, whether or not their SLAs are being met, while enabling them to debug the models if necessary. Each of the workloads named above has slightly different metrics by which performance should be judged, which we will explore below. 

<p align="center">
<a href="https://skymind.ai/model-deployment-ml-ops.html" type="button" class="btn btn-lg btn-success"
        data-ga-event="click"
        data-ga-category="Click/Button"
        data-ga-action="GoTo/SKILDocs"
        data-ga-label="LSTMPage">GET STARTED WITH MACHINE LEARNING OPS</a>
</p>

### Batch Inference

Batch inference means scoring a large, historical dataset, assumes that the dataset is large, maybe larger than other machine-learning workloads in production.

With Deeplearning4j, batch inference can be performed by connecting to a Spark cluster, and running a Spark job on that dataset. To do that, you would access a distributed file system or a data store like S3. (You also might use EMR or Azure.) In short, you run data-processing jobs, and score the data on a distributed system, and save the results offline. Indeed, batch inference is an offline job, as opposed to real-time scoring. 

Batch inference involves no REST API -- it can be performed using Spark alone. That is, you take a distributed data store, run a Spark job, score the data and store the results. 

The performance metric that should be applied to batch inference is how many hours it takes your job to run.

### Real-time Inference

Real-time inference is an online process that draws data streams from message queues like Kafka and real-time streaming engines like Flink. This type of scoring will rely on interfaces such as REST APIs or gRPC. 

The most important metric to gauge the performance of models deployed for real-time inference is **latency**, and the way to maintain low latency is through either dynamic scaling or auto-scaling. These two types of scaling are slightly different. 

Dynamic scaling is designed to maintain a constant infrastructure. For example, an AI cluster with dynamic scaling would be able to monitor the servers devoted to inference and, should one fail, spin up another to replace it in order to keep the capacity of the inference cluster steady. 

Auto-scaling relates to latency. A cluster enabled for auto-scaling can monitor the latency of the decisions produced by AI models, and spins up an arbitrary number of new servers to maintain the necessary latency (mandated in an SLA) in the face of data surges. 

### Auditing AI Model Performance

Machine-learning operations should prompt the people managing AI deployments to update or retune AI models when their performance lapses, which happens frequently as data and models drift apart and the real-world behavior reflected in the data evolves. 

AI infrastructure should enable a continuous training loop based on feedback from the software monitoring the deployed models. In a sense, the ideal machine-learning model should monitor itself.

### Debugging AI Deployments

Finally, machine learning operations should support operations teams when they seek to deploy jobs and investigate why a certain job, be it batch inference or auto-scaling for real-time inference, fails. 

Many AI vendors claim to help developers deploy AI models, and their claims frequently involve Docker containers orchestrated by Kubernetes. But Kubernetes is just one job runner among many. 

Anyone planning to deploy AI models should ask themselves: 

* How do you observe it?
* How do you know if it fails? 
* If the model is wrong, do you have a feedback loop? 
* How does it scale - does it have an automatic load balancing? 

Most of the time, deployments on Docker don't have good answers to those questions. 

## Machine Learning Operations (MlOps) vs. Data Science

What does MLOps do? It smooths and accelerates your AI go-to-market strategy. It saves developer time that would be wasted standing up a cluster, among other tasks. 

Machine learning operations address a different set of problems than data science, and MlOps software solves other problems than data science tooling. Machine learning operations concerns itself with:

* Handling different file formats
* Integrating with various data sources and message queues 
* Building Persistent and reusable data pipelines
    * Example: Is your data pipeline consistent with what your data science team built? Can you take your ETL and make it a JSON?
* Installing low-level math libraries such as CUDA and MKL correctly
* Serving, monitoring model performance and updating machine-learning models
    * Example: Standing up models in real time in a data stream, connecting it to Kafka
* Managing the interaction between machine learning and distributed systems (Spark cluster, running distributed jobs)
    * Example: You want to run batch inference; You have 1 petabyte of data in an S3 bucket.

In most situations, data engineers do many of those tasks themselves. 

Machine-learning operations concerns itself with the environment where machine learning will run, and managing that environment's deep complexity. 

In such environments, you will probably have multiple databases over multiple teams, maybe even multiple Hadoop clusters. You will need consistent dependencies across the cluster, matching your version of TensorFlow to CUDA, for example. 

While Anaconda manages Python dependencies, it does not handle ETL or observability (i.e. do you have a history of what you're doing?) or machine learning model performance (do you have a history of what the AI model has done?). 

## The Skymind Intelligence Layer (SKIL): AI Infrastructure

The [Skymind Intelligence Layer (SKIL)](https://skymind.ai/ai-infrastructure-mlops.html) is open-core AI infrastructure software intended to make AI model deployment and monitoring scalable, transparent to systems operators, flexible in the ML models it supports, and portable across various hardware and cloud platforms. 

SKIL has a couple important components, notably the SKIL process launcher daemon and the [machine learning model server](./machine-learning-server). 

The SKIL process launcher daemon is a [background process](https://en.wikipedia.org/wiki/Background_process), or a process that runs behind the UI without need of user intervention. The daemon enables SKIL to launch processes such as the machine-learning model server. A [process](https://en.wikipedia.org/wiki/Process_(computing)), of course, is just code that is executed on your hardware. 

The SKIL process launcher daemon (PLD) runs the process launcher. When you start SKIL, you start the daemon. An analogy would be when you open your laptop, the app to enable the desktop starts running. That desktop app is what allows you to initiate all the processes by clicking around, and those clicks become code. In a sense, the SKIL process launcher daemon is a desktop app for machine learning. It allows you to start ML processes, but its main interface is the CLI rather than a desktop/GUI. 

What are the most common machine-learning processes you'll use with SKIL?

- Machine-learning model server
- Load balancer for the model server
- Zeppelin processes
- Deployments manager - manages a set of model servers
- Spark jobs
- SKIL Spark main - connects the SKIL class path to a Spark cluster
- Running the UI

The daemon has a REST API, which you are hitting when you enter commands via the CLI or the GUI. It uses mySQL and Zookeeper to set up the cluster: you start a daemon on every node of your cluster, and each daemon connects to Zookeeper. 

SKIL is a process runner. There are others. For example, Kubernetes allows you to run processes with Docker. But SKIL is a process runner specializing in processes necessary for machine learning: GPU connectors, uploading large images, connecting to remote data sources, and running Spark batch jobs, among others. 

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
* [AI Winter](./ai-winter.html)
* [AI vs. Machine Learning vs. Deep Learning](./ai-machinelearning-deeplearning.html)
* [Machine Learning Model Server for Inference in Production](./machine-learning-server.html)
