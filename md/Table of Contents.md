# Table of Contents

1. [What is `reactive programming`](#what-is-reactive-programming-)?
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
    1. Step 1 - Can read const `reactive`ly
    1. Step 2 - Mutable JRV
    1. Step 3 - Values propagate and cache
    1. Step 4 - Values have handlers
    1. Step 5 - Dirty flag for lazy recalc
    1. Step 6 - pure call handler
    1. Step 7 - JRV options
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