---
title: "What is PDDL?"
description: "An approachable introduction to the Planning Domain Definition Language - what it is, why it exists, and how to write first PDDL domain and problem from scratch."
---

## Overview

PDDL is a standardized, formal language used in Artificial Intelligence for describing planning problems. It was originally developed in 1998 [@ghallab1998] for the International Planning Competition (IPC) and has become the de facto standard in automated planning research.

---

## What is Automated Planning?


Planning is the process of figuring out a sequence of actions that transforms some starting situation into a desired outcome. Humans do it constantly, i.e., planning a road trip, packing a bag, cooking a multi-dish meal. When we plan, we are mentally simulating how actions change the state of the world and choosing a path that leads to our goal.

**Automated planning** is the subfield of AI that studies how we can do this computationally in automated fashion. Given a formal description of:

- The **current state** of the world,
- The **actions** available to an agent,
- and a **goal** to achieve,
- A **planner** (a piece of software) finds a sequence of actions (**plan**), that achieves the goal from the starting state.

This is different from classical search or reinforcement learning in an important way: the planner operates over a *symbolic, interpretable description* of the world rather than learning from data. We describe what is true, what actions are possible, and what we want, and the planner reasons over that description to find a solution.

### Example

Imagine a robot arm and three blocks:  A, B, C; sitting flat on a table. Our goal is to arrange them into a tower with A at the bottom, B in the middle, and C on top.

We can hardcode a solution: pick up B, put it on A, pick up C, put it on B. But what if there are 10 blocks? What if some were already stacked? What if the goal changed? Hardcoding breaks almost every other time except the case it was written for.

A planner solves this *generically*: we give it a description of how the robot arm works and what the blocks are currently doing, tell it the goal, and it figures out the steps.

---

## Why PDDL? History and Motivation

By the late 1990s, automated planning was a flourishing field, but it was highly fragmented: research groups developed their own planners using incompatible input formats. To evaluate two systems on the same task, researchers typically had to hand-translate problem descriptions between formats or simply forgo direct comparison.


The first **International Planning Competition (IPC)** in 1998, brought a light to the issue. To run a competition where every planner solves the same problems, we needed every planner to speak the same language. Drew McDermott, Malik Ghallab, and colleagues stepped up to define that language: **PDDL - the Planning Domain Definition Language** [@ghallab1998].

PDDL was not designed from scratch. It drew heavily on **STRIPS** [@fikes1971] (Stanford Research Institute Problem Solver), a formalism developed by Richard Fikes and Nils Nilsson in 1971. STRIPS had already proven that planning problems could be represented cleanly with:

- A set of logical **predicates** to describe world states,
- **Actions** with preconditions and effects,
- An **initial state** 
- and a **goal**.

PDDL generalized STRIPS, added types, and created a standardized file format. The result was adopted almost universally and flexible enough to be extended over the years.

### How PDDL has evolved

PDDL is not a static language. It has grown through several major versions, each extending the expressiveness of what we can model:

- **PDDL 1.0** [@ghallab1998] (1998) - The original. STRIPS-style planning with basic types.
- **PDDL 2.1** [@fox2003] (2003) - Added **numeric fluents** (quantities that change, like fuel level or cost) and **durative actions** (actions that take time, with continuous effects).
- **PDDL 3.0** [@Gerevini2005PDDL3](2006) - Added **trajectory constraints** (rules about what must hold throughout a plan, not just at the end) and **preferences** (soft goals).
- **PDDL 3.1** [@kovacs2011pddl31] (2011) - Added **object fluents** (functions that return objects, not just numbers).

For the examples, we will be using **PDDL 3.1** as it is considered the **current** version. 

---

## Domain and Problem Component

One of PDDL's most important design choices is the separation of domain and problem. Every PDDL planning task consists of two components:

| File | What it describes |
|------|-------------------|
| **The Domain  description** | The general rules of the world: object types, predicates, functions, and actions |
| **The Problem description** | A specific instance: the objects present, the initial state, and the desired goal |

These descriptions are typically stored in separate files: domain file and problem file. This separation makes domains reusable; For Example: once a Blocksworld domain has been defined, many different Blocksworld problems can be created simply by changing the objects, initial configuration, and goal conditions in the problem file.

A planner takes both files as input and outputs a **plan**: an ordered sequence of grounded actions (actions with specific objects plugged in for their parameters) that achieves the goal from the initial state.


---

## Domain File

The domain file defines the vocabulary and rules of world. Think of it as a rulebook that describes what can exist, what can be true about it, and what operations can change things. Main sections include: `requirements`, `types`, `predicates`, `functions (optional)` and `actions`.

### A word on syntax

PDDL uses a **Lisp-like S-expression syntax**; everything is nested in parentheses; every expression is either an atom (a symbol like `block` or `?x`) or a list `(e1 e2 ...)`:
- **Keywords** start with a colon (`:requirements`, `:action`, etc.) 
- **Variables** start with a question mark (`?x`, `?y`)
- **Comments** start with a semicolon (`;`). 

### Requirements

