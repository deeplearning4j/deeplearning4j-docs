---
title: Deep Learning Tutorial: MNIST for Beginners
layout: default
---

<header>
  <h1>Deep Learning Tutorial: MNIST for Beginners</h1>
  <p>In this tutorial, we’ll classify the MNIST dataset, the “Hello World” of machine learning.</p>
  <ol class="toc">
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#mnist-dataset">The MNIST Dataset</a></li>
    <li><a href="#configuring">Configuring the MNIST Example</a></li>
    <li><a href="#building">Building Our Neural Network</a></li>
    <li><a href="#training">Training Your Model</a></li>
    <li><a href="#evaluating">Evaluating The Results</a></li>
    <li><a href="#conclusion">Conclusion</a></li>
  </ol>
</header>
  <p>Estimated time to completion is 30 minutes.</p>
<section>
  <h2 id="introduction">Introduction</h2>
  <img src="/img/mnist_render.png"><br><br>
  <p>MNIST is a database containing images of handwritten digits, with each image labeled by integer. It is used to benchmark the performance of machine learning algorithms. Deep learning performs quite well on MNIST, achieving more than 99.7% accuracy.</p>
  <p>We will use MNIST to train a neural network to look at each image and predict the digit. The first step is to install Deeplearning4j.</p>
  <a href="https://skymind.ai/quickstart" type="button" class="btn btn-lg btn-success" onClick="ga('send', 'event', ‘quickstart', 'click');">GET STARTED WITH DEEP LEARNING</a>
</section>

<section>
  <h2 id="mnist-dataset">The MNIST Dataset</h2>
  <p>The MNIST dataset contains a <b>training set</b> of 60,000 examples, and a <b>test set</b> of 10,000 examples. The training set is used to teach the algorithm to predict the correct label, the integer, while the test set is used to check how accurately the trained network can make guesses.</p>
  <p>In the machine learning world, this is called <a href="https://en.wikipedia.org/wiki/Supervised_learning" target="_blank">supervised learning</a>, because we have the correct answers for the images we’re making guesses about. The training set can therefore act as a supervisor, or teacher, correcting the neural network when it guesses wrong.</p>
</section>

<section>
  <h2 id="configuring">Configuring the MNIST Example</h2>
  <p>We’ve packaged the MNIST tutorial into Maven, so there’s no need to write code. Please open IntelliJ to get started. (To download IntelliJ, see our <a href="quickstart">Quickstart…</a>)</p>
  <p>Open the folder labeled <code>dl4j-examples</code>. Go to the directories <kbd>src</kbd> → <kbd>main</kbd> → <kbd>java</kbd> → <kbd>feedforward</kbd> → <kbd>mnist</kbd>, and open the file <code>MLPMnistSingleLayerExample.java</code>.</p>
  <p><img src="/img/mlp_mnist_single_layer_example_setup.png"></p>
  <p>In this file, we will configure the neural network, train a model and evaluate the results. It will be helpful to view this code alongside the tutorial.</p>
  <h3>Setting Variables</h3>
  <pre><code class="language-java">
    final int numRows = 28; // The number of rows of a matrix.
    final int numColumns = 28; // The number of columns of a matrix.
    int outputNum = 10; // Number of possible outcomes (e.g. labels 0 through 9).
    int batchSize = 128; // How many examples to fetch with each step.
    int rngSeed = 123; // This random-number generator applies a seed to ensure that the same initial weights are used when training. We’ll explain why this matters later.
    int numEpochs = 15; // An epoch is a complete pass through a given dataset.
  </code></pre>
  <p>In our example, each MNIST image is 28x28 pixels, which means our input data is a 28 <b>numRows</b> x 28 <b>numColumns</b> matrix (matrices are the fundamental data structures of deep learning). Furthermore, MNIST contains 10 possible outcomes (the labels numbered 0 - 9) which is our <b>outputNum</b>.</p>
  <p>The <b>batchSize</b> and <b>numEpochs</b> have to be chosen based on experience; you learn what works through experimentation. A larger batch size results in faster training, while more epochs, or passes through the dataset, result in better accuracy.</p>
  <p>However, there are diminishing returns beyond a certain number of epochs, so there is a trade off between accuracy and training speed. In general, you’ll need to experiment to discover the optimal values. We’ve set reasonable defaults in this example.</p>
  <h3>Fetching the MNIST Data</h3>
  <pre><code class="language-java">
    DataSetIterator mnistTrain = new MnistDataSetIterator(batchSize, true, rngSeed);
    DataSetIterator mnistTest = new MnistDataSetIterator(batchSize, false, rngSeed);
  </code></pre>
  <p>The class called <code>DataSetIterator</code> is used to fetch the MNIST dataset. We create one dataset <code>mnistTrain</code> for <b>training the model</b> and another dataset <code>mnistTest</code> for <b>evaluating the accuracy</b> of our model after training. The model, by the way, refers to the parameters of the neural network. Those parameters are coefficients that process signal from the input, and they are adjusted as the network learns until they can finally guess the correct label for each image; at that point, you have an accurate model.</p>
