---
title: DataVec Schema
short_title: Schema
description: Schemas for datasets and transformation.
category: DataVec
weight: 1
---

## Why use schemas?

The unfortunate reality is that data is *dirty*. When trying to vecotrize a dataset for deep learning, it is quite rare to find files that have zero errors. Schema is important for maintaining the meaning of the data before using it for something like training a neural network. 

## Using schemas

Schemas are primarily used for programming transformations. Before you can properly execute a `TransformProcess` you will need to pass the schema of the data being transformed. 

An example of a schema for merchant records may look like:

```java
Schema inputDataSchema = new Schema.Builder()
    .addColumnsString("DateTimeString", "CustomerID", "MerchantID")
    .addColumnInteger("NumItemsInTransaction")
    .addColumnCategorical("MerchantCountryCode", Arrays.asList("USA","CAN","FR","MX"))
    .addColumnDouble("TransactionAmountUSD",0.0,null,false,false)   //$0.0 or more, no maximum limit, no NaN and no Infinite values
    .addColumnCategorical("FraudLabel", Arrays.asList("Fraud","Legit"))
    .build();
```

## Joining schemas

If you have two different datasets that you want to merge together, DataVec provides a `Join` class with different join strategies such as `Inner` or `RightOuter`.

```java
Schema customerInfoSchema = new Schema.Builder()
    .addColumnLong("customerID")
    .addColumnString("customerName")
    .addColumnCategorical("customerCountry", Arrays.asList("USA","France","Japan","UK"))
    .build();

Schema customerPurchasesSchema = new Schema.Builder()
    .addColumnLong("customerID")
    .addColumnTime("purchaseTimestamp", DateTimeZone.UTC)
    .addColumnLong("productID")
    .addColumnInteger("purchaseQty")
    .addColumnDouble("unitPriceUSD")
    .build();

Join join = new Join.Builder(Join.JoinType.Inner)
    .setJoinColumns("customerID")
    .setSchemas(customerInfoSchema, customerPurchasesSchema)
    .build();
```

Once you've defined your join and you've loaded the data into DataVec, you must use an `Executor` to complete the join.

## Classes and utilities

DataVec comes with a few `Schema` classes and helper utilities for 2D and sequence types of data.

### Join
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/join/Join.java) </span>

Join class: used to specify a join (like an SQL join)


##### setSchemas 
```java
public Builder setSchemas(Schema left, Schema right) 
```


Type of join<br>
Inner: Return examples where the join column values occur in both
LeftOuter: Return all examples from left data, whether there is a matching right value or not.
(If not: right values will have NullWritable instead)<br>
RightOuter: Return all examples from the right data, whether there is a matching left value or not.
(If not: left values will have NullWritable instead)<br>
FullOuter: return all examples from both left/right, whether there is a matching value from the other side or not.
(If not: other values will have NullWritable instead)

##### setKeyColumns 
```java
public Builder setKeyColumns(String... keyColumnNames) 
```


- deprecated Use {- link #setJoinColumns(String...)}

##### setKeyColumnsLeft 
```java
public Builder setKeyColumnsLeft(String... keyColumnNames) 
```


- deprecated Use {- link #setJoinColumnsLeft(String...)}

##### setKeyColumnsRight 
```java
public Builder setKeyColumnsRight(String... keyColumnNames) 
```


- deprecated Use {- link #setJoinColumnsRight(String...)}

##### setJoinColumnsLeft 
```java
public Builder setJoinColumnsLeft(String... joinColumnNames) 
```


Specify the names of the columns to join on, for the left data)
The idea: join examples where firstDataValues(joinColumNamesLeft[i]) == secondDataValues(joinColumnNamesRight[i]) for all i
- param joinColumnNames Names of the columns to join on (for left data)

##### setJoinColumnsRight 
```java
public Builder setJoinColumnsRight(String... joinColumnNames) 
```


Specify the names of the columns to join on, for the right data)
The idea: join examples where firstDataValues(joinColumNamesLeft[i]) == secondDataValues(joinColumnNamesRight[i]) for all i
- param joinColumnNames Names of the columns to join on (for left data)




### InferredSchema
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/schema/InferredSchema.java) </span>

