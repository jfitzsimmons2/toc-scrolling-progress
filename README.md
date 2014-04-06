# toc-scrolling-progress #

###Create a table of contents with scrolling progress###

View the demos
- [Demo 1](http://jfitzsimmons2.github.io/toc-scrolling-progress/demos/alice/)
- [Demo 2](http://jfitzsimmons2.github.io/toc-scrolling-progress/demos/garden/book.html)

Perfect for:
- long scrolling pages with multiple sections
- news page with multiple articles
- online magazines/books

####Usage####

The plugin is super easy to setup. First create the HTML element that'll be the container for your table of contents. This element must have an ID. Example:

````html
<div id="progress"></div>
````

Load jQuery and the plugin. Then call the plugin.

````html
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="../../src/jquery.toc.scroll.progress.js"></script>
<script type="text/javascript">
  $('#progress').tocProgress();
</script>
````

####Customizing the plugin####

You're able to customize the plugin by styling the CSS classes that it makes. If the default classes aren't suitable, it is possible to override them by passing in new options (examples below).

#####Defaults#####

If you don't specify any options (ie: $('#progress').tocProgress()), here's the default options the plugin will use.

````js
{
  // Use this if you have a fixed navbar at the top
  offsetElem: '.nav-container',

  // This is the wrapper for each chunk of content
  storyElem: '.story',

  // ID of the wrapper around all the progress bars
  barsContainer: 'barsContainer',

  // Class that is used for each bar in the TOC
  barClass: 'toc-storybar',

  // Plugin checks for first occurence of this element 
  // within storyElem to populate the TOC entries
  headlineSelector: 'h2',

  // Text displayed for for the back to top link
  topText: 'Back to top'
}
````

#####Styling#####
Coming soon

###TODO###
- Custom callback functions for events
- Clean up and optimize
- More demos and examples