</section>

<section>
  <h2 id="building">Building Our Neural Network</h2>
  <p>We’ll build a feedforward neural network based off a <a href="http://jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf" target="_blank">paper by Xavier Glorot and Yoshua Bengio</a>. For our purposes, we’ll start with a basic example with only one hidden layer. However, as a rule of thumb, the deeper your network (i.e. the more layers), the more complexity and nuance it can capture to produce accurate results.</p>
  <img src="/img/onelayer.png"><br><br>
  <p>Keep this image in mind, because this is what we’re constructing, a single layer neural network.</p>
  <h3>Setting Hyperparameters</h3>
  <p>For any neural network you build in Deeplearning4j, the foundation is the <a href="http://deeplearning4j.org/neuralnet-configuration.html" target="_blank">NeuralNetConfiguration class</a>. This is where you configure hyperparameters, the quantities that define the architecture and how the algorithm learns. Intuitively, each hyperparameter is like one ingredient in a meal, a meal that can go very right, or very wrong… Luckily, you can adjust hyperparameters if they don’t produce the right results.</p>
  <pre><code class="language-java">
    MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
            .seed(rngSeed)
            .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
            .updater(new Nesterovs(0.006,0.9))
            .regularization(true).l2(1e-4)
            .list()
  </code></pre>
  <h5>.seed(rngSeed)</h5>
  <p>This parameter uses a specific, randomly generated weight initialization. If you run an example many times, and generate new, random weights each time you begin, then your net’s results -- accuracy and F1 score -- may vary a great deal, because different initial weights can lead algorithms to different local minima in the errorscape. Keeping the same random weights allows you isolate the effect of adjusting other hyperparameters more clearly, while other conditions remain equal.</p>
  <h5>.optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)</h5>
  <p>Stochastic gradient descent (SGD) is a common method to optimize the cost function. To learn more about SGD and other optimization algorithms that help minimize error, we recommend <a href="https://www.coursera.org/learn/machine-learning" target="_blank">Andrew Ng’s Machine Learning course</a> and the SGD definition in our <a href="http://deeplearning4j.org/glossary#stochasticgradientdescent" target="_blank">glossary</a>.</p>
  <h5>.updater(new Nesterovs(0.006,0.9))</h5>
  <p>This line sets the updater as nesterovs and the learning rate and the momentun. The learning rate, which is the size of the adjustments made to the weights with each iteration, the step size. A high learning rate makes a net traverse the errorscape quickly, but also makes it prone to overshoot the point of minimum error. A low learning rate is more likely to find the minimum, but it will do so very slowly, because it is taking small steps in adjusting the weights. Momentum is an additional factor in determining how fast an optimization algorithm converges on the optimum point. Momentum affects the direction that weights are adjusted in, so in the code we consider it a weight <code>updater</code>.</p>
  <h5>.regularization(true).l2(1e-4)</h5>
  <p>Regularization is a technique to prevent what’s called <b>overfitting</b>. Overfitting is when the model fits the training data really well, but performs poorly in real life as soon as it's exposed to data it hasn’t seen before.</p>
  <p>We use L2 regularization, which prevents individual weights from having too much influence on the overall results.</p>
  <h5>.list()</h5>
  <p>The list specifies the number of layers in the net; this function replicates your configuration n times and builds a layerwise configuration.</p>
  <p>Again, if any of the above was confusing, we recommend <a href="https://www.coursera.org/learn/machine-learning" target="_blank">Andrew Ng’s Machine Learning course</a>.</p>
  <h3>Building Layers</h3>
  <p>We won’t go into the research behind each hyperparameter (i.e. activation, weightInit); we'll just attempt to give brief definitions of what they do. However, feel free to read the <a href="http://jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf" target="_blank">paper by Xavier Glorot and Yoshua Bengio</a> to learn why these matter.</p>
  <img src="/img/onelayer_labeled.png"><br>
  <pre><code class="language-java">
    .layer(0, new DenseLayer.Builder()
            .nIn(numRows * numColumns) // Number of input datapoints.
            .nOut(1000) // Number of output datapoints.
            .activation("relu") // Activation function.
            .weightInit(WeightInit.XAVIER) // Weight initialization.
            .build())
    .layer(1, new OutputLayer.Builder(LossFunction.NEGATIVELOGLIKELIHOOD)
            .nIn(1000)
            .nOut(outputNum)
            .activation("softmax")
            .weightInit(WeightInit.XAVIER)
            .build())
    .pretrain(false).backprop(true)
    .build();
  </code></pre>
  <p>So what exactly is the hidden layer?</p>
  <p>Each node (the circles) in the hidden layer represents a feature of a handwritten digit in the MNIST dataset. For example, imagine you are looking at the number 6. One node may represent rounded edges, another node may represent the intersection of curly lines, and so on and so forth. Such features are weighted by importance by the model's coefficients, and recombined in each hidden layer to help predict whether the handwritten number is indeed 6. The more layers of nodes you have, the more complexity and nuance they can capture to make better predictions.</p>
  <p>You could think of a layer as "hidden" because, while you can see the input entering a net, and the decisions coming out, it’s difficult for humans to decipher how and why a neural net processes data on the inside. The parameters of a neural net model are simply long vectors of numbers, readable by machines.</p>
