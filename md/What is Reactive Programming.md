# What is reactive programming?

Reactive programming is about declaring relationships outside of time, not
current values.

Reactive relationships keep their results up to date.



## TL;DR (Too Long; Didn't Read)

In non-reactive programming, we set variables to values at any given time.

```javascript
const A = 1, B = 2, Sum = A+B;
console.log(`Old sum: ${Sum}`);

A = 10;
console.log(`New sum: ${Sum}`);
```

In traditional imperative programming, `Sum` stays `3` after `A` is reassigned.

In reactive programming, it's updated to the new sum, `12`, instead.



## Relationships vs values

Reactive programming is a fair shift in mindset.  One useful early way to look
at it as "binding relationships, instead of values."

Think about CSS for a moment.  Many of its values are ratios (percentages in
columns and tables, particularly.)  Computed values are explicitly functions
that get kept up to date.  Transitions and animations are relationships
described by labels that are kept up to date through a time process for you.





## Programming without time

Reactive programming is, in one sense, programming independant of time.  If I
can say that a value bears this relationship to these other values,





## Why should you care

A fair sized chunk of a modern program