If passed a CSV file that contains a header and a single row of sample data, it will return
a Schema.

Only Double, Integer, Long, and String types are supported. If no number type can be inferred,
the field type will become the default type. Note that if your column is actually categorical but
is represented as a number, you will need to do additional transformation. Also, if your sample
field is blank/null, it will also become the default type.




### Schema
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/schema/Schema.java) </span>

A Schema defines the layout of tabular data. Specifically, it contains names f
or each column, as well as details of types
(Integer, String, Long, Double, etc).<br>
Type information for each column may optionally include
restrictions on the allowable values for each column.<br>



##### sameTypes 
```java
public boolean sameTypes(Schema schema) 
```


Create a schema based on the
given metadata
- param columnMetaData the metadata to create the
schema from

##### newSchema 
```java
public Schema newSchema(List<ColumnMetaData> columnMetaData) 
```


Compute the difference in {- link ColumnMetaData}
between this schema and the passed in schema.
This is useful during the {- link org.datavec.api.transform.TransformProcess}
to identify what a process will do to a given {- link Schema}.

- param schema the schema to compute the difference for
- return the metadata that is different (in order)
between this schema and the other schema

##### numColumns 
```java
public int numColumns() 
```


Returns the number of columns or fields
for this schema
- return the number of columns or fields for this schema

##### getName 
```java
public String getName(int column) 
```


Returns the name of a
given column at the specified index
- param column the index of the column
to get the name for
- return the name of the column at the specified index

##### getType 
```java
public ColumnType getType(int column) 
```


Returns the {- link ColumnType}
for the column at the specified index
- param column the index of the column to get the type for
- return the type of the column to at the specified inde

##### getType 
```java
public ColumnType getType(String columnName) 
```


Returns the {- link ColumnType}
for the column at the specified index
- param columnName the index of the column to get the type for
- return the type of the column to at the specified inde

##### getMetaData 
```java
public ColumnMetaData getMetaData(int column) 
```


Returns the {- link ColumnMetaData}
at the specified column index
- param column the index
to get the metadata for
- return the metadata at ths specified index

##### getMetaData 
```java
public ColumnMetaData getMetaData(String column) 
```


Retrieve the metadata for the given
column name
- param column the name of the column to get metadata for
- return the metadata for the given column name

##### getIndexOfColumn 
```java
public int getIndexOfColumn(String columnName) 
```


Return a copy of the list column names
- return a copy of the list of column names
for this schema

##### hasColumn 
```java
public boolean hasColumn(String columnName) 
```


Return the indices of the columns, given their namess

- param columnNames Name of the columns to get indices for
- return Column indexes

##### toJson 
```java
public String toJson() 
```


Serialize this schema to json
- return a json representation of this schema

##### toYaml 
```java
public String toYaml() 
```


Serialize this schema to yaml
- return the yaml representation of this schema

##### fromJson 
```java
public static Schema fromJson(String json) 
```


Create a schema from a given json string
- param json the json to create the schema from
- return the created schema based on the json

##### fromYaml 
```java
public static Schema fromYaml(String yaml) 
```


Create a schema from the given
yaml string
- param yaml the yaml to create the schema from
- return the created schema based on the yaml

##### addColumnFloat 
```java
public Builder addColumnFloat(String name) 
```


Add a Float column with no restrictions on the allowable values, except for no NaN/infinite values allowed

- param name Name of the column

##### addColumnFloat 
```java
public Builder addColumnFloat(String name, Float minAllowedValue, Float maxAllowedValue) 
```


Add a Float column with the specified restrictions (and no NaN/Infinite values allowed)

- param name            Name of the column
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction
- return

