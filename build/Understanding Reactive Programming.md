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
    1. No, seriously, what is `reactive`?
  1. Spreadsheet example
  1. Relationships vs values; time
  1. What is `functional reactive programming` ?
  1. What we'll do
1. Popular JS `reactive` libraries
  1. Well established libraries
    1. Bacon.js
    1. Kefir.js
    1. Reactivex
  1. Summary
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
      1. Option 2 - should immediate recalc w/o handler?
  1. Taking it for a spin
    1. Implementing a Side Project Revenue calculator
1. Worldview issues
  1. Benefits
  2. Detriments
  3. Alternatives
  4. Paradigms
1. Conclusion




<br/><br/><br/><br/>




# What is reactive programming?

Reactive programming is about declaring relationships outside of time, not
current values.

Reactive relationships keep their results up to date.



## TL;DR (Too Long; Didn't Read)

*Generally speaking, `reactive` means "things are kept up to date."*

It's what you're used to from Excel.



### No, seriously, what is `reactive`?

In standard imperative and other non-reactive programming, we set variables to
values at any given time.

```javascript
const A = 1, B = 2, Sum = A+B;
console.log(`Old sum: ${Sum}`);

A = 10;
console.log(`New sum: ${Sum}`);
```

1. That first `console.log` should say that `X` is `11`.
1. The second `console.log` should still say that `X` is `11`, because the
   addition was done at a specific time, before the change happened.
1. *In languages with a `reactive` notation*, like in spreadsheets, `X` would
   change to `21` in the second `console.log`.

That is, in `reactive` languages, *what `X` expresses is addition of `A` and `B`
as a continuing relationship*, not the immediate result value.

Many of the features of programming languages aim to remove burden from
programmers, such as manual memory management, loop control, or socket handling.

Reactive programming aims to allow programmers to remove updating related values
from their workload.


## Spreadsheet example

Spreadsheets have come up often already; let's make a direct example.
Spreadsheets are, essentially, reactive programming systems.  For example, in
Excel, this would be written as

|     | A             | B        |
|:---:|:------------- |:-------- |
| 1   | `5`           | JS "A"   |
| 2   | `6`           | JS "B"   |
| 3   | `=SUM(A1,A2)` | JS "Sum" |

This should render with `11` in `A3`.  If you then change the value in `A1` to
`15`, in response `A3` should change to `21` on its own - without prompting.

This is simple `reactive` programming.

Our goal in this tutorial is to understand programming in this fashion, and then
to implement a practical such system in Javascript.



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



## What is `functional reactive programming` ?

We're not going to cover FRP here, but, the short version is, if you're going
to the extent that a `Haskell`, `OCAML`, or `LISP` person would, and nailing
your RP system down with math, then you're probably doing one of the forms of
FRP.  Arrows-based FRP is an example, if you want to go Googling, but for now,
let's just keep it friendly and simple.

Mostly this topic is here to clarify that no, we are not going to that level of
strictness in our system.



## What we'll do

This tutorial will give a quick overview of Reactive solutions already out there
for Javascript, then dive into a direct, simple implementation of Reactive
programming in JS.  It's much easier to understand Reactive after one has gotten
one's hands dirty in building a system directly.

After that, we'll move ahead to make a project with our Reactive system, to see
how it feels in practice.




<br/><br/><br/><br/>




# Popular JS `reactive` libraries

To be clear, if you're going to use this stuff in production, you're much better
off with a well established `reactive` library with a long history, battle
scars, and an active community.  We're just building one from scratch because
that's how one learns these best.



## Well established libraries

Generally I would advocate one of three libraries in the JS world.



### Bacon.js

Bacon arguably popularised RP in the Javascript world.  Bacon has a very
strictly defined order of events, meaning that even strange edge cases are
handled in a very well defined (although frequently hard to suss out) fashion.
If you're a bank, use Bacon.



### Kefir.js

Kefir is less uptight.  Bacon pays a price in speed for its strictness; Kefir
is what you'll want to use for less agonizingly strict work.  It also has a
rather nicer API, in my opinion.



### Reactivex

Reactivex' biggest advantage is that it's been implemented in more than a dozen
languages.  You can rely of Reactivex to be present not only in today's backend,
but if it's not hipster nonsense, most likely in tomorrow's as well.  If you're
trying to use reactive in complex service situations, this is oftentimes an
absolute necessity, and Reactivex then becomes the only game in town.



## Summary

As you can see from even this brief glimpse, there are tradeoffs to be had in
your choice of implementation.  There are a dozen other serious candidates at
the time of writing; take the time to do some investigation before you choose.

Either way, it's time to get on to the meat of the project: implementing our
own.




<br/><br/><br/><br/>




# Building a modest one ourselves

A person often won't understand a thing until they've hacked one together.
Let's do a low-quality `reactive` system.  We won't put much effort in; as a
result it will be slow, vulnerable to injection attack, and very easy to kill
with cycles.

On the bright side, it'll be easy, and then `reactive` should be clearer.

Let's toss something together.



## Getting Started

To begin with, let's put three other Github repos on your radar:

