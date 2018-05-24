---
title: A Beginner's Guide to Deep Autoencoders
layout: default
---

# A Beginner's Guide to Deep Autoencoders

A deep autoencoder is composed of two, symmetrical [deep-belief networks](./deepbeliefnetwork.html) that typically have four or five shallow layers representing the encoding half of the net, and second set of four or five layers that make up the decoding half.

The layers are [restricted Boltzmann machines](./restrictedboltzmannmachine.html), the building blocks of deep-belief networks, with several peculiarities that we'll discuss below. Here's a simplified schema of a deep autoencoder's structure, which we'll explain below.

![Alt text](./../img/deep_autoencoder.png) 

Processing the benchmark dataset [MNIST](http://yann.lecun.com/exdb/mnist/), a deep autoencoder would use binary transformations after each RBM. Deep autoencoders can also be used for other types of datasets with real-valued data, on which you would use Gaussian rectified transformations for the RBMs instead. 

### Encoding Input Data

Let’s sketch out an example encoder:
    
     784 (input) ----> 1000 ----> 500 ----> 250 ----> 100 -----> 30

If, say, the input fed to the network is 784 pixels (the square of the 28x28 pixel images in the MNIST dataset), then the first layer of the deep autoencoder should have 1000 parameters; i.e. slightly larger. 

This may seem counterintuitive, because having more parameters than input is a good way to overfit a neural network. 

In this case, expanding the parameters, and in a sense expanding the features of the input itself, will make the eventual decoding of the autoencoded data possible. 

This is due to the representational capacity of sigmoid-belief units, a form of transformation used with each layer. Sigmoid belief units can’t represent as much as information and variance as real-valued data. The expanded first layer is a way of compensating for that. 

The layers will be 1000, 500, 250, 100 nodes wide, respectively, until the end, where the net produces a vector 30 numbers long. This 30-number vector is the last layer of the first half of the deep autoencoder, the pretraining half, and it is the product of a normal RBM, rather than an classification output layer such as Softmax or logistic regression, as you would normally see at the end of a deep-belief network. 

### Decoding Representations

Those 30 numbers are an encoded version of the 28x28 pixel image. The second half of a deep autoencoder actually learns how to decode the condensed vector, which becomes the input as it makes its way back.

The decoding half of a deep autoencoder is a feed-forward net with layers 100, 250, 500 and 1000 nodes wide, respectively. 
Layer weights are initialized randomly. 

		784 (output) <---- 1000 <---- 500 <---- 250 <---- 30

The decoding half of a deep autoencoder is the part that learns to reconstruct the image. It does so with a second feed-forward net which also conducts back propagation. The back propagation happens through reconstruction entropy.

### Training Nuances

At the stage of the decoder’s backpropagation, the learning rate should be lowered, or made slower: somewhere between 1e-3 and 1e-6, depending on whether you’re handling binary or continuous data, respectively.

## Use Cases

### Image Search

As we mentioned above, deep autoencoders are capable of compressing images into 30-number vectors. 

Image search, therefore, becomes a matter of uploading an image, which the search engine will then compress to 30 numbers, and compare that vector to all the others in its index. 

Vectors containing similar numbers will be returned for the search query, and translated into their matching image. 

### Data Compression

A more general case of image compression is data compression. Deep autoencoders are useful for [semantic hashing](https://www.cs.utoronto.ca/~rsalakhu/papers/semantic_final.pdf), as discussed in this paper by Geoff Hinton.

### Topic Modeling & Information Retrieval (IR)

Deep autoencoders are useful in topic modeling, or statistically modeling abstract topics that are distributed across a collection of documents. 

This, in turn, is an important step in question-answer systems like Watson.

In brief, each document in a collection is converted to a Bag-of-Words (i.e. a set of word counts) and those word counts are scaled to decimals between 0 and 1, which may be thought of as the probability of a word occurring in the doc. 

The scaled word counts are then fed into a deep-belief network, a stack of restricted Boltzmann machines, which themselves are just a subset of feedforward-backprop autoencoders. Those deep-belief networks, or DBNs, compress each document to a set of 10 numbers through a series of sigmoid transforms that map it onto the feature space. 

Each document’s number set, or vector, is then introduced to the same vector space, and its distance from every other document-vector measured. Roughly speaking, nearby document-vectors fall under the same topic. 

For example, one document could be the “question” and others could be the “answers,” a match the software would make using vector-space measurements. 

## Code Sample

A deep auto encoder can be built by extending Deeplearning4j's [MultiLayerNetwork class](https://github.com/deeplearning4j/deeplearning4j/blob/3e934e0128e443a0e187f5aea7a3b8677d9a6568/deeplearning4j-core/src/main/java/org/deeplearning4j/nn/multilayer/MultiLayerNetwork.java).

The code would look something like this:

```
package org.deeplearning4j.examples.unsupervised.deepbelief;

import org.deeplearning4j.datasets.fetchers.MnistDataFetcher;
import org.deeplearning4j.datasets.iterator.impl.MnistDataSetIterator;
import org.deeplearning4j.nn.api.OptimizationAlgorithm;
import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.OutputLayer;
import org.deeplearning4j.nn.conf.layers.RBM;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.optimize.api.IterationListener;
import org.deeplearning4j.optimize.listeners.ScoreIterationListener;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.dataset.DataSet;
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator;
import org.nd4j.linalg.lossfunctions.LossFunctions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;

/**
 * ***** NOTE: This example has not been tuned. It requires additional work to produce sensible results *****
 *
 * @author Adam Gibson
 */
public class DeepAutoEncoderExample {

    private static Logger log = LoggerFactory.getLogger(DeepAutoEncoderExample.class);

    public static void main(String[] args) throws Exception {
        final int numRows = 28;
        final int numColumns = 28;
        int seed = 123;
        int numSamples = MnistDataFetcher.NUM_EXAMPLES;
        int batchSize = 1000;
        int listenerFreq = 10;

        log.info("Load data....");
        DataSetIterator iter = new MnistDataSetIterator(batchSize,numSamples,true);

        log.info("Build model....");
        MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
                .seed(seed)
                .optimizationAlgo(OptimizationAlgorithm.LINE_GRADIENT_DESCENT)
                .list()
                .layer(0, new RBM.Builder().nIn(numRows * numColumns).nOut(1000).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(1, new RBM.Builder().nIn(1000).nOut(500).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(2, new RBM.Builder().nIn(500).nOut(250).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(3, new RBM.Builder().nIn(250).nOut(100).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(4, new RBM.Builder().nIn(100).nOut(30).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build()) //encoding stops
                .layer(5, new RBM.Builder().nIn(30).nOut(100).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build()) //decoding starts
                .layer(6, new RBM.Builder().nIn(100).nOut(250).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(7, new RBM.Builder().nIn(250).nOut(500).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(8, new RBM.Builder().nIn(500).nOut(1000).lossFunction(LossFunctions.LossFunction.KL_DIVERGENCE).build())
                .layer(9, new OutputLayer.Builder(LossFunctions.LossFunction.MSE).activation(Activation.SIGMOID).nIn(1000).nOut(numRows*numColumns).build())
                .pretrain(true).backprop(true)
                .build();

        MultiLayerNetwork model = new MultiLayerNetwork(conf);
        model.init();

        model.setListeners(new ScoreIterationListener(listenerFreq));

        log.info("Train model....");
        while(iter.hasNext()) {
            DataSet next = iter.next();
            model.fit(new DataSet(next.getFeatureMatrix(),next.getFeatureMatrix()));
        }
    }
}

```
       

To construct a deep autoencoder, please make sure you have the most recent version of [Deeplearning4j and its examples](https://github.com/deeplearning4j/dl4j-examples/tree/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/unsupervised/deepbelief)

For questions about Deep Autoencoders, contact us on [Gitter](https://gitter.im/deeplearning4j/deeplearning4j). 

## <a name="resources">Other Beginner's Guides for Machine Learning</a>

* [Introduction to Deep Neural Networks](./neuralnet-overview)
* [Regression & Neural Networks](./logistic-regression.html)
* [Word2vec: Neural Embeddings for Natural Language Processing](./word2vec.html)
* [Convolutional Networks](./convolutionalnets)
* [Restricted Boltzmann Machines: The Building Blocks of Deep-Belief Networks](./restrictedboltzmannmachine.html)
* [Recurrent Networks and Long Short-Term Memory Units (LSTMs)](./lstm.html)
* [Generative Adversarial Networks (GANs)](./generative-adversarial-network)
* [Inference: Machine Learning Model Server](./machine-learning-modelserver)
* [Beginner's Guide to Reinforcement Learning](./deepreinforcementlearning)
* [Eigenvectors, Eigenvalues, PCA & Entropy](./eigenvector)
* [Deep Reinforcement Learning](./deepreinforcementlearning)
* [Symbolic Reasoning & Deep Learning](./symbolicreasoning)
* [Graph Data & Deep Learning](./graphdata)
* [Open Data Sets for Machine Learning](./opendata)
* [ETL Data Pipelines for Machine Learning](./datavec)
* [A Glossary of Deep-Learning Terms](./glossary.html)
* [Inference: Machine Learning Model Server](./modelserver)
