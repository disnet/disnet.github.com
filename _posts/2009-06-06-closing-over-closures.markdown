--- 
wordpress_id: 78
layout: post
title: Closing over Closures
wordpress_url: http://disnetdev.com/blog/?p=78
---
Well, it's been quite a while since I've posted on this blog. Sadly life gets in the way of blogging :( Actually, I blame twitter. It's managed to satiate the small amount of writing desire I have (if you can call 140 chars writing).

Anyhow, we'll see if I can crank a few more posts out.

I thought today I'd write a little about programming. It's been too long since the last technical post. In particular let's deal with closures.

Closures are interesting because my first introduction to the topic left me pretty confused. The first example I saw went something like this (in javascript):

<pre lang="javascript">
function adder(a) {
	return function(b) {
		return a + b;
	}
}

var addOne = adder(1);
add(2); 	// gives 3
add(9); 	// gives 10

var addFive = adder(5);
add(5); 	// gives 10
add(20); 	// gives 25
</pre>

While that was cool and somewhat provocative...

<embed src="http://media.entertonement.com/embed/PlayerText.swf" id="1_bcaa9278_524c_11de_95bf_0015c5f4d4ea" name="PlayerText" flashvars="auto_play=0&id=1_bcaa9278_524c_11de_95bf_0015c5f4d4ea&meta_url=http%3A%2F%2Fwww.entertonement.com%2Fclips%2F73046.query%3Fimage_size%3Dflash" width="304" height="30" style="display: block; margin: 10px auto; text-align: center;" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" bgcolor="#ffffff" wmode="transparent" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false">
</embed>

<a href="http://www.entertonement.com/clips/73046/It's-provocative">
<img alt="Blank" border="0" height="0" src="http://www.entertonement.com/widgets/img/clip/73046/1/1_bcaa9278_524c_11de_95bf_0015c5f4d4ea/blank.gif" style="visibility: hidden; width: 0px; height: 0px; margin:0; padding:0; float:right" width="0" />
</a>

...I wasn't quite sure what it meant and it served more to confuse me than anything else. I really had no idea how this would be useful...the adder function not really being a common need I've run across. And I couldn't quite see how to extend the idea.

And there my understanding remained for a time. My day job involved java which won't be getting closures for another 20 years so I thought I was safe. But I finally got around to digging deeper and eventually started grokking it.

The key to understanding was when I realized that closures allowed for private state.

Private state was was one of the most frustrating things about Javascript's object system. Javascript's prototype-based object are of course very different from the class-based system most of us are familiar with. The prototype stuff I got (after a while) but my main hang up was the lack of public/private access specifiers. I found data hiding to be a pretty cool thing and was frustrated that javascript wouldn't let me do it.

It turns out you actually can do information hiding in javascript using closures. Here's the simplified example:

<pre lang="javascript">
var Person = function() {
	var myName;
	return {
		getName: function() {
			return myName;
		},
		setName: function(name) {
			myName = name;
		}
	};
};

var p1 = Person();
p1.setName("bob");
p1.getName(); // gives "bob"
var p2 = Person();
p2.setName("fred");
p2.getName(); // gives "fred"
</pre>

This works because when the outer Person function is called its inner functions need access to all variables that are in scope. So the variable "myName" persists for as long as the instantiation of a Person. And each call of Person creates a new closure.

And there it is! Private variable with setters and getters. This is a good thing because now our object can change how it stores the person's name (maybe it actually should be stored in an array of some sort, or in another internal object), without changing the interface. This lets us isolate details from calling code.

Of course you can do more than just hold onto private state. I certainly haven't groked their full power. Wikipedia has a good [rundown](http://en.wikipedia.org/wiki/Closure_%28computer_science%29) if you're interested.
