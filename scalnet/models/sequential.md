---
title: sequential
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/scalnet/src/main/scala/org/deeplearning4j/scalnet//models/Sequential.scala) </span>
Class for keras-style simple sequential neural net architectures
with one input node and one output node for each node
in computational graph.

Wraps DL4J MultiLayerNetwork. Enforces keras model construction
pattern: preprocessing (reshaping) layers should be explicitly
provided by the user, while last layer is treated implicitly as
an output layer.

