---
title: "Deeplearning4j on Spark: API Reference"
short_title: API Reference
description: "Deeplearning4j on Spark: API Reference"
category: Distributed Deep Learning
weight: 4
---

# API Reference

This page provides the API reference for key classes required to do distributed training with DL4J on Spark. Before going through these, make sure you have read the introduction guide for deeplearning4j Spark training [here](deeplearning4j-scaleout-intro).


---

### SharedTrainingMaster
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark-parameterserver/src/main/java/org/deeplearning4j/spark/parameterserver/training/SharedTrainingMaster.java) </span>

SharedTrainingMaster implements distributed training of neural networks using a compressed quantized gradient (update)
sharing implementation based on the Strom 2015 paper "Scalable Distributed DNN Training Using Commodity GPU Cloud Computing":
<a href="https://s3-us-west-2.amazonaws.com/amazon.jobs-public-documents/strom_interspeech2015.pdf">https://s3-us-west-2.amazonaws.com/amazon.jobs-public-documents/strom_interspeech2015.pdf</a>.
The Deeplearning4j implementation makes a number of modifications, such as having the option to use a parameter-server
based implementation for fault tolerance and execution where multicast networking support is not available.


##### fromJson 
```java
public static SharedTrainingMaster fromJson(String jsonStr) 
```


