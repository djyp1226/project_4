$(document).ready(function () {

    $('#cnt1 .bgm .bgm_play').on('click', function () {
        var audio = new Audio('../music/HansZimmer_FirstStep.ogg');

        audio.src = '../music/HansZimmer_FirstStep.ogg';
        audio.loop = true; // 반복재생하지 않음
        audio.volume = 0.5; // 음량 설정
        audio.play(); // sound1.mp3 재생
    });
        // 인트로

        var _typing = $('#typing p');

        //1) #typing 요소의 텍스트 가져오기
        var text = _typing.text();
        //console.log(text); //var=space;
        //2) #typing 내부 제거
        _typing.html('');
        //3) #typing 내부 문자를 한 글자씩 잘라 배열에 저장
        var chars = text.split('');
        //console.log(chars); //['v', 'a', 'r', '=', 's', 'p', 'a', 'c', 'e', ';']
        //4) 배열 chars의 각 문자들을 span 요소를 생성해 #typing에 추가
        //$.each()메서드 => $.each(배열명, function(index번호, value값) {});
        $.each( chars, function( index, value ) {
            //console.log( index + ': ' + value );
            if (index <= 2) {
                _typing.append($('<span class="color"></span>').text(value));
            } else {
                _typing.append($('<span></span>').text(value));
            }
        });
        //5) 글자를 표시하기 전의 지연 시간(ms)
        var delayStart = 50;
        //6) 타이핑 속도(ms)
        var speed = 150;
        //7) 글자들을 보이지 않게 설정한 다음 한 글자씩 화면에 표시
        _typing.children().hide().each(function (index) {
            var delay = delayStart + speed * index;
            $(this).delay(delay).show(10);
        });

        var $caret = $('<p></p>').attr('id', 'caret').css({
            width: '0.4em',
        }).appendTo(_typing);
        _typing.children(':not(#caret)').hide().each(function (index) {
            var delay = delayStart + speed * index;
            $(this).delay(delay).show(10);
        });
});