---
title: "Introduction to Reinforcement Learning"
description: "Getting started with Reinforcement Learning - understanding the basics."
---

## Learning

Human beings learn about the world in two primary ways. As children, we often learn by **imitating others** or by **interacting with our environment and observing the outcomes of our actions**. We touch objects, experiment, make mistakes, and gradually develop an understanding of how things work and figure out which experiments are faster, necessary and possible in order to understand other concepts as well.

Interestingly, this pattern of learning does not stop in childhood. Throughout our lives, we continue to learn either by:

1. **Applying knowledge from previous experiences** to similar situations, or
2. **Exploring and interacting with unfamiliar environments** until we understand their underlying dynamics.

Reinforcement Learning (RL) is a branch of machine learning that attempts to formalize this way of learning. Instead of learning from a fixed dataset, an agent learns by interacting with its environment, observing the consequences of its actions, and improving its behavior over time.

## From Supervised Learning to Reinforcement Learning

To understand Reinforcement Learning, it is useful to compare it with supervised learning.

In supervised learning, we are given a dataset consisting of input-output pairs. The goal is to learn a function that maps inputs to their corresponding outputs. During training, the model adjusts its parameters so that its predictions closely match the true labels. A key assumption in supervised learning is that the data is **independent and identically distributed (i.i.d.)**.

### Independent

Each training example is assumed to be independent of the others. The label associated with one sample does not influence the label of another sample.

### Identically Distributed

All samples are assumed to come from the same underlying probability distribution. In other words, there exists a consistent relationship between inputs and outputs across the entire dataset.

Because of these assumptions, collecting more high-quality data generally improves the performance of supervised learning models.

## Why Reinforcement Learning Is Different

Reinforcement Learning operates in a very different setting.

First, the i.i.d. assumption no longer holds. The actions taken by an agent influence future states and future observations. As a result, the data collected by the agent is highly dependent on its previous decisions.

Second, there is usually no ground-truth label telling the agent the correct action to take. Instead, the agent receives feedback in the form of rewards or penalties.

For example, consider a robot learning to navigate a maze. The robot is not told which turn is correct at every intersection. It only receives feedback such as:

* Positive reward for reaching the goal.
* Negative reward for hitting obstacles.
* Small penalties for taking too much time.

This makes the learning problem significantly more challenging. Even when an outcome is poor, it is often unclear which specific action was responsible for the failure. Likewise, a successful outcome may result from a sequence of good decisions rather than a single action.

Furthermore, simply collecting more experience does not guarantee success. The agent must learn how to use its experience effectively to discover better strategies.


## Common Notation

Before diving deeper into Reinforcement Learning, it is helpful to become familiar with some of the notations.

| Symbol     | Description                                                                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $s$        | A specific state.                                                                                                                                                                         |
| $a$        | A specific action.                                                                                                                                                                        |
| $S$        | The set of all non-terminal states.                                                                                                                                                       |
| $S^+$      | The set of all states, including terminal states.                                                                                                                                         |
| $A(s)$     | The set of actions available in state $s$.                                                                                                                                                |
| $R$        | The set of all possible reward values.                                                                                                                                                    |
| $t$        | A discrete time step.                                                                                                                                                                     |
| $T$        | The final time step of an episode.                                                                                                                                                        |
| $s_t$      | The state at time step $t$.                                                                                                                                                               |
| $a_t$      | The action taken at time step $t$.                                                                                                                                                        |
| $R_t$ (or  $r_t$)      | The reward received at time step $t$.                                                                                                                                                     |
| $R(s, a)$  | The reward function defining the expected reward for taking action $a$ in state $s$.                                                                                                      |
| $\pi$      | The policy, representing the agent's decision-making rule.                                                                                                                                |
| $\pi(s)$   | The action selected in state $s$ under a deterministic policy $\pi$.                                                                                                                      |
| $\pi(a\|s)$| The probability of taking action $a$ in state $s$ under a stochastic policy $\pi$.                                                                                                        |

                                                                                                           
*Most of the notation follows Reinforcement Learning: An Introduction* [@sutton1998reinforcement]

### Example

Consider an agent navigating a simple grid world:

* $s_t$: The agent is currently at position $(2,3)$.
* $a_t$: The agent chooses the action **Move Right**.
* $s_{t+1}$: The agent moves to position $(2,4)$.
* $R_{t+1}$: The environment returns a reward based on the outcome of the action.


## How Does an Agent Learn?

Unlike humans, machine learning agents are not naturally curious. They do not explore their environment unless we design them to do so.

To enable learning, we define:

