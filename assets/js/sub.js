$(document).ready(function(){
  var _youth = $('#contact_wrap #cnt1 .youth div');
    
  // contect 선그리기
  _youth.parent().addClass('on');
  
  // contect 한영 변환 - html로 태그 바꿔주기
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop();
    // 스크롤바를 움직이면 영어는 .view를 제거하고 바로 뒤 한글에는 .view를 추가한다
    if (scrollY > 1) _youth.find('.c1_txt').removeClass('view').next().addClass('view');
  });

    // acce 달 회전 
    
    // acce 버튼 클릭
    $('#acce_wrap #acce_main button').on('click', function () {
        $('#acce_wrap #acce_main').css('display', 'none');
    });

    // acce 탭
    $('#acce_tab #tab_box .tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr({tabIndex: 0});
    $('#acce_tab #tab_box .tab:first-of-type').attr({'aria-selected': true}).siblings().attr('aria-selected', false);
    $('#acce_tab #tab_box .tabpanel:first-of-type').attr({'aria-hidden': false}).siblings('.tabpanel').attr('aria-hidden', true);
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
          case 36:  //home
            e.preventDefault();
            $(this).siblings('.first').attr('tabIndex', 0).focus();
            break;
          case 35: //end
            e.preventDefault();
            $(this).siblings('.last').attr('tabIndex', 0).focus();
            break;
          case 13:  //enter
          case 32:  //spacebar
            var _tg = $(this);
            tabActive(_tg);
        }
     })
        $('.tab').on('click', function () {
            var _tg = $(this);
            tabActive(_tg);
          });
             function tabActive(_target) {
        _target.addClass('active').attr({tabIndex: 0, 'aria-selected': true}).siblings().removeClass('active').attr({tabIndex: -1, 'aria-selected': false});
        var tgPanel = _target.attr('aria-controls');
        $('#' + tgPanel).addClass('active').attr({tabIndex: 0, 'aria-hidden': false}).siblings('.tabpanel').removeClass('active').attr({tabIndex: -1,'aria-hidden': true});
    }

    // project main_view display:none

      var project = $('#project_wrap #pj_main .pj_list ul')
  
      project.find('.over_view').hide();
      project.find('li').on('mouseenter focusin', function () {
        if($(this).hasClass('main_view')) 
        {$(this).hide().siblings('.over_view').show();}

        else if($(this).hasClass('over_view')) {
          $(this).on('mouseleave focusout', function () {
            ('.over_view').siblings('.main_view').show();
          });
        }
      });
});