Every domain begins by declaring its **requirements**, which features of the PDDL language this domain uses. This tells the planner which capabilities it needs.

```pddl
(:requirements :strips :typing)
```

Some common requirements include:

**`1. :strips`** - The baseline requirement. Enables basic STRIPS semantics: actions have add and delete effects, and preconditions are conjunctions of positive literals. Almost every domain uses this. If no requirements are declared at all, :strips is assumed by default.
```pddl
(:requirements :strips)

  (:action move
    :parameters (?r - robot ?from - location ?to - location)
    :precondition (and (at ?r ?from) (connected ?from ?to))
    :effect (and (at ?r ?to) (not (at ?r ?from)))
  )
```
> A robot `?r` can move from location `?from` to location `?to`, but only if it is at `?from` and the two locations are connected. After moving, it is now at `?to` and no longer at `?from`.

**`2. :typing`** - Allow objects to be categorized into types (like classes in OOP).
```pddl
(:requirements :strips :typing)

  (:types robot location)

  (:action move
    :parameters (?r - robot ?from - location ?to - location)
    :precondition (and (at ?r ?from) (connected ?from ?to))
    :effect (and (at ?r ?to) (not (at ?r ?from)))
  )
```
> The same move action as above, but now `?r` is declared as a robot and `?from`/`?to` as location. The planner will never try to apply this action to a non-robot or a non-location object, which shrinks the search space.

**`3. :negative-preconditions`** - Allows `(not ...)` inside preconditions, so we can require that something is false before an action fires.

```pddl
(:requirements :strips :typing :negative-preconditions)

  (:action pick-up
    :parameters (?r - robot ?item - object ?loc - location)
    :precondition (and (at ?r ?loc)
                       (at ?item ?loc)
                       (not (holding ?r)))
    :effect (and (holding ?r ?item)
                 (not (at ?item ?loc)))
  )
```
> A robot picks up an item at its current location. The third precondition: `(not (holding ?r))` requires that the robot is not already holding something. After picking up, the robot holds the item and the item is no longer on the location.


**`4. :disjunctive-preconditions`** - Allows `(or ...)` and `(imply ...)` in preconditions, so an action can be applicable when any one of several conditions holds.
```pddl
(:requirements :strips :typing :disjunctive-preconditions)

  (:action unlock-door
    :parameters (?a - agent ?d - door)
    :precondition (or (has-key ?a ?d) (has-access-card ?a ?d))
    :effect (unlocked ?d)
  )
```
> An agent can unlock a door if they have either a key for it or an access card for it, not necessarily both. The or means the planner will consider this action applicable under either condition. 


**`5. :equality`** - Makes `=` a built-in predicate for testing whether two variables refer to the same object. Useful for ruling out trivial or self-referential cases.
```pddl
(:requirements :strips :typing :equality)

  (:action stack
    :parameters (?x - block ?y - block)
    :precondition (and (clear ?y)
                       (holding ?x)
                       (not (= ?x ?y)))
    :effect (and (on ?x ?y)
                 (not (holding ?x))
                 (not (clear ?y)))
  )
```
>A block `?x` is stacked on block `?y`. The condition `(not (= ?x ?y))` prevents the planner from trying to stack a block on itself which is a physically impossible but otherwise syntactically valid instantiation.

**`6. :existensial-preconditions`** - Allows `(exists (...) ...)` in preconditions. The action is applicable if at least one object satisfying the condition exists, without having to name it explicitly.
```pddl
(:requirements :strips :typing :existential-preconditions)

  (:action enter-room
    :parameters (?a - agent ?r - room)
    :precondition (exists (?k - key) (and (has ?a ?k) (opens ?k ?r)))
    :effect (in-room ?a ?r)
  )
```
> An agent can enter a room if there exists some key in the world that they are carrying and that opens this particular room; the agent does not need to specify which key. The planner searches over all key objects and checks whether any one satisfies both conditions.


**`7. :universal-preconditions`** -  Allows `(forall (...) ...)` in preconditions. Requires the condition to hold for all objects of a given type.
```pddl
(:requirements :strips :typing :universal-preconditions)

  (:action start-convoy
    :parameters (?lead - truck)
    :precondition (forall (?t - truck) (fueled ?t))
    :effect (convoy-moving)
  )
```
> The convoy cannot depart until every single truck in the world is fueled; not just the lead truck, not just most of them, but all of them. 


**`8. :conditional-effects`** - Allows effects that only apply `when` certain conditions hold at execution time, using when clauses.
```pddl
(:requirements :strips :typing :conditional-effects)

  ; when clause: effect depends on a runtime condition
  (:action open-container
    :parameters (?c - container ?loc - location)
    :precondition (at ?c ?loc)
    :effect (and
      (open ?c)
      (when (fragile ?c) (handle-with-care ?c)))
  )
```
>`open-container` sets it to open. But the second effect: flagging it as `handle-with-care` and only fires if the container happens to be `fragile`.


