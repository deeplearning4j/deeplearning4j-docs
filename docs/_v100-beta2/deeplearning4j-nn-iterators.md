---
title: Deeplearning4j Iterators
short_title: Iterators
description: Data iteration tools for loading into neural networks.
category: Models
weight: 5
---

## What is an iterator?

A dataset iterator allows for easy loading of data into neural networks and help organize batching, conversion, and masking. The iterators included in Eclipse Deeplearning4j help with either user-provided data, or automatic loading of common benchmarking datasets such as MNIST and IRIS.

## Usage

For most use cases, initializing an iterator and passing a reference to a `MultiLayerNetwork` or `ComputationGraph` `fit()` method is all you need to begin a task for training:

```java
MultiLayerNetwork model = new MultiLayerNetwork(conf);
model.init();

// pass an MNIST data iterator that automatically fetches data
DataSetIterator mnistTrain = new MnistDataSetIterator(batchSize, true, rngSeed);
net.fit(mnistTrain);
```

## Available iterators

### CifarDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//CifarDataSetIterator.java) </span>

CifarDataSetIterator is an iterator for Cifar10 dataset explicitly

There is a special preProcessor used to normalize the dataset based on Sergey Zagoruyko example
https://github.com/szagoruyko/cifar.torch

##### CifarDataSetIterator 
```java
public CifarDataSetIterator(int batchSize, int numExamples) 
```


Loads images with given  batchSize & numExamples returned by the generator.


##### next 
```java
public DataSet next(int batchSize) 
```


Loads images with given  batchSize, numExamples, & version returned by the generator.




### EmnistDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//EmnistDataSetIterator.java) </span>

EMNIST DataSetIterator<br>
<ul>
<li>COMPLETE: Also known as 'ByClass' split. 814,255 examples total (train + test), 62 classes</li>
<li>MERGE: Also known as 'ByMerge' split. 814,255 examples total. 47 unbalanced classes. Combines lower and upper
case characters (that are difficult to distinguish) into one class for each letter (instead of 2), for letters
C, I, J, K, L, M, O, P, S, U, V, W, X, Y and Z </li>
<li>BALANCED: 131,600 examples total. 47 classes (equal number of examples in each class)</li>
<li>LETTERS: 145,600 examples total. 26 balanced classes</li>
<li>DIGITS: 280,000 examples total. 10 balanced classes</li>
<li>MNIST: 70,000 examples total. 10 balanced classes. Equivalent to the original MNIST dataset in
</ul>
<br>
See: <a href="https://www.nist.gov/itl/iad/image-group/emnist-dataset">
https://www.nist.gov/itl/iad/image-group/emnist-dataset</a> and
<a href="https://arxiv.org/abs/1702.05373">https://arxiv.org/abs/1702.05373</a>


##### EmnistDataSetIterator 
```java
public EmnistDataSetIterator(Set dataSet, int batch, boolean train) throws IOException 
```


EMNIST dataset has multiple different subsets. See {- link EmnistDataSetIterator} Javadoc for details.


##### numExamplesTrain 
```java
public static int numExamplesTrain(Set dataSet) 
```


Get the number of training examples for the specified subset

- param dataSet Subset to get
- return Number of examples for the specified subset

##### numExamplesTest 
```java
public static int numExamplesTest(Set dataSet) 
```


Get the number of test examples for the specified subset

- param dataSet Subset to get
- return Number of examples for the specified subset

##### numLabels 
```java
public static int numLabels(Set dataSet) 
```


Get the number of labels for the specified subset

- param dataSet Subset to get
- return Number of labels for the specified subset

##### isBalanced 
```java
public static boolean isBalanced(Set dataSet) 
```


Get the labels as a character array

- return Labels




### UciSequenceDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//UciSequenceDataSetIterator.java) </span>

UCI synthetic control chart time series dataset. This dataset is useful for classification of univariate
time series with six categories:
Normal, Cyclic, Increasing trend, Decreasing trend, Upward shift, Downward shift

Details:     https://archive.ics.uci.edu/ml/datasets/Synthetic+Control+Chart+Time+Series
Data:        https://archive.ics.uci.edu/ml/machine-learning-databases/synthetic_control-mld/synthetic_control.data
Image:       https://archive.ics.uci.edu/ml/machine-learning-databases/synthetic_control-mld/data.jpeg




### LFWDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//LFWDataSetIterator.java) </span>

Create LFW data specific iterator




### MnistDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//MnistDataSetIterator.java) </span>

Mnist data applyTransformToDestination iterator.



### IrisDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//IrisDataSetIterator.java) </span>



