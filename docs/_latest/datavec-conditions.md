---
title: DataVec Conditions
short_title: Conditions
description: Rules for triggering operations and transformations.
category: DataVec
weight: 3
---

## Available conditions

### BooleanCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/BooleanCondition.java) </span>

BooleanCondition: used for creating compound conditions,
such as AND(ConditionA, ConditionB, ...)<br>
As a BooleanCondition is a condition,
these can be chained together,
like NOT(OR(AND(...),AND(...)))


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

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise

##### conditionSequence 
```java
public boolean conditionSequence(Object sequence) 
```


Condition on arbitrary input

- param sequence the sequence to
do a condition on
- return true if the condition for the sequence is met false otherwise

##### transform 
```java
public Schema transform(Schema inputSchema) 
```


Get the output schema for this transformation, given an input schema

- param inputSchema

##### AND 
```java
public static Condition AND(Condition... conditions) 
```


And of all the given conditions
- param conditions the conditions to and
- return a joint and of all these conditions

##### OR 
```java
public static Condition OR(Condition... conditions) 
```


Or of all the given conditions
- param conditions the conditions to or
- return a joint and of all these conditions

##### NOT 
```java
public static Condition NOT(Condition condition) 
```


Not of  the given condition
- param condition the conditions to and
- return a joint and of all these condition

##### XOR 
```java
public static Condition XOR(Condition first, Condition second) 
```


And of all the given conditions
- param first the first condition
- param second  the second condition for xor
- return the xor of these 2 conditions




### SequenceConditionMode
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/SequenceConditionMode.java) </span>

For certain single-column conditions: how should we apply these to sequences?<br>
<b>And</b>: Condition applies to sequence only if it applies to ALL time steps<br>
<b>Or</b>: Condition applies to sequence if it applies to ANY time steps<br>
<b>NoSequencMode</b>: Condition cannot be applied to sequences at all (error condition)




### BooleanColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/BooleanColumnCondition.java) </span>

Created by agibsonccc on 11/26/16.

##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Returns whether the given element
meets the condition set by this operation

- param writable the element to test
- return true if the condition is met
false otherwise

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### CategoricalColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/CategoricalColumnCondition.java) </span>



##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Constructor for conditions equal or not equal.
Uses default sequence condition mode, {- link BaseColumnCondition#DEFAULT_SEQUENCE_CONDITION_MODE}

- param columnName Column to check for the condition
- param op         Operation (== or != only)
- param value      Value to use in the condition

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### DoubleColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/DoubleColumnCondition.java) </span>



##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Constructor for operations such as less than, equal to, greater than, etc.
Uses default sequence condition mode, {- link BaseColumnCondition#DEFAULT_SEQUENCE_CONDITION_MODE}

- param columnName Column to check for the condition
- param op         Operation (<, >=, !=, etc)
- param value      Value to use in the condition

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### InfiniteColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/InfiniteColumnCondition.java) </span>

A column condition that simply checks whether a floating point value is infinite


##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


- param columnName Column check for the condition




### IntegerColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/IntegerColumnCondition.java) </span>



##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Constructor for operations such as less than, equal to, greater than, etc.
Uses default sequence condition mode, {- link BaseColumnCondition#DEFAULT_SEQUENCE_CONDITION_MODE}

- param columnName Column to check for the condition
- param op         Operation (<, >=, !=, etc)
- param value      Value to use in the condition

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### InvalidValueColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/InvalidValueColumnCondition.java) </span>

A Condition that applies to a single column.
Whenever the specified value is invalid according to the schema, the condition applies.

For example, if a Writable contains String values in an Integer column (and these cannot be parsed to an integer), then
the condition would return true, as these values are invalid according to the schema.


##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### LongColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/LongColumnCondition.java) </span>



##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Constructor for operations such as less than, equal to, greater than, etc.
Uses default sequence condition mode, {- link BaseColumnCondition#DEFAULT_SEQUENCE_CONDITION_MODE}

- param columnName Column to check for the condition
- param op         Operation (<, >=, !=, etc)
- param value      Value to use in the condition

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### NaNColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/NaNColumnCondition.java) </span>

A column condition that simply checks whether a floating point value is NaN


##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


- param columnName Name of the column to check the condition for




### NullWritableColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/NullWritableColumnCondition.java) </span>

Condition that applies to the values in any column. Specifically, condition is true
if the Writable value is a NullWritable, and false for any other value


##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### StringColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/StringColumnCondition.java) </span>



##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Constructor for conditions equal or not equal
Uses default sequence condition mode, {- link BaseColumnCondition#DEFAULT_SEQUENCE_CONDITION_MODE}

- param columnName Column to check for the condition
- param op         Operation (== or != only)
- param value      Value to use in the condition

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### TimeColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/TimeColumnCondition.java) </span>

Condition that applies to the values


##### columnCondition 
```java
public boolean columnCondition(Writable writable) 
```


Constructor for operations such as less than, equal to, greater than, etc.
Uses default sequence condition mode, {- link BaseColumnCondition#DEFAULT_SEQUENCE_CONDITION_MODE}

- param columnName Column to check for the condition
- param op         Operation (<, >=, !=, etc)
- param value      Time value (in epoch millisecond format) to use in the condition

##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise




### TrivialColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/column/TrivialColumnCondition.java) </span>

Created by huitseeker on 5/17/17.



### SequenceLengthCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/sequence/SequenceLengthCondition.java) </span>

A condition on sequence lengths




### StringRegexColumnCondition
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/condition/string/StringRegexColumnCondition.java) </span>

Condition that applies to the values in a String column, using a provided regex.
Condition return true if the String matches the regex, or false otherwise<br>

<b>Note:</b> Uses Writable.toString(), hence can potentially be applied to non-String columns


##### condition 
```java
public boolean condition(Object input) 
```


Condition on arbitrary input

- param input the input to return
the condition for
- return true if the condition is met
false otherwise

