---
title: DataVec Readers
short_title: Readers
description: Read individual records from different formats.
category: DataVec
weight: 2
---

## Why readers?

Readers iterate records from a dataset in storage and load the data into DataVec. The usefulness of readers beyond individual entries in a dataset includes: what if you wanted to train a text generator on a corpus? Or programmatically compose two entries together to form a new record? Reader implementations are useful for complex file types or distributed storage mechanisms.

Readers return `Writable` classes that describe each column in a `Record`. These classes are used to convert each record to a tensor/ND-Array format.

## Usage

Each reader implementation extends `BaseRecordReader` and provides a simple API for selecting the next record in a dataset, acting similarly to iterators.

Useful methods include:

- `next`: Return a batch of `Writable`.
- `nextRecord`: Return a single `Record`, optionally with `RecordMetaData`.
- `reset`: Reset the underlying iterator.
- `hasNext`: Iterator method to determine if another record is available.

## Listeners

You can hook a custom `RecordListener` to a record reader for debugging or visualization purposes. Pass your custom listener to the `addListener` base method immediately after initializing your class.

## Types of readers

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/ComposableRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/ComposableRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/ComposableRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(InputSplit split) throws IOException, InterruptedException 
```


RecordReader for each pipeline. Individual record is a concatenation of the two collections.
Create a recordreader that takes recordreaders and iterates over them and concatenates them
hasNext would be the & of all the recordreaders
concatenation would be next & addAll on the collection
return one record


</div></div>


### ConcatenatingRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/ConcatenatingRecordReader.java) </span>

Combine multiple readers into a single reader. Records are read sequentially - thus if the first reader has
100 records, and the second reader has 200 records, ConcatenatingRecordReader will have 300 records.





### FileRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/FileRecordReader.java) </span>

File reader/writer


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/FileRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/FileRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/FileRecordReader"><div class="card card-body">

#### getCurrentLabel 
```java
public int getCurrentLabel() 
```


Return the current label.
The index of the current file's parent directory
in the label list
- return The index of the current file's parent directory


</div></div>


### LineRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/LineRecordReader.java) </span>

Reads files line by line




### CollectionRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/CollectionRecordReader.java) </span>

Collection record reader.
Mainly used for testing.




### CollectionSequenceRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/CollectionSequenceRecordReader.java) </span>

Collection record reader for sequences.
Mainly used for testing.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/CollectionSequenceRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/CollectionSequenceRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/CollectionSequenceRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(InputSplit split) throws IOException, InterruptedException 
```



- param records    Collection of sequences. For example, List<List<List<Writable>>> where the inner  two lists
are a sequence, and the outer list/collection is a list of sequences


</div></div>


### ListStringRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/ListStringRecordReader.java) </span>

Iterates through a list of strings return a record.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/ListStringRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/ListStringRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/collection/ListStringRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(InputSplit split) throws IOException, InterruptedException 
```


Called once at initialization.

- param split the split that defines the range of records to read
- throws IOException
- throws InterruptedException

#### initialize 
```java
public void initialize(Configuration conf, InputSplit split) throws IOException, InterruptedException 
```


Called once at initialization.

- param conf  a configuration for initialization
- param split the split that defines the range of records to read
- throws IOException
- throws InterruptedException

#### hasNext 
```java
public boolean hasNext() 
```


Get the next record

- return The list of next record

#### reset 
```java
public void reset() 
```


List of label strings

- return

#### nextRecord 
```java
public Record nextRecord() 
```


Load the record from the given DataInputStream
Unlike {- link #next()} the internal state of the RecordReader is not modified
Implementations of this method should not close the DataInputStream

- param uri
- param dataInputStream
- throws IOException if error occurs during reading from the input stream

#### close 
```java
public void close() throws IOException 
```


Closes this stream and releases any system resources associated
with it. If the stream is already closed then invoking this
method has no effect.

As noted in {- link AutoCloseable#close()}, cases where the
close may fail require careful attention. It is strongly advised
to relinquish the underlying resources and to internally
<em>mark</em> the {- code Closeable} as closed, prior to throwing
the {- code IOException}.

- throws IOException if an I/O error occurs

#### setConf 
```java
public void setConf(Configuration conf) 
```


Set the configuration to be used by this object.

- param conf

#### getConf 
```java
public Configuration getConf() 
```


Return the configuration used by this object.


</div></div>


### CSVRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVRecordReader.java) </span>

Simple csv record reader.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(Configuration conf, InputSplit split) throws IOException, InterruptedException 
```


