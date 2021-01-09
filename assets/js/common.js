$(document).ready(function () {

  //space(32) = tab(9)  
//   $(window).on('keydown', function (e) {

//     var tab_key = jQuery.Event( "keydown", { keyCode: 9 } );
//     var spacebar = jQuery.Event( "keydown", { keyCode: 32 } );
//     spacebar.trigger(tab_key);
// });

    // 네비게이션
    var _dep1 = $('#gnb ul ul');
    var _first = _dep1.find('[data-link="first"]');
    var _last = _dep1.find('[data-link="last"]');

    $('#nav_box button').on('click', function () {
          $(this).parent().toggleClass('on');
          if ($(this).parent().hasClass('on')) {
            _dep1.stop().animate({
              right: '-100%'
            }, 1000, function () {
              $(this).parent().css({
                visibility: 'hidden'
              });
            });
            $(this).removeClass('on').text('EXIT');
            $(this).parent().parent().css('z-index', '10000');
            
          } else {
            _dep1.css({
              visibility: 'visible'
            }).stop().animate({
              right: 0
            },1000, function () {
              _first.focus();
            });
            $(this).addClass('on').text('MENU');
            $(this).parent().parent().css('z-index', '1000');
          }

          _first.on('keydown', function (e) {
            if (e.shiftKey && e.keyCode === 9) {
              e.preventDefault();
              _last.focus();
            }
          });
          _last.on('keydown', function (e) {
            if (!e.shiftKey && e.keyCode === 9) {
              e.preventDefault();
              _first.focus();
            }
          });
          
        });

    //바깥을 클릭하는 경우도 닫겨진다
    !($('#nav_box')).on('click', function () {
      $('#nav_box button').trigger('click');
    });
    //esc 키보드를 누른 경우도 닫겨진다
    $(window).on('keydown', function (e) {
      //console.log(e.keyCode); //esc 27
      if (e.keyCode === 27) $('#nav_box button').click();
    });
        
    //fade 
    $(window).on('scroll', function () {
      var timer = 0;

      clearTimeout(timer);

      timer = setTimeout(function () {

      var scrollY = $(this).scrollTop();
      $('.fade').each(function () {
          if (scrollY > $(this).offset().top - 900) $(this).addClass('on');
        });
      });
  });
});