##### IrisDataSetIterator 
```java
public IrisDataSetIterator(int batch, int numExamples) 
```


IrisDataSetIterator handles
traversing through the Iris Data Set.
- see <a href="https://archive.ics.uci.edu/ml/datasets/Iris">https://archive.ics.uci.edu/ml/datasets/Iris</a>


Typical usage of an iterator is akin to:

DataSetIterator iter = ..;

while(iter.hasNext()) {
DataSet d = iter.next();
//iterate network...
}


For custom numbers of examples/batch sizes you can call:

iter.next(num)

where num is the number of examples to fetch





### TinyImageNetDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl//TinyImageNetDataSetIterator.java) </span>

Tiny ImageNet is a subset of the ImageNet database. TinyImageNet is the default course challenge for CS321n
at Stanford University.

Tiny ImageNet has 200 classes, each consisting of 500 training images.

See: <a href="http://cs231n.stanford.edu/">http://cs231n.stanford.edu/</a> and
<a href="https://tiny-imagenet.herokuapp.com/">https://tiny-imagenet.herokuapp.com/</a>


##### TinyImageNetDataSetIterator 
```java
public TinyImageNetDataSetIterator(int batchSize, int[] imgDim, DataSetType set,
                                       ImageTransform imageTransform, long rngSeed) 
```


Get the Tiny ImageNet iterator with specified train/test set and custom transform.

- param batchSize Size of each patch
- param imgDim Dimensions of desired output - for example, {64, 64}
- param set Train, test, or validation
- param imageTransform Additional image transform for output
- param rngSeed random number generator seed to use when shuffling examples




### SequenceRecordReaderDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datavec-iterators/src/main/java/org/deeplearning4j/datasets/datavec//SequenceRecordReaderDataSetIterator.java) </span>