* An **environment** in which the agent operates.
* A set of **actions** the agent can perform. $A(s)$
* A **goal** the agent should achieve.
* A **reward function** that measures progress toward that goal. $R(s, a)$

The agent's objective is to maximize the total reward it receives over time.

As the agent interacts with the environment, it gradually discovers which actions tend to produce higher rewards. Over many interactions, it learns a strategy that performs well according to the defined objective.

## The Reinforcement Learning Cycle

Reinforcement Learning follows a continuous interaction loop between an agent and its environment.

At time step ($t$):

1. The agent observes the current state ($s_t$).
2. The agent selects an action ($a_t$).
3. The environment responds with:

   * A new state ($s_{t+1}$)
   * A reward ($R_t$)

This process repeats until the task is completed or the interaction terminates.

The reward signal indicates how desirable the resulting situation is, but it does not explicitly tell the agent whether the chosen action was correct. The agent must infer this relationship through experience.

<figure>
<img src="https://raw.githubusercontent.com/maxdecplanck/resource-images/refs/heads/main/rl/intro/image_1.png" alt="Figure 1: Reinforcement Learning Agent-Environment Interaction" />
<figcaption style="text-align: center;">Figure 1: Reinforcement Learning Agent-Environment Interaction Cycle</figcaption>
</figure>



## Definition

According to Richard Sutton, one of the pioneers of Reinforcement Learning:

> Reinforcement Learning is learning what to do—how to map situations to actions—so as to maximize a numerical reward signal.

In essence, Reinforcement Learning is the study of how intelligent agents can learn effective behavior through interaction with their environment. By repeatedly acting, observing outcomes, and adjusting their decisions, agents can discover strategies that maximize long-term rewards without being explicitly told what actions to take.


## Important Concepts 
<!-- [@openai2019intro] -->

### States and Observations

A **state** $s$ represents a complete description of the environment at a given time. In a fully observable setting, the state contains all relevant information about the environment, meaning nothing is hidden or unknown to the agent.

An **observation** $o$ is a partial description of the state. It may not include all information about the environment, which leads to the concept of *partial observability*.

In simple terms, an observation can be viewed as incomplete information about the underlying state.

<figure>
<img src="https://raw.githubusercontent.com/maxdecplanck/resource-images/refs/heads/main/rl/intro/image_2.png" alt="Figure 2: Example - Partially Observable vs Fully Observable Environment" />
<figcaption style="text-align: center;">Figure 2: Example - Partially Observable vs Fully Observable Environment</figcaption>
</figure>

---

### Action Spaces

An **action space** $A(s)$ defines the set of all valid actions available to an agent when it is in state $s$.

Different environments may have different types of action spaces:

* **Discrete action spaces:** A finite set of distinct actions.
* **Continuous action spaces:** Actions are represented by continuous values.

For example, in environments like MiniGrid, an agent may have a discrete set of actions such as:

* move forward
* turn left
* turn right
* pick up
* drop
* toggle
* done

In contrast, in robotic control tasks, actions may be continuous, such as:

* velocity in the x-direction
* velocity in the y-direction
* applied force or torque

---

### Policies

A **policy** defines the behavior of an agent. It is a rule that maps states to actions.

In stochastic settings, a policy is represented as a probability distribution over actions given a state:

$$
a_t \sim \pi(\cdot \mid s_t)
$$

This means the action $a_t$ is sampled from the distribution defined by the policy $\pi$ conditioned on the current state $s_t$.

In deep reinforcement learning, we often work with **parameterized policies**, where the policy depends on a set of learnable parameters. These parameters are commonly denoted by $\theta$ (or sometimes $\phi$):

$$
a_t \sim \pi_\theta(\cdot \mid s_t)
$$

Here, the policy is no longer a fixed rule but a function that can be optimized through learning.

---

### Trajectories

A **trajectory** $\tau$ is a sequence of states and actions experienced by the agent as it interacts with the environment.

It is typically written as:

$$
\tau = (s_0, a_0, s_1, a_1, s_2, a_2, \dots)
$$

The initial state $s_0$ is sampled from a start-state distribution, denoted by $\rho_0$:

$$
s_0 \sim \rho_0(\cdot)
$$

A trajectory continues until a terminal state is reached or an episode ends.

### State Transitions

As an agent interacts with an environment, its actions influence how the environment evolves over time.

Suppose the agent is in state $s_t$ at time step $t$ and takes action $a_t$. The next state, $s_{t+1}$, is generally not deterministic and is instead described by a probability distribution over possible future states.

This transition dynamics is represented as

