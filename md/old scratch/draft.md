### Aside, for editor

> So, I'd actually write this quite differently for a C programmer than I would
> for a JavaScript programmer, or for a LISPer, or a novice.  It would help to
> know who the target was for the assignment.
>
> I am proceeding assuming a journeyman programmer who has less than three years
> of programming under his or her belt, and no particular domain-relevant
> experience.  However, in many cases this would be much shorter for certain
> audiences.
>
> My article is called "Understanding Reactive Programming"
>
> We implement a full signalled reactive system by hand
>
> Without further ado



----
----

Understanding `Reactive` Programming.md

----
----





# Understanding `Reactive` Programming

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

`Reactive` "really counts," with respect to paradigms.  It's a fairly
straightforward, but also often fairly fundamentally alien, way of looking at
software.  It's not common in programming languages (though it did make it into
ActionScript 3 in Flash, and there's a decent argument that `view`s and
procedural columns are `reactive` in SQL,) but you're probably already most
familiar with the idea from spreadsheets.





## So what is `Reactive` programming?

At its basis, `Reactive` is more about describing the edges in a graph, giving
values to source nodes, observing the state of output nodes, and expecting the
graph to be kept up to date.

By the end of this article, that claim should make sense.

A lot of articles about reactive programming will pick a library, introduce that
library's terminology, and then show a few tech demos.  By the end, you can use
one `reactive` library.

Let's try implementing one from scratch, shall we?  😂





### No, seriously, what is `reactive`?

Like any metaphor in programming, there are a million ways to look at
`Reactive`.  And, like any metaphor in programming, 999,994 of those ways are
more confusing than explanatory.  (Because being confounding is like a burrito.)

This can be a quick dive.

*Generally speaking, `reactive` means "things are kept up to date."*

It's what you're used to from Excel.

## Quick example

```javascript
var A = 5,
    B = 6,
    X = A + B;

console.log(`At first, the sum is ${X}`);

A = 15;

console.log(`After changing A, the sum is ${X}`);
```



### Key concept

1. That first `console.log` should say that `X` is `11`.
1. That first `console.log` should still say that `X` is `11`, because the
   addition was done at a specific time, before the change happened.
1. In languages with a `reactive` notation, like in spreadsheets, `X` would
   change to `21` in the second `console.log`.

That is, in `reactive` languages, *what `X` expresses is addition of `A` and `B`
as a continuing relationship*, not the immediate result value.





## I'm serious about the spreadsheet thing

In Excel, this would be written as

| Cell | Value         |
|:----:|:------------- |
| `A1` | `5`           |
| `A2` | `6`           |
| `A3` | `=SUM(A5,A6)` |

This should render with `11` in `A3`.  If you change A1 to 15, `A3` should
change to `21` on its own, without prompting.  This is simple `reactive`
programming.

There are decent arguments that eventually-consistent databases with views,
service-glue systems like `ifttt` and `yahoo pipes`, `RPC`, `http` hooks, and
state machines over message systems are close analogues of `reactive` programming.

Event programming, like seen in JavaScript, can be seen as a primitive relative
of, and can relatively easily be used to implement, in a hacky way, `reactive`
programming (along with getters and setters, a computation function, and
tolerance to very slow results.)





## Why is this good?

One thing a lot of tutorials forget to mention is why you should care, trusting
you to go through an entire implementation before knowing what the payoff will
be.  That seems aggravating and unnecessary.

# todo comeback

A subtle example that a lot of web developers will be familiar with is the move
from inline styling





# Let's toss one together for JS

A person often won't understand a thing until they've hacked one together.
Let's do a low-quality `reactive` system.  We won't put much effort in; as a
result it will be slow, vulnerable to injection attack, and very easy to kill
with cycles.

On the bright side, it'll be easy, and then `reactive` should be clearer.

Smart, well written, efficient reactive systems tend to be either subscription
or broadcast models, which propagate changes as they happen.  Because this is
Built On Works (tm) technology, we're taking the slow-mode route, and doing the
entire computation exhaustively on every request (which is easier to implement,
but extremely wasteful.)





