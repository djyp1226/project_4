  
$(document).ready(function () {
  // 네비게이션
  var _gnb = $('#gnb');
  var _first = _gnb.find('[data-link="first"]'); 
  var _last = _gnb.find('[data-link="last"]');
  var _dim;

  $('#nav_box button').on('click', function () {
    if ($(this).parent().hasClass('on')) { 
      console.log(_dim.attr('id'));
      _dim.stop().fadeOut('fast', function () {
        $(this).remove();
      });
      $('#nav_box').stop().animate({right: '-750px'}, 500, function () {
        $(this).children('#gnb').css({visibility: 'hidden'});
      });
      $(this).text('MENU').parent().removeClass('on').parent().css('z-index', '10000');

    } else {
      $('#nav_box').before('<div id="dim"></div>');
      _dim = $('#dim');
      _dim.stop().fadeIn('fast');
      _gnb.css({visibility: 'visible'});
      $(this).parent().stop().animate({right: 0}, 500, function () {
        _first.focus();
      });
      $(this).text('EXIT').parent().addClass('on').parent().css('z-index', '1000');
    }

    $('#nav_box button').on('keydown', function (e) {
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        _last.focus();
      }
    });
    _last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $('#nav_box button').focus();
      }
    });

    _dim.on('click', function () {
      $('#nav_box button').trigger('click');
    });

    $(window).on('keydown', function (e) {
      if (e.keyCode === 27) $('#nav_box button').click();
    });
  });


  //fade 
  var timer = 0;
  $(window).on('scroll', function () {
    clearTimeout(timer);

    timer = setTimeout(function () {
      var scrollY = $(this).scrollTop();
      $('.fade').each(function () {
        if (scrollY > $(this).offset().top - 900) $(this).addClass('on');
      });
    }, 50);
  });
});