**`9. :numeric-fluents`** - Enables numeric functions (declared in a (:functions ...) section) and assignment operators (assign, increase, decrease, scale-up, scale-down) in effects, as well as numeric comparisons in preconditions.
```pddl
(:requirements :strips :typing :numeric-fluents)

  (:functions (battery-level ?r - robot))

  (:action recharge
    :parameters (?r - robot ?s - station)
    :precondition (and (at ?r ?s) (< (battery-level ?r) 20))
    :effect (assign (battery-level ?r) 100)
  )
```
>Each robot has a numeric `battery-level` function. The robot can only recharge if it is at a charging station and its battery is below 20. After recharging, the battery is set to 100. 


**`10. :object-fluents`** - Extends functions to return objects (not just numbers), enabling functions like (location-of ?r) that map to an object rather than a numeric value.
```pddl
(:requirements :strips :typing :object-fluents)

  (:functions (location-of ?r - robot) - location)

  (:action teleport
    :parameters (?r - robot ?dest - location)
    :precondition (teleport-ready ?r)
    :effect (assign (location-of ?r) ?dest)
  )
```
>Instead of using a predicate `(at ?r ?loc)` to track where a robot is, this model uses a function `(location-of ?r)` that directly returns the robot's current location as an object. Teleporting assigns a new location to the robot in a single effect. Object fluents are useful when an entity has exactly one value for some property at any time; like a robot's current location.

**`11. :fluents`** - Enables both `:numeric-fluents` and `object-fluents`. i.e., Declaring `:fluents` is equivalent to declaring both `:numeric-fluents` and `object-fluents`.


**`12. :durative-actions`** - Enables actions that take time. Durative actions have a `:duration` constraint, a :condition (with time specifiers at `start`, `at end`, `over all`), and a `:effect` (applied `at start` or `at end`).
```pddl
(:requirements :strips :typing :durative-actions)

  (:durative-action drive
    :parameters (?r - robot ?from - location ?to - location)
    :duration (= ?duration 5)
    :condition (and (at start (at ?r ?from))
                    (over all (road-clear ?from ?to)))
    :effect (and (at start (not (at ?r ?from)))
                 (at end   (at ?r ?to)))
  )
```
>Driving takes exactly 5 time units. At the `start` of the action the robot must be at `?from`, and the road must remain clear for the entire duration `(over all)`. The moment driving begins, the robot is no longer at `?from` (`at start` effect). When driving finishes, it arrives at `?to` (`at end` effect).


**`13. :duration-inequalities`** - Allows flexible duration constraints using <= and >= instead of only =, so an action can take a range of durations. Requires :durative-actions.
```pddl
(:requirements :strips :typing :durative-actions :duration-inequalities)

  (:durative-action repair
    :parameters (?t - technician ?m - machine)
    :duration (and (>= ?duration 3) (<= ?duration 8))
    :condition (at start (broken ?m))
    :effect (at end (not (broken ?m)))
  )
```
> A repair job takes between 3 and 8 time units; the planner can choose any duration in that range. This is more realistic than a fixed duration: some repairs are quick, others take longer, and the planner can pick whatever fits best within the overall schedule. 


**`14. :continuous-effects`** - Allows numeric fluents to change continuously throughout the duration of an action (using `#t` to represent elapsed time), rather than only at the action's start or end. Requires `:durative-actions` and `:numeric-fluents`.
```pddl
(:requirements :strips :typing :durative-actions :numeric-fluents :continuous-effects)

  (:durative-action fly
    :parameters (?p - plane)
    :duration (= ?duration 10)
    :condition (at start (fueled ?p))
    :effect (decrease (fuel-level ?p) (* \#t 2))
  )
```
>A plane burns fuel continuously while flying - 2 units of fuel per time step throughout the entire 10-unit flight, not just a lump deduction at the start or end. The special symbol `#t` represents the time elapsed since the action began. This lets the planner reason about resource depletion as a smooth process, which matters when multiple actions compete for the same resource over overlapping time intervals.

**`15. :derived-predicates`** - Allows predicates to be defined by logical rules rather than set explicitly by actions. A derived predicate is automatically inferred to be true whenever its rule body holds. This is declared using `(:derived ...)` in the domain, not inside any action.
```pddl
(:requirements :strips :typing :derived-predicates)

  (:predicates
    (connected ?a - location ?b - location)
    (reachable  ?a - location ?b - location)
  )

  (:derived (reachable ?a - location ?b - location)
    (connected ?a ?b))

  (:derived (reachable ?a - location ?b - location)
    (exists (?mid - location)
      (and (connected ?a ?mid) (reachable ?mid ?b))))
```
>`reachable` is never set by any action; instead, the planner infers it automatically. The first rule says: if two locations are directly connected, they are reachable from each other. The second rule says: if we can get to some intermediate location `?mid`, and from there to `?b`, then `?b` is reachable from `?a`. Together, these two rules define reachability transitively across the entire map, without needing any action to maintain it. Whenever connected changes, the planner re-evaluates reachable automatically.


