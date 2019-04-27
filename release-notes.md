---
title: Release Notes
short_title: Release Notes
description: New changes in each release of Eclipse Deeplearning4j.
layout: default
redirect_from: "/releasenotes"
---

**Contents**
* <a href="#onezerozerobeta4">Version 1.0.0-beta4</a>
    - <a href="#onezerozerobeta4-dl4j">Deeplearning4j</a>
    - <a href="#onezerozerobeta4-dl4jkeras">Deeplearning4j Keras Import</a>
    - <a href="#onezerozerobeta4-nd4j">ND4J and SameDiff</a>
    - <a href="#onezerozerobeta4-datavec">DataVec</a>
    - <a href="#onezerozerobeta4-arbiter">Arbiter</a>
    - <a href="#onezerozerobeta4-rl4j">RL4J</a>
    - <a href="#onezerozerobeta4-scalnet">ScalNet</a>
    - <a href="#onezerozerobeta4-nd4s">ND4S</a>
* <a href="#onezerozerobeta3">Version 1.0.0-beta3</a>
    - <a href="#onezerozerobeta3-dl4j">Deeplearning4j</a>
    - <a href="#onezerozerobeta3-dl4jkeras">Deeplearning4j Keras Import</a>
    - <a href="#onezerozerobeta3-nd4j">ND4J</a>
    - <a href="#onezerozerobeta3-datavec">DataVec</a>
    - <a href="#onezerozerobeta3-arbiter">Arbiter</a>
    - <a href="#onezerozerobeta3-rl4j">RL4J</a>
    - <a href="#onezerozerobeta3-scalnet">ScalNet</a>
    - <a href="#onezerozerobeta3-nd4s">ND4S</a>
* <a href="#onezerozerobeta2">Version 1.0.0-beta2</a>
    - <a href="#onezerozerobeta2-dl4j">Deeplearning4j</a>
    - <a href="#onezerozerobeta2-dl4jkeras">Deeplearning4j Keras Import</a>
    - <a href="#onezerozerobeta2-nd4j">ND4J</a>
    - <a href="#onezerozerobeta2-datavec">DataVec</a>
    - <a href="#onezerozerobeta2-arbiter">Arbiter</a>
    - <a href="#onezerozerobeta2-rl4j">RL4J</a>
    - <a href="#onezerozerobeta2-scalnet">ScalNet</a>
    - <a href="#onezerozerobeta2-nd4s">ND4S</a>
* <a href="#onezerozerobeta">Version 1.0.0-beta</a>
    - <a href="#onezerozerobeta-dl4j">Deeplearning4j</a>
    - <a href="#onezerozerobeta-dl4jkeras">Deeplearning4j Keras Import</a>
    - <a href="#onezerozerobeta-nd4j">ND4J</a>
    - <a href="#onezerozerobeta-datavec">DataVec</a>
    - <a href="#onezerozerobeta-arbiter">Arbiter</a>
    - <a href="#onezerozerobeta-rl4j">RL4J</a>
    - <a href="#onezerozerobeta-scalnet">ScalNet</a>
    - <a href="#onezerozerobeta-nd4s">ND4S</a>
* <a href="#onezerozeroalpha">Version 1.0.0-alpha</a>
    - <a href="#onezerozeroalpha-dl4j">Deeplearning4j</a>
    - <a href="#onezerozeroalpha-dl4jkeras">Deeplearning4j Keras Import</a>
    - <a href="#onezerozeroalpha-nd4j">ND4J</a>
    - <a href="#onezerozeroalpha-datavec">DataVec</a>
    - <a href="#onezerozeroalpha-arbiter">Arbiter</a>
    - <a href="#onezerozeroalpha-rl4j">RL4J</a>
    - <a href="#onezerozeroalpha-scalnet">ScalNet</a>
    - <a href="#onezerozeroalpha-nd4s">ND4S</a>
* <a href="#zeronineone">Version 0.9.1</a>
* <a href="#zeroninezero">Version 0.9.0</a>
* <a href="#zeroeightzero">Version 0.8.0</a>
* <a href="#zeroseventwo">Version 0.7.2</a>
* <a href="#six">Version 0.6.0</a>
* <a href="#five">Version 0.5.0</a>
* <a href="#four">Version 0.4.0</a>


# <a name="onezerozerobeta4">Release Notes for Version 1.0.0-beta4</a>

## Highlights - 1.0.0-beta4 Release

**Main highlight: full multi-datatype support for ND4J and DL4J.**
In past releases, all N-Dimensional arrays in ND4J were limited to a single datatype (float or double), set globally.
Now, arrays of all datatypes may be used simultaneously.
The following [datatypes](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-buffer/src/main/java/org/nd4j/linalg/api/buffer/DataType.java) are supported:
* DOUBLE: double precision floating point, 64-bit (8 byte)
* FLOAT: single precision floating point, 32-bit (4 byte)
* HALF: half precision floating point, 16-bit (2 byte), "FP16"
* LONG: long signed integer, 64 bit (8 byte)
* INT: signed integer, 32 bit (4 byte)
* SHORT: signed short integer, 16 bit (2 byte)
* UBYTE: unsigned byte, 8 bit (1 byte), 0 to 255
* BYTE: signed byte, 8 bit (1 byte), -128 to 127
* BOOL: boolean type, (0/1, true/false). Uses ubyte storage for easier op parallelization
* UTF8: String array type, UTF8 format

*ND4J Behaviour changes of note:*
* When creating an INDArray from a Java primitive array, the INDArray datatype will be determined by the primitive array type (unless a datatype is specified)
    * For example: Nd4j.createFromArray(double[]) -> DOUBLE datatype INDArray
    * Similarly, Nd4j.scalar(1), Nd4j.scalar(1L), Nd4j.scalar(1.0) and Nd4j.scalar(1.0f) will produce INT, LONG, DOUBLE and FLOAT type scalar INDArrays respectively
* Some operations require matched datatypes for operands
    * For example, if x and y are different datatypes, a cast may be required: x.add(y.castTo(x.dataType()))
* Some operations have datatype restrictions: for example, sum on a UTF8 array is not supported, nor is variance on a BOOL array. For some operations on boolean arrays (such as sum), casting to an integer or floating point type first may make sense.

*DL4J Behaviour changes of note:*
* MultiLayerNetwork/ComputationGraph no longer depend in any way on ND4J global datatype.
    * The datatype of a network (DataType for it's parameters and activations) can be set during construction using `NeuralNetConfigutation.Builder().dataType(DataType)`
    * Networks can be converted from one type to another (double to float, float to half etc) using `MultiLayerNetwork/ComputationGraph.convertDataType(DataType)` method

*Main new methods:*
* Nd4j.create(), zeros(), ones(), linspace(), etc methods with DataType argument
* INDArray.castTo(DataType) method - to convert INDArrays from one datatype to another
* New Nd4j.createFromArray(...) methods for

**ND4J/DL4J: CUDA - 10.1 support added, CUDA 9.0 support dropped**

CUDA versions supported in 1.0.0-beta4: CUDA 9.2, 10.0, 10.1.

**DL4J/ND4J: MKL-DNN Support Added**
DL4J (and ND4J conv2d etc ops) now support MKL-DNN by default when running on CPU/native backend.
MKL-DNN support is implemented for the following layer types:
* ConvolutionLayer and Convolution1DLayer (and Conv2D/Conv2DDerivative ND4J ops)
* SubsamplingLayer and Subsampling1DLayer (and MaxPooling2D/AvgPooling2D/Pooling2DDerivative ND4J ops)
* BatchNormalization layer (and BatchNorm ND4J op)
* LocalResponseNormalization layer (and LocalResponseNormalization ND4J op)
* Convolution3D layer (and Conv3D/Conv3DDerivative ND4J ops)

MKL-DNN support for other layer types (such as LSTM) will be added in a future release.
MKL-DNN can be disabled using `Nd4jCpu.Environment.getInstance().setUseMKLDNN(false);`

**ND4J: Improved Performance due to Memory Management Changes**

Prior releases of ND4J used periodic garbage collection (GC) to release memory that
was not allocated in a memory workspace. (Note that DL4J uses workspaces for almost
all operations by default hence periodic GC could frequently be disabled when training
DL4J networks). However, the reliance on garbage collection resulted in a performance
overhead that scaled with the number of objects in the JVM heap.

In 1.0.0-beta4, the periodic garbage collection is disabled by default; instead, GC
will be called only when it is required to reclaim memory from arrays that are
allocated outside of workspaces.

To re-enable periodic GC (as per the default in beta3) and set the GC frequency
to every 5 seconds (5000ms) you can use:
```
Nd4j.getMemoryManager().togglePeriodicGc(true);
Nd4j.getMemoryManager().setAutoGcWindow(5000);
```

**ND4J: Improved Rank 0/1 Array Support**

In prior versions of ND4J, scalars and vectors would sometimes be rank 2 instead
of rank 0/1 when getting rows/columns, getting sub-arrays using INDArray.get(NDArrayIndex...)
or when creating arrays from Java arrays/scalars.
Now, behaviour should be more consistent for these rank 0/1 cases.
Note to maintain old behaviour for getRow and getColumn (i.e., return rank 2 array with shape [1,x] and [x,1] respectively), the `getRow(long,boolean)` and `getColumn(long,boolean)` methods can be used.

**DL4J: Attention layers added**

## <a name="onezerozerobeta4-dl4j">Deeplearning4J</a>

### Deeplearning4J: Features and Enhancements

* Added MKL-DNN support for Conv/Pool/BatchNorm/LRN layers. MKL-DNN will be used automatically when using nd4j-native backend. ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7151), [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/mkldnn))
* L1/L2 regularization now made into a class; weight decay added, with better control as to when/how it is applied. See [this page](https://www.fast.ai/2018/07/02/adam-weight-decay/) for more details on the difference between L2 and weight decay. In general, weight decay should be preferred to L2 regularization. ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7097), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7079))
* Added dot product attention layers: [AttentionVertex](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/graph/AttentionVertex.java), [LearnedSelfAttentionLayer](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LearnedSelfAttentionLayer.java), [RecurrentAttentionLayer](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/RecurrentAttentionLayer.java) and [SelfAttentionLayer](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/SelfAttentionLayer.java)
* The parameter/activation datatypes for new models can be set for new networks using the `dataType(DataType)` method on NeuralNetConfiguration.Builder ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7532))
* MultiLayerNetwork/ComputationGraph can be converted between (floating point) datatypes FP16/32/64 for the parameters and activations using the `MultiLayerNetwork/ComputationGraph.convertDataType(DataType)` methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7531), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7520))
* EmbeddingLayer and EmbeddingSequenceLayer builders now have `.weightInit(INDArray)` and `.weightInit(Word2Vec)` methods for initializing parameters from pretrained word vectors ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7173))
* PerformanceListener can now be configured to report garbage collection information (number/duration) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6717)
* Evaluation class will now check for NaNs in the predicted output and throw an exception instead treating argMax(NaNs) as having value 0 ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6748))
* Added ModelAdapter for ParallelInference for convenience and for use cases such as YOLO (allows improved performance by avoiding detached (out-of-workspace) arrays) ([Link]())
* Added GELU Activation function ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7426))
* Added BertIterator (a MultiDataSetIterator for BERT training - supervised and unsupervised) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7430)
* Added validation to MultiLayerNetwork/ComputationGraph that throws an exception when attempting to perform Regression evaluation on a classifier, or vice-versa ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6735), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6774))
* Added `ComputationGraph.output(List<String> layers, boolean train, INDArray[] features, INDArray[] featureMasks)` method to get the activations for a specific set of layers/vertices only (without redundant calculations) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6736))
* Weight initialization for networks is now implemented as classes (not just enumerations) and hence is now extesible via IWeightInit interface ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/weights/IWeightInit.java)); i.e., custom weight initializations are now supported ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6820), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6813))
* Added Capsule Network layers (no GPU acceleration until next release) - [CapsuleLayer](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/CapsuleLayer.java), [CapsuleStrengthLayer](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/CapsuleStrengthLayer.java) and [PrimaryCapsules](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/PrimaryCapsules.java) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7391))
* Added `Cifar10DataSetIterator` to replace `CifarDataSetIterator` ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6875), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6834#issuecomment-446095723))
* Keras import: Importing models from InputStream is now supported ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/5594), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6980))
* Layer/NeuralNetConfiguration builders now have getter/setter methods also, for better Kotlin support ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6990))
* Most JavaScript dependencies and fonts for UI have been migrated to WebJars ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7046))
* CheckpointListener now has static availableCheckpoints(File), loadCheckpointMLN(File, int) and lostLastCheckpointMLN(File) etc methods ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7032))
* MultiLayerNetwork/ComputationGraph now validate and throw an exception in certain incompatible RNN configurations, like truncated backpropagation through time combined with LastTimeStepLayer/Vertex ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6991))
* Added BERT WordPiece tokenizers ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7141))
* Deeplearning4j UI now has multi-user/multi-session support - use `UIServer.getInstance(boolean multiSession, Function<String,StatsStorage>)` to start UI in multi-session mode ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7185))
* Layer/NeuralNetworkConfiguration builder method validation standardized and improved ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7218))
* WordVectorSerializer now supports reading and exporting text forwat vectors via WordVectorSerializer.writeLookupTable and readLookupTable ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7219)]
* Updated to JavaCPP, JavaCPP presets, and JavaCV version 1.5 ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7296))
* Added EvaluationBinary false alarm rate calculation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7320))
* ComputationGraph GraphBuilder now has an appendLayer method that can be used to add layers connected to the last added layer/vertex ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7403))
* Added Wasserstein loss function ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7406))
* Keras import: Improved errors/exceptions for lambda layer import ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7535))
* Apache Lucene/Solr upgraded from 7.5.0 to 7.7.1 ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7539))
* KMeans clustering strategy is now configurable ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7471))

### Deeplearning4J: Bug Fixes and Optimizations

* DL4J Spark training: fix for shared clusters (multiple simultaneous training jobs) - Aeron stream ID now generated randomly ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6673))
* cuDNN helpers will no longer attempt to fall back on built-in layer implementations if an out-of-memory exception is thrown ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6691))
* Batch normalization global variance reparameterized to avoid underflow and zero/negative variance in some cases during distributed training ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6750))
* Fixed a bug where dropout instances were incorrectly shared between layers when using transfer learning with dropout ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6756), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6758))
* Fixed issue where tensorAlongDimension could result in an incorrect array order for edge cases and hence exceptions in LSTMs ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6770))
* Fixed an edge case issue with ComputationGraph.getParam(String) where the layer name contains underscores ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6734))
* Fixed an edge case with ParallelInference on CUDA where (very rarely) input array operations (such as normalization) may not be fully completed before transferring an array between threads ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6730), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6774))
* Fixed an edge case with KFoldIterator when the total number of examples is not a multiple of the batch size ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6786), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6810))
* Fixed an issue where DL4J UI could throw a `NoClassDefFoundError` on Java 9/10/11 ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6819), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5804))
* Keras import: added aliases for weight initialization ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6849))
* Fixed issue where dropout instances would not be correctly cloned when network configuration was cloned ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6841))
* Fixed workspace issue with ElementwiseVertex with single input ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6811))
* Fixed issue with UI where detaching StatsStorage could attempt to remove storage twice, resulting in an exception ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6859))
* Fixed issue where LossMultiLabel would generate NaNs when all labels in minibatch are the same class. Now 0 gradient is returned instead. ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6893), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6880))
* Fixed an issue where DepthwiseConv2D weight could be wrong shape on restoring network from saved format ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6911))
* Fixed issue where BaseDatasetIterator.next() would not apply preprocessors, if one was set ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6941))
* Improved default configuration for CenterLossOutputLayer ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6812))
* Fixed an issue for UNet non-pretrained configuration ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6955))
* Fixed an issue where Word2Vec VocabConstructor could deadlock under some circumstances ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7048))
* SkipGram and CBOW (used in Word2Vec) were made native operations for better performance ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7059))
* Fixed an issue where references to detached StatsListener instances would be maintained, potentially leading to memory issues when using InMemoryStatsListener ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7064))
* Optimization: Workspaces were added to SequenceVectors and Word2Vec ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7087))
* Improved validation for RecordReaderDataSetIterator ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7140))
* Improved handling of unknown words in WordVectors implementation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7154))
* Yolo2OutputLayer: Added validation for incorrect labels shape. ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7152))
* LastTimeStepLayer will now throw an exception when the input mask is all 0s (no data - no last time step) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7115))
* Fixed an issue where MultiLayerNetwork/ComputationGraph.setLearningRate method could lead to invalid updater state in some rare cases ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6809))
* Fixed an issue where Conv1D layer would calculate output length in MultiLayerNetwork.summary() ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7104))
* Async iterators are now used in EarlyStoppingTrained to improve data loading performance ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7190))
* EmbeddingLayer and EmbeddingSequenceLayer performance has been improved on CUDA ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7180))
* Removed outdated/legacy scala tools repository ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7220), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7216))
* Fixed issues in L2NormalizeVertex equals/hashcode methods ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7225))
* Fixed Workspace issue in ConvolutionalListener ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7217))
* Fixed EvaluationBinary falsePositiveRate calculation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7313))
* Added validation and useful exception for MultiLayerNetwork.output(DataSetIterator) methods ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7352))
* Fixed minor issue where ComputationGraph.summary() would throw a NullPointerException if init() had not already been called ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7353))
* Fixed a ComputationGraph issue where an input into a single layer/vertex repeated multiple times could fail during training ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7420))
* Improved performance for KMeans implementation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7427))
* Fixed an issue with rnnGetPreviousState for RNNs in 'wrapper' layers such as FrozenLayer ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7437))
* Keras import: Fixed an issue with order of words when importing some Keras tokenizers ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7448))
* Keras import: fixed issue with possible UnsupportedOperationException in KerasTokenizer class ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7073))
* Keras import: fixed an import issue with models combining embeddings, reshape and convolution layers ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7013))
* Keras import: fixed an import issue with input type inference for some RNN models ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6995))
* Fixed some padding issues in LocallyConnected1D/2D layers ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7541))

