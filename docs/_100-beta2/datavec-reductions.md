---
title: DataVec Reductions
short_title: Reductions
description: Operations for reducing complexity in data.
category: DataVec
weight: 1
---

## Available reductions


---

### GeographicMidpointReduction
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/reduce/impl/GeographicMidpointReduction.java) </span>

delimiter is configurable), determine the geographic midpoint.
See "geographic midpoint" at: http://www.geomidpoint.com/methods.html
For implementation algorithm, see: http://www.geomidpoint.com/calculation.html


##### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param delim Delimiter for the coordinates in text format. For example, if format is "lat,long" use ","





---

### StringReducer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/stringreduce/StringReducer.java) </span>

A StringReducer is used to take a set of examples and reduce them.
The idea: suppose you have a large number of columns, and you want to combine/reduce the values in each column.<br>
StringReducer allows you to specify different reductions for differently for different columns: min, max, sum, mean etc.

Uses are:
(1) Reducing examples by a key
(2) Reduction operations in time series (windowing ops, etc)


##### transform 
```java
public Schema transform(Schema schema) 
```


Get the output schema, given the input schema

##### outputColumnName 
```java
public Builder outputColumnName(String outputColumnName) 
```


Create a StringReducer builder, and set the default column reduction operation.
For any columns that aren't specified explicitly, they will use the default reduction operation.
If a column does have a reduction operation explicitly specified, then it will override
the default specified here.

- param defaultOp Default reduction operation to perform

##### appendColumns 
```java
public Builder appendColumns(String... columns) 
```


Reduce the specified columns by taking the minimum value

##### prependColumns 
```java
public Builder prependColumns(String... columns) 
```


Reduce the specified columns by taking the maximum value

##### mergeColumns 
```java
public Builder mergeColumns(String... columns) 
```


Reduce the specified columns by taking the sum of values

##### replaceColumn 
```java
public Builder replaceColumn(String... columns) 
```


Reduce the specified columns by taking the mean of the values

##### customReduction 
```java
public Builder customReduction(String column, ColumnReduction columnReduction) 
```


Reduce the specified column using a custom column reduction functionality.

- param column          Column to execute the custom reduction functionality on
- param columnReduction Column reduction to execute on that column

##### setIgnoreInvalid 
```java
public Builder setIgnoreInvalid(String... columns) 
```


When doing the reduction: set the specified columns to ignore any invalid values.
Invalid: defined as being not valid according to the ColumnMetaData: {- link ColumnMetaData#isValid(Writable)}.
For numerical columns, this typically means being unable to parse the Writable. For example, Writable.toLong() failing for a Long column.
If the column has any restrictions (min/max values, regex for Strings etc) these will also be taken into account.

- param columns Columns to set 'ignore invalid' for