**`16. :action-costs`** - Enables modelling of action costs via the special numeric function (`total-cost`), combined with a `:metric` directive in the problem file to minimize it.
```pddl
; In Domain file
(:requirements :strips :typing :numeric-fluents :action-costs)

  (:functions (total-cost))

  (:action fly
    :parameters (?p - plane ?from - city ?to - city)
    :precondition (and (at ?p ?from) (connected ?from ?to))
    :effect (and (at ?p ?to)
                 (not (at ?p ?from))
                 (increase (total-cost) 10))
  )

; In Problem file
(:metric minimize (total-cost))
```
>Every time a plane flies a leg, it adds 10 to the running `total-cost`. The problem file's `:metric` directive tells the planner to find the plan with the lowest total cost. Different actions can increase `total-cost` by different amounts; so the planner is incentivized to find cheaper routes.


**`17. :preferences`** - Allows soft goals: conditions that are desirable but not required. Named preferences can be declared in the goal or in action preconditions, and their violation can be measured and optimized using a `:metric`. Temporal operators from linear temporal logic (`always`, `sometime`, `sometime-after`, `at-most-once`) are used to express preferences over plan trajectories.
```pddl
(:requirements :strips :typing :preferences)

  (:goal
    (and
      (delivered packageA)
      (preference deliver-early
        (sometime-before (deadline-passed) (delivered packageB)))
    )
  )

  (:metric minimize (is-violated deliver-early))
```
>The plan must deliver `packageA` - that is a hard goal. Delivering `packageB` before the deadline is merely preferred: if the planner cannot do it, the plan is still valid, but a penalty is incurred. `sometime-before` means "at some point in the plan, `packageB` was delivered before `deadline-passed` became true." The `:metric` counts how many named preferences were violated and minimizes that number, steering the planner toward satisfying as many soft goals as possible.

**`18. :constraints`** - Allows hard trajectory constraints: conditions that must hold at some point, throughout the plan, or in a specific temporal relationship. These can be declared in both the domain and problem file. Uses the same temporal operators as preferences.
```pddl
(:requirements :strips :typing :constraints)

  ; in the domain file:
  (:constraints
    (always (not (overloaded conveyor)))
  )

  ; in the problem file:
  (:constraints
    (sometime (beacon-activated))
  )
```
>The domain-level constraint says the conveyor must never be overloaded at any point during any valid plan; a safety condition stating the physics of the domain itself. The problem-level constraint says the beacon must be activated at least once during this particular mission. Unlike preferences, both of these are hard: any plan that violates them is rejected outright. Domain constraints capture universal operating rules; problem constraints capture mission-specific requirements.


**`19. :adl`** - A shorthand requirement that bundles the most common classical-planning extensions. Equivalent to declaring all of: `:strips`, `:typing,` `:negative-preconditions`, `:disjunctive-preconditions`, `:equality`, `:quantified-preconditions`, and `:conditional-effects`. 

### Types

Types are the **categories** of objects in our world. With `:typing` enabled, we declare them like this:

```pddl
(:types block)
```

This says our world has one category of object: `block`. Types support inheritance, and we can write:

```pddl
(:types movable-object - object
        block ball    - movable-object
        table         - object)
```

meaning `movable-object` is a subtype of `object`, and `block` and `ball` are subtypes of `movable-object`. Types help the planner prune the search space: if an action only applies to `block` objects, the planner will never try to apply it to a `table`.

Every type hierarchy has an implicit root: `object`. If we declare a type without specifying a parent, it is automatically a direct subtype of `object`. So `(:types block)` is shorthand for `(:types block - object)`.


**The `either` type experssion:** <br>
Sometimes a parameter legitimately belongs to more than one type, and those types do not share a useful common parent. In such cases, we can express it with `(either ...)`.

```pddl
(:action load
  :parameters (?item - (either box crate) ?v - vehicle)
  :precondition (and (at ?item depot) (available ?v))
  :effect (loaded ?item ?v)
)
```
> The `load` action accepts any item that is either a `box` or a `crate`, two types that may have no common parent other than `object`. Rather than writing two nearly identical actions or introducing an artificial shared supertype, `(either box crate)` expresses the union inline. The planner will try this action with any object of either type.

**Domain-level constants**<br>
We can also declare typed constants directly in the domain file, in a `(:constants ...)` section:
```pddl
(:types location)

(:constants
  depot headquarters - location
)
```
>`depot` and `headquarters` are fixed locations that exist in every problem using this domain; we do not need to re-declare them in each problem file's `(:objects ...)` section. 



### Predicates

Predicates are the most central concept in PDDL. A **predicate** is a statement about the world that is either *true* or *false* at any given moment. Collectively, all currently-true predicates represent the **state of the world**; i.e., the complete snapshot of everything that holds right now.

```pddl
(:predicates
  (on      ?x - block ?y - block)
  (on-table ?x - block)
  (clear    ?x - block)
  (holding  ?x - block)
  (arm-empty)
)
```

Let's decode each one:

- **`(on ?x - block ?y - block)`** - block `?x` is directly on top of block `?y`. Takes two arguments, both blocks.
- **`(on-table ?x - block)`** - block `?x` is resting on the table.
- **`(clear ?x - block)`** - nothing is sitting on top of block `?x`. It is accessible.
- **`(holding ?x - block)`** - the robot arm is currently holding block `?x`.
- **`(arm-empty)`** - the robot arm holds nothing. Note this takes *no* arguments, it is just a boolean flag about the arm.

