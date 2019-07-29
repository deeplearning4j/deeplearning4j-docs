---
title: Evaluation Classes for Neural Networks
short_title: Evaluation
description: Tools and classes for evaluating neural network performance
category: Tuning & Training
weight: 3
---


## Why evaluate?

When training or deploying a Neural Network it is useful to know the accuracy of your model. In DL4J the Evaluation Class and variants of the Evaluation Class are available to evaluate your model's performance. 


### <a name="classification">Evaluation for Classification</a>

The Evaluation class is used to evaluate the performance for binary and multi-class classifiers (including time series classifiers). This section covers basic usage of the Evaluation Class.

Given a dataset in the form of a DataSetIterator, the easiest way to perform evaluation is to use the built-in evaluate methods on MultiLayerNetwork and ComputationGraph:
```
DataSetIterator myTestData = ...
Evaluation eval = model.evaluate(myTestData);
```

However, evaluation can be performed on individual minibatches also. Here is an example taken from our dataexamples/CSVExample in the [Examples](https://github.com/deeplearning4j/dl4j-examples) project.

The CSV example has CSV data for 3 classes of flowers and builds a simple feed forward neural network to classify the flowers based on 4 measurements. 

```
Evaluation eval = new Evaluation(3);
INDArray output = model.output(testData.getFeatures());
eval.eval(testData.getLabels(), output);
log.info(eval.stats());
```

The first line creates an Evaluation object with 3 classes. 
The second line gets the labels from the model for our test dataset. 
The third line uses the eval method to compare the labels array from the testdata with the labels generated from the model. 
The fourth line logs the evaluation data to the console. 

The output.

```
Examples labeled as 0 classified by model as 0: 24 times
Examples labeled as 1 classified by model as 1: 11 times
Examples labeled as 1 classified by model as 2: 1 times
Examples labeled as 2 classified by model as 2: 17 times


==========================Scores========================================
 # of classes:    3
 Accuracy:        0.9811
 Precision:       0.9815
 Recall:          0.9722
 F1 Score:        0.9760
Precision, recall & F1: macro-averaged (equally weighted avg. of 3 classes)
========================================================================
```

By default the .stats() method displays the confusion matrix entries (one per line), Accuracy, Precision, Recall and F1 Score. Additionally the Evaluation Class can also calculate and return the following values:

* Confusion Matrix
* False Positive/Negative Rate
* True Positive/Negative
* Class Counts
* F-beta, G-measure, Matthews Correlation Coefficient and more, see [Evaluation JavaDoc](https://deeplearning4j.org/doc/org/deeplearning4j/eval/Evaluation.html)

Display the Confusion Matrix. 

```
System.out.println(eval.confusionToString());
```

Displays

```
Predicted:         0      1      2
Actual:
0  0          |      16      0      0
1  1          |       0     19      0
2  2          |       0      0     18
```

Additionaly the confusion matrix can be accessed directly, converted to csv or html using.

```
eval.getConfusionMatrix() ;
eval.getConfusionMatrix().toHTML();
eval.getConfusionMatrix().toCSV();
```


### <a name="regression">Evaluation for Regression</a>

To Evaluate a network performing regression use the RegressionEvaluation Class. 

As with the Evaluation class, RegressionEvaluation on a DataSetIterator can be performed as follows:
```
DataSetIterator myTestData = ...
RegressionEvaluation eval = model.evaluateRegression(myTestData);
```

Here is a code snippet with single column, in this case the neural network was predicting the age of shelfish based on measurements. 

```
RegressionEvaluation eval =  new RegressionEvaluation(1);
```

Print the statistics for the Evaluation. 

```
System.out.println(eval.stats());
```

Returns

```
Column    MSE            MAE            RMSE           RSE            R^2            
col_0     7.98925e+00    2.00648e+00    2.82653e+00    5.01481e-01    7.25783e-01    
```

Columns are Mean Squared Error, Mean Absolute Error, Root Mean Squared Error, Relative Squared Error, and R^2 Coefficient of Determination

See [RegressionEvaluation JavaDoc](https://deeplearning4j.org/api/{{page.version}}/org/deeplearning4j/eval/RegressionEvaluation.html)

### <a name="multiple">Performing Multiple Evaluations Simultaneously</a>

When performing multiple types of evaluations (for example, Evaluation and ROC on the same network and dataset) it is more efficient to do this in one pass of the dataset, as follows:

```
DataSetIterator testData = ...
Evaluation eval = new Evaluation();
ROC roc = new ROC();
model.doEvaluation(testdata, eval, roc);
```

### <a name="timeseries">Evaluation of Time Series</a>

Time series evaluation is very similar to the above evaluation approaches. Evaluation in DL4J is performed on all (non-masked) time steps separately - for example, a time series of length 10 will contribute 10 predictions/labels to an Evaluation object.
One difference with time seires is the (optional) presence of mask arrays, which are used to mark some time steps as missing or not present. See [Using RNNs - Masking](./deeplearning4j-nn-recurrent) for more details on masking.

For most users, it is simply sufficient to use the ```MultiLayerNetwork.evaluate(DataSetIterator)``` or ```MultiLayerNetwork.evaluateRegression(DataSetIterator)``` and similar methods. These methods will properly handle masking, if mask arrays are present.


### <a name="binary">Evaluation for Binary Classifiers</a>

The EvaluationBinary is used for evaluating networks with binary classification outputs - these networks usually have Sigmoid activation functions and XENT loss functions. The typical classification metrics, such as accuracy, precision, recall, F1 score, etc. are calculated for each output.

```
EvaluationBinary eval = new EvaluationBinary(int size)
```

See [EvaluationBinary JavaDoc](https://deeplearning4j.org/api/{{page.version}}/org/deeplearning4j/eval/EvaluationBinary.html)


### <a name="roc">ROC</a>

ROC (Receiver Operating Characteristic) is another commonly used evaluation metric for the evaluation of classifiers. Three ROC variants exist in DL4J:

- ROC - for single binary label (as a single column probability, or 2 column 'softmax' probability distribution).
- ROCBinary - for multiple binary labels
- ROCMultiClass - for evaluation of non-binary classifiers, using a "one vs. all" approach 

These classes have the ability to calculate the area under ROC curve (AUROC) and area under Precision-Recall curve (AUPRC), via the ```calculateAUC()``` and ```calculateAUPRC()``` methods. Furthermore, the ROC and Precision-Recall curves can be obtained using ```getRocCurve()``` and ```getPrecisionRecallCurve()```.

The ROC and Precision-Recall curves can be exported to HTML for viewing using: ```EvaluationTools.exportRocChartsToHtmlFile(ROC, File)```, which will export a HTML file with both ROC and P-R curves, that can be viewed in a browser.


Note that all three support two modes of operation/calculation
- Thresholded (approximate AUROC/AUPRC calculation, no memory issues)
- Exact (exact AUROC/AUPRC calculation, but can require large amount of memory with very large datasets - i.e., datasets with many millions of examples)

The number of bins can be set using the constructors. Exact can be set using the default constructor ```new ROC()``` or explicitly using ```new ROC(0)```

See [ROCBinary JavaDoc](https://deeplearning4j.org/api/{{page.version}}/org/deeplearning4j/eval/ROC.html) is used to evaluate Binary Classifiers.

### <a name="calibration">Evaluating Classifier Calibration</a>

Deeplearning4j also has the EvaluationCalibration class, which is designed to analyze the calibration of a classifier. It provides a number of tools for this purpose:
 
 - Counts of the number of labels and predictions for each class
 - Reliability diagram (or reliability curve)
 - Residual plot (histogram)
 - Histograms of probabilities, including probabilities for each class separately
 
 Evaluation of a classifier using EvaluationCalibration is performed in a similar manner to the other evaluation classes.
 The various plots/histograms can be exported to HTML for viewing using ```EvaluationTools.exportevaluationCalibrationToHtmlFile(EvaluationCalibration, File)```.

### <a name="spark">Distributed Evaluation for Spark Networks</a>

SparkDl4jMultiLayer and SparkComputationGraph both have similar methods for evaluation:
```
Evaluation eval = SparkDl4jMultiLayer.evaluate(JavaRDD<DataSet>);

//Multiple evaluations in one pass:
SparkDl4jMultiLayer.doEvaluation(JavaRDD<DataSet>, IEvaluation...);
```


### <a name="multitask">Evaluation for Multi-task Networks</a>

A multi-task network is a network that is trained to produce multiple outputs. For example a network given audio samples can be trained to both predict the language spoken and the gender of the speaker. Multi-task configuration is briefly described [here](./deeplearning4j-nn-computationgraph). 

Evaluation Classes useful for Multi-Task Network

See [ROCMultiClass JavaDoc](https://deeplearning4j.org/api/{{page.version}}/org/deeplearning4j/eval/ROCMultiClass.html)

See [ROCBinary JavaDoc](https://deeplearning4j.org/api/{{page.version}}/org/deeplearning4j/eval/ROCBinary.html)

## Available evaluations


---

### ROCBinary
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//ROCBinary.java) </span>

ROC (Receiver Operating Characteristic) for multi-task binary classifiers.

distribution), ROCBinary assumes that all outputs are independent binary variables. This also differs from

ROCBinary supports per-example and per-output masking: for per-output masking, any particular output may be absent
(mask value 0) and hence won't be included in the calculated ROC.

##### ROCBinary 
```java
public ROCBinary(int thresholdSteps) 
```


- param thresholdSteps Number of threshold steps to use for the ROC calculation. Set to 0 for exact ROC calculation


##### reset 
```java
public void reset() 
```


- param thresholdSteps Number of threshold steps to use for the ROC calculation. If set to 0: use exact calculation
- param rocRemoveRedundantPts Usually set to true. If true,  remove any redundant points from ROC and P-R curves

##### numLabels 
```java
public int numLabels() 
```


Returns the number of labels - (i.e., size of the prediction/labels arrays) - if known. Returns -1 otherwise

##### getCountActualPositive 
```java
public long getCountActualPositive(int outputNum) 
```


Get the actual positive count (accounting for any masking) for  the specified output/column

- param outputNum Index of the output (0 to {- link #numLabels()}-1)

##### getCountActualNegative 
```java
public long getCountActualNegative(int outputNum) 
```


Get the actual negative count (accounting for any masking) for  the specified output/column

- param outputNum Index of the output (0 to {- link #numLabels()}-1)

##### getRocCurve 
```java
public RocCurve getRocCurve(int outputNum) 
```


Get the ROC curve for the specified output
- param outputNum Number of the output to get the ROC curve for
- return ROC curve

##### getPrecisionRecallCurve 
```java
public PrecisionRecallCurve getPrecisionRecallCurve(int outputNum) 
```


Get the Precision-Recall curve for the specified output
- param outputNum Number of the output to get the P-R curve for
- return  Precision recall curve

##### calculateAverageAuc 
```java
public double calculateAverageAuc() 
```


Macro-average AUC for all outcomes
- return the (macro-)average AUC for all outcomes.

##### calculateAverageAUCPR 
```java
public double calculateAverageAUCPR()
```


- return the (macro-)average AUPRC (area under precision recall curve)

##### calculateAUC 
```java
public double calculateAUC(int outputNum) 
```


Calculate the AUC - Area Under (ROC) Curve<br>
Utilizes trapezoidal integration internally

- param outputNum Output number to calculate AUC for
- return AUC

##### calculateAUCPR 
```java
public double calculateAUCPR(int outputNum) 
```


Calculate the AUCPR - Area Under Curve - Precision Recall<br>
Utilizes trapezoidal integration internally

- param outputNum Output number to calculate AUCPR for
- return AUCPR

##### setLabelNames 
```java
public void setLabelNames(List<String> labels) 
```


Set the label names, for printing via {- link #stats()}





---

### ConfusionMatrix
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//ConfusionMatrix.java) </span>

Creates an empty confusion Matrix

##### ConfusionMatrix 
```java
public ConfusionMatrix(ConfusionMatrix<T> other) 
```


Creates a new ConfusionMatrix initialized with the contents of another ConfusionMatrix.


##### toString 
```java
public String toString() 
```


Increments the entry specified by actual and predicted by one.

##### toCSV 
```java
public String toCSV() 
```


Outputs the ConfusionMatrix as comma-separated values for easy import into spreadsheets

##### toHTML 
```java
public String toHTML() 
```


Outputs Confusion Matrix in an HTML table. Cascading Style Sheets (CSS) can control the table's
appearance by defining the empty-space, actual-count-header, predicted-class-header, and
count-element classes. For example

- return html string





---

### ROCMultiClass
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//ROCMultiClass.java) </span>

ROC (Receiver Operating Characteristic) for multi-class classifiers.

The ROC curves are produced by treating the predictions as a set of one-vs-all classifiers, and then calculating
ROC curves for each. In practice, this means for N classes, we get N ROC curves.


##### ROCMultiClass 
```java
public ROCMultiClass(int thresholdSteps) 
```


- param thresholdSteps Number of threshold steps to use for the ROC calculation. Set to 0 for exact ROC calculation


##### reset 
```java
public void reset() 
```


- param thresholdSteps Number of threshold steps to use for the ROC calculation. If set to 0: use exact calculation
- param rocRemoveRedundantPts Usually set to true. If true,  remove any redundant points from ROC and P-R curves

##### eval 
```java
public void eval(INDArray labels, INDArray predictions) 
```


Evaluate (collect statistics for) the given minibatch of data.
For time series (3 dimensions) use {- link #evalTimeSeries(INDArray, INDArray)} or {- link #evalTimeSeries(INDArray, INDArray, INDArray)}

- param labels      Labels / true outcomes
- param predictions Predictions

##### getRocCurve 
```java
public RocCurve getRocCurve(int classIdx) 
```


Get the (one vs. all) ROC curve for the specified class
- param classIdx Class index to get the ROC curve for
- return ROC curve for the given class

##### getPrecisionRecallCurve 
```java
public PrecisionRecallCurve getPrecisionRecallCurve(int classIdx) 
```


Get the (one vs. all) Precision-Recall curve for the specified class
- param classIdx Class to get the P-R curve for
- return  Precision recall curve for the given class

##### calculateAUC 
```java
public double calculateAUC(int classIdx) 
```


Calculate the AUC - Area Under ROC Curve<br>
Utilizes trapezoidal integration internally

- return AUC

##### calculateAUCPR 
```java
public double calculateAUCPR(int classIdx) 
```


Calculate the AUPRC - Area Under Curve Precision Recall <br>
Utilizes trapezoidal integration internally

- return AUC

##### calculateAverageAUC 
```java
public double calculateAverageAUC() 
```


Calculate the macro-average (one-vs-all) AUC for all classes

##### calculateAverageAUCPR 
```java
public double calculateAverageAUCPR() 
```


Calculate the macro-average (one-vs-all) AUCPR (area under precision recall curve) for all classes

##### getCountActualPositive 
```java
public long getCountActualPositive(int outputNum) 
```


Get the actual positive count (accounting for any masking) for  the specified class

- param outputNum Index of the class

##### getCountActualNegative 
```java
public long getCountActualNegative(int outputNum) 
```


Get the actual negative count (accounting for any masking) for  the specified output/column

- param outputNum Index of the class

##### merge 
```java
public void merge(ROCMultiClass other) 
```


Merge this ROCMultiClass instance with another.
This ROCMultiClass instance is modified, by adding the stats from the other instance.

- param other ROCMultiClass instance to combine with this one





---

### EvaluationAveraging
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//EvaluationAveraging.java) </span>

The averaging approach for binary valuation measures when applied to multiclass classification problems.
Macro averaging: weight each class equally<br>
Micro averaging: weight each example equally<br>
Generally, macro averaging is preferred for imbalanced datasets





---

### RegressionEvaluation
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//RegressionEvaluation.java) </span>

Evaluation method for the evaluation of regression algorithms.<br>
Provides the following metrics, for each column:<br>
- MSE: mean squared error<br>
- MAE: mean absolute error<br>
- RMSE: root mean squared error<br>
- RSE: relative squared error<br>
- PC: pearson correlation coefficient<br>
- R^2: coefficient of determination
See for example: http://www.saedsayad.com/model_evaluation_r.htm


##### RegressionEvaluation 
```java
public RegressionEvaluation() 
```


- return True if the metric should be minimized, or false if the metric should be maximized.
For example, MSE of 0 is best, but R^2 of 1.0 is best


##### correlationR2 
```java
public double correlationR2(int column) 
```


Legacy method for the correlation score.

- param column Column to evaluate
- return Pearson Correlation for the given column
- see {- link #pearsonCorrelation(int)}
- deprecated Use {- link #pearsonCorrelation(int)} instead.
For the R2 score use {- link #rSquared(int)}.

##### pearsonCorrelation 
```java
public double pearsonCorrelation(int column) 
```


Pearson Correlation Coefficient for samples

- param column Column to evaluate
- return Pearson Correlation Coefficient for column with index {- code column}
- see <a href="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient#For_a_sample">Wikipedia</a>

##### rSquared 
```java
public double rSquared(int column) 
```


Coefficient of Determination (R^2 Score)

- param column Column to evaluate
- return R^2 score for column with index {- code column}
- see <a href="https://en.wikipedia.org/wiki/Coefficient_of_determination">Wikipedia</a>

##### averageMeanSquaredError 
```java
public double averageMeanSquaredError() 
```


Average MSE across all columns
- return

##### averageMeanAbsoluteError 
```java
public double averageMeanAbsoluteError() 
```


Average MAE across all columns
- return

##### averagerootMeanSquaredError 
```java
public double averagerootMeanSquaredError() 
```


Average RMSE across all columns
- return

##### averagerelativeSquaredError 
```java
public double averagerelativeSquaredError() 
```


Average RSE across all columns
- return

##### averagecorrelationR2 
```java
public double averagecorrelationR2() 
```


Legacy method for the correlation average across all columns.

- return Pearson Correlation averaged over all columns
- see {- link #averagePearsonCorrelation()}
- deprecated Use {- link #averagePearsonCorrelation()} instead.
For the R2 score use {- link #averageRSquared()}.

##### averagePearsonCorrelation 
```java
public double averagePearsonCorrelation() 
```


Average Pearson Correlation Coefficient across all columns

- return Pearson Correlation Coefficient across all columns

##### averageRSquared 
```java
public double averageRSquared() 
```


Average R2 across all columns

- return R2 score accross all columns





---

### ROC
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//ROC.java) </span>

ROC (Receiver Operating Characteristic) for binary classifiers.<br>
ROC has 2 modes of operation:
(a) Thresholded (less memory)<br>
(b) Exact (default; use numSteps == 0 to set. May not scale to very large datasets)


Thresholded Is an approximate method, that (for large datasets) may use significantly less memory than exact..
Whereas exact implementations will automatically calculate the threshold points based on the data set to give a
'smoother' and more accurate  ROC curve (or optimal cut points for diagnostic purposes), thresholded uses fixed steps
of size 1.0 / thresholdSteps, as this allows easy implementation for batched and distributed evaluation scenarios (where the
full data set is not available in memory on any one machine at once).
Note that in some cases (very skewed probability predictions, for example) the threshold approach can be inaccurate,
often underestimating the true area.

The data is assumed to be binary classification - nColumns == 1 (single binary output variable) or nColumns == 2
(probability distribution over 2 classes, with column 1 being values for 'positive' examples)


##### ROC 
```java
public ROC(int thresholdSteps) 
```


- param thresholdSteps Number of threshold steps to use for the ROC calculation. If set to 0: use exact calculation


##### reset 
```java
public void reset() 
```


- param thresholdSteps Number of threshold steps to use for the ROC calculation. If set to 0: use exact calculation
- param rocRemoveRedundantPts Usually set to true. If true,  remove any redundant points from ROC and P-R curves

##### eval 
```java
public void eval(INDArray labels, INDArray predictions) 
```


Evaluate (collect statistics for) the given minibatch of data.
For time series (3 dimensions) use {- link #evalTimeSeries(INDArray, INDArray)} or {- link #evalTimeSeries(INDArray, INDArray, INDArray)}

- param labels      Labels / true outcomes
- param predictions Predictions

##### getPrecisionRecallCurve 
```java
public PrecisionRecallCurve getPrecisionRecallCurve() 
```


Get the precision recall curve as array.
return[0] = threshold array<br>
return[1] = precision array<br>
return[2] = recall array<br>

- return

##### getRocCurve 
```java
public RocCurve getRocCurve() 
```


Get the ROC curve, as a set of (threshold, falsePositive, truePositive) points

- return ROC curve

##### calculateAUC 
```java
public double calculateAUC() 
```


Calculate the AUROC - Area Under ROC Curve<br>
Utilizes trapezoidal integration internally

- return AUC

##### calculateAUCPR 
```java
public double calculateAUCPR() 
```


Calculate the area under the precision/recall curve - aka AUCPR

- return

##### merge 
```java
public void merge(ROC other) 
```


Merge this ROC instance with another.
This ROC instance is modified, by adding the stats from the other instance.

- param other ROC instance to combine with this one





---

### Evaluation
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//Evaluation.java) </span>

Evaluation metrics:<br>
- precision, recall, f1, fBeta, accuracy, Matthews correlation coefficient, gMeasure<br>
argmax / 0.5)<br>
<br>
Note: Care should be taken when using the Evaluation class for binary classification metrics such as F1, precision,
recall, etc. There are a number of cases to consider:<br>
1. For binary classification (1 or 2 network outputs)<br>
c) To use macro-averaged metrics over both classes for binary classification (uncommon and usually not advisable)
specify 'null' as the argument (instead of 0 or 1) as per (b) above<br>
will report macro-average (of the one-vs-all) binary metrics. Note that you can specify micro vs. macro averaging
<br>
Note that setting a custom binary decision threshold is only possible for the binary case (1 or 2 outputs) and cannot
be used if the number of classes exceeds 2. Predictions with probability > threshold are considered to be class 1,
and are considered class 0 otherwise.<br>
<br>
Cost arrays (a row vector, of size equal to the number of outputs) modify the evaluation process: instead of simply
doing predictedClass = argMax(probabilities), we do predictedClass = argMax(cost  probabilities). Consequently, an
array of all 1s (or, indeed any array of equal values) will result in the same performance as no cost array; non-
equal values will bias the predictions for or against certain classes.


##### Evaluation 
```java
public Evaluation(int numClasses) 
```


The number of classes to account for in the evaluation
- param numClasses the number of classes to account for in the evaluation


##### reset 
```java
public void reset() 
```


Constructor for specifying the number of classes, and optionally the positive class for binary classification.
See Evaluation javadoc for more details on evaluation in the binary case

- param numClasses          The number of classes for the evaluation. Must be 2, if binaryPositiveClass is non-null
- param binaryPositiveClass If non-null, the positive class (0 or 1).

##### eval 
```java
public void eval(INDArray trueLabels, INDArray input, ComputationGraph network) 
```


Evaluate the output
using the given true labels,
the input to the multi layer network
and the multi layer network to
use for evaluation
- param trueLabels the labels to ise
- param input the input to the network to use
for evaluation
- param network the network to use for output

##### eval 
```java
public void eval(INDArray trueLabels, INDArray input, MultiLayerNetwork network) 
```


Evaluate the output
using the given true labels,
the input to the multi layer network
and the multi layer network to
use for evaluation
- param trueLabels the labels to ise
- param input the input to the network to use
for evaluation
- param network the network to use for output

##### eval 
```java
public void eval(INDArray realOutcomes, INDArray guesses) 
```


Collects statistics on the real outcomes vs the
guesses. This is for logistic outcome matrices.

Note that an IllegalArgumentException is thrown if the two passed in
matrices aren't the same length.

- param realOutcomes the real outcomes (labels - usually binary)
- param guesses      the guesses/prediction (usually a probability vector)

##### eval 
```java
public void eval(final INDArray realOutcomes, final INDArray guesses,
                    final List<? extends Serializable> recordMetaData) 
```


Evaluate the network, with optional metadata

- param realOutcomes   Data labels
- param guesses        Network predictions
- param recordMetaData Optional; may be null. If not null, should have size equal to the number of outcomes/guesses


##### eval 
```java
public void eval(int predictedIdx, int actualIdx) 
```


Evaluate a single prediction (one prediction at a time)

- param predictedIdx Index of class predicted by the network
- param actualIdx    Index of actual class

##### stats 
```java
public String stats() 
```


Report the classification statistics as a String
- return Classification statistics as a String

##### stats 
```java
public String stats(boolean suppressWarnings) 
```


Method to obtain the classification report as a String

- param suppressWarnings whether or not to output warnings related to the evaluation results
- return A (multi-line) String with accuracy, precision, recall, f1 score etc

##### stats 
```java
public String stats(boolean suppressWarnings, boolean includeConfusion)
```


Method to obtain the classification report as a String

- param suppressWarnings whether or not to output warnings related to the evaluation results
- param includeConfusion whether the confusion matrix should be included it the returned stats or not
- return A (multi-line) String with accuracy, precision, recall, f1 score etc

##### confusionMatrix 
```java
public String confusionMatrix()
```


Get the confusion matrix as a String
- return Confusion matrix as a String

##### precision 
```java
public double precision(Integer classLabel) 
```


Returns the precision for a given class label

- param classLabel the label
- return the precision for the label

##### precision 
```java
public double precision(Integer classLabel, double edgeCase) 
```


Returns the precision for a given label

- param classLabel the label
- param edgeCase   What to output in case of 0/0
- return the precision for the label

##### precision 
```java
public double precision() 
```


Precision based on guesses so far.<br>
Note: value returned will differ depending on number of classes and settings.<br>
1. For binary classification, if the positive class is set (via default value of 1, via constructor,
or via {- link #setBinaryPositiveClass(Integer)}), the returned value will be for the specified positive class
only.<br>
2. For the multi-class case, or when {- link #getBinaryPositiveClass()} is null, the returned value is macro-averaged
across all classes. i.e., is macro-averaged precision, equivalent to {- code precision(EvaluationAveraging.Macro)}<br>

- return the total precision based on guesses so far

##### precision 
```java
public double precision(EvaluationAveraging averaging) 
```


Calculate the average precision for all classes. Can specify whether macro or micro averaging should be used
NOTE: if any classes have tp=0 and fp=0, (precision=0/0) these are excluded from the average

- param averaging Averaging method - macro or micro
- return Average precision

##### averagePrecisionNumClassesExcluded 
```java
public int averagePrecisionNumClassesExcluded() 
```


When calculating the (macro) average precision, how many classes are excluded from the average due to
no predictions – i.e., precision would be the edge case of 0/0

- return Number of classes excluded from the  average precision

##### averageRecallNumClassesExcluded 
```java
public int averageRecallNumClassesExcluded() 
```


When calculating the (macro) average Recall, how many classes are excluded from the average due to
no predictions – i.e., recall would be the edge case of 0/0

- return Number of classes excluded from the average recall

##### averageF1NumClassesExcluded 
```java
public int averageF1NumClassesExcluded() 
```


When calculating the (macro) average F1, how many classes are excluded from the average due to
no predictions – i.e., F1 would be calculated from a precision or recall of 0/0

- return Number of classes excluded from the average F1

##### averageFBetaNumClassesExcluded 
```java
public int averageFBetaNumClassesExcluded() 
```


When calculating the (macro) average FBeta, how many classes are excluded from the average due to
no predictions – i.e., FBeta would be calculated from a precision or recall of 0/0

- return Number of classes excluded from the average FBeta

##### recall 
```java
public double recall(int classLabel) 
```


Returns the recall for a given label

- param classLabel the label
- return Recall rate as a double

##### recall 
```java
public double recall(int classLabel, double edgeCase) 
```


Returns the recall for a given label

- param classLabel the label
- param edgeCase   What to output in case of 0/0
- return Recall rate as a double

##### recall 
```java
public double recall() 
```


Recall based on guesses so far<br>
Note: value returned will differ depending on number of classes and settings.<br>
1. For binary classification, if the positive class is set (via default value of 1, via constructor,
or via {- link #setBinaryPositiveClass(Integer)}), the returned value will be for the specified positive class
only.<br>
2. For the multi-class case, or when {- link #getBinaryPositiveClass()} is null, the returned value is macro-averaged
across all classes. i.e., is macro-averaged recall, equivalent to {- code recall(EvaluationAveraging.Macro)}<br>

- return the recall for the outcomes

##### recall 
```java
public double recall(EvaluationAveraging averaging) 
```


Calculate the average recall for all classes - can specify whether macro or micro averaging should be used
NOTE: if any classes have tp=0 and fn=0, (recall=0/0) these are excluded from the average

- param averaging Averaging method - macro or micro
- return Average recall

##### falsePositiveRate 
```java
public double falsePositiveRate(int classLabel) 
```


Returns the false positive rate for a given label

- param classLabel the label
- return fpr as a double

##### falsePositiveRate 
```java
public double falsePositiveRate(int classLabel, double edgeCase) 
```


Returns the false positive rate for a given label

- param classLabel the label
- param edgeCase   What to output in case of 0/0
- return fpr as a double

##### falsePositiveRate 
```java
public double falsePositiveRate() 
```


False positive rate based on guesses so far<br>
Note: value returned will differ depending on number of classes and settings.<br>
1. For binary classification, if the positive class is set (via default value of 1, via constructor,
or via {- link #setBinaryPositiveClass(Integer)}), the returned value will be for the specified positive class
only.<br>
2. For the multi-class case, or when {- link #getBinaryPositiveClass()} is null, the returned value is macro-averaged
across all classes. i.e., is macro-averaged false positive rate, equivalent to
{- code falsePositiveRate(EvaluationAveraging.Macro)}<br>

- return the fpr for the outcomes

##### falsePositiveRate 
```java
public double falsePositiveRate(EvaluationAveraging averaging) 
```


Calculate the average false positive rate across all classes. Can specify whether macro or micro averaging should be used

- param averaging Averaging method - macro or micro
- return Average false positive rate

##### falseNegativeRate 
```java
public double falseNegativeRate(Integer classLabel) 
```


Returns the false negative rate for a given label

- param classLabel the label
- return fnr as a double

##### falseNegativeRate 
```java
public double falseNegativeRate(Integer classLabel, double edgeCase) 
```


Returns the false negative rate for a given label

- param classLabel the label
- param edgeCase   What to output in case of 0/0
- return fnr as a double

##### falseNegativeRate 
```java
public double falseNegativeRate() 
```


False negative rate based on guesses so far
Note: value returned will differ depending on number of classes and settings.<br>
1. For binary classification, if the positive class is set (via default value of 1, via constructor,
or via {- link #setBinaryPositiveClass(Integer)}), the returned value will be for the specified positive class
only.<br>
2. For the multi-class case, or when {- link #getBinaryPositiveClass()} is null, the returned value is macro-averaged
across all classes. i.e., is macro-averaged false negative rate, equivalent to
{- code falseNegativeRate(EvaluationAveraging.Macro)}<br>

- return the fnr for the outcomes

##### falseNegativeRate 
```java
public double falseNegativeRate(EvaluationAveraging averaging) 
```


Calculate the average false negative rate for all classes - can specify whether macro or micro averaging should be used

- param averaging Averaging method - macro or micro
- return Average false negative rate

##### falseAlarmRate 
```java
public double falseAlarmRate() 
```


False Alarm Rate (FAR) reflects rate of misclassified to classified records
http://ro.ecu.edu.au/cgi/viewcontent.cgi?article=1058&context=isw<br>
Note: value returned will differ depending on number of classes and settings.<br>
1. For binary classification, if the positive class is set (via default value of 1, via constructor,
or via {- link #setBinaryPositiveClass(Integer)}), the returned value will be for the specified positive class
only.<br>
2. For the multi-class case, or when {- link #getBinaryPositiveClass()} is null, the returned value is macro-averaged
across all classes. i.e., is macro-averaged false alarm rate)

- return the fpr for the outcomes

##### f1 
```java
public double f1(int classLabel) 
```


Calculate f1 score for a given class

- param classLabel the label to calculate f1 for
- return the f1 score for the given label

##### fBeta 
```java
public double fBeta(double beta, int classLabel) 
```


Calculate the f_beta for a given class, where f_beta is defined as:<br>
(1+beta^2)  (precision  recall) / (beta^2  precision + recall).<br>
F1 is a special case of f_beta, with beta=1.0

- param beta       Beta value to use
- param classLabel Class label
- return F_beta

##### fBeta 
```java
public double fBeta(double beta, int classLabel, double defaultValue) 
```


Calculate the f_beta for a given class, where f_beta is defined as:<br>
(1+beta^2)  (precision  recall) / (beta^2  precision + recall).<br>
F1 is a special case of f_beta, with beta=1.0

- param beta       Beta value to use
- param classLabel Class label
- param defaultValue Default value to use when precision or recall is undefined (0/0 for prec. or recall)
- return F_beta

##### f1 
```java
public double f1() 
```


Calculate the F1 score<br>
F1 score is defined as:<br>
TP: true positive<br>
FP: False Positive<br>
FN: False Negative<br>
F1 score: 2  TP / (2TP + FP + FN)<br>
<br>
Note: value returned will differ depending on number of classes and settings.<br>
1. For binary classification, if the positive class is set (via default value of 1, via constructor,
or via {- link #setBinaryPositiveClass(Integer)}), the returned value will be for the specified positive class
only.<br>
2. For the multi-class case, or when {- link #getBinaryPositiveClass()} is null, the returned value is macro-averaged
across all classes. i.e., is macro-averaged f1, equivalent to {- code f1(EvaluationAveraging.Macro)}<br>

- return the f1 score or harmonic mean of precision and recall based on current guesses

##### f1 
```java
public double f1(EvaluationAveraging averaging) 
```


Calculate the average F1 score across all classes, using macro or micro averaging

- param averaging Averaging method to use

##### fBeta 
```java
public double fBeta(double beta, EvaluationAveraging averaging) 
```


Calculate the average F_beta score across all classes, using macro or micro averaging

- param beta Beta value to use
- param averaging Averaging method to use

##### gMeasure 
```java
public double gMeasure(int output) 
```


Calculate the G-measure for the given output

- param output The specified output
- return The G-measure for the specified output

##### gMeasure 
```java
public double gMeasure(EvaluationAveraging averaging) 
```


Calculates the average G measure for all outputs using micro or macro averaging

- param averaging Averaging method to use
- return Average G measure

##### accuracy 
```java
public double accuracy() 
```


Accuracy:
(TP + TN) / (P + N)

- return the accuracy of the guesses so far

##### topNAccuracy 
```java
public double topNAccuracy() 
```


Top N accuracy of the predictions so far. For top N = 1 (default), equivalent to {- link #accuracy()}
- return Top N accuracy

##### matthewsCorrelation 
```java
public double matthewsCorrelation(int classIdx) 
```


Calculate the binary Mathews correlation coefficient, for the specified class.<br>
MCC = (TPTN - FPFN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))<br>

- param classIdx Class index to calculate Matthews correlation coefficient for

##### matthewsCorrelation 
```java
public double matthewsCorrelation(EvaluationAveraging averaging) 
```


Calculate the average binary Mathews correlation coefficient, using macro or micro averaging.<br>
MCC = (TPTN - FPFN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))<br>
Note: This is NOT the same as the multi-class Matthews correlation coefficient

- param averaging Averaging approach
- return Average

##### incrementTruePositives 
```java
public void incrementTruePositives(Integer classLabel) 
```


True positives: correctly rejected

- return the total true positives so far

##### addToConfusion 
```java
public void addToConfusion(Integer real, Integer guess) 
```


Adds to the confusion matrix

- param real  the actual guess
- param guess the system guess

##### classCount 
```java
public int classCount(Integer clazz) 
```


Returns the number of times the given label
has actually occurred

- param clazz the label
- return the number of times the label
actually occurred

##### getTopNCorrectCount 
```java
public int getTopNCorrectCount() 
```


Return the number of correct predictions according to top N value. For top N = 1 (default) this is equivalent to
the number of correct predictions
- return Number of correct top N predictions

##### getTopNTotalCount 
```java
public int getTopNTotalCount() 
```


Return the total number of top N evaluations. Most of the time, this is exactly equal to {- link #getNumRowCounter()},
but may differ in the case of using {- link #eval(int, int)} as top N accuracy cannot be calculated in that case
(i.e., requires the full probability distribution, not just predicted/actual indices)
- return Total number of top N predictions

##### merge 
```java
public void merge(Evaluation other) 
```


Returns the confusion matrix variable

- return confusion matrix variable for this evaluation

##### confusionToString 
```java
public String confusionToString() 
```


Get a String representation of the confusion matrix

##### compare 
```java
public int compare(Map.Entry<Pair<Integer, Integer>, List<Object>> o1,
                            Map.Entry<Pair<Integer, Integer>, List<Object>> o2) 
```


Get a list of prediction errors, on a per-record basis<br>

<b>Note</b>: Prediction errors are ONLY available if the "evaluate with metadata"  method is used: {- link #eval(INDArray, INDArray, List)}
Otherwise (if the metadata hasn't been recorded via that previously mentioned eval method), there is no value in
splitting each prediction out into a separate Prediction object - instead, use the confusion matrix to get the counts,
via {- link #getConfusionMatrix()}

- return A list of prediction errors, or null if no metadata has been recorded

##### scoreForMetric 
```java
public double scoreForMetric(Metric metric)
```


Get a list of predictions, for all data with the specified <i>actual</i> class, regardless of the predicted
class.

<b>Note</b>: Prediction errors are ONLY available if the "evaluate with metadata"  method is used: {- link #eval(INDArray, INDArray, List)}
Otherwise (if the metadata hasn't been recorded via that previously mentioned eval method), there is no value in
splitting each prediction out into a separate Prediction object - instead, use the confusion matrix to get the counts,
via {- link #getConfusionMatrix()}

- param actualClass Actual class to get predictions for
- return List of predictions, or null if the "evaluate with metadata" method was not used





---

### EvaluationBinary
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//EvaluationBinary.java) </span>

EvaluationBinary: used for evaluating networks with binary classification outputs. The typical classification metrics,
such as accuracy, precision, recall, F1 score, etc. are calculated for each output.<br>

Note that EvaluationBinary supports both per-example and per-output masking.<br>
EvaluationBinary by default uses a decision threshold of 0.5, however decision thresholds can be set on a per-output



##### EvaluationBinary 
```java
public EvaluationBinary(INDArray decisionThreshold) 
```


Create an EvaulationBinary instance with an optional decision threshold array.

- param decisionThreshold Decision threshold for each output; may be null. Should be a row vector with length
equal to the number of outputs, with values in range 0 to 1. An array of 0.5 values is
equivalent to the default (no manually specified decision threshold).


##### eval 
```java
public void eval(INDArray labels, INDArray networkPredictions) 
```


This constructor allows for ROC to be calculated in addition to the standard evaluation metrics, when the
rocBinarySteps arg is non-null. See {- link ROCBinary} for more details

- param size           Number of outputs
- param rocBinarySteps Constructor arg for {- link ROCBinary#ROCBinary(int)}

##### numLabels 
```java
public int numLabels() 
```


Returns the number of labels - (i.e., size of the prediction/labels arrays) - if known. Returns -1 otherwise

##### setLabelNames 
```java
public void setLabelNames(List<String> labels) 
```


Set the label names, for printing via {- link #stats()}

##### totalCount 
```java
public int totalCount(int outputNum) 
```


Get the total number of values for the specified column, accounting for any masking

##### truePositives 
```java
public int truePositives(int outputNum) 
```


Get the true positives count for the specified output

##### trueNegatives 
```java
public int trueNegatives(int outputNum) 
```


Get the true negatives count for the specified output

##### falsePositives 
```java
public int falsePositives(int outputNum) 
```


Get the false positives count for the specified output

##### falseNegatives 
```java
public int falseNegatives(int outputNum) 
```


Get the false negatives count for the specified output

##### accuracy 
```java
public double accuracy(int outputNum) 
```


Get the accuracy for the specified output

##### precision 
```java
public double precision(int outputNum) 
```


Get the precision (tp / (tp + fp)) for the specified output

##### recall 
```java
public double recall(int outputNum) 
```


Get the recall (tp / (tp + fn)) for the specified output

##### fBeta 
```java
public double fBeta(double beta, int outputNum) 
```


Calculate the F-beta value for the given output

- param beta      Beta value to use
- param outputNum Output number
- return F-beta for the given output

##### f1 
```java
public double f1(int outputNum) 
```


Get the F1 score for the specified output

##### matthewsCorrelation 
```java
public double matthewsCorrelation(int outputNum) 
```


Calculate the Matthews correlation coefficient for the specified output

- param outputNum Output number
- return Matthews correlation coefficient

##### gMeasure 
```java
public double gMeasure(int output) 
```


Calculate the G-measure for the given output

- param output The specified output
- return The G-measure for the specified output

##### falsePositiveRate 
```java
public double falsePositiveRate(int classLabel) 
```


Returns the false positive rate for a given label

- param classLabel the label
- return fpr as a double

##### falsePositiveRate 
```java
public double falsePositiveRate(int classLabel, double edgeCase) 
```


Returns the false positive rate for a given label

- param classLabel the label
- param edgeCase   What to output in case of 0/0
- return fpr as a double

##### falseNegativeRate 
```java
public double falseNegativeRate(Integer classLabel) 
```


Returns the false negative rate for a given label

- param classLabel the label
- return fnr as a double

##### falseNegativeRate 
```java
public double falseNegativeRate(Integer classLabel, double edgeCase) 
```


Returns the false negative rate for a given label

- param classLabel the label
- param edgeCase   What to output in case of 0/0
- return fnr as a double

##### getROCBinary 
```java
public ROCBinary getROCBinary() 
```


Returns the {- link ROCBinary} instance, if present

##### stats 
```java
public String stats() 
```


Get a String representation of the EvaluationBinary class, using the default precision

##### stats 
```java
public String stats(int printPrecision) 
```


Get a String representation of the EvaluationBinary class, using the specified precision

- param printPrecision The precision (number of decimal places) for the accuracy, f1, etc.





---

### EvaluationCalibration
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//EvaluationCalibration.java) </span>

EvaluationCalibration is an evaluation class designed to analyze the calibration of a classifier.<br>
It provides a number of tools for this purpose:
- Counts of the number of labels and predictions for each class<br>
- Reliability diagram (or reliability curve)<br>
- Residual plot (histogram)<br>
- Histograms of probabilities, including probabilities for each class separately<br>
<br>
References:<br>
- Reliability diagram: see for example Niculescu-Mizil and Caruana 2005, Predicting Good Probabilities With
Supervised Learning<br>
- Residual plot: see Wallace and Dahabreh 2012, Class Probability Estimates are Unreliable for Imbalanced Data
(and How to Fix Them)<br>



##### EvaluationCalibration 
```java
public EvaluationCalibration() 
```


Create an EvaluationCalibration instance with the default number of bins


##### eval 
```java
public void eval(INDArray labels, INDArray networkPredictions, INDArray maskArray) 
```


Create an EvaluationCalibration instance with the specified number of bins

- param reliabilityDiagNumBins Number of bins for the reliability diagram (usually 10)
- param histogramNumBins       Number of bins for the histograms

##### getReliabilityDiagram 
```java
public ReliabilityDiagram getReliabilityDiagram(int classIdx) 
```


Get the reliability diagram for the specified class

- param classIdx Index of the class to get the reliability diagram for

##### getResidualPlotAllClasses 
```java
public Histogram getResidualPlotAllClasses() 
```


- return The number of observed labels for each class. For N classes, be returned array is of length N, with
out[i] being the number of labels of class i

##### getResidualPlot 
```java
public Histogram getResidualPlot(int labelClassIdx) 
```


Get the residual plot, only for examples of the specified class.. The residual plot is defined as a histogram of<br>
|label_i - prob(class_i | input)| for all and examples; for this particular method, only predictions where
i == labelClassIdx are included.<br>
In general, small residuals indicate a superior classifier to large residuals.

- param labelClassIdx Index of the class to get the residual plot for
- return Residual plot (histogram) - all predictions/classes

##### getProbabilityHistogramAllClasses 
```java
public Histogram getProbabilityHistogramAllClasses() 
```


Return a probability histogram for all predictions/classes.

- return Probability histogram

##### getProbabilityHistogram 
```java
public Histogram getProbabilityHistogram(int labelClassIdx) 
```


Return a probability histogram of the specified label class index. That is, for label class index i,
a histogram of P(class_i | input) is returned, only for those examples that are labelled as class i.

- param labelClassIdx Index of the label class to get the histogram for
- return Probability histogram





---

### EvaluationUtils
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//EvaluationUtils.java) </span>

Utility methods for performing evaluation


##### precision 
```java
public static double precision(long tpCount, long fpCount, double edgeCase) 
```


Calculate the precision from true positive and false positive counts

- param tpCount  True positive count
- param fpCount  False positive count
- param edgeCase Edge case value use to avoid 0/0
- return Precision

##### recall 
```java
public static double recall(long tpCount, long fnCount, double edgeCase) 
```


Calculate the recall from true positive and false negative counts

- param tpCount  True positive count
- param fnCount  False negative count
- param edgeCase Edge case values used to avoid 0/0
- return Recall

##### falsePositiveRate 
```java
public static double falsePositiveRate(long fpCount, long tnCount, double edgeCase) 
```


Calculate the false positive rate from the false positive count and true negative count

- param fpCount  False positive count
- param tnCount  True negative count
- param edgeCase Edge case values are used to avoid 0/0
- return False positive rate

##### falseNegativeRate 
```java
public static double falseNegativeRate(long fnCount, long tpCount, double edgeCase) 
```


Calculate the false negative rate from the false negative counts and true positive count

- param fnCount  False negative count
- param tpCount  True positive count
- param edgeCase Edge case value to use to avoid 0/0
- return False negative rate

##### fBeta 
```java
public static double fBeta(double beta, long tp, long fp, long fn) 
```


Calculate the F beta value from counts

- param beta Beta of value to use
- param tp   True positive count
- param fp   False positive count
- param fn   False negative count
- return F beta

##### fBeta 
```java
public static double fBeta(double beta, double precision, double recall) 
```


Calculate the F-beta value from precision and recall

- param beta      Beta value to use
- param precision Precision
- param recall    Recall
- return F-beta value

##### gMeasure 
```java
public static double gMeasure(double precision, double recall) 
```


Calculate the G-measure from precision and recall

- param precision Precision value
- param recall    Recall value
- return G-measure

##### matthewsCorrelation 
```java
public static double matthewsCorrelation(long tp, long fp, long fn, long tn) 
```


Calculate the binary Matthews correlation coefficient from counts

- param tp True positive count
- param fp False positive counts
- param fn False negative counts
- param tn True negative count
- return Matthews correlation coefficient





---

### IEvaluation
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-nn/src/main/java/org/deeplearning4j/eval//IEvaluation.java) </span>

A general purpose interface for evaluating neural networks - methods are shared by implemetations such as

