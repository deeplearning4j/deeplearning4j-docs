---
title: DataVec Serialization
short_title: Serialization
description: Data wrangling and mapping from one schema to another.
category: DataVec
weight: 1
---

## Serializing transforms

DataVec comes with the ability to serialize transforms, which allows them to be more portable when they're needed for production environments. A `TransformProcess` is serialzied to a human-readable format such as JSON and can be saved as a file.

## Serialization

The code below shows how you can serialize the transform process `tp`.

```java
String serializedTransformString = tp.toJson()
```

## Deserialization

When you want to reinstantiate the transform process, call the static `from<format>` method.

```java
TransformProcess tp = TransformProcess.fromJson(serializedTransformString)
```


## Available serializers


---

### JsonSerializer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/serde/JsonSerializer.java) </span>

Serializer used for converting objects (Transforms, Conditions, etc) to JSON format





---

### YamlSerializer
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/datavec/datavec-api/src/main/java/org/datavec/api/transform/serde/YamlSerializer.java) </span>

Serializer used for converting objects (Transforms, Conditions, etc) to YAML format