### Deeplearning4J: API Changes (Transition Guide): 1.0.0-beta3 to 1.0.0-beta4

### Deeplearning4J: Known issues: 1.0.0-beta4

## <a name="onezerozerobeta4-dl4jkeras">Deeplearing4J: Keras Import</a>

## <a name="onezerozerobeta4-nd4j">ND4J and SameDiff</a>

### ND4J/SameDiff: Features and Enhancements

* Removed reliance on periodic garbage collection calls for handling memory management of out-of-workspace (detached) INDArrays ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7506))
* Added INDArray.close() method to allow users to manually release off-heap memory immediately ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6883))
* SameDiff: Added TensorFlowImportValidator tool to determine if a TensorFlow graph can likely be imported into SameDiff. Reports the operations used and whether they are supported in SameDiff ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/imports/tensorflow/TensorFlowImportValidator.java))
* Added Nd4j.createFromNpzFile method to load Numpy npz files ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6837))
* Added support for importing BERT models into SameDiff ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7245), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-tests/src/test/java/org/nd4j/imports/TFGraphs/BERTGraphTest.java))
* Added SameDiff GraphTransformUtil for performing transfer learning and other graph modifications ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff/samediff/transform/GraphTransformUtil.java), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7199), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7245))
* Evaluation, RegressionEvaluation etc now support 4d (CNN segmentation) data formats; also added Evaluation.setAxis(int) method to support other data formats such as channels-last/NHWC for CNNs and NWC for CNN1D/RNNs. Defaults to axis 1 (which matches DL4J CNN and RNN data formats) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7250), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7293))
* Added basic ("technology preview") of SameDiff UI. Should be considered early WIP with breaking API changes expected in future releases. Supports plotting of SameDiff graphs as well as various metrics (line charts, histograms, etc)
    * Currenty embedding in the DL4J UI - call `UIServer.getInstance()` then go to `localhost:9000/samediff` to access.
    * For more details, see [1](https://github.com/deeplearning4j/deeplearning4j/pull/7057), [2](https://github.com/deeplearning4j/deeplearning4j/pull/7062), [3](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-ui-parent/deeplearning4j-play/src/test/java/org/deeplearning4j/ui/play/TestSameDiffUI.java)
* Added DotProductAttention and MultiHeadDotProductAttention operations ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/3ea2876dddeba62e999034388408225aeb34085b/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff/samediff/ops/SDNN.java#L789-L925))
* Added Nd4j.exec(Op) and Nd4j.exec(CustomOp) convenience methods ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7024))
* ND4J/SameDiff - new operations added:
    * [NonMaxSuppression](https://github.com/deeplearning4j/deeplearning4j/pull/6685), [LogMatrixDeterminant](https://github.com/deeplearning4j/deeplearning4j/pull/6689), [NthElement](https://github.com/deeplearning4j/deeplearning4j/pull/6699), [TruncateMod](https://github.com/deeplearning4j/deeplearning4j/pull/6699)
    * [Cholesky Decomposition](https://github.com/deeplearning4j/deeplearning4j/pull/6703), [Image resize nearest neighbor](https://github.com/deeplearning4j/deeplearning4j/pull/6705), [crop_and_resize](https://github.com/deeplearning4j/deeplearning4j/pull/6711)
    * [fake_quant_with_min_max_vars](https://github.com/deeplearning4j/deeplearning4j/pull/6711), [reduce_logsumexp](https://github.com/deeplearning4j/deeplearning4j/pull/6711), [pow (broadcastable)](https://github.com/deeplearning4j/deeplearning4j/pull/6944)), [linspace (dynamic args)](https://github.com/deeplearning4j/deeplearning4j/issues/6723)
    * [ExtractImagePatches](https://github.com/deeplearning4j/deeplearning4j/issues/6668), [GELU](https://github.com/deeplearning4j/deeplearning4j/pull/7132), [LSTMBlockCell, LSTMBLock, GRUCell](https://github.com/deeplearning4j/deeplearning4j/pull/7208)
    * [Standardize and LayerNorm ops](https://github.com/deeplearning4j/deeplearning4j/pull/7251)
* SameDiff TensorFlow Import
    * Import of TF Assertions added ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6710))
    * Support/fixes for control dependencies ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6967))
    * Support/fixes for TensorArray and related ops ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6972), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6976), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6996))
* nd4j-common - tar/tar.gz support added; Zip file listing and single file extraction added ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6686), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6729))
* SameDiff: reductions operations now support "dynamic" (non-constant) inputs for axis argument ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6906))
* ROCBinary now has .getROC(int outputNum) method ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7074))
* SameDiff: L1/L2 regularization added ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7076), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7128))
* SameDiff: Added SDVariable.convertToVariable() and convertToConstant() - to change SDVariable type ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7162))
* Added checks and useful exceptions for reductions on empty arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7143))
* SameDiff "op creator" methods (SameDiff.tanh(), SameDiff.conv2d(...) etc) have been moved to subclasses - access creators via SameDiff.math()/random()/nn()/cnn()/rnn()/loss() methods or SameDiff.math/random/nn/cnn/rnn/loss fields ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7174))
* SameDiff TensorFlow import: import can now be overridden for cases such as user-defined functions ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7184), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7178))
* Libnd4j (c++) benchmarking framework added ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7241))
* Added OpExecutioner.inspectArray(INDArray) method to get summary statistics for analysis/debugging purposes ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7258))
* Added `INDArray.reshape(char order, boolean enforceView, long... newShape)` to reshape array whilst throwing an exception (instead of returning a copy) if the reshape cannot be performed ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7292), [Link](https://github.com/deeplearning4j/deeplearning4j/commit/8d2bfbb8cca1597ef93dedd62ac0f0625cccc4ee))
* Added SDVariable method overloads (plus, minus, times, etc) for Kotlin ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7367))
* Added SDVariable convenience methods for dot, reshape, permute ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7371))
* Added SameDiff SDIndex.point(long, boolean keepDim) method (to keep point indices in output array as size 1 axis) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7392))
* Added SameDiff ProtoBufToFlatBufConversion command line tool for doing TensorFlow frozen model (protobuf) to SameDiff FlatBuffers conversion ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7460))
* Improved DataType validation for SameDiff operations ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6861))


### ND4J/SameDiff: API Changes (Transition Guide): 1.0.0-beta3 to 1.0.0-beta4

* ND4J datatypes - significant changes, see highlights at top of  this section
* nd4j-base64 module (deprecated in beta3) has been removed. Nd4jBase64 class has been moved to nd4j-api ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6672))
* When specifying arguments for op execution along dimension (for example, reductions) the reduction axis are now specified in the operation constructor - not separately in the OpExecutioner call. ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6902))
* Removed old Java loop-based BooleanIndexing methods. Equivalent native ops should be used instead. ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7007))
* Removed Nd4j.ENFORCE_NUMERICAL_STABILITY, Nd4j.copyOnOps, etc ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6884))
* SameDiff "op creator" methods (SameDiff.tanh(), SameDiff.conv2d(...) etc) have been moved to subclasses - access creators via SameDiff.math()/random()/nn()/cnn()/rnn()/loss() methods or SameDiff.math/random/nn/cnn/rnn/loss fields ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7174))
* Nd4j.emptyLike(INDArray) has been removed. Use Nd4j.like(INDArray) instead ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7252))
* org.nd4jutil.StringUtils removed; suggest using Apache commons lang3 StringUtils instead ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7487))
* ND4J Jackson RowVector(De)Serializer has been deprecated due to datatype changes; NDArrayText(De)Serializer should be used instead ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7561), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7577))
* nd4j-instrumentation module has been removed due to lack of use/maintenance ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7627))

### ND4J/SameDiff: Bug Fixes and Optimizations

* Fixed bug with InvertMatrix.invert() with [1,1] shape matrices ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6728))
* Fixed edge case bug for Updater instances with length 1 state arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6671))
* Fixed edge case with FileDocumentIterator with empty documents ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6712))
* SameDiff: Numerous fixes and enhancements
    * [1](https://github.com/deeplearning4j/deeplearning4j/issues/6674), [2](https://github.com/deeplearning4j/deeplearning4j/pull/6816), [3](https://github.com/deeplearning4j/deeplearning4j/issues/7001), [4](https://github.com/deeplearning4j/deeplearning4j/pull/7099)
    * Improved functionality for losses ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6844), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7020), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7022), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7042))
    * Improved errors for missing/misspelled placeholders ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/5299))
    * Fixed edge cases in loops ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7033), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7035))
* Fixed issue with Nd4j.vstack on 1d arrays returning 1d output, not 2d stacked output ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/6985))
* Conv2D op can infer kernel size from input arrays directly when required ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7098), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7008))
* Fixed an issue with Numpy format export - `Nd4j.toNpyByteArray(INDArray)` ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7466))
* Fixes for SameDiff when it is used within an external workspace ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7124))
* Fixed an issue where empty NDArrays would be reported as having scalar shape information, length 1 ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7163))
* Optimization: libnd4j (c++) indexing for ops will use uint for faster offset calculations when required and possible ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7164))
* Optimization: libnd4j loops performance improved for faster execution of some operations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7176), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7187), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7200))
* Local response normalization op optimized ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7236), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7244))
* Fixed an issue with INDArray.repeat on some view arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7277))
* Improved performance for execution of some operations on view arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7295))
* Improved performance on broadcast operations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7303), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7334), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7396))
* Improved performance for non-EWS reduction along dimension operations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7304))
* Improved performance fo IndexReduce operations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7308)) and small reductions ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7348))
* Improved performonce of one_hot operation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7339)), tanh operation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7379))
* Improved performance for transform operations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7359))
* Optimization: empty arrays are created only once and cached (as they are immutable) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7168))
* Improved performance on operations using tensor along dimension for parallelization ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7347), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/7557))
* Improved performance on "reduce 3" reduction operations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7464))
* Improved handling of CUDA contexts in heavily multi-threaded environments ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7434))
* Fixed an issue where Evaluation.reset() would incorrectly clear the String class labels ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7435))
* SameDiff: Improved gradient calculation performance/efficiency; "gradients" are now no longer defined for non-floating-point variables, and variables that aren't required to calculate loss or parameter gradients ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7452))
* Behaviour of IEvaluation instances now no longer depends on the global (default) datatype setting ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7550))
* INDArray.get(point(x), y) or .get(y, point(x)) now returns rank 1 arrays when performed on rank 2 arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7092))
* Removed reliance on Guava for SameDiff, fixing potential issue for Java 11/12 and when earlier versions of Guava are on the classpath ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7575), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7170))
* ND4J indexing (INDArray.get) implementation rewritten for better performance and reliability ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7577))
* Fixes for local response normalization backprop op ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7597))



### ND4J: Known issues: 1.0.0-beta4


## <a name="onezerozerobeta4-datavec">DataVec</a>

### DataVec: Features and Enhancements

* Added FirstDigit (Benford's law) transform ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7260), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/categorical/FirstDigitTransform.java))
* StringToTimeTransform now supports setting Locale ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/6901), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6825))
* Added StreamInputSplit for creating local data pipelines where data is stored remotely on storage such as HDFS or S3 ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-api/src/main/java/org/datavec/api/split/StreamInputSplit.java), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/7351))
* LineRecordReader (and subtypes) now have the option to define the character set ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7407))
* Added TokenizerBagOfWordsTermSequenceIndexTransform (TFIDF transform), GazeteerTransform (binary vector for word present) and MultiNlpTransform transforms; added BagOfWordsTransform interface ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7542))

### DataVec: Optimizations and Bug Fixes

* Fixed issue with ImageLoader.scalingIfNeeded ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7159))

## <a name="onezerozerobeta4-arbiter">Arbiter</a>

### Arbiter: Enhancements

* Arbiter now supports genetic algorithm search ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/7081))

### Arbiter: Fixes

* Fixed an issue where early stopping used in Arbiter would result in a serialization exception ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/7029))

## <a name="onezerozerobeta4-nd4s">ND4S</a>


---
---



# <a name="onezerozerobeta3">Release Notes for Version 1.0.0-beta3</a>

## Highlights - 1.0.0-beta3 Release

* ND4J/Deeplearning4j: Added support for CUDA 10.0. Dropped support for CUDA 8.0. (1.0.0-beta3 release has CUDA 9.0, 9.2 and 10.0 support)
* SameDiff now supports training and evaluation from DataSetIterator and MultiDataSetIterator. Evaluation classes have been moved to ND4J.
* DL4J Spark training (gradient sharing) is now fully fault tolerant, and has improvements for threshold adaption (potentially more robust convergence). Ports can now be easily configured independently on master/workers.


## <a name="onezerozerobeta3-dl4j">Deeplearning4J</a>

### Deeplearning4J: New Features

