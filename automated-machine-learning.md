---
title: Automated Machine Learning & AI
layout: default
---

# Automated Machine Learning and AI

One of the way AI vendors try to convince companies to buy their machine learning platforms and tools is by claiming that it's automated. That's a key selling point, because most companies are acutely aware that they haven't hired enough data scientists (even they have managed to hire any data scientists at all). 

Data scientists are people who explore data, clean it, test algorithms that they think might make accurate predictions about that data, and then tune those algorithms until they work well, like an auto mechanic might tune a car. Here's a more complete list of [tasks in the machine learning workflow](./machine-learning-workflow.html).

If the data scientists are lucky, they are given tools to perform those tasks efficiently, and they may even be enabled to deploy those trained machine-learning models to a production environment, to make predictions about data outside the lab.

<p align="center">
<a href="https://docs.skymind.ai/docs/welcome" type="button" class="btn btn-lg btn-success" onClick="ga('send', 'event', ‘quickstart', 'click');">GET STARTED WITH MACHINE LEARNING</a>
</p>

Many machine learning vendors, ranging from Google to startups such as Datarobot and H2O.ai, claim that they can automate machine learning. That sounds great! Then you, the hiring manager, won't need to go chasing after data science talent whose skills you can't judge in a bidding war you can't win. You'll just automate all those skills away. 

The problem is, the skills that data scientists possess are hard to automate, and people who seek to buy automated AI should be aware of what exactly can be automated, and what can't, with present technology. Data scientists perform many tasks. While automating some of those tasks may lighten their workload, unless you can automate all of their tasks, they are still necessary, and that scarce talent will remain a chokepoint that hinders the implementation of machine learning in many organizations. 

## What Can We Automate in Machine Learning?

I mentioned that data scientists *tune* algorithms. When you tune a complex machine (and these algorithms are just mathematical and symbolic machines), you usually have several knobs to turn. It's kind of like cooking something with several ingredients. To produce the right taste, to tune your dish as it were, those ingredients should be added in proper proportion to one another, just like you might add twice as much [buttermilk as you do butter to a biscuit recipe](https://www.marthastewart.com/349650/biscuits). The idea is, the right proportions matter.  

A data scientist is frequently operating without a "recipe", and must tune knobs in combination with each other other to explore which combination works. In this case, "working" means tuning an algorithm until it is able to learn efficiently from the data it is given to train upon. 

### Hyperparameter Optimization

In data science, the knobs on an algorithm are called hyperparameters, and so the data scientists are performing "hyperparameter search" as they test different combinations of those hyperparameters, different ratios between their ingredients. 

Hyperparameter search can be automated. [Eclipse Arbiter](https://github.com/deeplearning4j/arbiter) is a hyperparameter optimization library designed to automate hyperparameter tuning for deep neural net training. It is the equivalent of Google Tensorflow's Vizier, or the open-source Python library Spearmint. Arbiter is part of the Deeplearning4j framework. Some startups, like [SigOpt](https://sigopt.com/), are focused solely on hyperparameter optimization.

You can search for the best combination of hyperparameters with different kinds of search algorithm, like grid search, random search and Bayesian methods.

### Algorithm Selection



### Transfer Learning and Pre-Trained Models

### Limited Use Cases

### Professional Services
