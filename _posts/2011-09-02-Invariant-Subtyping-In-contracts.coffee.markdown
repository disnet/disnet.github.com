--- 
layout: post
title: Invariant Subtyping In contracts.coffee
---

So the response I've been getting for [contracts.coffee](http://disnetdev.com/contracts.coffee/) has been absolutely incredible! Tons of positive feedback and some great excitement.

I've also heard a few worries that contracts are too much like static types and might not be such a good fit for a dynamic language like CoffeeScript or JavaScript. Now, I don't want to get into a huge debate over the merits of static vs. dynamic typing (that way leads to madness and holy wars) but I would like to clarify that I really think contracts fit very nicely into the dynamic "ethos" of CoffeeScript/JavaScript.

In dynamic languages like CoffeeScript and JavaScript you'll often hear about [duck typing](http://en.wikipedia.org/wiki/Duck_typing) where we don't care about the "type" of an object (I'm being fast and loose in my wording here, don't get mad), just the stuff on the object we actually need to use. So the classic example is a "file-like" object where all we care about are the few properties we actually use in the code (like `open`, `read`, `close`, etc.). As long as the properties exist we're good. If a property don't exist in the object and we try to use it, just throw an exception so we can track down the bug.

Contracts allow us to extend this concept a bunch without sacrificing the flexibility we dynamic language users love about duck typing. To start out let's consider the simple case of a missing property. Let's first define a contract for a binary tree:

{% hightlight coffeescript %}
# A basic binary tree
BinaryTree = ?(Null or {
	node: Num
	left: Self or Null
	right: Self or Null
})
{% endhighlight %}

Pretty simple, a binary tree is either `null` or has a `node` and two children that are also binary trees. A function can now say it expects something like a `BinaryTree`:

{% hightlight coffeescript %}
f :: (BinaryTree) -> ...
f = (tree) ->
  n = tree.node
  ...
{% endhighlight %}

And if we call `f` with something that isn't quite a binary tree:

{% hightlight coffeescript %}
broken_tree = 
	nodee: 42  # misspelled!
	right: null
	left: null

f broken_tree
{% endhighlight %}

We will get a very descriptive error message:

<pre style="color: red">
Contract violation: expected &lt;{node : Num}&gt;, actual: "[missing property: node]"
Value guarded in: coffee-script.js:53 -- blame is on: coffee-script.js:56
Parent contracts:
{node : Num}
({node : Num}) -> any </pre>

Now we already have an obvious win over no contracts since we fail as soon as we try to access the property that doesn't exist. If we weren't using contracts, `n` would get the value `undefined` which might not surface as an obvious problem until much later. We also haven't lost any flexibility since all we've done by adding contracts is specify exactly what our code requires; we're not setting up complicated type hierarchies to appease a static type system (don't get mad static type affectionados: I like static types too, just not in my Coffee).

In addition to an early failure, we get lots of information in the error message about what was missing, which contract was violated, and which module was to blame (a powerful notion I explain a little [here](http://disnetdev.com/contracts.coffee/#use) but which deserves a future blog post).

But we're just getting warmed up :)

Objects can also have arbitrary invariants that get checked whenever properties are changed. So we can have a contract for a binary search tree:

{% hightlight coffeescript %}
# A binary search tree is a binary tree where each node is greater
# than the right child but less than the left child
BinarySearchTree = ?(Null or {
	node: Num
	left: Self or Null
	right: Self or Null
	| invariant: ->
		(@.node > @.left.node) and (@.node < @.right.node)
})
{% endhighlight %}

And a [red-black tree](http://en.wikipedia.org/wiki/Red-black_tree):

{% hightlight coffeescript %}
# A red-black tree is a binary search tree 
# that maintains a balance
RedBlackTree = ?(Null or {
	node: Num
	color: Str
	left: Self or Null
	right: Self or Null
	| invariant: ->
		(@.color is "red" or @.color is "black") and
		(if @.color is "red" then (@.left.color is "black" and @.right.color is "black") else true) and
		(@.node >= @.left.node) and (@.node >= @.right.node) and
})
{% endhighlight %}

Note that our contract for a red-black tree is the same as a binary search tree with the addition of the `color` property and some invariants about color. We have a kind of subtyping going on here: code that expects a binary search tree will also work with a red-black tree but *not* visa versa.

Now our functions can "duck-type" the invariants on the objects they accept:

{% hightlight coffeescript %}
takesBST :: (BinarySearchTree) -> Any
takesBST = (bst) ->
	...

takesRedBlack :: (RedBlackTree) -> Any
takesRedBlack = (rbTree) ->
	...

bst = makeBinarySearchTree()	
rb = makeRedBlackTree()

takesBST bst # works fine
takesBST rb  # works fine

takesRedBlack rb  # works fine
takesRedBlack bst # might fail if the full red-black invariants don't hold!
{% endhighlight %}

These functions not only specify that they require certain properties but also that certain invariants must hold. This is really powerful! The function that only requires the behavior of a binary search tree can accept a red-black tree just fine and the function that requires the behavior of a red-black tree but is given just a binary search tree will probably fail (just as we want it to).