</section>

<section>
  <h2 id="training">Training Your Model</h2>
  <p>Now that our model is built, let’s begin training. On the top right in IntelliJ, click the green arrow. This will run the code explained above.</p>
  <img src="/img/mlp_mnist_single_layer_example_training.png"><br><br>
  <p>This may take several minutes to complete, depending on your hardware.</p>
</section>

<section>
  <h2 id="evaluating">Evaluating The Results</h2>
  <img src="/img/mlp_mnist_single_layer_example_results.png"><br><br>
  <p>
  <b>Accuracy</b> - The percentage of MNIST images that were correctly identified by our model.<br>
  <b>Precision</b> - The number of true positives divided by the number of true positives and false positives. <br>
  <b>Recall</b> - The number of true positives divided by the number of true positives and the number of false negatives. <br>
  <b>F1 Score</b> - Weighted average of <b>precision</b> and <b>recall</b>. <br>
  </p>
  <p><b>Accuracy</b> measures the model over all.</p>
  <p><b>Precision, recall and F1</b> measure a model’s <b>relevance</b>. For example, it would be dangerous to predict that cancer will not reoccur (i.e. a false negative) as the person would not seek further treatment. Because of this, it would be wise to choose a model that avoids false negatives (i.e. a higher precision, recall and F1) even if the overall <b>accuracy</b> lower.</p>
</section>

<section>
  <h2 id="conclusion">Conclusion</h2>
  <p>And there you have it! At this point, you've successfully trained a neural network with zero domain knowledge of computer vision to achieve 97.1% accuracy. State-of-the-art performance is even better than that, and you can improve the model by adjusting the hyperparameters further.</p>
  <p>Compared to other frameworks, Deeplearning4j excels at the following.</p>
  <ul>
    <li>Integration with major JVM frameworks like Spark, Hadoop and Kafka at scale</li>
    <li>Optimized to run on distributed CPUs and/or GPUs</li>
    <li>Serving the Java and Scala communities</li>
    <li>Commercial support for enterprise deployments</li>
  </ul>
  <p>If you have any questions, please join us online in our <a href="https://gitter.im/deeplearning4j/deeplearning4j" target="_blank">Gitter support chat room</a>.</p>
  <ul class="categorized-view view-col-3">
    <li>
      <h5>Other Machine Learning Tutorials</h5>
      <a href="http://deeplearning4j.org/neuralnet-overview">Introduction to Neural Networks (Deep Learning)</a>
      <a href="http://deeplearning4j.org/restrictedboltzmannmachine">Restricted Boltzmann Machines (RBM)</a>
      <a href="http://deeplearning4j.org/eigenvector">Eigenvectors, Covariance, PCA and Entropy</a>
      <a href="http://deeplearning4j.org/lstm">LSTMs and Recurrent Networks</a>
      <a href="http://deeplearning4j.org/logistic-regression">Neural Networks and Regressions</a>
      <a href="http://deeplearning4j.org/convolutionalnets">Deep Convolutional Networks</a>
      <a href="http://deeplearning4j.org/deepreinforcementlearning.html">Deep Reinforcement Learning</a>
      <a href="http://deeplearning4j.org/multilayerperceptron.html">Multilayer Perceptron (MLPs) for Classification</a>
      <a href="http://deeplearning4j.org/generative-adversarial-network.html">Generative Adversarial Networks (GANs)</a>
      <a href="http://deeplearning4j.org/markovchainmontecarlo.html">Markov Chain Monte Carlo & Machine Learning</a>
      <a href="http://deeplearning4j.org/word2vec.html">Word2vec, Doc2vec & GloVe: Neural Embeddings for NLP</a>
      <a href="http://deeplearning4j.org/modelserver.html">Inference: Machine Learning Model Server</a>
    </li>

    <li>
      <h5>Recommended Resources</h5>
      <a href="https://www.coursera.org/learn/machine-learning/home/week/1">Andrew Ng's Online Machine Learning Course</a>
      <a href="https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/convolution/LenetMnistExample.java">LeNet Example: MNIST With Convolutional Nets</a>
    </li>

  </ul>
</section>
