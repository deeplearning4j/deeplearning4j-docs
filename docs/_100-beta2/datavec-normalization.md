---
title: DataVec Normalization
short_title: Normalization
description: Preparing data in the right shape and range for learning.
category: DataVec
weight: 5
---

## Why normalize?

Neural networks work best when the data they’re fed is normalized, constrained to a range between -1 and 1. There are several reasons for that. One is that nets are trained using gradient descent, and their activation functions usually having an active range somewhere between -1 and 1. Even when using an activation function that doesn’t saturate quickly, it is still good practice to constrain your values to this range to improve performance.

## Available preprocessors


---

### NormalizerStrategy
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//NormalizerStrategy.java) </span>

Interface for strategies that can normalize and denormalize data arrays based on statistics of the population





---

### ImageFlatteningDataSetPreProcessor
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//ImageFlatteningDataSetPreProcessor.java) </span>

A DataSetPreProcessor used to flatten a 4d CNN features array to a flattened 2d format (for use in networks such
as a DenseLayer/multi-layer perceptron)





---

### Normalizer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//Normalizer.java) </span>

Base interface for all normalizers





---

### ImagePreProcessingScaler
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//ImagePreProcessingScaler.java) </span>

Created by susaneraly on 6/23/16.
A preprocessor specifically for images that applies min max scaling
Can take a range, so pixel values can be scaled from 0->255 to minRange->maxRange
default minRange = 0 and maxRange = 1;
If pixel values are not 8 bits, you can specify the number of bits as the third argument in the constructor
For values that are already floating point, specify the number of bits as 1


##### ImagePreProcessingScaler 
```java
public ImagePreProcessingScaler(double a, double b, int maxBits) 
```


Preprocessor can take a range as minRange and maxRange
- param a, default = 0
- param b, default = 1
- param maxBits in the image, default = 8


##### fit 
```java
public void fit(DataSet dataSet) 
```