The symbols starting with `?` are **variables**; placeholders filled in with actual objects when the predicate is used. So `(on-table a)` (where `a` is a specific block object) is a **ground predicate**.

The world state at any instant is simply the **set of all ground predicates currently true**. There is no richer internal structure: the world is a flat collection of true/false facts.

> **The Closed-World Assumption (CWA)**
>
> PDDL operates under the `*closed-world assumption*`: any predicate not explicitly listed as true is assumed to be **False**. If `(on a b)` is not in the current state, then block `a` is definitely not on block `b`; there is no "unknown." This makes planning tractable: we only need to track what *is* true; everything else defaults to false.



### Actions

Actions are the operations that change the state of the world. In PDDL, every action has exactly three parts:

1. **Parameters** - the objects this action operates on (typed variables)
2. **Precondition** - a logical formula that must be true in the current state for this action to be *applicable* (allowed to execute)
3. **Effect** - how the state changes when this action executes

Effects in STRIPS-style PDDL are split into two lists:

- **Add effects**: predicates that become *true* (written without any modifier)
- **Delete effects**: predicates that become *false* (written as `(not ...)` inside the effect)

Everything not mentioned in an effect stays exactly as it was. We do not have to say "block A is still on the table" after every action that doesn't involve block A. The planner assumes it stays unless explicitly changed. This is the **frame assumption**.

Here is a complete action to study:

```pddl
(:action pick-up
  :parameters  (?x - block)
  :precondition (and (clear ?x) (on-table ?x) (arm-empty))
  :effect (and
    (holding ?x)
    (not (clear ?x))
    (not (on-table ?x))
    (not (arm-empty))
  )
)
```

In plain English:

> **To pick up block `?x`:**
> - The arm must be empty. `?x` must be on the table. `?x` must be clear (nothing on top of it).
> - After picking it up: the arm now holds `?x` *(add)*; `?x` is no longer on the table *(delete)*; `?x` is no longer clear; a held block can't have things placed on it *(delete)*; the arm is no longer empty *(delete)*.

Preconditions *read* the state, effects *write* the state. The add/delete split means we always know exactly what changed.

---

## Inside the Problem File

The domain defines the rules; the **problem file** specifies a particular instance to solve. It has three sections: `objects`, `init`, and `goal`; and two optional ones: `constraints` and `metric`.

### Objects

Objects are the **concrete entities** in this specific scenario, i.e., instances of the types defined in the domain.

```pddl
(:objects a b c - block)
```

This declares three block objects named `a`, `b`, and `c`. The planner will never invent new objects; it works only with those declared here.

### Initial State

The initial state `(:init ...)` lists every ground predicate that is true at the very start of the problem. And as we know from CWA, anything not listed here is **False**.

```pddl
(:init
  (on-table a)
  (on-table b)
  (on-table c)
  (clear a)
  (clear b)
  (clear c)
  (arm-empty)
)
```

Reading this: all three blocks are on the table, all three are clear (nothing on any of them), and the arm is empty. Visually:

```
┌───┐   ┌───┐   ┌───┐
│ A │   │ B │   │ C │
└───┘   └───┘   └───┘
=====================
        TABLE

Arm: empty
```

This is the world as it exists at time zero.

### Goal

The goal (`(:goal ...)`) is a logical formula that the planner must make true by the end of the plan. It describes the desired outcome.

```pddl
(:goal
  (and
    (on b a)
    (on c b)
  )
)
```

We want block `b` on top of `a`, and block `c` on top of `b`. A tower:

```
┌───┐
│ C │
└───┘
┌───┐
│ B │
└───┘
┌───┐
│ A │
└───┘
═══════
 TABLE
```

The goal only specifies what we *care about*. We say nothing about `(arm-empty)`; the planner doesn't need to end with an empty arm, though a well-designed plan will. We also say nothing about `(on-table a)` because the planner infers that `a` must be on the table (or at least that it doesn't need to be moved) from the context.

---

## Example: The Blocksworld

**Blocksworld** is a simple example, more like the "Hello, World!" of automated planning. It is simple enough to understand completely, yet non-trivial enough to illustrate all the important concepts. Let's write the full model and walk through every line of code.

**The scenario:** A robot arm operates over a table covered with blocks. The arm can pick up and put down blocks. Blocks can rest on the table or on top of other blocks. You can only interact with the **topmost** block in any stack (no pulling blocks from the middle). The arm holds at most one block at a time.

**Our specific problem:** Blocks A, B, C start on the table. We want to build the tower A-B-C from bottom to top.

---

### The Domain File

