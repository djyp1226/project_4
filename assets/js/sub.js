$(document).ready(function () {
  var _youth = $('#contact_wrap #cnt1 .youth div');
  // circle fix 변수 선언
  var timer = 0;
  var circle = $('#pj_more_wrap .gra_circle');

  // contact 선그리기
  _youth.parent().addClass('on');

  // contact 한영 변환 - html로 태그 바꿔주기
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop();

    // var numCnt = $('.cnt').size();
    // var widSec = 200*numCnt;
    // var widTotal = widSec+600;
    // $('#contact_wrap').width(widTotal);
    // $('contact_wrap').height(widSec);		
    // $('html, body').animate({scrollTop:widSec}, 2000);
    
    // $(window).on('scroll',function(){
    //   var scroll = $(this).scrollTop();			
    //   $('#contact_wrap').stop().animate({left: -scroll}, 600);
    // });

    if (scrollY > 1) _youth.find('.c1_txt').removeClass('view').next().addClass('view');

    //circle fix
    clearTimeout(timer);
    timer = setTimeout(function () {
      console.log(scrollY);
      if (scrollY > 705) {
        circle.css({position: 'fixed',top: '-540px','z-index': '5001'});
      } else{
        circle.css({position: 'absolute',top: '180px','z-index': 0 });
      }
    }, 50);

    $('#pj_more_wrap .pj_m5 ul li').each(function (index, element) {
      if (scrollY > $(this).offset().top - 500) {
       gsap.to(element, {y: 0, x: 0,ease: "power1.bounce", duration: 1, opacity: 1});
      }
    });
  
  });

  // acce 버튼 클릭
  $('#acce_wrap #acce_main button').on('click', function () {
    $('#acce_wrap #acce_main').css('display', 'none');
  });

  // acce 탭
  $('#acce_tab #tab_box .tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr({abIndex: 0});
  $('#acce_tab #tab_box .tab:first-of-type').attr({
    'aria-selected': true
  }).siblings().attr('aria-selected', false);
  $('#acce_tab #tab_box .tabpanel:first-of-type').attr({
    'aria-hidden': false
  }).siblings('.tabpanel').attr('aria-hidden', true);
  $('#acce_tab #tab_box .tab').on('keydown', function (e) {
    var key = e.keyCode;
    switch (key) {
      case 39: //오른쪽 방향키
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('last')) {
          $(this).siblings('.first').attr('tabIndex', 0).focus();
        } else {
          $(this).next().attr('tabIndex', 0).focus();
        }
        break;
      case 37: //왼쪽 방향키
        $(this).attr('tabIndex', -1);
        if ($(this).hasClass('first')) {
          $(this).siblings('.last').attr('tabIndex', 0).focus();
        } else {
          $(this).prev().attr('tabIndex', 0).focus();
        }
        break;
      case 36: //home
        e.preventDefault();
        $(this).siblings('.first').attr('tabIndex', 0).focus();
        break;
      case 35: //end
        e.preventDefault();
        $(this).siblings('.last').attr('tabIndex', 0).focus();
        break;
      case 13: //enter
      case 32: //spacebar
        var _tg = $(this);
        tabActive(_tg);
    }
  })
  $('.tab').on('click', function () {
    var _tg = $(this);
    tabActive(_tg);
  });
  function tabActive(_target) {
    _target.addClass('active').attr({
      tabIndex: 0,
      'aria-selected': true
    }).siblings().removeClass('active').attr({
      tabIndex: -1,
      'aria-selected': false
    });
    var tgPanel = _target.attr('aria-controls');
    $('#' + tgPanel).addClass('active').attr({
      tabIndex: 0,
      'aria-hidden': false
    }).siblings('.tabpanel').removeClass('active').attr({
      tabIndex: -1,
      'aria-hidden': true
    });
  }

  // project main

  $('#project_wrap #pj_main .pj_list ul').on({
    'mouseenter focusin': function () {
      $(this).addClass('flip');
    },
    'mouseleave focusout': function () {
      $(this).removeClass('flip');
    }
  });

});