1. Each major step in the tutorial process has a step in the
   [JRV Tutorial](https://github.com/StoneCypher/jrv_tutorial/) repo.
1. The current final up to date version is
   [distributed on NPM as `jrv`](https://www.npmjs.com/package/jrv), from a
   [Github repo named `jrv`](https://github.com/StoneCypher/jrv).

With that out of the way, it's time to take steps through the process.  😆



### The plan (ish)

We're going to start by implementing this in *just an* ***awful*** way,
initially.  Then, piece by piece, we'll refine it into something quite usable.

1. Initially, the system will calculate the entire chain every time it's asked,
   with relationships unchangeable after created.
1. In the second step, we'll make relationships changeable.
1. Next, we'll teach the values to update themselves when things change, and
   to cache the values we receive, for better performance.
1. Afterwards, we'll trim the propogations back to only what's actually needed
   ("lazy updates,") and set up the dirty flag system that makes that possible.
1. Next, we'll create "handlers" - routines that are called as values change.
   After this step, the library will become genuinely useful.
1. Following that, we'll support "chain" or "fluent" notation, like one expects
   from `d3` and `jquery`, which will lead to a much more pleasant API.

Let's get started, shall we?



### Building a rig

`TODO COMEBACK this should be and refer to a github page`

We can avoid almost the entirety of building a rig, this time around.  The
[tutorial repo](https://github.com/StoneCypher/jrv_tutorial/) has a series of
HTML files, for each step in the implementation.  These HTML files load the
library, and then you can just work with the library in your browser console of
choice (better instructions in each [HTML file](#todo_comeback))



## Milestones

So, let's start walking through the aforementioned milestones, one by one.



### JRV step 1 - Can read const `reactive`ly

To begin with, let's go for the genuinely horrid implementation we discussed.
We start there because it's rock stupid simple.

Smart, well written, efficient reactive systems tend to be either subscription
or broadcast models, which propagate changes as they happen.

We're not starting with a smart, well written, efficient system.  We're starting
with modest tools.

Because this is `Built On Works` &trade; technology, we're taking the slow-mode
route and doing the entire computation exhaustively on every request (which is
easier to implement, but extremely wasteful.)

It's a start.  We'll do better quickly.



#### What do we need?

A garbage implementation can be made on a single class, with a constructor and
a custom getter.

#### Let's do it

```javascript
class JRV { // js reactive variable

    constructor(comp) { this.comp = comp; }
    get v()           { return this.comp() }

}
```

This is "barely counts" reactive.  Fundamentally, this is the rudimentary sole
piece of `reactive`: having a computation that's always up to date on request.
(It's just that this is awful slow, and can't be updated, and doesn't have any
of the API we'd want from a nice implementation.)

All this really does is take a function in the constructor, then offer a getter
which runs the function when gotten.  The getter, `.v`, is the "value" of the
`JRV`, and with time will have more complex behavior.

But, for now, this is pretty much just a lame wrapper of a provided function.



#### Results

> As a quick reminder, a function that adds `A` and `B` and returns the result
> can be expressed briefly in JavaScript as an arrow by writing
>
> ```javascript
> () => A+B
> ```

This isn't exactly elegant, but it gets the job done, per our earlier example:

```javascript
var A   = 5,
    B   = 6,
    Sum = new RN( () => A+B );

console.log( Sum.v );  // 11

A = 15;

console.log( Sum.v );  // 21
```

This is technically `reactive`, though it is not yet "there" in spirit.  But,
one step at a time, especially during the learning process.  We'll get there
in this document.

![](http://i0.kym-cdn.com/photos/images/original/000/909/991/48c.jpg)

The first thing we should fix is making the value computation updatable.



### JRV step 2 - Mutable JRV

It's important to be able to change the value of a JRV.  Currently, we cannot.
I


#### What do we need?
#### Let's do it
#### Results



### JRV step 3 - Values propagate and cache
#### What do we need?
#### Let's do it
#### Results



### JRV step 4 - Dirty flag for lazy recalc
#### What do we need?
#### Let's do it
#### Results



### JRV step 5 - Values have handlers
#### What do we need?
#### Let's do it
#### Results



### JRV step 6 - pure call handler
#### What do we need?
#### Let's do it
#### Results



### JRV step 7 - JRV options
#### What do we need?
#### Let's do it
#### Results



#### Option 1 - should re-handle/debounce for same-assign?
#### Option 2 - should immediate recalc w/o handler?
## Taking it for a spin
### Implementing a Side Project Revenue calculator





<br/><br/><br/><br/>




# Worldview issues

1. Worldview issues
  1. Benefits
  2. Detriments
  3. Alternatives
  4. Paradigms




## Paradigms

We occasionally discuss "paradigms" of programming.

![](https://i.imgflip.com/16yfmw.jpg)

A paradigm is, in broad strokes, a way of looking at authoring software.

Object oriented, functional, logical, constraint based (like SQL and CSS,) and
dozens of others are paradigms of programming.  Many languages, like C++ and
Javascript, support multiple programming paradigms.

When one discusses paradigms, one discusses entirely different worldviews of
how software is made.  By example, imperative software (BCPL / C family) tends
to be small algorithms as functions, built up into successively larger
functions, generally largely heirarchally.  Contrasting, object oriented
software tends to be built in mostly-discrete pieces, separated by interfaces.
Constraint based software tends to be "under these circumstances, fulfill these
requirements, or list for me the possibilities."

Paradigms are inherently sort of a blurry concept, and people often get into
arguments about whether this one or that one "really counts."





<br/><br/><br/><br/>




# Conclusion

1. Conclusion