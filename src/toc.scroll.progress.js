(function ( $, window, document ) {

  var $this;
  var content = {};

  $.fn.tocProgress = function( options ) {

    //reference to the element that called the plugin
    $this = $(this);
    console.log($this);

    var settings = $.extend({
      // Defaults
      storyElem: '.story',
      barsContainer: 'barsContainer',
      barClass: 'toc-storybar',
      headlineSelector: 'h2',
      topText: 'Back to top'
    }, options );
    
    // First hide the table of contents
    $this.hide();

    $(window).load(function() {
      content = thestories();
      $this.prepend('<div class="toc-title">' + $('h1').first().text() + '</div>');
      $this.append('<div id="' + settings.barsContainer + '"></div>');

      setupHTML( settings.storyElem );
      initProgressBars( 
        settings.barsContainer, 
        settings.barClass,
        settings.headlineSelector, 
        settings.topText 
      );

      makeBarsClickable( thestories() );
      $(window).scroll(function(event) {
        calcProgress();
      });
      $this.fadeIn(1000);
      return this;
    
    });
  }

  /* Helpers */
  function Story() {}

  function numStories() {
      var i = 0;
      $('[data-index]').each(function() {
        i++;
      });
      return i;
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

  var initProgressBars = function( barsContainer, barClass, headlineSelector, topText ) {

    var output = "";
    for (var i = 0; i < numStories(); i++) {
      output += '<div class="' + barClass + '";" data-story="'+i+'">';
      output += '<p>' + getHeadline(i, headlineSelector) + '</p>';
      output += '<div class="toc-bar"></div>';
      output += '</div>';
    };

    $( '#' + barsContainer ).append(output);
    $( '.' + barClass ).css('cursor', 'pointer');

    addTopLink( topText ); //

  }

  function addTopLink( wording ) {

    $this.append('<div class="toc-top">' + wording + '</div>');
    $('.toc-top').css('cursor','pointer');
    $('.toc-top').click(function(event) {
      $('body,html').animate({ 'scrollTop': 0 });
    });
  }

  var makeBarsClickable = function() {

    $("[data-story]").each(function(index, el) {
      var scrollTopValue = content[index].top + 2;
      $(this).click(function() {
        $('body,html').animate({'scrollTop': scrollTopValue});
      });
    });

  }

  var getNavContainerHeight = function() {
    return $('.nav-container').height();
  }

  function thestories() {

    var navHeight = getNavContainerHeight();
    var numberStories = numStories();
    //var stories = new Array(numberStories);


    $('[data-index]').each(function(index, el) {
      content[index] = new Story();
      content[index].index = index;
      content[index].height = $(this).height() - navHeight;
      content[index].top = $(this).offset().top - navHeight;
      content[index].bottom = $(this).position().top+$(this).outerHeight(true) - navHeight;

    });

    return content;

  }

  var calcProgress = function() {
    var scrollTop = $(window).scrollTop();
    var temp;
    var width;
    
    if(content != null) {
      $.each(content, function(index, story) {
        temp = scrollTop - story.top;
        width = temp / story.height * 100;
        setBarWidth(story.index, width);
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
