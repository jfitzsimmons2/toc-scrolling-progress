function viewport() {
  var e = window, a = 'inner';

  if ( !( 'innerWidth' in window ) ) {
    a = 'client';
    e = document.documentElement || document.body;
  }

  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function Story() {

}

function positionTOC() {
  $('#progress').css({
    'width': '222px',
    'max-width': '336px',
    'right':  '0',
    'z-index': 2,
  });
}

function getNavContainerHeight() {
  return $('.nav-container').height();
}

function createStoryObjects() {

  var navHeight = getNavContainerHeight();
  var numberStories = getNumStories();
  var stories = new Array(numberStories);


  $('[data-index]').each(function(index, el) {
    stories[index] = new Story();
    stories[index].index = index;
    stories[index].height = $(this).height() - navHeight;
    stories[index].top = $(this).offset().top - navHeight;
    stories[index].bottom = $(this).position().top+$(this).outerHeight(true) - navHeight;

  });

  if ($('[data-index]').length) {
    //Reduce the last story's height value by 35% to ensure scroll full progress bar
    stories[numberStories-1].height = stories[numberStories-1].height * .65;

    return stories;
  }

}

function getNumStories() {
  var num = 0;
  $('[data-index]').each(function(index, el) {
    num++;
  });

  return num;
}

function getHeadline(i,elem) {
  return $('[data-index='+i+'] ' + elem + '').first().text();
}

function initProgressBars() {
  var numStories = getNumStories();
  var output = "";
  for (var i = 0; i < numStories; i++) {
    output += '<div class="storybar" data-story="'+i+'">';
    output += '<p>' + getHeadline(i, 'h2') + '</p>';
    output += '<div class="bar"></div>';
    output += '</div>';
  };

  $("#barsContainer").append(output);
  $('#progress').prepend($('h1').first().text());
  $('.storybar').css('cursor', 'pointer');
  addTopLink('take me to the top'); //

}

function addTopLink(wording) {
  $('#progress').append('<div class="top">' + wording + '</div>');
  $('.top').css('cursor','pointer');
  $('.top').click(function(event) {
    $('body,html').animate({'scrollTop': 0});
  });
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
    elem.css({'font-weight': 'bold','color': 'rgb(19, 80, 39)'});
    bar.css({
        width: width + "%",
    });
  }

}

function setupHTML() {

  $('.story').each(function(index, el) {
      $(this).attr({ 'data-index': index });
  });

}

function makeBarsClickable() {

  $("[data-story]").each(function(index, el) {
    var title = $(this).children('p').text();
    var scrollTopValue = thestories[index].top + 2;
    $(this).click(function() {
      
      $('body,html').animate({'scrollTop': scrollTopValue});

    });
  });

}


function calcProgress() {
  var scrollTop = $(window).scrollTop();
  var temp;
  var width;

  if(thestories != null) {
    $.each(thestories, function(index, story) {
      temp = scrollTop - story.top;
      width = temp / story.height * 100;
      setBarWidth(story.index, width);
    });

  }
}

function atBottom() {
  //console.log($(window).scrollTop() + $(window).height() + " / " + ($(document).height() - 25));
  if(($(window).scrollTop() + $(window).height()) > ($(document).height() - 25)) {
    return true;
  } else {
    return false;
  }
}

$(document).ready(function() {


  setupHTML();
  initProgressBars();
  setTimeout(function() {
    thestories = createStoryObjects();
    makeBarsClickable();
  },1000);
  positionTOC();

});

$(window).scroll(function() {
  calcProgress();
});