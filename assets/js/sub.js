$(document).ready(function () {
  var _youth = $('#contact_wrap #cnt1 .youth div');

  // contact 선그리기
  _youth.parent().addClass('on');

  // contact 한영 변환 - html로 태그 바꿔주기
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop();
    // 스크롤바를 움직이면 영어는 .view를 제거하고 바로 뒤 한글에는 .view를 추가한다
    if (scrollY > 1) _youth.find('.c1_txt').removeClass('view').next().addClass('view');
  });

  // acce 버튼 클릭
  $('#acce_wrap #acce_main button').on('click', function () {
    $('#acce_wrap #acce_main').css('display', 'none');
  });

  // acce 탭
  $('#acce_tab #tab_box .tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr({
    tabIndex: 0
  });
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
  var project = $('#project_wrap #pj_main .pj_list ul')
  project.on('mouseenter focusin', function () {
    $(this).find('.open').css({
      'display': 'block'
    })
  });
  project.on('mouseleave focusout', function () {
    $(this).find('.open').css({
      'display': 'none'
    })
  });

  // circle fix
  var timer = 0;
  var circle = $('#pj_more_wrap .gra_circle');

  $(window).on('scroll', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (scrollY > 705) {
        circle.css({
          position: 'fixed',
          top: '-540px'
        });
      } else {
        circle.css({
          position: 'absolute',
          top: '180px'
        });
      }
    });
  });

  // pj_more greensock
  //가속도 감속도 효과 https://greensock.com/get-started#easing
  //gsap.to('선택자', {속성1: 값1, 속성2: 값2, duration: 초});
  //to : 0%에서 100% 순방향 애니메이션
  // gsap.to('#pj_more_wrap #bioterm_wrap #bio5 ul li', {top: '100px', width: '1000px', ease: "slow.easeInOut", duration: 3});

  var timer = 0;

  $(window).on('scroll', function () {
      var winH = $(this).height();
      var pjTxt = $('#pj_more_wrap .pj_m5 ul li');
      // var pjTxtH = outerHeight(true);
      var pjTxtTop = pjTxt.offset().top;
      var pjTxtEven = $('#pj_more_wrap .pj_m5 ul li:nth-child(odd)')
      var pjTxtOdd = $('#pj_more_wrap .pj_m5 ul li:nth-child(even)')
      
      console.log(winH);
      console.log(pjTxtTop);

    clearTimeout(timer);
    timer = setTimeout(function () {
      if (scrollY > pjTxt.offset().top - 100) {
        // alert();
        console.log(pjTxt);
        gsap.from(pjTxtEven, 2, {
            top: 130,
            right: 130,
            ease: "power1.bounce",
            duration: 15,
            repeat: -1
            // ,yoyo: true
          });
          gsap.from(pjTxtOdd, 2, {
            top: 130,
            left: 130,
            ease: "power1.bounce",
            duration: 15,
            repeat: -1
            // ,yoyo: true
          });
        }
    });
  });
});