```pddl
(define (domain blocksworld)

  (:requirements :strips :typing)

  (:types block)

  (:predicates
    (on       ?x - block ?y - block)  ; x is directly on y
    (on-table ?x - block)             ; x is on the table
    (clear    ?x - block)             ; nothing is on x
    (holding  ?x - block)             ; arm holds x
    (arm-empty)                       ; arm holds nothing
  )

  (:action pick-up
    :parameters  (?x - block)
    :precondition (and (clear ?x) (on-table ?x) (arm-empty))
    :effect (and
      (holding ?x)
      (not (clear ?x))
      (not (on-table ?x))
      (not (arm-empty))
    )
  )

  (:action put-down
    :parameters  (?x - block)
    :precondition (holding ?x)
    :effect (and
      (on-table ?x)
      (clear ?x)
      (arm-empty)
      (not (holding ?x))
    )
  )

  (:action stack
    :parameters  (?x - block ?y - block)
    :precondition (and (holding ?x) (clear ?y))
    :effect (and
      (on    ?x ?y)
      (clear ?x)
      (arm-empty)
      (not (holding ?x))
      (not (clear  ?y))
    )
  )

  (:action unstack
    :parameters  (?x - block ?y - block)
    :precondition (and (on ?x ?y) (clear ?x) (arm-empty))
    :effect (and
      (holding ?x)
      (clear   ?y)
      (not (on    ?x ?y))
      (not (clear ?x))
      (not (arm-empty))
    )
  )

)
```

### Walkthrough

**`(define (domain blocksworld))`** - Every PDDL file starts with `define`. This creates a new domain named `blocksworld`. The name matters as the problem file will reference it.

**`(:requirements :strips :typing)`** - We declare we are using STRIPS semantics and typed objects. Any planner that supports these requirements can handle this domain.

**`(:types block)`** - One object type: `block`. Meaning every object in our world will be a block.

**`(:predicates ...)`** - Five predicates describe everything relevant about the world. The comments after the semicolons are just for human readers; planners ignore them.

---

**The `pick-up` action** picks a block off the table.

```pddl
(:action pick-up
  :parameters  (?x - block)
  :precondition (and (clear ?x) (on-table ?x) (arm-empty))
  :effect (and
    (holding ?x)
    (not (clear ?x))
    (not (on-table ?x))
    (not (arm-empty))
  )
)
```

- **Parameters:** One typed variable `?x` of type `block`.
- **Precondition:** `?x` must be clear (nothing on it), on the table (not already in the air or on another block), and the arm must be free.
- **Add effects:** `(holding ?x)` - arm now holds `?x`.
- **Delete effects:** `(clear ?x)` - while held, `?x` can't have things placed on it; `(on-table ?x)` - it left the table; `(arm-empty)` - arm is occupied.

Why `(not (clear ?x))`? Imagine trying to stack something on a block that's dangling in mid-air, it doesn't make sense. Setting `clear` to false while holding the block prevents that.

---

**The `put-down` action** is the exact inverse of `pick-up`.

```pddl
(:action put-down
  :parameters  (?x - block)
  :precondition (holding ?x)
  :effect (and
    (on-table ?x)
    (clear ?x)
    (arm-empty)
    (not (holding ?x))
  )
)
```

The only precondition is that we are holding `?x`. After putting it down, it is on the table, clear (fresh placement, nothing on it yet), and the arm is free. `(holding ?x)` is deleted.

---

**The `stack` action** places a held block on top of another block.

```pddl
(:action stack
  :parameters  (?x - block ?y - block)
  :precondition (and (holding ?x) (clear ?y))
  :effect (and
    (on    ?x ?y)
    (clear ?x)
    (arm-empty)
    (not (holding ?x))
    (not (clear  ?y))
  )
)
```

