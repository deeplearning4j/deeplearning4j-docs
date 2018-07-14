---
title: Configuration for Gradle
short_title: Gradle
description: Configure the Gradle build tool for Deeplearning4j.
category: Configuration
weight: 3
---

## Configuring the Gradle build tool

While we encourage Deeplearning4j, ND4J and DataVec users to employ Maven, it's worthwhile documenting how to configure build files for other tools, like Ivy, Gradle and SBT -- particularly since Google prefers Gradle over Maven for Android projects. 

The instructions below apply to all DL4J and ND4J submodules, such as deeplearning4j-api, deeplearning4j-scaleout, and ND4J backends.

## Gradle

You can use Deeplearning4j with Gradle by adding the following to your build.gradle in the dependencies block:

    compile "org.deeplearning4j:deeplearning4j-core:{{ page.version }}"

## Add a backend

DL4J relies on ND4J for hardware-specific implementations and tensor operations. Add a backend by adding the following to your `pom.xml`:

    compile "org.nd4j:nd4j-native-platform:{{ page.version }}"

You can also swap the standard CPU implementation for [GPUs](./gpu-cpu-setup).