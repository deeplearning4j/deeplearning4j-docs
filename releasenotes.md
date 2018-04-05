---
title: Release Notes
layout: default
---

**Contents**

* <a href="#onezerozeroalpha">Version 1.0.0-alpha</a>
    - <a href="#onezerozeroalpha-dl4j">Deeplearning4j</a>
    - <a href="#onezerozeroalpha-dl4jkeras">Deeplearning4j Keras Import</a>
    - <a href="#onezerozeroalpha-nd4j">ND4J</a>
    - <a href="#onezerozeroalpha-datavec">DataVec</a>
    - <a href="#onezerozeroalpha-arbiter">Arbiter</a>
* <a href="#zeronineone">Version 0.9.1</a>
* <a href="#zeroninezero">Version 0.9.0</a>
* <a href="#zeroeightzero">Version 0.8.0</a>
* <a href="#zeroseventwo">Version 0.7.2</a>
* <a href="#six">Version 0.6.0</a>
* <a href="#five">Version 0.5.0</a>
* <a href="#four">Version 0.4.0</a>


# <a name="onezerozeroalpha">Release Notes for Version 1.0.0-alpha</a>

## Highlights - 1.0.0-alpha Release

[TO DO]
* SameDiff
* DL4J new layers
* Keras 2.0 import support
* CUDA 9.0 and 9.1 support (+CuDNN)


## <a name="onezerozeroalpha-dl4j">Deeplearning4J</a>

### Deeplearning4J: New Features


- Layers (new and enhanced)
    - Added Yolo2OutputLayer CNN layer for object detection ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/objdetect/Yolo2OutputLayer.java)). See also DataVec's [ObjectDetectionRecordReader](https://github.com/deeplearning4j/DataVec/blob/master/datavec-data/datavec-data-image/src/main/java/org/datavec/image/recordreader/objdetect/ObjectDetectionRecordReader.java) 
    - Adds support for 'no bias' layers via ```hasBias(boolean)``` config (DenseLayer, EmbeddingLayer, OutputLayer, RnnOutputLayer, CenterLossOutputLayer, ConvolutionLayer, Convolution1DLayer). EmbeddingLayer now defaults to no bias ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3882))
    - Adds support for dilated convolutions (aka 'atrous' convolutions) - ConvolutionLayer, SubsamplingLayer, and 1D versions there-of. ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3922))
    - Added Upsampling2D layer, Upsampling1D layer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling2D.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Upsampling1D.java))
    - ElementWiseVertex now (additionally) supports ```Average``` and ```Max``` modes in addition to Add/Subtract/Product ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/graph/ElementWiseVertex.java))
    - Added SeparableConvolution2D layer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/SeparableConvolution2D.java))
    - Added Deconvolution2D layer (aka transpose convolution, fractionally strided convolution layer) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/Deconvolution2D.java))
    - Added ReverseTimeSeriesVertex ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/graph/rnn/ReverseTimeSeriesVertex.java))
    - Added RnnLossLayer - no-parameter version of RnnOutputLayer, or RNN equivalent of LossLayer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/RnnLossLayer.java))
    - Added CnnLossLayer - no-parameter CNN output layer for use cases such as segmentation, denoising, etc. ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/CnnLossLayer.java))
    - Added Bidirectional layer wrapper (converts any uni-directional RNN to a bidirectional RNN) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/recurrent/Bidirectional.java))
    - Added SimpleRnn layer (aka "vanilla" RNN layer) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/recurrent/SimpleRnn.java))
    - Added LastTimeStep wrapper layer (wraps a RNN layer to get last time step, accounting for masking if present) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/recurrent/LastTimeStep.java))
    - Added MaskLayer utility layer that simply zeros out activations on forward pass when a mask array is present ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4647))
    - Added alpha-version (not yet stable) SameDiff layer support to DL4J (Note: forward pass, CPU only for now)([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4675))
    - Added SpaceToDepth and SpaceToBatch layers ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/SpaceToDepth.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/SpaceToBatch.java))
    - Added Cropping2D layer ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/convolutional/Cropping2D.java))
