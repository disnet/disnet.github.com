---
layout: default
metacontent: Various pieces of code written by Tim Disney
subtitle: Code
stylesheets:
- /code/vis.css
scripts:
- /code/jit.js
- /code/jquery-1.4.2.js
- /code/jquery-ui-1.8.1.custom.min.js
- /code/jsvis.js
---

JSVis
-----

<script type="text/javascript">
var VIS = undefined;
$(document).ready(function() {
  $("#btnHere").click(function() {
    if(VIS === undefined) {
      VIS = new JSVis();
      VIS.init();
    }
    else {
      $("#infovis").css("display", "block");
    }
  }); 
});
</script>

JSVis is an object visualization for JavaScript code. It runs through all the objects it can 
find in the global namespace and shows their relationships in a node-link vis.

It uses the awesome [JavaScript InfoVis Toolkit](http://thejit.org/) to do the heavy visualization
lifting. 

To try it out click <a id="btnHere" href="#">here</a>.

This was originally a class project and you can check out the project 
[website](http://www.soe.ucsc.edu/classes/cmps261/Spring10/projects/projects/tdisney/proj/index.html) 
for some of the rational behind it. 

The latest and greatest code (and maybe documentation) can be found on 
[github](http://github.com/disnet/jsvis).

Grail Search
------------

A little interactive fiction game I wrote for class. See the [post](blog/2010/06/20/becoming-a-more-informed-programmer/) I wrote for more details.

* [Inform7 code](/code/grail_search.inform)
* [zblorb binary](/code/grail_search.zblorb)


[Webvo](http://code.google.com/p/webvo/)
-----

This is what I spent most of my time on during the fall of '06. Webvo is a web-based PVR system. It provides easy recording of television shows without the hassle of VCRs. It is similar to TiVo and MythTV except that it uses a browser interface only. The cool/useful thing about it is that you can manage your PVR from any computer that can see the webvo server.

All the backend code was written in ruby and the frontend used ajax techniques with the beautiful MochiKit javascript library.

* Project is hosted by google [here](http://code.google.com/p/webvo/)
* Installation instructions [here](http://code.google.com/p/webvo/wiki/Setup)
* Discussion group [here](http://groups.google.com/group/webvo-discuss)
* Download code [here](http://webvo.googlecode.com/files/webvo.tar.gz)

[BRISC](http://brisc.sourceforge.net)
-------

BRISC is what I, along with my partners in crime, Mike and Mailan, worked on summer '06 for the REU MediX program. It is a content based image retrieval system for CT lung nodules. It's a nifty app that allows the user to search for images (lung nodules in this case) based only on the features inherent in a given query image. This means there is no need to manually annotate every single image in the database.

We released it under the GPL and have it hosted over at <a href="http://sourceforge.net">Sourceforge</a>. Check it out, download it, change the source, make it better! Do it all at <a href="http://brisc.sourceforge.net/">here</a>.
