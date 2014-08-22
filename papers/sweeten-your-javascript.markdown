---
layout: paper
subtitle: Sweeten Your JavaScript - Hygienic Macros for ES5
title: Sweeten Your JavaScript - Hygienic Macros for ES5
published:
  - name: DLS 2014
    files:
      - name: PDF
        link: /papers/sweetjs.pdf
authors:
  - name: Tim Disney
    link: http://disnetdev.com/
  - name: Nathan Faubion
    link: https://github.com/natefaubion
  - name: David Herman
    link: http://calculist.org/
  - name: Cormac Flanagan
    link: http://users.soe.ucsc.edu/~cormac/
abstract:
  Lisp and Scheme have demonstrated the power of macros to
  enable programmers to evolve and craft languages. In languages with
  more complex syntax, macros have had less success. In part, this has
  been due to the difficulty in building expressive hygienic macro
  systems for such languages. JavaScript in particular presents unique
  challenges for macro systems due to ambiguities in the lexing stage
  that force the JavaScript lexer and parser to be intertwined.



  In this paper we present a novel solution to the lexing ambiguity of
  JavaScript that enables us to cleanly separate the JavaScript lexer
  and parser by recording enough history during lexing to resolve
  ambiguities. We give an algorithm for this solution along with a
  proof that it does in fact correctly resolve ambiguities in the
  language. Though the algorithm and proof we present is specific to
  JavaScript, the general technique can be applied to other languages
  with ambiguous grammars.
  With lexer and parser separated, we then implement
  an expressive hygienic macro system for JavaScript called sweet.js.
---