Sequence record reader data set iterator
Given a record reader (and optionally another record reader for the labels) generate time series (sequence) data sets.<br>
Supports padding for one-to-many and many-to-one type data loading (i.e., with different number of inputs vs.


##### SequenceRecordReaderDataSetIterator 
```java
public SequenceRecordReaderDataSetIterator(SequenceRecordReader featuresReader, SequenceRecordReader labels,
                    int miniBatchSize, int numPossibleLabels) 
```


Constructor where features and labels come from different RecordReaders (for example, different files),
and labels are for classification.

- param featuresReader       SequenceRecordReader for the features
- param labels               Labels: assume single value per time step, where values are integers in the range 0 to numPossibleLables-1
- param miniBatchSize        Minibatch size for each call of next()
- param numPossibleLabels    Number of classes for the labels


##### hasNext 
```java
public boolean hasNext() 
```


Constructor where features and labels come from different RecordReaders (for example, different files)

##### loadFromMetaData 
```java
public DataSet loadFromMetaData(RecordMetaData recordMetaData) throws IOException 
```


Load a single sequence example to a DataSet, using the provided RecordMetaData.
Note that it is more efficient to load multiple instances at once, using {- link #loadFromMetaData(List)}

- param recordMetaData RecordMetaData to load from. Should have been produced by the given record reader
- return DataSet with the specified example
- throws IOException If an error occurs during loading of the data

##### loadFromMetaData 
```java
public DataSet loadFromMetaData(List<RecordMetaData> list) throws IOException 
```


Load a multiple sequence examples to a DataSet, using the provided RecordMetaData instances.

- param list List of RecordMetaData instances to load from. Should have been produced by the record reader provided
to the SequenceRecordReaderDataSetIterator constructor
- return DataSet with the specified examples
- throws IOException If an error occurs during loading of the data




### RecordReaderMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datavec-iterators/src/main/java/org/deeplearning4j/datasets/datavec//RecordReaderMultiDataSetIterator.java) </span>

The idea: generate multiple inputs and multiple outputs from one or more Sequence/RecordReaders. Inputs and outputs
may be obtained from subsets of the RecordReader and SequenceRecordReaders columns (for examples, some inputs and outputs
as different columns in the same record/sequence); it is also possible to mix different types of data (for example, using both
RecordReaders and SequenceRecordReaders in the same RecordReaderMultiDataSetIterator).<br>
inputs and subsets.


##### RecordReaderMultiDataSetIterator 
```java
public RecordReaderMultiDataSetIterator build() 
```


When dealing with time series data of different lengths, how should we align the input/labels time series?
For equal length: use EQUAL_LENGTH
For sequence classification: use ALIGN_END


##### loadFromMetaData 
```java
public MultiDataSet loadFromMetaData(RecordMetaData recordMetaData) throws IOException 
```


Load a single example to a DataSet, using the provided RecordMetaData.
Note that it is more efficient to load multiple instances at once, using {- link #loadFromMetaData(List)}

- param recordMetaData RecordMetaData to load from. Should have been produced by the given record reader
- return DataSet with the specified example
- throws IOException If an error occurs during loading of the data

##### loadFromMetaData 
```java
public MultiDataSet loadFromMetaData(List<RecordMetaData> list) throws IOException 
```


Load a multiple sequence examples to a DataSet, using the provided RecordMetaData instances.

- param list List of RecordMetaData instances to load from. Should have been produced by the record reader provided
to the SequenceRecordReaderDataSetIterator constructor
- return DataSet with the specified examples
- throws IOException If an error occurs during loading of the data




### RecordReaderDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datavec-iterators/src/main/java/org/deeplearning4j/datasets/datavec//RecordReaderDataSetIterator.java) </span>

DataSet objects as well as producing minibatches from individual records.<br>
<br>
<br>
Example 1: Image classification, batch size 32, 10 classes<br>
<pre>
rr.initialize(new FileSplit(new File("/path/to/directory")));

DataSetIterator iter = new RecordReaderDataSetIterator.Builder(rr, 32)
//Label index (first arg): Always value 1 when using ImageRecordReader. For CSV etc: use index of the column
//  that contains the label (should contain an integer value, 0 to nClasses-1 inclusive). Column indexes start
// at 0. Number of classes (second arg): number of label classes (i.e., 10 for MNIST - 10 digits)
.classification(1, nClasses)
.preProcessor(new ImagePreProcessingScaler())      //For normalization of image values 0-255 to 0-1
.build()
}
</pre>
<br>
<br>
Example 2: Multi-output regression from CSV, batch size 128<br>
<pre>
rr.initialize(new FileSplit(new File("/path/to/myCsv.txt")));

DataSetIterator iter = new RecordReaderDataSetIterator.Builder(rr, 128)
//Specify the columns that the regression labels/targets appear in. Note that all other columns will be
// treated as features. Columns indexes start at 0
.regression(labelColFrom, labelColTo)
.build()
}
</pre>

##### RecordReaderDataSetIterator 
```java
public RecordReaderDataSetIterator(RecordReader recordReader, int batchSize) 
```


Constructor for classification, where:<br>
(a) the label index is assumed to be the very last Writable/column, and<br>
(b) the number of classes is inferred from RecordReader.getLabels()<br>
Note that if RecordReader.getLabels() returns null, no output labels will be produced

- param recordReader Record reader to use as the source of data
- param batchSize    Minibatch size, for each call of .next()


##### setCollectMetaData 
```java
public void setCollectMetaData(boolean collectMetaData) 
```


Main constructor for classification. This will convert the input class index (at position labelIndex, with integer
values 0 to numPossibleLabels-1 inclusive) to the appropriate one-hot output/labels representation.

- param recordReader         RecordReader: provides the source of the data
- param batchSize            Batch size (number of examples) for the output DataSet objects
- param labelIndex           Index of the label Writable (usually an IntWritable), as obtained by recordReader.next()
- param numPossibleLabels    Number of classes (possible labels) for classification

##### loadFromMetaData 
```java
public DataSet loadFromMetaData(RecordMetaData recordMetaData) throws IOException 
```


Load a single example to a DataSet, using the provided RecordMetaData.
Note that it is more efficient to load multiple instances at once, using {- link #loadFromMetaData(List)}

- param recordMetaData RecordMetaData to load from. Should have been produced by the given record reader
- return DataSet with the specified example
- throws IOException If an error occurs during loading of the data

##### loadFromMetaData 
```java
public DataSet loadFromMetaData(List<RecordMetaData> list) throws IOException 
```


Load a multiple examples to a DataSet, using the provided RecordMetaData instances.

- param list List of RecordMetaData instances to load from. Should have been produced by the record reader provided
to the RecordReaderDataSetIterator constructor
- return DataSet with the specified examples
- throws IOException If an error occurs during loading of the data

##### writableConverter 
```java
public Builder writableConverter(WritableConverter converter)
```


Builder class for RecordReaderDataSetIterator

##### maxNumBatches 
```java
public Builder maxNumBatches(int maxNumBatches)
```


Optional argument, usually not used. If set, can be used to limit the maximum number of minibatches that
will be returned (between resets). If not set, will always return as many minibatches as there is data
available.

- param maxNumBatches Maximum number of minibatches per epoch / reset

##### regression 
```java
public Builder regression(int labelIndex)
```


Use this for single output regression (i.e., 1 output/regression target)

- param labelIndex Column index that contains the regression target (indexes start at 0)

##### regression 
```java
public Builder regression(int labelIndexFrom, int labelIndexTo)
```


Use this for multiple output regression (1 or more output/regression targets). Note that all regression
targets must be contiguous (i.e., positions x to y, without gaps)

- param labelIndexFrom Column index of the first regression target (indexes start at 0)
- param labelIndexTo   Column index of the last regression target (inclusive)

##### classification 
```java
public Builder classification(int labelIndex, int numClasses)
```


Use this for classification

- param labelIndex Index that contains the label index. Column (indexes start from 0) be an integer value,
and contain values 0 to numClasses-1
- param numClasses Number of label classes (i.e., number of categories/classes in the dataset)

##### preProcessor 
```java
public Builder preProcessor(DataSetPreProcessor preProcessor)
```


Optional arg. Allows the preprocessor to be set
- param preProcessor Preprocessor to use

##### collectMetaData 
```java
public Builder collectMetaData(boolean collectMetaData)
```


When set to true: metadata for  the current examples will be present in the returned DataSet.
Disabled by default.

- param collectMetaData Whether metadata should be collected or not




### WorkspacesShieldDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//WorkspacesShieldDataSetIterator.java) </span>

This iterator detaches/migrates DataSets coming out from backed DataSetIterator, thus providing "safe" DataSets.




### ExistingDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//ExistingDataSetIterator.java) </span>

This wrapper provides DataSetIterator interface to existing java Iterable<DataSet> and Iterator<DataSet>




### CombinedMultiDataSetPreProcessor
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//CombinedMultiDataSetPreProcessor.java) </span>

Combines various multidataset preprocessors
Applied in the order they are specified to in the builder

##### CombinedMultiDataSetPreProcessor 
```java
public CombinedMultiDataSetPreProcessor build() 
```


- param preProcessor to be added to list of preprocessors to be applied




### DataSetFetcher
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//DataSetFetcher.java) </span>

A low level interface for loading datasets in to memory.

This is used by an DataSetIterator to handle the specifics of loading data in to memory.




### AsyncDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//AsyncDataSetIterator.java) </span>

Async prefetching iterator wrapper for MultiDataSetIterator implementations


##### next 
```java
public DataSet next(int num) 
```


We want to ensure, that background thread will have the same thread->device affinity, as master thread

##### inputColumns 
```java
public int inputColumns() 
```


Input columns for the dataset

- return

##### totalOutcomes 
```java
public int totalOutcomes() 
```


The number of labels for the dataset

- return

##### resetSupported 
```java
public boolean resetSupported() 
```


Is resetting supported by this DataSetIterator? Many DataSetIterators do support resetting,
but some don't

- return true if reset method is supported; false otherwise

##### asyncSupported 
```java
public boolean asyncSupported() 
```


Does this DataSetIterator support asynchronous prefetching of multiple DataSet objects?
Most DataSetIterators do, but in some cases it may not make sense to wrap this iterator in an
iterator that does asynchronous prefetching. For example, it would not make sense to use asynchronous
prefetching for the following types of iterators:
(a) Iterators that store their full contents in memory already
(b) Iterators that re-use features/labels arrays (as future next() calls will overwrite past contents)
(c) Iterators that already implement some level of asynchronous prefetching
(d) Iterators that may return different data depending on when the next() method is called

- return true if asynchronous prefetching from this iterator is OK; false if asynchronous prefetching should not
be used with this iterator

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### shutdown 
```java
public void shutdown() 
```


We want to ensure, that background thread will have the same thread->device affinity, as master thread

##### batch 
```java
public int batch() 
```


Batch size

- return

##### setPreProcessor 
```java
public void setPreProcessor(DataSetPreProcessor preProcessor) 
```


Set a pre processor

- param preProcessor a pre processor to set

##### getPreProcessor 
```java
public DataSetPreProcessor getPreProcessor() 
```


Returns preprocessors, if defined

- return

##### hasNext 
```java
public boolean hasNext() 
```


Get dataset iterator record reader labels

##### next 
```java
public DataSet next() 
```


Returns the next element in the iteration.

- return the next element in the iteration

##### remove 
```java
public void remove() 
```


Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to {- link #next}.  The behavior of an iterator
is unspecified if the underlying collection is modified while the
iteration is in progress in any way other than by calling this
method.

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method
- implSpec The default implementation throws an instance of
{- link UnsupportedOperationException} and performs no other action.




### FileSplitDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//FileSplitDataSetIterator.java) </span>

Simple iterator working with list of files.
File -> DataSet conversion will be handled via provided FileCallback implementation




### AsyncShieldMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//AsyncShieldMultiDataSetIterator.java) </span>

This wrapper takes your existing MultiDataSetIterator implementation and prevents asynchronous prefetch


##### next 
```java
public MultiDataSet next(int num) 
```


Fetch the next 'num' examples. Similar to the next method, but returns a specified number of examples

- param num Number of examples to fetch

##### setPreProcessor 
```java
public void setPreProcessor(MultiDataSetPreProcessor preProcessor) 
```


Set the preprocessor to be applied to each MultiDataSet, before each MultiDataSet is returned.

- param preProcessor MultiDataSetPreProcessor. May be null.

##### resetSupported 
```java
public boolean resetSupported() 
```


Is resetting supported by this DataSetIterator? Many DataSetIterators do support resetting,
but some don't

- return true if reset method is supported; false otherwise

##### asyncSupported 
```java
public boolean asyncSupported() 
```


/
Does this DataSetIterator support asynchronous prefetching of multiple DataSet objects?

PLEASE NOTE: This iterator ALWAYS returns FALSE

- return true if asynchronous prefetching from this iterator is OK; false if asynchronous prefetching should not
be used with this iterator

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### hasNext 
```java
public boolean hasNext() 
```


Returns {- code true} if the iteration has more elements.
(In other words, returns {- code true} if {- link #next} would
return an element rather than throwing an exception.)

- return {- code true} if the iteration has more elements

##### next 
```java
public MultiDataSet next() 
```


Returns the next element in the iteration.

- return the next element in the iteration

##### remove 
```java
public void remove() 
```


Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to {- link #next}.  The behavior of an iterator
is unspecified if the underlying collection is modified while the
iteration is in progress in any way other than by calling this
method.

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method
- implSpec The default implementation throws an instance of
{- link UnsupportedOperationException} and performs no other action.




### DataSetIteratorSplitter
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//DataSetIteratorSplitter.java) </span>

This iterator virtually splits given MultiDataSetIterator into Train and Test parts.
I.e. you have 100000 examples. Your batch size is 32. That means you have 3125 total batches. With split ratio of 0.7 that will give you 2187 training batches, and 938 test batches.

PLEASE NOTE: You can't use Test iterator twice in a row. Train iterator should be used before Test iterator use.
PLEASE NOTE: You can't use this iterator, if underlying iterator uses randomization/shuffle between epochs.


##### DataSetIteratorSplitter 
```java
public DataSetIteratorSplitter(@NonNull DataSetIterator baseIterator, long totalBatches, double ratio) 
```


The only constructor

- param baseIterator - iterator to be wrapped and split
- param totalBatches - total batches in baseIterator
- param ratio - train/test split ratio


##### getTrainIterator 
```java
public DataSetIterator getTrainIterator() 
```


This method returns train iterator instance

- return

##### next 
```java
public DataSet next(int i) 
```


This method returns test iterator instance

- return




### IteratorMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//IteratorMultiDataSetIterator.java) </span>

A DataSetIterator that works on an Iterator<DataSet>, combining and splitting the input DataSet objects as
required to get a consistent batch size.

Typically used in Spark training, but may be used elsewhere.
NOTE: reset method is not supported here.



### EarlyTerminationMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//EarlyTerminationMultiDataSetIterator.java) </span>

Builds an iterator that terminates once the number of minibatches returned with .next() is equal to a specified number
Note that a call to .next(num) is counted as a call to return a minibatch regardless of the value of num
This essentially restricts the data to this specified number of minibatches.

##### EarlyTerminationMultiDataSetIterator 
```java
public EarlyTerminationMultiDataSetIterator(MultiDataSetIterator underlyingIterator, int terminationPoint) 
```


Constructor takes the iterator to wrap and the number of minibatches after which the call to hasNext()
will return false
- param underlyingIterator, iterator to wrap
- param terminationPoint, minibatches after which hasNext() will return false







### MultipleEpochsIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//MultipleEpochsIterator.java) </span>

A dataset iterator for doing multiple passes over a dataset

Use MultiLayerNetwork/ComputationGraph.fit(DataSetIterator, int numEpochs) instead

##### next 
```java
public DataSet next(int num) 
```


Like the standard next method but allows a
customizable number of examples returned

- param num the number of examples
- return the next data applyTransformToDestination

##### inputColumns 
```java
public int inputColumns() 
```


Input columns for the dataset

- return

##### totalOutcomes 
```java
public int totalOutcomes() 
```


The number of labels for the dataset

- return

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### batch 
```java
public int batch() 
```


Batch size

- return

##### hasNext 
```java
public boolean hasNext() 
```


Returns {- code true} if the iteration has more elements.
(In other words, returns {- code true} if {- link #next} would
return an element rather than throwing an exception.)

- return {- code true} if the iteration has more elements

##### remove 
```java
public void remove() 
```


Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to {- link #next}.  The behavior of an iterator
is unspecified if the underlying collection is modified while the
iteration is in progress in any way other than by calling this
method.

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method







### EarlyTerminationDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//EarlyTerminationDataSetIterator.java) </span>

Builds an iterator that terminates once the number of minibatches returned with .next() is equal to a specified number
Note that a call to .next(num) is counted as a call to return a minibatch regardless of the value of num
This essentially restricts the data to this specified number of minibatches.

##### EarlyTerminationDataSetIterator 
```java
public EarlyTerminationDataSetIterator(DataSetIterator underlyingIterator, int terminationPoint) 
```


Constructor takes the iterator to wrap and the number of minibatches after which the call to hasNext()
will return false
- param underlyingIterator, iterator to wrap
- param terminationPoint, minibatches after which hasNext() will return false




### ReconstructionDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//ReconstructionDataSetIterator.java) </span>

Wraps a data applyTransformToDestination iterator setting the first (feature matrix) as
the labels.


##### next 
```java
public DataSet next(int num) 
```


Like the standard next method but allows a
customizable number of examples returned

- param num the number of examples
- return the next data applyTransformToDestination

##### inputColumns 
```java
public int inputColumns() 
```


Input columns for the dataset

- return

##### totalOutcomes 
```java
public int totalOutcomes() 
```


The number of labels for the dataset

- return

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### batch 
```java
public int batch() 
```


Batch size

- return

##### hasNext 
```java
public boolean hasNext() 
```


Returns {- code true} if the iteration has more elements.
(In other words, returns {- code true} if {- link #next} would
return an element rather than throwing an exception.)

- return {- code true} if the iteration has more elements

##### next 
```java
public DataSet next() 
```


Returns the next element in the iteration.

- return the next element in the iteration

##### remove 
```java
public void remove() 
```


Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to {- link #next}.  The behavior of an iterator
is unspecified if the underlying collection is modified while the
iteration is in progress in any way other than by calling this
method.

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method




### JointMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//JointMultiDataSetIterator.java) </span>

This dataset iterator combines multiple DataSetIterators into 1 MultiDataSetIterator


##### next 
```java
public MultiDataSet next(int num) 
```


Fetch the next 'num' examples. Similar to the next method, but returns a specified number of examples

- param num Number of examples to fetch

##### setPreProcessor 
```java
public void setPreProcessor(MultiDataSetPreProcessor preProcessor) 
```


Set the preprocessor to be applied to each MultiDataSet, before each MultiDataSet is returned.

- param preProcessor MultiDataSetPreProcessor. May be null.

##### getPreProcessor 
```java
public MultiDataSetPreProcessor getPreProcessor() 
```


Get the {- link MultiDataSetPreProcessor}, if one has previously been set.
Returns null if no preprocessor has been set

- return Preprocessor

##### resetSupported 
```java
public boolean resetSupported() 
```


Is resetting supported by this DataSetIterator? Many DataSetIterators do support resetting,
but some don't

- return true if reset method is supported; false otherwise

##### asyncSupported 
```java
public boolean asyncSupported() 
```


Does this MultiDataSetIterator support asynchronous prefetching of multiple MultiDataSet objects?
Most MultiDataSetIterators do, but in some cases it may not make sense to wrap this iterator in an
iterator that does asynchronous prefetching. For example, it would not make sense to use asynchronous
prefetching for the following types of iterators:
(a) Iterators that store their full contents in memory already
(b) Iterators that re-use features/labels arrays (as future next() calls will overwrite past contents)
(c) Iterators that already implement some level of asynchronous prefetching
(d) Iterators that may return different data depending on when the next() method is called

- return true if asynchronous prefetching from this iterator is OK; false if asynchronous prefetching should not
be used with this iterator

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### hasNext 
```java
public boolean hasNext() 
```


Returns {- code true} if the iteration has more elements.
(In other words, returns {- code true} if {- link #next} would
return an element rather than throwing an exception.)

- return {- code true} if the iteration has more elements

##### next 
```java
public MultiDataSet next() 
```


Returns the next element in the iteration.

- return the next element in the iteration

##### remove 
```java
public void remove() 
```


PLEASE NOTE: This method is NOT implemented

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method
- implSpec The default implementation throws an instance of
{- link UnsupportedOperationException} and performs no other action.




### MovingWindowBaseDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//MovingWindowBaseDataSetIterator.java) </span>


DataSetIterator for moving window (rotating matrices)




### SamplingDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//SamplingDataSetIterator.java) </span>

A wrapper for a dataset to sample from.
This will randomly sample from the given dataset.

##### SamplingDataSetIterator 
```java
public SamplingDataSetIterator(DataSet sampleFrom, int batchSize, int totalNumberSamples) 
```







### RandomMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//RandomMultiDataSetIterator.java) </span>

RandomMultiDataSetIterator: Generates random values (or zeros, ones, integers, etc) according to some distribution.<br>
Note: This is typically used for testing, debugging and benchmarking purposes.


##### RandomMultiDataSetIterator 
```java
public RandomMultiDataSetIterator build()
```


- param numMiniBatches Number of minibatches per epoch


##### generate 
```java
public static INDArray generate(long[] shape, Values values) 
```


Generate a random array with the specified shape
- param shape  Shape of the array
- param values Values to fill the array with
- return Random array of specified shape + contents

##### generate 
```java
public static INDArray generate(long[] shape, char order, Values values)
```


Generate a random array with the specified shape and order
- param shape  Shape of the array
- param order  Order of array ('c' or 'f')
- param values Values to fill the array with
- return Random array of specified shape + contents




### MultiDataSetWrapperIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//MultiDataSetWrapperIterator.java) </span>

This class is simple wrapper that takes single-input MultiDataSets and converts them to DataSets on the fly

PLEASE NOTE: This only works if number of features/labels/masks is 1



### AsyncShieldDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//AsyncShieldDataSetIterator.java) </span>

This wrapper takes your existing DataSetIterator implementation and prevents asynchronous prefetch


##### next 
```java
public DataSet next(int num) 
```


Like the standard next method but allows a
customizable number of examples returned

- param num the number of examples
- return the next data applyTransformToDestination

##### inputColumns 
```java
public int inputColumns() 
```


Input columns for the dataset

- return

##### totalOutcomes 
```java
public int totalOutcomes() 
```


The number of labels for the dataset

- return

##### resetSupported 
```java
public boolean resetSupported() 
```


Is resetting supported by this DataSetIterator? Many DataSetIterators do support resetting,
but some don't

- return true if reset method is supported; false otherwise

##### asyncSupported 
```java
public boolean asyncSupported() 
```


Does this DataSetIterator support asynchronous prefetching of multiple DataSet objects?

PLEASE NOTE: This iterator ALWAYS returns FALSE

- return true if asynchronous prefetching from this iterator is OK; false if asynchronous prefetching should not
be used with this iterator

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### batch 
```java
public int batch() 
```


Batch size

- return

##### setPreProcessor 
```java
public void setPreProcessor(DataSetPreProcessor preProcessor) 
```


Set a pre processor

- param preProcessor a pre processor to set

##### getPreProcessor 
```java
public DataSetPreProcessor getPreProcessor() 
```


Returns preprocessors, if defined

- return

##### hasNext 
```java
public boolean hasNext() 
```


Get dataset iterator record reader labels

##### next 
```java
public DataSet next() 
```


Returns the next element in the iteration.

- return the next element in the iteration

##### remove 
```java
public void remove() 
```


Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to {- link #next}.  The behavior of an iterator
is unspecified if the underlying collection is modified while the
iteration is in progress in any way other than by calling this
method.

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method
- implSpec The default implementation throws an instance of
{- link UnsupportedOperationException} and performs no other action.




### IteratorDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//IteratorDataSetIterator.java) </span>

A DataSetIterator that works on an Iterator<DataSet>, combining and splitting the input DataSet objects as
required to get a consistent batch size.

Typically used in Spark training, but may be used elsewhere.
NOTE: reset method is not supported here.



### FloatsDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//FloatsDataSetIterator.java) </span>

float[] wrapper for DataSetIterator impementation.

This iterator creates DataSets out of externally-originated pairs of floats.




### CombinedPreProcessor
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//CombinedPreProcessor.java) </span>

This is special preProcessor, that allows to combine multiple prerpocessors, and apply them to data sequentially.


##### CombinedPreProcessor 
```java
public CombinedPreProcessor build() 
```


Pre process a dataset sequentially

- param toPreProcess the data set to pre process




### RandomDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//RandomDataSetIterator.java) </span>

RandomDataSetIterator: Generates random values (or zeros, ones, integers, etc) according to some distribution.<br>
Note: This is typically used for testing, debugging and benchmarking purposes.




### BaseDatasetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//BaseDatasetIterator.java) </span>

Baseline implementation includes
control over the data fetcher and some basic
getters for metadata




### DummyPreProcessor
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//DummyPreProcessor.java) </span>

This is special dummy preProcessor, that does nothing.


##### preProcess 
```java
public void preProcess(DataSet toPreProcess) 
```


Pre process a dataset

- param toPreProcess the data set to pre process




### MultiDataSetIteratorSplitter
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//MultiDataSetIteratorSplitter.java) </span>

This iterator virtually splits given MultiDataSetIterator into Train and Test parts.
I.e. you have 100000 examples. Your batch size is 32. That means you have 3125 total batches. With split ratio of 0.7 that will give you 2187 training batches, and 938 test batches.

PLEASE NOTE: You can't use Test iterator twice in a row. Train iterator should be used before Test iterator use.
PLEASE NOTE: You can't use this iterator, if underlying iterator uses randomization/shuffle between epochs.


##### MultiDataSetIteratorSplitter 
```java
public MultiDataSetIteratorSplitter(@NonNull MultiDataSetIterator baseIterator, long totalBatches, double ratio) 
```



- param baseIterator
- param totalBatches - total number of batches in underlying iterator. this value will be used to determine number of test/train batches
- param ratio - this value will be used as splitter. should be between in range of 0.0 > X < 1.0. I.e. if value 0.7 is provided, then 70% of total examples will be used for training, and 30% of total examples will be used for testing


##### getTrainIterator 
```java
public MultiDataSetIterator getTrainIterator() 
```


This method returns train iterator instance

- return

##### next 
```java
public MultiDataSet next(int num) 
```


This method returns test iterator instance

- return




### AsyncMultiDataSetIterator
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator//AsyncMultiDataSetIterator.java) </span>

Async prefetching iterator wrapper for MultiDataSetIterator implementations


##### next 
```java
public MultiDataSet next(int num) 
```


We want to ensure, that background thread will have the same thread->device affinity, as master thread

##### setPreProcessor 
```java
public void setPreProcessor(MultiDataSetPreProcessor preProcessor) 
```


Set the preprocessor to be applied to each MultiDataSet, before each MultiDataSet is returned.

- param preProcessor MultiDataSetPreProcessor. May be null.

##### resetSupported 
```java
public boolean resetSupported() 
```


Is resetting supported by this DataSetIterator? Many DataSetIterators do support resetting,
but some don't

- return true if reset method is supported; false otherwise

##### asyncSupported 
```java
public boolean asyncSupported() 
```


Does this DataSetIterator support asynchronous prefetching of multiple DataSet objects?
Most DataSetIterators do, but in some cases it may not make sense to wrap this iterator in an
iterator that does asynchronous prefetching. For example, it would not make sense to use asynchronous
prefetching for the following types of iterators:
(a) Iterators that store their full contents in memory already
(b) Iterators that re-use features/labels arrays (as future next() calls will overwrite past contents)
(c) Iterators that already implement some level of asynchronous prefetching
(d) Iterators that may return different data depending on when the next() method is called

- return true if asynchronous prefetching from this iterator is OK; false if asynchronous prefetching should not
be used with this iterator

##### reset 
```java
public void reset() 
```


Resets the iterator back to the beginning

##### shutdown 
```java
public void shutdown() 
```


We want to ensure, that background thread will have the same thread->device affinity, as master thread

##### hasNext 
```java
public boolean hasNext() 
```


Returns {- code true} if the iteration has more elements.
(In other words, returns {- code true} if {- link #next} would
return an element rather than throwing an exception.)

- return {- code true} if the iteration has more elements

##### next 
```java
public MultiDataSet next() 
```


Returns the next element in the iteration.

- return the next element in the iteration

##### remove 
```java
public void remove() 
```


Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to {- link #next}.  The behavior of an iterator
is unspecified if the underlying collection is modified while the
iteration is in progress in any way other than by calling this
method.

- throws UnsupportedOperationException if the {- code remove}
operation is not supported by this iterator
- throws IllegalStateException         if the {- code next} method has not
yet been called, or the {- code remove} method has already
been called after the last call to the {- code next}
method
- implSpec The default implementation throws an instance of
{- link UnsupportedOperationException} and performs no other action.




### MultiDataSetIteratorAdapter
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/datasets/iterator/impl/MultiDataSetIteratorAdapter.java) </span>

Iterator that adapts a DataSetIterator to a MultiDataSetIterator