- Added parameter constraints API (LayerConstraint interface), and MaxNormConstraint, MinMaxNormConstraint, NonNegativeConstraint, UnitNormConstraint implementations ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3957))
- Significant refactoring of learning rate schedules ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3985))
    - Added ISchedule interface; added Exponential, Inverse, Map, Poly, Sigmoid and Step schedule implementations ([Link](https://github.com/deeplearning4j/nd4j/tree/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/schedule))
    - Added support for both iteration-based and epoch-based schedules via ISchedule. Also added support for custom (user defined) schedules
    - Learning rate schedules are configured on the updaters, via the ```.updater(IUpdater)``` method
- Added dropout API (IDropout - previously dropout was available but not a class); added Dropout, AlphaDropout (for use with self-normalizing NNs), GaussianDropout (multiplicative), GaussianNoise (additive). Added support for custom dropout types ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/dropout)) 
- Added support for dropout schedules via ISchedule interface ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/dropout/Dropout.java#L64))
- Added weight/parameter noise API (IWeightNoise interface); added DropConnect and WeightNoise (additive/multiplicative Gaussian noise) implementations ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/weightnoise)); dropconnect and dropout can now be used simultaneously
- Adds layer configuration alias ```.units(int)``` equivalent to ```.nOut(int)``` ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3900))
- Adds ComputationGraphConfiguration GraphBuilder ```.layer(String, Layer, String...)``` alias for ```.addLayer(String, Layer, String...)```
- Layer index no longer required for MultiLayerConfiguration ListBuilder (i.e., ```.list().layer(<layer>)``` can now be used for configs) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/3888))
- Added ```MultiLayerNetwork.summary(InputType)``` and ```ComputationGraph.summary(InputType...)``` methods (shows layer and activation size information) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3983))
- MultiLayerNetwork, ComputationGraph and layerwise trainable layers now track the number of epochs ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/3957))
- Added deeplearning4j-ui-standalone module: uber-jar for easy launching of UI server (usage: ```java -jar deeplearning4j-ui-standalone-1.0.0-alpha.jar -p 9124 -r true -f c:/UIStorage.bin```)
- Weight initializations:
    - Added ```.weightInit(Distribution)``` convenience/overload (previously: required ```.weightInit(WeightInit.DISTRIBUTION).dist(Distribution)```) ([Link](https://github.com/deeplearning4j/deeplearning4j/commit/45cbb6efc2ad015397b4fdf5eac9d1e9dc70ac9c)) 
    - WeightInit.NORMAL (for self-normalizing neural networks) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/weights/WeightInit.java))
    - Ones, Identity weight initialization ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/weights/WeightInit.java))
    - Added new distributions (LogNormalDistribution, TruncatedNormalDistribution, OrthogonalDistribution, ConstantDistribution) which can be used for weight initialization ([Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/distribution))
    - RNNs: Added ability to specify weight initialization for recurrent weights separately to "input" weights ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4579))
- Added layer alias: Convolution2D (ConvolutionLayer), Pooling1D (Subsampling1DLayer), Pooling2D (SubsamplingLayer) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4026)) 
- Added Spark IteratorUtils - wraps a RecordReaderMultiDataSetIterator for use in Spark network training ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/datavec/iterator/IteratorUtils.java))
- CuDNN-supporting layers (ConvolutionLayer, etc) now warn the user if using CUDA without CuDNN ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4039))
- Binary cross entropy (LossBinaryXENT) now implements clipping (1e-5 to (1 - 1e-5) by default) to avoid numerical underflow/NaNs ([Link](https://github.com/deeplearning4j/nd4j/pull/2121))
- SequenceRecordReaderDataSetIterator now supports multi-label regression ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4080))
- TransferLearning FineTuneConfiguration now has methods for setting training/inference workspace modes ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4090))
- IterationListener iterationDone method now reports both current iteration and epoch count; removed unnecessary invoke/invoked methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4091))
- Added MultiLayerNetwork.layerSize(int), ComputationGraph.layerSize(int)/layerSize(String) to easily determine size of layers ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4582))
- Added MultiLayerNetwork.toComputationGraph() method ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/988630b1c8cde8da6414ca80d146097c902993fb/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/multilayer/MultiLayerNetwork.java#L3391-L3398))
- Added NetworkUtils convenience methods to easily change the learning rate of an already initialized network ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/util/NetworkUtils.java))
- Added MultiLayerNetwork.save(File)/.load(File) and ComputationGraph.save(File)/.load(File) convenience methods ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4401))
- Added CheckpointListener to periodically save a copy of the model during training (every N iter/epochs, every T time units) ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/optimize/listeners/checkpoint/CheckpointListener.java))
- Added ComputationGraph output method overloads with mask arrays ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4553))
- New LossMultiLabel loss function for multi-label classification ([Link](https://github.com/deeplearning4j/nd4j/pull/2724))
- Added new model zoo models:
    - Darknet19 ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/Darknet19.java))
    - TinyYOLO ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/TinyYOLO.java))
