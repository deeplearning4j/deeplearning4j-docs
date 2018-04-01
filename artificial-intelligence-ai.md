---
title: What is Artificial Intelligence (AI)?
layout: default
---

# What is Artificial Intelligence (AI)?

AI is a bunch of algorithms that make decisions about data. Those algorithms are just math and code. The math usually includes linear algebra, calculus and probility -- stuff that a lot of people studied in college and then forgot. But the point is, it's undergraduate-level math for the most part, not rocket science. 

For a high-level understanding of AI and its function, we don't even have to know which algorithms are involved. They just  make predictions about something you care about. Below, we're going to look at a machine learning example. (Go here for an understanding of the [differences between the terms AI, machine learning and deep learning](https://deeplearning4j.org/ai-machinelearning-deeplearning).)

## A Machine-Learning Example

For example, you might want to know who is entering your house. That's the outcome you care about. Once we know that, we have strategic clarity about what you want to use AI for. That's the first step. 

The second step is to find out whether you have data that correlates with what you want to predict. In this case, you might want images of people entering your house. 

To gather that data, you install a camera at the door to take a picture of anyone on the stoop. 

You want to predict the identity of the person at the door. The data that correlates with those predictions are the images taken by the camera. But there's one more step. 

Algorithms, especially machine-learning algorithms, learn correlations. That is, if you give them the outputs (names) and the inputs (pixels in the image), they will find the rules that correlate the pixels representing a certain face with a certain name. That will be able to say: "Those pixels look like Bob."

## Training an Algorithm

But first, you need to teach the algorithm to make those predictions. You need to give the algorithm a labeled data set. The dataset are the images of all the people who come to your house. The labels are their names. So all the pictures would have a name attached to them -- Bob, Rachel, Alice, Alfred, you name it -- and the algorithm would look at the data and learn to predict the name that goes with each face. 

This is the training stage of a machine learning algorithm, and machine learning is a powerful sort of AI. When it starts training, the algorithm knows nothing. It starts out dumb. You feed it the data, it makes a random guess about the answer that's usually wrong, and then, because you know the real name that should be attached to every image, you measure how wrong the algorithm was. Then you use that measurement of error to adjust the algorithm, again and again over millions of attempts, until finally it starts guessing right. 

We should distinguish between the algorithm and what we call the "model." Let's say we're working with linear regression, which is basically `y = a * x + b`. `y` is the output you're trying to predict, `x` is the input data you feed to the algorithm, while `a` and `b` are the parameters, set in an algorithm we call linear regression, the larger structure. The parameters `a` and `b` can be adjusted. They are what transform the input `x` into the output `y`. If `a` and `b` are off, you get incorrect predictions, and if `a` and `b` are right, you get accurate predictions. Together, `a` and `b` are the "model". A trained model is one where `a` and `b` have been adjusted to give accurate predictions. A model is a snapshot of those parameters, after they're done training. 

## Getting the Right Data

One of the key ideas here is: You need the right data to train an algorithm. That is, if you want to identify people by their faces, you need to take photographs of peoples' faces. And then you need someone to label those photos. So there is a transfer of human knowledge to the dataset, and from the data set to the algorithm. If you don't gather the right data, and label it correctly, your algorithm won't learn how to make accurate predictions. 

AI starts with the data. People and companies that want to use AI and machine learning, because they know they can benefit from more accurate predictions, need to lay a solid foundation by gathering the right data and labeling it properly. Not doing that will limit the accuracy the algorithms can produce. The quality of the data -- whether your camera got a good shot of each person, whether you labeled those images properly -- is one of the fundamental limits on making AI work. If you get the data right, you're half way there. 

## The Importance of Data Scientists

The next step involves choosing and tuning the algorithms. There are a lot of algorithms to choose from, many of them described elsewhere on this website. And those algorithms can be tuned, just like a car or a piece of machinery. That is, there are knobs to turn. You can determine how much they train, and how quickly they adjust themselves during training. And just like turning the knobs on a machine, there are many ways to screw this up. 

The people who know how to tune algorithms are typically called data scientists. Sometimes they might be called machine-learning or deep-learning specialists. Sometimes they might even hold a graduate degree, like a PhD in a machine learning as it applies to a certain use case. These are the people who know how to explore data to see if it's good, and how to experiment with different algorithms until they find one that learns well from a dataset. 

There are not enough people who have these skills in the world. Data scientists are all too rare, and that goes double for machine-learning PhDs. In addition to good data, the scarcity of skilled data scientists is another constraint on the adoption and implementation of AI. 

## Integrations and Infrastructure

Software is only as good as its integrations. No software is an island. It always has to plug into something, because data has to be drawn from a source, and predictions have to be acted on or displayed. Machine-learning software has to integrate with data sources upstream, and with business logic and data visualization GUIs downstream. Without those integrations, it will not be useful. 

Many machine-learning tools, the platforms that allow data scientists to choose, tune and train AI algorithms, were created to support research. That is, they are adapted for the science side of data science: how do I run an experiment quickly and arrive at the model that can produce accurate predictions. But there are other necessary steps before AI can be useful. Once a machine-learning model has been trained, it must be deployed in such a way that the company that paid for its development can consume the model's predictions. In other words, you need to be able to plug it in. Otherwise it won't be able to do its work. 

There are many efforts underway to make machine-learning tools that make it easier to deploy trained models, track their performance, and update them as needed. These include paid machine-learning services offered by public cloud vendors, as well as open-source projects. Some of these tools are simply shipping blobs of Python and C code in a Docker container, while others are more full-fledged attempts to solve the infrastructure problems inherent in productionizing AI. 

### Machine-Learning Tools and Platforms

* [SKIL: The Skymind Intelligence Layer](https://docs.skymind.ai/docs)
* [Google Cloud AI](https://cloud.google.com/products/machine-learning/)
* [Amazon Sagemaker](https://aws.amazon.com/sagemaker/)
* [Microsoft Azure Machine Learning Studio](https://studio.azureml.net/)
* [IBM's Data Science Experience (DSX)](https://datascience.ibm.com/)
* [Cloudera's Data Science Workbench](https://www.cloudera.com/products/data-science-and-engineering/data-science-workbench.html)
* [Databricks' MLlib](https://docs.databricks.com/spark/latest/mllib/index.html)
* [Domino Datalab](https://www.dominodatalab.com/)
* [Dataiku: Collaborative Data Science Platform](https://www.dataiku.com/)
* [Kubeflow: Machine-Learning Toolkit for Kubernetes](https://github.com/kubeflow/kubeflow)

## Public Clouds, IT Departments and Procurement

The dysfunctional relationship between data scientists and their in-house IT departments, which are in charge of hardware and software procurement and approvals, is pushing those data scientists to the cloud in order to do their jobs. 

That's bad for the hardware and software vendors attempting to sell on-premise for companies' proprietary data ceneters (long term, it is also bad for those IT departments, which generally fail to understand this new kind of workload). That movement concentrates more and more power in the major public cloud vendors. 

The technical term is oligopsony, or a market of few buyers (otherwise known as a "bad market"), the sister term to oligopoly. 

The "total cost of ownership" (TCO) comparing cloud to on-prem shows that cloud services get very expensive very quickly when you depend on them at a high and constant rate, as teams do they they consume 100,000s of GPUs hours to train machine-learning models. 

As data scientists shift their workloads to the cloud in response to IT department intransigence, the data follows, new stacks are built, data gravity accumulates and the company's work is soon so path dependent that "declouding" becomes very expensive. One thing that makes it expensive are the data pulls. Cold data on AWS is cheap, pulling it is expensive. 

Companies pursuing digital transformation by adding machine learning to their stack should be aware of these dynamics, since the decisions made by data science teams now will affect business expenses and outcomes for years to come.

### More Artificial Intelligence Resources

* [The Coming Technological Singularity: How to Survive in the Post-Human Era](https://www-rohan.sdsu.edu/faculty/vinge/misc/singularity.html); [Vernor Vinge](https://en.wikipedia.org/wiki/Vernor_Vinge)
* [Kurzweil: Accelerating Intelligence](http://www.kurzweilai.net/); [Ray Kurzweil](https://en.wikipedia.org/wiki/Ray_Kurzweil)
* [On Intelligence](https://papers.harvie.cz/unsorted/Jeff%20Hawkins%20-%20On%20Intelligence.pdf); [Jeff Hawkins](https://en.wikipedia.org/wiki/Jeff_Hawkins)
* [An Introduction to AI's Near Future by Wait But Why](http://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html)
* [We Live in a Jungle of Artificial Intelligence that will Spawn Sentience](http://singularityhub.com/2010/08/10/we-live-in-a-jungle-of-artificial-intelligence-that-will-spawn-sentience/); Singularity Hub
