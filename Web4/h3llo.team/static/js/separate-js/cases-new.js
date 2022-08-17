addEventListener("scroll", function () {
    if (innerWidth > 1200) {
        $('.scroll').each(function (i) {
            var top = $(this).parent().offset().top - (innerHeight - $(this).height()) / 2;
            var marg = 0;
            var marg = $(this).data('split');
            if (top > scrollY - innerHeight * 1.5 && top < scrollY + innerHeight * 1.5) {
                $(this).css('transform', 'translateY(' + -(scrollY - top) * marg / 2 + 'px)');
            }
        });
    }
    if (innerWidth > 1200) {
        $('.pin_ico:not(.stop)').each(function (i) {
            var offset = $(this).offset().top;
            if (docScroll + docHeight * .7 > offset) {
                $(this).addClass('stop').click();
            }
        });
    }
    $('video').each(function () {
        var offset = $(this).offset().top;
        if (docScroll + docHeight > offset && docScroll < offset + $(this).height() && docWidth > 1200) {
            $(this)[0].play();
        }
        else {
            $(this)[0].pause();
        }
    });
    $('.head').each(function () {
        var offset = $(this).offset().top;
        if (docScroll + docHeight * .7 > offset) {
            $(this).removeClass("border");
        }

    });
    $('.case-anim').each(function () {
        var offset = $(this).offset().top;
        if (docScroll + docHeight * .7 > offset) {
            $(this).addClass("active");
        }
        else {
            $(this).removeClass('active');
        }
    });

});


var _font = "300px Gotham Pro Bold";
$(document).ready(function () {
    if (docWidth < 1200) {
        $('video').each(function () {
            $(this).attr('controls', 'true');
        })
    }
    if (innerWidth < innerHeight * 1.77) {
        $('.split_i').addClass('horizontal');
    }
    else {
        $('.split_i').removeClass('horizontal');
    }
    cases_canvas()
});

$(window).resize(function () {
    if (innerWidth < innerHeight * 1.77) {
        $('.split_i').addClass('horizontal');
    }
    else {
        $('.split_i').removeClass('horizontal');
    }
    if (window.innerWidth > 1200) {
        requestAnimationFrame(cases_canvas);
    }
})

$('.pin_ico').click(function () {
    $(this).parent().toggleClass('active')
});

function cases_canvas() {

    if (docWidth < 1600) {
        _font = "200px Gotham Pro Bold";
    }

    $('.cases_image').each(function () {
        $('.cases_item').not('fade').show();
        $(this).addClass('load');

        if ($(this).width() / $(this).height() > $(this).find('img').width() / $(this).find('img').height()) {
            $(this).find('img').height('auto');
            $(this).find('img').width('100%');
        }
        else {
            $(this).find('img').width('auto');
            $(this).find('img').height('100%');
        }

        $('.cases_item:gt(3)').not('fade').hide();

    });

    $('.cases_canvas').each(function () {
        $('.cases_item').not('fade').show();
        var _this = this;
        var img = $(this).prev();
        _this.width = img.width();
        _this.height = img.height();
        var ctx = _this.getContext('2d');
        var pic = new Image();
        pic.src = img.attr('src');
        pic.onload = function () {
            ctx.globalCompositeOperation = 'source-out';
            ctx.font = _font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText($(_this).data('text'), _this.width / 2, _this.height / 2);
            ctx.drawImage(pic, 0, 0, _this.width, _this.height);
            $('.cases_image').removeClass('load');
            if (window.innerWidth > 1200) {
                $('.cases_item:gt(3)').not('fade').hide();
            }
        };
    });
}
function resizeModal() {
    if ($(window).width() <= 1200) {
        $('.pin').addClass('pin-center');
    } else {
        $('.pin').removeClass('pin-center');
    }
}
$('document').ready(function () {
    resizeModal();
    $(window).resize(function () {
        resizeModal();
    });
});
