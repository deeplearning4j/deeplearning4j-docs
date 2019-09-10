---
title: DataVec Operations
short_title: Operations
description: Implementations for advanced transformation.
category: DataVec
weight: 3
---

## Usage

Operations, such as a `Function`, help execute transforms and load data into DataVec. The concept of operations is low-level, meaning that most of the time you will not need to worry about them.

## Loading data into Spark

If you're using Apache Spark, functions will iterate over the dataset and load it into a Spark `RDD` and convert the raw data format into a `Writable`.

```java
import org.datavec.api.writable.Writable;
import org.datavec.api.records.reader.impl.csv.CSVRecordReader;
import org.datavec.spark.transform.misc.StringToWritablesFunction;

SparkConf conf = new SparkConf();
JavaSparkContext sc = new JavaSparkContext(conf)

String customerInfoPath = new ClassPathResource("CustomerInfo.csv").getFile().getPath();
JavaRDD<List<Writable>> customerInfo = sc.textFile(customerInfoPath).map(new StringToWritablesFunction(rr));
```

The above code loads a CSV file into a 2D java RDD. Once your RDD is loaded, you can transform it, perform joins and use reducers to wrangle the data any way you want.

## Available ops


---

### AggregableCheckingOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/AggregableCheckingOp.java) </span>


Created by huitseeker on 5/8/17.




---

### AggregableMultiOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/AggregableMultiOp.java) </span>


It is used to execute many reduction operations in parallel on the same column, datavec#238

Created by huitseeker on 5/8/17.




---

### ByteWritableOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/ByteWritableOp.java) </span>

supports a conversion to Byte.

Created by huitseeker on 5/14/17.




---

### DispatchOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/DispatchOp.java) </span>



Created by huitseeker on 5/14/17.




---

### DispatchWithConditionOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/DispatchWithConditionOp.java) </span>

before dispatching the appropriate column of this element to its operation.


Created by huitseeker on 5/14/17.




---

### DoubleWritableOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/DoubleWritableOp.java) </span>

supports a conversion to Double.

Created by huitseeker on 5/14/17.




---

### FloatWritableOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/FloatWritableOp.java) </span>

supports a conversion to Float.

Created by huitseeker on 5/14/17.




---

### IntWritableOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/IntWritableOp.java) </span>

supports a conversion to Integer.

Created by huitseeker on 5/14/17.




---

### LongWritableOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/LongWritableOp.java) </span>

supports a conversion to Long.

Created by huitseeker on 5/14/17.




---

### StringWritableOp
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/ops/StringWritableOp.java) </span>

supports a conversion to TextWritable.
Created by huitseeker on 5/14/17.




---

### CalculateSortedRank
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/rank/CalculateSortedRank.java) </span>

CalculateSortedRank: calculate the rank of each example, after sorting example.
For example, we might have some numerical "score" column, and we want to know for the rank (sort order) for each
example, according to that column.<br>
The rank of each example (after sorting) will be added in a new Long column. Indexing is done from 0; examples will have
values 0 to dataSetSize - 1.<br>

Currently, CalculateSortedRank can only be applied on standard (i.e., non-sequence) data.
Furthermore, the current implementation can only sort on one column


##### transform 
```java
public Schema transform(Schema inputSchema) 
```



- param newColumnName    Name of the new column (will contain the rank for each example)
- param sortOnColumn     Name of the column to sort on
- param comparator       Comparator used to sort examples

##### outputColumnName 
```java
public String outputColumnName() 
```


The output column name
after the operation has been applied

- return the output column name

##### columnName 
```java
public String columnName() 
```


The output column names
This will often be the same as the input

- return the output column names

