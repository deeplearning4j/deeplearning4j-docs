---
title: Deeplearning4j Zoo Models
short_title: Zoo Models
description: Prebuilt model architectures and weights for out-of-the-box application.
category: Models
weight: 3
---

## Available models

### AlexNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/AlexNet.java) </span>

AlexNet

Dl4j's AlexNet model interpretation based on the original paper ImageNet Classification with Deep Convolutional Neural Networks
and the imagenetExample code referenced.

References:
http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf
https://github.com/BVLC/caffe/blob/master/models/bvlc_alexnet/train_val.prototxt

Model is built in dl4j based on available functionality and notes indicate where there are gaps waiting for enhancements.

Bias initialization in the paper is 1 in certain layers but 0.1 in the imagenetExample code
Weight distribution uses 0.1 std for all layers in the paper but 0.005 in the dense layers in the imagenetExample code




### Darknet19
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/Darknet19.java) </span>

Darknet19
Reference: https://arxiv.org/pdf/1612.08242.pdf

ImageNet weights for this model are available and have been converted from https://pjreddie.com/darknet/imagenet
using https://github.com/allanzelener/YAD2K .

There are 2 pretrained models, one for 224x224 images and one fine-tuned for 448x448 images.
Call setInputShape() with either {3, 224, 224} or {3, 448, 448} before initialization.
The channels of the input images need to be in RGB order (not BGR), with values normalized within [0, 1].
The output labels are as per https://github.com/pjreddie/darknet/blob/master/data/imagenet.shortnames.list .




### FaceNetNN4Small2
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/FaceNetNN4Small2.java) </span>

A variant of the original FaceNet model that relies on embeddings and triplet loss.
Reference: https://arxiv.org/abs/1503.03832
Also based on the OpenFace implementation: http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf




### InceptionResNetV1
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/InceptionResNetV1.java) </span>

A variant of the original FaceNet model that relies on embeddings and triplet loss.
Reference: https://arxiv.org/abs/1503.03832
Also based on the OpenFace implementation: http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf




### LeNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/LeNet.java) </span>

LeNet was an early promising achiever on the ImageNet dataset.
References:
- http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf
- https://github.com/BVLC/caffe/blob/master/examples/mnist/lenet.prototxt

MNIST weights for this model are available and have been converted from https://github.com/f00-/mnist-lenet-keras.




### NASNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/NASNet.java) </span>

U-Net

Implementation of NASNet-A in Deeplearning4j. NASNet refers to Neural Architecture Search Network, a family of models
that were designed automatically by learning the model architectures directly on the dataset of interest.

This implementation uses 1056 penultimate filters and an input shape of (3, 224, 224). You can change this.

Paper: https://arxiv.org/abs/1707.07012
ImageNet weights for this model are available and have been converted from https://keras.io/applications/.





### ResNet50
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/ResNet50.java) </span>

Residual networks for deep learning.

Paperp: https://arxiv.org/abs/1512.03385
ImageNet weights for this model are available and have been converted from https://keras.io/applications/.




### SimpleCNN
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/SimpleCNN.java) </span>

A simple convolutional network for generic image classification.
Reference: https://github.com/oarriaga/face_classification




### SqueezeNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/SqueezeNet.java) </span>

U-Net

An implementation of SqueezeNet. Touts similar accuracy to AlexNet with a fraction of the parameters.

Paper: https://arxiv.org/abs/1602.07360
ImageNet weights for this model are available and have been converted from https://github.com/rcmalli/keras-squeezenet/.





### TextGenerationLSTM
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/TextGenerationLSTM.java) </span>

LSTM designed for text generation. Can be trained on a corpus of text. For this model, numClasses is

Architecture follows this implementation: https://github.com/fchollet/keras/blob/master/examples/lstm_text_generation.py

Walt Whitman weights are available for generating text from his works, adapted from https://github.com/craigomac/InfiniteMonkeys.




### TinyYOLO
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/TinyYOLO.java) </span>

Tiny YOLO
Reference: https://arxiv.org/pdf/1612.08242.pdf

ImageNet+VOC weights for this model are available and have been converted from https://pjreddie.com/darknet/yolo
using https://github.com/allanzelener/YAD2K and the following code.

String filename = "tiny-yolo-voc.h5";
ComputationGraph graph = KerasModelImport.importKerasModelAndWeights(filename, false);
INDArray priors = Nd4j.create(priorBoxes);