* Added OutputAdapter interface and ```MultiLayerNetwork/ComputationGraph.output``` method overloads using OutputAdapter (avoids allocating off-heap memory that needs to be cleaned up by GC) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6229), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/api/OutputAdapter.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/6bef4d587da9471e885a1616eb3f13239d91face/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/multilayer/MultiLayerNetwork.java#L2300-L2316)
* Added ComputationGraph/MultiLayerNetwork rnnTimeStep overload with user-specified workspace. [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6295)
* Added Cnn3DLossLayer [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Cnn3DLossLayer.java)
* ParallelInference: Instances can now update the model in real-time (without re-init) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6190)
* ParallelInferenc: Added ParallelInference INPLACE mode [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6229)
* Added validation for incompatible loss/activation function combinations (such as softmax+nOut=1, or sigmoid+mcxent). New validation can be disabled using outputValidation(false) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6280)
* Spark training: Added full fault tolerance (robust failure recovery) for gradient sharing implementation [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6115) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6455)
* Spark training now supports configuring ports more flexibly (and differently for different workers) using PortSupplier [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-parameter-server-parent/nd4j-parameter-server-node/src/main/java/org/nd4j/parameterserver/distributed/v2/transport/PortSupplier.java) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-parameter-server-parent/nd4j-parameter-server-node/src/main/java/org/nd4j/parameterserver/distributed/v2/transport/impl/EnvironmentVarPortSupplier.java)
* Spark training: overhauled gradient sharing threshold adaption algorithms; made it possible to customize threshold settings, plus made defaults more robust to initial threshold configuration improving convergence speed in some cases. [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6631)
* Spark training: implemented chunked messaging to reduce memory requirements (and insufficient buffer length issues) for large messages [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6115)
* Spark training: Added MeshBuildMode configuration for improved scalability for large clusters [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-parameter-server-parent/nd4j-parameter-server-node/src/main/java/org/nd4j/parameterserver/distributed/v2/enums/MeshBuildMode.java)
* Spark network data pipelines: added FileBatch, FileBatchRecordReader etc for "small files" (images etc) distributed training use cases [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6601)
* Added FailureTestingListener for fault tolerance/debugging purposes [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/optimize/listeners/FailureTestingListener.java)
* Upgraded Apache Lucene/Solr to version 7.5.0 (from 7.4.0) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6485)
* Added system properties (```org.deeplearning4j.tempdir``` and ```org.nd4j.tempdir```) to allow overriding of the temporary directories ND4J and DL4J use [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6362) [Link](https://github.com/deeplearning4j/deeplearning4j/commit/21dc50fb069f4584df8560340c56f1be2bf2430e)
* Mode MultiLayerNetwork/ComputationGraph.clearLayerStates methods public (was protected) [Link](https://github.com/deeplearning4j/deeplearning4j/commit/dc192d29257736995f7878f32576f206ef13eac0)
* ```AbstactLayer.layerConf()``` method is now public [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6553)
* ParallelWrapper module now no longer has a Scala version suffix for artifact id; new artifact id is ```deeplearning4j-parallel-wrapper``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6560)
* Improved validation and error mesages for invalid inputs/labels in Yolo2OutputLayer [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6584)
* Spark training: added SharedTrainingMaster.Builder.workerTogglePeriodicGC and .workerPeriodicGCFrequency to easily configure the ND4J garbage collection configuration on workers. Set default GC to 5 seconds on workers [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6604)
* Spark training: added threshold encoding debug mode (logs current threshold and encoding statistics on each worker during training). Enable using ```SharedTrainingConfiguration.builder.encodingDebugMode(true)```. Note this operation has computational overhead. [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6622)

### Deeplearning4J: Bug Fixes and Optimizations

* Fixed an issue where L1/L2 and updaters (Adam, Nesterov, etc) were applied before dividing gradients by minibatch to obtain average gradient. To maintain old behaviour, use ```NeuralNetConfiguration.Builder.legacyBatchScaledL2(true)``` [Link](https://github.com/deeplearning4j/deeplearning4j/blob/87167e91c616584a296abe637d408a8efd9e05b7/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/NeuralNetConfiguration.java#L1034-L1045).
    - Note that learning rates may need to be decreased for some updaters (such as Adam) to account for this change vs. earlier versions. Some other updaters (such as SGD, NoOp, etc) should be unaffected.
    - Note that deserialized (loaded) configurations/networks saved in 1.0.0-beta2 or earlier will default to old behaviour for backward compatibility. All new networks (created in 1.0.0-beta3) will default to the new behaviour.
* Fixed an issue where EarlyStoppingScoreCalculator would not correctly handle "maximize score" cases instead of minimizing [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6237)
* Fixed order (BGR vs. RGB) for VGG16ImagePreProcessor channel offset values [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6254)
* Fixed bug with variational autoencoders using weight noise [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6289)
* Fixed issue with BaseDataSetIterator not respecting the 'maximum examples' configuration [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6283)
* Optimization: A workspace is now used for ComputationGraph/MultiLayerNetwork evaluation methods (avoids allocating off-heap memory during evaluation that must be cleaned up by garbage collector) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6295)
* Fixed an issue where shuffling combined with a subset for MnistDataSetIterator would not maintain the same subset between resets [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6299)
* Fixed issue with StackVertex.getOutputType [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6128)
* Fix issue with CNN to/from RNN preprocessors handling of mask arrays [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6316)
* Fixed issue with VGG16 non-pretrained configuration in model zoo [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6348)
* Fixed issue with TransferLearning nOutReplace where multiple layers in a row are modified [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6343)
* Fixed issue with CuDNN workspaces where backpropagation is performed outside of a standard fit call [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6358)
* Fixed an issue with dropout masks being cleared prematurely on output layers in ComputationGraph [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6326)
* RecordReaderMultiDataSetIterator now supports 5D arrays (for 3D CNNs) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6366)
* Fixed bug in multi input/output ComputationGraphs with TBPTT combined with both masking and different number of input/output arrays [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6375)
* Improved input validation/exceptions for batch normalization layer [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6403)
* Fixed bug with TransferLearning GraphBuilder nOutReplace when combined with subsampling layers [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6389)
* SimpleRnnParamInitializer now properly respects bias initialization configuration [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6431)
* Fixed SqueezeNet zoo model non-pretrained configuration [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6500)
* Fixed Xception zoo model non-pretrained configuration [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6501)
* Fixed an issue with some evaluation signatures for multi-output ComputationGraphs [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6497)
* Improved MultiLayerNetwork/ComputationGraph summary method formatting for large nets [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6502)
* Fixed an issue where gradient normalization could result in NaNs if gradient is exactly 0.0 for all parameters in a layer [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6539#issuecomment-427726265)
* Fixed an issue where MultiLayerNetwork/ComputationGraph.setLearningRate could throw an exception for SGD and NoOp updaters [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6520)
* Fixed an issue with StackVertex plus masking in some rare cases [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6490)
* Fixed an issue with JSON deserialization of frozen layers in pre-1.0.0-alpha format [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6552)
* Fixed an issue where GraphBuilder.removeVertex can fail under some limited circumstances [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6565)
* Fixed a bug in CacheableExtractableDataSetFetcher [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6602)
* DL4J Spark training: Fixed issues with thread/device affinity for multi-GPU training + evaluation [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6614)
* DL4J Spark training: Made all Aeron threads daemon threads to prevent Aeron from stopping JVM shutdown when all other threads have completed [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6614)
* Added cudnnAllowFallback configuration for BatchNormalization layer (fallback to built-in implementation if CuDNN fails unexpectedly) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6614)
* Fixed some rare concurrency issues with multi-worker (multi-GPU) nodes for Spark training [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6618) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6636)
* Fixed an issue with BatchNormalization layers that prevented the mean/variance estimates from being synced properly on each worker for GradientSharing training, causing convergence issues [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6626)
* Added a check to detect ZipSlip CVE attempts in ArchiveUtils [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6630)
* DL4J Spark training and evaluation: methods now use Hadoop Configuration from Spark context to ensure runtime-set configuration is available in Spark functions reading directly from remote storage (HDFS etc) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6633)
* MultiLayerNetwork and ComputationGraph now properly support more than Integer.MAX_VALUE parameters [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6611) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6634)
* Added data validation for Nd4j.readTxt - now throws exception on invalid input instead of returning incorrect values [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6632)
* Fixed an issue with KNN implementation where a deadlock could occur if an invalid distance function (one returning "distances" less than 0) was utilized [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6639)
* Added synchronization to loading of Keras import models to avoid thread safety issues in the underlying HDFS library used for loading [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6649)
* Fixed rare issue for Async(Multi)DataSetIterator with large prefetch values [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6662)


### Deeplearning4J: API Changes (Transition Guide): 1.0.0-beta2 to 1.0.0-beta3

* IEvaluation classes in DL4J have been deprecated and moved to ND4J so they are available for SameDiff training. Functionality and APIs are unchanged
* MultiLayerConfiguration/ComputationGraphConfiguration ```pretrain(boolean)``` and ```backprop(boolean)``` have been deprecated and are no longer used. Use fit and pretrain/pretrainLayer methods instead. [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6296)
* ParallelWrapper module now no longer has a Scala version suffix for artifact id; new artifact id is ```deeplearning4j-parallel-wrapper``` which should be used instead [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6560)
* deeplearning4j-nlp-korean module now has Scala version suffix due to scala dependencies; new artifact ID is ```deeplearning4j-nlp-korean_2.10``` and ```deeplearning4j-nlp-korean_2.11``` [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6306)

### Deeplearning4J: Known issues: 1.0.0-beta3

* Running multiple Spark training jobs simultaneously on the one physical node (i.e., multiple JVMs from one or more Spark jobs) may cause problems with network communication. A workaround for this is to manually set a unique stream ID manually in the VoidConfiguration. Use a unique (or random) integer value for different jobs [Link](https://github.com/deeplearning4j/deeplearning4j/blob/b05c95b05404b722f908daf601ba290907d9c81e/nd4j/nd4j-parameter-server-parent/nd4j-parameter-server-node/src/main/java/org/nd4j/parameterserver/distributed/conf/VoidConfiguration.java#L48-L52)

## <a name="onezerozerobeta3-dl4jkeras">Deeplearing4J: Keras Import</a>

* Fixed import issue due to Keras JSON format changes for Keras 2.2.3+ [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6590)
* Added Keras import for timeseries preprocessing [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6127)
* Elephas [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6197)
* Fixed issue with importing models with reshaping after an embedding layer [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6175)
* Added support for Keras masking layers [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6250)
* Fixed JSON deserialization issue with some layers/preprocessors, such as Permute [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6489)
* Fixed issue with Keras import of Nadam configuration [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6646)

## <a name="onezerozerobeta3-nd4j">ND4J</a>

### ND4J: New Features

* Added SameDiff training and evaluation: SameDiff instances can now be trained directly using DataSetIterator and MultiDataSetIterator, and evaluated using IEvaluation instances (that have been moved from ND4J to DL4J) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6599)
* Added GraphServer implementation: c++ inference server for SameDiff (and Tensorflow, via TF import) with Java API [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6273)
* SameDiff instances can now be loaded from serialized FlatBuffers format (SameDiff.asFlatFile plus fromFlatFile) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6484) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5759)
* Added MKL-DNN support for some operations (Conv2d, etc) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6204)
* Upgraded ND4J (and DataVec) to Arrow 0.11.0 [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6579), which also fixes [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6372)
* Added Nd4j.where op method (same semantics as numpy.where) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6242)
* Added Nd4j.stack op method (combine arrays + increase array rank by 1) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/663224cc901e99553ff775fb1ebdde479b5648fd/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/factory/Nd4j.java#L5165-L5178)
* Libnd4j new ops:
    - Matrix band part [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6251)
    - Scatter ND, ND-add, ND-sub and ND-update ops [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6272)
    - Sparse softmax cross entropy loss with logits [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6307)
    - Histogram fixed width op [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6325)
    - broadcast_to op [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6354)
    - deconv3d op added [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6387)
    - Unsorted segment ops added [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6391)
    - Segment_X backprop ops added [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6402)
    - batchnorm_new op added that supports multiple axes for mean/variance [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6443)
    - GRU cell backprop added [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6588)
* Nd4j Preconditions class now has methods for formatting INDArray arguments [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6451), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6470)
* SameDiff loss functions: cleanup plus forward pass implementation [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6534)
* CudaGridExecutioner now warns that exception stack traces may be delayed to avoid confusion in debugging exceptions occuring during asynchronous execution of ops [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6493)
* JavaCPP and JavaCPP-presets have been upgraded to version 1.4.3 [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6587)
* Improved Javadoc on SDVariable class [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6661)

### ND4J: Bug Fixes and Optimizations

* Fixes for android: Remove use of RawIndexer [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6205)
* Libnd4j custom ops: conv op weight layouts are now not dependent on the input format (NCHW/NHWC) - now always ```[kH, kW, inChannels, outChannels]``` for 2d CNNs, ```[kH, kW, kD, inChannels, outChannels]``` for 3d CNNs. [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6412), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6393)
* Libnd4j native op fixes:
    - Dot operation backprop [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6109), determinant [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6110)
    - Backprop op fix for the broadcast case for some pairwise transform custom op implementations [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6037)
    - Fix for reverse custom op with rank 1 inputs [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6142)
    - ATan2 op is now broadcastable [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6157)
    - Boolean custom op broadcast fixes/additions [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6158)
    - Scatter op edge case fixes [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6167)
    - ArgMin shape function fix [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6176), negative axis fix [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6209)
    - Unique op fix [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6178)
    - Pad op fix [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6191)
    - Fixed where op shape function [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6238)
    - SVD rank 1 edge case fix [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6239)
    - Range op [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6291)
    - Split and space_to_batch fixes [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6318)
    - Broadcast dynamic shape [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6365)
    - embedding_lookup op now supports multiple input arrays [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6311)
    - Matrix determinant op edge case (rank 0 result) shape fix [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6441)
* SameDiff TensorFlow import: fixes for multiple operations [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6145), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6196), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6236), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6373)
* SameDiff: Improved error handling for multiple outputs case [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6216)
* Fixed issue where INDArray.permute would not correctly throw an exception for invalid length case [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6159)
* Fixed issues with INDArray.get/put with SpecifiedIndex [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6341), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6327)
* Minor change to DataSet.merge - signature now accepts any DataSet subtypes [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6424)
* INDArray.transposei operation was not in-place [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6401)
* Fixed issues with INDArray.mmul with MMulTranspose [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6378)
* Added additional order validation for ND4J creation methods (create, rand, etc) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6442)
* Fix for ND4J binary deserialization (BinarySerde) when deserializing from heap byte buffers [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6461)
* Fixed issue with Nd4j-common ClassPathResource path resolution in some IDEs [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6483)
* Fixed issue where INDArray.get(interval) on rank 1 array would return rank 2 array [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6347)
* Fixed a validation issue with Nd4j.gemm/mmuli on views [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6521) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6543)
* INDArray.assign(INDArray) no longer allows assigning different shape arrays (other than scalar/vector cases) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6545)
* NDarrayStrings (and INDArray.toString()) now always uses US locale when formatting numbers [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6537)
* Fixed an issue with GaussianDistribution specific to V100 GPUs [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6518)
* Fixed an issue with bitmap compression/encoding specific to V100 GPUs [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6638)
* Transforms.softmax now throws an error on unsupported shapes instead of simply not applying operation [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6512)
* VersionCheck functionality: handle case where SimpleFileVisitor is not available on earlier versions of Android [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6609)
* SameDiff convolution layer configuration (Conv2dConfig/Conv3dConfig/Pooling3dConfig etc) have had parameter names aligned [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5577)


### ND4J: API Changes (Transition Guide): 1.0.0-beta2 to 1.0.0-beta3

* CUDA 8.0 support has been removed. CUDA 9.0, 9.2 and 10.0 support is available in 1.0.0-beta3
* nd4j-base64 module contents have been deprecated; use the equivalent classes in nd4j-api from now on [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6599)
* Some classes in nd4j-jackson module has been deprecated; use the equivalent classes in nd4j-api from now on [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6599)


### ND4J: Known issues: 1.0.0-beta3

* Android users may need to manually exclude the (now deprecated) module nd4j-base64. This is due to ```org.nd4j.serde.base64.Nd4jBase64``` class being present in both nd4j-api and nd4j-base64 modules. Both versions have identical content. Use ```exclude group: 'org.nd4j', module: 'nd4j-base64'``` to exclude.


## <a name="onezerozerobeta3-datavec">DataVec</a>

### DataVec: New Features

* Added NativeImageLoader method overloads for org.opencv.core.Mat and String as filename [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6459)

### DataVec: Optimizations and Bug Fixes

* Fix for JDBCRecordReader handling of null values [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6113)
* Improved errors/validation for ObjectDetectionRecordReader for invalid input (where image object centers are outside of image bounds) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6101)
* Fixed issue where FileSplit using methods that are unavailable on earlier versions of Android [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6457)
* Added SerializableHadoopConfiguration and BroadcastHadoopConfigHolder for cases where a Hadoop configuration is required in Spark functions [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-spark/src/main/java/org/datavec/spark/util/SerializableHadoopConfig.java) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-spark/src/main/java/org/datavec/spark/util/BroadcastHadoopConfigHolder.java)
* Fixed issue with JDBCRecordReader's handling of real-valued column result types [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6617)
* Added validation and useful exception for CSVRecordReader/LineRecordReader being used without initialization [Link](https://github.com/deeplearning4j/deeplearning4j/commit/fdffabd38bc8e5f2498a144576864f7dc5c33fa8)


## <a name="onezerozerobeta3-arbiter">Arbiter</a>

### Arbiter: Fixes

* Fixed some issues with dropout layers [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6265)


## <a name="onezerozerobeta3-nd4s">ND4S</a>

* Added conversion between org.nd4j.linalg.primitives.Pair/Triple and Scala Tuple [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6323)

---
---




# <a name="onezerozerobeta2">Release Notes for Version 1.0.0-beta2</a>

## Highlights - 1.0.0-beta2 Release

* ND4J/Deeplearning4j: Added support for CUDA 9.2. Dropped support for CUDA 9.1. (1.0.0-beta2 release has CUDA 8.0, 9.0 and 9.2 support)
* Deeplearning4j: New SameDiff layers with training support - [Link](https://github.com/deeplearning4j/dl4j-examples/tree/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/samediff) [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/samediff)
* Deeplearning4j resource (datasets, pretrained models) storage directory can now be configured via ```DL4JResources.setBaseDirectory``` method or ```org.deeplearning4j.resources.directory``` system property
* ND4J: all indexing is now done with longs instead of ints to allow for arrays with dimensions and lengths greater than Integer.MAX_VALUE (approx. 2.1 billion)
* ND4J: nd4j-native-platform will now use Intel MKL-DNN as the default/bundled BLAS implementation (replacing OpenBLAS as the previous default)
* Deeplearning4j: Added Out-of-memory (OOM) crash dump reporting functionality. Provides a dump with memory use and configuration if training/inference OOMs (to assist with debugging and tuning memory configuration).
* Deeplearning4j - new layers: Locally connected 1d [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D.java), Locally connected 2d [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected2D.java)


## <a name="onezerozerobeta2-dl4j">Deeplearning4J</a>

### Deeplearning4J: New Features

* Added new SameDiff layers (automatic differentiation - only single class, forward pass definition required) to DL4J with full training support - SameDiffLayer, SameDiffVertex, SameDiffOutputLayer, SameDiffLambdaLayer, SameDiffLambdaVertex - note that these are CPU-only execution for now [Link](https://github.com/deeplearning4j/dl4j-examples/tree/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/samediff) [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/samediff) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5730)
* Resource (datasets, pretrained models) storage directory can now be configured via ```DL4JResources.setBaseDirectory``` method or ```org.deeplearning4j.resources.directory``` system property. Note that it is also possible to set a different base location for downloads (for local mirrors of DL4J resources) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5315)
* Added Out-of-memory (OOM) crash dump reporting functionality. Provides a dump with memory use and configuration if training/inference OOMs. Same information is available (without a crash) for MultiLayerNetwork/ComputationGraph.memoryInfo methods. Can be disabled (or output directory set) using [system properties](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-common/src/main/java/org/deeplearning4j/config/DL4JSystemProperties.java) - [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/util/CrashReportingUtil.java)
* Added Composite[Multi]DataSetPreProcessor to enable multiple [Multi]DataSetPreProcessors to be applied in a single iterator [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/dataset/api/preprocessor/CompositeDataSetPreProcessor.java)
* Added ComputationGraph evaluate methods for multi-output networks: ```evaluate(DataSetIterator, Map<Integer,IEvaluation[]>)``` and ```evaluate(MultiDataSetIterator, Map<Integer,IEvaluation[]>)``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5623)
* Added JointMultiDataSetIterator - utility iterator used to create MultiDataSetIterator from multiple DataSetIterators [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/JointMultiDataSetIterator.java)
* GraphVertices may now have trainable parameters directly (not just enclose layers with trainable parameters) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5730)
* Added MultiLayerNetwork/ComputationGraph getLearningRate methods [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5766)
* Added RandomDataSetIterator and RandomMultiDataSetIterator (mainly for testing/debugging) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/RandomDataSetIterator.java) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/RandomMultiDataSetIterator.java)
* Added cyclical "1cycle" schedule for learning rate schedules etc - [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5844)
* RDD repartitioning for Spark training is more configurable (adds Repartitioner interface) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5858)
* Added ComputationGraph.getIterationCount() and .getEpochCount() for consistency with MultiLayerNetwork [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5880)
* Added locally connected 1d layer [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5891) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LocallyConnected1D.java)
* Spark "data loader" API (mainly for Spark) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-common/src/main/java/org/nd4j/api/loader/Loader.java) [Link](https://github.com/deeplearning4j/deeplearning4j/search?q=DataLoader+in%3Apath&unscoped_q=DataLoader+in%3Apath) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/528443d6b83352b8cc07ce891a603da2540e58d8/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/impl/graph/SparkComputationGraph.java#L241-L255)
* Spark evaluation: added evaluation method overloads that allow specifying the number of evaluation workers (less than number of Spark threads) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5904)
* CnnSentenceDataSetIterator now has a Format argument, and supports outputting data for RNNs and 1D CNNs [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nlp-parent/deeplearning4j-nlp/src/main/java/org/deeplearning4j/iterator/CnnSentenceDataSetIterator.java#L68-L76)
* Added ```ComputationGraph/MultiLayerNetwork.pretrain((Multi)DataSetIterator, int epochs)``` method overloads [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5947)
* MultiLayerNetwork and ComputationGraph now have ```output``` method overloads where the network output can be placed in the user-specified workspace, instead of being detached [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5932) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/graph/ComputationGraph.java#L1632-L1647). This can be used to avoid creating INDArrays that need to be garbage collected before native memory can be freed.
* EmbeddingSequenceLayer now supports ```[minibatch,1,seqLength]``` format sequence data in addition to ```[minibatch,seqLength]``` format data [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5960)
* CuDNN batch norm implementation will now be used for rank 2 input, not just rank 4 input [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6011)
* Environment variables and system properties for DL4J have been centralized into DL4JResources and DL4JEnvironmentVars classes, with proper descriptions [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-common/src/main/java/org/deeplearning4j/config/DL4JEnvironmentVars.java) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-common/src/main/java/org/deeplearning4j/config/DL4JSystemProperties.java)
* MultiLayerNetwork and ComputationGraph output/feedForward/fit methods are now thread-safe via synchronization. Note that concurrent use is not recommended due to performance (instead: use ParallelInference); however the now-synchronized methods should avoid obscure errors due to concurrent modifications [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6018)
* BarnesHutTSNE now throws a useful exception in the case where the distance metric is undefined (for example, all zeros plus cosine similarity) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6094)


