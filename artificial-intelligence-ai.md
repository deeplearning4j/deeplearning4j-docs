---
title: What is Artificial Intelligence (AI)?
layout: default
---

# What is Artificial Intelligence (AI)?

AI is a bunch of algorithms that make decisions about data. Those algorithms are just math and code. The math usually includes linear algebra, calculus and probility -- stuff that a lot of people studied in college and then forgot. But the point is, it's undergraduate-level math for the most part, not rocket science. 

For a high-level understanding of AI and its function, we don't even have to know which algorithms are involved. They just  make predictions about something you care about. 

For example, you might want to know who is entering your house. That's the outcome you care about. Once we know that, we have strategic clarity about what you want to use AI for. That's the first step. 

The second step is to find out whether you have data that correlates with what you want to predict. In this case, you might want images of people entering your house. 

To gather that data, you install a camera at the door to take a picture of anyone on the stoop. 

You want to predict the identity of the person at the door. The data that correlates with those predictions are the images taken by the camera. But there's one more step. 

Algorithms, especially machine-learning algorithms, learn correlations. That is, if you give them the outputs (names) and the inputs (pixels in the image), they will find the rules that correlate the pixels representing a certain face with a certain name. That will be able to say: "Those pixels look like Bob."

But first, you need to teach the algorithm to make those predictions. You need to give the algorithm a labeled data set. The dataset are the images of all the people who come to your house. The labels are their names. So all the pictures would have a name attached to them -- Bob, Rachel, Alice, Alfred, you name it -- and the algorithm would look at the data and learn to predict the name that goes with each face. 

This is the training stage of a machine learning algorithm, and machine learning is a powerful sort of AI. When it starts training, the algorithm knows nothing. It starts out dumb. You feed it the data, it makes a random guess about the answer that's usually wrong, and then, because you know the real name that should be attached to every image, you measure how wrong the algorithm was. Then you use that measurement of error to adjust the algorithm, again and again over millions of attempts, until finally it starts guessing right.

So the key idea here is: You need the right data to train an algorithm. That is, if you want to identify people by their faces, you need to take photographs of peoples' faces. And then you need someone to label those photos. So there is a transfer of human knowledge to the dataset, and from the data set to the algorithm. If you don't gather the right data, and label it correctly, your algorithm won't learn how to make accurate predictions. 

AI starts with the data. People and companies that want to use AI and machine learning, because they know they can benefit from more accurate predictions, need to lay a solid foundation by gathering the right data and labeling it properly. Not doing that will limit the accuracy the algorithms can produce. 

## Artificial Intelligence Resources

* [The Coming Technological Singularity: How to Survive in the Post-Human Era](https://www-rohan.sdsu.edu/faculty/vinge/misc/singularity.html); [Vernor Vinge](https://en.wikipedia.org/wiki/Vernor_Vinge)
* [Kurzweil: Accelerating Intelligence](http://www.kurzweilai.net/); [Ray Kurzweil](https://en.wikipedia.org/wiki/Ray_Kurzweil)
* [On Intelligence](https://papers.harvie.cz/unsorted/Jeff%20Hawkins%20-%20On%20Intelligence.pdf); [Jeff Hawkins](https://en.wikipedia.org/wiki/Jeff_Hawkins)
* [An Introduction to AI's Near Future by Wait But Why](http://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html)
* [We Live in a Jungle of Artificial Intelligence that will Spawn Sentience](http://singularityhub.com/2010/08/10/we-live-in-a-jungle-of-artificial-intelligence-that-will-spawn-sentience/); Singularity Hub
