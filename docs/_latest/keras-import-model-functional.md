---
title: Keras Import Functional Model
short_title: Functional Model
description: Importing the functional model.
category: Keras Import
weight: 2
---

## Getting started with importing Keras functional Models

Let's say you start with defining a simple MLP using Keras' functional API:

```python
from keras.models import Model
from keras.layers import Dense, Input

inputs = Input(shape=(100,))
x = Dense(64, activation='relu')(inputs)
predictions = Dense(10, activation='softmax')(x)
model = Model(inputs=inputs, outputs=predictions)
model.compile(loss='categorical_crossentropy',optimizer='sgd', metrics=['accuracy'])
```

In Keras there are several ways to save a model. You can store the whole model 
(model definition, weights and training configuration) as HDF5 file, just the
model configuration (as JSON or YAML file) or just the weights (as HDF5 file). 
Here's how you do each:

```python
model.save('full_model.h5')  # save everything in HDF5 format

model_json = model.to_json()  # save just the config. replace with "to_yaml" for YAML serialization
with open("model_config.json", "w") as f:
    f.write(model_json)

model.save_weights('model_weights.h5') # save just the weights.
```

If you decide to save the full model, you will have access to the training configuration of
the model, otherwise you don't. So if you want to further train your model in DL4J after import,
keep that in mind and use `model.save(...)` to persist your model.

## Loading your Keras model

Let's start with the recommended way, loading the full model back into DL4J (we assume it's
on your class path):

```java
String fullModel = new ClassPathResource("full_model.h5").getFile().getPath();
ComputationGraph model = KerasModelImport.importKerasModelAndWeights(fullModel);

```

In case you didn't compile your Keras model, it will not come with a training configuration.
In that case you need to explicitly tell model import to ignore training configuration by 
setting the `enforceTrainingConfig` flag to false like this:

```java
ComputationGraph model = KerasModelImport.importKerasModelAndWeights(fullModel, false);

```

To load just the model configuration from JSON, you use `KerasModelImport` as follows:

```java
String modelJson = new ClassPathResource("model_config.json").getFile().getPath();
ComputationGraphConfiguration modelConfig = KerasModelImport.importKerasModelConfiguration(modelJson)
```

If additionally you also want to load the model weights with the configuration, here's what you do:

```java
String modelWeights = new ClassPathResource("model_weights.h5").getFile().getPath();
MultiLayerNetwork network = KerasModelImport.importKerasModelAndWeights(modelJson, modelWeights)
```

In the latter two cases no training configuration will be read.


---

### KerasModel
<span style="float:right;"> [[source]](https://github.com/eclipse/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-modelimport/src/main/java/org/deeplearning4j/nn/modelimport/keras//KerasModel.java) </span>

Build ComputationGraph from Keras (Functional API) Model or
Sequential model configuration.


##### KerasModel 
```java
public KerasModel(KerasModelBuilder modelBuilder)
            throws UnsupportedKerasConfigurationException, IOException, InvalidKerasConfigurationException 
```


(Recommended) Builder-pattern constructor for (Functional API) Model.

- param modelBuilder builder object
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config


##### getComputationGraphConfiguration 
```java
public ComputationGraphConfiguration getComputationGraphConfiguration()
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


(Not recommended) Constructor for (Functional API) Model from model configuration
(JSON or YAML), training configuration (JSON), weights, and "training mode"
boolean indicator. When built in training mode, certain unsupported configurations
(e.g., unknown regularizers) will throw Exceptions. When enforceTrainingConfig=false, these
will generate warnings but will be otherwise ignored.

- param modelJson             model configuration JSON string
- param modelYaml             model configuration YAML string
- param enforceTrainingConfig whether to enforce training-related configurations
- throws IOException                            IO exception
- throws InvalidKerasConfigurationException     Invalid Keras config
- throws UnsupportedKerasConfigurationException Unsupported Keras config

##### getComputationGraph 
```java
public ComputationGraph getComputationGraph()
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Build a ComputationGraph from this Keras Model configuration and import weights.

- return ComputationGraph

##### getComputationGraph 
```java
public ComputationGraph getComputationGraph(boolean importWeights)
            throws InvalidKerasConfigurationException, UnsupportedKerasConfigurationException 
```


Build a ComputationGraph from this Keras Model configuration and (optionally) import weights.

- param importWeights whether to import weights
- return ComputationGraph


