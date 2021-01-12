$(document).ready(function () {

    //변수 지정
    var _win = $(window);
    var _menu = $('#indicator ul li');
    var _cnt = $('#contact_wrap .contact');
    var tgIdx = 0;
    var cntY; 
    var total = _cnt.length; //6
    var timerResize = 0;
    var timerScroll = 0;
    var timerWheel = 0;
  
    //초기설정
    _menu.eq(0).addClass('on');
  
    //1) resize => 각 본문의 offset().top를 배열에 저장
    _win.on('resize', function () {
      clearTimeout(timerResize);
  
      timerResize = setTimeout(function () {
        cntY = new Array(total);
  
        for (var i = 0; i < total;i++) {
          cntY[i] = _cnt.eq(i).offset().top;
        }
        //console.log(cntY); //[0, 937, 1874, 2811, 3748, 4685] - 6개
  
        //배열.push(추가하고싶은 데이터); 배열의 마지막에 데이터 추가하기
        //푸터가 보여지려면 스크롤바를 가장 마지막까지 내려야 한다 -> 최대한 스크롤바를 움직이려면
        //문서높이 - 윈도창의 높이를 빼주면 된다
        cntY.push( $(document).height() - _win.height());
        //console.log(cntY); // [0, 937, 1874, 2811, 3748, 4685, 4785] - 7개
      }, 50);
    });
    _win.trigger('resize'); 
  
    //2) scroll => 인디케이터 li.on 제어
    _win.on('scroll', function () {
      clearTimeout(timerScroll);
  
      timerScroll = setTimeout(function () {
        var scrollY = $(this).scrollTop();
        //console.log(scrollY);
        _menu.each(function (idx) {
          if (scrollY >= cntY[idx]) {
            $(this).addClass('on').siblings().removeClass('on');
            tgIdx = idx;
          }
        });
      }, 30);
    });
  
    //3) 인디케이터 click  => 인디케이터 li.on / html과 body animate()
    _menu.children().on('click', function () {
      //3-1) 현재 애니메이트가 진행중이면 함수 강제 종료
      if ($('html, body').is(':animated')) return false;
      //3-2) 인디케이터 li.on
      $(this).parent().addClass('on').siblings().removeClass('on');
      //3-3) html과 body animate()
      tgIdx = $(this).parent().index();
      //console.log(tgIdx, cntY[tgIdx]);
      $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 1000, 'easeOutBack');
    });
  
    //4) keydown => 상단방향키, 하단방향키 : html과 body animate()
    $(document).on('keydown', function (e) {
      //4-1) 현재 애니메이트가 진행중이면 함수 강제 종료
      if ($('html, body').is(':animated')) return false;
      //4-2)keyCode 가져오기
      var key = e.keyCode;
      var tg = e.target;
      //console.log(key);
      //4-3) 하단방향키 40
      if (key === 40 && tgIdx < total) tgIdx++;
      //4-4) 상단방향키 38
      else if (key === 38 && tgIdx > 0) tgIdx--;
      //console.log(tgIdx); //값이 중복된다
  
      //★★★★★ 여기 추가 합니다. enter와 space bar를 누르면 화면 전환이 됩니다 => 81라인 변수도 추가해요
      else if ( (key === 13 || key === 32) && $(tg).is('[data-href]') ) {
        tgIdx = $(tg).parent().index();
      }
  
      //4-5) html과 body animate()
      $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 500);
    });
  
    //5) mousewheel => delta 값을 통해 사용자가 휠을 올리고 내리는 것을 판별 : html과 body animate()
    /* 파이어폭스 DOMMouseScroll 이벤트 명 변경(delta 값의 부호가 반대)
      e.originalEvent.detail*-1 (나머지 브라우저와 동일한 부호가 되게 하려고 마이너스를 곱해준다)
      delta - 휠을 내리면 - 음수
      delta - 휠을 올리면 - 양수
    */
    _cnt.on('mousewheel DOMMouseScroll', function (e) {
      clearTimeout(timerWheel);
  
      timerWheel = setTimeout(function () {
        //5-1) 현재 애니메이트가 진행중이면 함수 강제 종료
        if ($('html, body').is(':animated')) return false;
        //5-2) delta 값구하기
        var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
        //console.log(delta);
        //5-3) 휠을 아래로 내리는 경우
        if (delta < 0 && tgIdx < total) tgIdx++;
        //5-4) 휠을 위로 올리는 경우
        else if (delta > 0 && tgIdx > 0) tgIdx--;
        //5-5) html, body를 animate()
        $('html, body').stop().animate({scrollTop: cntY[tgIdx]}, 500);
      }, 100);
    });
  });