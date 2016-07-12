# Table of Contents

1. TOC
1. What is `reactive programming`?
  1. Relationships vs values
  1. Programming without time
  1. Why should you care
1. Initial steps in understanding
  1. Pseudo-JS example
  1. Spreadsheet example
  1. Paradigms; why this is Fundamentally Different (tm)
  1. What is `functional reactive programming` ?
  1. "What's next" - pop, then dig in
1. Popular JS `reactive` libraries
  1. Bacon.js
  1. Kefir.js
  1. Reactivex
1. Building a modest one ourselves
  1. Getting Started
    1. The plan (ish)
    1. Building a rig
  1. Milestones
    1. JRV step 1 - Can read `reactive`ly
    1. JRV step 2 - Values propagate and cache
    1. JRV step 3 - Dirty flag for lazy recalc
    1. JRV step 4 - Values have handlers
    1. JRV step 5 - JRV options
      1. Option 1 - should re-handle/debounce for same-assign?
      2. Option 2 - should immediate recalc w/o handler?
  1. Taking it for a spin
    1. Todo
1. Worldview issues
  1. Benefits
  2. Detriments
  3. Alternatives
  4. Paradigms, revisited
1. Conclusion