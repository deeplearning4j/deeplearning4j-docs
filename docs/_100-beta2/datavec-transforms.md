---
title: DataVec Transforms
short_title: Transforms
description: Data wrangling and mapping from one schema to another.
category: DataVec
weight: 1
---

## Data wrangling

One of the key tools in DataVec is transformations. DataVec helps the user map a dataset from one schema to another, and provides a list of operations to convert types, format data, and convert a 2D dataset to sequence data.

## Building a transform process

A transform process requires a `Schema` to successfully transform data. Both schema and transform process classes come with a helper `Builder` class which are useful for organizing code and avoiding complex constructors.

When both are combined together they look like the sample code below. Note how `inputDataSchema` is passed into the `Builder` constructor. Your transform process will fail to compile without it.

```java
import org.datavec.api.transform.TransformProcess;

TransformProcess tp = new TransformProcess.Builder(inputDataSchema)
    .removeColumns("CustomerID","MerchantID")
    .filter(new ConditionFilter(new CategoricalColumnCondition("MerchantCountryCode", ConditionOp.NotInSet, new HashSet<>(Arrays.asList("USA","CAN")))))
    .conditionalReplaceValueTransform(
        "TransactionAmountUSD",     //Column to operate on
        new DoubleWritable(0.0),    //New value to use, when the condition is satisfied
        new DoubleColumnCondition("TransactionAmountUSD",ConditionOp.LessThan, 0.0)) //Condition: amount < 0.0
    .stringToTimeTransform("DateTimeString","YYYY-MM-DD HH:mm:ss.SSS", DateTimeZone.UTC)
    .renameColumn("DateTimeString", "DateTime")
    .transform(new DeriveColumnsFromTimeTransform.Builder("DateTime").addIntegerDerivedColumn("HourOfDay", DateTimeFieldType.hourOfDay()).build())
    .removeColumns("DateTime")
    .build();
```

## Executing a transformation

Different "backends" for executors are available. Using the `tp` transform process above, here's how you can execute it locally using plain DataVec.

```java
import org.datavec.local.transforms.LocalTransformExecutor;

List<List<Writable>> processedData = LocalTransformExecutor.execute(originalData, tp);
```

## Debugging

Each operation in a transform process represents a "step" in schema changes. Sometimes, the resulting transformation is not the intended result. You can debug this by printing each step in the transform `tp` with the following:

```java
//Now, print the schema after each time step:
int numActions = tp.getActionList().size();

for(int i=0; i<numActions; i++ ){
    System.out.println("\n\n==================================================");
    System.out.println("-- Schema after step " + i + " (" + tp.getActionList().get(i) + ") --");

    System.out.println(tp.getSchemaAfterStep(i));
}
```

## Available transformations and conversions


---

### TransformProcess
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/TransformProcess.java) </span>

A TransformProcess defines
an ordered list of transformations
to be executed on some data


##### getFinalSchema 
```java
public Schema getFinalSchema() 
```


Get the action list that this transform process
will execute
- return

##### getSchemaAfterStep 
```java
public Schema getSchemaAfterStep(int step) 
```


Return the schema after executing all steps up to and including the specified step.
Steps are indexed from 0: so getSchemaAfterStep(0) is after one transform has been executed.

- param step Index of the step
- return Schema of the data, after that (and all prior) steps have been executed

##### toJson 
```java
public String toJson() 
```


Execute the full sequence of transformations for a single example. May return null if example is filtered
<b>NOTE:</b> Some TransformProcess operations cannot be done on examples individually. Most notably, ConvertToSequence
and ConvertFromSequence operations require the full data set to be processed at once

- param input
- return

##### toYaml 
```java
public String toYaml() 
```


Convert the TransformProcess to a YAML string

- return TransformProcess, as YAML

##### fromJson 
```java
public static TransformProcess fromJson(String json) 
```


