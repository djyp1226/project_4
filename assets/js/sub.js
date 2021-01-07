$(document).ready(function(){
    var youth = $('#contect_wrap #cnt1 .youth');
    
    // contect 선그리기
    youth.addClass('on');
    
    // contect 한영 변환
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
    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr({tabIndex: 0});

});