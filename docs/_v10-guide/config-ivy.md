---
title: Configuration for Ivy
short_title: Ivy
description: Configure the Ivy build tool for Deeplearning4j.
category: Configuration
weight: 3
---

## Configuring the Ivy build tool

While we encourage Deeplearning4j, ND4J and DataVec users to employ Maven, it's worthwhile documenting how to configure build files for other tools, like Ivy, Gradle and SBT -- particularly since Google prefers Gradle over Maven for Android projects. 

The instructions below apply to all DL4J and ND4J submodules, such as deeplearning4j-api, deeplearning4j-scaleout, and ND4J backends.

## Ivy

You can use Deeplearning4j with ivy by adding the following to your ivy.xml:

    <dependency org="org.deeplearning4j" name="deeplearning4j-core" rev="{{ page.version }}" conf="build" />

## Add a backend

DL4J relies on ND4J for hardware-specific implementations and tensor operations. Add a backend by adding the following to your `pom.xml`:

    <dependency org="org.nd4j" name="nd4j-native-platform" rev="{{ page.version }}" conf="build" />

You can also swap the standard CPU implementation for [GPUs](./gpu-cpu-setup).