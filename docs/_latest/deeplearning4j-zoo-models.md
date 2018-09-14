---
title: Deeplearning4j Zoo Models
short_title: Zoo Models
description: Prebuilt model architectures and weights for out-of-the-box application.
category: Models
weight: 10
---

## Available models


---

### AlexNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/AlexNet.java) </span>

AlexNet

Dl4j's AlexNet model interpretation based on the original paper ImageNet Classification with Deep Convolutional Neural Networks
and the imagenetExample code referenced.
<br>
References:<br>
<a href="http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf">http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf</a>
<a href="https://github.com/BVLC/caffe/blob/master/models/bvlc_alexnet/train_val.prototxt">https://github.com/BVLC/caffe/blob/master/models/bvlc_alexnet/train_val.prototxt</a>

Model is built in dl4j based on available functionality and notes indicate where there are gaps waiting for enhancements.

Bias initialization in the paper is 1 in certain layers but 0.1 in the imagenetExample code
Weight distribution uses 0.1 std for all layers in the paper but 0.005 in the dense layers in the imagenetExample code





---

### Darknet19
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/Darknet19.java) </span>

Darknet19<br>
Reference: <a href="https://arxiv.org/pdf/1612.08242.pdf">https://arxiv.org/pdf/1612.08242.pdf</a>
<br>
ImageNet weights for this model are available and have been converted from <a href="https://pjreddie.com/darknet/imagenet/">https://pjreddie.com/darknet/imagenet/</a>
using https://github.com/allanzelener/YAD2K .

There are 2 pretrained models, one for 224x224 images and one fine-tuned for 448x448 images.
Call setInputShape() with either {3, 224, 224} or {3, 448, 448} before initialization.
The channels of the input images need to be in RGB order (not BGR), with values normalized within [0, 1].
The output labels are as per <a href="https://github.com/pjreddie/darknet/blob/master/data/imagenet.shortnames.list">
https://github.com/pjreddie/darknet/blob/master/data/imagenet.shortnames.list</a> .





---

### FaceNetNN4Small2
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/FaceNetNN4Small2.java) </span>

A variant of the original FaceNet model that relies on embeddings and triplet loss.
Reference: <a href="https://arxiv.org/abs/1503.03832">https://arxiv.org/abs/1503.03832</a><br>
Also based on the OpenFace implementation: <a href="http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf">
http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf</a>





---

### InceptionResNetV1
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/InceptionResNetV1.java) </span>

A variant of the original FaceNet model that relies on embeddings and triplet loss.<br>
Reference: <a href="https://arxiv.org/abs/1503.03832">https://arxiv.org/abs/1503.03832</a><br>
Also based on the OpenFace implementation: <a href="http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf">
http://reports-archive.adm.cs.cmu.edu/anon/2016/CMU-CS-16-118.pdf</a>





---

### LeNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/LeNet.java) </span>

LeNet was an early promising achiever on the ImageNet dataset.
References:<br>
- <a href="http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf">http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf</a><br>
- <a href="https://github.com/BVLC/caffe/blob/master/examples/mnist/lenet.prototxt">https://github.com/BVLC/caffe/blob/master/examples/mnist/lenet.prototxt</a><br>

MNIST weights for this model are available and have been converted from <a href="https://github.com/f00-/mnist-lenet-keras">https://github.com/f00-/mnist-lenet-keras</a>.





---

### NASNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/NASNet.java) </span>

U-Net

Implementation of NASNet-A in Deeplearning4j. NASNet refers to Neural Architecture Search Network, a family of models
that were designed automatically by learning the model architectures directly on the dataset of interest.

This implementation uses 1056 penultimate filters and an input shape of (3, 224, 224). You can change this.

Paper: <a href="https://arxiv.org/abs/1707.07012">https://arxiv.org/abs/1707.07012</a>
ImageNet weights for this model are available and have been converted from <a href="https://keras.io/applications/">https://keras.io/applications/</a>.






---

### ResNet50
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/ResNet50.java) </span>

Residual networks for deep learning.

Paper: <a href="https://arxiv.org/abs/1512.03385">https://arxiv.org/abs/1512.03385</a>
ImageNet weights for this model are available and have been converted from <a href="https://keras.io/applications/"></a>https://keras.io/applications/</a>.





---

### SimpleCNN
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/SimpleCNN.java) </span>

A simple convolutional network for generic image classification.
Reference: <a href="https://github.com/oarriaga/face_classification/">https://github.com/oarriaga/face_classification/</a>





