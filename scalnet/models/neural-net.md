---
title: neural-net
layout: default
---
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/scalnet/src/main/scala/org/deeplearning4j/scalnet//models/NeuralNet.scala) </span>
Simple DL4J-style sequential neural net architecture with one input
node and one output node for each node in computational graph.

Wraps DL4J MultiLayerNetwork. Enforces DL4J model construction
pattern: adds pre-processing layers automatically but requires
user to specify output layer explicitly.


