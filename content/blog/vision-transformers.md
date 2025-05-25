---
title: "Vision Transformers"
date: "July 25, 2023"
author: "Mridul Sharma"
excerpt: "Exploring how artificial intelligence is transforming our understanding of the genome and enabling personalized medicine."
image: "https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/bg.png"
tags: ["ViT", "Computer Vision", "Machine Learning"]
---

## Introduction

Convolutional Neural Networks (CNNs) belong to the category of deep learning models that have significantly influenced the domain of computer vision. They excel in tasks related to image analysis, recognition, and comprehension, demonstrating a strong suitability for such endeavors whereas transformer architectures are basically the architecture that uses attention mechanism at its core. Since its introduction in 2017,  transformers and its variations were used for tackling the sequence problems specifically related to Natural Language Understanding & Processing including machine translation, text generation, language modeling and more. But Google Research released a paper named “An Image is worth 16 x 16 words: Transformers for Image recognition at scale” and introduced Vision Transformers (ViT), a new way of computer vision.


In this blog, we will discuss vanilla Vision Transformers. Transformers have a huge impact on the NLP domain as we can pre-train them on large corpus and then fine-tune for specific purposes without compromising efficiency, scalability & saturation in performance. Vision Transformers were primarily developed for image classification tasks. However, before ViT, transformers have not been used effectively for computer vision purposes. Before learning about vision transformers, we need to have a good understanding of Transformer architecture. For that you can check my previous blog <a href="https://blogs.mridulsharma.com.np/posts/Attention" target="_blank" style="text-decoration: none; color:skyblue">here</a>. PyTorch implementation of Vision Transformers can be found <a href="https://github.com/33-Papers/ViT-Vision-Transformers" target="_blank" style="text-decoration: none; color:skyblue">here</a>. Below is the ViT architecture from the original paper.
<br>