### Deeplearning4J: Bug Fixes and Optimizations

* ComputationGraph.addListeners was not working correctly if listeners were already present [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5281), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5251)
* TinyImageNetDataSetIterator did not validate/correctly use input shape configuration [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5281), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5234)
* BatchNormalization layer now correctly asserts that nOut is set if required (instead of unfriendly shape errors later) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5302)
* Fixed issue where OutputLayer may not initialize parameter constraints correctly [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5306)
* Fixed performance issue with Nesterov updater using CPU-only op for CUDA execution [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5331)
* Removed TerminationCondition for DL4J optimizers - was not used in practice, and had minor overhead [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5340)
* Fixed issue where EvaluativeListener could hit a workspace validation exception when workspaces are enabled [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5351)
* Fixed issue where TrainingListener.onEpochStart/onEpochEnd were not being called correctly for ComputationGraph [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5414)
* Fixed workspace issue with TensorFlowCnnToFeedForwardPreProcessor [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5465)
* Performance optimization for BatchNormalization when using CuDNN [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5483)
* Performance optimization: Dropout will be applied in-place when safe to do so, avoiding a copy [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5489)
* Added CuDNN implementation of Dropout [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5501)
* Reduced memory use for CuDNN: CuDNN working memory is now shared and reused between layers within a network [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5539)
* CuDNN batch normalization implementation would fail with FP16 datatype [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5554)
* Fixed issue Bidirectional LSTM may incorrectly use workspaces causing an exception [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5472)
* Fixed issue with early stopping where scores to be maximized (accuracy, f1, etc) were not properly triggering termination conditions [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5565)
* Fixed issue where label mask counter could be incorrectly incremented in ComputationGraph.computeGradientAndScore() [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5595)
* ComputationGraph was not setting lastEtlTime field during training [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5614)
* Fixed issue with AutoEncoder layer when workspaces are enabled [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5663)
* Fixed issue with EmbeddingSequenceLayer use of mask arrays [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5778)
* Lombok is now provided scope everywhere, isn't on user classpath when using DL4J [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5785)
* Fixed issue where WordVectorSerializer.readParagraphVectors(File) initialization of label source [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5806)
* Spark training (gradient sharing) now properly handles empty partition edge case when encountered during training [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5829)
* Errors are propagated better/more consistently for Spark gradient sharing training [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5879)
* Fixed issue with 1D CNN layers with mask arrays and stride > 1 (masks not being correctly downsized) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5880)
* DL4J Batch norm implementation was not correctly adding epsilon value during inference, only during training (CuDNN unaffected) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5836)
* CuDNN subsampling layers with max pooling and ConvolutionMode.SAME may have taken padding value (0) as the maximum for border values when all non-padding values are less than 0 [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5836)
* Spark training with gradient sharing now passes listeners to workers correctly [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5947)
* Fixed rare (and non-terminal) concurrent modification issue with UI and FileStatsStorage [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5519)
* CuDNN convolution layer now supports dilation > 2 (previously: used DL4J conv layer implementation as a fallback) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4866)
* Yolo2OutputLayer now implements computeScoreForExamples() [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5056)
* SequenceRecordReeaderDataSetIterator now handles the "no labels" case correctly [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5966)
* Fixed issue where BarnesHutTSNE could hit a workspace validation exception [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5977)
* EMNIST iterator could produce incorrect data in some cases after a reset [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6061)

### Deeplearning4J: API Changes (Transition Guide): 1.0.0-beta to 1.0.0-beta2

* GravesLSTM has been deprecated in favor of LSTM due to lack of CuDNN support but otherwise similar accuracy to in practice. Use LSTM class instead.
* deeplearning4j-modelexport-solr: now uses Lucene/Solr version 7.4.0 (was 7.3.0) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5744)
* Mask arrays for CNN2d layers must be in broadcastable 4d format: ```[minibatch,depth or 1, height or 1, width or 1]``` - previously they were 2d with shape ```[minibatch,height]``` or ```[minibatch,width]```. This provents ambiguity in later cases (pooling layers), and allows for more complex masking scenarios (such as masking for different image sizes in same minibatch). [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5942)
* Some older/deprecated Model and Layer methods have been removed. (validateInput(), initParams()). Some custom layers may need to be updated as a result [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5954)


### Deelpearning4J: 1.0.0-beta2 Known Issues

* Windows users are unable to load the HDF5 files used in SvhnLabelProvider (used in HouseNumberDetection example). Linux/Mac users are unaffected. A workaround for windows users is to add the sonatype snapshot dependency ```org.bytedeco.javacpp-presets:hdf5-platform:jar:1.10.2-1.4.3-SNAPSHOT``` [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6017)

## <a name="onezerozerobeta2-dl4jkeras">Deeplearing4J: Keras Import</a>

* Keras model import now imports every Keras application
* Supports GlobalPooling3D layer import
* Supports RepeatVector layer import
* Supports LocallyConnected1D and LocallyConnected2D layers
* Keras Lambda layers can now be imported by registering custom SameDiff layers
* All Keras optimizers are now supported
* All advanced activation functions can now be imported.
* Many minor bugs have been fixed, including proper weight setting for all configurations of BatchNormalization, improvements to Reshape SeparableConvolution2D, and full support of Bidirectional layers.

## <a name="onezerozerobeta2-nd4j">ND4J</a>

### ND4J: New Features

* ND4J: all indexing is now done with longs instead of ints to allow for arrays with dimensions and lengths greater than Integer.MAX_VALUE (approx. 2.1 billion)
* Added the ability to write Numpy .npy format using ```Nd4j.writeAsNumpy(INDArray,File)``` and convert an INDArray to a numpy strict in-memory using ```Nd4j.convertToNumpy(INDArray)``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5973)
* ND4j-common ClassPathResource: added ClassPathResource.copyDirectory(File) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5298)
* SameDiff: A significant number of new ops, and backprop implementations for existing ops
* Added Nd4j.randomBernoulli/Binomial/Exponential convenience methods [Link](https://github.com/deeplearning4j/deeplearning4j/blob/b887d2f0601fc6562a5a278e822690d2c338aaad/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/factory/Nd4j.java#L3150-L3223)
* Added way to disable/suppress ND4J initialization logging via ```org.nd4j.log.initialization``` system property [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-common/src/main/java/org/nd4j/config/ND4JSystemProperties.java#L27-L33)
* SameDiff class - most op/constructor methods now have complete/useful javadoc [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff/samediff/SameDiff.java)
* Workspaces can now be disabled globally, ignoring workspace configuration. This is mainly used for debugging; use ```Nd4j.getWorkspaceManager().setDebugMode(DebugMode.DISABLED)``` or ```Nd4j.getWorkspaceManager().setDebugMode(DebugMode.SPILL_EVERYTHING);``` to enable this. [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5980) [Link]
* Added EnvironmentalAction API for environment variable processing [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6003)
* ND4J environment variables and system properties have been centralized in ND4jEnvironmentVars and ND4jSystemProperties classes [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-common/src/main/java/org/nd4j/config/ND4JEnvironmentVars.java) and [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-common/src/main/java/org/nd4j/config/ND4JSystemProperties.java)

### ND4J: Bug Fixes and Optimizations

* SameDiff: a significant number of bug fixes for execution and individual ops
* Fixed issue where INDArray.toDoubleArray() with true scalars (rank 0 arrays) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5362)
* Fixed issue with DataSet.sample() not working for rank 3+ features [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5477)
* IActivation implementations now validate/enforce same shape for activations and gradients [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5357)
* Fixed issue with muliColumnVector where vector is 1d [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5530)
* ImagePreProcessingScaler now supports serialization via NormalizerSerializerStrategy and ModelSerializer [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5694)
* Performance optimization for threshold encoding used in DL4J's Spark gradient sharing distributed training implementation [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5767)
* SameDiff: Fixed issue where memory wasn't always released after execution [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5934)
* DataSet.save() and MultiDataSet.save() methods now save example metadata when present [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4557)
* Fixed issue with KFoldIterator when dataset does not divide equally into folds with no remainder [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5974)
* Fixed issue where version check functionality could fail to load resources if resources are on a path with spaces [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6056)


### ND4J: Known Issues




### ND4J: API Changes (Transition Guide): 1.0.0-beta to 1.0.0-beta2

* CUDA 9.1 support has been removed. CUDA 8.0, 9.0 and 9.2 support is available
* Due to long indexing changes, long/long[] should be used in place of int/int[] in some places (such as INDArray.size(int), INDArray.shape())
* Simplified DataSetIterator API: totalExamples(), cursor() and numExamples() - these were unsupported on most DataSetIterator implementations, and not used in practice for training. Custom iterators should remove these methods also [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5560)
* Long-deprecated DataSet.getFeatureMatrix() has been removed. Use DataSet.getFeatures() instead. [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6006)
* Unused and not properly tested/maintained utility class BigDecimalMath has been removed. Users should find an aternative library for this functionality, if required.
* Not properly maintained complex number support classes (IComplexNumber, IComplexNDArray) have been removed entirely [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6031)


## <a name="onezerozerobeta2-datavec">DataVec</a>

### DataVec: New Features

* Added AnalyzeLocal class to mirror functionality of AnalyzeSpark (but without Spark dependency) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-local/src/main/java/org/datavec/local/transforms/AnalyzeLocal.java)
* Added JacksonLineSequenceRecordReader: RecordReader used for multi-example JSON/XML where each line in a file is an independent example [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/jackson/JacksonLineSequenceRecordReader.java)
* Added ```RecordConvert.toRecord(Schema, List<Object>)``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5849)
* Added missing FloatColumnCondition [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5933)
* Added CSVLineSequenceRecordReader for "each line in CSV is a sequence, and sequence is single-valued/univariate" [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVLineSequenceRecordReader.java)
* Added CSVMultiSequenceRecordReader for "multiple multi-valued sequences in a single CSV" data [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/datavec/datavec-api/src/main/java/org/datavec/api/records/reader/impl/csv/CSVMultiSequenceRecordReader.java) 

### DataVec: Optimizations and Bug Fixes

* Fixed issue with NativeImageLoader on Android [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5468)
* Fixed issue with ExcelRecordReader [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5758)
* Fixed issue where bad args for ```CSVRecordReader.next(int)``` could cause an unnecessarily large list to be generated [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5963)

### DataVec: API Changes (Transition Guide): 1.0.0-beta to 1.0.0-beta2


## <a name="onezerozerobeta2-arbiter">Arbiter</a>

### Arbiter: New Features

* Added DataSource interface. Unlike old DataProvider, this does not require JSON serializability (only a no-arg constructor) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5952)
* Added numerous enhancements and missing configuration options (constraints, dilation, etc) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/6062) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/6089)

### Arbiter: Fixes

* DataProvider has been deprecated. Use DataSource instead.

## <a name="onezerozerobeta2-rl4j">RL4J</a>

* stepCounter, epochCounter and historyProcessor can now be set [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5972)
* Random seed is now loaded for ACPolicy is loaded [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5543)


## <a name="onezerozerobeta2-scalnet">ScalNet</a>


## <a name="onezerozerobeta2-nd4s">ND4S</a>


---
---


# <a name="onezerozerobeta">Release Notes for Version 1.0.0-beta</a>

## Highlights - 1.0.0-beta Release

* Performance and memory optimizations for DL4J


## <a name="onezerozerobeta-dl4j">Deeplearning4J</a>