Skip first n lines
- param skipNumLines the number of lines to skip


</div></div>


### CSVRegexRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVRegexRecordReader.java) </span>

A CSVRecordReader that can split
each column into additional columns using regexs.




### CSVSequenceRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVSequenceRecordReader.java) </span>

CSV Sequence Record Reader
This reader is intended to read sequences of data in CSV format, where
each sequence is defined in its own file (and there are multiple files)
Each line in the file represents one time step



### CSVVariableSlidingWindowRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVVariableSlidingWindowRecordReader.java) </span>

A sliding window of variable size across an entire CSV.

In practice the sliding window size starts at 1, then linearly increase to maxLinesPer sequence, then
linearly decrease back to 1.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVVariableSlidingWindowRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVVariableSlidingWindowRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVVariableSlidingWindowRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(Configuration conf, InputSplit split) throws IOException, InterruptedException 
```


No-arg constructor with the default number of lines per sequence (10)


</div></div>


### LibSvmRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/misc/LibSvmRecordReader.java) </span>

Record reader for libsvm format, which is closely
related to SVMLight format. Similar to scikit-learn
we use a single reader for both formats, so this class
is a subclass of SVMLightRecordReader.


Further details on the format can be found at
- http://svmlight.joachims.org
- http://www.csie.ntu.edu.tw/~cjlin/libsvmtools/datasets/multilabel.html
- http://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_svmlight_file.html




### MatlabRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/misc/MatlabRecordReader.java) </span>

Matlab record reader




### SVMLightRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/misc/SVMLightRecordReader.java) </span>

Record reader for SVMLight format, which can generally
be described as

LABEL INDEX:VALUE INDEX:VALUE ...

SVMLight format is well-suited to sparse data (e.g.,
bag-of-words) because it omits all features with value
zero.

We support an "extended" version that allows for multiple
targets (or labels) separated by a comma, as follows:

LABEL1,LABEL2,... INDEX:VALUE INDEX:VALUE ...

This can be used to represent either multitask problems or
multilabel problems with sparse binary labels (controlled
via the "MULTILABEL" configuration option).

Like scikit-learn, we support both zero-based and one-based indexing.

Further details on the format can be found at
- http://svmlight.joachims.org
- http://www.csie.ntu.edu.tw/~cjlin/libsvmtools/datasets/multilabel.html
- http://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_svmlight_file.html


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/misc/SVMLightRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/misc/SVMLightRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/misc/SVMLightRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(Configuration conf, InputSplit split) throws IOException, InterruptedException 
```


Must be called before attempting to read records.

- param conf          DataVec configuration
- param split         FileSplit
- throws IOException
- throws InterruptedException

#### setConf 
```java
public void setConf(Configuration conf) 
```


Set configuration.

- param conf          DataVec configuration
- throws IOException
- throws InterruptedException

#### hasNext 
```java
public boolean hasNext() 
```


Helper function to help detect lines that are
commented out. May read ahead and cache a line.

- return

#### nextRecord 
```java
public Record nextRecord() 
```


Return next record as list of Writables.

- return


</div></div>


### RegexLineRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/regex/RegexLineRecordReader.java) </span>

RegexLineRecordReader: Read a file, one line at a time, and split it into fields using a regex.
To load an entire file using a

Example: Data in format "2016-01-01 23:59:59.001 1 DEBUG First entry message!"<br>
using regex String "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d{3}) (\\d+) ([A-Z]+) (.)"<br>
would be split into 4 Text writables: ["2016-01-01 23:59:59.001", "1", "DEBUG", "First entry message!"]




### RegexSequenceRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/regex/RegexSequenceRecordReader.java) </span>

RegexSequenceRecordReader: Read an entire file (as a sequence), one line at a time and
split each line into fields using a regex.

