---
title: DataVec Filters
short_title: Filters
description: Selection of data using conditions.
category: DataVec
weight: 3
---

## Using filters

Filters are a part of transforms and gives a DSL for you to keep parts of your dataset. Filters can be one-liners for single conditions or include complex boolean logic.

```java
TransformProcess tp = new TransformProcess.Builder(inputDataSchema)
    .filter(new ConditionFilter(new CategoricalColumnCondition("MerchantCountryCode", ConditionOp.NotInSet, new HashSet<>(Arrays.asList("USA","CAN")))))
    .build();
```

You can also write your own filters by implementing the `Filter` interface, though it is much more often that you may want to create a custom condition instead.

## Available filters

### ConditionFilter
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/filter/ConditionFilter.java) </span>

If condition is satisfied (returns true): remove the example or sequence<br>
If condition is not satisfied (returns false): keep the example or sequence


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#ConditionFilter" aria-expanded="false" aria-controls="ConditionFilter">Show methods</button>
<div class="collapse" id="ConditionFilter"><div class="card card-body">

#### removeExample 
```java
public boolean removeExample(Object writables) 
```


- param writables Example
- return true if example should be removed, false to keep

#### removeSequence 
```java
public boolean removeSequence(Object sequence) 
```


- param sequence sequence example
- return true if example should be removed, false to keep

#### transform 
```java
public Schema transform(Schema inputSchema) 
```


Get the output schema for this transformation, given an input schema

- param inputSchema

#### outputColumnName 
```java
public String outputColumnName() 
```


The output column name
after the operation has been applied

- return the output column name

#### columnName 
```java
public String columnName() 
```


The output column names
This will often be the same as the input

- return the output column names


</div></div>


### Filter
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/filter/Filter.java) </span>

Filter: a method of removing examples
(or sequences) according to some condition




### FilterInvalidValues
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/filter/FilterInvalidValues.java) </span>

FilterInvalidValues: a filter operation that removes any examples (or sequences)
if the examples/sequences contains
invalid values in any of a specified set of columns.
Invalid values are determined with respect to the schema

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#FilterInvalidValues" aria-expanded="false" aria-controls="FilterInvalidValues">Show methods</button>
<div class="collapse" id="FilterInvalidValues"><div class="card card-body">

#### transform 
```java
public Schema transform(Schema inputSchema) 
```


- param columnsToFilterIfInvalid Columns to check for invalid values

#### removeExample 
```java
public boolean removeExample(Object writables) 
```


- param writables Example
- return true if example should be removed, false to keep

#### removeSequence 
```java
public boolean removeSequence(Object sequence) 
```


- param sequence sequence example
- return true if example should be removed, false to keep

#### outputColumnName 
```java
public String outputColumnName() 
```


The output column name
after the operation has been applied

- return the output column name

#### columnName 
```java
public String columnName() 
```


The output column names
This will often be the same as the input

- return the output column names


</div></div>


### InvalidNumColumns
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/filter/InvalidNumColumns.java) </span>

Remove invalid records of a certain size.

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#InvalidNumColumns" aria-expanded="false" aria-controls="InvalidNumColumns">Show methods</button>
<div class="collapse" id="InvalidNumColumns"><div class="card card-body">

#### removeExample 
```java
public boolean removeExample(Object writables) 
```


- param writables Example
- return true if example should be removed, false to keep

#### removeSequence 
```java
public boolean removeSequence(Object sequence) 
```


- param sequence sequence example
- return true if example should be removed, false to keep

#### removeExample 
```java
public boolean removeExample(List<Writable> writables) 
```


- param writables Example
- return true if example should be removed, false to keep

#### removeSequence 
```java
public boolean removeSequence(List<List<Writable>> sequence) 
```


- param sequence sequence example
- return true if example should be removed, false to keep

#### transform 
```java
public Schema transform(Schema inputSchema) 
```


Get the output schema for this transformation, given an input schema

- param inputSchema

#### outputColumnName 
```java
public String outputColumnName() 
```


The output column name
after the operation has been applied

- return the output column name

#### columnName 
```java
public String columnName() 
```


The output column names
This will often be the same as the input

- return the output column names


</div></div>