FineTuneConfiguration fineTuneConf = new FineTuneConfiguration.Builder()
.seed(seed)
.iterations(iterations)
.optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
.gradientNormalization(GradientNormalization.RenormalizeL2PerLayer)
.gradientNormalizationThreshold(1.0)
.updater(new Adam.Builder().learningRate(1e-3).build())
.l2(0.00001)
.activation(Activation.IDENTITY)
.trainingWorkspaceMode(workspaceMode)
.inferenceWorkspaceMode(workspaceMode)
.build();

ComputationGraph model = new TransferLearning.GraphBuilder(graph)
.fineTuneConfiguration(fineTuneConf)
.addLayer("outputs",
new Yolo2OutputLayer.Builder()
.boundingBoxPriors(priors)
.build(),
"conv2d_9")
.setOutputs("outputs")
.build();

System.out.println(model.summary(InputType.convolutional(416, 416, 3)));

ModelSerializer.writeModel(model, "tiny-yolo-voc_dl4j_inference.v1.zip", false);
}</pre>

The channels of the 416x416 input images need to be in RGB order (not BGR), with values normalized within [0, 1].




### UNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/UNet.java) </span>

U-Net

An implementation of U-Net, a deep learning network for image segmentation in Deeplearning4j. The u-net is convolutional network architecture for fast and precise segmentation of images. Up to now it has outperformed the prior best method (a sliding-window convolutional network) on the ISBI challenge for segmentation of neuronal structures in electron microscopic stacks.

Paper: https://arxiv.org/abs/1505.04597
Weights are available for image segmentation trained on a synthetic dataset





### VGG16
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/VGG16.java) </span>

VGG-16, from Very Deep Convolutional Networks for Large-Scale Image Recognition
https://arxiv.org/abs/1409.1556

Deep Face Recognition
http://www.robots.ox.ac.uk/~vgg/publications/2015/Parkhi15/parkhi15.pdf

ImageNet weights for this model are available and have been converted from https://github.com/fchollet/keras/tree/1.1.2/keras/applications.
CIFAR-10 weights for this model are available and have been converted using "approach 2" from https://github.com/rajatvikramsingh/cifar10-vgg16.
VGGFace weights for this model are available and have been converted from https://github.com/rcmalli/keras-vggface.




### VGG19
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/VGG19.java) </span>

VGG-19, from Very Deep Convolutional Networks for Large-Scale Image Recognition
https://arxiv.org/abs/1409.1556)

ImageNet weights for this model are available and have been converted from https://github.com/fchollet/keras/tree/1.1.2/keras/applications.




### Xception
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/Xception.java) </span>

U-Net

An implementation of Xception in Deeplearning4j. A novel deep convolutional neural network architecture inspired by Inception, where Inception modules have been replaced with depthwise separable convolutions.

Paper: https://arxiv.org/abs/1610.02357
ImageNet weights for this model are available and have been converted from https://keras.io/applications/.





### YOLO2
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/YOLO2.java) </span>

YOLOv2
Reference: https://arxiv.org/pdf/1612.08242.pdf

ImageNet+COCO weights for this model are available and have been converted from https://pjreddie.com/darknet/yolo
using https://github.com/allanzelener/YAD2K and the following code.

String filename = "yolo.h5";
KerasLayer.registerCustomLayer("Lambda", KerasSpaceToDepth.class);
ComputationGraph graph = KerasModelImport.importKerasModelAndWeights(filename, false);
INDArray priors = Nd4j.create(priorBoxes);

FineTuneConfiguration fineTuneConf = new FineTuneConfiguration.Builder()
.seed(seed)
.optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
.gradientNormalization(GradientNormalization.RenormalizeL2PerLayer)
.gradientNormalizationThreshold(1.0)
.updater(new Adam.Builder().learningRate(1e-3).build())
.l2(0.00001)
.activation(Activation.IDENTITY)
.trainingWorkspaceMode(workspaceMode)
.inferenceWorkspaceMode(workspaceMode)
.build();

ComputationGraph model = new TransferLearning.GraphBuilder(graph)
.fineTuneConfiguration(fineTuneConf)
.addLayer("outputs",
new Yolo2OutputLayer.Builder()
.boundingBoxPriors(priors)
.build(),
"conv2d_23")
.setOutputs("outputs")
.build();

System.out.println(model.summary(InputType.convolutional(608, 608, 3)));

ModelSerializer.writeModel(model, "yolo2_dl4j_inference.v1.zip", false);
}</pre>

The channels of the 608x608 input images need to be in RGB order (not BGR), with values normalized within [0, 1].


<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#YOLO2" aria-expanded="false" aria-controls="YOLO2">Show methods</button>
<div class="collapse" id="YOLO2"><div class="card card-body">

#### pretrainedUrl 
```java
public String pretrainedUrl(PretrainedType pretrainedType) 
```


Default prior boxes for the model


</div></div>