### Deeplearning4J: New Features

* New or enhanced layers:
    * Added Cropping1D layer [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping1D.java)
    * Added Convolution3D, Cropping3D, UpSampling3D, ZeroPadding3D, Subsampling3D layers (all with Keras import support): [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Convolution3D.java) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5026)
    * Added EmbeddingSequenceLayer (EmbeddingLayer for time series) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/EmbeddingSequenceLayer.java)
    * Added OCNNOutputLayer (one-class neural network) - implementation of [this paper](https://arxiv.org/pdf/1802.06360.pdf) - [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ocnn/OCNNOutputLayer.java)
    * Added FrozenLayerWithBackprop layer [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/misc/FrozenLayerWithBackprop.java)
    * Added DepthwiseConvolution2D layer [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/DepthwiseConvolution2D.java)
* Added ComputationGraph.output(DataSetIterator) method [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4965)
* Added MultiLayerNetwork/ComputationGraph.layerInputSize methods [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4670) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5018)
* Added SparkComputationGraph.feedForwardWithKey overload with feature mask support [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4984)
* Added MultiLayerNetwork.calculateGradients method (for easily getting parameter and input gradients, for example for some model interpretabilithy approaches) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5018) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/2866)
* Added support to get input/activation types for each layer from configuration: ```ComputationGraphConfiguration.getLayerActivationTypes(InputType...)```, ```ComputationGraphConfiguration.GraphBuilder.getLayerActivationTypes()```, ```NeuralNetConfiguration.ListBuilder.getLayerActivationTypes()```, ```MultiLayerConfiguration.getLayerActivationTypes(InputType)``` methods [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5031)
* Evaluation.stats() now prints confusion matrix in easier to read matrix format, rather than list format [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5096)
* Added ModelSerializer.addObjectToFile, .getObjectFromFile and .listObjectsInFile for storing arbitrary Java objects in same file as saved network [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4957)
* Added SpatialDropout support (with Keras import support) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/dropout/SpatialDropout.java)
* Added ```MultiLayerNetwork/ComputationGraph.fit((Multi)DataSetIterator, int numEpochs)``` overloads [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5118)
* Added performance (hardware) listeners: ```SystemInfoPrintListener``` and ```SystemInfoFilePrintListener``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5151)

### Deeplearning4J: Bug Fixes and Optimizations

* Performance and memory optimizations via optimizations of internal use of workspaces [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4900)
* Reflections library has entirely been removed from DL4J and is no longer required for custom layer serialization/deserialization [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4950), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4956)
    * Fixes issues with custom and some Keras import layers on Android
* RecordReaderMultiDataSetIterator will no longer try to convert unused columns to numerical values [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4945)
* Added new model zoo models:
    * (to do)
* Fixes for Android compilation (removed duplicate classes, aligned versions, removed some dependencies) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4955) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5074) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5087)
* Fix for RecordReaderMulitDataSetIterator where output could be incorrect for some constructors [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4969)
* Non-frozen layers before a frozen layer will no longer be skipped during backprop (useful for GANs and similar architectures) [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5009) [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4964)
* Fixed issue where ComputationGraph topological sort may not be consistent on all platforms; could sometimes break ComputationGraphs (with multiple valid topological orderings) trained on PC and deployed on Android [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5050)
* Fixed issue with CuDNN batch norm using ```1-decay``` instead of ```decay``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5076)
* deeplearning4j-cuda no longer throws exceptions if present on classpath with nd4j-native backend set to higher priority [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5000)
* Added RNG control for CifarDataSetIterator [Link](https://github.com/deeplearning4j/deeplearning4j/issues/5067)
* WordVectorSerializer now deletes temp files immediately once done [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5166)

### Deeplearning4J: API Changes (Transition Guide): 1.0.0-alpha to 1.0.0-beta

* WorkspaceMode.SINGLE and SEPARATE have been deprecated; use WorkspaceMode.ENABLED instead
* Internal layer API changes: custom layers will need to be updated to the new Layer API - see built-in layers or custom layer example
* Custom layers etc in pre-1.0.0-beta JSON (ModelSerializer) format need to be registered before they can be deserialized due to JSON format change. Built-in layers and models saved in 1.0.0-beta or later do not require this. Use ```NeuralNetConfiguration.registerLegacyCustomClassesForJSON(Class)``` for this purpose
* IterationListener has been deprecated in favor of TrainingListener. For existing custom listeners, switch from ```implements TrainingListener``` to ```extends BaseTrainingListener``` [Link](https://github.com/deeplearning4j/deeplearning4j/pull/5014)
* ExistingDataSetIterator has been deprecated; use ```fit(DataSetIterator, int numEpochs)``` method instead

### Deelpearning4J: 1.0.0-beta Known Issues

* ComputationGraph TrainingListener onEpochStart and onEpochEnd methods are not being called correctly
* DL4J Zoo Model FaceNetNN4Small2 model configuration is incorrect, causing issues during forward pass
* Early stopping score calculators with values thar should be maximized (accuracy, f1 etc) are not working properly (values are minimized not maximized). Workaround: override ```ScoreCalculator.calculateScore(...)``` and return ```1.0 - super.calculateScore(...)```.

## <a name="onezerozerobeta-dl4jkeras">Deeplearing4J: Keras Import</a>



### Deeplearning4J: Keras Import - API Changes (Transition Guide): 1.0.0-alpha to 1.0.0-beta




## <a name="onezerozerobeta-nd4j">ND4J</a>

### ND4J: New Features


### ND4J: Known Issues
- Not all op gradients implemented for automatic differentiation
- Vast majority of new operations added in 1.0.0-beta do NOT use GPU yet.

### ND4J: API Changes (Transition Guide): 1.0.0-alpha to 1.0.0-beta


## <a name="onezerozerobeta-datavec">DataVec</a>

### DataVec: New Features

* ImageRecordReader now logs number of inferred label classes (to reduce risk of users missing a problem if something is misconfigured) [Link](https://github.com/deeplearning4j/DataVec/issues/569)
* Added AnalyzeSpark.getUnique overload for multiple columns [Link](https://github.com/deeplearning4j/DataVec/issues/71)
* Added performance/timing module [Link](https://github.com/deeplearning4j/DataVec/pull/580)


### DataVec: Optimizations and Bug Fixes

* Reduced ImageRecordReader garbage generation via buffer reuse [Link](https://github.com/deeplearning4j/DataVec/pull/573)
* Fixes for Android compilation (aligned versions, removed some dependencies) [Link](https://github.com/deeplearning4j/DataVec/pull/567) [Link](https://github.com/deeplearning4j/DataVec/pull/575)
* Removed Reflections library use in DataVec [Link](https://github.com/deeplearning4j/DataVec/pull/570)
* Fix for TransformProcessRecordReader batch support [Link](https://github.com/deeplearning4j/DataVec/issues/561)
* Fix for TransformProcessRecordReader with filter operations [Link](https://github.com/deeplearning4j/DataVec/issues/552)
* Fixed issue with ImageRecordReader/ParentPathLabelGenerator incorrectly filtering directories containing ```.``` character(s) [Link](https://github.com/deeplearning4j/DataVec/issues/273)
* ShowImageTransform now initializes frame lazily to avoid blank windows [Link](https://github.com/deeplearning4j/DataVec/pull/579)

### DataVec: API Changes (Transition Guide): 1.0.0-alpha to 1.0.0-beta

* DataVec ClassPathResource has been deprecated; use nd4j-common version instead [Link](https://github.com/deeplearning4j/DataVec/issues/521)



## <a name="onezerozerobeta-arbiter">Arbiter</a>

### Arbiter: New Features

* Added LayerSpace for OCNN (one-class neural network)

### Arbiter: Fixes

* Fixed timestamp issue that could cause incorrect rendering of first model's results in UI [Link](https://github.com/deeplearning4j/Arbiter/pull/163)
* Execution now waits for last model(s) to complete before returning when a termination condition is hit [Link](https://github.com/deeplearning4j/Arbiter/pull/162)
* As per DL4J etc: use of Reflections library has been removed entirely from Arbiter [Link](https://github.com/deeplearning4j/Arbiter/pull/154)
* Remove use of Eclipse Collections library due to issues with Android compilation [Link](https://github.com/deeplearning4j/Arbiter/pull/156)
* Improved cleanup of completed models to reduce maximum memory requirements for training [Link](https://github.com/deeplearning4j/Arbiter/pull/160)


## <a name="onezerozerobeta-rl4j">RL4J</a>


## <a name="onezerozerobeta-scalnet">ScalNet</a>


## <a name="onezerozerobeta-nd4s">ND4S</a>






# <a name="onezerozeroalpha">Release Notes for Version 1.0.0-alpha</a>

## Highlights - 1.0.0-alpha Release

* ND4J: Added SameDiff - Java automatic differentiation library (alpha release) with Tensorflow import (technology preview) and hundreds of new operations
* ND4J: Added CUDA 9.0 and 9.1 support (with cuDNN), dropped support for CUDA 7.5, continued support for CUDA 8.0
* ND4J: Native binaries (nd4j-native on Maven Central) now ship with AVX/AVX2/AVX-512 support (Windows/Linux)
* DL4J: Large number of new layers and API improvements
* DL4J: Keras 2.0 import support



## <a name="onezerozeroalpha-dl4j">Deeplearning4J</a>

### Deeplearning4J: New Features


- Layers (new and enhanced)
    - Added Yolo2OutputLayer CNN layer for object detection ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer.java)). See also DataVec's [ObjectDetectionRecordReader](https://github.com/deeplearning4j/DataVec/blob/master/datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/objdetect/ObjectDetectionRecordReader.java)
    - Adds support for 'no bias' layers via ```hasBias(boolean)``` config (DenseLayer, EmbeddingLayer, OutputLayer, RnnOutputLayer, CenterLossOutputLayer, ConvolutionLayer, Convolution1DLayer). EmbeddingLayer now defaults to no bias ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3882))
    - Adds support for dilated convolutions (aka 'atrous' convolutions) - ConvolutionLayer, SubsamplingLayer, and 1D versions there-of. ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3922))
    - Added Upsampling2D layer, Upsampling1D layer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D.java))
    - ElementWiseVertex now (additionally) supports ```Average``` and ```Max``` modes in addition to Add/Subtract/Product ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/graph/ElementWiseVertex.java))
    - Added SeparableConvolution2D layer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/SeparableConvolution2D.java))
    - Added Deconvolution2D layer (aka transpose convolution, fractionally strided convolution layer) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Deconvolution2D.java))
    - Added ReverseTimeSeriesVertex ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/graph/rnn/ReverseTimeSeriesVertex.java))
    - Added RnnLossLayer - no-parameter version of RnnOutputLayer, or RNN equivalent of LossLayer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/RnnLossLayer.java))
    - Added CnnLossLayer - no-parameter CNN output layer for use cases such as segmentation, denoising, etc. ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/CnnLossLayer.java))
    - Added Bidirectional layer wrapper (converts any uni-directional RNN to a bidirectional RNN) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/recurrent/Bidirectional.java))
    - Added SimpleRnn layer (aka "vanilla" RNN layer) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/recurrent/SimpleRnn.java))
    - Added LastTimeStep wrapper layer (wraps a RNN layer to get last time step, accounting for masking if present) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/recurrent/LastTimeStep.java))
    - Added MaskLayer utility layer that simply zeros out activations on forward pass when a mask array is present ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4647))
    - Added alpha-version (not yet stable) SameDiff layer support to DL4J (Note: forward pass, CPU only for now)([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4675))
    - Added SpaceToDepth and SpaceToBatch layers ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/SpaceToDepth.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/SpaceToBatch.java))
    - Added Cropping2D layer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping2D.java))
- Added parameter constraints API (LayerConstraint interface), and MaxNormConstraint, MinMaxNormConstraint, NonNegativeConstraint, UnitNormConstraint implementations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3957))
- Significant refactoring of learning rate schedules ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3985))
    - Added ISchedule interface; added Exponential, Inverse, Map, Poly, Sigmoid and Step schedule implementations ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/schedule))
    - Added support for both iteration-based and epoch-based schedules via ISchedule. Also added support for custom (user defined) schedules
    - Learning rate schedules are configured on the updaters, via the ```.updater(IUpdater)``` method
- Added dropout API (IDropout - previously dropout was available but not a class); added Dropout, AlphaDropout (for use with self-normalizing NNs), GaussianDropout (multiplicative), GaussianNoise (additive). Added support for custom dropout types ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/dropout))
- Added support for dropout schedules via ISchedule interface ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/dropout/Dropout.java#L64))
- Added weight/parameter noise API (IWeightNoise interface); added DropConnect and WeightNoise (additive/multiplicative Gaussian noise) implementations ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/weightnoise)); dropconnect and dropout can now be used simultaneously
- Adds layer configuration alias ```.units(int)``` equivalent to ```.nOut(int)``` ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3900))
- Adds ComputationGraphConfiguration GraphBuilder ```.layer(String, Layer, String...)``` alias for ```.addLayer(String, Layer, String...)```
- Layer index no longer required for MultiLayerConfiguration ListBuilder (i.e., ```.list().layer(<layer>)``` can now be used for configs) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/3888))
- Added ```MultiLayerNetwork.summary(InputType)``` and ```ComputationGraph.summary(InputType...)``` methods (shows layer and activation size information) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3983))
- MultiLayerNetwork, ComputationGraph and layerwise trainable layers now track the number of epochs ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3957))
- Added deeplearning4j-ui-standalone module: uber-jar for easy launching of UI server (usage: ```java -jar deeplearning4j-ui-standalone-1.0.0-alpha.jar -p 9124 -r true -f c:/UIStorage.bin```)
- Weight initializations:
    - Added ```.weightInit(Distribution)``` convenience/overload (previously: required ```.weightInit(WeightInit.DISTRIBUTION).dist(Distribution)```) ([Link](https://github.com/deeplearning4j/deeplearning4j/commit/45cbb6efc2ad015397b4fdf5eac9d1e9dc70ac9c))
    - WeightInit.NORMAL (for self-normalizing neural networks) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/weights/WeightInit.java))
    - Ones, Identity weight initialization ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/weights/WeightInit.java))
    - Added new distributions (LogNormalDistribution, TruncatedNormalDistribution, OrthogonalDistribution, ConstantDistribution) which can be used for weight initialization ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/distribution))
    - RNNs: Added ability to specify weight initialization for recurrent weights separately to "input" weights ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4579))
- Added layer alias: Convolution2D (ConvolutionLayer), Pooling1D (Subsampling1DLayer), Pooling2D (SubsamplingLayer) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4026))
- Added Spark IteratorUtils - wraps a RecordReaderMultiDataSetIterator for use in Spark network training ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/datavec/iterator/IteratorUtils.java))
- CuDNN-supporting layers (ConvolutionLayer, etc) now warn the user if using CUDA without CuDNN ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4039))
- Binary cross entropy (LossBinaryXENT) now implements clipping (1e-5 to (1 - 1e-5) by default) to avoid numerical underflow/NaNs ([Link](https://github.com/deeplearning4j/nd4j/pull/2121))
- SequenceRecordReaderDataSetIterator now supports multi-label regression ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4080))
- TransferLearning FineTuneConfiguration now has methods for setting training/inference workspace modes ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4090))
- IterationListener iterationDone method now reports both current iteration and epoch count; removed unnecessary invoke/invoked methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4091))
- Added MultiLayerNetwork.layerSize(int), ComputationGraph.layerSize(int)/layerSize(String) to easily determine size of layers ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4582))
- Added MultiLayerNetwork.toComputationGraph() method ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/988630b1c8cde8da6414ca80d146097c902993fb/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/multilayer/MultiLayerNetwork.java#L3391-L3398))
- Added NetworkUtils convenience methods to easily change the learning rate of an already initialized network ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/util/NetworkUtils.java))
- Added MultiLayerNetwork.save(File)/.load(File) and ComputationGraph.save(File)/.load(File) convenience methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4401))
- Added CheckpointListener to periodically save a copy of the model during training (every N iter/epochs, every T time units) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/optimize/listeners/CheckpointListener.java))
- Added ComputationGraph output method overloads with mask arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4553))
- New LossMultiLabel loss function for multi-label classification ([Link](https://github.com/deeplearning4j/nd4j/pull/2724))
- Added new model zoo models:
    - Darknet19 ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/Darknet19.java))
    - TinyYOLO ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/TinyYOLO.java))
