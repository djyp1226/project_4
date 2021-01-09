$(document).ready(function(){
    var youth = $('#contect_wrap #cnt1 .youth');
    
    // contect 선그리기
    youth.addClass('on');
    
    // contect 한영 변환 - html로 태그 바꿔주기
    $(window).on('scroll', function () {
        var youth = $('#cnt_wrap #cnt1 .youth');

        if(youth.children('c1_txt').hasClass('view')){
            console.log(this);
            youth.removeClass('view').find('c1_en').css('display','none');
            youth.addClass('view').find('c1_ko').css('display','block');
        }
        else if(youth.children().hasClass('c1_ko')){
            youth.removeClass('view').find('c1_ko').css('display','none');
            youth.addClass('view').find('c1_en').css('display','block');
        }
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
      //1) 초기설정
      // var project = $('#project_wrap #pj_main .pj_list ul')
      
      // project.find('.over_view').hide();
      // project.find('.main_view').on('mouseenter focusin', function () {
      //   // $(this).find('main_view').hide().siblings('over_view').show();
      //   $(this).find('main_view').css({'display': none});
      //   $(this).find('over_view').show();
      // });
});