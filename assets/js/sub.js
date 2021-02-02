$(document).ready(function () {
  var timer = 0;
    var $win = $(window);
    var $menu = $('#wrap #contact_wrap #indicator ul li');
    var $cntWrap = $('#wrap #contact_wrap #contact_box');
    var tgIdx = 0; 
    var total = $cntWrap.children().size();
    var winWidth; 
    var timerResize = 0;
    var timerWheel = 0;

    $menu.eq(0).addClass('on');
    $win.on('resize', function () {
        clearTimeout(timerResize);
        timerResize = setTimeout(function () {
            winWidth = $win.width();
            $cntWrap.css('width', winWidth * total).children().css('width', winWidth);
        }, 100);
    });
    $win.trigger('resize');

    $menu.children().on('click', function (e) {
        e.preventDefault();

        //3-1) 현재 애니메이트(.cnt_wrap) 중이면 함수 강제 종료
        if ( $cntWrap.is(':animated') ) return false;
        tgIdx = $(this).parent().index(); //인디케이터 li의 인덱스번호
        console.log(tgIdx);
        //3-2) 클릭한 인디케이터가 활성화
        $(this).parent().addClass('on').siblings().removeClass('on');
        //3-3) 애니메이트(.cnt_wrap)
        $cntWrap.stop().animate({marginLeft: tgIdx * winWidth * -1}, 700);
    });

    $cntWrap.on('mousewheel DOMMouseScroll', function (e) {
        clearTimeout(timerWheel);

        timerWheel = setTimeout(function () {
            if ( $cntWrap.is(':animated') ) return false;

            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            if (delta < 0  && tgIdx < total - 1) {
                tgIdx++;
            } else if (delta > 0 && tgIdx > 0) {
                tgIdx--;
            }
            $menu.eq(tgIdx).addClass('on').siblings().removeClass('on');
            $cntWrap.stop().animate({marginLeft: tgIdx * winWidth * -1}, 700);
        }, 200);
    });
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        var tg = e.target;
        if ( $cntWrap.is(':animated') ) return false;
        if ( (key === 39 || key === 40) && tgIdx < total - 1 ) tgIdx++;
        else if ( (key === 37 || key === 38) && tgIdx > 0 ) tgIdx--;
        else if ( (key === 13 || key === 32) && $(tg).is('[data-href]') ) {
            tgIdx = $(tg).parent().index();
        }
        $menu.eq(tgIdx).addClass('on').siblings().removeClass('on');
        $cntWrap.stop().animate({marginLeft: tgIdx * winWidth * -1}, 700);
    });

  var _youth = $('#contact_wrap #cnt1 .youth');
  // circle fix 변수 선언

  var circle = $('#pj_more_wrap .gra_circle');
  // contact 선그리기
  _youth.addClass('on');

  // contact 한영 변환 - html로 태그 바꿔주기
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop();

    // if (scrollY > 1) _youth.find('.c1_txt').removeClass('view').next().addClass('view');

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