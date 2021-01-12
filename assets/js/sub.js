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

    // 스크롤바를 움직이면 영어는 .view를 제거하고 바로 뒤 한글에는 .view를 추가한다
    if (scrollY > 1) _youth.find('.c1_txt').removeClass('view').next().addClass('view');

    //circle fix
    clearTimeout(timer);
    timer = setTimeout(function () {
      console.log(scrollY);
      if (scrollY > 705) {
        circle.css({position: 'fixed',top: '-540px'});
      } else{
        circle.css({position: 'absolute',top: '180px'});
      }
    }, 50);

    // pj_more greensock
    //가속도 감속도 효과 https://greensock.com/get-started#easing
    //gsap.to('선택자', {속성1: 값1, 속성2: 값2, duration: 초});
    //to : 0%에서 100% 순방향 애니메이션
    // gsap.to('#pj_more_wrap #bioterm_wrap #bio5 ul li', {top: '100px', width: '1000px', ease: "slow.easeInOut", duration: 3});
    $('.pj_m5 ul li').each(function (index, element) {
      if (scrollY > $(this).offset().top - 500) {
          gsap.to(element, {y: 0, x: 0,ease: "power1.bounce",duration: 8});
      }
    });
    /* from이 안되어서 to로 변경함
    $('#bio5 ul li').each(function (index, element) {
      if (scrollY > $(this).offset().top - 500) {
        if (index % 2 === 0){ //짝수
          gsap.from(element, 2, {y: 130, x: -130,ease: "power1.bounce",duration: 3, opacity: 0});
        } else { //홀수
          gsap.from(element, 2, {y: 130,x: 130,ease: "power1.bounce",duration: 3, opacity: 0});
        }
      }
    }); */
  
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

  // project 카드
  $('#project_wrap #pj_main .pj_list ul').on({
    'mouseenter focusin': function () {
      $(this).find('.open').css({display: 'block'});
    },
    'mouseleave focusout': function () {
      $(this).find('.open').css({display: 'none'});
    }
  });

});