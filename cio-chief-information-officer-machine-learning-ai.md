---
title: How CIOs Should Think about Machine Learning and AI
layout: default
---

# How CIOs Should Think about Machine Learning and AI

For purposes of this post, we're going to treat AI, machine learning and deep learning as interchangeable terms, and we'll just refer to them as "AI" for the sake of brevity. (If you're interested in the differences between them, we compare the [definitions of AI and machine learning here](./ai-machinelearning-deeplearning).)

It's important for companies and leaders who are trying to adopt AI to share a common language with their teams of software engineers and data scientists. Too often, advanced technology is shrouded in jargon and obfuscations that are obstacles to understanding and fast implementation. The goal of this post is to introduce a set of terms and ways of thinking that can serve as a common language for teams that are starting to build AI solutions.

## What Does AI Do?

The most important thing to know about AI is what it can do for you. **AI makes decisions about data.** Just imagine the AI as a box: you send data into the box, and decisions about the data come out. 

What kinds of decisions can you make? There are four types of decisions that people rely on AI for:

* Classification
* Clustering
* Regression
* Goal-oriented moves

Let's look at a couple examples of each:

* Classification: Classification is identifying something: categorizing or tagging or sorting it. Putting a name to a face is a classification problem. Filtering emails into a spam folder uses an algorithmic filter to classify them as spam or not. Detecting objects in images can be a classification problem. So can recognizing voices. More broadly, this is an example of machine perception, of an algorithm that maps raw sensory data to symbols that have meaning for humans. In this way, AI can interpret or give meaning to data, much as the human brain does in a flash of cognition. To train a classifier, you need a labeled dataset; i.e. you need to tag data with the names that apply to it, like pairing a JPEG with the name of the person in the photo. The way people tend to do this is by sorting data into folders with the label that applies. The algorithm then learns the correlations between the data (e.g. pixels in the shape of my face) and the label (e.g. my name). So the first question to ask, after you have decided on the outcomes or labels you want to predict, is "Do we have data labeled with those outcomes? And if not, how do we get it?" (At that point, you start looking at data strategies: how to gather and process the data to train your algorithms on.)

* 
