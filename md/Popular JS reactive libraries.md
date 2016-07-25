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