---
title: DevOps for Machine Learning
layout: default
redirect_to:
  - https://skymind.ai/wiki/devops-machine-learning
---

# DevOps for Machine Learning

* What are best practices for delivering AI solutions in continuous delivery pipelines? 

If enterprise organizations hook CI/CD into their app deployment, then they should know which machine learning models are plugged into which applications. If you have a recommender system and you're hitting a model with data, you have to know how accurate the model is, how old the model is, etc. 

If you update every 24 hours and use load-balancing, then you'll be hitting different end points that should represent the same model, replicated across instances, and you want to ensure that your results are consistent. 

If you're doing A/B testing or gradual rollouts of models, then DevOp teams need to know which models were rolled out to compare them against the others. If models are producing errors (making bad reccomendations or showing a low conversion rate in the case of recco systems), DevOps should be aware of that feedback to monitor model quality. 

* How big is the memory footprint of a trained neural net model in production? Is it a binary image? Can it be versioned?

A neural net model can be anywhere from 10MBs to 2GBs. It could sit, say, in an artifact repository. That depends on whether it's delivered as a separate process or not. Some people do deliver embedded models. 

We recommend deploying machine learning models as a micro-service. TensorFlow delivers a proto-file. We don't recommend delivering model binaries as part of a larger software process like a JAR file. Model deployments should be a separate versioned process.

* How do machine learning models get released ?

Model updates should be independent of the application process and scaled independently, so that they are loosely coupled. You have an application, which is usually tiny, that hits the model, which is usually bigger and has different requirements. 

If you find out that your machine-learning model is wrong while it's in production, you want to roll the update out separately. That's the separation of concerns and it should apply to model deployment. 
