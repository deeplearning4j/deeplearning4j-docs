---
title: Hardware and CPU/GPU Setup
short_title: GPU/CPU Setup
description: Hardware setup for Deeplearning4j, including GPUs and CUDA.
category: Get Started
weight: 10
---

## ND4J Cuda Backends for GPUs

You can choose GPUs or native CPUs for your backend linear algebra operations by changing the dependencies in ND4J's POM.xml file. Your selection will affect both ND4J and [Deeplearning4j](http://deeplearning4j.org). Check our [dependencies page](dependencies.html) for instructions on configuring your POM.xml file.

If you have CUDA v9.2+ installed, then you need to define the _artifactId_ like this:
```xml
<dependency>
 <groupId>org.nd4j</groupId>
 <artifactId>nd4j-cuda-9.2</artifactId>
 <version>${nd4j.version}</version>
</dependency>
```

You can replace the `<artifactId> ... </artifactId>`, depending on your preference:

```
nd4j-cuda-$CUDA_VERSION (where CUDA_VERSION is a valid CUDA version supported by Deeplearning4j)
```

That's it.

If you have several GPUs, but your system is forcing you to use just one, you can use the helper `CudaEnvironment.getInstance().getConfiguration().allowMultiGPU(true);` as first line of your `main()` method.


## Setup CUDA

Check the NVIDIA guides for instructions on setting up CUDA on the NVIDIA [CUDA website](http://docs.nvidia.com/cuda/).