---
title: Deploying Deeplearning4j to Android
layout: default
---
<title>How to Use Deeplearning4J in Android Apps</title>
<meta property="og:title" content="How to Use Deeplearning4J in Android Apps" />
<meta name="description" content="DeepLearning4J (DL4J) is a popular machine learning library that runs on the JVM. In this tutorial, I’ll show you how to use it to create and train neural networks in an Android app." />
<meta property="og:description" content="DeepLearning4J (DL4J) is a popular machine learning library that runs on the JVM. In this tutorial, I’ll show you how to use it to create and train neural networks in an Android app." />
<link rel="canonical" href="http://progur.com/2017/01/how-to-use-deeplearning4j-on-android.html" />
<meta property="og:url" content="http://progur.com/2017/01/how-to-use-deeplearning4j-on-android.html" />
<meta property="og:site_name" content="Progur!" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2017-01-14T00:00:00+05:30" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@hathibel" />
<meta name="twitter:creator" content="@hathibel" />
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "headline": "How to Use Deeplearning4J in Android Apps",
    "datePublished": "2017-01-14T00:00:00+05:30",
    "description": "DeepLearning4J (DL4J) is a popular machine learning library that runs on the JVM. In this tutorial, I’ll show you how to use it to create and train neural networks in an Android app.",
    "url": "http://progur.com/2017/01/how-to-use-deeplearning4j-on-android.html"
  }
</script>
<!-- End Jekyll SEO tag -->
  <body>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div>
                <div>
                    <h1 class="post-title">How to Use Deeplearning4J in Android Apps</h1>
                    <div class="post-meta">Written by Ashraff Hathibelagal &bull; 14 January 2017</div><br>
                    <div class="post-actual-content">
                        <p>Generally speaking, training a neural network is a task best suited for powerful computers with multiple GPUs. But what if you want to do it on your humble Android phone or tablet? Well, it’s definitely possible. Considering an average Android device’s specifications, however, it will most likely be quite slow. If that’s not a problem for you, keep reading.</p>

<p>In this tutorial, I’ll show you how to use <a href="https://github.com/deeplearning4j/deeplearning4j" target="_blank" rel="nofollow">Deeplearning4J</a>, a popular Java-based deep learning library, to create and train a neural network on an Android device.</p>

<h3 id="prerequisites">Prerequisites</h3>

<p>For best results, you’ll need the following:</p>

<ul>
  <li>An Android device or emulator that runs API level 21 or higher, and has about 200 MB of internal storage space free. I strongly suggest you use an emulator first because you can quickly tweak it in case you run out of memory or storage space.</li>
  <li>Android Studio 2.2 or newer</li>
  <li>A more in-depth look at using DL4J in Android Applications can be found <a href="https://deeplearning4j.org/android-prerequisites-configuration" target="_blank" rel="nofollow">here.</a> This guide covers dependencies, memory management, saving device-trained models, and loading pre-trained models in the application.</li>
</ul>

<h3 id="configuring-your-android-studio-project">Configuring Your Android Studio Project</h3>

<p>To be able to use Deeplearning4J in your project, add the following <code class="highlighter-rouge">compile</code> dependencies to your app module’s <strong>build.gradle</strong> file:</p>

``` groovy

compile (group: 'org.deeplearning4j', name: 'deeplearning4j-nn', version: '1.0.0-SNAPSHOT') {
    exclude group: 'org.bytedeco.javacpp-presets', module: 'opencv-platform'
    exclude group: 'org.bytedeco.javacpp-presets', module: 'leptonica-platform'
    exclude group: 'org.bytedeco.javacpp-presets', module: 'hdf5-platform'
}
compile group: 'org.nd4j', name: 'nd4j-native', version: '1.0.0-SNAPSHOT'
compile group: 'org.nd4j', name: 'nd4j-native', version: '1.0.0-SNAPSHOT', classifier: "android-arm"
compile group: 'org.nd4j', name: 'nd4j-native', version: '1.0.0-SNAPSHOT', classifier: "android-arm64"
compile group: 'org.nd4j', name: 'nd4j-native', version: '1.0.0-SNAPSHOT', classifier: "android-x86"
compile group: 'org.nd4j', name: 'nd4j-native', version: '1.0.0-SNAPSHOT', classifier: "android-x86_64"
compile group: 'org.bytedeco.javacpp-presets', name: 'openblas', version: '0.2.20-1.4.1', classifier: "android-arm"
compile group: 'org.bytedeco.javacpp-presets', name: 'openblas', version: '0.2.20-1.4.1', classifier: "android-arm64"
compile group: 'org.bytedeco.javacpp-presets', name: 'openblas', version: '0.2.20-1.4.1', classifier: "android-x86"
compile group: 'org.bytedeco.javacpp-presets', name: 'openblas', version: '0.2.20-1.4.1', classifier: "android-x86_64"
compile group: 'org.bytedeco.javacpp-presets', name: 'opencv', version: '3.4.1-1.4.1', classifier: "android-arm"
compile group: 'org.bytedeco.javacpp-presets', name: 'opencv', version: '3.4.1-1.4.1', classifier: "android-arm64"
compile group: 'org.bytedeco.javacpp-presets', name: 'opencv', version: '3.4.1-1.4.1', classifier: "android-x86"
compile group: 'org.bytedeco.javacpp-presets', name: 'opencv', version: '3.4.1-1.4.1', classifier: "android-x86_64"

```
In order to use version 1.0.0-SNAPSHOT with gradle, you will need to create the following pom.xml file in the root directory and run mvn compile on it from the terminal. You will also need to include ``` mavenLocal() ``` in the ```  repository {} ``` block of the build.gradle file.

``` xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.deeplearning4j</groupId>
    <artifactId>snapshots</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <dependencies>
       <dependency>
            <groupId>org.nd4j</groupId>
            <artifactId>nd4j-native-platform</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>org.deeplearning4j</groupId>
            <artifactId>deeplearning4j-core</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
    <repositories>
        <repository>
            <id>sonatype-nexus-snapshots</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
            <releases>
                <enabled>false</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
                <updatePolicy>always</updatePolicy>
            </snapshots>
        </repository>
    </repositories>
</project>

```

</code></pre></figure>

<p>Android Studio 3.0 introduced new Gradle, now annotationProcessors should be defined too
If you are using it, add following code to gradle dependencies:

<figure class="highlight"><pre><code class="language-groovy" data-lang="groovy"<span class="n">annotationProcessor</span> <span class="s1">'org.projectlombok:lombok:1.16.16'</span></code></pre></figure>
  
<p>As you can see, DL4J depends on ND4J, short for N-Dimensions for Java, which is a library that offers fast n-dimensional arrays. ND4J internally depends on a library called OpenBLAS, which contains platform-specific native code. Therefore, you must load a version of OpenBLAS and ND4J that matches the architecture of your Android device. Because I own an x86 device, I’m using <code class="highlighter-rouge">android-x86</code> as the platform.</p>

<p>Dependencies of DL4J and ND4J have several files with identical names. In order to avoid build errors, add the following <code class="highlighter-rouge">exclude</code> parameters to your <code class="highlighter-rouge">packagingOptions</code>.</p>

<figure class="highlight"><pre><code class="language-groovy" data-lang="groovy"><span class="n">packagingOptions</span> <span class="o">{</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/DEPENDENCIES'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/DEPENDENCIES.txt'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/LICENSE'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/LICENSE.txt'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/license.txt'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/NOTICE'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/NOTICE.txt'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/notice.txt'</span>
    <span class="n">exclude</span> <span class="s1">'META-INF/INDEX.LIST'</span>
<span class="o">}</span></code></pre></figure>

<p>Your compiled code will have well over 65,536 methods. To be able to handle this condition, add the following option in the <code class="highlighter-rouge">defaultConfig</code>:</p>

<figure class="highlight"><pre><code class="language-groovy" data-lang="groovy"><span class="n">multiDexEnabled</span> <span class="kc">true</span></code></pre></figure>

<p>And now, press <strong>Sync Now</strong> to update the project. Finally, make sure that your APK doesn't contain both <code class="highlighter-rouge">lib/armeabi</code> and <code class="highlighter-rouge">lib/armeabi-v7a</code> subdirectories. If it does, move all files to one or the other as some Android devices will have problems with both present.</p>

<h3 id="starting-an-asynchronous-task">Starting an Asynchronous Task</h3>

<p>Training a neural network is CPU-intensive, which is why you wouldn’t want to do it in your application’s UI thread. I’m not too sure if DL4J trains its networks asynchronously by default. Just to be safe, I’ll spawn a separate thread now using the <code class="highlighter-rouge">AsyncTask</code> class.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="n">AsyncTask</span><span class="o">.</span><span class="na">execute</span><span class="o">(</span><span class="k">new</span> <span class="n">Runnable</span><span class="o">()</span> <span class="o">{</span>
    <span class="nd">@Override</span>
    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">run</span><span class="o">()</span> <span class="o">{</span>
        <span class="n">createAndUseNetwork</span><span class="o">();</span>
    <span class="o">}</span>
<span class="o">});</span></code></pre></figure>