---

### SqueezeNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/SqueezeNet.java) </span>

U-Net

An implementation of SqueezeNet. Touts similar accuracy to AlexNet with a fraction of the parameters.

Paper: <a href="https://arxiv.org/abs/1602.07360">https://arxiv.org/abs/1602.07360</a>
ImageNet weights for this model are available and have been converted from <a href="https://github.com/rcmalli/keras-squeezenet/">https://github.com/rcmalli/keras-squeezenet/</a>.






---

### TextGenerationLSTM
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/TextGenerationLSTM.java) </span>

LSTM designed for text generation. Can be trained on a corpus of text. For this model, numClasses is

Architecture follows this implementation: <a href="https://github.com/fchollet/keras/blob/master/examples/lstm_text_generation.py">
https://github.com/fchollet/keras/blob/master/examples/lstm_text_generation.py</a>

Walt Whitman weights are available for generating text from his works, adapted from <a href="https://github.com/craigomac/InfiniteMonkeys">
https://github.com/craigomac/InfiniteMonkeys</a>.





---

### TinyYOLO
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/TinyYOLO.java) </span>

Tiny YOLO
Reference: <a href="https://arxiv.org/pdf/1612.08242.pdf">https://arxiv.org/pdf/1612.08242.pdf</a>

ImageNet+VOC weights for this model are available and have been converted from https://pjreddie.com/darknet/yolo
using <a href="https://github.com/allanzelener/YAD2K">https://github.com/allanzelener/YAD2K</a> and the following code.

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





---

### UNet
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/UNet.java) </span>

U-Net

An implementation of U-Net, a deep learning network for image segmentation in Deeplearning4j.
The u-net is convolutional network architecture for fast and precise segmentation of images.
Up to now it has outperformed the prior best method (a sliding-window convolutional network) on the ISBI challenge for
segmentation of neuronal structures in electron microscopic stacks.

Paper: <a href="https://arxiv.org/abs/1505.04597">https://arxiv.org/abs/1505.04597</a>
Weights are available for image segmentation trained on a synthetic dataset






---

### VGG16
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/VGG16.java) </span>

VGG-16, from Very Deep Convolutional Networks for Large-Scale Image Recognition
<a href="https://arxiv.org/abs/1409.1556">https://arxiv.org/abs/1409.1556</a><br>
<br>
Deep Face Recognition<br>
<a href="http://www.robots.ox.ac.uk/~vgg/publications/2015/Parkhi15/parkhi15.pdf">http://www.robots.ox.ac.uk/~vgg/publications/2015/Parkhi15/parkhi15.pdf</a>

ImageNet weights for this model are available and have been converted from <a href="https://github.com/fchollet/keras/tree/1.1.2/keras/applications">
https://github.com/fchollet/keras/tree/1.1.2/keras/applications</a>.
CIFAR-10 weights for this model are available and have been converted using "approach 2" from <a href="https://github.com/rajatvikramsingh/cifar10-vgg16">
https://github.com/rajatvikramsingh/cifar10-vgg16</a>.
VGGFace weights for this model are available and have been converted from <a href="https://github.com/rcmalli/keras-vggface">
https://github.com/rcmalli/keras-vggface</a>.





---

### VGG19
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/VGG19.java) </span>

VGG-19, from Very Deep Convolutional Networks for Large-Scale Image Recognition<br>
<a href="https://arxiv.org/abs/1409.1556">https://arxiv.org/abs/1409.1556</a>
<br>
ImageNet weights for this model are available and have been converted from <a href="https://github.com/fchollet/keras/tree/1.1.2/keras/applications">
https://github.com/fchollet/keras/tree/1.1.2/keras/applications</a>.





---

### Xception
<span style="float:right;"> [[source]](https://github.com/deeplearning4j/deeplearning4j/tree/master/deeplearning4j/deeplearning4j-zoo/src/main/java/org/deeplearning4j/zoo/model/Xception.java) </span>

U-Net

An implementation of Xception in Deeplearning4j. A novel deep convolutional neural network architecture inspired by
Inception, where Inception modules have been replaced with depthwise separable convolutions.

Paper: <a href="https://arxiv.org/abs/1610.02357">https://arxiv.org/abs/1610.02357</a>
ImageNet weights for this model are available and have been converted from <a href="https://keras.io/applications/">
https://keras.io/applications/</a>.






---

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


##### pretrainedUrl 
```java
public String pretrainedUrl(PretrainedType pretrainedType) 
```


Default prior boxes for the model

