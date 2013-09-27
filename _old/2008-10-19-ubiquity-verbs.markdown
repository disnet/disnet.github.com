--- 
layout: post
title: Ubiquity Verbs
---
If you haven't heard about it by now there's a new extension for firefox
that is, as they say, the coolest thing ever! It's called
[Ubiquity](http://labs.mozilla.com/projects/ubiquity/) and is headed by
Aza Raskin of [Enso](http://www.humanized.com/) (the windows application
launcher and then some) fame. The big idea he's been chasing in both
enso and now ubiquity is linguistic interfaces. It's an incredibly
compelling idea that I'll let him explain:

<object width="400" height="298">	
<param name="allowfullscreen" value="true" />	
<param name="allowscriptaccess" value="always" />
<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=1561578&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" />	
<embed src="http://vimeo.com/moogaloop.swf?clip_id=1561578&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="400" height="298">
</embed>
</object>
<br />
<a href="http://vimeo.com/1561578?pg=embed&sec=1561578">Ubiquity for Firefox
</a> 
from 
<a href="http://vimeo.com/user532161?pg=embed&sec=1561578">Aza Raskin
</a> on 
<a href="http://vimeo.com?pg=embed&sec=1561578">Vimeo
</a>.

The great thing about ubiquity is how incredibly easy it is to write new
commands. For example I was frustrated the other day at work switching between
development, testing and production environments in my browser. I was
getting bug tickets with a link pointing to issues on the testing
server which I then had to manually modify to point at my development
server (by changing a subdomain and port).

So, [http://test.foo.com/long/path/to/file.jsp?with=query&string=too](http://test.foo.com/long/path/to/file.jsp?with=query&string=too)
became
[http://dev.foo.com:8080/long/path/to/file.jsp?with=query&string=too](http://dev.foo.com:8080/long/path/to/file.jsp?with=query&string=too).

Now this wasn't an incredibly onerous task to be sure but it's
repeatable...and we have computers for those sorts of things. So I
cooked up a little ubiquity verb called
[switch](http://disnetdev.com/commands.html) which does just
that. Subscribe and then you can just type `switch this to <subdomain>
port <port>` and you're done!

Here's the entire source in case you're interested:

<pre lang="javascript" line="1">
var custom_mappings = { "local" : ["timd0","8080"] };

CmdUtils.CreateCommand({
    name: "switch",
    author: {name: "Tim Disney", email: "tim.disney@gmail.com"},
    license: "GPL",
    description: "Switch the subdomain and optionally port of a url",
    help: "This command switches the subdomain (eg 'www' in www.google.com) and optionally port to whatever you like. This is particularly useful if you have multiple environments differentiated only by the subdomain that you would like to quickly switch between (ie development, testing and production environments)",
    takes: {"URL to switch": noun_arb_text},
    modifiers: {"to": noun_arb_text, "port": noun_arb_text},

    _switchUrl: function(url, env, port) {
        var reUrl = /(http[s]?://)([^/]*)[/]?(.*)/;
        var matchUrl = reUrl.exec(url);

        if (!matchUrl) { return ""; }

        var protocol = matchUrl[1];
        var host = matchUrl[2];
        var path = matchUrl[3];

	// pull out domain, subdomain, and port
        var reHost = /([^.]*)([^:]*)(.*)/;
        var matchHost = reHost.exec(host);

        var domain = matchHost[2];

        var subdomain = (env != null) ? env : matchHost[1];

        port = (port != null &amp;&amp; port != "") ? ":" + port : "";
	/* special case in any custom subdomain/port mappings */
        if (env in custom_mappings) {
            subdomain = custom_mappings[env][0];
            port = ":" + custom_mappings[env][1];
        }

        return protocol + subdomain + domain + port + "/" + path;
    },

    execute: function(url, mods) {
        var switched = this._switchUrl(url.text,
			 mods.to.text, mods.port.text);
        CmdUtils.setSelection(switched, {"text": switched});
    },

    preview: function(pbody, url, mods) {
        pbody.innerHTML = "switch selected url to: <em>"
	  + this._switchUrl(url.text, mods.to.text, mods.port.text) + "</em>";
    }
});
</pre>
