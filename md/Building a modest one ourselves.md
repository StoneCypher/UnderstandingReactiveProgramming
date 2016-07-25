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
## Milestones
### JRV step 1 - Can read const `reactive`ly
### JRV step 2 - Mutable JRV
### JRV step 3 - Values propagate and cache
### JRV step 4 - Dirty flag for lazy recalc
### JRV step 5 - Values have handlers
### JRV step 6 - pure call handler
### JRV step 7 - JRV options
#### Option 1 - should re-handle/debounce for same-assign?
#### Option 2 - should immediate recalc w/o handler?
## Taking it for a spin
### Implementing a Side Project Revenue calculator
