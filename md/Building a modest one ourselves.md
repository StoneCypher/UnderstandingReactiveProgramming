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
a custom `getter`.

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

All this really does is take a function in the constructor, then offer a
`getter` which runs the function when gotten.  The `getter`, `.v`, represents
the "value" of the `JRV`, and with time will have more complex behavior.

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

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.



#### Current code

The full implementation now looks like

```javascript
class JRV { // js reactive variable

    constructor(comp) { this.comp = comp; }
    get v()           { return this.comp() }

}
```



#### Problem

This is technically `reactive`, though it is not yet "there" in spirit.  But,
one step at a time, especially during the learning process.  We'll get there
in this document.

![](http://i0.kym-cdn.com/photos/images/original/000/909/991/48c.jpg)

Note that this doesn't do the thing that most people expect from `reactive`
systems, yet - it doesn't actually "react" to changes.  It just has updates in
place at all times.  But the "react" part is the part people want, and where the
name comes from.

It's coming up.

The first thing we should fix is making the value computation updatable.



### JRV step 2 - Mutable JRV

It's important to be able to change the value of a JRV.  Currently, we cannot.

#### What do we need?

To do this, we'll need to add a `setter` to complement the `getter` for `.v`.

#### Let's do it

```javascript
class JRV {

    constructor(comp) { this.comp = comp; }
    set v(newComp)    { this.comp = newComp; }

    get v() { return this.comp(); }

}
```



#### Results

Not a huge or shocking change here, since we're early on.  We use the same
example, but now we change some underlying computations and show that the change
took, as well.

We're going to implement all the variables as `JRV`s this time, so that we have
something to change, and something derived from them to call.

```javascript
var A = new JRV( () => 0 ),
    B = new JRV( () => 5 ),
    X = new JRV( () => A.v + B.v );

console.log( X.v );

A.v = () => 10; console.log( X.v );
A.v = () => 20; console.log( X.v );
A.v = () => 30; console.log( X.v );

X.v = () => (A.v*2) + (B.v*2);
console.log( X.v );
```

And, that works.  But, honestly, it'd be nice if we didn't have to write arrows
to return simple values, like in A and B there; we should be able to just have
constants there.  We can't, currently, because the `getter` assumes that the
thing in `.comp` storage is a function, and can be called.  So, if you pass an
integer to the `constructor`, the `JRV` will try to call the integer - say,

```javascript
5();
```

... which is nonsense.

The easiest way is to check, in the getter, whether the thing in `.comp` is a
function; if so to call it; if not, to return it directly.

So, we'll change

```javascript
    get v() { return this.comp(); }
```

To

```javascript
    get v() {
        var isFunc = (typeof this.comp === 'function');
        return isFunc? this.comp() : this.comp;
    }
```

As a result, we can now write

```javascript
var A = new JRV(0),
    B = new JRV(5),
    X = new JRV( () => A.v + B.v );

console.log( X.v );

A.v = 10; console.log( X.v );
A.v = 20; console.log( X.v );
A.v = 30; console.log( X.v );

X.v = () => (A.v*2) + (B.v*2);
console.log( X.v );
```

And that's rather nicer.

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.



#### Current code

The full implementation now looks like

```javascript
class JRV {

    constructor(comp) { this.comp = comp; }
    set v(newComp)    { this.comp = newComp; }

    get v() {
        var isFunc = (typeof this.comp === 'function');
        return isFunc? this.comp() : this.comp;
    }

}
```


#### Problem

At this point, we have an adequate notation.  However, this approach is very
slow.

Consider the case of a system where `F` depends on `E`, which depends on `D`,
and so on back to `A`.

In our current system, if we make a change to `D` then inspect `F`, every
computation back to `A` will be repeated, wastefully.

Let's fix that, with propagation and caching.



### JRV step 3 - Values propagate and cache

So for efficiency's sake, let's have the values cache.  To do that, we'll also
need the values to update themselves (because if they cached without updating)
themselves, they'd just be out of date all the time, and then what's the point?



#### What do we need?

Getting values to cache means storing the last value we've seen from them, and
reporting that from the getter, instead of executing directly.

This also means that `JRV`s need to know what depends on them, so that they can
notify the dependencies of a change.

To do that, we'll build a `notifier factory` to make `notifier`s for the
dependant, and we'll make a method on the dependency called `.should_notify`
that tells it to call the `notifier` that we pass to it.

One significant consequence of this approach is that ***`JRV`s must now rely on
other `JRV`s***, because normal variables don't know to call notifiers when
they're set.

(You could alter the `__prototype__` of the primitive types to change that, but
that'd be awful, and would trigger all kinds of security and practical problems,
so, don't.)



#### Let's do it

We start by adding a method `.update`, which can update an internally stored
value to its new state.

```javascript
update() {
    var isFunc        = (typeof this.comp === 'function');
    return this.value = (isFunc? this.comp() : this.comp);
}
```

This is roughly the same as the previous `getter`: check if the stored
computation is a `function`; assign to `value` either the function, called,
or the non-function; return what was assigned.  In this way, `.value` becomes
our value cache.

Following that, the `getter` is reduced to the much simpler returning of the
cached value:

```javascript
get v() {
    return this.value;
}
```

Next, we need to make the `notifier factory`.  This turns out to be quite
straightforward: it's just a `function` that returns another `function` that
we make on the spot, which just calls `.update` on this `JRV`.  We will call
what we return `notifier`s, which is not a technical term, but helps clarify
what's being done.

```javascript
make_notifier() {
    return (() => this.update());
}
```

To use this, the dependency will need to be made aware of the notifier.  We can
set that up with `.should_notify`, a method we can pass the notifier to.

```javascript
    should_notify(cb) {
        this.callbacks = this.callbacks.concat(cb);
    }
```

Looks like we're just going to push it onto the back of an array called
`this.callbacks`.  Of course, `this.callbacks` doesn't exist yet, so, let's
make sure to init that in the `JRV`'s constructor, to an empty array:

```javascript
    constructor(comp) {
        this.comp      = comp;
        this.callbacks = [];
        this.update();
    }
```

As you can see, we also added an `.update()` at the end of the constructor, to
make sure that the `JRV` was entirely up to date once set up.

Finally, we should modify the `setter` to make an `.update` call and then notify
the dependencies manually:

```javascript
    set v(newComp) {
        this.comp = newComp;
        this.update();
        this.callbacks.map(cb => cb());
    }
```



#### Results

Now we have `JRV`s which actively update themselves, and cache their values,
eliminating one large source of inefficiency: wasted recalculation.

```javascript
var A   = new JRV(0),
    B   = new JRV(5),
    Sum = new JRV( () => A.v + B.v );

A.should_notify(Sum.make_notifier());
B.should_notify(Sum.make_notifier());

console.log( Sum.v );

A.v = 10; console.log( Sum.v );
A.v = 20; console.log( Sum.v );
A.v = 30; console.log( Sum.v );

Sum.v = () => (A.v*2) + (B.v*2);
console.log( Sum.v );
```

That's kinda gross, though, that `.should_notify` bit.  Any large extensive use
of this library, that'd get out of control, fast, especially for computations
with a bunch of dependencies.

Most problematically, it puts the conceptual burden of the dependency on the
sources, instead of on the conclusion.  This means that one has to go manually
handle every single dependency one at a time, instead of just giving a list of
what's upstream of the thing you're thinking about at the time.  Not only is
that cumbersome and error-prone, but you also need to do it inline, breaking the
conceptual flow of your computation with a bunch of manual chaff.

We can make a method `.needs` to fix the problem.

All `.needs` will do is accept an array of the `JRV`s that are upstream, and
walk their `.should_notify` methods with our caller's `notifier`.  (For
convenience it'll also accept a non-array single upstream parent.)

```javascript
needs(Dep) {
    if (Array.isArray(Dep)) { Dep.map(d => d.should_notify(this.make_notifier())); }
    else                    { Dep.should_notify(this.make_notifier()); }
    return this;
}
```

As a result, instead of writing

```javascript
var Sum = new JRV( () => A.v + B.v );

A.should_notify(Sum.make_notifier());
B.should_notify(Sum.make_notifier());
```

We may now write

```javascript
var Sum = new JRV( () => A.v + B.v ).needs([A,B]);
```

Which leads to a much more pleasant and readable authoring experience:

```javascript
var A = new JRV(0),
    B = new JRV(5),
    X = new JRV( () => A.v + B.v ).needs([A,B]);

console.log( X.v );

A.v = 10; console.log( X.v );
A.v = 20; console.log( X.v );
A.v = 30; console.log( X.v );

X.v = () => (A.v*2) + (B.v*2);
console.log( X.v );
```

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.



#### Current code

The full implementation now looks like

```javascript
class JRV { // reactive node

    constructor(comp) {
        this.comp      = comp;
        this.callbacks = [];
        this.update();
    }

    should_notify(cb) {
        this.callbacks = this.callbacks.concat(cb);
    }

    needs(Dep) {
        if (Array.isArray(Dep)) { Dep.map(d => d.should_notify(this.make_notifier())); }
        else                    { Dep.should_notify(this.make_notifier()); }
        return this;
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
        var isFunc        = (typeof this.comp === 'function');
        return this.value = (isFunc? this.comp() : this.comp);
    }

}
```



#### Problem

Consider again the same case of a system where `F` depends on `E`, which depends
on `D`, and so on back to `A`.

This time, suppose that `E`, `F`, and `G` are generally unused except initially.
We're mostly interested in `D`.

If we change `A`, then we care that `D` gets re-cached, but we keep eagerly
updating `E`, `F`, and `G`, which (if we aren't using them) is another, probably
lesser form of waste.

Let's kill that waste too, by implementing lazy updates.



### JRV step 4 - Dirty flag for lazy recalc
#### What do we need?
#### Let's do it
#### Results

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.

#### Problem



### JRV step 5 - Values have handlers
#### What do we need?
#### Let's do it
#### Results

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.

#### Problem



### JRV step 6 - pure call handler
#### What do we need?
#### Let's do it
#### Results

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.

#### Problem



### JRV step 7 - JRV options
#### What do we need?
#### Let's do it
#### Results

There's a [playground here](#todo_comeback_whargarbl) if you'd like to
experiment before continuing.

#### Problem



#### Option 1 - should re-handle/debounce for same-assign?
#### Option 2 - should immediate recalc w/o handler?
## Taking it for a spin
### Implementing a Side Project Revenue calculator