Example: Data in format "2016-01-01 23:59:59.001 1 DEBUG First entry message!"<br>
using regex String "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d{3}) (\\d+) ([A-Z]+) (.)"<br>
would be split into 4 Text writables: ["2016-01-01 23:59:59.001", "1", "DEBUG", "First entry message!"]<br>

lines that don't match the provided regex can result in an exception (FailOnInvalid), can be skipped silently (SkipInvalid),
or skip invalid but log a warning (SkipInvalidWithWarning)




### TransformProcessRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessRecordReader.java) </span>

to have a transform process applied before being returned.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(InputSplit split) throws IOException, InterruptedException 
```


Called once at initialization.

- param split the split that defines the range of records to read
- throws IOException
- throws InterruptedException

#### initialize 
```java
public void initialize(Configuration conf, InputSplit split) throws IOException, InterruptedException 
```


Called once at initialization.

- param conf  a configuration for initialization
- param split the split that defines the range of records to read
- throws IOException
- throws InterruptedException

#### hasNext 
```java
public boolean hasNext() 
```


Get the next record

- return

#### reset 
```java
public void reset() 
```


List of label strings

- return

#### nextRecord 
```java
public Record nextRecord() 
```


Load the record from the given DataInputStream
Unlike {- link #next()} the internal state of the RecordReader is not modified
Implementations of this method should not close the DataInputStream

- param uri
- param dataInputStream
- throws IOException if error occurs during reading from the input stream

#### loadFromMetaData 
```java
public Record loadFromMetaData(RecordMetaData recordMetaData) throws IOException 
```


Load a single record from the given {- link RecordMetaData} instance<br>
Note: that for data that isn't splittable (i.e., text data that needs to be scanned/split), it is more efficient to
load multiple records at once using {- link #loadFromMetaData(List)}

- param recordMetaData Metadata for the record that we want to load from
- return Single record for the given RecordMetaData instance
- throws IOException If I/O error occurs during loading

#### setListeners 
```java
public void setListeners(RecordListener... listeners) 
```


Load multiple records from the given a list of {- link RecordMetaData} instances<br>

- param recordMetaDatas Metadata for the records that we want to load from
- return Multiple records for the given RecordMetaData instances
- throws IOException If I/O error occurs during loading

#### setListeners 
```java
public void setListeners(Collection<RecordListener> listeners) 
```


Set the record listeners for this record reader.

- param listeners

#### close 
```java
public void close() throws IOException 
```


Closes this stream and releases any system resources associated
with it. If the stream is already closed then invoking this
method has no effect.

As noted in {- link AutoCloseable#close()}, cases where the
close may fail require careful attention. It is strongly advised
to relinquish the underlying resources and to internally
<em>mark</em> the {- code Closeable} as closed, prior to throwing
the {- code IOException}.

- throws IOException if an I/O error occurs

#### setConf 
```java
public void setConf(Configuration conf) 
```


Set the configuration to be used by this object.

- param conf

#### getConf 
```java
public Configuration getConf() 
```


Return the configuration used by this object.


</div></div>


### TransformProcessSequenceRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessSequenceRecordReader.java) </span>

to be transformed before being returned.


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessSequenceRecordReader" aria-expanded="false" aria-controls="datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessSequenceRecordReader">Show methods</button>
<div class="collapse" id="datavec-api/src/main/java/org/datavec/api/records/reader/impl/transform/TransformProcessSequenceRecordReader"><div class="card card-body">

#### setConf 
```java
public void setConf(Configuration conf) 
```


Set the configuration to be used by this object.

- param conf

#### getConf 
```java
public Configuration getConf() 
```


Return the configuration used by this object.

#### batchesSupported 
```java
public boolean batchesSupported() 
```


Returns a sequence record.

- return a sequence of records

#### nextSequence 
```java
public SequenceRecord nextSequence() 
```


Load a sequence record from the given DataInputStream
Unlike {- link #next()} the internal state of the RecordReader is not modified
Implementations of this method should not close the DataInputStream

- param uri
- param dataInputStream
- throws IOException if error occurs during reading from the input stream

#### loadSequenceFromMetaData 
```java
public SequenceRecord loadSequenceFromMetaData(RecordMetaData recordMetaData) throws IOException 
```


Load a single sequence record from the given {- link RecordMetaData} instance<br>
Note: that for data that isn't splittable (i.e., text data that needs to be scanned/split), it is more efficient to
load multiple records at once using {- link #loadSequenceFromMetaData(List)}

- param recordMetaData Metadata for the sequence record that we want to load from
- return Single sequence record for the given RecordMetaData instance
- throws IOException If I/O error occurs during loading

#### initialize 
```java
public void initialize(InputSplit split) throws IOException, InterruptedException 
```


Load multiple sequence records from the given a list of {- link RecordMetaData} instances<br>

- param recordMetaDatas Metadata for the records that we want to load from
- return Multiple sequence record for the given RecordMetaData instances
- throws IOException If I/O error occurs during loading

#### initialize 
```java
public void initialize(Configuration conf, InputSplit split) throws IOException, InterruptedException 
```


Called once at initialization.

- param conf  a configuration for initialization
- param split the split that defines the range of records to read
- throws IOException
- throws InterruptedException

#### hasNext 
```java
public boolean hasNext() 
```


Get the next record

- return

#### reset 
```java
public void reset() 
```


List of label strings

- return

#### nextRecord 
```java
public Record nextRecord() 
```


Load the record from the given DataInputStream
Unlike {- link #next()} the internal state of the RecordReader is not modified
Implementations of this method should not close the DataInputStream

- param uri
- param dataInputStream
- throws IOException if error occurs during reading from the input stream

#### loadFromMetaData 
```java
public Record loadFromMetaData(RecordMetaData recordMetaData) throws IOException 
```


Load a single record from the given {- link RecordMetaData} instance<br>
Note: that for data that isn't splittable (i.e., text data that needs to be scanned/split), it is more efficient to
load multiple records at once using {- link #loadFromMetaData(List)}

- param recordMetaData Metadata for the record that we want to load from
- return Single record for the given RecordMetaData instance
- throws IOException If I/O error occurs during loading

#### setListeners 
```java
public void setListeners(RecordListener... listeners) 
```


Load multiple records from the given a list of {- link RecordMetaData} instances<br>

- param recordMetaDatas Metadata for the records that we want to load from
- return Multiple records for the given RecordMetaData instances
- throws IOException If I/O error occurs during loading

#### setListeners 
```java
public void setListeners(Collection<RecordListener> listeners) 
```


Set the record listeners for this record reader.

- param listeners

#### close 
```java
public void close() throws IOException 
```


Closes this stream and releases any system resources associated
with it. If the stream is already closed then invoking this
method has no effect.

As noted in {- link AutoCloseable#close()}, cases where the
close may fail require careful attention. It is strongly advised
to relinquish the underlying resources and to internally
<em>mark</em> the {- code Closeable} as closed, prior to throwing
the {- code IOException}.

- throws IOException if an I/O error occurs


</div></div>


### NativeAudioRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-data/datavec-data-audio/src/main/java/org/datavec/audio/recordreader/NativeAudioRecordReader.java) </span>

Native audio file loader using FFmpeg.




### WavFileRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-data/datavec-data-audio/src/main/java/org/datavec/audio/recordreader/WavFileRecordReader.java) </span>

Wav file loader



### ImageRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/ImageRecordReader.java) </span>

Image record reader.
Reads a local file system and parses images of a given
height and width.
All images are rescaled and converted to the given height, width, and number of channels.

Also appends the label if specified
(one of k encoding based on the directory structure where each subdir of the root is an indexed label)



### VideoRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/VideoRecordReader.java) </span>


A video is just a moving window of pictures.
It should be processed as such.
This iterates over a root folder and returns a frame



<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/VideoRecordReader" aria-expanded="false" aria-controls="datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/VideoRecordReader">Show methods</button>
<div class="collapse" id="datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/VideoRecordReader"><div class="card card-body">

#### initialize 
```java
public void initialize(InputSplit split) throws IOException, InterruptedException 
```


Load the record reader with the given height and width
- param height the height to load
- param width the width load


</div></div>


### TfidfRecordReader
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-data/datavec-data-nlp/src/main/java/org/datavec/nlp/reader/TfidfRecordReader.java) </span>

TFIDF record reader (wraps a tfidf vectorizer
for delivering labels and conforming to the record reader interface)