$$
p(s_{t+1} \mid s_t, a_t)
$$

which denotes the probability of reaching state $s_{t+1}$ given that the agent was in state $s_t$ and executed action $a_t$.

The function $p$ is commonly referred to as the **state transition function** or **environment dynamics**.

The action $a_t$ is selected according to the agent's policy, while the environment determines the next state through the transition dynamics.

---

### Rewards and Returns

A **reward** is a scalar feedback signal provided by the environment after the agent takes an action. It indicates how desirable the outcome of that action was.

The reward function is typically written as

$$
r_t = R(s_t, a_t, s_{t+1})
$$

which represents the reward received when the agent transitions from state $s_t$ to state $s_{t+1}$ by taking action $a_t$.

The reward itself is an immediate signal. However, reinforcement learning is concerned with maximizing the total reward accumulated over time rather than maximizing a single reward.

This accumulated reward is known as the **return**.

---

### Finite-Horizon Undiscounted Return

For tasks with a finite episode length, the return is simply the sum of all rewards collected during the episode:

$$
R(\tau) = \sum_{t=0}^{T} r_t
$$

where $T$ denotes the final time step of the episode.

### Example - Finite Horizon

Consider a maze-solving task in which:

* The agent receives $-1$ for every step taken.
* The agent receives $+100$ upon reaching the goal.

If the agent reaches the goal in 10 steps, the return is

$$
R(\tau) = (-1) + (-1) + \cdots + (-1) + 100 = 90.
$$

Since the objective is to maximize return, the agent is encouraged to reach the goal using as few steps as possible.

Finite-horizon undiscounted returns are commonly used in episodic tasks where interactions naturally terminate after a fixed number of steps or when a goal state is reached.


### Infinite-Horizon Discounted Return

Many reinforcement learning problems do not have a natural terminal state. In such cases, simply summing rewards forever would result in an unbounded quantity.

To address this, future rewards are discounted using a discount factor $\gamma$:

$$
R(\tau) = \sum_{t=0}^{\infty} \gamma^t r_t
$$

where

$$
0 \leq \gamma < 1.
$$

This formulation is known as the **discounted return**.


### Example - Infinite Horizon

Consider a robot vacuum cleaner that continuously cleans a house.

Suppose the robot receives:

* $+1$ for cleaning a dirty tile.
* $0$ for moving through an already clean tile.
* $-10$ if it collides with an obstacle.

Since the robot is expected to operate indefinitely, there is no natural final time step $T$. Therefore, the return is defined as

$$
R(\tau) = \sum_{t=0}^{\infty} \gamma^t r_t.
$$

Assume the robot receives the following sequence of rewards:

$$
1, 1, 1, 1, \dots
$$

Without discounting, the cumulative reward would grow without bound:

$$
1 + 1 + 1 + \cdots = \infty.
$$

However, with a discount factor of $\gamma = 0.9$, the return becomes

$$
1 + 0.9 + 0.9^2 + 0.9^3 + \cdots
$$

which converges to

$$
\frac{1}{1-0.9} = 10.
$$

Thus, the discounted return remains finite even though the task continues forever.


### Why Do We Need a Discount Factor?

The discount factor $\gamma$ determines how much importance is given to future rewards relative to immediate rewards.

A reward received sooner is generally considered more valuable than the same reward received much later. Therefore, future rewards are multiplied by progressively smaller powers of $\gamma$.

For example, with $\gamma = 0.9$:

* A reward received immediately has weight $1$.
* A reward received one step later has weight $0.9$.
* A reward received two steps later has weight $0.9^2 = 0.81$.
* A reward received ten steps later has weight $0.9^{10} \approx 0.35$.

The discount factor serves several purposes:

1. **Prioritizes immediate rewards** over distant rewards.
2. **Models uncertainty** about the future, since distant outcomes are often less predictable.
3. **Ensures convergence** of the infinite-horizon return by keeping the total sum finite.

As $\gamma$ approaches $1$, the agent becomes increasingly far-sighted and places more emphasis on long-term rewards. Conversely, smaller values of $\gamma$ make the agent more short-sighted, focusing primarily on immediate gains.





```bibtex
@article{sutton1998reinforcement,
    title={Reinforcement learning: An Introduction},
    author={Sutton, R and Barto, A},
    year={1998},
    publisher={MIT Press, Cambridge}
  }

@article{openai2019intro,
    title={Introduction to RL},
    author={OpenAI},
    year={2019},
    url={https://spinningup.openai.com/en/latest/spinningup/rl_intro.html#key-concepts-and-terminology}
  }

```
