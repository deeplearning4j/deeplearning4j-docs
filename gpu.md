---
title: Deeplearning4j With GPUs
layout: default
---

# Deeplearning4j With GPUs

Deeplearning4j works on distributed GPUs, as well as on native. We allow users to run locally on a single GPU such as the NVIDIA Tesla, Titan or GeForce GTX, and in the cloud on NVIDIA GRID GPUs. 

In order to train a neural network on GPUs, you need to make a single change to the POM.xml file in your root directory. In the [Quickstart](./quickstart), you'll find a POM file configured to run on CPUs by default. It looks like this:

            <name>DeepLearning4j Examples Parent</name>
            <description>Examples of training different data sets</description>
            <properties>
                <nd4j.backend>nd4j-native-platform</nd4j.backend>

Just change the last line above to this:

        <nd4j.backend>nd4j-cuda-8.0-platform</<nd4j.backend>

ND4J is the numerical computing engine that powers Deeplearning4j. It has what we call "backends", or different types of hardware that it works on. In the [Deeplearning4j Gitter channel](https://gitter.im/deeplearning4j/deeplearning4j), you'll hear people talk about backends, and they're just referring to the packages that point to one chip or another. The backends are where we've done the work of optimizing on the hardware.

<p align="center">
<a href="https://docs.skymind.ai/docs/welcome" type="button" class="btn btn-lg btn-success"
        data-ga-event="click"
        data-ga-category="Click/Button"
        data-ga-action="GoTo/SKILDocs"
        data-ga-label="GPUPage">GET STARTED WITH DEEP LEARNING</a>
</p>

## Troubleshooting

If you have several GPUs, but your system is forcing you to use just one, there's a solution. Just add `CudaEnvironment.getInstance().getConfiguration().allowMultiGPU(true);` as first line of your `main()` method.

<p align="center">
<a href="./quickstart" class="btn btn-custom"
        data-ga-event="click"
        data-ga-category="Click/Button"
        data-ga-action="GoTo/GetStarted"
        data-ga-label="GPUPage">Get Started With Deeplearning4j on GPUs</a>
</p>


## Multi-GPU data parallelism

If your system has multiple GPUs installed, you can train your model in data-parallel mode. We have simple wrapper available for that. Consider using something like this:

        ParallelWrapper wrapper = new ParallelWrapper.Builder(YourExistingModel)
            .prefetchBuffer(24)
            .workers(4)
            .averagingFrequency(1)
            .reportScoreAfterAveraging(true)
            .useLegacyAveraging(false)
            .build();

ParallelWrapper takes your existing model as primary argument, and does training in parallel. In the case of GPUs, it’s worth keeping the number of workers equal to or higher than number of GPUs. Exact values are subject to tuning, since they depend on your task as well as the hardware available.

Within `ParallelWrapper`, your initial model will be duplicated, and each worker will be training its own model. After every *X* iterations, defined by `averagingFrequency(X)`, all models will be averaged, and training will continue after that. 

It's worth noting that for data-parallel training, a higher learning rate is recommended. Something around +20% should be a good starting value.

## Early Stopping w/ Parallel Wrapper

A special early stopping class, `EarlyStoppingParallelTrainer` provides similar functionality as early stopping with single GPU devices. Read more about [early stopping here](./earlystopping).

## HALF Datatype

If your app can afford using half-precision math (typically neural nets can afford this), you can enable this as data type for your app, and you'll see following benefits:

* 2x less GPU ram used
* up to 200% performance gains on memory-intensive operations, though the actual performance boost depends on the task and hardware used.

        DataTypeUtil.setDTypeForContext(DataBuffer.Type.HALF);

Place this call as the first line of your app, so that all subsequent allocations/calculations will be done using the HALF data type.

However you should be aware: HALF data type offers way smaller precision then FLOAT or DOUBLE, thus neural net tuning might become way harder.

On top of that, at this moment we don't offer full LAPACK support for HALF data type.

## Larger Grids

For most GPUs, default values are fine, but if you’re using high-end hardware and your data is massive enough, it might be worth trying bigger grid/block limits. Something like this might be used:

    CudaEnvironment.getInstance().getConfiguration()
          .setMaximumGridSize(512)
          .setMaximumBlockSize(512);

This won’t force all, even minor operations, to use specified grid dimensions, but it’ll create theoretical limits for them. 

## Allow for a Larger Cache

Since ND4J is based on Java, the cache size is very important for CUDA backend, and it’s able to dramatically increase or decrease performance. If you have plenty of RAM, just allow for larger caches.

Something like this might be used:

        CudaEnvironment.getInstance().getConfiguration()
        .setMaximumDeviceCacheableLength(1024 * 1024 * 1024L)
        .setMaximumDeviceCache(6L * 1024 * 1024 * 1024L)
        .setMaximumHostCacheableLength(1024 * 1024 * 1024L)
        .setMaximumHostCache(6L * 1024 * 1024 * 1024L);

This code will allow to cache up to 6GB of GPU RAM (it doesn’t mean that it WILL allocate that much though), and each individually cached memory chunk for both host and GPU memory might be up to 1GB in size. 

Since the cache in ND4J works employs a «reuse» paradigm, those high values don’t mean anything bad. Only memory chunks that were allocated for your app might be cached for future reuse.

## Setting Environment Variables BACKEND_PRIORITY_CPU and BACKEND_PRIORITY_GPU

If set the Environment Variables BACKEND_PRIORITY_CPU BACKEND_PRIORITY_GPU can determine wether GPU or CPU backend is used. To use set BACKEND_PRIORITY_CPU and BACKEND_PRIORITY_GPU to integers. The highest value determines what backend is used. 


## How Does It Work After All?

The CUDA backend has few design differences if compared to native backend, because of differences between GPUs and x86. 

Here are the highlights:

- The CUDA backend heavily relies on various memory caches.
    * Each memory chunk is allocated once, and after released from JVM context, we put it to the cache for further reuse.
    * ShapeInfo & TAD cache are using GPU device constant memory for faster access from kernel context.
- Kernels are "atomic": one Op = one pre-compiled kernel (in most of cases)  
- CUDA backend handles parallelism configuration before actual kernel launch
- In some cases, we're able to apply 2 operations in one Op call. This execution mode called mGRID, and benefits PairwiseTransform operations followed by other Ops.
- Like nd4j-native backend, CUDA backend adopts two parallelism models:
    * Element-level parallelism: all threads in grid are working with the same linear buffer.
    * TAD-level parallelism: grid is split into blocks, each block of threads is working with one of TADs.
- Device memory release process is handled with WeakReferences (followed by cache mechanics mentioned above)
- Multi-GPU environments are handled via Thread <-> Device affinity management. One Java thread is attached to one GPU at any given moment.


### Further Reading

* [Deeplearning4j on Spark (with GPUs)](./spark)
* [Optimizing Deeplearning4j on Native With OpenMP and SIMD instructions](./native)
