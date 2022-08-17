var docWidth, docHeight, docScroll, homeresize, cases_canvas, render;
var _class = '';
var _href = '';
var page;
var link;

if (window.innerWidth > 1200) {
    var music_sound = document.getElementById('music_sound');
    music_sound.volume = .5
    var music_close = document.getElementById('music_close');
    var music_hover = document.getElementById('music_hover');
    var music_open = document.getElementById('music_open');
    var music_click = document.getElementById('music_click');
    music();
}
if (window.innerWidth < 720) {
    $('.txta').appendTo($('.json'));
}
$(document).ready(function () {
    resize();
    $('.title span, .new-cases_title span').each(function () {
        var _text = $(this).text();
        $(this).html('<span class="hide">' + _text + '</span>')
    });
});
$(window).resize(function () {
    resize()
});
$(document).scroll(function () {
    docScroll = $(window).scrollTop();
    if (docScroll > 100 && docScroll < $(document).height() - docHeight - 100) {
        $('.header_logo span, .social, .email, .head_scroll').addClass('hide');

    }
    else {
        $('.header_logo span, .social, .email, .head_scroll').removeClass('hide');
    }
    if (docScroll > 100) {
        $('.header_logo span, .email, .head_scroll').addClass('hide');
    }


});

function resize() {
    docWidth = $(window).width();
    docHeight = $(window).height();
    docScroll = $(window).scrollTop();
    if (homeresize != null) {
        homeresize();
    }
}

$(document).keyup(function (e) {
    if (e.keyCode === 27) {
        if ($('.menu_open.active').length) {
            if (window.innerWidth > 1200) {
                music_close.play();
            }
            $('.menu_ico').fadeIn();
            $('.menu_open').removeClass('active');
            setTimeout(function () {
                $('body').removeClass('hidden');
            }, 500);
        }
    }
});