- **Parameters:** Two variables - `?x` (the one being placed) and `?y` (the destination block).
- **Precondition:** Arm holds `?x`, and `?y` must be clear (you can't stack onto a block that already has something on it).
- **Add effects:** `?x` is now on `?y`; `?x` is clear (it was just placed, nothing on it yet); arm is empty.
- **Delete effects:** No longer holding `?x`; `?y` is no longer clear — `?x` is now on top of it.

---

**The `unstack` action** lifts a block off another block — the inverse of `stack`.

```pddl
(:action unstack
  :parameters  (?x - block ?y - block)
  :precondition (and (on ?x ?y) (clear ?x) (arm-empty))
  :effect (and
    (holding ?x)
    (clear   ?y)
    (not (on    ?x ?y))
    (not (clear ?x))
    (not (arm-empty))
  )
)
```

- **Precondition:** `?x` must be directly on `?y`, `?x` must be clear (nothing on top), and the arm must be free.
- **Add effects:** Arm now holds `?x`; `?y` is now clear (its top is exposed again).
- **Delete effects:** `?x` is no longer on `?y`; `?x` is no longer clear (held block can't receive anything); arm is no longer empty.

A quick sanity check: `pick-up` and `put-down` deal with the table, while `stack` and `unstack` deal with block-on-block. Together they cover all the ways a block's position can change. Those 4 defined actions are the entire physics of Blocksworld.

---

### The Problem File

```pddl
(define (problem stack-abc)

  (:domain blocksworld)

  (:objects a b c - block)

  (:init
    (on-table a)
    (on-table b)
    (on-table c)
    (clear a)
    (clear b)
    (clear c)
    (arm-empty)
  )

  (:goal
    (and
      (on b a)
      (on c b)
    )
  )

)
```

#### Line-by-line walkthrough

**`(define (problem stack-abc))`**
Declares a problem named `stack-abc`. The name is just a label.

**`(:domain blocksworld)`**
Links this problem to the `blocksworld` domain we defined above. The planner will combine both files.

**`(:objects a b c - block)`**
Three block objects. When the planner instantiates actions, it substitutes these concrete names for the `?x`, `?y` variables in the domain.

**`(:init ...)`**
Seven ground predicates are true at the start. Note: `(on a b)`, `(on b c)`, etc., are **not** listed — and because of the closed-world assumption, that means they are all false. No block is on another block initially. The starting picture:

```
┌───┐   ┌───┐   ┌───┐
│ A │   │ B │   │ C │
└───┘   └───┘   └───┘
=====================  ; all clear, on table
        TABLE

Arm: empty
```

**`(:goal (and (on b a) (on c b)))`** - The target configuration; a tower with A at the bottom, B in the middle, C on top. Only two predicates need to be true for the goal to be satisfied. The planner doesn't care how anything else is arranged.

---

### Tracing the Plan

Given this domain and problem, a planner produces the following plan:

```pddl
1. (pick-up b)
2. (stack b a)
3. (pick-up c)
4. (stack c b)
```

Let's trace through every step and verify correctness.

**Initial state:**
```pddl
{(on-table a), (on-table b), (on-table c), (clear a), (clear b), (clear c), (arm-empty)}
```

---

**Step 1 — `(pick-up b)`**

*Check preconditions:* `(clear b)` ✓  `(on-table b)` ✓  `(arm-empty)` ✓

*Apply effects:*
- Add: `(holding b)`
- Delete: `(clear b)`, `(on-table b)`, `(arm-empty)`

*State after step 1:*
```pddl
{(on-table a), (on-table c), (clear a), (clear c), (holding b)}
```

```
┌───┐     ┌───┐
│ A │     │ C │
└───┘     └───┘
══════════════════
      TABLE

Arm holding: [B]
```

---

**Step 2 — `(stack b a)`**

*Check preconditions:* `(holding b)` ✓  `(clear a)` ✓

*Apply effects:*
- Add: `(on b a)`, `(clear b)`, `(arm-empty)`
- Delete: `(holding b)`, `(clear a)`

*State after step 2:*
```pddl
{(on-table a), (on-table c), (on b a), (clear b), (clear c), (arm-empty)}
```

```
┌───┐     
│ B │     
└───┘    
┌───┐     ┌───┐
│ A │     │ C │
└───┘     └───┘
══════════════════
      TABLE

Arm: empty
```

---

**Step 3 — `(pick-up c)`**

*Check preconditions:* `(clear c)` ✓  `(on-table c)` ✓  `(arm-empty)` ✓

*Apply effects:*
- Add: `(holding c)`
- Delete: `(clear c)`, `(on-table c)`, `(arm-empty)`

*State after step 3:*
```pddl
{(on-table a), (on b a), (clear b), (holding c)}
```

---

**Step 4 — `(stack c b)`**

*Check preconditions:* `(holding c)` ✓  `(clear b)` ✓

*Apply effects:*
- Add: `(on c b)`, `(clear c)`, `(arm-empty)`
- Delete: `(holding c)`, `(clear b)`

*Final state:*
```pddl
{(on-table a), (on b a), (on c b), (clear c), (arm-empty)}
```

```
    ┌───┐
    │ C │
    └───┘
    ┌───┐
    │ B │
    └───┘
    ┌───┐
    │ A │
    └───┘
═════════════
    TABLE

Arm: empty  ✓ Goal achieved
```

**Goal check:** `(on b a)` ✓  `(on c b)` ✓  - **Plan valid.**

The planner derived this plan entirely from the symbolic description in PDDL. It did not need any Blocksworld-specific search strategy. It worked by searching through the state space; starting from the initial state, applying actions, checking if the goal was reached, purely based on the domain we defined and problem we stated.

---

## How Does a Planner Find a Plan?

But how does the planner actually discover those four steps? At its core, planning is **search** through the space of possible states. Different planners use different strategies, but here are the main families:

**Forward search (progression):** -  Start at the initial state. Find all actions whose preconditions are satisfied. Apply each one to generate successor states. Keep expanding until a state satisfying the goal is found. This is intuitive but can explore exponentially many irrelevant states.

**Backward search (regression):** - Start from the goal. Ask: which actions could have produced this state? Work backwards until you reach the initial state. Often focuses the search on relevant actions.

**Heuristic search:** - Modern planners use **heuristic functions** to estimate how far a given state is from the goal, guiding search toward promising directions, just like A* in graph search. A popular heuristic is the **delete relaxation**: temporarily ignore all delete effects (pretend actions only add facts, never remove them). The relaxed problem is easy to solve optimally, and its solution cost estimates how hard the real problem is. Planners like **Fast Downward** use variants of this to navigate enormous state spaces.

**SAT planning / planning as satisfiability:** - Encode the planning problem as a Boolean satisfiability (SAT) formula and hand it to a SAT solver. Effective for finding plans of a fixed number of steps.

Note: PDDL is the *input* to these planners. All the algorithmic complexity lives in the planner itself. We just need to describe the problem correctly in the PDDL framework and the planner handles the rest.

---

## The PDDL Ecosystem: Tools to Get Started

Once we have a PDDL model, you need tools to run it. Here are the most useful options:

**[editor.planning.domains](http://editor.planning.domains)** - A web-based PDDL editor with a built-in solver. This is the single easiest way to run your first PDDL example without installing anything. Paste the domain and problem files, click solve, and see the plan in seconds. Highly recommended for getting started.

**[Fast Downward](https://www.fast-downward.org/)** [@helmert2006] - The most widely used open-source planner, developed at the University of Basel. It supports PDDL 2.2, won multiple IPC tracks, and is the go-to tool for research. Requires compilation from source (C++), but runs locally with full control over search configurations.

**[FF (Fast-Forward)](https://fai.cs.uni-saarland.de/hoffmann/ff.html)** [@hoffmann2001] - A fast heuristic planner that popularized the idea of delete-relaxation heuristics. Simpler than Fast Downward but historically very influential.

**[VAL (Plan Validator)](https://github.com/KCL-Planning/VAL)** - Validates that a plan is actually correct: that every action's preconditions are met at the time of execution and the final state satisfies the goal. Invaluable for debugging.

---

## What's Next in This Series

This post laid the conceptual foundation for PDDL. You now know why it exists, how it is structured, and how to read and write a complete PDDL model. Here is a glimpse of what is coming in the rest of the series:

- **Hands-on with PDDL.jl** - parsing PDDL files in Julia, simulating actions programmatically, and calling planners from code
- **A more complex domain** - modeling a logistics problem with multiple locations, vehicles, and packages
- **Inside a planner** - a deeper look at heuristic search, Fast Downward's architecture, and what makes a problem hard
- **Beyond classical planning** - probabilistic PDDL, partial observability, and online planning
---

<!-- ## References -->

```bibtex
@article{ghallab1998,
  author = {Ghallab, Malik and Knoblock, Craig and Wilkins, David and Barrett, Anthony
            and Christianson, Dave and Friedman, Marc and Kwok, Chung and Golden, Keith
            and Penberthy, Scott and Smith, David and Sun, Ying and Weld, Daniel},
  year   = {1998},
  month  = {08},
  title  = {PDDL - The Planning Domain Definition Language},
  note   = {Technical Report CVC TR-98-003/DCS TR-1165, Yale Center for Computational
            Vision and Control}
}

@article{fikes1971,
  author    = {Fikes, Richard E. and Nilsson, Nils J.},
  title     = {STRIPS: A New Approach to the Application of Theorem Proving to Problem Solving},
  journal   = {Artificial Intelligence},
  volume    = {2},
  number    = {3--4},
  pages     = {189--208},
  year      = {1971},
  publisher = {Elsevier}
}

@article{fox2003,
  author  = {Fox, Maria and Long, Derek},
  title   = {PDDL2.1: An Extension to PDDL for Expressing Temporal Planning Domains},
  journal = {Journal of Artificial Intelligence Research},
  volume  = {20},
  pages   = {61--124},
  year    = {2003}
}


@inproceedings{Gerevini2005PDDL3,
  title     = {Plan Constraints and Preferences in PDDL3},
  author    = {Alfonso Emilio Gerevini and Maria Long},
  year      = {2005},
  url       = {http://cs-www.cs.yale.edu/homes/dvm/papers/pddl-ipc5.pdf}
}


@unpublished{kovacs2011pddl31,
  author    = {Daniel L. Kovacs},
  title     = {BNF definition of PDDL 3.1},
  year      = {2011},
  note      = {Unpublished manuscript from the IPC-2011 website},
  url       = {https://web.archive.org/web/20220609052756/http://www.plg.inf.uc3m.es/ipc2011-deterministic/attachments/Resources/kovacs-pddl-3.1-2011.pdf}
}


@book{ghallab2004,
  author    = {Ghallab, Malik and Nau, Dana and Traverso, Paolo},
  title     = {Automated Planning: Theory and Practice},
  publisher = {Morgan Kaufmann Publishers},
  year      = {2004},
  address   = {San Francisco, CA}
}

@inproceedings{helmert2006,
  author    = {Helmert, Malte},
  title     = {The Fast Downward Planning System},
  booktitle = {Journal of Artificial Intelligence Research},
  volume    = {26},
  pages     = {191--246},
  year      = {2006}
}

@article{hoffmann2001,
  author  = {Hoffmann, J{\"o}rg and Nebel, Bernhard},
  title   = {The FF Planning System: Fast Plan Generation Through Heuristic Search},
  journal = {Journal of Artificial Intelligence Research},
  volume  = {14},
  pages   = {253--302},
  year    = {2001}
}
```

---
