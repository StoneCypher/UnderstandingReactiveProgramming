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
  1. Relationships vs values
  1. Programming without time
  1. Why should you care
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
    1. JRV step 1 - Can read `reactive`ly
    1. JRV step 2 - Values propagate and cache
    1. JRV step 3 - Dirty flag for lazy recalc
    1. JRV step 4 - Values have handlers
    1. JRV step 5 - JRV options
      1. Option 1 - should re-handle/debounce for same-assign?
      2. Option 2 - should immediate recalc w/o handler?
  1. Taking it for a spin
    1. Todo
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

In non-reactive programming, we set variables to values at any given time.

```javascript
var A = 1, B = 2, Sum = A+B;
console.log(`Old sum: ${Sum}`);
A = 10;
console.log(`New sum: ${Sum}`);
```

In traditional imperative programming, `Sum` stays `3` after `A` is reassigned.

In reactive programming, it's updated to the new sum, `12`, instead.

## Relationships vs values
## Programming without time
## Why should you care





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