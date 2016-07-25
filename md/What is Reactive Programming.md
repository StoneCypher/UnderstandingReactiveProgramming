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

1. That first `console.log` should say that `Sum` is `11`.
1. The second `console.log` should still say that `Sum` is `11`, because the
   addition was done at a specific time, before the change happened.
1. *In languages with a `reactive` notation*, like in spreadsheets, `Sum` would
   change to `21` in the second `console.log`.

That is, in `reactive` languages, *what `Sum` expresses is addition of `A` and
`B` as a continuing relationship*, not the immediate result value.

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
to the extent that a `Haskell`, `OCaml`, or `LISP` person would, and nailing
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