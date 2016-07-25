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

#### Results

> As a quick reminder, a function that adds `A` and `B` and returns the result
> can be expressed briefly in JavaScript as an arrow by writing
>
> ```javascript
> () => A+B
> ```


This isn't exactly elegant, but it gets the job done, per our earlier example:

```javascript
var A = 5,
    B = 6,
    X = new RN( () => A+B );

console.log( X.v );  // 11

A = 15;

console.log( X.v );  // 21
```

This is technically `reactive`, though it is not yet "there" in spirit.  But,
one step at a time, especially during the learning process.  We'll get there
in this document.

![](http://i0.kym-cdn.com/photos/images/original/000/909/991/48c.jpg)

The first thing we should fix is making the value computation updatable.


### JRV step 2 - Mutable JRV
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
