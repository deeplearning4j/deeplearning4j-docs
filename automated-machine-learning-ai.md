---
title: Automated Machine Learning & AI
layout: default
redirect_to:
  - https://skymind.ai/wiki/automl-automated-machine-learning-ai
---

# Automated Machine Learning and AI

One way that AI vendors persuade customers to buy their machine learning platforms and tools is by claiming that it's automated. That's key, because most companies know they haven't hired the data scientists they need to build machine learning solutions (if they have managed to hire any data scientists at all...). 

Data scientists are people who explore data, clean it, test algorithms that they think might make accurate predictions about that data, and then tune those algorithms until they work well, like an auto mechanic might tune a car. Here's a more complete list of [tasks in the machine learning workflow](./machine-learning-workflow.html).

If the data scientists are lucky, they are given tools to work efficiently, and they may even be enabled to deploy those trained machine-learning models to a production environment in order to make predictions about data outside the lab, in the real world.

<p align="center">
<a href="https://docs.skymind.ai/docs/welcome" type="button" class="btn btn-lg btn-success" onClick="ga('send', 'event', ‘quickstart', 'click');">GET STARTED WITH MACHINE LEARNING</a>
</p>

Many machine learning vendors, ranging from Google to startups such as Datarobot and H2O, claim that they can automate machine learning. That sounds great! Then you, the hiring manager, won't need to go chasing after data science talent whose skills you can't judge in a bidding war you can't win. You'll just automate all those skills away... 

The only problem is, the skills that data scientists possess are hard to automate fully, and people who seek to buy automated AI usually don't know what exactly can be automated, and what can't, with present technology. Data scientists perform many tasks. While automating some of those tasks may lighten their workload, unless you can automate all of their tasks, those data scientists are still necessary, and that scarce talent will remain a chokepoint that blocks the implementation of machine learning in many organizations. 

## What Can We Automate in Machine Learning?

So data scientists *tune* algorithms, but what does that mean? When you tune a complex machine (and these algorithms are just mathematical and symbolic machines), you usually have several knobs to turn. It's kind of like cooking something with several ingredients. To produce the right taste, to tune your dish, as it were, those ingredients should be added in proper proportion to one another, just like you might add twice as much [buttermilk as you do butter to a biscuit recipe](https://www.marthastewart.com/349650/biscuits). The idea is, the right proportions matter, and getting them wrong means you can't consume the results.  

A data scientist testing algorithms on data is often operating without a "recipe", and must tune knobs in combination with each other other to explore which combination works. In this case, "working" means tuning an algorithm until it is able to learn efficiently from the data it is given to train upon, so that accurate predictions about the data come out. 

### Hyperparameter Optimization

In data science, the knobs on an algorithm are called *hyperparameters*, and so the data scientists are performing a kind of  "hyperparameter search" as they test different combinations of those hyperparameters, different ratios between their ingredients. 