<p>Because the method <code class="highlighter-rouge">createAndUseNetwork()</code> doesn’t exist yet, create it.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="kd">private</span> <span class="kt">void</span> <span class="nf">createAndUseNetwork</span><span class="o">()</span> <span class="o">{</span>

<span class="o">}</span></code></pre></figure>

<h3 id="creating-a-neural-network">Creating a Neural Network</h3>

<p>DL4J has a very intuitive API. Let us now use it to create a simple multi-layer perceptron with hidden layers. It will take two input values, and spit out one output value. To create the layers, we’ll use the <code class="highlighter-rouge">DenseLayer</code> and <code class="highlighter-rouge">OutputLayer</code> classes. Accordingly, add the following code to the <code class="highlighter-rouge">createAndUseNetwork()</code> method you created in the previous step:</p>

``` java
DenseLayer inputLayer = new DenseLayer.Builder()
        .nIn(2)
        .nOut(3)
        .name("Input")
        .build();
DenseLayer hiddenLayer = new DenseLayer.Builder()
        .nIn(3)
        .nOut(2)
        .name("Hidden")
        .build();
OutputLayer outputLayer = new OutputLayer.Builder()
        .nIn(2)
        .nOut(1)
        .name("Output")
        .build();
```

<p>Now that our layers are ready, let’s create a <code class="highlighter-rouge">NeuralNetConfiguration.Builder</code> object to configure our neural network.</p>

``` java
NeuralNetConfiguration.Builder nncBuilder = new NeuralNetConfiguration.Builder();
nncBuilder.updater(Updater.ADAM);
```

<p>We must now create a <code class="highlighter-rouge">NeuralNetConfiguration.ListBuilder</code> object to actually connect our layers and specify their order.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="n">NeuralNetConfiguration</span><span class="o">.</span><span class="na">ListBuilder</span> <span class="n">listBuilder</span> <span class="o">=</span> <span class="n">nncBuilder</span><span class="o">.</span><span class="na">list</span><span class="o">();</span>
<span class="n">listBuilder</span><span class="o">.</span><span class="na">layer</span><span class="o">(</span><span class="mi">0</span><span class="o">,</span> <span class="n">inputLayer</span><span class="o">);</span>
<span class="n">listBuilder</span><span class="o">.</span><span class="na">layer</span><span class="o">(</span><span class="mi">1</span><span class="o">,</span> <span class="n">hiddenLayer</span><span class="o">);</span>
<span class="n">listBuilder</span><span class="o">.</span><span class="na">layer</span><span class="o">(</span><span class="mi">2</span><span class="o">,</span> <span class="n">outputLayer</span><span class="o">);</span></code></pre></figure>

<p>Additionally, enable backpropagation by adding the following code:</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="n">listBuilder</span><span class="o">.</span><span class="na">backprop</span><span class="o">(</span><span class="kc">true</span><span class="o">);</span></code></pre></figure>

<p>At this point, we can generate and initialize our neural network as an instance of the <code class="highlighter-rouge">MultiLayerNetwork</code> class.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="n">MultiLayerNetwork</span> <span class="n">myNetwork</span> <span class="o">=</span> <span class="k">new</span> <span class="n">MultiLayerNetwork</span><span class="o">(</span><span class="n">listBuilder</span><span class="o">.</span><span class="na">build</span><span class="o">());</span>
<span class="n">myNetwork</span><span class="o">.</span><span class="na">init</span><span class="o">();</span></code></pre></figure>

<h3 id="creating-training-data">Creating Training Data</h3>

<p>To create our training data, we’ll be using the <code class="highlighter-rouge">INDArray</code> class, which is provided by ND4J. Here’s what our training data will look like:</p>

<div class="highlighter-rouge"><pre class="highlight"><code>INPUTS      EXPECTED OUTPUTS
------      ----------------
0,0         0
0,1         1
1,0         1
1,1         0
</code></pre>
</div>

<p>As you might have guessed, our neural network will behave like an XOR gate. The training data has four samples, and you must mention it in your code.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="kd">final</span> <span class="kt">int</span> <span class="n">NUM_SAMPLES</span> <span class="o">=</span> <span class="mi">4</span><span class="o">;</span></code></pre></figure>

