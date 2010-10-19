--- 
layout: post
title:  Visualizing Javascript
---

If you've ever written much code you are probably are familiar with
holding mental models of a program in your head. Since our heads are
somewhat limited you've also probably used some sort of aid to help
remember, think and communicate about that model. This could be simple
and low tech like scribbling down boxes and arrows on a whiteboard or
complicated like UML and Visio.

But what if you don't have the model, either in your head or on paper?
What happens when you come to a new codebase where the experts who
undertand it are unavailable? Or perhaps the codebase is yours but
you've forgotten how it all works?

One way to solve this is to extract the program model automatically
and use some kind of visualization to help you regain your mental
model. 

There are a few tools out there that do this for static languages like
[SolidSX](http://www.solidsourceit.com/products/SolidSX-source-code-dependency-analysis.html)
for Java and C# which maps code relationships using a ring with
lines connecting classes that depend on each other.

<div style="text-align: center">
<img alt="SolidSX"
src="http://www.solidsourceit.com/img/SolidSX-XNA-example-small.jpg"
/>
</div>

There is also a haskell
[example](http://donsbot.wordpress.com/2009/03/16/visualising-the-haskell-universe/)
of visualizing the types from all the packages on Hackage.

![Hackage Universe](http://donsbot.files.wordpress.com/2009/03/haskell_universe.jpg?w=600&h=300)

Unfortunately I wasn't able to find much in the way of tooling for
dynamic languages like Javascript. The best us JS coders have for
visualization our code's data structures is the Firebug DOM exploration
window.

<img width="600" alt="firebug DOM window"
src="http://getfirebug.com/perch/resources/dom.gif" />

So I decided to try and remedy the situation a little. Last spring I
had the chance to take a visualization class.