- New iterators, and iterator improvements:
    - Added FileDataSetIterator, FileMultiDataSetIterator for flexibly iterating over directories of saved (Multi)DataSet objects ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4618))
    - UCISequenceDataSetIterator ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl/UciSequenceDataSetIterator.java))
    - RecordReaderDataSetIterator now has builder pattern for convenience, improved javadoc ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4424))
    - Added DataSetIteratorSplitter, MultiDataSetIteratorSplitter ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/DataSetIteratorSplitter.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/MultiDataSetIteratorSplitter.java))
- Added additional score functions for early stopping (ROC metrics, full set of Evaluation/Regression metrics, etc) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4630))
- Added additional ROC and ROCMultiClass evaluation overloads for MultiLayerNetwork and ComputationGraph ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4642))
- Clarified Evaluation.stats() output to refer to "Predictions" instead of "Examples" (former is more correct for RNNs) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4674))
- EarlyStoppingConfiguration now supports ```Supplier<ScoreCalculator>``` for use with non-serializable score calculators ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4694))
- Improved ModelSerializer exceptions when trying to load a model via wrong method (i.e., try to load ComputationGraph via restoreMultiLayerNetwork) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4487))
- Added SparkDataValidation utility methods to validate saved DataSet and MultiDataSet on HDFS or local ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/util/data/SparkDataValidation.java))
- ModelSerializer: added restoreMultiLayerNetworkAndNormalizer and restoreComputationGraphAndNormalizer methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4827))
- ParallelInference now has output overloads with support for input mask arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4836))

### Deeplearning4J: Bug Fixes and Optimizations

- Lombok is no longer included as a transitive dependency ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4847))
- ComputationGraph can now have a vertex as the output (not just layers) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/3858), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/3865))
- Performance improvement for J7FileStatsStorage with large amount of history ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3907))
- Fixed UI layer sizes for variational autoencoder layers ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/3905))
- Fixes to avoid HDF5 library crashes ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4069), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4870))
- UI Play servers switch to production (PROD) mode ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4074))
- Related to the above: users can now set ```play.crypto.secret``` system property to manually set the Play application secret; is randomly generated by default ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4289)).
- SequenceRecordReaderDataSetIterator would apply preprocessor twice ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4103))
- Evaluation no-arg constructor could cause NaN evaluation metrics when used on Spark
- CollectScoresIterationListener could recurse endlessly ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4208))
- Async(Multi)DataSetIterator calling reset() on underlying iterator could cause issues in some situations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4239))
- In some cases, L2 regularization could be (incorrectly) applied to frozen layers ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4260))
- Logging fixes for NearestNeighboursServer ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4272))
- Memory optimization for BaseStatsListener ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4292))
- ModelGuesser fix for loading Keras models from streams (previously would fail) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4309))
- Various fixes for workspaces in MultiLayerNetwork and ComputationGraph ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4320), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4291), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4337), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4349), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4541), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4671))
- Fix for incorrect condition in DuplicateToTimeSeriesVertex ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4199))
- Fix for getMemoryReport exception on some valid ComputationGraph networks ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4223))
- RecordReaderDataSetIterator when used with preprocessors could cause an exception under some circumstances ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4214))
- CnnToFeedForwardPreProcessor could silently reshape invalid input, as long as the input array length matches the expected length ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4200))
- ModelSerializer temporary files would not be deleted if JVM crashes; now are deleted immediately when no longer required ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/3855))
- RecordReaderMultiDataSetIterator may not add mask arrays under some circumstances, when set to ALIGN_END mode ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4238))
- ConvolutionIterationListener previously produced an IndexOutOfBoundsException when all convolution layers are frozen ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4313))
- PrecisionRecallCurve.getPointAtRecall could return a point with a correct but sub-optimal precision when multiple points had identical recall ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4327))
- Setting dropout(0) on transfer learning FineTuneConfiguration did not remove dropout if present on existing layer ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4368))
- Under some rare circumstances, Spark evaluation could lead to a NullPointerException ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/3970))
- ComputationGraph: disconnected vertices were not always detected in configuration validation ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/2714))
- Activation layers would not always inherit the global activation function configuration ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4094))
- RNN evaluation memory optimization: when TBPTT is configured for training, also use TBPTT-style splitting for evaluation (identical result, less memory) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4405), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/3482))
- PerformanceListener is now serializable ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4423))
- ScoreIterationListener and PerformanceListener now report model iteration, not "iterations since listener creation" ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4444))
- Precision/recall curves cached values in ROC class may not be updated after merging ROC instances ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4442))  
- ROC merging after evaluating a large number of examples may produce IllegalStateException ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4459))
- Added checks for invalid input indices to EmbeddingLayer ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4585))
- Fixed possible NPE when loading legacy (pre-0.9.0) model configurations from JSON ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4593))
- Fixed issues with EvaluationCalibration HTML export chart rendering ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4589))
- Fixed possible incorrect redering of UI/StatsStorage charts with J7FileStatsStorage when used with Spark training ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4615))
- MnistDataSetIterator would not always reliably detect and automatically fix/redownload on corrupted download data ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4588))
- MnistDataSetIterator / EmnistDataSetIterator: updated download location after hosting URL change ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4632), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4637))
- Fixes to propagation of thread interruptions ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4644))
- MultiLayerNetwork/ComputationGraph will no longer throw an ND4JIllegalStateException during initialization if a network contains no parameters ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4635), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4664))
- Fixes for TSNE posting of data to UI for visualization ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4667))
- PerformanceListener now throws a useful exception (in constructor) on invalid frequency argument, instead of runtime ArithmeticException ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4679))
- RecordReader(Multi)DataSetIterator now throws more useful exceptions when Writable values are non-numerical ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4484))
- UI: Fixed possible character encoding issues for non-English languages when internationalization data .txt files are read from uber JARs ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4512))
- UI: Fixed UI incorrectly trying to parse non-DL4J UI resources when loading I18N data ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4497))
- Various threading fixes ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4794))
- Evaluation: no-arg methods (f1(), precion(), etc) now return single class value for binary case instead of macro-averaged value; clarify values in stats() method and javadoc ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4802))
- Early stopping training: TrainingListener opEpochStart/End (etc) methods were not being called correctly ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4798))
- Fixes issue where dropout was not always applied to input of RNN layers ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4823))
- ModelSerializer: improved validation/exceptions when reading from invalid/empty/closed streams ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4827))
- ParallelInference fixes:
    - fixes for variable size inputs (variable length time series, variable size CNN inputs) when using batch mode ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4836))
    - fixes undelying model exceptions during output method are now properly propagated back to the user ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4836))
    - fixes support for 'pre-batched' inputs (i.e., inputs where minibatch size is > 1) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4836))
- Memory optimization for network weight initialization via in-place random ops ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4837))
- Fixes for CuDNN with SAME mode padding ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4864), [Link](https://github.com/deeplearning4j/deeplearning4j/pull/4871))
- Fix for VariationalAutoencoder builder decoder layer size validation ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4874))
- Improved Kmeans throughput[link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nearestneighbors-parent/nearestneighbor-core/src/main/java/org/deeplearning4j/clustering/algorithm/BaseClusteringAlgorithm.java)
- Add RPForest to nearest neighbors [link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nearestneighbors-parent/nearestneighbor-core/src/main/java/org/deeplearning4j/clustering/randomprojection)

### Deeplearning4J: API Changes (Transition Guide): 0.9.1 to 1.0.0-alpha

- Default training workspace mode has been switched to SEPARATE from NONE for MultiLayerNetwork and ComputationGraph ([Link](https://deeplearning4j.org/workspaces))
- Behaviour change: ```fit(DataSetIterator)``` and similar methods no longer perform layerwise pretraining followed by backprop - only backprop is performed in these methods. For pretraining, use ```pretrain(DataSetIterator)``` and ```pretrain(MultiDataSetIterator)``` methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4279))
- Previously deprecated updater configuration methods (```.learningRate(double)```, ```.momentum(double)``` etc) all removed
    - To configure learning rate: use ```.updater(new Adam(lr))``` instead of ```.updater(Updater.ADAM).learningRate(lr)```
    - To configure bias learning rate: use ```.biasUpdater(IUpdater)``` method
    - To configure learning rate schedules: use ```.updater(new Adam(ISchedule))``` and similar
- Updater configuration via enumeration (i.e., ```.updater(Updater)```) has been deprecated; use ```.updater(IUpdater)```  
- ```.regularization(boolean)``` config removed; functionality is now always equivalent to ```.regularization(true)```
- ```.useDropConnect(boolean)``` removed; use ```.weightNoise(new DropConnect(double))``` instead
- ```.iterations(int)``` method has been removed (was rarely used and confusing to users)
- Multiple utility classes (in ```org.deeplearning4j.util```) have been deprecated and/or moved to nd4j-common. Use same class names in nd4j-common ```org.nd4j.util``` instead.  
- DataSetIterators in DL4J have been moved from deeplearning4j-nn module to new deeplearning4j-datasets, deeplearning4j-datavec-iterators and deeplearning4j-utility-iterators modules. Packages/imports are unchanged; deeplearning4j-core pulls these in as transitive dependencies hence no user changes should be required in most cases ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4855))
- Previously deprecated ```.activation(String)``` has been removed; use ```.activation(Activation)``` or ```.activation(IActivation)``` instead
- Layer API change: Custom layers may need to implement ```applyConstraints(int iteration, int epoch)``` method
- Parameter initializer API change: Custom parameter initializers may need to implement ```isWeightParam(String)``` and ```isBiasParam(String)``` methods
- RBM (Restricted Boltzmann Machine) layers have been removed entirely. Consider using VariationalAutoencoder layers as a replacement ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/variational/VariationalAutoencoder.java))
- GravesBidirectionalLSTM has been deprecated; use ```new Bidirectional(Bidirectional.Mode.ADD, new GravesLSTM.Builder()....build()))``` instead
- Previously deprecated WordVectorSerializer methods have now been removed ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4359))
- Removed deeplearning4j-ui-remote-iterationlisteners module and obsolete RemoteConvolutionalIterationListener ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4772))


### Deeplearning4J: 1.0.0-alpha Known Issues

- Performance on some networks types may be reduced on CUDA compared to 0.9.1 (with workspaces configured). This will be addressed in the next release
- Some issues have been noted with FP16 support on CUDA ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4897))


## <a name="onezerozeroalpha-dl4jkeras">Deeplearing4J: Keras Import</a>

- Keras 2 support, keeping backward compatibility for keras 1
- Keras 2 and 1 import use exact same API and are inferred by DL4J
- Keras unit test coverage increased by 10x, many more real-world integration tests
- Unit tests for importing and checking layer weights
- Leaky ReLU, ELU, SELU support for model import
- All Keras layers can be imported with optional bias terms
- Old deeplearning4j-keras module removed, old "Model" API removed
- All Keras initializations (Lecun normal, Lecun uniform, ones, zeros, Orthogonal, VarianceScaling, Constant) supported
- 1D convolution and pooling supported in DL4J and Keras model import
- Atrous Convolution 1D and 2D layers supported in Keras model import
- 1D Zero padding layers supported
- Keras constraints module fully supported in DL4J and model import
- Upsampling 1D and 2D layers in DL4J and Keras model import (including GAN examples in tests)
- Most merge modes supported in Keras model import, Keras 2 Merge layer API supported
- Separable Convolution 2D layer supported in DL4J and Keras model import
- Deconvolution 2D layer supported in DL4J and Keras model import
- Full support of Keras noise layers on import (Alpha dropout, Gaussian dropout and noise)
- Support for SimpleRNN layer in Keras model import
- Support for Bidirectional layer wrapper Keras model import
- Addition of LastTimestepVertex in DL4J to support return_sequences=False for Keras RNN layers.
- DL4J support for recurrent weight initializations and Keras import integration.
- SpaceToBatch and BatchToSpace layers in DL4J for better YOLO support, plus end-to-end YOLO Keras import test.
- Cropping2D support in DL4J and Keras model import


### Deeplearning4J: Keras Import - API Changes (Transition Guide): 0.9.1 to 1.0.0-alpha

- In 0.9.1 deprecated `Model` and `ModelConfiguration` have been permanently removed. Use [KerasModelImport](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/KerasModelImport.java) instead, which is now the only entry point for Keras model import.

### Deeplearning4J: Keras Import - Known Issues

- Embedding layer: In DL4J the output of an embedding layer is 2D by default, unless preprocessors are specified. In Keras the output is always 3D, but depending on specified parameters can be interpreted as 2D. This often leads to difficulties when importing Embedding layers. Many cases have been covered and issues fixed, but inconsistencies remain.
- Batchnormalization layer: DL4J's batch normalization layer is much more restrictive (in a good way) than Keras' version of it. For instance, DL4J only allows to normalize spatial dimensions for 4D convolutional inputs, while in Keras any axis can be used for normalization. Depending on the dimension ordering (NCHW vs. NHWC) and the specific configuration used by a Keras user, this can lead to expected (!) and unexpected import errors.
- Support for importing a Keras model for training purposes in DL4J (enforceTrainingConfig == true) is still very limited and will be tackled properly for the next release.
- Keras Merge layers: seem to work fine with the Keras functional API, but have issues when used in a Sequential model.
- Reshape layers: can be somewhat unreliable on import. DL4J rarely has a need to explicitly reshape input beyond (inferred) standard input preprocessors. In Keras, Reshape layers are used quite often. Mapping the two paradigms can be difficult in edge cases.



## <a name="onezerozeroalpha-nd4j">ND4J</a>

### ND4J: New Features