## What do we need?

A garbage implementation can be made on a single class, that has a custom
getter, two methods, and two internal members.

### Rambling

:neckbeard: The two internal members are one flag that says whether it's a value or a
computation node, and a member to store the data (which might be interpreted as
a value, or as the computation to be done.)

:neckbeard: The getter will check the flag, return the stored data if it's a value node, or
return the call result of the function if a computation node.

:neckbeard: The two methods respectively set the current value or the current computation,
as well as to appropriately set the flag to respect the new nature of the node.

:neckbeard: When the `.v` member is requested, the computation will be made on the spot.





## Trivial Example

We'll come back and make this piece by piece, but, fundamentally, this is a
(low quality) implementation of first-steps Reactive in JS: having a computation
that's always up to date on request.

The most trivial (and borderline unacceptable, and initially hard to
rationalize with other things under the name) implementation of Reactive is a
caching of a computation that's called on lookup.

```javascript
class RN { // trivial reactive node

    constructor(comp) { this.comp = comp; }
    get v()           { return this.comp() }

}
```

This isn't good enough for a bunch of reasons, such as that it can't be updated.
We'll come back to it later.

This is technically `Reactive`, though it is not yet "there" in spirit.  But,
one step at a time, especially during the learning process.  We'll get there
in this document.

![](http://i0.kym-cdn.com/photos/images/original/000/909/991/48c.jpg)

### Results

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



#### A quick note about `React.js`

There are people who claim that Facebook's `React.JS` is reactive programming.
In practical terms it isn't, and its authors say it isn't, but when people say
that, this is the level at which they are usually thinking, because it is both
possible and common to use react controls as a notation for expressing
computations, then either another `.render()` from top or instructions from one
of the `flux`es (eg `redux`) to re-render.

However, this is example here is honestly just technically `reactive`, in the
way that making a C struct, throwing some function pointers into it, and calling
that `object oriented` would be technically OOP, but would be missing the bits
that made it purposeful.





### So how is that not the real thing?

`React.js` isn't `reactive programming` because it doesn't React to changes.
Instead, it provides the up to date thing on request.

To be fair, the thing we just built has the same problem.  😞

Let's fix it! 😀

To get clarity on the real thing, we'll need to alter our barebones fake and
its bad implementation strategy, to get it to react to changes.

Right now, it goes as far as to know what the correct value is, when asked.
However, someone has to go to the trouble of asking.  So, if we're going to use
this strategy to draw the screen, we need to ask every single screen frame, and
we generate an enormous amount of checking of values and comparing them to
current states.

*What we'd like is for the things that are dependent on this value to be notified that they need to ask, so that the dependent issues will handle themselves, and so that wasteful checks never happen*.

Once you have *that*, you have the *spirit* of `Reactive programming`.





#### Making `RN` fully `reactive` by reacting on its own

A *proper* reactive system needs to actually react to changes as they occur, not
just to have correct calculations on request.  To get that, we'll need to do a
little bit of adding to `RN`.  (Fortunately, in the process, we'll also fix the
repeated computation problem in the previous implementation.)

#### What we'll change

We need to teach the nodes how to listen to each other.

*What follows is an easy to understand toy implementation, which does not try
to handle real world edge cases.*

This is not a smart implementation, and it doesn't even try to handle several
common sense topics, like unsubscribing, or detecting when it's broadcasting to
something that's gone.

But generally speaking, the easy way to go about this is what's called a
"pub/sub" system, which is short for "publish and subscribe."  A pubsub system
generally implements at least `publish`, `subscribe`, and `unsubscribe`, though
we won't bother with `unsubscribe`.

The general idea is to make a metaphor of internet radio: sources provide a
mechanism for consumers to request content ("`publish`,") then consumers notify
sources that they are consuming ("`subscribe`;") then, sources broadcast that a
change has occurred to each consumer of which they are aware.

Because our system is modest and thrown together, we'll just do this with
callback lambdas.

It would be possible to do this magically by setting the `getter`/`setter`s on
the object primitives, but that would be awful, so we won't do that here.





#### Setting up `set`

Right now, our `RN`s can't be changed, though outside sources can change them.
That won't do: we're moving to needing `RN`s for everything, so we need
mutability to be expressed somewhere.  Changes used to come from Javascript
variables; now, to get `pub/sub`, they must come from us.

As a reminder, our old code:

```javascript
class RN { // reactive node

    constructor(comp) { this.comp = comp; }
    get v()           { return this.comp(); }

}
```

We'll begin by adding a simple `set()`ter.  It will become more complex later.

```javascript
class RN { // reactive node

    constructor(comp) { this.comp = comp; }
    set v(newComp)    { this.comp = newComp; }
    get v()           { return this.comp(); }

}
```

This will *work*, but its behavior is counterintuitive: if you set an `RN`'s
`.v` to an integer then try to read it out, it will fail, because the
computation `comp` is expected to be a function.

```
> var X = new RN( () => 42 );
undefined

> X.v;
42

> X.v = 10;
10

> X.v;
VM198:5 Uncaught TypeError: this.comp is not a function(…)
get v @ VM198:5(anonymous function) @ VM278:1

> X.v = () => 10;
() => 10

> X.v;
10
```

Let's make the thing more convenient to use.

There are a bunch of possible responses to this: make two setters, one for
values; test the type on the way in and wrap it with a reader if it's not a
function; check if the thing is a value on emit, and emit safely if not.  There
are ups and downs to each.

We'll take the last, here.  Check if the `comp` is a function at all, and emit
it as a value if not.

```javascript
get v() {
    var isFunc = (typeof this.comp === 'function');
    return isFunc? this.comp() : this.comp;
}
```

Or, as the whole thing,

```javascript
class RN { // reactive node

    constructor(comp) { this.comp = comp; }
    set v(newComp)    { this.comp = newComp; }
    get v() {
        var isFunc = (typeof this.comp === 'function');
        return isFunc? this.comp() : this.comp;
    }

}
```


We can now write almost exactly what we meant originally:

```javascript
var A = new RN(5),
    B = new RN(6),
    X = new RN( () => A.v + B.v );

console.log(X.v);  // 11

A = 15;

console.log(X.v);  // 21
```





# Ugh, efficiency

At this point, we have working reactive.  However, it's very wasteful.  We'll
need to fix that, if we'd like it to be fast in practical use.

Consider the current process of reading `X`.  Every time we read it, even if
there has been no change, it's going to run a method that runs a function, check
two objects, run a method on each, return twice, do some math, and return again.

Similarly, consider the following example: a program that sums five numbers,
averages them, divides by 100 (cents to dollars,) then multiplies by the local
tax amount, then an expected tip.

Simple restaurant calculator, right?

Except at each step, doing that with current `RN`, it's going to redo every
preceding step each time.  So, instead of six steps, that's actually 21.  If you
take just one more step (say, to split the bill,) you recalculate all six
preceding steps too, meaning you've now taken 28 steps.

Clearly this won't do.

We'll fix this twice, actually.  First, we'll get back to what normal imperative
software would normally do, with push caching.  After that, we'll do something
much better: lazy evaluation.

#comeback





## Fixing it once: `notify`, our pubsub

The next step is to set up publish / subscribe.  We're going to do a very
limited system, to keep things simple: one `RN` can tell another `RN` that it
wants change notifications.  Done.  (We won't even implement making them be
removable, though a real implementation would need that.)

When a change notification comes in, the `RN` will recalculate itself on the
spot, then cache the value it gets.  Then, when we call `get`, it'll just return
the cache.

This fixes several problems.  For one, repeated evaluations of `X` no longer
waste recalculations.  For two, chains of dependencies stop calculating
backwards as soon as they hit a cache, potentially obviating entire
calculations.





### Names

We need some naming.  For this document, in the code

```javascript
var A = new RN(5),
    B = new RN(6),
    X = new RN( () => A.v + B.v );
```

We will discuss `A` and `B` as "sources," and `X` as a "target."  It is entirely
possible for a variable to be both a source and a target.





### The cache

First let's add a function that updates the cache.  It's just the old `get`ter,
modified slightly to store the value to a local cache field on its way out.

We're calling the cache `this.value`.

```javascript
update() {
    var isFunc = (typeof this.comp === 'function');
    return this.value = (isFunc? this.comp() : this.comp);
}
```

Next, we replace the `get`ter with a toy one which just emits the cache.

```javascript
get v() {
    return this.value;
}
```

We also modify the constructor to immediately update the cache:

```javascript
    constructor(comp) { this.comp = comp; this.update(); }
```

Which leaves us with the following code:

```javascript
class RN { // reactive node

    constructor(comp) { this.comp = comp; this.update(); }
    set v(newComp)    { this.comp = newComp; }
    get v()           { return this.value; }

    update() {
        var isFunc = (typeof this.comp === 'function');
        return this.value = (isFunc? this.comp() : this.comp);
    }

}
```

At this point, our `RN` no longer wastes calculations, but also no longer
updates; it simply calls its cache always, and gets the old result.

We'll need to teach it to be told when there's a change, next.



### Callbacks

We will start by adding a place for listeners to tell our node that they exist.
This can be as simple as keeping a callback array, providing a function by which
to populate the array, and initializing it in the constructor.

To that end we add an array `this.callbacks`, initalized empty:

```javascript
constructor(comp) {
    this.comp      = comp;
    this.callbacks = [];
}
```

We also add the function `should_notify(cb)`, which can accept either a callback
or an array of callbacks, and simply extends the subscriber list:

```javascript
should_notify(cb) {
    this.callbacks = this.callbacks.concat(cb);
}
```

Further, we'll need a `make_notifier()`, which creates the function that gets
called on the target `RN`, when the source decides to speak up:

```javascript
make_notifier() {
    return (() => this.update());
}
```

Finally, we add to `set/1` such that changes trigger an update and then the
callback chain:

```javascript
    set v(newComp) {
        this.comp = newComp;
        this.update();
        this.callbacks.map(cb => cb());
    }
```

... which all leaves us with the following code:

```javascript
class RN { // reactive node

    constructor(comp) {
        this.comp      = comp;
        this.callbacks = [];
        this.update();
    }

    should_notify(cb) {
        this.callbacks = this.callbacks.concat(cb);
    }

    make_notifier() {
        return (() => this.update());
    }

    set v(newComp) {
        this.comp = newComp;
        this.update();
        this.callbacks.map(cb => cb());
    }

    get v() {
        return this.value;
    }

    update() {
        var isFunc = (typeof this.comp === 'function');
        return this.value = (isFunc? this.comp() : this.comp);
    }

}
```





## Neat.  Why?

So now we have variables that update themselves, instead of variables that you
have to call to get to update.  At this time, other than an efficiency boost,
doesn't seem like that big of a deal.

It is, however, an enabling factor underneath of the last step: streaming.





#





## So, what's the point?

Of course, with an example that trivial, this might seem purposeless.  But an
important understanding here is that responsibility for the processing of
information is in some sense being shifted to its declaration; that the values
and their propagation become a feature of the language, rather than one of the
software being written.

So consider the example of a chat program, like Slack, HipChat, or IRC.
Specifically, let's consider what happens when a user joins a room that you are
already connected to.

In a typical imperative program, you'd have to:

1. Change the user list to include the new name
1. Recompute then assign the new user count
1. Add a message re: the join to the group room
1. Fire a notification window (a "growl") if wanted





### CSS by analogue

### SQL by analogue





### This looks completely different than other reactive





# So why talk about paradigms


# What makes this a paradigm

My personal general rule of thumb for whether something is a paradigm is whether
you can say "having this at the base level of a language really changes how you
work," with a straight face, and mean it.

Consider the case of a small inline





# Related - todo whargarbl

Functional reactive
Lazy computation
Coroutines