<p>And now, create two <code class="highlighter-rouge">INDArray</code> objects for the inputs and expected outputs, and initialize them with zeroes.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="n">INDArray</span> <span class="n">trainingInputs</span> <span class="o">=</span> <span class="n">Nd4j</span><span class="o">.</span><span class="na">zeros</span><span class="o">(</span><span class="n">NUM_SAMPLES</span><span class="o">,</span> <span class="n">inputLayer</span><span class="o">.</span><span class="na">getNIn</span><span class="o">());</span>
<span class="n">INDArray</span> <span class="n">trainingOutputs</span> <span class="o">=</span> <span class="n">Nd4j</span><span class="o">.</span><span class="na">zeros</span><span class="o">(</span><span class="n">NUM_SAMPLES</span><span class="o">,</span> <span class="n">outputLayer</span><span class="o">.</span><span class="na">getNOut</span><span class="o">());</span></code></pre></figure>

<p>Note that the number of columns in the inputs array is equal to the number of neurons in the input layer. Similarly, the number of columns in the outputs array is equal to the number of neurons in the output layer.</p>

<p>Filling those arrays with the training data is easy. Just use the <code class="highlighter-rouge">putScalar()</code> method:</p>

``` java
// If 0,0 show 0
trainingInputs.putScalar(new int[]{0, 0}, 0);
trainingInputs.putScalar(new int[]{0, 1}, 0);
trainingOutputs.putScalar(new int[]{0, 0}, 0);
// If 0,1 show 1
trainingInputs.putScalar(new int[]{1, 0}, 0);
trainingInputs.putScalar(new int[]{1, 1}, 1);
trainingOutputs.putScalar(new int[]{1, 0}, 1);
// If 1,0 show 1
trainingInputs.putScalar(new int[]{2, 0}, 1);
trainingInputs.putScalar(new int[]{2, 1}, 0);
trainingOutputs.putScalar(new int[]{2, 0}, 1);
// If 1,1 show 0
trainingInputs.putScalar(new int[]{3, 0}, 1);
trainingInputs.putScalar(new int[]{3, 1}, 1);
trainingOutputs.putScalar(new int[]{3, 0}, 0);
```

<p>We won’t be using the <code class="highlighter-rouge">INDArray</code> objects directly. Instead, we’ll convert them into a <code class="highlighter-rouge">DataSet</code>.</p>

<figure class="highlight"><pre><code class="language-java" data-lang="java"><span class="n">DataSet</span> <span class="n">myData</span> <span class="o">=</span> <span class="k">new</span> <span class="n">DataSet</span><span class="o">(</span><span class="n">trainingInputs</span><span class="o">,</span> <span class="n">trainingOutputs</span><span class="o">);</span></code></pre></figure>

At this point, we can start the training by calling the fit() method of the neural network and passing the data set to it. The for loop controls the iterations of the data set through the network. It is set to 1000 iterations in this example.

``` java
for(int l=0; l<=1000; l++) {
    myNetwork.fit(myData);
}
```

<p>And that’s all there is to it. Your neural network is ready to be used.</p>

<h3 id="conclusion">Conclusion</h3>

<p>In this tutorial, you saw how easy it is to create and train a neural network using the Deeplearning4J library in an Android Studio project. I’d like to warn you, however, that training a neural network on a low-powered, battery operated device might not always be a good idea.</p>

<p>A second example DL4J Android Application which includes a user interface can be found <a href="https://deeplearning4j.org/android-DL4JIrisClassifierDemo" target="_blank" rel="nofollow">here.</a> This example trains a neural network on the device using Anderson’s iris data set for iris flower type classification. The application includes user input for the measurements and returns the probability that these measurements belong to one of three iris types (Iris serosa, Iris versicolor, and Iris virginica).</p>

<p>The limitations of processing power and battery life on mobile devices make training robust, multi-layer networks unfeasible. As an alternative to training a network on the device, the neural network being used by your application can be trained on the desktop, saved via ModelSerializer, and then loaded as a pre-trained model in the application. A third example DL4J Android Application can be found <a href="https://deeplearning4j.org/android-DL4JImageRecognitionDemo" target="_blank" rel="nofollow">here</a> which loads a pre-trained Mnist network and uses it to classify user drawn numbers. </p>

<p>This was originally posted at <a href="http://progur.com/2017/01/how-to-use-deeplearning4j-on-android.html" target="_blank" rel="nofollow">Progur</a> by Ashraff Hathibelagal.

                

<footer class="footer">
  <div class="container">
  </div>
</footer>
  