- Hundreds of new operations added
- New DifferentialFunction api with automatic differentiation (see samediff section) [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff/samediff)
- Technology preview of tensorflow import added (supports 1.4.0 and up)
- Apache Arrow serialization added supporting new tensor API [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-serde/nd4j-arrow)
- Add support for AVX/AVX2 and AVX-512 instruction sets for Windows/Linux for nd4j-native backend [Link](http://repo1.maven.org/maven2/org/nd4j/nd4j-native/1.0.0-alpha/)
- nVidia CUDA 8/9.0/9.1 now supported
- Worskpaces improvements were introduced to ensure safety: SCOPE_PANIC profiling mode is enabled by default
- FlatBuffers support for INDArray serde
- Support for auto-broadcastable operations was added
- libnd4j, underlying c++ library, got functionality boost and now offers: NDArray class, Graph class, and can be used as standalone library or executable.
- Convolution-related ops now support NHWC in addition to NCHW data format.
- Accumulation ops now have option to keep reduced dimensions.


### ND4J: Known Issues
- Not all op gradients implemented for automatic differentiation
- Vast majority of new operations added in 1.0.0-alpha do NOT use GPU yet.

### ND4J: API Changes (Transition Guide): 0.9.1 to 1.0.0-alpha


## ND4J - SameDiff
- Initial tech preview [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff/samediff)
- Control flow is supported with IF and WHILE primitives.

Alpha release of [SameDiff](https://github.com/deeplearning4j/deeplearning4j/tree/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/autodiff) auto-differentiation engine for ND4J.

### Features
- Two execution modes available: Java-driven execution, and Native execution for serialized graphs.
- SameDiff graphs can be serialized using FlatBuffers
- Building and running computation graphs build from SameDiff operations.
- Graphs can run forward pass on input data and compute gradients for the backward pass.
- Already supports many high-level layers, like dense layers, convolutions (1D-3D) deconvolutions, separable convolutions, pooling and upsampling, batch normalization, local response normalization, LSTMs and GRUs.
- In total there are about 350 SameDiff operations available, including many basic operations used in building complex graphs.
- Supports rudimentary import of [TensorFlow](https://github.com/deeplearning4j/nd4j/tree/d4a15e394ef81592237677aee932eb734d64f5a7/nd4j-backends/nd4j-tests/src/test/java/org/nd4j/imports) and ONNX graphs for inference.
- [TFOpTests](https://github.com/deeplearning4j/TFOpTests) is a dedicated project for creating test resources for TensorFlow import.

### Known Issues and Limitations
- Vast majority of new operations added in 1.0.0-alpha do NOT use GPU yet.
- While many of the widely used base operations and high-level layers used in practice are supported, op coverage is still limited. Goal is to achieve feature parity with TensorFlow and fully support import for TF graphs.
- Some of the existing ops do not have a backward pass implemented (called `doDiff` in SameDiff).



## <a name="onezerozeroalpha-datavec">DataVec</a>

### DataVec: New Features

- Added ObjectDetectionRecordReader - for use with DL4J's Yolo2OutputLayer ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/objdetect/ObjectDetectionRecordReader.java)) (also supports image transforms: [Link](https://github.com/deeplearning4j/DataVec/pull/432))
- Added ImageObjectLabelProvider, VocLabelProvider and SvhnLabelProvider (Streetview house numbers) for use with ObjectDetectionRecordReader ([Link](https://github.com/deeplearning4j/DataVec/pull/411), [Link](https://github.com/deeplearning4j/DataVec/pull/449))
- Added LocalTransformExecutor for single machine execution (without Spark dependency) ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-local/src/main/java/org/datavec/local/transforms/LocalTransformExecutor.java))
- Added ArrowRecordReader (for reading Apache Arrow format data) ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-arrow/src/main/java/org/datavec/arrow/recordreader/ArrowRecordReader.java))
- Added RecordMapper class for conversion between RecordReader and RecordWriter ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/records/mapper/RecordMapper.java))
- RecordWriter and InputSplit APIs have been improved; more flexible and support for partitioning across all writers ([Link](https://github.com/deeplearning4j/DataVec/pull/528), [Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/split/partition/Partitioner.java), [Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/split/partition/NumberOfRecordsPartitioner.java))
- Added ArrowWritableRecordBatch and NDArrayRecordBatch for efficient batch storage (```List<List<Writable>>```) ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-arrow/src/main/java/org/datavec/arrow/recordreader/ArrowWritableRecordBatch.java), [Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/writable/batch/NDArrayRecordBatch.java))
- Added BoxImageTransform - an ImageTransform that either crops or pads without changing aspect ratio ([Link](https://github.com/deeplearning4j/DataVec/pull/453))
- TransformProcess now has ```executeToSequence(List<Writable))```, ```executeSequenceToSingle(List<List<Writable>>)``` and ```executeToSequenceBatch(List<List<Writable>>)``` methods ([Link](https://github.com/deeplearning4j/DataVec/pull/392), [Link](https://github.com/deeplearning4j/DataVec/pull/395))
- Added CSVVariableSlidingWindowRecordReader ([Link](https://github.com/deeplearning4j/DataVec/pull/398))
- ImageRecordReader: supports regression use cases for labels (previously: only classification) ([Link](https://github.com/deeplearning4j/DataVec/pull/423))
- ImageRecordReader: supports multi-class and multi-label image classification (via PathMultiLabelGenerator interface) ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/io/labels/PathMultiLabelGenerator.java), [Link](https://github.com/deeplearning4j/DataVec/pull/520))
- DataAnalysis/AnalyzeSpark now includes quantiles (via t-digest) ([Link](https://github.com/deeplearning4j/DataVec/pull/436))
- Added AndroidNativeImageLoader.asBitmap(), Java2DNativeImageLoader.asBufferedImage() ([Link](https://github.com/deeplearning4j/DataVec/pull/448))
- Add new RecordReader / SequenceRecordReader implementations:
    - datavec-excel module and ExcelRecordReader ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-excel/src/main/java/org/datavec/poi/excel/ExcelRecordReader.java))
    - JacksonLineRecordReader ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/records/reader/impl/jackson/JacksonLineRecordReader.java))
    - ConcatenatingRecordReader ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/records/reader/impl/ConcatenatingRecordReader.java))
- Add new transforms:
    - TextToTermIndexSequenceTransform ([Link](https://github.com/deeplearning4j/DataVec/pull/408))
    - ConditionalReplaceValueTransformWithDefault ([Link](https://github.com/deeplearning4j/DataVec/pull/409))
    - GeographicMidpointReduction ([Link](https://github.com/deeplearning4j/DataVec/pull/446))
- StringToTimeTransform will con try to guess time format if format isn't provided ([Link](https://github.com/deeplearning4j/DataVec/pull/498))
- Improved performance for NativeImageLoader on Android ([Link](https://github.com/deeplearning4j/DataVec/pull/507))
- Added BytesWritable (Writable for byte[] data) ([Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/writable/BytesWritable.java))
- Added TranformProcess.inferCategories methods to auto-infer categories from a RecordReader ([Link](https://github.com/deeplearning4j/DataVec/blob/1d6ed6f290b7ee78d66ef8599bdeb18d37c47876/datavec-api/src/main/java/org/datavec/api/transform/TransformProcess.java#L490-L568))

### DataVec: Fixes

- Lombok is no longer included as a transitive dependency ([Link](https://github.com/deeplearning4j/DataVec/pull/538))
- MapFileRecordReader and MapFileSequenceRecordReader can handle empty partitions/splits for multi-part map files ([Link](https://github.com/deeplearning4j/DataVec/pull/393))
- CSVRecordReader is now properly serializable using Java serialization ([Link](https://github.com/deeplearning4j/DataVec/pull/474)) and Kryo serialization ([Link](https://github.com/deeplearning4j/DataVec/pull/476))
- Writables: equality semantics have been changed: for example, now DoubleWritable(1.0) is equal to IntWritable(1) ([Link](https://github.com/deeplearning4j/DataVec/pull/410))
- NumberedFileInputSplit now supports leading zeros ([Link](https://github.com/deeplearning4j/DataVec/pull/420))
- CSVSparkTransformServer and ImageSparkTransformServer Play severs changed to production mode ([Link](https://github.com/deeplearning4j/DataVec/pull/430))
- Fix for JSON subtype info for FloatMetaData ([Link](https://github.com/deeplearning4j/DataVec/pull/452))
- Serialization fixes for JacksonRecordReader, RegexSequenceRecordReader ([Link](https://github.com/deeplearning4j/DataVec/pull/463))
- Added RecordReader.resetSupported() method ([Link](https://github.com/deeplearning4j/DataVec/pull/469))
- SVMLightRecordReader now implements nextRecord() method ([Link](https://github.com/deeplearning4j/DataVec/pull/485))
- Fix for custom reductions when using conditions ([Link](https://github.com/deeplearning4j/DataVec/pull/487))
- SequenceLengthAnalysis is now serializable ([Link](https://github.com/deeplearning4j/DataVec/pull/495)) and supports to/from JSON ([Link](https://github.com/deeplearning4j/DataVec/pull/504))
- Fixes for FFT functionality ([Link](https://github.com/deeplearning4j/DataVec/pull/505), [Link](https://github.com/deeplearning4j/DataVec/pull/508))
- Remove use of backported java.util.functions; use ND4J functions API instead ([Link](https://github.com/deeplearning4j/DataVec/pull/506))
- Fix for transforms data quality analysis for time columns ([Link](https://github.com/deeplearning4j/DataVec/pull/510))

### DataVec: API Changes (Transition Guide): 0.9.1 to 1.0.0-alpha

- Many of the util classes (in ```org.datavec.api.util``` mainly) have been deprecated or removed; use equivalently named util clases in nd4j-common module ([Link](https://github.com/deeplearning4j/DataVec/pull/514))
- RecordReader.next(int) method now returns ```List<List<Writable>>``` for batches, not ```List<Writable>```. See also [NDArrayRecordBatch](https://github.com/deeplearning4j/DataVec/blob/master/datavec-api/src/main/java/org/datavec/api/writable/batch/NDArrayRecordBatch.java)
- RecordWriter and SequenceRecordWriter APIs have been updated with multiple new methods



## <a name="onezerozeroalpha-arbiter">Arbiter</a>


### Arbiter: New Features

- Workspace support added ([Link](https://github.com/deeplearning4j/Arbiter/issues/110), [Link](https://github.com/deeplearning4j/Arbiter/pull/113))
- Added new layer spaces: LSTM, CenterLoss, Deconvolution2D, LossLayer, Bidirectional layer wrapper ([Link](https://github.com/deeplearning4j/Arbiter/pull/113), [Link](https://github.com/deeplearning4j/Arbiter/pull/132))
- As per DL4J API changes: Updater configuration options (learning rate, momentum, epsilon, rho etc) have been moved to ParameterSpace<IUpdater> instead. Updater spaces (AdamSpace, AdaGradSpace etc) introduced ([Link](https://github.com/deeplearning4j/Arbiter/pull/103))
- As per DL4J API changes: Dropout configuration is now via ```ParameterSpace<IDropout>```, DropoutSpace introduced ([Link](https://github.com/deeplearning4j/Arbiter/pull/103))
- RBM layer spaces removed ([Link](https://github.com/deeplearning4j/Arbiter/pull/113))
- ComputationGraphSpace: added layer/vertex methods with overloads for preprocessors ([Link](https://github.com/deeplearning4j/Arbiter/issues/109))
- Added support to specify 'fixed' layers using DL4J layers directly (instead of using LayerSpaces, even for layers without hyperparameters) ([Link](https://github.com/deeplearning4j/Arbiter/pull/128))
- Added LogUniformDistribution ([Link](https://github.com/deeplearning4j/Arbiter/blob/master/arbiter-core/src/main/java/org/deeplearning4j/arbiter/optimize/distribution/LogUniformDistribution.java))
- Improvements to score functions; added ROC score function ([Link](https://github.com/deeplearning4j/Arbiter/pull/128))
- Learning rate schedule support added ([Link](https://github.com/deeplearning4j/Arbiter/pull/131))
- Add math ops for ```ParameterSpace<Double>``` and ```ParameterSpace<Integer>``` ([Link](https://github.com/deeplearning4j/Arbiter/pull/142))

### Arbiter: Fixes

- Fix parallel job execution (when using multiple execution threads) ([Link](https://github.com/deeplearning4j/Arbiter/issues/135), [Link](https://github.com/deeplearning4j/Arbiter/pull/137))
- Improved logging for failed task execution ([Link](https://github.com/deeplearning4j/Arbiter/pull/121))
- Fix for UI JSON serialization ([Link](https://github.com/deeplearning4j/Arbiter/pull/128))
- Fix threading issues when running on CUDA and multiple execution threads ([Link](https://github.com/deeplearning4j/Arbiter/pull/138), [Link](https://github.com/deeplearning4j/deeplearning4j/issues/4659), [Link](https://github.com/deeplearning4j/Arbiter/pull/140))
- Rename saved model file to model.bin ([Link](https://github.com/deeplearning4j/Arbiter/pull/144))
- Fix threading issues with non thread-safe candidates / parameter spaces ([Link](https://github.com/deeplearning4j/Arbiter/pull/147))
- Lombok is no longer included as a transitive dependency ([Link](https://github.com/deeplearning4j/Arbiter/pull/148))


### Arbiter: API Changes (Transition Guide): 0.9.1 to 1.0.0-alpha

- As per DL4J updater API changes: old updater configuration (learningRate, momentum, etc) methods have been removed. Use ```.updater(IUpdater)``` or ```.updater(ParameterSpace<IUpdater>)``` methods instead


## <a name="onezerozeroalpha-rl4j">RL4J</a>

- Add support for LSTM layer to A3C
- Fix A3C to make it actually work using new `ActorCriticLoss` and correct use of randomness
- Fix cases when `QLearning` would fail (non-flat input, incomplete serialization, incorrect normalization)
- Fix logic of `HistoryProcessor` with async algorithms and failures when preprocessing images
- Tidy up and correct the output of statistics, also allowing the use of `IterationListener`
- Fix issues preventing efficient execution with CUDA
- Provide access to more of the internal structures with `NeuralNet.getNeuralNetworks()`, `Policy.getNeuralNet()`, and convenience constructors for `Policy`
- Add MDPs for ALE (Arcade Learning Environment) and MALMO to support Atari games and Minecraft
- Update MDP for Doom to allow using the latest version of VizDoom


## <a name="onezerozeroalpha-scalnet">ScalNet</a>

- First release of [ScalNet Scala API](https://github.com/deeplearning4j/scalnet), which closely resembles Keras' API.
- Can be built with sbt and maven.
- Supports both Keras inspired  [Sequential](https://github.com/deeplearning4j/ScalNet/blob/master/src/main/scala/org/deeplearning4j/scalnet/models/Sequential.scala) models, corresponding to DL4J's `MultiLayerNetwork`, and [Model](https://github.com/deeplearning4j/ScalNet/blob/master/src/main/scala/org/deeplearning4j/scalnet/models/Model.scala), corresponding to `ComputationGraph`.
- Project structure is closely aligned to both DL4J model-import module and Keras.
- Supports the following layers: Convolution2D, Dense, EmbeddingLayer, AvgPooling2D, MaxPooling2D, GravesLSTM, LSTM, Bidirectional layer wrapper, Flatten, Reshape. Additionally, DL4J OutputLayers are supported.

## <a name="onezerozeroalpha-nd4s">ND4S</a>
- Scala 2.12 support


# <a name="zeronineone">Release Notes for Version 0.9.1</a>

**Deeplearning4J**

- Fixed issue with incorrect version dependencies in 0.9.0
- Added EmnistDataSetIterator [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl/EmnistDataSetIterator.java#L32)
- Numerical stability improvements to LossMCXENT / LossNegativeLogLikelihood with softmax (should reduce NaNs with very large activations)

**ND4J**

- Added runtime version checking for ND4J, DL4J, RL4J, Arbiter, DataVec [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/versioncheck/VersionCheck.java)


**Known Issues**

- Deeplearning4j: Use of Evaluation class no-arg constructor (i.e., new Evaluation()) can result in accuracy/stats being reported as 0.0. Other Evaluation class constructors, and ComputationGraph/MultiLayerNetwork.evaluate(DataSetIterator) methods work as expected.
    - This also impacts Spark (distributed) evaluation: workaround is to replace ```sparkNet.evaluate(testData);``` with ```sparkNet.doEvaluation(testData, 64, new Evaluation(10))[0];```, where 10 is the number of classes and 64 in the evaluation minibatch size to use.
- SequenceRecordReaderDataSetIterator applies preprocessors (such as normalization) twice to each DataSet (possible workaround: use RecordReaderMultiDataSetIterator + MultiDataSetWrapperIterator)
- TransferLearning: ComputationGraph may incorrectly apply l1/l2 regularization (defined in FinetuneConfiguration) to frozen layers. Workaround: set 0.0 l1/l2 on FineTuneConfiguration, and required l1/l2 on new/non-frozen layers directly. Note that MultiLayerNetwork with TransferLearning appears to be unaffected.



# <a name="zeroninezero">Release Notes for Version 0.9.0</a>

**Deeplearning4J**

- Workspaces feature added (faster training performance + less memory) [Link](https://deeplearning4j.org/workspaces)
- SharedTrainingMaster added for Spark network training (improved performance) [Link 1](https://deeplearning4j.org/distributed), [Link 2](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-spark-examples/dl4j-spark/src/main/java/org/deeplearning4j/mlp/MnistMLPDistributedExample.java)
- ParallelInference added - wrapper that server inference requests using internal batching and queues  [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/inference/ParallelInferenceExample.java)
- ParallelWrapper now able to work with gradients sharing, in addition to existing parameters averaging mode [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-cuda-specific-examples/src/main/java/org/deeplearning4j/examples/multigpu/GradientsSharingLenetMnistExample.java)
- VPTree performance significantly improved
- CacheMode network configuration option added - improved CNN and LSTM performance at the expense of additional memory use [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/CacheMode.java)
- LSTM layer added, with CuDNN support [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LSTM.java) (Note that the existing GravesLSTM implementation does not support CuDNN)
- New native model zoo with pretrained ImageNet, MNIST, and VGG-Face weights [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo)
- Convolution performance improvements, including activation caching
- Custom/user defined updaters are now supported [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning/config/IUpdater.java)
- Evaluation improvements
    - EvaluationBinary, ROCBinary classes added: for evaluation of binary multi-class networks (sigmoid + xent output layers) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/EvaluationBinary.java)
    - Evaluation and others now have G-Measure and Matthews Correlation Coefficient support; also macro + micro-averaging support for Evaluation class metrics [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/EvaluationAveraging.java)
    - ComputationGraph and SparkComputationGraph evaluation convenience methods added (evaluateROC, etc)
    - ROC and ROCMultiClass support exact calculation (previous: thresholded calculation was used) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/ROC.java#L78-L81)
    - ROC classes now support area under precision-recall curve calculation; getting precision/recall/confusion matrix at specified thresholds (via PrecisionRecallCurve class) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/curves/PrecisionRecallCurve.java#L102-L193)
    - RegressionEvaluation, ROCBinary etc now support per-output masking (in addition to per-example/per-time-step masking)
    - EvaluationCalibration added (residual plots, reliability diagrams, histogram of probabilities) [Link 1](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/EvaluationCalibration.java) [Link 2](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-core/src/main/java/org/deeplearning4j/evaluation/EvaluationTools.java#L180-L188)
    - Evaluation and EvaluationBinary: now supports custom classification threshold or cost array [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/Evaluation.java#L150-L170)
- Optimizations: updaters, bias calculation
- Network memory estimation functionality added. Memory requirements can be estimated from configuration without instantiating networks [Link 1](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/MultiLayerConfiguration.java#L310-L317) [Link 2](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ComputationGraphConfiguration.java#L451-L458)
- New loss functions:
    - Mixture density loss function [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/lossfunctions/impl/LossMixtureDensity.java)
    - F-Measure loss function [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/lossfunctions/impl/LossFMeasure.java)


**ND4J**
- Workspaces feature added [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/nd4j-examples/src/main/java/org/nd4j/examples/Nd4jEx15_Workspaces.java)
- Native parallel sort was added
- New ops added: SELU/SELUDerivative, TAD-based comparisons, percentile/median, Reverse, Tan/TanDerivative, SinH, CosH, Entropy, ShannonEntropy, LogEntropy, AbsoluteMin/AbsoluteMax/AbsoluteSum, Atan2
- New distance functions added: CosineDistance, HammingDistance, JaccardDistance



**DataVec**
- MapFileRecordReader and MapFileSequenceRecordReader added [Link 1](https://github.com/deeplearning4j/DataVec/blob/master/datavec-hadoop/src/main/java/org/datavec/hadoop/records/reader/mapfile/MapFileRecordReader.java) [Link 2](https://github.com/deeplearning4j/DataVec/blob/master/datavec-hadoop/src/main/java/org/datavec/hadoop/records/reader/mapfile/MapFileSequenceRecordReader.java)
- Spark: Utilities to save and load ```JavaRDD<List<Writable>>``` and ```JavaRDD<List<List<Writable>>``` data to Hadoop MapFile and SequenceFile formats [Link](https://github.com/deeplearning4j/DataVec/blob/master/datavec-spark/src/main/java/org/datavec/spark/storage/SparkStorageUtils.java)
- TransformProcess and Transforms now support NDArrayWritables and NDArrayWritable columns
- Multiple new Transform classes


**Arbiter**
- Arbiter UI: [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/arbiter/BasicHyperparameterOptimizationExample.java)
    - UI now uses Play framework, integrates with DL4J UI (replaces Dropwizard backend). Dependency issues/clashing versions fixed.
    - Supports DL4J StatsStorage and StatsStorageRouter mechanisms (FileStatsStorage, Remote UI via RemoveUIStatsStorageRouter)
    - General UI improvements (additional information, formatting fixes)



### 0.8.0 -> 0.9.0 Transition Notes

**Deeplearning4j**
- Updater configuration methods such as .momentum(double) and .epsilon(double) have been deprecated. Instead: use ```.updater(new Nesterovs(0.9))``` and ```.updater(Adam.builder().beta1(0.9).beta2(0.999).build())``` etc to configure

**DataVec**
- CsvRecordReader constructors: now uses characters for delimiters, instead of Strings (i.e., ',' instead of ",")

**Arbiter**
- Arbiter UI is now a separate module, with Scala version suffixes: ```arbiter-ui_2.10``` and ```arbiter-ui_2.11```


# <a name="zeroeightzero">Release Notes for Version 0.8.0</a>

- Added transfer learning API [Link](https://github.com/deeplearning4j/dl4j-examples/tree/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/transferlearning/vgg16)
- Spark 2.0 support (DL4J and DataVec; see transition notes below)
- New layers
    - Global pooling (aka "pooling over time"; usable with both RNNs and CNNs) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/pooling/GlobalPoolingLayer.java)
    - Center loss output layer [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/misc/centerloss/CenterLossLenetMnistExample.java)
    - 1D Convolution and subsampling layers [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/Convolution1DLayer.java) [Link2](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/subsampling/Subsampling1DLayer.java)
    - ZeroPaddingLayer [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/ZeroPaddingLayer.java)
- New ComputationGraph vertices
    - L2 distance vertex
    - L2 normalization vertex
- Per-output masking is now supported for most loss functions (for per output masking, use a mask array equal in size/shape to the labels array; previous masking functionality was per-example for RNNs)
- L1 and L2 regularization can now be configured for biases (via l1Bias and l2Bias configuration options)
- Evaluation improvements:
    - DL4J now has an IEvaluation class (that Evaluation, RegressionEvaluation, etc all implement. Also allows custom evaluation on Spark) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/IEvaluation.java)
    - Added multi-class (one vs. all) ROC: ROCMultiClass [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/ROCMultiClass.java)
    - For both MultiLayerNetwork and SparkDl4jMultiLayer: added evaluateRegression, evaluateROC, evaluateROCMultiClass convenience methods
    - HTML export functionality added for ROC charts [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-core/src/main/java/org/deeplearning4j/evaluation/EvaluationTools.java#L93)
    - TSNE re-added to new UI
    - Training UI: now usable without an internet connection (no longer relies on externally hosted fonts)
    - UI: improvements to error handling for ‘no data’ condition
- Epsilon configuration now used for Adam and RMSProp updaters
- Fix for bidirectional LSTMs + variable-length time series (using masking)
- Added CnnSentenceDataSetIterator (for use with ‘CNN for Sentence Classification’ architecture) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nlp-parent/deeplearning4j-nlp/src/main/java/org/deeplearning4j/iterator/CnnSentenceDataSetIterator.java) [Link2](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/convolution/sentenceclassification/CnnSentenceClassificationExample.java)
- Spark + Kryo: now test serialization + throw exception if misconfigured (instead of logging an error that can be missed)
- MultiLayerNetwork now adds default layer names if no name is specified
- DataVec:
    - JSON/YAML support for DataAnalysis, custom Transforms etc
    - ImageRecordReader refactored to reduce garbage collection load (hence improve performance with large training sets)
    - Faster quality analysis.
- Arbiter: added new layer types to match DL4J
    - Performance improvement for Word2Vec/ParagraphVectors tokenization & training.
- Batched inference introduced for ParagraphVectors
- Nd4j improvements
    - New native operations available for ND4j: firstIndex, lastIndex, remainder, fmod, or, and, xor.
    - OpProfiler NAN_PANIC & INF_PANIC now also checks result of BLAS calls.
    - Nd4.getMemoryManager() now provides methods to tweak GC behavior.
- Alpha version of parameter server for Word2Vec/ParagraphVectors were introduced for Spark. Please note: It’s not recommended for production use yet.
- Performance improvements for CNN inference

### 0.7.2 -> 0.8.0 Transition Notes

- Spark versioning schemes: with the addition of Spark 2 support, the versions for Deeplearning4j and DataVec Spark modules has changed
    - For Spark 1: use ```<version>0.8.0_spark_1</version>```
    - For Spark 2: use ```<version>0.8.0_spark_2</version>```
    - Also note: Modules with Spark 2 support are released with Scala 2.11 support only. Spark 1 modules are released with both Scala 2.10 and 2.11 support

### 0.8.0 Known Issues (At Launch)

- UI/CUDA/Linux issue: [Link](https://github.com/deeplearning4j/deeplearning4j/issues/3026)
- Dirty shutdown on JVM exit is possible for CUDA backend sometimes: [Link](https://github.com/deeplearning4j/deeplearning4j/issues/3028)
- Issues with RBM implementation [Link](https://github.com/deeplearning4j/deeplearning4j/issues/3049)
- Keras 1D convolutional and pooling layers cannot be imported yet. Will be supported in forthcoming release.
- Keras v2 model configurations cannot be imported yet. Will be supported in forthcoming release.

# <a name="zeroseventwo">Release Notes for Version 0.7.2</a>
- Added variational autoencoder [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/unsupervised/variational/VariationalAutoEncoderExample.java)
- Activation function refactor
    - Activation functions are now an interface [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/nd4j/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/IActivation.java)
    - Configuration now via enumeration, not via String (see examples - [Link](https://github.com/deeplearning4j/dl4j-examples))
	- Custom activation functions now supported [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/misc/activationfunctions/CustomActivationExample.java)
	- New activation functions added: hard sigmoid, randomized leaky rectified linear units (RReLU)
- Multiple fixes/improvements for Keras model import
- Added P-norm pooling for CNNs (option as part of SubsamplingLayer configuration)
- Iteration count persistence: stored/persisted properly in model configuration + fixes to learning rate schedules for Spark network training
- LSTM: gate activation function can now be configured (previously: hard-coded to sigmoid)
- UI:
    - Added Chinese translation
	- Fixes for UI + pretrain layers
    - Added Java 7 compatible stats collection compatibility [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/userInterface/UIStorageExample_Java7.java)
	- Improvements in front-end for handling NaNs
	- Added UIServer.stop() method
	- Fixed score vs. iteration moving average line (with subsampling)
- Solved Jaxb/Jackson issue with Spring Boot based applications
- RecordReaderDataSetIterator now supports NDArrayWritable for the labels (set regression == true; used for multi-label classification + images, etc)

### 0.7.1 -> 0.7.2 Transition Notes

- Activation functions (built-in): now specified using Activation enumeration, not String (String-based configuration has been deprecated)


# <a name="zerosevenone">Release Notes for Version 0.7.1</a>
* RBM and AutoEncoder key fixes:
    - Ensured visual bias updated and applied during pretraining.
    - RBM HiddenUnit is the activation function for this layer; thus, established derivative calculations for backprop according to respective HiddenUnit.
* RNG performance issues fixed for CUDA backend
* OpenBLAS issues fixed for macOS, powerpc, linux.
* DataVec is back to Java 7 now.
* Multiple minor bugs fixed for ND4J/DL4J

# <a name="zerosevenzero">Release Notes for Version 0.7.0</a>

* UI overhaul: new training UI has considerably more information, supports persistence (saving info and loading later), Japanese/Korean/Russian support. Replaced Dropwizard with Play framework. [Link](https://github.com/deeplearning4j/dl4j-examples/tree/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/userInterface)
* Import of models configured and trained using [Keras](http://keras.io)
    - Imports both _Keras_ model [configurations](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/config/KerasModelConfiguration.java) and [stored weights](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/KerasModel.java#L59)
    - Supported models: [Sequential](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/ModelConfiguration.java#L41) models
    - Supported [layers](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/config/KerasLayerConfiguration.java#L85): _Dense, Dropout, Activation, Convolution2D, MaxPooling2D, LSTM_
* Added ‘Same’ padding more for CNNs (ConvolutionMode network configuration option) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ConvolutionMode.java)
* Weighted loss functions: Loss functions now support a per-output weight array (row vector)
* ROC and AUC added for binary classifiers [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/ROC.java)
* Improved error messages on invalid configuration or data; improved validation on both
* Added metadata functionality: track source of data (file, line number, etc) from data import to evaluation. Loading a subset of examples/data from this metadata is now supported. [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/dataexamples/CSVExampleEvaluationMetaData.java)
* Removed Jackson as core dependency (shaded); users can now use any version of Jackson without issue
* Added LossLayer: version of OutputLayer that only applies loss function (unlike OutputLayer: it has no weights/biases)
* Functionality required to build triplet embedding model (L2 vertex, LossLayer, Stack/Unstack vertices etc)
* Reduced DL4J and ND4J ‘cold start’ initialization/start-up time
* Pretrain default changed to false and backprop default changed to true. No longer needed to set these when setting up a network configuration unless defaults need to be changed.
* Added TrainingListener interface (extends IterationListener). Provides access to more information/state as network training occurs [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/optimize/api/TrainingListener.java)
* Numerous bug fixes across DL4J and ND4J
* Performance improvements for nd4j-native & nd4j-cuda backends
* Standalone Word2Vec/ParagraphVectors overhaul:
    - Performance improvements
    - ParaVec inference available for both PV-DM & PV-DBOW
    - Parallel tokenization support was added, to address computation-heavy tokenizers.
* Native RNG introduced for better reproducibility within multi-threaded execution environment.
* Additional RNG calls added: Nd4j.choice(), and BernoulliDistribution op.
* Off-gpu storage introduced, to keep large things, like Word2Vec model in host memory. Available via WordVectorSerializer.loadStaticModel()
* Two new options for performance tuning on nd4j-native backend: setTADThreshold(int) & setElementThreshold(int)

### 0.6.0 -> 0.7.0 Transition Notes
Notable changes for upgrading codebases based on 0.6.0 to 0.7.0:

* UI: new UI package name is deeplearning4j-ui_2.10 or deeplearning4j-ui_2.11 (previously: deeplearning4j-ui). Scala version suffix is necessary due to Play framework (written in Scala) being used now.
* Histogram and Flow iteration listeners deprecated. They are still functional, but using new UI is recommended [Link](https://github.com/deeplearning4j/dl4j-examples/tree/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/userInterface)
* DataVec ImageRecordReader: labels are now sorted alphabetically by default before assigning an integer class index to each - previously (0.6.0 and earlier) they were according to file iteration order. Use .setLabels(List<String>) to manually specify the order if required.
* CNNs: configuration validation is now less strict. With new ConvolutionMode option, 0.6.0 was equivalent to ‘Strict’ mode, but new default is ‘Truncate’
    - See ConvolutionMode javadoc for more details: [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ConvolutionMode.java)
* Xavier weight initialization change for CNNs and LSTMs: Xavier now aligns better with original Glorot paper and other libraries. Xavier weight init. equivalent to 0.6.0 is available as XAVIER_LEGACY
* DataVec: Custom RecordReader and SequenceRecordReader classes require additional methods, for the new metadata functionality. Refer to existing record reader implementations for how to implement these methods.
* Word2Vec/ParagraphVectors:
    - Few new builder methods:
        - allowParallelTokenization(boolean)
        - useHierarchicSoftmax(boolean)
    - Behaviour change: batchSize: now batch size is ALSO used as threshold to execute number of computational batches for sg/cbow


# <a name="six">Release Notes for Version 0.6.0</a>

* Custom layer support
* Support for custom loss functions
* Support for compressed INDArrays, for memory saving on huge data
* Native support for BooleanIndexing where applicable
* Initial support for combined operations on CUDA
* Significant performance improvements on CPU & CUDA backends
* Better support for Spark environments using CUDA & cuDNN with multi-gpu clusters
* New UI tools: FlowIterationListener and ConvolutionIterationListener, for better insights of processes within NN.
* Special IterationListener implementation for performance tracking: PerformanceListener
* Inference implementation added for ParagraphVectors, together with option to use existing Word2Vec model
* Severely decreased file size on the deeplearnning4j api
* `nd4j-cuda-8.0` backend is available now for cuda 8 RC
* Added multiple new built-in loss functions
* Custom preprocessor support
* Performance improvements to Spark training implementation
* Improved network configuration validation using InputType functionality

# <a name="five">Release Notes for Version 0.5.0</a>

* FP16 support for CUDA
* [Better performance for multi-gpu}(http://deeplearning4j.org/gpu)
* Including optional P2P memory access support
* Normalization support for time series and images
* Normalization support for labels
* Removal of Canova and shift to DataVec: [Javadoc](http://deeplearning4j.org/datavecdoc/), [Github Repo](https://github.com/deeplearning4j/datavec)
* Numerous bug fixes
* Spark improvements

## <a name="four">Release Notes for version 0.4.0</a>

* Initial multi-GPU support viable for standalone and Spark.
* Refactored the Spark API significantly
* Added CuDNN wrapper
* Performance improvements for ND4J
* Introducing [DataVec](https://github.com/deeplearning4j/datavec): Lots of new functionality for transforming, preprocessing, cleaning data. (This replaces Canova)
* New DataSetIterators for feeding neural nets with existing data: ExistingDataSetIterator, Floats(Double)DataSetIterator, IteratorDataSetIterator
* New learning algorithms for word2vec and paravec: CBOW and PV-DM respectively
* New native ops for better performance: DropOut, DropOutInverted, CompareAndSet, ReplaceNaNs
* Shadow asynchronous datasets prefetch enabled by default for both MultiLayerNetwork and ComputationGraph
* Better memory handling with JVM GC and CUDA backend, resulting in significantly lower memory footprint

## Resources

* [Deeplearning4j on Maven Central](https://search.maven.org/#search%7Cga%7C1%7Cdeeplearning4j)
* [Deeplearning4j Source Code](https://github.com/deeplearning4j/deeplearning4j/)
* [ND4J Source Code](https://github.com/deeplearning4j/nd4j/)
* [libnd4j Source Code](https://github.com/deeplearning4j/libnd4j/)

## Roadmap for Fall 2016

* [ScalNet Scala API](https://github.com/deeplearning4j/scalnet) (WIP!)
* Standard NN configuration file shared with Keras
* CGANs
* Model interpretability