##### addColumnFloat 
```java
public Builder addColumnFloat(String name, Float minAllowedValue, Float maxAllowedValue, boolean allowNaN,
                                       boolean allowInfinite) 
```


Add a Float column with the specified restrictions

- param name            Name of the column
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction
- param allowNaN        If false: don't allow NaN values. If true: allow.
- param allowInfinite   If false: don't allow infinite values. If true: allow

##### addColumnsFloat 
```java
public Builder addColumnsFloat(String... columnNames) 
```


Add multiple Float columns with no restrictions on the allowable values of the columns (other than no NaN/Infinite)

- param columnNames Names of the columns to add

##### addColumnsFloat 
```java
public Builder addColumnsFloat(String pattern, int minIdxInclusive, int maxIdxInclusive) 
```


A convenience method for adding multiple Float columns.
For example, to add columns "myFloatCol_0", "myFloatCol_1", "myFloatCol_2", use
{- code addColumnsFloat("myFloatCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)

##### addColumnsFloat 
```java
public Builder addColumnsFloat(String pattern, int minIdxInclusive, int maxIdxInclusive,
                                        Float minAllowedValue, Float maxAllowedValue, boolean allowNaN, boolean allowInfinite) 
```


A convenience method for adding multiple Float columns, with additional restrictions that apply to all columns
For example, to add columns "myFloatCol_0", "myFloatCol_1", "myFloatCol_2", use
{- code addColumnsFloat("myFloatCol_%d",0,2,null,null,false,false)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction
- param allowNaN        If false: don't allow NaN values. If true: allow.
- param allowInfinite   If false: don't allow infinite values. If true: allow

##### addColumnDouble 
```java
public Builder addColumnDouble(String name) 
```


Add a Double column with no restrictions on the allowable values, except for no NaN/infinite values allowed

- param name Name of the column

##### addColumnDouble 
```java
public Builder addColumnDouble(String name, Double minAllowedValue, Double maxAllowedValue) 
```


Add a Double column with the specified restrictions (and no NaN/Infinite values allowed)

- param name            Name of the column
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction
- return

##### addColumnDouble 
```java
public Builder addColumnDouble(String name, Double minAllowedValue, Double maxAllowedValue, boolean allowNaN,
                        boolean allowInfinite) 
```


Add a Double column with the specified restrictions

- param name            Name of the column
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction
- param allowNaN        If false: don't allow NaN values. If true: allow.
- param allowInfinite   If false: don't allow infinite values. If true: allow

##### addColumnsDouble 
```java
public Builder addColumnsDouble(String... columnNames) 
```


Add multiple Double columns with no restrictions on the allowable values of the columns (other than no NaN/Infinite)

- param columnNames Names of the columns to add

##### addColumnsDouble 
```java
public Builder addColumnsDouble(String pattern, int minIdxInclusive, int maxIdxInclusive) 
```


A convenience method for adding multiple Double columns.
For example, to add columns "myDoubleCol_0", "myDoubleCol_1", "myDoubleCol_2", use
{- code addColumnsDouble("myDoubleCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)

##### addColumnsDouble 
```java
public Builder addColumnsDouble(String pattern, int minIdxInclusive, int maxIdxInclusive,
                        Double minAllowedValue, Double maxAllowedValue, boolean allowNaN, boolean allowInfinite) 
```


A convenience method for adding multiple Double columns, with additional restrictions that apply to all columns
For example, to add columns "myDoubleCol_0", "myDoubleCol_1", "myDoubleCol_2", use
{- code addColumnsDouble("myDoubleCol_%d",0,2,null,null,false,false)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction
- param allowNaN        If false: don't allow NaN values. If true: allow.
- param allowInfinite   If false: don't allow infinite values. If true: allow

##### addColumnInteger 
```java
public Builder addColumnInteger(String name) 
```


Add an Integer column with no restrictions on the allowable values

- param name Name of the column

##### addColumnInteger 
```java
public Builder addColumnInteger(String name, Integer minAllowedValue, Integer maxAllowedValue) 
```


Add an Integer column with the specified min/max allowable values

- param name            Name of the column
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction

##### addColumnsInteger 
```java
public Builder addColumnsInteger(String... names) 
```


Add multiple Integer columns with no restrictions on the min/max allowable values

- param names Names of the integer columns to add

##### addColumnsInteger 
```java
public Builder addColumnsInteger(String pattern, int minIdxInclusive, int maxIdxInclusive) 
```


A convenience method for adding multiple Integer columns.
For example, to add columns "myIntegerCol_0", "myIntegerCol_1", "myIntegerCol_2", use
{- code addColumnsInteger("myIntegerCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)

##### addColumnsInteger 
```java
public Builder addColumnsInteger(String pattern, int minIdxInclusive, int maxIdxInclusive,
                        Integer minAllowedValue, Integer maxAllowedValue) 
```


A convenience method for adding multiple Integer columns.
For example, to add columns "myIntegerCol_0", "myIntegerCol_1", "myIntegerCol_2", use
{- code addColumnsInteger("myIntegerCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction

##### addColumnCategorical 
```java
public Builder addColumnCategorical(String name, String... stateNames) 
```


Add a Categorical column, with the specified state names

- param name       Name of the column
- param stateNames Names of the allowable states for this categorical column

##### addColumnCategorical 
```java
public Builder addColumnCategorical(String name, List<String> stateNames) 
```


Add a Categorical column, with the specified state names

- param name       Name of the column
- param stateNames Names of the allowable states for this categorical column

##### addColumnLong 
```java
public Builder addColumnLong(String name) 
```


Add a Long column, with no restrictions on the min/max values

- param name Name of the column

##### addColumnLong 
```java
public Builder addColumnLong(String name, Long minAllowedValue, Long maxAllowedValue) 
```


Add a Long column with the specified min/max allowable values

- param name            Name of the column
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction

##### addColumnsLong 
```java
public Builder addColumnsLong(String... names) 
```


Add multiple Long columns, with no restrictions on the allowable values

- param names Names of the Long columns to add

##### addColumnsLong 
```java
public Builder addColumnsLong(String pattern, int minIdxInclusive, int maxIdxInclusive) 
```


A convenience method for adding multiple Long columns.
For example, to add columns "myLongCol_0", "myLongCol_1", "myLongCol_2", use
{- code addColumnsLong("myLongCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)

##### addColumnsLong 
```java
public Builder addColumnsLong(String pattern, int minIdxInclusive, int maxIdxInclusive, Long minAllowedValue,
                        Long maxAllowedValue) 
```


A convenience method for adding multiple Long columns.
For example, to add columns "myLongCol_0", "myLongCol_1", "myLongCol_2", use
{- code addColumnsLong("myLongCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)
- param minAllowedValue Minimum allowed value (inclusive). If null: no restriction
- param maxAllowedValue Maximum allowed value (inclusive). If null: no restriction

##### addColumn 
```java
public Builder addColumn(ColumnMetaData metaData) 
```


Add a column

- param metaData metadata for this column

##### addColumnString 
```java
public Builder addColumnString(String name) 
```


Add a String column with no restrictions on the allowable values.

- param name Name of  the column

##### addColumnsString 
```java
public Builder addColumnsString(String... columnNames) 
```


Add multiple String columns with no restrictions on the allowable values

- param columnNames Names of the String columns to add

##### addColumnString 
```java
public Builder addColumnString(String name, String regex, Integer minAllowableLength,
                        Integer maxAllowableLength) 
```


Add a String column with the specified restrictions

- param name               Name of the column
- param regex              Regex that the String must match in order to be considered valid. If null: no regex restriction
- param minAllowableLength Minimum allowable length for the String to be considered valid
- param maxAllowableLength Maximum allowable length for the String to be considered valid

##### addColumnsString 
```java
public Builder addColumnsString(String pattern, int minIdxInclusive, int maxIdxInclusive) 
```


A convenience method for adding multiple numbered String columns.
For example, to add columns "myStringCol_0", "myStringCol_1", "myStringCol_2", use
{- code addColumnsString("myStringCol_%d",0,2)}

- param pattern         Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive Minimum column index to use (inclusive)
- param maxIdxInclusive Maximum column index to use (inclusive)

##### addColumnsString 
```java
public Builder addColumnsString(String pattern, int minIdxInclusive, int maxIdxInclusive, String regex,
                        Integer minAllowedLength, Integer maxAllowedLength) 
```


A convenience method for adding multiple numbered String columns.
For example, to add columns "myStringCol_0", "myStringCol_1", "myStringCol_2", use
{- code addColumnsString("myStringCol_%d",0,2)}

- param pattern          Pattern to use (via String.format). "%d" is replaced with column numbers
- param minIdxInclusive  Minimum column index to use (inclusive)
- param maxIdxInclusive  Maximum column index to use (inclusive)
- param regex            Regex that the String must match in order to be considered valid. If null: no regex restriction
- param minAllowedLength Minimum allowed length of strings (inclusive). If null: no restriction
- param maxAllowedLength Maximum allowed length of strings (inclusive). If null: no restriction

##### addColumnTime 
```java
public Builder addColumnTime(String columnName, TimeZone timeZone) 
```


Add a Time column with no restrictions on the min/max allowable times
<b>NOTE</b>: Time columns are represented by LONG (epoch millisecond) values. For time values in human-readable formats,
use String columns + StringToTimeTransform

- param columnName Name of the column
- param timeZone   Time zone of the time column

##### addColumnTime 
```java
public Builder addColumnTime(String columnName, DateTimeZone timeZone) 
```


Add a Time column with no restrictions on the min/max allowable times
<b>NOTE</b>: Time columns are represented by LONG (epoch millisecond) values. For time values in human-readable formats,
use String columns + StringToTimeTransform

- param columnName Name of the column
- param timeZone   Time zone of the time column

##### addColumnTime 
```java
public Builder addColumnTime(String columnName, DateTimeZone timeZone, Long minValidValue, Long maxValidValue) 
```


Add a Time column with the specified restrictions
<b>NOTE</b>: Time columns are represented by LONG (epoch millisecond) values. For time values in human-readable formats,
use String columns + StringToTimeTransform

- param columnName    Name of the column
- param timeZone      Time zone of the time column
- param minValidValue Minumum allowable time (in milliseconds). May be null.
- param maxValidValue Maximum allowable time (in milliseconds). May be null.

##### addColumnNDArray 
```java
public Builder addColumnNDArray(String columnName, long[] shape) 
```


Add a NDArray column

- param columnName Name of the column
- param shape      shape of the NDArray column. Use -1 in entries to specify as "variable length" in that dimension

##### build 
```java
public Schema build() 
```


Create the Schema

##### inferMultiple 
```java
public static Schema inferMultiple(List<List<Writable>> record) 
```


Infers a schema based on the record.
The column names are based on indexing.
- param record the record to infer from
- return the infered schema

##### infer 
```java
public static Schema infer(List<Writable> record) 
```


Infers a schema based on the record.
The column names are based on indexing.
- param record the record to infer from
- return the infered schema




### SequenceSchema
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/schema/SequenceSchema.java) </span>



##### inferSequenceMulti 
```java
public static SequenceSchema inferSequenceMulti(List<List<List<Writable>>> record) 
```


Infers a sequence schema based
on the record
- param record the record to infer the schema based on
- return the inferred sequence schema


##### inferSequence 
```java
public static SequenceSchema inferSequence(List<List<Writable>> record) 
```


Infers a sequence schema based
on the record
- param record the record to infer the schema based on
- return the inferred sequence schema


