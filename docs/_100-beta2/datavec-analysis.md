---
title: DataVec Analysis
short_title: Analysis
description: Gather statistics on datasets.
category: DataVec
weight: 2
---

## Analysis of data

Sometimes datasets are too large or too abstract in their format to manually analyze and estimate statistics on certain columns or patterns. DataVec comes with some helper utilities for performing a data analysis, and maximums, means, minimums, and other useful metrics.

## Using Spark for analysis

If you have loaded your data into Apache Spark, DataVec has a special `AnalyzeSpark` class which can generate histograms, collect statistics, and return information about the quality of the data. Assuming you have already loaded your data into a Spark RDD, pass the `JavaRDD` and `Schema` to the class.

If you are using DataVec in Scala and your data was loaded into a regular `RDD` class, you can convert it by calling `.toJavaRDD()` which returns a `JavaRDD`. If you need to convert it back, call `rdd()`.

The code below demonstrates some of many analyses for a 2D dataset in Spark analysis using the RDD `javaRdd` and the schema `mySchema`:

```java
import org.datavec.spark.transform.AnalyzeSpark;
import org.datavec.api.writable.Writable;
import org.datavec.api.transform.analysis.*;

int maxHistogramBuckets = 10
DataAnalysis analysis = AnalyzeSpark.analyze(mySchema, javaRdd, maxHistogramBuckets)

DataQualityAnalysis analysis = AnalyzeSpark.analyzeQuality(mySchema, javaRdd)

Writable max = AnalyzeSpark.max(javaRdd, "myColumn", mySchema)

int numSamples = 5
List<Writable> sample = AnalyzeSpark.sampleFromColumn(numSamples, "myColumn", mySchema, javaRdd)
```

Note that if you have sequence data, there are special methods for that as well:

```java
SequenceDataAnalysis seqAnalysis = AnalyzeSpark.analyzeSequence(mySchema, sequenceRdd)

List<Writable> uniqueSequence = AnalyzeSpark.getUniqueSequence("myColumn", seqSchema, sequenceRdd)
```

## Analyzing locally

The `AnalyzeLocal` class works very similarly to its Spark counterpart and has a similar API. Instead of passing an RDD, it accepts a `RecordReader` which allows it to iterate over the dataset.

```java
import org.datavec.local.transforms.AnalyzeLocal;

int maxHistogramBuckets = 10
DataAnalysis analysis = AnalyzeLocal.analyze(mySchema, csvRecordReader, maxHistogramBuckets)
```

## Utilities


---

### AnalyzeLocal
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-local/src/main/java/org/datavec/local/transforms/AnalyzeLocal.java) </span>

Analyse the specified data - returns a DataAnalysis object with summary information about each column


##### analyze 
```java
public static DataAnalysis analyze(Schema schema, RecordReader rr, int maxHistogramBuckets)
```


Analyse the specified data - returns a DataAnalysis object with summary information about each column

- param schema Schema for data
- param rr     Data to analyze
- return DataAnalysis for data

##### analyzeQualitySequence 
```java
public static DataQualityAnalysis analyzeQualitySequence(Schema schema, SequenceRecordReader data) 
```


Analyze the data quality of sequence data - provides a report on missing values, values that don't comply with schema, etc
- param schema Schema for data
- param data   Data to analyze
- return DataQualityAnalysis object

##### analyzeQuality 
```java
public static DataQualityAnalysis analyzeQuality(final Schema schema, final RecordReader data) 
```


Analyze the data quality of data - provides a report on missing values, values that don't comply with schema, etc
- param schema Schema for data
- param data   Data to analyze
- return DataQualityAnalysis object





---

### AnalyzeSpark
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-spark/src/main/java/org/datavec/spark/transform/AnalyzeSpark.java) </span>

AnalizeSpark: static methods for
analyzing and


##### analyzeSequence 
```java
public static SequenceDataAnalysis analyzeSequence(Schema schema, JavaRDD<List<List<Writable>>> data,
                    int maxHistogramBuckets) 
```



- param schema
- param data
- param maxHistogramBuckets
- return

##### analyze 
```java
public static DataAnalysis analyze(Schema schema, JavaRDD<List<Writable>> data) 
```


Analyse the specified data - returns a DataAnalysis object with summary information about each column

- param schema Schema for data
- param data   Data to analyze
- return       DataAnalysis for data

##### analyzeQualitySequence 
```java
public static DataQualityAnalysis analyzeQualitySequence(Schema schema, JavaRDD<List<List<Writable>>> data) 
```


Randomly sample values from a single column

- param count         Number of values to sample
- param columnName    Name of the column to sample from
- param schema        Schema
- param data          Data to sample from
- return              A list of random samples

##### analyzeQuality 
```java
public static DataQualityAnalysis analyzeQuality(final Schema schema, final JavaRDD<List<Writable>> data) 
```


Analyze the data quality of data - provides a report on missing values, values that don't comply with schema, etc
- param schema Schema for data
- param data   Data to analyze
- return DataQualityAnalysis object

##### min 
```java
public static Writable min(JavaRDD<List<Writable>> allData, String columnName, Schema schema)
```


Randomly sample a set of invalid values from a specified column.
Values are considered invalid according to the Schema / ColumnMetaData

- param numToSample    Maximum number of invalid values to sample
- param columnName     Same of the column from which to sample invalid values
- param schema         Data schema
- param data           Data
- return               List of invalid examples

##### max 
```java
public static Writable max(JavaRDD<List<Writable>> allData, String columnName, Schema schema)
```


Get the maximum value for the specified column

- param allData    All data
- param columnName Name of the column to get the minimum value for
- param schema     Schema of the data
- return           Maximum value for the column

