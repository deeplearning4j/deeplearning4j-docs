---
title: DataVec Executors
short_title: Executors
description: Execute ETL and vectorization in a local instance.
category: DataVec
weight: 3
---

## Local or remote execution?

Because datasets are commonly large by nature, you can decide on an execution mechanism that best suits your needs. For example, if you are vectorizing a large training dataset, you can process it in a distributed Spark cluster. However, if you need to do real-time inference, DataVec also provides a local executor that doesn't require any additional setup.

## Executing a transform process

Once you've created your `TransformProcess` using your `Schema`, and you've either loaded your dataset into a Apache Spark `JavaRDD` or have a `RecordReader` that load your dataset, you can execute a transform.

Locally this looks like:

```java
import org.datavec.local.transforms.LocalTransformExecutor;

List<List<Writable>> transformed = LocalTransformExecutor.execute(recordReader, transformProcess)

List<List<List<Writable>>> transformedSeq = LocalTransformExecutor.executeToSequence(sequenceReader, transformProcess)

List<List<Writable>> joined = LocalTransformExecutor.executeJoin(join, leftReader, rightReader)
```

When using Spark this looks like:

```java
import org.datavec.spark.transforms.SparkTransformExecutor;

JavaRDD<List<Writable>> transformed = SparkTransformExecutor.execute(inputRdd, transformProcess)

JavaRDD<List<List<Writable>>> transformedSeq = SparkTransformExecutor.executeToSequence(inputSequenceRdd, transformProcess)

JavaRDD<List<Writable>> joined = SparkTransformExecutor.executeJoin(join, leftRdd, rightRdd)
```

## Available executors


---

### LocalTransformExecutor
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-local/src/main/java/org/datavec/local/transforms/LocalTransformExecutor.java) </span>

Local transform executor

##### isTryCatch 
```java
public static boolean isTryCatch() 
```


Execute the specified TransformProcess with the given input data<br>
Note: this method can only be used if the TransformProcess returns non-sequence data. For TransformProcesses
that return a sequence, use {- link #executeToSequence(List, TransformProcess)}

- param inputWritables   Input data to process
- param transformProcess TransformProcess to execute
- return Processed data





---

### SparkTransformExecutor
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-spark/src/main/java/org/datavec/spark/transform/SparkTransformExecutor.java) </span>

Execute a datavec
transform process
on spark rdds.


##### isTryCatch 
```java
public static boolean isTryCatch() 
```


- deprecated Use static methods instead of instance methods on SparkTransformExecutor

