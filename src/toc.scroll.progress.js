/* I'm learning how to make a jQuery plugin */

(function ( $, window, document ) {

  $.fn.tocProgress = function( options ) {

    //reference to the element that called the plugin
    var $this = $(this);

    var settings = $.extend({
      // Defaults
      storyElem: '.story',
      barsContainer: 'barsContainer',
      barClass: 'toc-storybar',
      headlineSelector: 'h2',
      barColorBG: 'gray',
      barColor: 'blue',
      topText: 'Back to top'
    }, options );
    
    $this.prepend($('h1').first().text());
    $this.append('<div id="' + settings.barsContainer + '"></div>');

    setupHTML( settings.storyElem );
    initProgressBars( 
      settings.barsContainer, 
      settings.barClass, 
      settings.barColorBG, 
      settings.headlineSelector, 
      settings.topText 
    );

    makeBarsClickable( thestories() );
    $(window).scroll(function(event) {
      calcProgress(settings.barColor);
    });
    return this;

  }

  /* Helpers */
  function Story() {}

  var numStories = function() {     
    return $('[data-index]');
  }

  var getHeadline = function( i,elem ) {
    return $('[data-index='+i+'] ' + elem + '').first().text();
  }

  var setupHTML = function( storyElem ) {
    console.log(storyElem);
    $( storyElem ).each(function(index, el) {
      $(this).attr({ 'data-index': index });
    });

  }

  var initProgressBars = function( barsContainer, barClass, barColorBG, headlineSelector, topText ) {

    var numStories = 4;
    var output = "";
    for (var i = 0; i < numStories; i++) {
      output += '<div class="' + barClass + '" style="background: ' + barColorBG + ';" data-story="'+i+'">';
      output += '<p>' + getHeadline(i, headlineSelector) + '</p>';
      output += '<div class="toc-bar"></div>';
      output += '</div>';
    };

    $( '#' + barsContainer ).append(output);
    $( '.' + barClass ).css('cursor', 'pointer');
    addTopLink( topText ); //

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

  var calcProgress = function(color) {
    var scrollTop = $(window).scrollTop();
    var temp;
    var width;

    s = thestories();
    if(thestories != null) {
      $.each(s, function(index, story) {
        temp = scrollTop - story.top;
        width = temp / story.height * 100;
        setBarWidth(story.index, width, color);
      });

    }
  }

  function setBarWidth(index, width, color) {

    var elem = $("[data-story=" + index + "]");
    var bar = $("[data-story=" + index + "] .toc-bar");
    // user has scrolled passed
    if (width > 100) {
      elem.css('font-weight', 'normal');
      bar.css({
          width: "100%",
          background: color
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
          background: color
      });
    }

  }

})( jQuery, window, document );