- New iterators, and iterator improvements:
    - Added FileDataSetIterator, FileMultiDataSetIterator for flexibly iterating over directories of saved (Multi)DataSet objects ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4618))
    - UCISequenceDataSetIterator ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-data/deeplearning4j-datasets/src/main/java/org/deeplearning4j/datasets/iterator/impl/UciSequenceDataSetIterator.java))
    - RecordReaderDataSetIterator now has builder pattern for convenience, improved javadoc ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4424))
    - Added DataSetIteratorSplitter, MultiDataSetIteratorSplitter ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/DataSetIteratorSplitter.java), [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-data/deeplearning4j-utility-iterators/src/main/java/org/deeplearning4j/datasets/iterator/MultiDataSetIteratorSplitter.java))
- Added additional score functions for early stopping (ROC metrics, full set of Evaluation/Regression metrics, etc) ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4630))
- Added additional ROC and ROCMultiClass evaluation overloads for MultiLayerNetwork and ComputationGraph ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4642))
- Clarified Evaluation.stats() output to refer to "Predictions" instead of "Examples" (former is more correct for RNNs) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4674))
- EarlyStoppingConfiguration now supports ```Supplier<ScoreCalculator>``` for use with non-serializable score calculators ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4694)) 
- Improved ModelSerializer exceptions when trying to load a model via wrong method (i.e., try to load ComputationGraph via restoreMultiLayerNetwork) ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4487))
- Added SparkDataValidation utility methods to validate saved DataSet and MultiDataSet on HDFS or local ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-scaleout/spark/dl4j-spark/src/main/java/org/deeplearning4j/spark/util/data/SparkDataValidation.java))
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
- RBM (Restricted Boltzmann Machine) layers have been removed entirely. Consider using VariationalAutoencoder layers as a replacement ([Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/variational/VariationalAutoencoder.java))
- GravesBidirectionalLSTM has been deprecated; use ```new Bidirectional(Bidirectional.Mode.ADD, new GravesLSTM.Builder()....build()))``` instead
- Previously deprecated WordVectorSerializer methods have now been removed ([Link](https://github.com/deeplearning4j/deeplearning4j/issues/4359))
- Removed deeplearning4j-ui-remote-iterationlisteners module and obsolete RemoteConvolutionalIterationListener ([Link](https://github.com/deeplearning4j/deeplearning4j/pull/4772)) 


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

[Not sure if required - but if so, cover API changes etc - and what to use now - go here]

### Deeplearning4J: Keras Import - Known Issues

- Embedding layer: In DL4J the output of an embedding layer is 2D by default, unless preprocessors are specified. In Keras the output is always 3D, but depending on specified parameters can be interpreted as 2D. This often leads to difficulties when importing Embedding layers. Many cases have been covered and issues fixed, but inconsistencies remain.
- Batchnormalization layer: DL4J's batch normalization layer is much more restrictive (in a good way) than Keras' version of it. For instance, DL4J only allows to normalize spatial dimensions for 4D convolutional inputs, while in Keras any axis can be used for normalization. Depending on the dimension ordering (NCHW vs. NHWC) and the specific configuration used by a Keras user, this can lead to expected (!) and unexpected import errors.
- Support for importing a Keras model for training purposes in DL4J (encorceTrainingConfig == true) is still very limited and will be tackled properly for the next release.
- Keras Merge layers: seem to work fine with the Keras functional API, but have issues when used in a Sequential model.
- Reshape layers: can be somewhat unreliable on import. DL4J rarely has a need to explicitly reshape input beyond (inferred) standard input preprocessors. In Keras, Reshape layers are used quite often. Mapping the two paradigms can be difficult in edge cases.



## <a name="onezerozeroalpha-nd4j">ND4J</a>

### ND4J: New Features


### ND4J: Known Issues


### ND4J: API Changes (Transition Guide): 0.9.1 to 1.0.0-alpha 


## ND4J - SameDiff

### Features

### Known Issues and Limitations




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




## RL4J



## ScalNet


## ND4S


# <a name="zeronineone">Release Notes for Version 0.9.1</a>

**Deeplearning4J**

- Fixed issue with incorrect version dependencies in 0.9.0
- Added EmnistDataSetIterator [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-core/src/main/java/org/deeplearning4j/datasets/iterator/impl/EmnistDataSetIterator.java#L32)
- Numerical stability improvements to LossMCXENT / LossNegativeLogLikelihood with softmax (should reduce NaNs with very large activations)

**ND4J**

- Added runtime version checking for ND4J, DL4J, RL4J, Arbiter, DataVec [Link](https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/versioncheck/VersionCheck.java)


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
- CacheMode network configuration option added - improved CNN and LSTM performance at the expense of additional memory use [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/CacheMode.java)
- LSTM layer added, with CuDNN support [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/layers/LSTM.java) (Note that the existing GravesLSTM implementation does not support CuDNN)
- New native model zoo with pretrained ImageNet, MNIST, and VGG-Face weights [Link](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo)
- Convolution performance improvements, including activation caching
- Custom/user defined updaters are now supported [Link](https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/learning/config/IUpdater.java)
- Evaluation improvements
    - EvaluationBinary, ROCBinary classes added: for evaluation of binary multi-class networks (sigmoid + xent output layers) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/EvaluationBinary.java)
    - Evaluation and others now have G-Measure and Matthews Correlation Coefficient support; also macro + micro-averaging support for Evaluation class metrics [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/EvaluationAveraging.java)
    - ComputationGraph and SparkComputationGraph evaluation convenience methods added (evaluateROC, etc)
    - ROC and ROCMultiClass support exact calculation (previous: thresholded calculation was used) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/ROC.java#L78-L81)
    - ROC classes now support area under precision-recall curve calculation; getting precision/recall/confusion matrix at specified thresholds (via PrecisionRecallCurve class) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/curves/PrecisionRecallCurve.java#L102-L193)
    - RegressionEvaluation, ROCBinary etc now support per-output masking (in addition to per-example/per-time-step masking)
    - EvaluationCalibration added (residual plots, reliability diagrams, histogram of probabilities) [Link 1](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/EvaluationCalibration.java) [Link 2](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-core/src/main/java/org/deeplearning4j/evaluation/EvaluationTools.java#L180-L188)
    - Evaluation and EvaluationBinary: now supports custom classification threshold or cost array [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/Evaluation.java#L150-L170)
- Optimizations: updaters, bias calculation
- Network memory estimation functionality added. Memory requirements can be estimated from configuration without instantiating networks [Link 1](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/MultiLayerConfiguration.java#L310-L317) [Link 2](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ComputationGraphConfiguration.java#L451-L458)
- New loss functions:
    - Mixture density loss function [Link](https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/lossfunctions/impl/LossMixtureDensity.java)
    - F-Measure loss function [Link](https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/lossfunctions/impl/LossFMeasure.java)


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
    - Global pooling (aka "pooling over time"; usable with both RNNs and CNNs) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/pooling/GlobalPoolingLayer.java)
    - Center loss output layer [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/misc/centerloss/CenterLossLenetMnistExample.java)
    - 1D Convolution and subsampling layers [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/Convolution1DLayer.java) [Link2](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/subsampling/Subsampling1DLayer.java)
    - ZeroPaddingLayer [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/layers/convolution/ZeroPaddingLayer.java)
- New ComputationGraph vertices
    - L2 distance vertex
    - L2 normalization vertex
- Per-output masking is now supported for most loss functions (for per output masking, use a mask array equal in size/shape to the labels array; previous masking functionality was per-example for RNNs)
- L1 and L2 regularization can now be configured for biases (via l1Bias and l2Bias configuration options)
- Evaluation improvements:
    - DL4J now has an IEvaluation class (that Evaluation, RegressionEvaluation, etc all implement. Also allows custom evaluation on Spark) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/IEvaluation.java)
    - Added multi-class (one vs. all) ROC: ROCMultiClass [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/ROCMultiClass.java)
    - For both MultiLayerNetwork and SparkDl4jMultiLayer: added evaluateRegression, evaluateROC, evaluateROCMultiClass convenience methods
    - HTML export functionality added for ROC charts [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-core/src/main/java/org/deeplearning4j/evaluation/EvaluationTools.java#L93)
    - TSNE re-added to new UI
    - Training UI: now usable without an internet connection (no longer relies on externally hosted fonts)
    - UI: improvements to error handling for ‘no data’ condition
- Epsilon configuration now used for Adam and RMSProp updaters
- Fix for bidirectional LSTMs + variable-length time series (using masking)
- Added CnnSentenceDataSetIterator (for use with ‘CNN for Sentence Classification’ architecture) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nlp-parent/deeplearning4j-nlp/src/main/java/org/deeplearning4j/iterator/CnnSentenceDataSetIterator.java) [Link2](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/convolution/sentenceClassification/CnnSentenceClassificationExample.java)
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
    - Activation functions are now an interface [Link](https://github.com/deeplearning4j/nd4j/blob/master/nd4j-backends/nd4j-api-parent/nd4j-api/src/main/java/org/nd4j/linalg/activations/IActivation.java)
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
    - Imports both _Keras_ model [configurations](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/ModelConfiguration.java) and [stored weights](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/Model.java#L59)
    - Supported models: [Sequential](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/ModelConfiguration.java#L41) models
    - Supported [layers](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras/LayerConfiguration.java#L85): _Dense, Dropout, Activation, Convolution2D, MaxPooling2D, LSTM_
* Added ‘Same’ padding more for CNNs (ConvolutionMode network configuration option) [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ConvolutionMode.java)
* Weighted loss functions: Loss functions now support a per-output weight array (row vector)
* ROC and AUC added for binary classifiers [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval/ROC.java)
* Improved error messages on invalid configuration or data; improved validation on both
* Added metadata functionality: track source of data (file, line number, etc) from data import to evaluation. Loading a subset of examples/data from this metadata is now supported. [Link](https://github.com/deeplearning4j/dl4j-examples/blob/master/dl4j-examples/src/main/java/org/deeplearning4j/examples/dataExamples/CSVExampleEvaluationMetaData.java)
* Removed Jackson as core dependency (shaded); users can now use any version of Jackson without issue
* Added LossLayer: version of OutputLayer that only applies loss function (unlike OutputLayer: it has no weights/biases)
* Functionality required to build triplet embedding model (L2 vertex, LossLayer, Stack/Unstack vertices etc)
* Reduced DL4J and ND4J ‘cold start’ initialization/start-up time
* Pretrain default changed to false and backprop default changed to true. No longer needed to set these when setting up a network configuration unless defaults need to be changed.
* Added TrainingListener interface (extends IterationListener). Provides access to more information/state as network training occurs [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/optimize/api/TrainingListener.java)
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
    - See ConvolutionMode javadoc for more details: [Link](https://github.com/deeplearning4j/deeplearning4j/blob/master/deeplearning4j-nn/src/main/java/org/deeplearning4j/nn/conf/ConvolutionMode.java)
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
