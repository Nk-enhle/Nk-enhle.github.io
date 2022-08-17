var _count = 0;
loadProces(_count += 10);
$("img").one("load", function () {
    var len = document.getElementsByTagName('img').length;
    loadProces(_count += (60 / len));
});

function loadProces(_count) {
    $('.count').each(function () {
        $(this).stop().prop('Counter', $(this).text()).animate({
            Counter: _count
        }, {
            duration: 500,
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

if (music_sound != null) {
    if (getCookie('sound') == 'off') {
        $('.header_sound').addClass('mute');
        $('.offf span').text('sound off');
    }
}
window.onload = function () {
    if (window.innerWidth > 1200) {
        if (getCookie('musicRender')) {
            music_sound.currentTime = getCookie('musicRender');
            if (music_sound != null) {
                if (getCookie('sound') == 'off') {
                    $('.header_sound').addClass('mute');
                    $('.offf span').text('sound off');
                    music_click.volume = 0;
                    music_sound.volume = 0;
                    music_close.volume = 0;
                    music_hover.volume = 0;
                    music_open.volume = 0;
                    music_click.volume = 0;
                }
                else {
                    music_sound.play();
                }

            }
        }
        musicRender()

    }
    if (render) {
        render();
    }
    if ($('#three').length) {
        $('html,body').scrollTop(0).addClass('hidden');
    }
    $('.count').each(function () {
        $(this).stop().prop('Counter', $(this).text()).animate({
            Counter: 100
        }, {
            duration: 500,
            step: function (now) {
                $(this).text(Math.ceil(now));
                if (now == 100) {
                    if (music_sound != null) {
                        if (getCookie('sound') == 'off') {
                            $('.header_sound').addClass('mute');
                            $('.offf span').text('sound off');

                        }
                        else {
                            music_sound.play();
                        }

                    }
                    $(this).fadeOut(function () {

                        $('#load').removeClass('active');
                        setTimeout(function () {

                            $('#load').hide();
                            $("img.img_cases").each(function () {
                                var src = $(this).data('src');
                                $(this).attr('src', src);
                            });
                            $('html,body').removeClass('hidden');
                            if (render) {
                                if (window.location.hash) {
                                    $('html,body').animate({scrollTop: $(window.location.hash).offset().top})
                                }
                                time();
                                nextSphereCount(1, 3);
                                resize();

                                canvas.setAttribute('width', docWidth);

                            }

                        }, 1000)
                    });
                }
            }
        });
    });
    if (window.innerWidth > 1200) {
        if (cases_canvas != null) {
            cases_canvas()
        }
    }
};