Create a SharedTrainingMaster instance by deserializing a JSON string that has been serialized with
{- link #toJson()}

- param jsonStr SharedTrainingMaster configuration serialized as JSON

##### fromYaml 
```java
public static SharedTrainingMaster fromYaml(String yamlStr) 
```


Create a SharedTrainingMaster instance by deserializing a YAML string that has been serialized with
{- link #toYaml()}

- param yamlStr SharedTrainingMaster configuration serialized as YAML

##### collectTrainingStats 
```java
public Builder collectTrainingStats(boolean enable) 
```


Create a SharedTrainingMaster with defaults other than the RDD number of examples
- param rddDataSetNumExamples When fitting from an {- code RDD<DataSet>} how many examples are in each dataset?

##### repartitionData 
```java
public Builder repartitionData(Repartition repartition) 
```


This parameter defines when repartition is applied (if applied).
- param repartition Repartition setting
- deprecated Use {- link #repartitioner(Repartitioner)}

##### repartitionStrategy 
```java
public Builder repartitionStrategy(RepartitionStrategy repartitionStrategy) 
```


Used in conjunction with {- link #repartitionData(Repartition)} (which defines <i>when</i> repartitioning should be
conducted), repartitionStrategy defines <i>how</i> the repartitioning should be done. See {- link RepartitionStrategy}
for details

- param repartitionStrategy Repartitioning strategy to use
- deprecated Use {- link #repartitioner(Repartitioner)}

##### storageLevel 
```java
public Builder storageLevel(StorageLevel storageLevel) 
```


Set the storage level for {- code RDD<DataSet>}s.<br>
Default: StorageLevel.MEMORY_ONLY_SER() - i.e., store in memory, in serialized form<br>
To use no RDD persistence, use {- code null}<br>
Note that this only has effect when {- code RDDTrainingApproach.Direct} is used (which is not the default),
and when fitting from an {- code RDD<DataSet>}.

<b>Note</b>: Spark's StorageLevel.MEMORY_ONLY() and StorageLevel.MEMORY_AND_DISK() can be problematic when
it comes to off-heap data (which DL4J/ND4J uses extensively). Spark does not account for off-heap memory
when deciding if/when to drop blocks to ensure enough free memory; consequently, for DataSet RDDs that are
larger than the total amount of (off-heap) memory, this can lead to OOM issues. Put another way: Spark counts
the on-heap size of DataSet and INDArray objects only (which is negligible) resulting in a significant
underestimate of the true DataSet object sizes. More DataSets are thus kept in memory than we can really afford.<br>
<br>
Note also that fitting directly from an {- code RDD<DataSet>} is discouraged - it is better to export your
prepared data once and call (for example} {- code SparkDl4jMultiLayer.fit(String savedDataDirectory)}.
See DL4J's Spark website documentation for details.<br>

- param storageLevel Storage level to use for DataSet RDDs

##### rddTrainingApproach 
```java
public Builder rddTrainingApproach(RDDTrainingApproach rddTrainingApproach) 
```


The approach to use when training on a {- code RDD<DataSet>} or {- code RDD<MultiDataSet>}.
Default: {- link RDDTrainingApproach#Export}, which exports data to a temporary directory first.<br>
The default cluster temporary directory is used, though can be configured using {- link #exportDirectory(String)}
Note also that fitting directly from an {- code RDD<DataSet>} is discouraged - it is better to export your
prepared data once and call (for example} {- code SparkDl4jMultiLayer.fit(String savedDataDirectory)}.
See DL4J's Spark website documentation for details.<br>

- param rddTrainingApproach Training approach to use when training from a {- code RDD<DataSet>} or {- code RDD<MultiDataSet>}

##### exportDirectory 
```java
public Builder exportDirectory(String exportDirectory) 
```


When {- link #rddTrainingApproach(RDDTrainingApproach)} is set to {- link RDDTrainingApproach#Export} (as it is by default)
the data is exported to a temporary directory first.

Default: null. -> use {hadoop.tmp.dir}/dl4j/. In this case, data is exported to {hadoop.tmp.dir}/dl4j/SOME_UNIQUE_ID/<br>
If you specify a directory, the directory {exportDirectory}/SOME_UNIQUE_ID/ will be used instead.

- param exportDirectory Base directory to export data

##### rngSeed 
```java
public Builder rngSeed(long rngSeed) 
```


Random number generator seed, used mainly for enforcing repeatable splitting/repartitioning on RDDs
Default: no seed set (i.e., random seed)

- param rngSeed RNG seed

##### updatesThreshold 
```java
public Builder updatesThreshold(double updatesThreshold)
```


- deprecated Use {- link #thresholdAlgorithm(ThresholdAlgorithm)} with (for example) {- link AdaptiveThresholdAlgorithm}

##### thresholdAlgorithm 
```java
public Builder thresholdAlgorithm(ThresholdAlgorithm thresholdAlgorithm)
```


Algorithm to use to determine the threshold for updates encoding. Lower values might improve convergence, but
increase amount of network communication<br>
Values that are too low may also impact network convergence. If convergence problems are observed, try increasing
or decreasing this by a factor of 10 - say 1e-4 and 1e-2.<br>
For technical details, see the paper <a href="https://s3-us-west-2.amazonaws.com/amazon.jobs-public-documents/strom_interspeech2015.pdf">
Scalable Distributed DNN Training Using Commodity GPU Cloud Computing</a><br>
See also {- link ThresholdAlgorithm}<br><br>
Default: {- link AdaptiveThresholdAlgorithm} with default parameters
- param thresholdAlgorithm Threshold algorithm to use to determine encoding threshold

##### residualPostProcessor 
```java
public Builder residualPostProcessor(ResidualPostProcessor residualPostProcessor)
```


Residual post processor. See {- link ResidualPostProcessor} for details.

Default: {- code new ResidualClippingPostProcessor(5.0, 5)} - i.e., a {- link ResidualClippingPostProcessor}
that clips the residual to +/- 5x current threshold, every 5 iterations.

- param residualPostProcessor Residual post processor to use

##### batchSizePerWorker 
```java
public Builder batchSizePerWorker(int batchSize) 
```


Minibatch size to use when training workers. In principle, the source data (i.e., {- code RDD<DataSet>} etc)
can have a different number of examples in each {- code DataSet} than we want to use when training.
i.e., we can split or combine DataSets if required.

- param batchSize Minibatch size to use when fitting each worker

##### workersPerNode 
```java
public Builder workersPerNode(int numWorkers) 
```


This method allows to configure number of network training threads per cluster node.<br>
Default value: -1, which defines automated number of workers selection, based on hardware present in system
(i.e., number of GPUs, if training on a GPU enabled system).
<br>
When training on GPUs, you should use 1 worker per GPU (which is the default). For CPUs, 1 worker per
node is usually preferred, though multi-CPU (i.e., multiple physical CPUs) or CPUs with large core counts
may have better throughput (i.e., more examples per second) when increasing the number of workers,
at the expense of more memory consumed. Note that if you increase the number of workers on a CPU system,
you should set the number of OpenMP threads using the {- code OMP_NUM_THREADS} property - see
{- link org.nd4j.config.ND4JEnvironmentVars#OMP_NUM_THREADS} for more details.
For example, a machine with 32 physical cores could use 4 workers with {- code OMP_NUM_THREADS=8}

- param numWorkers Number of workers on each node.

##### debugLongerIterations 
```java
public Builder debugLongerIterations(long timeMs) 
```


This method allows you to artificially extend iteration time using Thread.sleep() for a given time.

PLEASE NOTE: Never use that option in production environment. It's suited for debugging purposes only.

- param timeMs
- return

##### transport 
```java
public Builder transport(Transport transport) 
```


Optional method: Transport implementation to be used as TransportType.CUSTOM for VoidParameterAveraging method<br>
Generally not used by users

- param transport Transport to use
- return

##### workerPrefetchNumBatches 
```java
public Builder workerPrefetchNumBatches(int prefetchNumBatches)
```


Number of minibatches to asynchronously prefetch on each worker when training. Default: 2, which is usually suitable
in most cases. Increasing this might help in some cases of ETL (data loading) bottlenecks, at the expense
of greater memory consumption
- param prefetchNumBatches Number of batches to prefetch

##### repartitioner 
```java
public Builder repartitioner(Repartitioner repartitioner)
```


Repartitioner to use to repartition data before fitting.<br>
DL4J performs a MapPartitions operation for training, hence how the data is partitioned can matter a lot for
performance - too few partitions (or very imbalanced partitions can result in poor cluster utilization, due to
some workers being idle. A larger number of smaller partitions can help to avoid so-called "end-of-epoch"
effects where training can only complete once the last/slowest worker finishes it's partition.<br>
Default repartitioner is {- link DefaultRepartitioner}, which repartitions equally up to a maximum of 5000
partitions, and is usually suitable for most purposes. In the worst case, the "end of epoch" effect
when using the partitioner should be limited to a maximum of the amount of time required to process a single partition.

- param repartitioner Repartitioner to use

##### workerTogglePeriodicGC 
```java
public Builder workerTogglePeriodicGC(boolean workerTogglePeriodicGC)
```


Used to disable the periodic garbage collection calls on the workers.<br>
Equivalent to {- code Nd4j.getMemoryManager().togglePeriodicGc(workerTogglePeriodicGC);}<br>
Pass false to disable periodic GC on the workers or true (equivalent to the default, or not setting it) to keep it enabled.

- param workerTogglePeriodicGC Worker periodic garbage collection setting

##### workerPeriodicGCFrequency 
```java
public Builder workerPeriodicGCFrequency(int workerPeriodicGCFrequency)
```


Used to set the periodic garbage collection frequency on the workers.<br>
Equivalent to calling {- code Nd4j.getMemoryManager().setAutoGcWindow(workerPeriodicGCFrequency);} on each worker<br>
Does not have any effect if {- link #workerTogglePeriodicGC(boolean)} is set to false

- param workerPeriodicGCFrequency The periodic GC frequency to use on the workers

##### encodingDebugMode 
```java
public Builder encodingDebugMode(boolean enabled)
```


Enable debug mode for threshold encoding. When enabled, various statistics for the threshold and the residual
will be calculated and logged on each worker (at info log level).<br>
This information can be used to check if the encoding threshold is too big (for example, virtually all updates
are much smaller than the threshold) or too big (majority of updates are much larger than the threshold).<br>
encodingDebugMode is disabled by default.<br>
<b>IMPORTANT</b>: enabling this has a performance overhead, and should not be enabled unless the debug information is actually required.<br>

- param enabled True to enable





---

### SparkComputationGraph
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/impl/graph/SparkComputationGraph.java) </span>

Main class for training ComputationGraph networks using Spark.
Also used for performing distributed evaluation and inference on these networks


##### getSparkContext 
```java
public JavaSparkContext getSparkContext() 
```


Instantiate a ComputationGraph instance with the given context, network and training master.

- param sparkContext   the spark context to use
- param network        the network to use
- param trainingMaster Required for training. May be null if the SparkComputationGraph is only to be used
for evaluation or inference

##### getNetwork 
```java
public ComputationGraph getNetwork() 
```


- return The trained ComputationGraph

##### getTrainingMaster 
```java
public TrainingMaster getTrainingMaster() 
```


- return The TrainingMaster for this network

##### setNetwork 
```java
public void setNetwork(ComputationGraph network) 
```


- param network The network to be used for any subsequent training, inference and evaluation steps

##### getDefaultEvaluationWorkers 
```java
public int getDefaultEvaluationWorkers()
```


Returns the currently set default number of evaluation workers/threads.
Note that when the number of workers is provided explicitly in an evaluation method, the default value
is not used.<br>
In many cases, we may want this to be smaller than the number of Spark threads, to reduce memory requirements.
For example, with 32 Spark threads and a large network, we don't want to spin up 32 instances of the network
to perform evaluation. Better (for memory requirements, and reduced cache thrashing) to use say 4 workers.<br>
If it is not set explicitly, {- link #DEFAULT_EVAL_WORKERS} will be used

- return Default number of evaluation workers (threads).

##### setDefaultEvaluationWorkers 
```java
public void setDefaultEvaluationWorkers(int workers)
```


Set the default number of evaluation workers/threads.
Note that when the number of workers is provided explicitly in an evaluation method, the default value
is not used.<br>
In many cases, we may want this to be smaller than the number of Spark threads, to reduce memory requirements.
For example, with 32 Spark threads and a large network, we don't want to spin up 32 instances of the network
to perform evaluation. Better (for memory requirements, and reduced cache thrashing) to use say 4 workers.<br>
If it is not set explicitly, {- link #DEFAULT_EVAL_WORKERS} will be used

- return Default number of evaluation workers (threads).

##### fit 
```java
public ComputationGraph fit(RDD<DataSet> rdd) 
```


Fit the ComputationGraph with the given data set

- param rdd Data to train on
- return Trained network

##### fit 
```java
public ComputationGraph fit(JavaRDD<DataSet> rdd) 
```


Fit the ComputationGraph with the given data set

- param rdd Data to train on
- return Trained network

##### fit 
```java
public ComputationGraph fit(String path) 
```


Fit the SparkComputationGraph network using a directory of serialized DataSet objects
The assumption here is that the directory contains a number of {- link DataSet} objects, each serialized using
{- link DataSet#save(OutputStream)}

- param path Path to the directory containing the serialized DataSet objcets
- return The MultiLayerNetwork after training

##### fit 
```java
public ComputationGraph fit(String path, int minPartitions) 
```


- deprecated Use {- link #fit(String)}

##### fitPaths 
```java
public ComputationGraph fitPaths(JavaRDD<String> paths) 
```


Fit the network using a list of paths for serialized DataSet objects.

- param paths    List of paths
- return trained network

##### fitPathsMultiDataSet 
```java
public ComputationGraph fitPathsMultiDataSet(JavaRDD<String> paths) 
```


Fit the ComputationGraph with the given data set

- param rdd Data to train on
- return Trained network

##### fitMultiDataSet 
```java
public ComputationGraph fitMultiDataSet(String path, int minPartitions) 
```


- deprecated use {- link #fitMultiDataSet(String)}

##### getScore 
```java
public double getScore() 
```


Gets the last (average) minibatch score from calling fit. This is the average score across all executors for the
last minibatch executed in each worker

##### calculateScore 
```java
public double calculateScore(JavaRDD<DataSet> data, boolean average) 
```


Calculate the score for all examples in the provided {- code JavaRDD<DataSet>}, either by summing
or averaging over the entire data set. To calculate a score for each example individually, use {- link #scoreExamples(JavaPairRDD, boolean)}
or one of the similar methods. Uses default minibatch size in each worker, {- link SparkComputationGraph#DEFAULT_EVAL_SCORE_BATCH_SIZE}

- param data    Data to score
- param average Whether to sum the scores, or average them

##### calculateScore 
```java
public double calculateScore(JavaRDD<DataSet> data, boolean average, int minibatchSize) 
```


Calculate the score for all examples in the provided {- code JavaRDD<DataSet>}, either by summing
or averaging over the entire data set. To calculate a score for each example individually, use {- link #scoreExamples(JavaPairRDD, boolean)}
or one of the similar methods

- param data          Data to score
- param average       Whether to sum the scores, or average them
- param minibatchSize The number of examples to use in each minibatch when scoring. If more examples are in a partition than
this, multiple scoring operations will be done (to avoid using too much memory by doing the whole partition
in one go)

##### calculateScoreMultiDataSet 
```java
public double calculateScoreMultiDataSet(JavaRDD<MultiDataSet> data, boolean average) 
```


Calculate the score for all examples in the provided {- code JavaRDD<MultiDataSet>}, either by summing
or averaging over the entire data set.
Uses default minibatch size in each worker, {- link SparkComputationGraph#DEFAULT_EVAL_SCORE_BATCH_SIZE}

- param data    Data to score
- param average Whether to sum the scores, or average them

##### calculateScoreMultiDataSet 
```java
public double calculateScoreMultiDataSet(JavaRDD<MultiDataSet> data, boolean average, int minibatchSize) 
```


Calculate the score for all examples in the provided {- code JavaRDD<MultiDataSet>}, either by summing
or averaging over the entire data set.

- param data          Data to score
- param average       Whether to sum the scores, or average them
- param minibatchSize The number of examples to use in each minibatch when scoring. If more examples are in a partition than
this, multiple scoring operations will be done (to avoid using too much memory by doing the whole partition
in one go)

##### scoreExamples 
```java
public JavaDoubleRDD scoreExamples(JavaRDD<DataSet> data, boolean includeRegularizationTerms) 
```


DataSet version of {- link #scoreExamples(JavaRDD, boolean)}

##### scoreExamples 
```java
public JavaDoubleRDD scoreExamples(JavaRDD<DataSet> data, boolean includeRegularizationTerms, int batchSize) 
```


DataSet version of {- link #scoreExamples(JavaPairRDD, boolean, int)}

##### scoreExamplesMultiDataSet 
```java
public JavaDoubleRDD scoreExamplesMultiDataSet(JavaRDD<MultiDataSet> data, boolean includeRegularizationTerms) 
```


DataSet version of {- link #scoreExamples(JavaPairRDD, boolean)}

##### scoreExamplesMultiDataSet 
```java
public JavaDoubleRDD scoreExamplesMultiDataSet(JavaRDD<MultiDataSet> data, boolean includeRegularizationTerms,
                    int batchSize) 
```


Score the examples individually, using a specified batch size. Unlike {- link #calculateScore(JavaRDD, boolean)},
this method returns a score for each example separately. If scoring is needed for specific examples use either
{- link #scoreExamples(JavaPairRDD, boolean)} or {- link #scoreExamples(JavaPairRDD, boolean, int)} which can have
a key for each example.

- param data                       Data to score
- param includeRegularizationTerms If true: include the l1/l2 regularization terms with the score (if any)
- param batchSize                  Batch size to use when doing scoring
- return A JavaDoubleRDD containing the scores of each example
- see ComputationGraph#scoreExamples(MultiDataSet, boolean)

##### evaluate 
```java
public Evaluation evaluate(String path, DataSetLoader loader)
```


Score the examples individually, using the default batch size {- link #DEFAULT_EVAL_SCORE_BATCH_SIZE}. Unlike {- link #calculateScore(JavaRDD, boolean)},
this method returns a score for each example separately<br>
Note: The provided JavaPairRDD has a key that is associated with each example and returned score.<br>
<b>Note:</b> The DataSet objects passed in must have exactly one example in them (otherwise: can't have a 1:1 association
between keys and data sets to score)

- param data                       Data to score
- param includeRegularizationTerms If true: include the l1/l2 regularization terms with the score (if any)
- param <K>                        Key type
- return A {- code JavaPairRDD<K,Double>} containing the scores of each example
- see MultiLayerNetwork#scoreExamples(DataSet, boolean)

##### evaluate 
```java
public Evaluation evaluate(String path, MultiDataSetLoader loader)
```


Evaluate the single-output network on a directory containing a set of MultiDataSet objects to be loaded with a {- link MultiDataSetLoader}.
Uses default batch size of {- link #DEFAULT_EVAL_SCORE_BATCH_SIZE}
- param path Path/URI to the directory containing the datasets to load
- return Evaluation

##### evaluateROCMDS 
```java
public ROC evaluateROCMDS(JavaRDD<MultiDataSet> data) 
```


{- code RDD<DataSet>} overload of {- link #evaluate(JavaRDD)}





---

### SparkDl4jMultiLayer
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/impl/multilayer/SparkDl4jMultiLayer.java) </span>

Main class for training MultiLayerNetwork networks using Spark.
Also used for performing distributed evaluation and inference on these networks


##### getSparkContext 
```java
public JavaSparkContext getSparkContext() 
```


Instantiate a multi layer spark instance
with the given context and network.
This is the prediction constructor

- param sparkContext the spark context to use
- param network      the network to use

##### getNetwork 
```java
public MultiLayerNetwork getNetwork() 
```


- return The MultiLayerNetwork underlying the SparkDl4jMultiLayer

##### getTrainingMaster 
```java
public TrainingMaster getTrainingMaster() 
```


- return The TrainingMaster for this network

##### setNetwork 
```java
public void setNetwork(MultiLayerNetwork network) 
```


Set the network that underlies this SparkDl4jMultiLayer instacne

- param network network to set

##### getDefaultEvaluationWorkers 
```java
public int getDefaultEvaluationWorkers()
```


Returns the currently set default number of evaluation workers/threads.
Note that when the number of workers is provided explicitly in an evaluation method, the default value
is not used.<br>
In many cases, we may want this to be smaller than the number of Spark threads, to reduce memory requirements.
For example, with 32 Spark threads and a large network, we don't want to spin up 32 instances of the network
to perform evaluation. Better (for memory requirements, and reduced cache thrashing) to use say 4 workers.<br>
If it is not set explicitly, {- link #DEFAULT_EVAL_WORKERS} will be used

- return Default number of evaluation workers (threads).

##### setDefaultEvaluationWorkers 
```java
public void setDefaultEvaluationWorkers(int workers)
```


Set the default number of evaluation workers/threads.
Note that when the number of workers is provided explicitly in an evaluation method, the default value
is not used.<br>
In many cases, we may want this to be smaller than the number of Spark threads, to reduce memory requirements.
For example, with 32 Spark threads and a large network, we don't want to spin up 32 instances of the network
to perform evaluation. Better (for memory requirements, and reduced cache thrashing) to use say 4 workers.<br>
If it is not set explicitly, {- link #DEFAULT_EVAL_WORKERS} will be used

- return Default number of evaluation workers (threads).

##### setCollectTrainingStats 
```java
public void setCollectTrainingStats(boolean collectTrainingStats) 
```


Set whether training statistics should be collected for debugging purposes. Statistics collection is disabled by default

- param collectTrainingStats If true: collect training statistics. If false: don't collect.

##### getSparkTrainingStats 
```java
public SparkTrainingStats getSparkTrainingStats() 
```


Get the training statistics, after collection of stats has been enabled using {- link #setCollectTrainingStats(boolean)}

- return Training statistics

##### predict 
```java
public Matrix predict(Matrix features) 
```


Predict the given feature matrix

- param features the given feature matrix
- return the predictions

##### predict 
```java
public Vector predict(Vector point) 
```


Predict the given vector

- param point the vector to predict
- return the predicted vector

##### fit 
```java
public MultiLayerNetwork fit(RDD<DataSet> trainingData) 
```


Fit the DataSet RDD. Equivalent to fit(trainingData.toJavaRDD())

- param trainingData the training data RDD to fitDataSet
- return the MultiLayerNetwork after training

##### fit 
```java
public MultiLayerNetwork fit(JavaRDD<DataSet> trainingData) 
```


Fit the DataSet RDD

- param trainingData the training data RDD to fitDataSet
- return the MultiLayerNetwork after training

##### fit 
```java
public MultiLayerNetwork fit(String path) 
```


Fit the SparkDl4jMultiLayer network using a directory of serialized DataSet objects
The assumption here is that the directory contains a number of {- link DataSet} objects, each serialized using
{- link DataSet#save(OutputStream)}

- param path Path to the directory containing the serialized DataSet objcets
- return The MultiLayerNetwork after training

##### fit 
```java
public MultiLayerNetwork fit(String path, int minPartitions) 
```


- deprecated Use {- link #fit(String)}

##### fitPaths 
```java
public MultiLayerNetwork fitPaths(JavaRDD<String> paths) 
```


Fit the network using a list of paths for serialized DataSet objects.

- param paths    List of paths
- return trained network

##### fitLabeledPoint 
```java
public MultiLayerNetwork fitLabeledPoint(JavaRDD<LabeledPoint> rdd) 
```


Fit a MultiLayerNetwork using Spark MLLib LabeledPoint instances.
This will convert the labeled points to the internal DL4J data format and train the model on that

- param rdd the rdd to fitDataSet
- return the multi layer network that was fitDataSet

##### fitContinuousLabeledPoint 
```java
public MultiLayerNetwork fitContinuousLabeledPoint(JavaRDD<LabeledPoint> rdd) 
```


Fits a MultiLayerNetwork using Spark MLLib LabeledPoint instances
This will convert labeled points that have continuous labels used for regression to the internal
DL4J data format and train the model on that
- param rdd the javaRDD containing the labeled points
- return a MultiLayerNetwork

##### getScore 
```java
public double getScore() 
```


Gets the last (average) minibatch score from calling fit. This is the average score across all executors for the
last minibatch executed in each worker

##### calculateScore 
```java
public double calculateScore(RDD<DataSet> data, boolean average) 
```


Overload of {- link #calculateScore(JavaRDD, boolean)} for {- code RDD<DataSet>} instead of {- code JavaRDD<DataSet>}

##### calculateScore 
```java
public double calculateScore(JavaRDD<DataSet> data, boolean average) 
```


Calculate the score for all examples in the provided {- code JavaRDD<DataSet>}, either by summing
or averaging over the entire data set. To calculate a score for each example individually, use {- link #scoreExamples(JavaPairRDD, boolean)}
or one of the similar methods. Uses default minibatch size in each worker, {- link SparkDl4jMultiLayer#DEFAULT_EVAL_SCORE_BATCH_SIZE}

- param data    Data to score
- param average Whether to sum the scores, or average them

##### calculateScore 
```java
public double calculateScore(JavaRDD<DataSet> data, boolean average, int minibatchSize) 
```


Calculate the score for all examples in the provided {- code JavaRDD<DataSet>}, either by summing
or averaging over the entire data set. To calculate a score for each example individually, use {- link #scoreExamples(JavaPairRDD, boolean)}
or one of the similar methods

- param data          Data to score
- param average       Whether to sum the scores, or average them
- param minibatchSize The number of examples to use in each minibatch when scoring. If more examples are in a partition than
this, multiple scoring operations will be done (to avoid using too much memory by doing the whole partition
in one go)

##### scoreExamples 
```java
public JavaDoubleRDD scoreExamples(RDD<DataSet> data, boolean includeRegularizationTerms) 
```


{- code RDD<DataSet>} overload of {- link #scoreExamples(JavaPairRDD, boolean)}

##### scoreExamples 
```java
public JavaDoubleRDD scoreExamples(JavaRDD<DataSet> data, boolean includeRegularizationTerms) 
```


Score the examples individually, using the default batch size {- link #DEFAULT_EVAL_SCORE_BATCH_SIZE}. Unlike {- link #calculateScore(JavaRDD, boolean)},
this method returns a score for each example separately. If scoring is needed for specific examples use either
{- link #scoreExamples(JavaPairRDD, boolean)} or {- link #scoreExamples(JavaPairRDD, boolean, int)} which can have
a key for each example.

- param data                       Data to score
- param includeRegularizationTerms If  true: include the l1/l2 regularization terms with the score (if any)
- return A JavaDoubleRDD containing the scores of each example
- see MultiLayerNetwork#scoreExamples(DataSet, boolean)

##### scoreExamples 
```java
public JavaDoubleRDD scoreExamples(RDD<DataSet> data, boolean includeRegularizationTerms, int batchSize) 
```


{- code RDD<DataSet>}
overload of {- link #scoreExamples(JavaRDD, boolean, int)}

##### scoreExamples 
```java
public JavaDoubleRDD scoreExamples(JavaRDD<DataSet> data, boolean includeRegularizationTerms, int batchSize) 
```


Score the examples individually, using a specified batch size. Unlike {- link #calculateScore(JavaRDD, boolean)},
this method returns a score for each example separately. If scoring is needed for specific examples use either
{- link #scoreExamples(JavaPairRDD, boolean)} or {- link #scoreExamples(JavaPairRDD, boolean, int)} which can have
a key for each example.

- param data                       Data to score
- param includeRegularizationTerms If  true: include the l1/l2 regularization terms with the score (if any)
- param batchSize                  Batch size to use when doing scoring
- return A JavaDoubleRDD containing the scores of each example
- see MultiLayerNetwork#scoreExamples(DataSet, boolean)





---

### ParameterAveragingTrainingMaster
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/impl/paramavg/ParameterAveragingTrainingMaster.java) </span>

implementation for training networks on Spark.
This is standard parameter averaging with a
configurable averaging period.


##### removeHook 
```java
public void removeHook(TrainingHook trainingHook) 
```


- param saveUpdater           If true: save (and average) the updater state when doing parameter averaging
- param numWorkers            Number of workers (executors  threads per executor) for the cluster
- param rddDataSetNumExamples Number of examples in each DataSet object in the {- code RDD<DataSet>}
- param batchSizePerWorker    Number of examples to use per worker per fit
- param averagingFrequency    Frequency (in number of minibatches) with which to average parameters
- param aggregationDepth      Number of aggregation levels used in parameter aggregation
- param prefetchNumBatches    Number of batches to asynchronously prefetch (0: disable)
- param repartition           Set if/when repartitioning should be conducted for the training data
- param repartitionStrategy   Repartitioning strategy to use. See {- link RepartitionStrategy}
- param collectTrainingStats  If true: collect training statistics for debugging/optimization purposes

##### addHook 
```java
public void addHook(TrainingHook trainingHook) 
```


Add a hook for the master for pre and post training

- param trainingHook the training hook to add

##### fromJson 
```java
public static ParameterAveragingTrainingMaster fromJson(String jsonStr) 
```


Create a ParameterAveragingTrainingMaster instance by deserializing a JSON string that has been serialized with
{- link #toJson()}

- param jsonStr ParameterAveragingTrainingMaster configuration serialized as JSON

##### fromYaml 
```java
public static ParameterAveragingTrainingMaster fromYaml(String yamlStr) 
```


Create a ParameterAveragingTrainingMaster instance by deserializing a YAML string that has been serialized with
{- link #toYaml()}

- param yamlStr ParameterAveragingTrainingMaster configuration serialized as YAML

##### trainingHooks 
```java
public Builder trainingHooks(Collection<TrainingHook> trainingHooks) 
```


Adds training hooks to the master.
The training master will setup the workers
with the desired hooks for training.
This can allow for tings like parameter servers
and async updates as well as collecting statistics.

- param trainingHooks the training hooks to ad
- return

##### trainingHooks 
```java
public Builder trainingHooks(TrainingHook... hooks) 
```


Adds training hooks to the master.
The training master will setup the workers
with the desired hooks for training.
This can allow for tings like parameter servers
and async updates as well as collecting statistics.
- param hooks the training hooks to ad
- return

##### batchSizePerWorker 
```java
public Builder batchSizePerWorker(int batchSizePerWorker) 
```


Same as {- link #Builder(Integer, int)} but automatically set number of workers based on JavaSparkContext.defaultParallelism()

- param rddDataSetNumExamples Number of examples in each DataSet object in the {- code RDD<DataSet>}

##### averagingFrequency 
```java
public Builder averagingFrequency(int averagingFrequency) 
```


Frequency with which to average worker parameters.<br>
<b>Note</b>: Too high or too low can be bad for different reasons.<br>
- Too low (such as 1) can result in a lot of network traffic<br>
- Too high (>> 20 or so) can result in accuracy issues or problems with network convergence

- param averagingFrequency Frequency (in number of minibatches of size 'batchSizePerWorker') to average parameters

##### aggregationDepth 
```java
public Builder aggregationDepth(int aggregationDepth) 
```


The number of levels in the aggregation tree for parameter synchronization. (default: 2)
<b>Note</b>: For large models trained with many partitions, increasing this number
will reduce the load on the driver and help prevent it from becoming a bottleneck.<br>

- param aggregationDepth RDD tree aggregation channels when averaging parameter updates.

##### workerPrefetchNumBatches 
```java
public Builder workerPrefetchNumBatches(int prefetchNumBatches) 
```


Set the number of minibatches to asynchronously prefetch in the worker.

Default: 0 (no prefetching)

- param prefetchNumBatches Number of minibatches (DataSets of size batchSizePerWorker) to fetch

##### saveUpdater 
```java
public Builder saveUpdater(boolean saveUpdater) 
```


Set whether the updater (i.e., historical state for momentum, adagrad, etc should be saved).
<b>NOTE</b>: This can <b>double</b> (or more) the amount of network traffic in each direction, but might
improve network training performance (and can be more stable for certain updaters such as adagrad).<br>

This is <b>enabled</b> by default.

- param saveUpdater If true: retain the updater state (default). If false, don't retain (updaters will be
reinitalized in each worker after averaging).

##### repartionData 
```java
public Builder repartionData(Repartition repartition) 
```


Set if/when repartitioning should be conducted for the training data.<br>
Default value: always repartition (if required to guarantee correct number of partitions and correct number
of examples in each partition).

- param repartition Setting for repartitioning

##### repartitionStrategy 
```java
public Builder repartitionStrategy(RepartitionStrategy repartitionStrategy) 
```


Used in conjunction with {- link #repartionData(Repartition)} (which defines <i>when</i> repartitioning should be
conducted), repartitionStrategy defines <i>how</i> the repartitioning should be done. See {- link RepartitionStrategy}
for details

- param repartitionStrategy Repartitioning strategy to use

##### storageLevel 
```java
public Builder storageLevel(StorageLevel storageLevel) 
```


Set the storage level for {- code RDD<DataSet>}s.<br>
Default: StorageLevel.MEMORY_ONLY_SER() - i.e., store in memory, in serialized form<br>
To use no RDD persistence, use {- code null}<br>

<b>Note</b>: Spark's StorageLevel.MEMORY_ONLY() and StorageLevel.MEMORY_AND_DISK() can be problematic when
it comes to off-heap data (which DL4J/ND4J uses extensively). Spark does not account for off-heap memory
when deciding if/when to drop blocks to ensure enough free memory; consequently, for DataSet RDDs that are
larger than the total amount of (off-heap) memory, this can lead to OOM issues. Put another way: Spark counts
the on-heap size of DataSet and INDArray objects only (which is negligible) resulting in a significant
underestimate of the true DataSet object sizes. More DataSets are thus kept in memory than we can really afford.

- param storageLevel Storage level to use for DataSet RDDs

##### storageLevelStreams 
```java
public Builder storageLevelStreams(StorageLevel storageLevelStreams) 
```


Set the storage level RDDs used when fitting data from Streams: either PortableDataStreams (sc.binaryFiles via
{- link SparkDl4jMultiLayer#fit(String)} and {- link SparkComputationGraph#fit(String)}) or String paths
(via {- link SparkDl4jMultiLayer#fitPaths(JavaRDD)}, {- link SparkComputationGraph#fitPaths(JavaRDD)} and
{- link SparkComputationGraph#fitPathsMultiDataSet(JavaRDD)}).<br>

Default storage level is StorageLevel.MEMORY_ONLY() which should be appropriate in most cases.

- param storageLevelStreams Storage level to use

##### rddTrainingApproach 
```java
public Builder rddTrainingApproach(RDDTrainingApproach rddTrainingApproach) 
```


The approach to use when training on a {- code RDD<DataSet>} or {- code RDD<MultiDataSet>}.
Default: {- link RDDTrainingApproach#Export}, which exports data to a temporary directory first

- param rddTrainingApproach Training approach to use when training from a {- code RDD<DataSet>} or {- code RDD<MultiDataSet>}

##### exportDirectory 
```java
public Builder exportDirectory(String exportDirectory) 
```


When {- link #rddTrainingApproach(RDDTrainingApproach)} is set to {- link RDDTrainingApproach#Export} (as it is by default)
the data is exported to a temporary directory first.

Default: null. -> use {hadoop.tmp.dir}/dl4j/. In this case, data is exported to {hadoop.tmp.dir}/dl4j/SOME_UNIQUE_ID/<br>
If you specify a directory, the directory {exportDirectory}/SOME_UNIQUE_ID/ will be used instead.

- param exportDirectory Base directory to export data

##### rngSeed 
```java
public Builder rngSeed(long rngSeed) 
```


Random number generator seed, used mainly for enforcing repeatable splitting on RDDs
Default: no seed set (i.e., random seed)

- param rngSeed RNG seed
- return

##### collectTrainingStats 
```java
public Builder collectTrainingStats(boolean collectTrainingStats)
```


Whether training stats collection should be enabled (disabled by default).
- see ParameterAveragingTrainingMaster#setCollectTrainingStats(boolean)
- see org.deeplearning4j.spark.stats.StatsUtils#exportStatsAsHTML(SparkTrainingStats, OutputStream)
- param collectTrainingStats


