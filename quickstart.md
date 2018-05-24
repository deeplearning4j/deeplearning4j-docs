---
title: Quick Start Guide for Deeplearning4j
layout: default
---
<!-- Begin Inspectlet Embed Code -->
<script type="text/javascript" id="inspectletjs">
window.__insp = window.__insp || [];
__insp.push(['wid', 1755897264]);
(function() {
function ldinsp(){if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
setTimeout(ldinsp, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
})();
</script>
<!-- End Inspectlet Embed Code -->

# Quickstart Guide

This is everything you need to run DL4J examples and begin your own projects.

We recommend that you join our [Gitter Live Chat](https://gitter.im/deeplearning4j/deeplearning4j). Gitter is where you can request help and give feedback, but please do use this guide before asking questions we've answered below. If you are new to deep learning, we've included [a road map for beginners](./deeplearningforbeginners.html) with links to courses, readings and other resources. If you need an end to end tutorial to get started (including setup), then please go to our [getting started](http://deeplearning4j.org/gettingstarted).

### A Taste of Code

Deeplearning4j is a domain-specific language to configure deep neural networks, which are made of multiple layers. Everything starts with a `MultiLayerConfiguration`, which organizes those layers and their hyperparameters.

Hyperparameters are variables that determine how a neural network learns. They include how many times to update the weights of the model, how to initialize those weights, which activation function to attach to the nodes, which optimization algorithm to use, and how fast the model should learn. This is what one configuration would look like: 

``` java
    MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
        .weightInit(WeightInit.XAVIER)
        .activation("relu")
        .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
        .updater(new Sgd(0.05))
        // ... other hyperparameters
        .list()
        .backprop(true)
        .build();
```

With Deeplearning4j, you add a layer by calling `layer` on the `NeuralNetConfiguration.Builder()`, specifying its place in the order of layers (the zero-indexed layer below is the input layer), the number of input and output nodes, `nIn` and `nOut`, as well as the type: `DenseLayer`.

``` java
        .layer(0, new DenseLayer.Builder().nIn(784).nOut(250)
                .build())
```

Once you've configured your net, you train the model with `model.fit`.

## Prerequisites

* [Java (developer version)](#Java) 1.7 or later (**Only 64-Bit versions supported**)
* [Apache Maven](#Maven) (automated build and dependency manager)
* [IntelliJ IDEA](#IntelliJ) or Eclipse
* [Git](#Git)

You should have these installed to use this QuickStart guide. DL4J targets professional Java developers who are familiar with production deployments, IDEs and automated build tools. Working with DL4J will be easiest if you already have experience with these.

If you are new to Java or unfamiliar with these tools, read the details below for help with installation and setup. Otherwise, **skip to <a href="#examples">DL4J Examples</a>**.

#### <a name="Java">Java</a>

If you don't have Java 1.7 or later, download the current [Java Development Kit (JDK) here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). To check if you have a compatible version of Java installed, use the following command:

``` shell
java -version
```

Please make sure you have a 64-Bit version of java installed, as you will see an error telling you `no jnind4j in java.library.path` if you decide to try to use a 32-Bit version instead. Make sure the JAVA_HOME environment variable is set.

#### <a name="Maven">Apache Maven</a>

Maven is a dependency management and automated build tool for Java projects. It works well with IDEs such as IntelliJ and lets you install DL4J project libraries easily. [Install or update Maven](https://maven.apache.org/download.cgi) to the latest release following [their instructions](https://maven.apache.org/install.html) for your system. To check if you have the most recent version of Maven installed, enter the following:

``` shell
mvn --version
```

If you are working on a Mac, you can simply enter the following into the command line:

``` shell
brew install maven
```

Maven is widely used among Java developers and it's pretty much mandatory for working with DL4J. If you come from a different background, and Maven is new to you, check out [Apache's Maven overview](http://maven.apache.org/what-is-maven.html) and our [introduction to Maven for non-Java programmers](http://deeplearning4j.org/maven.html), which includes some additional troubleshooting tips. [Other build tools](../buildtools) such as Ivy and Gradle can also work, but we support Maven best.

* [Paul Dubs' guide to maven](http://www.dubs.tech/guides/maven-essentials/)

* [Maven In Five Minutes](http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)

#### <a name="IntelliJ">IntelliJ IDEA</a>

An Integrated Development Environment ([IDE](http://encyclopedia.thefreedictionary.com/integrated+development+environment)) allows you to work with our API and configure neural networks in a few steps. We strongly recommend using [IntelliJ](https://www.jetbrains.com/idea/download/), which communicates with Maven to handle dependencies. The [community edition of IntelliJ](https://www.jetbrains.com/idea/download/) is free. 

There are other popular IDEs such as [Eclipse](http://books.sonatype.com/m2eclipse-book/reference/creating-sect-importing-projects.html) and [Netbeans](http://wiki.netbeans.org/MavenBestPractices). However, IntelliJ is preferred, and using it will make finding help on [Gitter Live Chat](https://gitter.im/deeplearning4j/deeplearning4j) easier if you need it.

#### <a name="Git">Git</a>

Install the [latest version of Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). If you already have Git, you can update to the latest version using Git itself:

``` shell
$ git clone git://git.kernel.org/pub/scm/git/git.git
```

## <a name="examples">DL4J Examples in a Few Easy Steps</a>

1. Use the command line to enter the following:

        $ git clone https://github.com/deeplearning4j/dl4j-examples.git
        $ cd dl4j-examples/
        $ mvn clean install

2. Open IntelliJ and choose Import Project. Then select the main 'dl4j-examples' directory. (Note: the example in the illustration below refers to an outdated repository named dl4j-0.4-examples. However, the repository that you will download and install will be called dl4j-examples).

![select directory](./img/Install_IntJ_1.png)

3. Choose 'Import project from external model' and ensure that Maven is selected. 
![import project](./img/Install_IntJ_2.png)

4. Continue through the wizard's options. Select the SDK that begins with `jdk`. (You may need to click on a plus sign to see your options...) Then click Finish. Wait a moment for IntelliJ to download all the dependencies. You'll see the horizontal bar working on the lower right.

5. Pick an example from the file tree on the left.
![run IntelliJ example](./img/Install_IntJ_3.png)
Right-click the file to run. 

## Using DL4J In Your Own Projects: Configuring the POM.xml File

To run DL4J in your own projects, we highly recommend using Maven for Java users, or a tool such as SBT for [Scala](https://github.com/SkymindIO/SKIL_Examples/blob/master/skil_example_notebooks/scala/uci_quickstart_notebook.scala). The basic set of dependencies and their versions are shown below. This includes:

- `deeplearning4j-core`, which contains the neural network implementations
- `nd4j-native-platform`, the CPU version of the ND4J library that powers DL4J
- `datavec-api` - Datavec is our library vectorizing and loading data

Every Maven project has a POM file. Here is [how the POM file should appear](https://github.com/deeplearning4j/dl4j-examples/blob/master/pom.xml) when you run your examples.

Within IntelliJ, you will need to choose the first Deeplearning4j example you're going to run. We suggest `MLPClassifierLinear`, as you will almost immediately see the network classify two groups of data in our UI. The file on [Github can be found here](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/feedforward/classification/MLPClassifierLinear.java). 

To run the example, right click on it and select the green button in the drop-down menu. You will see, in IntelliJ's bottom window, a series of scores. The rightmost number is the error score for the network's classifications. If your network is learning, then that number will decrease over time with each batch it processes. At the end, this window will tell you how accurate your neural-network model has become:

![mlp classifier results](./img/mlp_classifier_results.png)

In another window, a graph will appear, showing you how the multilayer perceptron (MLP) has classified the data in the example. It will look like this:

![mlp classifier viz](./img/mlp_classifier_viz.png)

Congratulations! You just trained your first neural network with Deeplearning4j. Now, why don't you try our next tutorial: [**MNIST for Beginners**](./mnist-for-beginners), where you'll learn how to classify images.

## Next Steps

1. Join us on Gitter. We have three big community channels.
  * [DL4J Live Chat](https://gitter.im/deeplearning4j/deeplearning4j) is the main channel for all things DL4J. Most people hang out here.
  * [Tuning Help](https://gitter.im/deeplearning4j/deeplearning4j/tuninghelp) is for people just getting started with neural networks. Beginners please visit us here!
  * [Early Adopters](https://gitter.im/deeplearning4j/deeplearning4j/earlyadopters) is for those who are helping us vet and improve the next release. WARNING: This is for more experienced folks. 
2. Read the [introduction to deep neural networks](./neuralnet-overview) or [one of our detailed tutorials](./tutorials). 
3. Check out the more detailed [Comprehensive Setup Guide](./gettingstarted).
4. Browse the [DL4J documentation](./documentation).
5. **Python folks**: If you plan to run benchmarks on Deeplearning4j comparing it to well-known Python framework [x], please read [these instructions](https://deeplearning4j.org/benchmark) on how to optimize heap space, garbage collection and ETL on the JVM. By following them, you will see at least a *10x speedup in training time*. 

### Additional links

- [Deeplearning4j artifacts on Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cdeeplearning4j)
- [ND4J artifacts on Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cnd4j)
- [Datavec artifacts on Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cdatavec)
- [Scala code for UCI notebook](https://github.com/SkymindIO/SKIL_Examples/blob/master/skil_example_notebooks/scala/uci_quickstart_notebook.scala)

### Troubleshooting

**Q:** I'm using a 64-Bit Java on Windows and still get the `no jnind4j in java.library.path` error

**A:** You may have incompatible DLLs on your PATH. To tell DL4J to ignore those, you have to add the following as a VM parameter (Run -> Edit Configurations -> VM Options in IntelliJ):

```
-Djava.library.path=""
```
**Q:** **SPARK ISSUES** I am running the examples and having issues with the Spark based examples such as distributed training or datavec transform options. 


**A:** You may be missing some dependencies that Spark requires. See this [Stack Overflow discussion](http://stackoverflow.com/a/38735202/3892515) for a discussion of potential dependency issues. Windows users may need the winutils.exe from Hadoop.

Download winutils.exe from https://github.com/steveloughran/winutils and put it into the null/bin/winutils.exe (or create a hadoop folder and add that to HADOOP_HOME)

### Troubleshooting: Debugging UnsatisfiedLinkError on Windows

Windows users might be seeing something like:

```
Exception in thread "main" java.lang.ExceptionInInitializerError
at org.deeplearning4j.nn.conf.NeuralNetConfiguration$Builder.seed(NeuralNetConfiguration.java:624)
at org.deeplearning4j.examples.feedforward.anomalydetection.MNISTAnomalyExample.main(MNISTAnomalyExample.java:46)
Caused by: java.lang.RuntimeException: org.nd4j.linalg.factory.Nd4jBackend$NoAvailableBackendException: Please ensure that you have an nd4j backend on your classpath. Please see: http://nd4j.org/getstarted.html
at org.nd4j.linalg.factory.Nd4j.initContext(Nd4j.java:5556)
at org.nd4j.linalg.factory.Nd4j.(Nd4j.java:189)
... 2 more
Caused by: org.nd4j.linalg.factory.Nd4jBackend$NoAvailableBackendException: Please ensure that you have an nd4j backend on your classpath. Please see: http://nd4j.org/getstarted.html
at org.nd4j.linalg.factory.Nd4jBackend.load(Nd4jBackend.java:259)
at org.nd4j.linalg.factory.Nd4j.initContext(Nd4j.java:5553)
... 3 more
```

If that is the issue, see [this page](https://github.com/bytedeco/javacpp-presets/wiki/Debugging-UnsatisfiedLinkError-on-Windows#using-dependency-walker). In this case replace with "Nd4jCpu".

### Eclipse setup without Maven

We recommend and use Maven and Intellij. If you prefer Eclipse and dislike Maven here is a nice [blog post](http://electronsfree.blogspot.com/2016/10/how-to-setup-dl4j-project-with-eclipse.html) to walk you through an Eclipse configuration.

## DL4J Overview

Deeplearning4j is a framework that lets you pick and choose with everything available from the beginning. We're not Tensorflow (a low-level numerical computing library with automatic differentiation) or Pytorch. For more details, please see [our deep learning library compsheet](https://deeplearning4j.org/compare-dl4j-torch7-pylearn). Deeplearning4j has several subprojects that make it easy-ish to build end-to-end applications. 

If you'd like to deploy models to production, you might like our [model import from Keras](https://deeplearning4j.org/model-import-keras).

Deeplearning4j has several submodules. These range from a visualization UI to distributed training on Spark. For an overview of these modules, please look at the [**Deeplearning4j examples on Github**](https://github.com/deeplearning4j/dl4j-examples).

To get started with a simple desktop app, you need two things: An [nd4j backend](http://nd4j.org/backend.html) and `deeplearning4j-core`. For more code, see the [simpler examples submodule](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/pom.xml#L64).

If you want a flexible deep-learning API, there are two ways to go.  You can use nd4j standalone See our [nd4j examples](https://github.com/deeplearning4j/dl4j-examples/tree/master/nd4j-examples) or the [computation graph API](http://deeplearning4j.org/compgraph).

If you want distributed training on Spark, you can see our [Spark page](http://deeplearning4j.org/spark)
Keep in mind that we cannot setup Spark for you. If you want to set up distributed Spark and GPUs, that is largely up to you. Deeplearning4j simply deploys as a JAR file on an existing Spark cluster.

If you want Spark with GPUs, we recommend [Spark with Mesos](https://spark.apache.org/docs/latest/running-on-mesos.html).

If you want to deploy on mobile, you can see our [Android page](http://deeplearning4j.org/android).

We deploy optimized code for various hardware architectures natively. We use C++ based for loops just like everybody else.
For that, please see our [C++ framework libnd4j](https://github.com/deeplearning4j/libnd4j).

Deeplearning4j has two other notable components: 

* [Arbiter: hyperparameter optimization and model evaluation](https://github.com/deeplearning4j/Arbiter)
* [DataVec: built-in ETL for machine-learning data pipelines](https://github.com/deeplearning4j/DataVec)

Overall, Deeplearning4j is meant to be an end-to-end platform for building real applications. Not just a tensor library with automatic differentiation. If you want that, that's in ND4J and it's called [samediff](https://github.com/deeplearning4j/nd4j/tree/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff). Samediff is still in alpha, but if you want to take a crack at contributing, please come in to our [live chat on Gitter](https://gitter.im/deeplearning4j/deeplearning4j).

Lastly, if you are benchmarking Deeplearnin4j, please consider coming in to our live chat and asking for tips. Deeplearning4j has [all the knobs](http://deeplearning4j.org/native) but some may not work as the Python frameworks to do. You have to build Deeplearning4j from source for some applications.

### <a name="beginner">Other Deep Learning Tutorials</a>
* [Restricted Boltzmann Machines](./restrictedboltzmannmachine)
* [Eigenvectors, Covariance, PCA and Entropy](./eigenvector)
* [LSTMs and Recurrent Networks](./lstm)
* [Introduction to Deep Neural Networks](./neuralnet-overview)
* [Convolutional Networks](./convolutionalnets)
* [Deep Learning Notebook-Based Tutorials](https://github.com/deeplearning4j/deeplearning4j/tree/master/dl4j-examples/tutorials)
* [ND4J: A Tensor Library for the JVM](http://nd4j.org)
* [MNIST for Beginners](./mnist-for-beginners.html)
* [Glossary of Deep-Learning and Neural-Net Terms](./glossary.html)
* [Generative Adversarial Networks (GANs)](./generative-adversarial-network)
* [Reinforcement Learning for Java and Scala](./reinforcementlearning)
* [Word2vec, Neural Word Embeddings and Node2vec for Java](./word2vec)
