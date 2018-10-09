---
title: Deeplearning4j on Spark: How To Guides
short_title: Spark How To
description: Deeplearning4j on Spark: How To Guides
category: Tuning & Training
weight: 10
---

# Deeplearning4j on Spark: How To Guides

This page contains a number of small how-to guides for common distributed training tasks.
Note that for guides on building data pipelines, see <page link here>.

Before going through these guides, make sure you have read the introduction guide [here](link).

Before Training Guides
* [How to build an uber-JAR for training via Spark submit using Maven](#uberjar)
* [How to use GPUs for training on Spark](#gpus)
* [How to use CPUs on master, GPUs on the workers](#cpusgpus)
* [How to configure memory settings for Spark](#memory)
* [Kryo Serialization](#todo)

During and After Training Guides
* [How to perform distributed test set evaluation](#evaluation)
* [How to save (and load) neural networks trained on Spark](#saveload)

Problems and Troubleshooting Guides
* [How to debug common Spark dependency problems (NoClassDefFoundExcption and similar)](#dependencyproblems)



# Before Training - How-To Guides

## <a name="uberjar">How to build an uber-JAR for training via Spark submit using Maven</a>

When submitting a training job to a cluster, a typical workflow is to build an 
Uber jar: a single JAR file containing all of the dependencies (libraries, class files, etc) required to run a job
Spark submit: A script that comes with a Spark distribution that users submit their job to, in order to begin execution of their Spark job

This guide assumes you already have code set up to train a network on Spark.

**Step 1: Decide on the required dependencies.**

There is a lot of overlap with single machine training with DL4J and ND4J. However, some 
You will need to include the standard set of deeplearning4j dependencies, such as:
* deeplearning4j-core
* deeplearning4j-spark
* nd4j-native-platform (for CPU-only training)

Note that the Spark dependenices, such as spark-core_2.11 can be set to ```provided``` scope in your pom.xml (see [Maven docs](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#Dependency_Scope) for more details), as Spark submit will add Spark to the classpath.
Be careful to use the spark version that matches your cluster - for both the Spark version (Spark 1 vs. Spark 2) and the Scala version (2.10 vs. 2.11). If these are mismatched, your job will likely fail at runtime.


When training on CUDA GPUs, there are a couple of possible cases:
*Case 1: Cluster nodes have CUDA toolkit installed on the master and worker nodes*

When the CUDA toolkit and CuDNN are available on the cluster nodes, we can use a smaller dependency:
* If the OS building the uber-jar is the same OS as the cluster: include nd4j-cuda-x.x
* If the OS building the uber-jar is different to the cluster OS (i.e., build on Windows, execute Spark on Linux cluster): include nd4j-cuda-x.x-platform
* In both cases, include 
where x.x is the CUDA version - for example, x.x=9.2 for CUDA 9.2.

*Case 2: Cluster nodes do NOT have the CUDA toolkit installed on the master and worker nodes*

When CUDA/CuDNN are NOT installed on the cluster nodes, we can do the following:
* First, include the dependencies as per 'Case 1' above
* Then include the "redist" javacpp-presets for the cluster operating system, as described here: [DL4J CuDNN Docs](https://deeplearning4j.org/docs/latest/deeplearning4j-config-cudnn)


**Step 2: Configure your pom.xml file for building an uber-jar**

When using Spark submit, we need an uber-jar to run our job. After configuring the 
We recommend that you use the maven shade plugin for this purpose. There are alternative tools/plugins for building an uber-jar, but these do not always include all relevant files from the source jars, such as those required for Java's ServiceLoader mechanism to function correctly. (The ServiceLoader mechanism is used by ND4J and a lot of other software libraries).

A Maven shade configuration suitable for this purpose is provided in the example standalone sample project [pom.xml file](https://github.com/deeplearning4j/dl4j-examples/blob/master/standalone-sample-project/pom.xml):
```
<build>
    <plugins>
        <!-- Other plugins here if required -->

        <!-- Configure maven shade to produce an uber-jar when running "mvn package" -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>${maven-shade-plugin.version}</version>
            <configuration>
                <shadedArtifactAttached>true</shadedArtifactAttached>
                <shadedClassifierName>bin</shadedClassifierName>
                <createDependencyReducedPom>true</createDependencyReducedPom>
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>org/datanucleus/**</exclude>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>
            </configuration>

            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <transformers>
                            <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                                <resource>reference.conf</resource>
                            </transformer>
                            <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                            <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                            </transformer>
                        </transformers>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```


**Step 3: Build the uber jar**

Finally, simply run ```mvn package -DskipTests``` to build the uber-jar for your project.
Note that the uber-jar should be present under ```<project_root>/target/<project_name>-bin.jar```.
Be sure to use the ```...-bin.jar``` file as this is the shaded jar with all of the dependencies.

That's is - you should now have an uber-jar that is suitable for submitting to spark-submit for training networks on Spark with CPUs or NVIDA (CUDA) GPUs.




## <a name="gpus">How to use GPUs for training on Spark</a>

Deeplearning4j and ND4J support GPU acceleration using NVIDA GPUs.

DL4J and ND4J are designed in such a way that the code (neural network configuration, data pipeline code) is "backend independent". That is, you can write the code once, and execute it on either a CPU or GPU, simply by including the appropriate backend (nd4j-native backend for CPUs, or nd4j-cuda-x.x for GPUs). Executing on Spark is no different from executing on a single node in this respect: you need to simply include the appropriate ND4J backend, and make sure your machines (master/worker nodes in the case)

When running on GPUs, there are a few components:
(a) The ND4J CUDA backend (nd4j-cuda-x.x dependency)
(b) The CUDA toolkit
(c) The Deeplearning4j CUDA dependency to gain CuDNN support (deeplearning4j-cuda-x.x)
(d) The CuDNN library files

Both (a) and (b) must be available for ND4J/DL4J to run using an available CUDA GPU run.
(c) and (d) are optional, though are recommended to get optimal performance - NVIDIA's CuDNN library is able to significantly speed up many layers, such as convolutional layers (ConvolutionLayer, SubsamplingLayer, BatchNormalization, etc) and LSTM RNN layers.

For configuring dependencies for Spark jobs, see the [uber-jar section](#uberjar) above.
For configuring CuDNN on a single node, see [Using Deeplearning4j with CuDNN](https://deeplearning4j.org/docs/latest/deeplearning4j-config-cudnn)


## <a name="cpusgpus">How to use CPUs on master, GPUs on the workers</a>

In some cases, it may make sense to run the master using CPUs only, and the workers using GPUs.
If resources (i.e., the number of available GPU machines) are not constrained, it may simply be easier to have a homogeneous cluster: i.e., the master using a GPU for execution also.



## <a name="memory">How to configure memory settings for Spark</a>

For important background on how memory and memory configuration works for DL4J and ND4J, start by reading [Memory management for ND4J/DL4J](https://deeplearning4j.org/docs/latest/deeplearning4j-config-memory).

The memory management on Spark is similar to memory management for single node training:
* On-heap memory is configured using the standard Java Xms and Xmx memory configuration settings
* Off-heap memory is configured using the javacpp system properties

However, memory configuration in the context of Spark adds some additional complications:
1. Often, memory configuration has to be done separately (sometimes using different mechanisms) for the driver/master vs. the workers
2. The approach for configuring memory can depend on the cluster resource manager - Spark standalone vs. YARN vs. Mesos, etc
3. Cluster resource manager default memory settings are often not appropriate for libraries (such as DL4J/ND4J) that rely heavily on off-heap memory

We will look at the memory configuration options for some of the common cases.

**Spark Standalone**


**YARN**









# During and After Training Guides

## <a name="evaluation">How to perform distributed test set evaluation</a>

Deeplearning4j supports most standard evaluation metrics for neural networks. For basic information on evaluation, see the [Deeplearning4j Evaluation Page](https://deeplearning4j.org/docs/latest/deeplearning4j-nn-evaluation)

All of the evaluation metrics that deeplearning4j supports can be calculated in a distributed manner using Spark.

To perform evaluation

**Step 1: Prepare Your Data**

Evaluation data for Deeplearinng4j on Spark is very similar to training data. That is, you can use:
* ```RDD<DataSet>``` or ```JavaRDD<DataSet>``` for evaluating single input/output networks
* ```RDD<MultiDataSet>``` or ```JavaRDD<MultiDataSet>``` for evaluating multi input/output networks
* ```RDD<String>``` or ```JavaRDD<String>``` where each String is a path that points to serialized DataSet/MultiDataSet (or other minibatch file-based formats) on network storage such as HDFS.

See the data page (TODO: LINK) for details on how to prepare your data into one of these formats.

**Step 2: Prepare Your Network**

Creating your network is straightforward.
First, load your network (MultiLayerNetwork or ComputationGraph) into memory on the driver using the information from the following guide: [How to save (and load) neural networks trained on Spark](#saveload)

Then, simply create your network using:

```
JavaSparkContext sc = new JavaSparkContext();
MultiLayerNetwork net = <code to load network>
SparkDl4jMultiLayer sparkNet = new SparkDl4jMultiLayer(sc, cgForEval, null);
```

```
JavaSparkContext sc = new JavaSparkContext();
ComputationGraph net = <code to load network>
SparkComputationGraph sparkNet = new SparkComputationGraph(sc, net, null);
```

Note that you don't need to configure a training master (i.e., the 3rd argument is null above), as evaluation does not use it.


**Step 3: Call the appropriate evaluation method**

For common cases, you can call one of the standard evalutation methods on SparkDl4jMultiLayer or SparkComputationGraph:
```
evaluate(RDD<DataSet>)                //Accuracy/F1 etc for classifiers
evaluate(JavaRDD<DataSet>)            //Accuracy/F1 etc for classifiers
evaluateROC(JavaRDD<DataSet>)         //ROC for single output binary classifiers
evaluateRegression(JavaRDD<DataSet>)  //For regression metrics
```

For performing multiple evaluations simultaneously (more efficient than performing them sequentially) you can use something like:
```
IEvaluation[] evaluations = new IEvaluation[]{new Evaluation(), new ROCMultiClass()};
JavaRDD<DataSet> data = ...;
sparkNet.doEvaluation(data, 32, evaluations);
```

Note that some of the evaluation methods have overloads with extra parameters, including:
* ```int evalNumWorkers``` - the number of evaluation workers - i.e., the number of copies of a network used for evaluation on each node (up to the maximum number of Spark threads per worker). For large networks (or limited cluster memory), you might want to reduce this to avoid running into memory problems.
* ```int evalBatchSize``` - the minibatch size to use when performing evaluation. This needs to be large enough to efficiently use the hardware resources, but small enough to not run out of memory. Values of 32-128 is unsually a good starting point; increase when more memory is available and for smaller networks; decrease if memory is a problem.
* ```DataSetLoader loader``` and ```MultiDataSetLoader loader``` - these are available when evaluating on a ```RDD<String>``` or ```JavaRDD<String>```. They are interfaces to load a path into a DataSet or MultiDataSet using a custom user-defined function. Most users will not need to use these, however the functionality is provided for greater flexibility. They would be used for example if the saved minibatch file format is not a DataSet/MultiDataSet but some other (possibly custom) format.



## <a name="saveload">How to save (and load) neural networks trained on Spark</a>

Deeplearning4j's Spark functionality is built around the idea of wrapper classes - i.e., ```SparkDl4jMultiLayer``` and ```SparkComputationGraph``` internally use the standard ```MultiLayerNetwork``` and ```ComputationGraph``` classes.
You can access the internal MultiLayerNetwork/ComputationGraph classes using ```SparkDl4jMultiLayer.getNetwork()``` and ```SparkComputationGraph.getNetwork()``` respectively.

To save on the master/driver's local file system, get the network as described above and simply use the ```ModelSerializer``` class or ```MultiLayerNetwork.save(File)/.load(File)``` and ```ComputationGraph.save(File)/.load(File)``` methods.

To save to (or load from) a remote location or distributed file system such as HDFS, you can use input and output streams.

For example,
```
JavaSparkContext sc = new JavaSparkContext();
FileSystem fileSystem = FileSystem.get(sc.hadoopConfiguration());
String outputPath = "hdfs:///my/output/location/file.bin";
MultiLayerNetwork net = sparkNet.getNetwork();
try (BufferedOutputStream os = new BufferedOutputStream(fileSystem.create(new Path(outputPath)))) {
    ModelSerializer.writeModel(net, os, true);
}
```

Reading is a similar process:
```
JavaSparkContext sc = new JavaSparkContext();
FileSystem fileSystem = FileSystem.get(sc.hadoopConfiguration());
String outputPath = "hdfs:///my/output/location/file.bin";
MultiLayerNetwork net;
try(BufferedInputStream is = new BufferedInputStream(fileSystem.open(new Path(outputPath)))){
    net = ModelSerializer.restoreMultiLayerNetwork(is);
}
```



# Problems and Troubleshooting Guides

## <a name="dependencyproblems">How to debug common Spark dependency problems (NoClassDefFoundExcption and similar)</a>

Unfortunately, dependency problems at runtime can occur on a cluster.
They may look like:
TODO examples here - NoClassDefFoundError, Java 7/8, Mixed Scala versions, Jackson, Play/Spark etc


Debugging Dependency Problems:

**Step 1: Collect Dependency Information**

The first step (when using Maven) is to produce a dependency tree that you can refer to.
Open a command line window (for example, bash on Linux, cmd on Windows), navigate to the root directory of your Maven project and run ```mvn dependency:tree```
This will give you a list of dependencies (direct and transient) that can be helpful to understand exactly what is on the classpath, and why.

Note also that ```mvn dependency:tree -Dverbose``` will provide extra information, and can be useful when debugging problems related to mismatched library versions.

**Step 2: Check your Spark Versions**

When running into dependency issues, check the following.

*First: check the Spark versions*
If your cluster is running Spark 2, you should be using a version of deeplearning4j-spark_2.10/2.11 (and DataVec) that ends with ```_spark_2```

Look through

If you find a problem, you should change your project dependencies as follows:
On a Spark 2 (Scala 2.11) cluster, use:
```
<dependency>
    <groupId>org.deeplearning4j</groupId>
    <artifactId>dl4j-spark_2.11</artifactId>
    <version>1.0.0-beta2_spark_2</version>
</dependency>
```
whereas on a Spark 1 (Scala 2.11) cluster, you should use:
```
<dependency>
    <groupId>org.deeplearning4j</groupId>
    <artifactId>dl4j-spark_2.11</artifactId>
    <version>1.0.0-beta2_spark_1</version>
</dependency>
```

**Step 3: Check the Scala Versions**

Apache Spark is distributed with versions that support both Scala 2.10 and Scala 2.11.

To avoid problems with Scala versions, you need to do two things:
(a) Ensure you don't have a mix of Scala 2.10 and Scala 2.11 (or 2.12) dependencies on your project classpath. Check your dependency tree for entries ending in ```_2.10``` or ```_2.11```: for example, ```org.apache.spark:spark-core_2.11:jar:1.6.3:compile``` is a Spark 1 (1.6.3) dependency using Scala 2.11
(b) Ensure that your project matches what the cluster is using. For example, if you cluster is running Spark 2 with Scala 2.11, all of your Scala dependencies should use 2.11 also. Note that Scala 2.11 is more common for Spark clusters.

If you find mismatched Scala versions, you will need to align them by changing the dependency versions in your pom.xml (or similar configuration file for other dependency management systems). Many libraries (including Spark and DL4J) release dependencies with both Scala 2.10 and 2.11 versions.

**Step 4: Check for Mismatched Library Versions**

A number of common utility libraries that are widely used across the Java ecosystem are not compatible across versions. For example, Spark might rely on library X version Y and will fail to run when library X version Z is on the classpath. Furthermore, many of these libraries are split into multiple modules (i.e., multiple separate modular dependencies) that won't work correctly when mixing different versions.

Some that can commonly cause problems include:
* Jackson
* Guava

DL4J and ND4J use versions of these libraries that should avoid dependency conflicts with Spark.
However, it is possible that other (3rd party libraries) can pull in versions of these dependencies.