[![vit](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_1.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Vision Transformer Architecture (From original paper)</b></i>
</div>

<br>

In ViT, power of the transformer is utilized in a quite different manner than CNN’s. First, the image is split into patches, flattened and positional embeddings are added. Finally, the image representation is passed through the transformer followed by classification head. Let’s try to understand it step by step.
<br><br>

**<span style="text-decoration:underline; font-size: 24px">Split image into patches</span>**

Image patches are small, rectangular subregions or segments that are extracted from a larger image. These patches represent localized portions of the image and can be thought of as smaller "pieces" of the overall image. They can be used for multiple purposes such as feature extraction, parallel processing, data augmentation & capturing spatial context.
<br>

[![vit](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_2.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Splitting images into patches</b></i>
</div>

<br>
Splitting images into patches in vision transformers enables efficient processing, effective capture of both local and global context, adaptation of transformer concepts from text to images, and the ability to handle varying input sizes. This approach forms the basis for applying transformers to image data successfully. This process is done for all the channels & is performed in the following manner.
<br>
<br>

[![vit](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_3.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Mathematical equations for splitting</b></i>
</div>

<br>

**<span style="text-decoration:underline; font-size: 24px">Patch Embeddings</span>**

The Transformer uses constant latent vector size D through all of its layers, so we flatten the patches and map to D dimensions with a trainable linear projection i.e. it represents each image patch of size (P x P) with channel C in 1D using D latent vector size. This representation is known as patch embeddings.
<br>

[![vit](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_4.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Splitting - Example</b></i>
</div>

<br>
<br>

[![vit5](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_5.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Splitting - Example</b></i>
</div>

<br>
The latent vector D in our image is 768. We can learn more about different latent vector sizes in the different variations of vision transformers from the table1 of the paper which is shown below.
<br>
<br>

[![vit6](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_6.png)](javascript:void(0);)

<br>

**<span style="text-decoration:underline; font-size: 24px">Position Embeddings & Extra Class Embeddings</span>**

Unlike CNNs, ViT processes images as sequences of flattened patches. However, images have a spatial structure and this information needs to be incorporated in with the input for the model to understand the relationship between different patches. So, position embeddings are introduced to address this issue. This is important because without position embeddings, the model would treat the patches as an unordered set and lose the spatial information. Furthermore, we prepend a learnable embedding, often referred as “class token” which is important for training and inference purposes. After all of these computations, we are ready to pass input embeddings to the transformer encoder.

Position embeddings are added to the patch embeddings to retain positional information. Standard learnable 1D position embeddings are used because we have not observed significant performance gains from using more advanced 2D-aware position embeddings. 


During the training phase, the class token plays an important role in helping the model understand the overall content of the image and its relationship to specific patches. While computing self-attention, each patch is associated with the class token & acts as a way for the model to take into account high-level features that might be important for the final classification.

This can be represented in terms of equation:
<br>

[![vit7](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_7.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Explaination - Input embeddings equation</b></i>
</div>

<br>
<br>

[![vit8](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_8.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Visual representation of patch embeddings, position embeddings & class token embeddings</b></i>
</div>

<br>

**<span style="text-decoration:underline; font-size: 24px">Transformer Encoder</span>**

The transformer encoder used in ViT is a slight variation of vanilla transformers’ encoder. Let’s have a look at the difference between the two encoders.
<br>

[![vit9](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_9.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Difference between encoder in vanilla transformer vs vision transformer</b></i>
</div>

<br>

Vision Transformer Encoder block consists of four layers which consists of Multi-Headed Attention, Multi-Layer perceptron & two LayerNorm.

In ViT, the input embeddings are passed to the encoder layer and are normalized first. Now, similar to vanilla transformers, we randomly initialize Key, Query & Value matrices and multiply them with the normalized learnable input embeddings in order to get Key, Query and Value for our input. The process of calculating attention weights is the same as that of vanilla transformers. We can calculate the attention for each input as shown in the figure below:

<br>

[![vit](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_10.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Block Diagram - Calculating Attention</b></i>
</div>

<br>
<br>

[![vit11](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_11.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Block Diagram - Calculating Attention</b></i>
</div>

<br>

This way of calculating Attention is known as Scaled dot product attention but in the vision transformers Multi-Head Attention is used which basically means performing attention operation in parallel. We can see this figure from the original paper to understand the difference between the two.

<br>

[![vit12](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_12.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Scaled Dot Product Attention vs Multi-Head Attention</b></i>
</div>

<br>

After the attention is calculated successfully, we add the attention with input embeddings that was passed to the encoder block as there is residual connection(skip connection) from the beginning of the encoder block. After this, the output is again normalized followed by a Multi-Layer perceptron (MLP) block and residual connection as shown in the block diagram of ViT Encoder. The MLP block is generally a collection of feed-forward layers. In ViT, MLP consists of two linear layers with GELU (Gaussian Error Linear Unit) non-linearity in between them and a Dropout layer after each of the linear layers.

<br>

[![vit](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/vit_images/vit_13.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: MLP Block</b></i>
</div>

<br>

The output from the MLP block is passed through the MLP head or sometimes referred as Classification Head. As we have added a class token on the input and it takes on representing the image at its core. The output of this token is transformed into class prediction with the help of MLP head. MLP head consists of a single hidden layer followed by a tanh activation function during pre-training and consists of a single linear layer followed by tanh activation during fine-tuning.

MLP head in ViTs produces an output distribution. In the context of ViTs, the MLP head's final layer usually consists of units equal to the number of classes in the classification task. Each unit corresponds to a class, and the values produced by these units can be thought of as representing the model's confidence or likelihood that the input image belongs to a particular class.

To convert these raw scores or logits into a probability distribution, a softmax activation function is often applied. The softmax function normalizes the scores across all the units (classes) and converts them into probabilities. Each probability reflects the model's estimated probability that the input image belongs to the corresponding class. This output distribution can then be used for making predictions or for calculating the loss during training.
<br>
<br>
<br>
<br>
<span><strong><i>References for this blog (Click on references for more info):</i></strong></span>

  <span>  &nbsp;&nbsp;&nbsp;&nbsp;1. <a href="https://arxiv.org/pdf/2010.11929.pdf" target="_blank" style="text-decoration: none;">AN IMAGE IS WORTH 16X16 WORDS:
TRANSFORMERS FOR IMAGE RECOGNITION AT SCALE</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;2. <a href="https://medium.com/data-and-beyond/vision-transformers-vit-a-very-basic-introduction-6cd29a7e56f3" target="_blank" style="text-decoration: none;">Vision Transformers [ViT]: A very basic introduction</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;3. <a href="https://www.learnpytorch.io/08_pytorch_paper_replicating/" target="_blank" style="text-decoration: none;">learnpytorch.io (One of the best)</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;4. <a href="https://theaisummer.com/vision-transformer/#positional-embeddings" target="_blank" style="text-decoration: none;">How the Vision Transformer (ViT) works in 10 minutes: an image is worth 16x16 words</a>.</span><br> 
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;5. <a href="https://machinelearningmastery.com/the-vision-transformer-model/" target="_blank" style="text-decoration: none;">The Vision Transformer Model</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;6. <a href="https://www.v7labs.com/blog/vision-transformer-guide" target="_blank" style="text-decoration: none;">Vision Transformer: What It Is & How It Works</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;7. <a href="https://sh-tsang.medium.com/review-vision-transformer-vit-406568603de0" target="_blank" style="text-decoration: none;">Review: Vision Transformer (ViT)</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;8. <a href="https://www.youtube.com/watch?v=qU7wO02urYU" target="_blank" style="text-decoration: none;">Vision Transformers (ViT) Explained + Fine-tuning in Python</a>.</span><br>