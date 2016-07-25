# Introduction to Reactive Programming

This is a fast, non-technical introduction to functional reactive programming in
Javascript.  We start with a quick overview of the idea, look at some
pseudocode, discuss why any of this matters; then we look at some popular
libraries; finally, we implement one ourselves, to really drive the concept
home.

In the process, we'll implement a small project: #whargarbl.

Buckle up: this is a fun ride.




<br/><br/><br/><br/>




# Table of Contents

1. [What is `reactive programming`](#what-is-reactive-programming)?
  1. TL;DR (Too Long; Didn't Read)
  1. Relationships vs values; time
  1. What we'll do
1. Initial steps in understanding
  1. Pseudo-JS example
  1. Spreadsheet example
  1. Paradigms; why this is Fundamentally Different (tm)
  1. What is `functional reactive programming` ?
  1. "What's next" - pop, then dig in
1. Popular JS `reactive` libraries
  1. Bacon.js
  1. Kefir.js
  1. Reactivex
1. Building a modest one ourselves
  1. Getting Started
    1. The plan (ish)
    1. Building a rig
  1. Milestones
    1. JRV step 1 - Can read const `reactive`ly
    1. JRV step 2 - Mutable JRV
    1. JRV step 3 - Values propagate and cache
    1. JRV step 4 - Dirty flag for lazy recalc
    1. JRV step 5 - Values have handlers
    1. JRV step 6 - pure call handler
    1. JRV step 7 - JRV options
      1. Option 1 - should re-handle/debounce for same-assign?
      2. Option 2 - should immediate recalc w/o handler?
  1. Taking it for a spin
    1. Implementing a Side Project Revenue calculator
1. Worldview issues
  1. Benefits
  2. Detriments
  3. Alternatives
  4. Paradigms, revisited
1. Conclusion




<br/><br/><br/><br/>




# What is reactive programming?

Reactive programming is about declaring relationships outside of time, not
current values.

Reactive relationships keep their results up to date.



## TL;DR (Too Long; Didn't Read)

In standard imperative and other non-reactive programming, we set variables to
values at any given time.

```javascript
const A = 1, B = 2, Sum = A+B;
console.log(`Old sum: ${Sum}`);

A = 10;
console.log(`New sum: ${Sum}`);
```

In traditional imperative programming, `Sum` stays `3` after `A` is reassigned.

In reactive programming, the values of variables are kept up to date; `Sum` is
updated to the new sum, `12`, instead.

Many of the features of programming languages aim to remove burden from
programmers, such as manual memory management, loop control, or socket handling.

Reactive programming aims to allow programmers to remove updating related values
from their workload.



## Relationships vs values; time

Reactive programming is a fair shift in mindset.  One useful early way to look
at it as "binding relationships, instead of values."

Think about CSS for a moment.  Many of its values are ratios (percentages in
columns and tables, particularly.)  Computed values are explicitly functions
that get kept up to date.  Transitions and animations are relationships
described by labels that are kept up to date through a time process for you.

Reactive programming is, in one sense, programming independent of time.  If I
can say that a value bears this relationship to these other values, and then
trust that the relationships are maintained, then I don't need to worry whether
a given value is up to date, or implement keeping it so.

A large proportion of many programs has to do with updating, maintaining, and
propogating values throughout the app.  Having this supported underneath means
less work in management, and removes a bunch of opportunities for error.





## What we'll do

This tutorial will give a quick overview of Reactive solutions already out there
for Javascript, then dive into a direct, simple implementation of Reactive
programming in JS.  It's much easier to understand Reactive after one has gotten
one's hands dirty in building a system directly.




<br/><br/><br/><br/>




# Initial steps in understanding

1. Initial steps in understanding
  1. Pseudo-JS example
  1. Spreadsheet example
  1. Paradigms; why this is Fundamentally Different (tm)
  1. What is `functional reactive programming` ?
  1. "What's next" - pop, then dig in





<br/><br/><br/><br/>




# Popular JS `reactive` libraries

1. Popular JS `reactive` libraries
  1. Bacon.js
  1. Kefir.js
  1. Reactivex





<br/><br/><br/><br/>




# Building a modest one ourselves

1. Building a modest one ourselves
  1. Getting Started
    1. The plan (ish)
    1. Building a rig
  1. Milestones
    1. JRV step 1 - Can read `reactive`ly
    1. JRV step 2 - Values propagate and cache
    1. JRV step 3 - Dirty flag for lazy recalc
    1. JRV step 4 - Values have handlers
    1. JRV step 5 - JRV options
      1. Option 1 - should re-handle/debounce for same-assign?
      2. Option 2 - should immediate recalc w/o handler?
  1. Taking it for a spin
    1. Todo





<br/><br/><br/><br/>




# Worldview issues

1. Worldview issues
  1. Benefits
  2. Detriments
  3. Alternatives
  4. Paradigms, revisited




<br/><br/><br/><br/>




# Conclusion

1. Conclusion