Deserialize a JSON String (created by {- link #toJson()}) to a TransformProcess

- return TransformProcess, from JSON

##### fromYaml 
```java
public static TransformProcess fromYaml(String yaml) 
```


Deserialize a JSON String (created by {- link #toJson()}) to a TransformProcess

- return TransformProcess, from JSON

##### transform 
```java
public Builder transform(Transform transform) 
```


Infer the categories for the given record reader for a particular column
Note that each "column index" is a column in the context of:
List<Writable> record = ...;
record.get(columnIndex);

Note that anything passed in as a column will be automatically converted to a
string for categorical purposes.

The expected input is strings or numbers (which have sensible toString() representations)

Note that the returned categories will be sorted alphabetically

- param recordReader the record reader to iterate through
- param columnIndex te column index to get categories for
- return

##### filter 
```java
public Builder filter(Filter filter) 
```


Add a filter operation to be executed after the previously-added operations have been executed

- param filter Filter operation to execute

##### filter 
```java
public Builder filter(Condition condition) 
```


Add a filter operation, based on the specified condition.

If condition is satisfied (returns true): remove the example or sequence<br>
If condition is not satisfied (returns false): keep the example or sequence

- param condition Condition to filter on

##### removeColumns 
```java
public Builder removeColumns(String... columnNames) 
```


Remove all of the specified columns, by name

- param columnNames Names of the columns to remove

##### removeColumns 
```java
public Builder removeColumns(Collection<String> columnNames) 
```


Remove all of the specified columns, by name

- param columnNames Names of the columns to remove

##### removeAllColumnsExceptFor 
```java
public Builder removeAllColumnsExceptFor(String... columnNames) 
```


Remove all columns, except for those that are specified here
- param columnNames    Names of the columns to keep

##### removeAllColumnsExceptFor 
```java
public Builder removeAllColumnsExceptFor(Collection<String> columnNames) 
```


Remove all columns, except for those that are specified here
- param columnNames    Names of the columns to keep

##### renameColumn 
```java
public Builder renameColumn(String oldName, String newName) 
```


Rename a single column

- param oldName Original column name
- param newName New column name

##### renameColumns 
```java
public Builder renameColumns(List<String> oldNames, List<String> newNames) 
```


Rename multiple columns

- param oldNames List of original column names
- param newNames List of new column names

##### reorderColumns 
```java
public Builder reorderColumns(String... newOrder) 
```


Reorder the columns using a partial or complete new ordering.
If only some of the column names are specified for the new order, the remaining columns will be placed at
the end, according to their current relative ordering

- param newOrder Names of the columns, in the order they will appear in the output

##### duplicateColumn 
```java
public Builder duplicateColumn(String column, String newName) 
```


Duplicate a single column

- param column Name of the column to duplicate
- param newName    Name of the new (duplicate) column

##### duplicateColumns 
```java
public Builder duplicateColumns(List<String> columnNames, List<String> newNames) 
```


Duplicate a set of columns

- param columnNames Names of the columns to duplicate
- param newNames    Names of the new (duplicated) columns

##### integerMathOp 
```java
public Builder integerMathOp(String column, MathOp mathOp, int scalar) 
```


Perform a mathematical operation (add, subtract, scalar max etc) on the specified integer column, with a scalar

- param column The integer column to perform the operation on
- param mathOp     The mathematical operation
- param scalar     The scalar value to use in the mathematical operation

##### integerColumnsMathOp 
```java
public Builder integerColumnsMathOp(String newColumnName, MathOp mathOp, String... columnNames) 
```


Calculate and add a new integer column by performing a mathematical operation on a number of existing columns.
New column is added to the end.

- param newColumnName Name of the new/derived column
- param mathOp        Mathematical operation to execute on the columns
- param columnNames   Names of the columns to use in the mathematical operation

##### longMathOp 
```java
public Builder longMathOp(String columnName, MathOp mathOp, long scalar) 
```


Perform a mathematical operation (add, subtract, scalar max etc) on the specified long column, with a scalar

- param columnName The long column to perform the operation on
- param mathOp     The mathematical operation
- param scalar     The scalar value to use in the mathematical operation

##### longColumnsMathOp 
```java
public Builder longColumnsMathOp(String newColumnName, MathOp mathOp, String... columnNames) 
```


Calculate and add a new long column by performing a mathematical operation on a number of existing columns.
New column is added to the end.

- param newColumnName Name of the new/derived column
- param mathOp        Mathematical operation to execute on the columns
- param columnNames   Names of the columns to use in the mathematical operation

##### floatMathOp 
```java
public Builder floatMathOp(String columnName, MathOp mathOp, float scalar) 
```


Perform a mathematical operation (add, subtract, scalar max etc) on the specified double column, with a scalar

- param columnName The float column to perform the operation on
- param mathOp     The mathematical operation
- param scalar     The scalar value to use in the mathematical operation

##### floatColumnsMathOp 
```java
public Builder floatColumnsMathOp(String newColumnName, MathOp mathOp, String... columnNames) 
```


Calculate and add a new float column by performing a mathematical operation on a number of existing columns.
New column is added to the end.

- param newColumnName Name of the new/derived column
- param mathOp        Mathematical operation to execute on the columns
- param columnNames   Names of the columns to use in the mathematical operation

##### floatMathFunction 
```java
public Builder floatMathFunction(String columnName, MathFunction mathFunction) 
```


Perform a mathematical operation (such as sin(x), ceil(x), exp(x) etc) on a column

- param columnName   Column name to operate on
- param mathFunction MathFunction to apply to the column

##### doubleMathOp 
```java
public Builder doubleMathOp(String columnName, MathOp mathOp, double scalar) 
```


Perform a mathematical operation (add, subtract, scalar max etc) on the specified double column, with a scalar

- param columnName The double column to perform the operation on
- param mathOp     The mathematical operation
- param scalar     The scalar value to use in the mathematical operation

##### doubleColumnsMathOp 
```java
public Builder doubleColumnsMathOp(String newColumnName, MathOp mathOp, String... columnNames) 
```


Calculate and add a new double column by performing a mathematical operation on a number of existing columns.
New column is added to the end.

- param newColumnName Name of the new/derived column
- param mathOp        Mathematical operation to execute on the columns
- param columnNames   Names of the columns to use in the mathematical operation

##### doubleMathFunction 
```java
public Builder doubleMathFunction(String columnName, MathFunction mathFunction) 
```


Perform a mathematical operation (such as sin(x), ceil(x), exp(x) etc) on a column

- param columnName   Column name to operate on
- param mathFunction MathFunction to apply to the column

##### timeMathOp 
```java
public Builder timeMathOp(String columnName, MathOp mathOp, long timeQuantity, TimeUnit timeUnit) 
```


Perform a mathematical operation (add, subtract, scalar min/max only) on the specified time column

- param columnName   The integer column to perform the operation on
- param mathOp       The mathematical operation
- param timeQuantity The quantity used in the mathematical op
- param timeUnit     The unit that timeQuantity is specified in

##### categoricalToOneHot 
```java
public Builder categoricalToOneHot(String... columnNames) 
```


Convert the specified column(s) from a categorical representation to a one-hot representation.
This involves the creation of multiple new columns each.

- param columnNames Names of the categorical column(s) to convert to a one-hot representation

##### categoricalToInteger 
```java
public Builder categoricalToInteger(String... columnNames) 
```


Convert the specified column(s) from a categorical representation to an integer representation.
This will replace the specified categorical column(s) with an integer repreesentation, where
each integer has the value 0 to numCategories-1.

- param columnNames Name of the categorical column(s) to convert to an integer representation

##### integerToCategorical 
```java
public Builder integerToCategorical(String columnName, List<String> categoryStateNames) 
```


Convert the specified column from an integer representation (assume values 0 to numCategories-1) to
a categorical representation, given the specified state names

- param columnName         Name of the column to convert
- param categoryStateNames Names of the states for the categorical column

##### integerToCategorical 
```java
public Builder integerToCategorical(String columnName, Map<Integer, String> categoryIndexNameMap) 
```


Convert the specified column from an integer representation to a categorical representation, given the specified
mapping between integer indexes and state names

- param columnName           Name of the column to convert
- param categoryIndexNameMap Names of the states for the categorical column

##### integerToOneHot 
```java
public Builder integerToOneHot(String columnName, int minValue, int maxValue) 
```


Convert an integer column to a set of 1 hot columns, based on the value in integer column

- param columnName Name of the integer column
- param minValue   Minimum value possible for the integer column (inclusive)
- param maxValue   Maximum value possible for the integer column (inclusive)

##### addConstantColumn 
```java
public Builder addConstantColumn(String newColumnName, ColumnType newColumnType, Writable fixedValue) 
```


Add a new column, where all values in the column are identical and as specified.

- param newColumnName Name of the new column
- param newColumnType Type of the new column
- param fixedValue    Value in the new column for all records

##### addConstantDoubleColumn 
```java
public Builder addConstantDoubleColumn(String newColumnName, double value) 
```


Add a new double column, where the value for that column (for all records) are identical

- param newColumnName Name of the new column
- param value         Value in the new column for all records

##### addConstantIntegerColumn 
```java
public Builder addConstantIntegerColumn(String newColumnName, int value) 
```


Add a new integer column, where th
e value for that column (for all records) are identical

- param newColumnName Name of the new column
- param value         Value of the new column for all records

##### addConstantLongColumn 
```java
public Builder addConstantLongColumn(String newColumnName, long value) 
```


Add a new integer column, where the value for that column (for all records) are identical

- param newColumnName Name of the new column
- param value         Value in the new column for all records

##### convertToString 
```java
public Builder convertToString(String inputColumn) 
```


Convert the specified column to a string.
- param inputColumn the input column to convert
- return builder pattern

##### convertToDouble 
```java
public Builder convertToDouble(String inputColumn) 
```


Convert the specified column to a double.
- param inputColumn the input column to convert
- return builder pattern

##### convertToInteger 
```java
public Builder convertToInteger(String inputColumn) 
```


Convert the specified column to an integer.
- param inputColumn the input column to convert
- return builder pattern

##### normalize 
```java
public Builder normalize(String column, Normalize type, DataAnalysis da) 
```


Normalize the specified column with a given type of normalization

- param column Column to normalize
- param type   Type of normalization to apply
- param da     DataAnalysis object

##### convertToSequence 
```java
public Builder convertToSequence(String keyColumn, SequenceComparator comparator) 
```


Convert a set of independent records/examples into a sequence, according to some key.
Within each sequence, values are ordered using the provided {- link SequenceComparator}

- param keyColumn  Column to use as a key (values with the same key will be combined into sequences)
- param comparator A SequenceComparator to order the values within each sequence (for example, by time or String order)

##### convertToSequence 
```java
public Builder convertToSequence() 
```


Convert a set of independent records/examples into a sequence; each example is simply treated as a sequence
of length 1, without any join/group operations. Note that more commonly, joining/grouping is required;
use {- link #convertToSequence(List, SequenceComparator)} for this functionality


##### convertToSequence 
```java
public Builder convertToSequence(List<String> keyColumns, SequenceComparator comparator) 
```


Convert a set of independent records/examples into a sequence, where each sequence is grouped according to
one or more key values (i.e., the values in one or more columns)
Within each sequence, values are ordered using the provided {- link SequenceComparator}

- param keyColumns  Column to use as a key (values with the same key will be combined into sequences)
- param comparator A SequenceComparator to order the values within each sequence (for example, by time or String order)

##### convertFromSequence 
```java
public Builder convertFromSequence() 
```


Convert a sequence to a set of individual values (by treating each value in each sequence as a separate example)

##### splitSequence 
```java
public Builder splitSequence(SequenceSplit split) 
```


Split sequences into 1 or more other sequences. Used for example to split large sequences into a set of smaller sequences

- param split SequenceSplit that defines how splits will occur

##### trimSequence 
```java
public Builder trimSequence(int numStepsToTrim, boolean trimFromStart) 
```


SequenceTrimTranform removes the first or last N values in a sequence. Note that the resulting sequence
may be of length 0, if the input sequence is less than or equal to N.

- param numStepsToTrim Number of time steps to trim from the sequence
- param trimFromStart  If true: Trim values from the start of the sequence. If false: trim values from the end.

##### offsetSequence 
```java
public Builder offsetSequence(List<String> columnsToOffset, int offsetAmount,
                                      SequenceOffsetTransform.OperationType operationType) 
```


Perform a sequence of operation on the specified columns. Note that this also truncates sequences by the
specified offset amount by default. Use {- code transform(new SequenceOffsetTransform(...)} to change this.
See {- link SequenceOffsetTransform} for details on exactly what this operation does and how.

- param columnsToOffset Columns to offset
- param offsetAmount    Amount to offset the specified columns by (positive offset: 'columnsToOffset' are
moved to later time steps)
- param operationType   Whether the offset should be done in-place or by adding a new column

##### reduce 
```java
public Builder reduce(IAssociativeReducer reducer) 
```


Reduce (i.e., aggregate/combine) a set of examples (typically by key).
<b>Note</b>: In the current implementation, reduction operations can be performed only on standard (i.e., non-sequence) data

- param reducer Reducer to use

##### reduceSequence 
```java
public Builder reduceSequence(IAssociativeReducer reducer) 
```


Reduce (i.e., aggregate/combine) a set of sequence examples - for each sequence individually.
<b>Note</b>: This method results in non-sequence data. If you would instead prefer sequences of length 1
after the reduction, use {- code transform(new ReduceSequenceTransform(reducer))}.

- param reducer        Reducer to use to reduce each window

##### reduceSequenceByWindow 
```java
public Builder reduceSequenceByWindow(IAssociativeReducer reducer, WindowFunction windowFunction) 
```


Reduce (i.e., aggregate/combine) a set of sequence examples - for each sequence individually - using a window function.
For example, take all records/examples in each 24-hour period (i.e., using window function), and convert them into
a singe value (using the reducer). In this example, the output is a sequence, with time period of 24 hours.

- param reducer        Reducer to use to reduce each window
- param windowFunction Window function to find apply on each sequence individually

##### sequenceMovingWindowReduce 
```java
public Builder sequenceMovingWindowReduce(String columnName, int lookback, ReduceOp op) 
```


SequenceMovingWindowReduceTransform: Adds a new column, where the value is derived by:<br>
(a) using a window of the last N values in a single column,<br>
(b) Apply a reduction op on the window to calculate a new value<br>
for example, this transformer can be used to implement a simple moving average of the last N values,
or determine the minimum or maximum values in the last N time steps.

For example, for a simple moving average, length 20: {- code new SequenceMovingWindowReduceTransform("myCol", 20, ReduceOp.Mean)}

- param columnName Column name to perform windowing on
- param lookback   Look back period for windowing
- param op         Reduction operation to perform on each window

##### calculateSortedRank 
```java
public Builder calculateSortedRank(String newColumnName, String sortOnColumn, WritableComparator comparator) 
```


CalculateSortedRank: calculate the rank of each example, after sorting example.
For example, we might have some numerical "score" column, and we want to know for the rank (sort order) for each
example, according to that column.<br>
The rank of each example (after sorting) will be added in a new Long column. Indexing is done from 0; examples will have
values 0 to dataSetSize-1.<br>

Currently, CalculateSortedRank can only be applied on standard (i.e., non-sequence) data
Furthermore, the current implementation can only sort on one column

- param newColumnName Name of the new column (will contain the rank for each example)
- param sortOnColumn  Column to sort on
- param comparator    Comparator used to sort examples

##### calculateSortedRank 
```java
public Builder calculateSortedRank(String newColumnName, String sortOnColumn, WritableComparator comparator,
                                           boolean ascending) 
```


CalculateSortedRank: calculate the rank of each example, after sorting example.
For example, we might have some numerical "score" column, and we want to know for the rank (sort order) for each
example, according to that column.<br>
The rank of each example (after sorting) will be added in a new Long column. Indexing is done from 0; examples will have
values 0 to dataSetSize-1.<br>

Currently, CalculateSortedRank can only be applied on standard (i.e., non-sequence) data
Furthermore, the current implementation can only sort on one column

- param newColumnName Name of the new column (will contain the rank for each example)
- param sortOnColumn  Column to sort on
- param comparator    Comparator used to sort examples
- param ascending     If true: sort ascending. False: descending

##### stringToCategorical 
```java
public Builder stringToCategorical(String columnName, List<String> stateNames) 
```


Convert the specified String column to a categorical column. The state names must be provided.

- param columnName Name of the String column to convert to categorical
- param stateNames State names of the category

##### stringRemoveWhitespaceTransform 
```java
public Builder stringRemoveWhitespaceTransform(String columnName) 
```


Remove all whitespace characters from the values in the specified String column

- param columnName Name of the column to remove whitespace from

##### stringMapTransform 
```java
public Builder stringMapTransform(String columnName, Map<String, String> mapping) 
```


Replace one or more String values in the specified column with new values.

Keys in the map are the original values; the Values in the map are their replacements.
If a String appears in the data but does not appear in the provided map (as a key), that String values will
not be modified.

- param columnName Name of the column in which to do replacement
- param mapping    Map of oldValues -> newValues

##### stringToTimeTransform 
```java
public Builder stringToTimeTransform(String column, String format, DateTimeZone dateTimeZone) 
```


Convert a String column (containing a date/time String) to a time column (by parsing the date/time String)

- param column       String column containing the date/time Strings
- param format       Format of the strings. Time format is specified as per http://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html
- param dateTimeZone Timezone of the column

##### appendStringColumnTransform 
```java
public Builder appendStringColumnTransform(String column, String toAppend) 
```


Append a String to a specified column

- param column      Column to append the value to
- param toAppend    String to append to the end of each writable

##### conditionalReplaceValueTransform 
```java
public Builder conditionalReplaceValueTransform(String column, Writable newValue, Condition condition) 
```


Replace the values in a specified column with a specified new value, if some condition holds.
If the condition does not hold, the original values are not modified.

- param column    Column to operate on
- param newValue  Value to use as replacement, if condition is satisfied
- param condition Condition that must be satisfied for replacement

##### conditionalReplaceValueTransformWithDefault 
```java
public Builder conditionalReplaceValueTransformWithDefault(String column, Writable yesVal, Writable noVal, Condition condition) 
```


Replace the values in a specified column with a specified "yes" value, if some condition holds.
Replace it with a "no" value, otherwise.

- param column    Column to operate on
- param yesVal  Value to use as replacement, if condition is satisfied
- param noVal  Value to use as replacement, if condition is not satisfied
- param condition Condition that must be satisfied for replacement

##### conditionalCopyValueTransform 
```java
public Builder conditionalCopyValueTransform(String columnToReplace, String sourceColumn, Condition condition) 
```


Replace the value in a specified column with a new value taken from another column, if a condition is satisfied/true.<br>
Note that the condition can be any generic condition, including on other column(s), different to the column
that will be modified if the condition is satisfied/true.<br>

- param columnToReplace    Name of the column in which values will be replaced (if condition is satisfied)
- param sourceColumn       Name of the column from which the new values will be
- param condition          Condition to use

##### replaceStringTransform 
```java
public Builder replaceStringTransform(String columnName, Map<String, String> mapping) 
```


Replace one or more String values in the specified column that match regular expressions.

Keys in the map are the regular expressions; the Values in the map are their String replacements.
For example:
<blockquote>
<table cellpadding="2">
<tr>
<th>Original</th>
<th>Regex</th>
<th>Replacement</th>
<th>Result</th>
</tr>
<tr>
<td>Data_Vec</td>
<td>_</td>
<td></td>
<td>DataVec</td>
</tr>
<tr>
<td>B1C2T3</td>
<td>\\d</td>
<td>one</td>
<td>BoneConeTone</td>
</tr>
<tr>
<td>'&nbsp&nbsp4.25&nbsp'</td>
<td>^\\s+|\\s+$</td>
<td></td>
<td>'4.25'</td>
</tr>
</table>
</blockquote>

- param columnName Name of the column in which to do replacement
- param mapping    Map of old values or regular expression to new values

##### ndArrayScalarOpTransform 
```java
public Builder ndArrayScalarOpTransform(String columnName, MathOp op, double value) 
```


Element-wise NDArray math operation (add, subtract, etc) on an NDArray column

- param columnName Name of the NDArray column to perform the operation on
- param op         Operation to perform
- param value      Value for the operation

##### ndArrayColumnsMathOpTransform 
```java
public Builder ndArrayColumnsMathOpTransform(String newColumnName, MathOp mathOp, String... columnNames) 
```


Perform an element wise mathematical operation (such as add, subtract, multiply) on NDArray columns.
The existing columns are unchanged, a new NDArray column is added

- param newColumnName Name of the new NDArray column
- param mathOp        Operation to perform
- param columnNames   Name of the columns used as input to the operation

##### ndArrayMathFunctionTransform 
```java
public Builder ndArrayMathFunctionTransform(String columnName, MathFunction mathFunction) 
```


Apply an element wise mathematical function (sin, tanh, abs etc) to an NDArray column. This operation is
performed in place.

- param columnName   Name of the column to perform the operation on
- param mathFunction Mathematical function to apply

##### ndArrayDistanceTransform 
```java
public Builder ndArrayDistanceTransform(String newColumnName, Distance distance, String firstCol,
                                                String secondCol) 
```


Calculate a distance (cosine similarity, Euclidean, Manhattan) on two equal-sized NDArray columns. This
operation adds a new Double column (with the specified name) with the result.

- param newColumnName Name of the new column (result) to add
- param distance      Distance to apply
- param firstCol      first column to use in the distance calculation
- param secondCol     second column to use in the distance calculation

##### build 
```java
public TransformProcess build() 
```


Create the TransformProcess object





---

### CategoricalToIntegerTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/categorical/CategoricalToIntegerTransform.java) </span>

Created by Alex on 4/03/2016.

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### CategoricalToOneHotTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/categorical/CategoricalToOneHotTransform.java) </span>

Created by Alex on 4/03/2016.

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### IntegerToCategoricalTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/categorical/IntegerToCategoricalTransform.java) </span>



##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### PivotTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/categorical/PivotTransform.java) </span>

Pivot transform operates on two columns:
- a categorical column that operates as a key, and
- Another column that contains a value
Essentially, Pivot transform takes keyvalue pairs and breaks them out into separate columns.

For example, with schema [col0, key, value, col3]
and values with key in {a,b,c}
Output schema is [col0, key[a], key[b], key[c], col3]
and input (col0Val, b, x, col3Val) gets mapped to (col0Val, 0, x, 0, col3Val).

When expanding columns, a default value is used - for example 0 for numerical columns.


##### transform 
```java
public Schema transform(Schema inputSchema) 
```



- param keyColumnName   Key column to expand
- param valueColumnName Name of the column that contains the value





---

### StringToCategoricalTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/categorical/StringToCategoricalTransform.java) </span>

Convert a String column
to a categorical column

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### AddConstantColumnTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/column/AddConstantColumnTransform.java) </span>

Add a new column, where the values in that column for all records are identical (according to the specified value)





---

### DuplicateColumnsTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/column/DuplicateColumnsTransform.java) </span>

Duplicate one or more columns.
The duplicated columns
are placed immediately after the original columns


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnsToDuplicate List of columns to duplicate
- param newColumnNames     List of names for the new (duplicate) columns

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### RemoveAllColumnsExceptForTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/column/RemoveAllColumnsExceptForTransform.java) </span>

Transform that removes all columns except
for those that are explicitly
specified as ones to keep
To specify only the columns


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### RemoveColumnsTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/column/RemoveColumnsTransform.java) </span>

Remove the specified columns from the data.
To specify only the columns to keep,


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### RenameColumnsTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/column/RenameColumnsTransform.java) </span>

Rename one or more columns


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### ReorderColumnsTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/column/ReorderColumnsTransform.java) </span>

Rearrange the order of the columns.
Note: A partial list of columns can be used here. Any columns that are not explicitly mentioned
will be placed after those that are in the output, without changing their relative order.


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param newOrder A partial or complete order of the columns in the output

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### ConditionalCopyValueTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/condition/ConditionalCopyValueTransform.java) </span>

Replace the value in a specified column with a new value taken from another column, if a condition is satisfied/true.<br>
Note that the condition can be any generic condition, including on other column(s), different to the column
that will be modified if the condition is satisfied/true.<br>

<b>Note</b>: For sequences, this
transform use the convention that
each step in the sequence is passed
to the condition,
and replaced (or not) separately (i.e., Condition.condition(List<Writable>)
is used on each time step individually)


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnToReplace Name of the column in which to replace the old value
- param sourceColumn    Name of the column to get the new value from
- param condition       Condition

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### ConditionalReplaceValueTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/condition/ConditionalReplaceValueTransform.java) </span>

Replace the value in a specified column with a new value, if a condition is satisfied/true.<br>
Note that the condition can be any generic condition, including on other column(s), different to the column
that will be modified if the condition is satisfied/true.<br>

<b>Note</b>: For sequences, this transform use the convention that each step in the sequence is passed to the condition,
and replaced (or not) separately (i.e., Condition.condition(List<Writable>) is used on each time step individually)


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnToReplace Name of the column in which to replace the old value with 'newValue', if the condition holds
- param newValue        New value to use
- param condition       Condition

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### ConditionalReplaceValueTransformWithDefault
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/condition/ConditionalReplaceValueTransformWithDefault.java) </span>

Replace the value in a specified column with a 'yes' value, if a condition is satisfied/true.<br>
Replace the value of this same column with a 'no' value otherwise.
Note that the condition can be any generic condition, including on other column(s), different to the column
that will be modified if the condition is satisfied/true.<br>

<b>Note</b>: For sequences, this transform use the convention that each step in the sequence is passed to the condition,
and replaced (or not) separately (i.e., Condition.condition(List<Writable>) is used on each time step individually)





---

### ConvertToDouble
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/ConvertToDouble.java) </span>

Convert any value to an Double


##### map 
```java
public DoubleWritable map(Writable writable) 
```


- param column Name of the column to convert to a Double column





---

### DoubleColumnsMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/DoubleColumnsMathOpTransform.java) </span>

Add a new double column, calculated from one or more other columns. A new column (with the specified name) is added
as the final column of the output. No other columns are modified.<br>
For example, if newColumnName=="newCol", mathOp==Add, and columns=={"col1","col2"}, then the output column
with name "newCol" has value col1+col2.<br>


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### DoubleMathFunctionTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/DoubleMathFunctionTransform.java) </span>

A simple transform to do common mathematical operations, such as sin(x), ceil(x), etc.<br>





---

### DoubleMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/DoubleMathOpTransform.java) </span>

Double mathematical operation.<br>
This is an in-place operation of the double column value and a double scalar.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### Log2Normalizer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/Log2Normalizer.java) </span>

Normalize by taking scale  log2((in-columnMin)/(mean-columnMin) + 1)
Maps values in range (columnMin to infinity) to (0 to infinity)
Most suitable for values with a geometric/negative exponential type distribution.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### MinMaxNormalizer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/MinMaxNormalizer.java) </span>

Normalizer to map (min to max) -> (newMin-to newMax) linearly. <br>

Mathematically: (newMax-newMin)/(max-min)  (x-min) + newMin


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### StandardizeNormalizer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/StandardizeNormalizer.java) </span>

Normalize using (x-mean)/stdev.
Also known as a standard score, standardization etc.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### SubtractMeanNormalizer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/doubletransform/SubtractMeanNormalizer.java) </span>

Normalize by substracting the mean

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### ConvertToInteger
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/integer/ConvertToInteger.java) </span>

Convert any value to an Integer.


##### map 
```java
public IntWritable map(Writable writable) 
```



- param column Name of the column to convert to an integer





---

### IntegerColumnsMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/integer/IntegerColumnsMathOpTransform.java) </span>

Add a new integer column, calculated from one or more other columns.
A new column (with the specified name) is added
as the final column of the output. No other columns are modified.<br>
For example, if newColumnName=="newCol", mathOp==MathOp.Add, and columns=={"col1","col2"},
then the output column
with name "newCol" has value col1+col2.<br>
<b>NOTE</b>: Division here is using
if a decimal output value is required.


##### toString 
```java
public String toString() 
```


- param newColumnName Name of the new column (output column)
- param mathOp        Mathematical operation. Only Add/Subtract/Multiply/Divide/Modulus is allowed here
- param columns       Columns to use in the mathematical operation

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### IntegerMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/integer/IntegerMathOpTransform.java) </span>

Integer mathematical operation.<br>
This is an in-place operation of the integer column value and an integer scalar.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### IntegerToOneHotTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/integer/IntegerToOneHotTransform.java) </span>

Convert an integer column to a  set of one-hot columns.



##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### ReplaceEmptyIntegerWithValueTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/integer/ReplaceEmptyIntegerWithValueTransform.java) </span>

Replace an empty/missing integer with a certain value.

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### ReplaceInvalidWithIntegerTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/integer/ReplaceInvalidWithIntegerTransform.java) </span>

Replace an invalid (non-integer) value in a column with a specified integer

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### LongColumnsMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/longtransform/LongColumnsMathOpTransform.java) </span>

Add a new long column, calculated from one or more other columns. A new column (with the specified name) is added
as the final column of the output. No other columns are modified.<br>
For example, if newColumnName=="newCol", mathOp==MathOp.Add, and columns=={"col1","col2"}, then the output column
with name "newCol" has value col1+col2.<br>
if a decimal output value is required.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### LongMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/longtransform/LongMathOpTransform.java) </span>

Long mathematical operation.<br>
This is an in-place operation of the long column value and an long scalar.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### TextToCharacterIndexTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/nlp/TextToCharacterIndexTransform.java) </span>


Convert each text value in a sequence to a longer sequence of integer indices.
For example, "abc" would be converted to [1, 2, 3]. Values in other columns will be duplicated.





---

### TextToTermIndexSequenceTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/nlp/TextToTermIndexSequenceTransform.java) </span>


Convert each text value in a sequence to a longer sequence of integer indices.
For example, "zero one two" would be converted to [0, 1, 2]. Values in other
columns will be duplicated.





---

### SequenceDifferenceTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/sequence/SequenceDifferenceTransform.java) </span>

SequenceDifferenceTransform: for an input sequence, calculate the difference on one column.<br>
For each time t, calculate someColumn(t) - someColumn(t-s), where s >= 1 is the 'lookback' period.<br>
<br>
Note: at t=0 (i.e., the first step in a sequence; or more generally, for all times t < s), there is no previous value
these time steps:<br>
1. Default: output = someColumn(t) - someColumn(max(t-s, 0))
2. SpecifiedValue: output = someColumn(t) - someColumn(t-s) if t-s >= 0, or a custom Writable object (for example, a DoubleWritable(0)
or NullWritable).

Note: this is an <i>in-place</i> operation: i.e., the values in each column are modified. If the original values are
and apply the difference operation in-place on the copy.


##### outputColumnName 
```java
public String outputColumnName() 
```


Create a SequenceDifferenceTransform with default lookback of 1, and using FirstStepMode.Default.
Output column name is the same as the input column name.

- param columnName Name of the column to perform the operation on.

##### columnName 
```java
public String columnName() 
```


The output column names
This will often be the same as the input

- return the output column names

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence





---

### SequenceMovingWindowReduceTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/sequence/SequenceMovingWindowReduceTransform.java) </span>

SequenceMovingWindowReduceTransform Adds a new column, where the value is derived by:<br>
(a) using a window of the last N values in a single column,<br>
(b) Apply a reduction op on the window to calculate a new value<br>
for example, this transformer can be used to implement a simple moving average of the last N values,
or determine the minimum or maximum values in the last N time steps.



##### defaultOutputColumnName 
```java
public static String defaultOutputColumnName(String originalName, int lookback, ReduceOp op) 
```


Enumeration to specify how each cases are handled: For example, for a look back period of 20, how should the
first 19 output values be calculated?<br>
Default: Perform your former reduction as normal, with as many values are available<br>
SpecifiedValue: use the given/specified value instead of the actual output value. For example, you could assign
values of 0 or NullWritable to positions 0 through 18 of the output.

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### SequenceOffsetTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/sequence/SequenceOffsetTransform.java) </span>

Sequence offset transform takes a sequence, and shifts The values in one or more columns by a specified number of
times steps. It has 2 modes of operation (OperationType enum), with respect to the columns it operates on:<br>
InPlace: operations may be performed in-place, modifying the values in the specified columns<br>
NewColumn: operations may produce new columns, with the original (source) columns remaining unmodified<br>

Additionally, there are 2 modes for handling values outside the original sequence (EdgeHandling enum):
TrimSequence: the entire sequence is trimmed (start or end) by a specified number of steps<br>
SpecifiedValue: for any values outside of the original sequence, they are given a specified value<br>

Note 1: When specifying offsets, they are done as follows:
Positive offsets: move the values in the specified columns to a later time. Earlier time steps are either be trimmed
or Given specified values; the last values in these columns will be truncated/removed.

Note 2: Care must be taken when using TrimSequence: for example, if we chain multiple sequence offset transforms on the
one dataset, we may end up trimming much more than we want. In this case, it may be better to use SpecifiedValue,
at the end.





---

### AppendStringColumnTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/AppendStringColumnTransform.java) </span>

Append a String to the
values in a single column


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### ChangeCaseStringTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/ChangeCaseStringTransform.java) </span>

Change case (to, e.g, all lower case) of String column.





---

### ConcatenateStringColumns
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/ConcatenateStringColumns.java) </span>

Concatenate values of one or more String columns into
a new String column. Retains the constituent String
columns so user must remove those manually, if desired.

TODO: use new String Reduce functionality in DataVec?


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnsToConcatenate A partial or complete order of the columns in the output

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### ConvertToString
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/ConvertToString.java) </span>

Convert any value to a string.


##### map 
```java
public Text map(Writable writable) 
```


Transform the writable in to a
string

- param writable the writable to transform
- return the string form of this writable

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### MapAllStringsExceptListTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/MapAllStringsExceptListTransform.java) </span>

This method maps all String values, except those is the specified list, to a single String  value


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### RemoveWhiteSpaceTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/RemoveWhiteSpaceTransform.java) </span>

String transform that removes all whitespace charaters

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### ReplaceEmptyStringTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/ReplaceEmptyStringTransform.java) </span>

Replace empty String values with the specified String

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### ReplaceStringTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/ReplaceStringTransform.java) </span>

Replaces String values that match regular expressions.

##### map 
```java
public Text map(final Writable writable) 
```


Constructs a new ReplaceStringTransform using the specified
- param columnName Name of the column
- param map Key: regular expression; Value: replacement value





---

### StringListToCategoricalSetTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/StringListToCategoricalSetTransform.java) </span>

Convert a delimited String to a list of binary categorical columns.
Suppose the possible String values were {"a","b","c","d"} and the String column value to be converted contained
the String "a,c", then the 4 output columns would have values ["true","false","true","false"]


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnName     The name of the column to convert
- param newColumnNames The names of the new columns to create
- param categoryTokens The possible tokens that may be present. Note this list must have the same length and order
as the newColumnNames list
- param delimiter      The delimiter for the Strings to convert

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### StringListToCountsNDArrayTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/StringListToCountsNDArrayTransform.java) </span>

Converts String column into a bag-of-words (BOW) represented as an NDArray of "counts."<br>
Note that the original column is removed in the process


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnName     The name of the column to convert
- param vocabulary     The possible tokens that may be present.
- param delimiter      The delimiter for the Strings to convert
- param ignoreUnknown  Whether to ignore unknown tokens

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

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





---

### StringListToIndicesNDArrayTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/StringListToIndicesNDArrayTransform.java) </span>

Converts String column into a sparse bag-of-words (BOW)
represented as an NDArray of indices. Appropriate for
embeddings or as efficient storage before being expanded
into a dense array.





---

### StringMapTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/string/StringMapTransform.java) </span>

A simple String -> String map function.

Keys in the map are the original values; the Values in the map are their replacements.
If a String appears in the data but does not appear in the provided map (as a key), that String values will
not be modified.


##### map 
```java
public Text map(Writable writable) 
```



- param columnName Name of the column
- param map Key: From. Value: To

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### DeriveColumnsFromTimeTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/time/DeriveColumnsFromTimeTransform.java) </span>

Create a number of new columns by deriving their values from a Time column.
Can be used for example to create new columns with the year, month, day, hour, minute, second etc.


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

##### mapSequence 
```java
public Object mapSequence(Object sequence) 
```


Transform a sequence

- param sequence

##### toString 
```java
public String toString() 
```


The output column name
after the operation has been applied

- return the output column name





---

### StringToTimeTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/time/StringToTimeTransform.java) </span>

Convert a String column to a time column by parsing the date/time String, using a JodaTime.

Time format is specified as per http://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html


##### getNewColumnMetaData 
```java
public ColumnMetaData getNewColumnMetaData(String newName, ColumnMetaData oldColumnType) 
```


Instantiate this without a time format specified.
If this constructor is used, this transform will be allowed
to handle several common transforms as defined in the
static formats array.


- param columnName Name of the String column
- param timeZone   Timezone for time parsing

##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable





---

### TimeMathOpTransform
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/transform/time/TimeMathOpTransform.java) </span>

Transform math op on a time column

Note: only the following MathOps are supported: Add, Subtract, ScalarMin, ScalarMax<br>
For ScalarMin/Max, the TimeUnit must be milliseconds - i.e., value must be in epoch millisecond format


##### map 
```java
public Object map(Object input) 
```


Transform an object
in to another object

- param input the record to transform
- return the transformed writable