Fit a dataset (only compute
based on the statistics from this dataset0

- param dataSet the dataset to compute on

##### fit 
```java
public void fit(DataSetIterator iterator) 
```


Iterates over a dataset
accumulating statistics for normalization

- param iterator the iterator to use for
collecting statistics.

##### transform 
```java
public void transform(DataSet toPreProcess) 
```


Transform the data
- param toPreProcess the dataset to transform





---

### NormalizerMinMaxScaler
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//NormalizerMinMaxScaler.java) </span>

Pre processor for DataSets that normalizes feature values (and optionally label values) to lie between a minimum
and maximum value (by default between 0 and 1)


##### NormalizerMinMaxScaler 
```java
public NormalizerMinMaxScaler(double minRange, double maxRange) 
```


Preprocessor can take a range as minRange and maxRange

- param minRange
- param maxRange


##### load 
```java
public void load(File... statistics) throws IOException 
```


Load the given min and max

- param statistics the statistics to load
- throws IOException

##### save 
```java
public void save(File... files) throws IOException 
```


Save the current min and max

- param files the statistics to save
- throws IOException
- deprecated use {- link NormalizerSerializer instead}





---

### MinMaxStrategy
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//MinMaxStrategy.java) </span>

statistics of the upper and lower bounds of the population


##### MinMaxStrategy 
```java
public MinMaxStrategy(double minRange, double maxRange) 
```


- param minRange the target range lower bound
- param maxRange the target range upper bound


##### preProcess 
```java
public void preProcess(INDArray array, INDArray maskArray, MinMaxStats stats) 
```


Normalize a data array

- param array the data to normalize
- param stats statistics of the data population

##### revert 
```java
public void revert(INDArray array, INDArray maskArray, MinMaxStats stats) 
```


Denormalize a data array

- param array the data to denormalize
- param stats statistics of the data population





---

### MultiDataNormalization
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//MultiDataNormalization.java) </span>

An interface for multi dataset normalizers.
Data normalizers compute some sort of statistics
over a MultiDataSet and scale the data in some way.





---

### NormalizerStandardize
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//NormalizerStandardize.java) </span>

Created by susaneraly, Ede Meijer
variance and mean
Pre processor for DataSet that normalizes feature values (and optionally label values) to have 0 mean and a standard
deviation of 1

##### load 
```java
public void load(File... files) throws IOException 
```


Load the means and standard deviations from the file system

- param files the files to load from. Needs 4 files if normalizing labels, otherwise 2.

##### save 
```java
public void save(File... files) throws IOException 
```


- param files the files to save to. Needs 4 files if normalizing labels, otherwise 2.
- deprecated use {- link NormalizerSerializer} instead

Save the current means and standard deviations to the file system





---

### DataNormalization
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//DataNormalization.java) </span>

An interface for data normalizers.
Data normalizers compute some sort of statistics
over a dataset and scale the data in some way.





---

### MultiNormalizerHybrid
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//MultiNormalizerHybrid.java) </span>

Pre processor for MultiDataSet that can be configured to use different normalization strategies for different inputs
and outputs, or none at all. Can be used for example when one input should be normalized, but a different one should
be untouched because it's the input for an embedding layer. Alternatively, one might want to mix standardization and
min-max scaling for different inputs and outputs.

By default, no normalization is applied. There are methods to configure the desired normalization strategy for inputs
and outputs either globally or on an individual input/output level. Specific input/output strategies will override
global ones.


##### MultiNormalizerHybrid 
```java
public MultiNormalizerHybrid standardizeAllInputs() 
```


Apply standardization to all inputs, except the ones individually configured

- return the normalizer


##### minMaxScaleAllInputs 
```java
public MultiNormalizerHybrid minMaxScaleAllInputs() 
```


Apply min-max scaling to all inputs, except the ones individually configured

- return the normalizer

##### minMaxScaleAllInputs 
```java
public MultiNormalizerHybrid minMaxScaleAllInputs(double rangeFrom, double rangeTo) 
```


Apply min-max scaling to all inputs, except the ones individually configured

- param rangeFrom lower bound of the target range
- param rangeTo   upper bound of the target range
- return the normalizer

##### standardizeInput 
```java
public MultiNormalizerHybrid standardizeInput(int input) 
```


Apply standardization to a specific input, overriding the global input strategy if any

- param input the index of the input
- return the normalizer

##### minMaxScaleInput 
```java
public MultiNormalizerHybrid minMaxScaleInput(int input) 
```


Apply min-max scaling to a specific input, overriding the global input strategy if any

- param input the index of the input
- return the normalizer

##### minMaxScaleInput 
```java
public MultiNormalizerHybrid minMaxScaleInput(int input, double rangeFrom, double rangeTo) 
```


Apply min-max scaling to a specific input, overriding the global input strategy if any

- param input     the index of the input
- param rangeFrom lower bound of the target range
- param rangeTo   upper bound of the target range
- return the normalizer

##### standardizeAllOutputs 
```java
public MultiNormalizerHybrid standardizeAllOutputs() 
```


Apply standardization to all outputs, except the ones individually configured

- return the normalizer

##### minMaxScaleAllOutputs 
```java
public MultiNormalizerHybrid minMaxScaleAllOutputs() 
```


Apply min-max scaling to all outputs, except the ones individually configured

- return the normalizer

##### minMaxScaleAllOutputs 
```java
public MultiNormalizerHybrid minMaxScaleAllOutputs(double rangeFrom, double rangeTo) 
```


Apply min-max scaling to all outputs, except the ones individually configured

- param rangeFrom lower bound of the target range
- param rangeTo   upper bound of the target range
- return the normalizer

##### standardizeOutput 
```java
public MultiNormalizerHybrid standardizeOutput(int output) 
```


Apply standardization to a specific output, overriding the global output strategy if any

- param output the index of the input
- return the normalizer

##### minMaxScaleOutput 
```java
public MultiNormalizerHybrid minMaxScaleOutput(int output) 
```


Apply min-max scaling to a specific output, overriding the global output strategy if any

- param output the index of the input
- return the normalizer

##### minMaxScaleOutput 
```java
public MultiNormalizerHybrid minMaxScaleOutput(int output, double rangeFrom, double rangeTo) 
```


Apply min-max scaling to a specific output, overriding the global output strategy if any

- param output    the index of the input
- param rangeFrom lower bound of the target range
- param rangeTo   upper bound of the target range
- return the normalizer

##### getInputStats 
```java
public NormalizerStats getInputStats(int input) 
```


Get normalization statistics for a given input.

- param input the index of the input
- return implementation of NormalizerStats corresponding to the normalization strategy selected

##### getOutputStats 
```java
public NormalizerStats getOutputStats(int output) 
```


Get normalization statistics for a given output.

- param output the index of the output
- return implementation of NormalizerStats corresponding to the normalization strategy selected

##### fit 
```java
public void fit(@NonNull MultiDataSet dataSet) 
```


Get the map of normalization statistics per input

- return map of input indices pointing to NormalizerStats instances

##### fit 
```java
public void fit(@NonNull MultiDataSetIterator iterator) 
```


Iterates over a dataset
accumulating statistics for normalization

- param iterator the iterator to use for collecting statistics

##### transform 
```java
public void transform(@NonNull MultiDataSet data) 
```


Transform the dataset

- param data the dataset to pre process

##### revert 
```java
public void revert(@NonNull MultiDataSet data) 
```


Undo (revert) the normalization applied by this DataNormalization instance (arrays are modified in-place)

- param data MultiDataSet to revert the normalization on

##### revertFeatures 
```java
public void revertFeatures(@NonNull INDArray[] features) 
```


Undo (revert) the normalization applied by this DataNormalization instance to the entire inputs array

- param features The normalized array of inputs

##### revertFeatures 
```java
public void revertFeatures(@NonNull INDArray[] features, INDArray[] maskArrays) 
```


Undo (revert) the normalization applied by this DataNormalization instance to the entire inputs array

- param features   The normalized array of inputs
- param maskArrays Optional mask arrays belonging to the inputs

##### revertFeatures 
```java
public void revertFeatures(@NonNull INDArray[] features, INDArray[] maskArrays, int input) 
```


Undo (revert) the normalization applied by this DataNormalization instance to the features of a particular input

- param features   The normalized array of inputs
- param maskArrays Optional mask arrays belonging to the inputs
- param input      the index of the input to revert normalization on

##### revertLabels 
```java
public void revertLabels(@NonNull INDArray[] labels) 
```


Undo (revert) the normalization applied by this DataNormalization instance to the entire outputs array

- param labels The normalized array of outputs

##### revertLabels 
```java
public void revertLabels(@NonNull INDArray[] labels, INDArray[] maskArrays) 
```


Undo (revert) the normalization applied by this DataNormalization instance to the entire outputs array

- param labels     The normalized array of outputs
- param maskArrays Optional mask arrays belonging to the outputs

##### revertLabels 
```java
public void revertLabels(@NonNull INDArray[] labels, INDArray[] maskArrays, int output) 
```


Undo (revert) the normalization applied by this DataNormalization instance to the labels of a particular output

- param labels     The normalized array of outputs
- param maskArrays Optional mask arrays belonging to the outputs
- param output     the index of the output to revert normalization on





---

### MultiNormalizerStandardize
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//MultiNormalizerStandardize.java) </span>

Pre processor for MultiDataSet that normalizes feature values (and optionally label values) to have 0 mean and
a standard deviation of 1


##### load 
```java
public void load(@NonNull List<File> featureFiles, @NonNull List<File> labelFiles) throws IOException 
```


Load means and standard deviations from the file system

- param featureFiles source files for features, requires 2 files per input, alternating mean and stddev files
- param labelFiles   source files for labels, requires 2 files per output, alternating mean and stddev files

##### save 
```java
public void save(@NonNull List<File> featureFiles, @NonNull List<File> labelFiles) throws IOException 
```


- param featureFiles target files for features, requires 2 files per input, alternating mean and stddev files
- param labelFiles   target files for labels, requires 2 files per output, alternating mean and stddev files
- deprecated use {- link MultiStandardizeSerializerStrategy} instead

Save the current means and standard deviations to the file system





---

### StandardizeStrategy
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//StandardizeStrategy.java) </span>

of the means and standard deviations of the population


##### preProcess 
```java
public void preProcess(INDArray array, INDArray maskArray, DistributionStats stats) 
```


Normalize a data array

- param array the data to normalize
- param stats statistics of the data population

##### revert 
```java
public void revert(INDArray array, INDArray maskArray, DistributionStats stats) 
```


Denormalize a data array

- param array the data to denormalize
- param stats statistics of the data population





---

### VGG16ImagePreProcessor
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//VGG16ImagePreProcessor.java) </span>

This is a preprocessor specifically for VGG16.
It subtracts the mean RGB value, computed on the training set, from each pixel as reported in:
https://arxiv.org/pdf/1409.1556.pdf

##### fit 
```java
public void fit(DataSet dataSet) 
```


Fit a dataset (only compute
based on the statistics from this dataset0

- param dataSet the dataset to compute on

##### fit 
```java
public void fit(DataSetIterator iterator) 
```


Iterates over a dataset
accumulating statistics for normalization

- param iterator the iterator to use for
collecting statistics.

##### transform 
```java
public void transform(DataSet toPreProcess) 
```


Transform the data
- param toPreProcess the dataset to transform





---

### CompositeMultiDataSetPreProcessor
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//CompositeMultiDataSetPreProcessor.java) </span>

A simple Composite MultiDataSetPreProcessor - allows you to apply multiple MultiDataSetPreProcessors sequentially
on the one MultiDataSet, in the order they are passed to the constructor


##### CompositeMultiDataSetPreProcessor 
```java
public CompositeMultiDataSetPreProcessor(MultiDataSetPreProcessor... preProcessors)
```


- param preProcessors Preprocessors to apply. They will be applied in this order





---

### CompositeDataSetPreProcessor
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//CompositeDataSetPreProcessor.java) </span>

A simple Composite DataSetPreProcessor - allows you to apply multiple DataSetPreProcessors sequentially
on the one DataSet, in the order they are passed to the constructor


##### CompositeDataSetPreProcessor 
```java
public CompositeDataSetPreProcessor(DataSetPreProcessor... preProcessors)
```


- param preProcessors Preprocessors to apply. They will be applied in this order





---

### ImageMultiPreProcessingScaler
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//ImageMultiPreProcessingScaler.java) </span>

A preprocessor specifically for images that applies min max scaling to one or more of the feature arrays
in a MultiDataSet.<br>
Can take a range, so pixel values can be scaled from 0->255 to minRange->maxRange
default minRange = 0 and maxRange = 1;
If pixel values are not 8 bits, you can specify the number of bits as the third argument in the constructor
For values that are already floating point, specify the number of bits as 1


##### ImageMultiPreProcessingScaler 
```java
public ImageMultiPreProcessingScaler(double a, double b, int maxBits, int[] featureIndices) 
```


Preprocessor can take a range as minRange and maxRange
- param a, default = 0
- param b, default = 1
- param maxBits in the image, default = 8
- param featureIndices Indices of feature arrays to process. If only one feature array is present,
this should always be 0





---

### MultiNormalizerMinMaxScaler
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/../nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor//MultiNormalizerMinMaxScaler.java) </span>

Pre processor for MultiDataSet that normalizes feature values (and optionally label values) to lie between a minimum
and maximum value (by default between 0 and 1)


##### MultiNormalizerMinMaxScaler 
```java
public MultiNormalizerMinMaxScaler(double minRange, double maxRange) 
```


Preprocessor can take a range as minRange and maxRange

- param minRange the target range lower bound
- param maxRange the target range upper bound

