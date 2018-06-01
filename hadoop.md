---
title: Deep Learning on Hadoop
layout: default
---

# Deep Learning on Hadoop

Eclipse Deeplearning4j is the deep-learning framework with the tightest and most reliable Hadoop integration. Deeplearning4j has been certified on CDH and HDP. It runs as a Hadoop job. You can add deep learning to your Hadoop cluster for free, because Deeplearning4j can be downloaded and run on your Hadoop cluster without needing the approval of a central IT department. 

Scooping data out of HDFS, Deeplearning4j can use [Apache Spark](./spark) for fast ETL, loading batches of data onto GPU RAM, even as the GPU processes the previous data batch. 

Deeplearning4j is packaged in an enterprise distribution called the [Skymind Intelligence Layer (SKIL)](https://docs.skymind.ai/docs). Think CDH but for machine learning. SKIL is an embeddable [machine-learning server](./machine-learning-server) and process launcher for machine-learning tasks, like model training. SKIL allows for a flexible topology; developers can congifure the cluster they need. With regard to Hadoop, SKIL can be installed on a gateway node in order to coordinate machine learning jobs on other Hadoop nodes. 

## Further Reading

* [Deep learning on Apache Spark and Apache Hadoop with Deeplearning4j](https://blog.cloudera.com/blog/2017/06/deep-learning-on-apache-spark-and-hadoop-with-deeplearning4j/)
* [Deep Learning With Hadoop Using Deeplearning4j](https://www.amazon.com/Deep-Learning-Hadoop-Dipayan-Dev/dp/1787124762)
