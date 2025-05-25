---
title: "Bayesian Statistics - Introduction"
date: "Oct 12, 2023"
author: "Mridul Sharma"
excerpt: "Bayesian statistics and probability with intuitive explanations and conceptual examples."
image: "https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/cover.png"
tags: ["Probability", "Bayes", "Statistics"]
---

## Introduction

Before diving into the bayesian concept, let's first understand what does it mean when something has some probability of occurring??<br>

We can understand it in two different manner : Frequentist & Bayesian.

For example: When considering the probability of rolling a four on a fair six-sided die, we can think of it in an objective manner. If we were to roll the die an infinite number of times, take random samples, and calculate the proportion of fours observed, it would tend towards one-sixth. This means that, in the long run, the proportion of the outcome we're interested in converges to one-sixth. So, one way to explain what is the probability of an outcome in terms of frequencies is if the event were to happen infinitely many times, what would be the proportion of outcome we’re interested in. This is simple, straightforward and sounds correct because frequentist approach reflects objective reality.

Another point to consider is the subjective approach, in which people have their own reasons for believing in a particular probability. This subjective viewpoint, which differs from the seemingly more accurate but rigidly objective viewpoint, serves as the foundation for our Bayesian model. It is not subjective in the sense of arbitrary beliefs; rather, it recognizes that various people may respond differently to the same inquiry based on experiences.

While the frequentist approach works well when picturing an endless number of dice rolls, it becomes difficult to apply it to unique one-time occurrences such as F1 Race because racing does not have a finite number of outcomes. For example, calculating the likelihood of Hamilton winning the F1 at Losail circuit requires insights that the frequentist model may not readily supply. Using a frequentist model would require imagining an infinite sequence of races, each with a different outcome, sample it and calculate the proportion of desired outcome and all of that without any background knowledge. Now, we are starting to see the flaws of the frequentist approach.

Let’s look at an example on how the bayesian approach can be subjective and true:
<br>

[![bayes_1](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_1.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Subjective Reality (but still true) </b></i>
</div>

<br>

In the example above, all persons A, B & C are correct about the disease. It’s just they predicted based on the knowledge and the prior information available to them. But, A  cannot say that the probability is 90% with just the information he has. The probability only gets updated after we add more and more information. The degree of belief helps form the probabilistic base of everything.


### Conditional Probability

In order to get complete intuition behind the bayesian statistics, we need to understand conditional probability. Let’s say that event A and event B are related to each other. Conditional Probability is the probability of a certain outcome from event B, given that event A has already happened. Conditional probability can be expressed mathematically in following way:
<br>

[![bayes_2](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_2.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Conditional Probability </b></i>
</div>

<br>

For Example:
Consider a class of 50 students where 15 are females, 20 are Mathematics majors and there are 8 females in Mathematics class. So,

Total Students n(T) = 50

Number of female students n(F) = 15

Number of students who are not female n(~F) = 50 - 15 = 35

Number of students who took mathematics major n(Mat) = 20

Number of students who do not took Mathematics major n(~Mat) = 50 - 20 = 30

Mathematics major who are female n(F and Mat) = 8

Mathematics major who are not female n(~F and Mat) = 20 - 8 = 12

Females who are not mathematics major n(F and ~Mat) = 15 - 8 = 7

Students who are neither female nor mathematics major n(~F and ~Mat) = 30 - 7 = 23


Let’s try to understand it using table:
<br>

[![bayes_3](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_3.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Conditional Probability </b></i>
</div>

<br>
Now, let’s calculate some conditional probability using above data:
<br>
<br>

[![bayes_4](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_4.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Conditional Probability </b></i>
</div>

<br>
<br>

[![bayes_5](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_5.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Conditional Probability </b></i>
</div>

<br>

Let's take a look at another example involving conditional probability:<br>
Hazard loves to play football, but especially when the weather is good. The probability that he plays football is 70% when it is sunny. But when it’s raining, the probability that he plays is just 40%. He stays in London and there is a 60% chance that it is sunny on any given day. Hazard played football last wednesday. Now, what is the probability that it was sunny last wednesday?

We can try to understand it using tree diagram:
<br>

[![bayes_6](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_6.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Conditional Probability </b></i>
</div>

<br>
From this example we can see that normally in London, the probability of a sunny day is 60%, but given the information that Hazard played football that day, we can conclude the probability of that day being sunny is 72.41%.

Above example involves discrete data, but in the next examples, let’s talk about conditional probability with respect to continuous examples:

Example 1:
<br>

[![bayes_7](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_7.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example 1 - Conditional Probability (Continuous)</b></i>
</div>

<br>
<br>

[![bayes_8](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_8.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example 1 - Conditional Probability (Continuous)</b></i>
</div>

<br>
Example 2:
<br>
<br>

[![bayes_9](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_9.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example 2 - Conditional Probability (Continuous)</b></i>
</div>

<br>


### Bayes Theorem

Let’s look at another example which is in fact one of the most famous examples for understanding bayes theorem.
<br>

[![bayes_10](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_10.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Bayes Theorem</b></i>
</div>

<br>

<br>

[![bayes_11](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_11.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Bayes Theorem</b></i>
</div>

<br>

Let's try to generalize what we did by making equations.
<br>

[![bayes_12](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_12.png)](javascript:void(0);)

<div style="text-align: center;">
  <i><b>Fig: Example - Bayes Theorem</b></i>
</div>

<br>

Below are the terminologies used for different parts of bayes themorem.

<br>

[![bayes_13](https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/bayes_13.png)](javascript:void(0);)

<br>
<br>
<br>
<br>
<span><strong><i>References for this blog (Click on references for more info):</i></strong></span>

  <span>  &nbsp;&nbsp;&nbsp;&nbsp;1. <a href="https://www.youtube.com/watch?v=NIqeFYUhSzU&t=1891s" target="_blank" style="text-decoration: none;">Introduction to Bayesian Statistics - A Beginner's Guide (Best resource ever)</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;2. <a href="https://www.youtube.com/watch?v=HZGCoVF3YvM" target="_blank" style="text-decoration: none;">Bayes theorem, the geometry of changing beliefs</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;3. <a href="https://www.youtube.com/watch?v=lG4VkPoG3ko" target="_blank" style="text-decoration: none;">The medical test paradox, and redesigning Bayes' rule</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;4. <a href="https://machinelearningmastery.com/bayes-theorem-for-machine-learning/" target="_blank" style="text-decoration: none;">A Gentle Introduction to Bayes Theorem for Machine Learning</a>.</span><br> 
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;5. <a href="hhttps://sphweb.bumc.bu.edu/otlt/mph-modules/bs/bs704_probability/bs704_probability6.html" target="_blank" style="text-decoration: none;">Bayes's Theorem</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;6. <a href="https://www.youtube.com/watch?v=_IgyaD7vOOA&list=LL&index=5" target="_blank" style="text-decoration: none;">Conditional Probabilities, Clearly Explained!!!</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;7. <a href="https://youtube.com/watch?v=9wCnvr7Xw4E&list=LL&index=6&t=26s" target="_blank" style="text-decoration: none;">Bayes' Theorem, Clearly Explained!!!!</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;8. <a href="https://www.youtube.com/watch?v=R13BD8qKeTg&list=LL&index=7" target="_blank" style="text-decoration: none;">The Bayesian Trap</a>.</span><br>
  <span>  &nbsp;&nbsp;&nbsp;&nbsp;9. <a href="https://www.youtube.com/watch?v=U_85TaXbeIo" target="_blank" style="text-decoration: none;">The quick proof of Bayes' theorem</a>.</span><br>