---
title: Keras Import API
short_title: Import
description: Importing API.
category: Keras Import
weight: 1
---

## Keras model import API


---

### KerasModelImport
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras//KerasModelImport.java) </span>

Reads stored Keras configurations and weights from one of two archives:
either as

- a single HDF5 file storing model and training JSON configurations and weights
- separate text file storing model JSON configuration and HDF5 file storing weights.


##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights( InputStream modelHdf5Stream, boolean enforceTrainingConfig)
            throws IOException, UnsupportedKerasConfigurationException, InvalidKerasConfigurationException
```


Load Keras (Functional API) Model saved using model.save_model(...).

- param modelHdf5Stream       InputStream containing HDF5 archive storing Keras Model
- param enforceTrainingConfig whether to enforce training configuration options
- return ComputationGraph
- see ComputationGraph

##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights(InputStream modelHdf5Stream) throws IOException, UnsupportedKerasConfigurationException, InvalidKerasConfigurationException 
```


Load Keras (Functional API) Model saved using model.save_model(...).

- param modelHdf5Stream InputStream containing HDF5 archive storing Keras Model
- return ComputationGraph
- see ComputationGraph

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(InputStream modelHdf5Stream,
                                                                         boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model saved using model.save_model(...).

- param modelHdf5Stream       InputStream containing HDF5 archive storing Keras Sequential model
- param enforceTrainingConfig whether to enforce training configuration options
- return ComputationGraph
- see ComputationGraph

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(InputStream modelHdf5Stream)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model saved using model.save_model(...).

- param modelHdf5Stream InputStream containing HDF5 archive storing Keras Sequential model
- return ComputationGraph
- see ComputationGraph

##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights(String modelHdf5Filename, int[] inputShape,
                                                              boolean enforceTrainingConfig)
            throws IOException, UnsupportedKerasConfigurationException, InvalidKerasConfigurationException 
```


Load Keras (Functional API) Model saved using model.save_model(...).

- param modelHdf5Filename     path to HDF5 archive storing Keras Model
- param inputShape            optional input shape for models that come without such (e.g. notop = false models)
- param enforceTrainingConfig whether to enforce training configuration options
- return ComputationGraph
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config
- see ComputationGraph

##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights(String modelHdf5Filename, boolean enforceTrainingConfig)
            throws IOException, UnsupportedKerasConfigurationException, InvalidKerasConfigurationException 
```


Load Keras (Functional API) Model saved using model.save_model(...).

- param modelHdf5Filename     path to HDF5 archive storing Keras Model
- param enforceTrainingConfig whether to enforce training configuration options
- return ComputationGraph
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config
- see ComputationGraph

##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights(String modelHdf5Filename)
            throws IOException, UnsupportedKerasConfigurationException, InvalidKerasConfigurationException 
```


Load Keras (Functional API) Model saved using model.save_model(...).

- param modelHdf5Filename path to HDF5 archive storing Keras Model
- return ComputationGraph
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config
- see ComputationGraph

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(String modelHdf5Filename,
                                                                         int[] inputShape,
                                                                         boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model saved using model.save_model(...).

- param modelHdf5Filename     path to HDF5 archive storing Keras Sequential model
- param inputShape            optional input shape for models that come without such (e.g. notop = false models)
- param enforceTrainingConfig whether to enforce training configuration options
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(String modelHdf5Filename,
                                                                         boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model saved using model.save_model(...).

- param modelHdf5Filename     path to HDF5 archive storing Keras Sequential model
- param enforceTrainingConfig whether to enforce training configuration options
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(String modelHdf5Filename)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model saved using model.save_model(...).

- param modelHdf5Filename path to HDF5 archive storing Keras Sequential model
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights(String modelJsonFilename, String weightsHdf5Filename,
                                                              boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras (Functional API) Model for which the configuration and weights were
saved separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename     path to JSON file storing Keras Model configuration
- param weightsHdf5Filename   path to HDF5 archive storing Keras model weights
- param enforceTrainingConfig whether to enforce training configuration options
- return ComputationGraph
- throws IOException IO exception
- see ComputationGraph

##### importKerasModelAndWeights 
```java
public static ComputationGraph importKerasModelAndWeights(String modelJsonFilename, String weightsHdf5Filename)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras (Functional API) Model for which the configuration and weights were
saved separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename   path to JSON file storing Keras Model configuration
- param weightsHdf5Filename path to HDF5 archive storing Keras model weights
- return ComputationGraph
- throws IOException IO exception
- see ComputationGraph

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(String modelJsonFilename,
                                                                         String weightsHdf5Filename,
                                                                         boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model for which the configuration and weights were
saved separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename     path to JSON file storing Keras Sequential model configuration
- param weightsHdf5Filename   path to HDF5 archive storing Keras model weights
- param enforceTrainingConfig whether to enforce training configuration options
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

##### importKerasSequentialModelAndWeights 
```java
public static MultiLayerNetwork importKerasSequentialModelAndWeights(String modelJsonFilename,
                                                                         String weightsHdf5Filename)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model for which the configuration and weights were
saved separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename   path to JSON file storing Keras Sequential model configuration
- param weightsHdf5Filename path to HDF5 archive storing Keras model weights
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

##### importKerasModelConfiguration 
```java
public static ComputationGraphConfiguration importKerasModelConfiguration(String modelJsonFilename,
                                                                              boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras (Functional API) Model for which the configuration was saved
separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename     path to JSON file storing Keras Model configuration
- param enforceTrainingConfig whether to enforce training configuration options
- return ComputationGraph
- throws IOException IO exception
- see ComputationGraph

##### importKerasModelConfiguration 
```java
public static ComputationGraphConfiguration importKerasModelConfiguration(String modelJsonFilename)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras (Functional API) Model for which the configuration was saved
separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename path to JSON file storing Keras Model configuration
- return ComputationGraph
- throws IOException IO exception
- see ComputationGraph

##### importKerasSequentialConfiguration 
```java
public static MultiLayerConfiguration importKerasSequentialConfiguration(String modelJsonFilename,
                                                                             boolean enforceTrainingConfig)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model for which the configuration was saved
separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename     path to JSON file storing Keras Sequential model configuration
- param enforceTrainingConfig whether to enforce training configuration options
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

##### importKerasSequentialConfiguration 
```java
public static MultiLayerConfiguration importKerasSequentialConfiguration(String modelJsonFilename)
            throws IOException, InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Load Keras Sequential model for which the configuration was saved
separately using calls to model.to_json() and model.save_weights(...).

- param modelJsonFilename path to JSON file storing Keras Sequential model configuration
- return MultiLayerNetwork
- throws IOException IO exception
- see MultiLayerNetwork

