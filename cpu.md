---
title: CPU and AVX
short_title: CPU
description: CPU and AVX support in ND4J/Deeplearning4j
layout: default
redirect_from: "/cpu"
---


### What is AVX, and why does it matter?

AVX (Advanced Vector Extensions) is a set of CPU instructions for accelerating numerical computations.
AVX only applies to nd4j-native (CPU) backend for x86 devices, not GPUs and not ARM/PPC devices.

Why AVX matters: performance.

You want to use the highest level of AVX supported by your system.

AVX support - summary:
* Most modern x86 CPUs: AVX2 is supported
* Some high-end server CPUs: AVX512 may be supported 
* Old CPUs (pre 2012) and low power x86 (Atom, Celeron): No AVX support (usually) 

AVX is backward compatible, so it's possible run a generic x86 or AVX2 binary on a system supporting AVX512.

Note on current snapshots (and in future releases, after 1.0.0-beta5) you may get a warning as follows, if AVX is not configured optimally:
```
o.n.l.c.n.CpuNDArrayFactory - *********************************** CPU Feature Check Warning ***********************************
o.n.l.c.n.CpuNDArrayFactory - Warning: Initializing ND4J with Generic x86 binary on a CPU with AVX/AVX2 support
o.n.l.c.n.CpuNDArrayFactory - Using ND4J with AVX/AVX2 will improve performance. See deeplearning4j.org/cpu for more details
o.n.l.c.n.CpuNDArrayFactory - Or set environment variable ND4J_IGNORE_AVX=true to suppress this warning
o.n.l.c.n.CpuNDArrayFactory - ************************************************************************************************
```


### Configuring AVX in ND4J/DL4J

Defaults:
* 1.0.0-beta5 and earlier: "generic x86" (no AVX) is the default for nd4j/nd4j-platform dependencies
* Current snapshots and later versions of ND4J: AVX2 is the default


To configure AVX2 and AVX512, you need to specify a classifier for the appropriate architecture.

The following binaries are provided for x86 architectures:
* Generic x86 (no AVX): `linux-x86_64`, `windows-x86_64`, `macosx-x86_64` 
* AVX2: `linux-x86_64-avx2`, `windows-x86_64-avx2`, `macosx-x86_64-avx2`
* AVX512: `linux-x86_64-avx512`


Example: AVX2 on Windows (Maven pom.xml)
```
<dependency>
    <groupId>org.nd4j</groupId>
    <artifactId>nd4j-native</artifactId>
    <version>${nd4j.version}</version>
</dependency>

<dependency>
    <groupId>org.nd4j</groupId>
    <artifactId>nd4j-native</artifactId>
    <version>${nd4j.version}</version>
    <classifier>windows-x86_64-avx2</classifier>
</dependency>
```


Example: AVX512 on Linux (Maven pom.xml)
```
<dependency>
    <groupId>org.nd4j</groupId>
    <artifactId>nd4j-native</artifactId>
    <version>${nd4j.version}</version>
</dependency>

<dependency>
    <groupId>org.nd4j</groupId>
    <artifactId>nd4j-native</artifactId>
    <version>${nd4j.version}</version>
    <classifier>linux-x86_64-avx512</classifier>
</dependency>
```

Note that you need *both* dependencies - with and without the classifier.