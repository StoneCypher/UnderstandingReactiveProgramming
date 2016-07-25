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



## Spreadsheet example

TODO COMEBACK



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



## Paradigms; why this is Fundamentally Different (tm)
todo comeback



## What is `functional reactive programming` ?
todo comeback



## What we'll do

This tutorial will give a quick overview of Reactive solutions already out there
for Javascript, then dive into a direct, simple implementation of Reactive
programming in JS.  It's much easier to understand Reactive after one has gotten
one's hands dirty in building a system directly.

After that, we'll move ahead to make a project with our Reactive system, to see
how it feels in practice.