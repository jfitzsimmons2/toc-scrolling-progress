/* I'm learning how to make a jQuery plugin */

(function ($, window, document) {

	

	$.fn.tocProgress = function( element, options ) {

		var settings = $.extend({
			// Defaults
			storyElem: '.story',
			barClass: '.storybar',
			headlineSelector: 'h2',
			barColor: 'lightgray',
			position: 'fixed'
		}, options );

		var plugin = this;

		setupHTML( settings.storyElem );
		initProgressBars( settings.barClass, settings.headlineSelector );
		makeBarsClickable( thestories() );
		addss();
		return this;

	}

	var addss = function() {
		window.scroll(function(event) {
			calcProgress();
		});
	}

	/* Helpers */
	function Story() {

	}
	var numStories = function() {			
		return $('[data-index]');
	}

	var getHeadline = function( i,elem ) {
	  return $('[data-index='+i+'] ' + elem + '').first().text();
	}


	var setupHTML = function( storyElem ) {

	  $( storyElem ).each(function(index, el) {
	    $(this).attr({ 'data-index': index });
	  });

	}

	var initProgressBars = function( barClass, headlineSelector ) {
		var numStories = 4;
	  var output = "";
	  for (var i = 0; i < numStories; i++) {
	    output += '<div class="' + barClass + '" data-story="'+i+'">';
	    output += '<p>' + getHeadline(i, headlineSelector) + '</p>';
	    output += '<div class="bar"></div>';
	    output += '</div>';
	  };

	  $("#barsContainer").append(output);
	  jQuery('#progress').prepend($('h1').first().text());
	  jQuery('.storybar').css('cursor', 'pointer');
	  addTopLink('take me to the top'); //

	}

	var addTopLink = function( wording ) {
	  $("#progress").append('<div class="top">' + wording + '</div>');
	  $('.top').css('cursor','pointer');
	  $('.top').click(function(event) {
	    $('body,html').animate({ 'scrollTop': 0 });
	  });
	}

	var makeBarsClickable = function( thestories ) {

	  $("[data-story]").each(function(index, el) {
	    var title = $(this).children('p').text();
	    var scrollTopValue = thestories[index].top + 2;
	    $(this).click(function() {
	      
	      $('body,html').animate({'scrollTop': scrollTopValue});

	    });
	  });

	}

	var getNavContainerHeight = function() {
	  return $('.nav-container').height();
	}

	var thestories = function() {

	  var navHeight = getNavContainerHeight();
	  var numberStories = numStories();
	  var stories = new Array(numberStories);


	  $('[data-index]').each(function(index, el) {
	    stories[index] = new Story();
	    stories[index].index = index;
	    stories[index].height = $(this).height() - navHeight;
	    stories[index].top = $(this).offset().top - navHeight;
	    stories[index].bottom = $(this).position().top+$(this).outerHeight(true) - navHeight;

	  });

	  return stories;

	}

	var calcProgress = function() {
	  var scrollTop = $(window).scrollTop();
	  var temp;
	  var width;

	  thestories = thestories();

	  if(thestories != null) {
	    $.each(thestories, function(index, story) {
	      temp = scrollTop - story.top;
	      width = temp / story.height * 100;
	      setBarWidth(story.index, width);
	    });

	  }
	}

	function setBarWidth(index, width) {

	  var elem = $("[data-story=" + index + "]");
	  var bar = $("[data-story=" + index + "] .bar");
	  // user has scrolled passed
	  if (width > 100) {
	    elem.css('font-weight', 'normal');
	    bar.css({
	        width: "100%",
	    });
	  // user is before the story
	  } else if (width < 0) {
	    elem.css('font-weight', 'normal');
	    bar.css({
	        width: "0%",
	    });
	  // user is on the story
	  } else {
	    elem.css({'font-weight': 'bold'});
	    bar.css({
	        width: width + "%",
	    });
	  }

	}

 $.fn.pluginName = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('tocProgress')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.tocProgress(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('tocProgress', plugin);

            }

        });

    }

})( jQuery, window, document );