$('.menu_ico').mousemove(function () {
    $('.menu').addClass('hover');
    $('.header_left').addClass('hover');
});
$('.menu_ico').hover(function () {
    $('.menu').addClass('hover');
    $('.header_left').addClass('hover');
}, function () {
    $('.menu').removeClass('hover');
    $('.header_left').removeClass('hover');
});
$('.menu_ico, .header_tab_menu').click(function () {
    $(this).fadeOut();
    $('.menu_open ').addClass('active');
    $('body').addClass('hidden');
    if (homeresize != null) {
        $('.section').each(function () {
            var _top = $(this).offset().top;
            if (docScroll > _top - docHeight / 2) {
                var _e = $(this).find('.section_title_text').eq(0);
                $('.other-2').css('top', _e.offset().top - docScroll).text(_e.text());
            }
        });
    }

});
$('.menu_open_close').click(function () {
    if (window.innerWidth > 1200) {
        music_close.play();
    }
    if ($('.menu_open.active').length) {
        $('.menu_ico').fadeIn();
        $('.menu_open').removeClass('active');
        setTimeout(function () {
            $('body').removeClass('hidden');
        }, 500);
    }
});
$('.menu_in-page a').click(function () {
    var href = $(this).attr('href').replace(/^.+#/g, '#');
    var _e = $(href).find('.section_title_text').eq(0);
    if (_e.length) {
        $('.other-2').fadeOut(300, function () {
            $(this).css('top', _e.position().top).text(_e.text()).fadeIn(300, function () {
                $('.menu_ico').fadeIn();
                $('.menu_open').removeClass('active');
                setTimeout(function () {
                    $('body').removeClass('hidden');
                }, 500);
            });
        });
    }

});

$('.open_ul').click(function () {
    var _t = 0;
    $(this).parent().toggleClass('open').find('ul').slideToggle().find('a').each(function () {
        var _this = $(this);
        setTimeout(function () {
            _this.toggleClass('open');
        }, _t++ * 100);
    });
});

$('.careers_item').click(function () {
    $('.careers_item').removeClass('active');
    $('.careers_content').stop().slideUp();
    $(this).addClass('active').next().stop().slideDown();
});


function music() {
    $('a, .services_item, .header_sound, .menu_open_close, .open_ul, .careers_item, .menu_ico').mouseenter(function () {
        music_hover.play();
    });

    $('a,.menu_ico, .services_item, .header_sound, .menu_open_close, .open_ul, .careers_item').click(function () {
        music_click.play();
    });
    $('.careers_item, .new-cases_link, .menu_ico ').click(function () {
        music_open.play();
    });

    $('.header_sound').click(function () {
        $('.header_sound').toggleClass('mute');
        if ($('.header_sound').hasClass('mute')) {
            music_sound.pause();
            music_click.volume = 0;
            music_sound.volume = 0;
            music_close.volume = 0;
            music_hover.volume = 0;
            music_open.volume = 0;
            music_click.volume = 0;

            document.cookie = "sound = off";
        }
        else {
            music_sound.play();
            document.cookie = "sound = on";
            music_click.volume = 1;
            music_sound.volume = .5;
            music_close.volume = 1;
            music_hover.volume = 1;
            music_open.volume = 1;
            music_click.volume = 1;
        }
    });

}


window.onbeforeunload = function (e) {
    musicRender()
}

function musicRender() {
if(music_sound) {
    document.cookie = "musicRender = " + music_sound.currentTime;
}
}

$(document).scroll(function () {
    var _classNext = '';
    var _hrefNext = '';
    var _cases = '';

    $('.-anim-to-top').each(function () {
        var _top = $(this).offset().top;
        if (docScroll > _top - docHeight / 1.5) {
            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });


    $('.clients_image').each(function () {
        var _top = $(this).offset().top;
        if (docScroll > _top - docHeight / 2) {
            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });
    $('.section').each(function () {
        var _top = $(this).offset().top;
        if (docScroll > _top - docHeight / 2) {
            _classNext = $(this).data('class');
            _hrefNext = $(this).data('id');
        }
    });
    $('.new-cases_item:visible').each(function () {
        var _top = $(this).offset().top;
        if (docScroll > _top - docHeight / 2) {
            $(this).addClass('active');
        }
    });
    // $('.g').removeClass('active');
    // if (_cases) _cases.addClass('active');
    if (_href != _hrefNext) {
        _href = _hrefNext;
        if (_class != _classNext) {
            _class = _classNext;
            $('body').removeClass().addClass(_class);
        }
        $('.header_text').removeClass('active');
        $('.section').removeClass('active');
        $('#' + _href).addClass('active');
        $('.' + _href + '-text').addClass('active');
        $('.menu_in-page li').removeClass('active');
        $('.menu_in-page a[href="#' + _href + '"]').parent().addClass('active');
    }
    $('.new-cases_line').each(function () {
        var _this = $(this);
        var translate = _this.next().offset().top - docScroll - (docHeight / 2 - _this.next().height() / 2);
        _this.css({transform: 'translateY(' + translate / 5 + 'px)'});
    });
});


function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


$(document).on('click', '.btn', function (e) {
    e.preventDefault();
    $('#form').addClass('active');
    $('input.f').click().focus();
    $('form,#form .btn ,#form .title:not(.center)').show();
    $('#form .title.center').hide();
});
$('.form_close').click(function (e) {
    e.preventDefault();
    $('#form').removeClass('active');
});


$(document).on('click', '#form .btn', function (e) {
    $("form").submit();
});

$(document).on('submit', "form.json", function (e) {
    e.preventDefault();
    var error = false;
    $(this).find('.form-group').each(function () {
        if ($(this).hasClass('required')) {
            var input = $(this).find("input");
            if (input.val() == '') {
                input.parent().addClass('has-error');
                error = true;
            }
            else {
                input.parent().removeClass('has-error');
            }
        }
        if ($(this).find("input.mail").length) {
            var email = $(this).find("input.mail");

            if (!validateEmail(email.val())) {

                email.parent().addClass('has-error');
                error = true;
            }
            else {
                email.parent().removeClass('has-error');
            }
        }
    });
    if (error == true) {
        return false;
    }
    var _this = this;
    var _data = $(this).serialize();
    var _action = $(this).attr('action');
    $.post(
        _action,
        _data,
        onAjaxSuccess(_this)
    )
});

function onAjaxSuccess(el) {
    var requestFormClass = 'js-send-request';

    $('form,#form .btn ,#form .title:not(.center)').hide();
    $('#form .title.center').fadeIn('400');
    $('.form-control').val('');

    if ( $(el).hasClass(requestFormClass) ) {
        dataLayer.push({'event': 'Otpravka_form'});
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[­[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

formLable()

function formLable() {
    $('.form-control').each(function () {
        if ($(this).val() != '') $(this).parent().addClass('focus');
    });
    $('.form-control').blur(function () {
        if ($(this).val() == '') $(this).parent().removeClass('focus');
    });
    $('.form-control').focus(function () {
        $(this).parent().addClass('focus');
    });
    $('.form-control').mouseover(function () {
        if ($(this).val() != '') $(this).parent().addClass('focus');
    });
}


$('.hover-js').hover(function (e) {
    var img = $(this).attr('src');
    $('body').append('<div class="hover-js-block"><img src="' + img + '"></div>');

}, function () {
    $('.hover-js-block').remove();
});
$('.hover-js').mousemove(function (e) {
    var n = 3
    var x = e.pageX - $(this).offset().left - (100 / n);
    var y = e.pageY - $(this).offset().top - (100 / n);
    var x2 = e.pageX;
    var y2 = e.pageY;
    $('.hover-js-block').css({'left': x2, 'top': y2}).find('img').css({
        'left': -x * n,
        'top': -y * n,
        'width': $(this).width() * n
    })
})