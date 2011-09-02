--- 
layout: post
title: Invariant Subtyping In contracts.coffee
---

So the response I've been getting for [contracts.coffee](http://disnetdev.com/contracts.coffee/) has been absolutely incredible!

One example that wasn't on the homepage when it was released 


{% hightlight coffeescript %}
# A basic binary tree
BinaryTree = ?(Null or {
	node: Num
	left: Self or Null
	right: Self or Null
})

# A binary heap is a binary tree where each node is greater than
# both of its children
BinaryHeap = ?(Null or {
	node: Num
	left: Self or Null
	right: Self or Null
	| invariant: ->
		(@.node >= @.left.node) and (@.node >= @.right.node)
})

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

Now here's where things get pretty cool. In dynamic languages like CoffeeScript and JavaScript you'll often hear about [duck typing](http://en.wikipedia.org/wiki/Duck_typing) where we don't care about the "type" of an object (I'm being fast and loose in my wording here, don't get mad), just the stuff on the object we actually need to use. So the classic example is a "file-like" object where all we care about are the few properties we actually use in the code (like `open`, `read`, `close`, etc.). As long as the properties exist we're good. If a property don't exist in the object and we try to use it, just throw an exception so we can track down the bug.

Contracts allow us to extend this concept a bunch. To start out let's consider the simple case of a missing property. Let's first define a contract for a binary tree:

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

Now we already have an obvious win over no contracts since we fail as soon as we try to access the property that doesn't exist. If we weren't using contracts, `n` would get the value `undefined` which might not surface as an obvious problem until much later.

In addition we get lots of information in the error message about what was missing, which contract was violated, and which module was to blame (a powerful notion I explain a little [here](http://disnetdev.com/contracts.coffee/#use) but which deserves a future blog post).

But we're just getting warmed up :)

Objects can also have invariants that get checked whenever properties are changed. So we can have a contract for a binary search tree:

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

And a binary heap:

{% hightlight coffeescript %}
# A binary heap is a binary tree where each node is greater than
# both of its children
BinaryHeap = ?(Null or {
	node: Num
	left: Self or Null
	right: Self or Null
	| invariant: ->
		(@.node >= @.left.node) and (@.node >= @.right.node)
})
{% endhighlight %}

Now our functions can "duck-type" the invariants on the objects they accept:

{% hightlight coffeescript %}
takesBST :: (BinarySearchTree) -> Any
takesBST = (bst) ->
	...

takesHeap :: (BinaryHeap) -> Any
takesHeap = (heap) ->
	...
{% endhighlight %}


These functions not only specify that they require certain properties but also that certain invariants must hold. 