Hyperparameter search can be automated. [Eclipse Arbiter](https://github.com/deeplearning4j/deeplearning4j/tree/master/arbiter) is a hyperparameter optimization library designed to automate hyperparameter tuning for deep neural net training. It is the equivalent of Google Tensorflow's Vizier, or the open-source Python library Spearmint. Arbiter is part of the Deeplearning4j framework. Some startups, like [SigOpt](https://sigopt.com/), are focused solely on hyperparameter optimization.

You can search for the best combination of hyperparameters with different kinds of search algorithm, like grid search, random search and Bayesian methods.

### Algorithm Selection

One thing that AI vendors will do is run the same data through several algorithms whose hyperparameters are set by default, to determine which algorithm can learn best on your data. At the end of the contest, they select the winner. Visualizing these algorithmic beauty contests is a dramatic way to show the work being done. However, it has its limits, notably in the range of algorithms that are chosen to run in any given race, and how well they are tuned. Datarobot automates machine learning in this way. 

### Limited Use Cases on the Happy Path

AI vendors can be smart about the algorithms they select only if they have some knowledge of the problem that is being solved, and the data that is being used to train the algorithm. In many real-world situations, lengthy data exploration and some domain-specific knowledge are necessary to select the right algorithms. 

In the world of automated machine learning, we pretend that data exploration and domain knowledge don't matter. We can only do that for a few limited use cases. In software, this is called the [happy path](https://en.wikipedia.org/wiki/Happy_path), or the use case where everything goes as we expect it to. Automated machine learning has a narrow happy path; that is, it's easy to step off the path and get into trouble. 

For example, it's easy to automate machine learning for a simple use case like scoring your leads to Salesforce to predict the likelihood that you will close a sale. That's because the schema of the data -- the things you know about your customers -- is constrained by Salesforce software and fairly standardized across sales teams. An automated machine learning solution focused on lead scoring can make strong assumptions about the type of data you will feed it. 

But companies need machine learning for more than lead scoring. Their use cases differ, and so does their data. In those cases, it can be hard to offer a pre-baked solution. Data pipelines, also known as ETL, are often the stage of the AI workflow that require the most human attention. The real world is messy and data, which represents that world, is usually messy, too. Most datasets need to be explored, cleaned and otherwise pre-processed before that data can be fruitfully used to train a machine-learning algorithm. That cleaning and exploration often requires expert humans. 

So you can automate machine learning as long as the customer supplies the clean and properly formatted data is like saying you can have your car in any color, as long as it is black. It begs the question. 

### Professional Services

Companies that step off the happy path have two choices: they can hire their own data scientists or rely on processional services from consulting firms. Every major public cloud vendor has introduced machine-learning solutions teams in an attempt to close the talent gap and make machine learning more available to potential users of their clouds. The major consultancies, from Accenture to Bain, have hired teams of data scientists to build solutions for their clients. Even automated machine-learning startups like DataRobot offer "Customer-facing Data Scientists". 

So a lot of time, AI vendors that sell automated machine learning are really "automating" those tasks with humans; i.e. that is, they're helping their clients outsource the talent that those clients can't otherwise get access to. This is because the tasks and decisions involved in building AI solutions are many, varied and complex, and the technology does not yet exist to automate all of them. Come for the GUI, stay for the professional services. That's not automation. Wisdom begins with calling things by their true names. We should call automated machine learning what it is, and recognize that buiding machine-learing often requires the refined judgment of experts, combined with automation for a few narrow tasks in a much larger AI workflow. Who knew that automation was so much work? ;)

### Transfer Learning and Pre-Trained Models

Machine learning models start out dumb and get smart by being exposed to data that they "train" on. Training involves the algorithms making guesses about the data, measuring the error in their guesses, and correcting themselves until they make more accurate guesses. Machine learning algorithms train on data to produce an accurate "model" of the data. A trained, accurate model of the data is one that is capable of producing good predictions when it is fed new data that resembles what it trained on. For the purposes of this discussion, imagine a model as a black box that performs a mathematical operation on data to make a prediction about it. The data goes into the model, the prediction comes out; e.g. feed an image of one of your friends into a facial identification model, and it will predict the name of your friend in the image. 

Sometimes, you can train a machine-learning model on one set of data, and then use it for another, slightly different set of data later. This only works when the two datasets resemble each other. For example, most photographs have certain characteristics in common, because in fact most objects in the world tend to have edges and curves. If you train a machine-learning model on, say, celebrity faces, it will learn what humans look like, and with just a little extra learning, you could teach it to transfer what it knows to photographs of your family and friends, whom it has never seen before. Using a pre-trained model could save you the cost of training your own over thousands of hours on distributed GPUs, an expensive proposition. 

Pre-trained machine-learning models that gain some knowledge of the world are useful in computer vision, and widely available. Some well-known pre-trained computer vision models include AlexNet, LeNet, VGG16, YOLO and Inception. [Those pre-trained computer vision models are available here](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model). Google's [Cloud AutoML](https://cloud.google.com/automl/) relies on transfer learning, among other methods, to support its claim that it has "automated machine learning." 

## <a name="resources">More Machine Learning Tutorials</a>

* [Recurrent Networks and Long Short-Term Memory Units (LSTMs)](./lstm)
* [Introduction to Neural Networks](./neuralnet-overview.html)
* [Beginner's Guide to Reinforcement Learning](./deepreinforcementlearning.html)
* [Convolutional Networks (CNNs)](./convolutionalnetwork.html)
* [Multilayer Perceptron (MLPs) for Classification](./multilayerperceptron)
* [Generative Adversarial Networks (GANs)](./generative-adversarial-network)
* [Graph Data and Deep Learning](./graphanalytics.html)
* [Word2Vec: Neural Embeddings for NLP](./word2vec.html)
* [Symbolic Reasoning (Symbolic AI) & Deep Learning](./symbolicreasoning.html)
* [Markov Chain Monte Carlo & Machine Learning](/markovchainmontecarlo.html)
* [Restricted Boltzmann Machines](./restrictedboltzmannmachine.html)
* [Neural Networks & Regression](./logistic-regression.html)
* [Introduction to Decision Trees](./decision-tree.html)
* [Introduction to Random Forests](./random-forest.html)
* [Open Datasets for Machine Learning](./opendata.html)
* [AI vs. Machine Learning vs. Deep Learning](./ai-machinelearning-deeplearning.html)
* [Inference in Production: Machine Learning Model Server](./machine-learning-server.html)
* [Distributed Deep Learning on Apache Spark](./spark.html)
