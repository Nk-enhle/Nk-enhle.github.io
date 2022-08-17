var _font = "300px Gotham Pro Bold";


var homeresize = function () {
    $('.section_title').height(docHeight);
    $('.menu_open_content').width(docWidth);
    var _classNext = '';
    $('.section').each(function () {
        var _top = $(this).offset().top;
        if (docScroll > _top - docHeight / 2) {
            var _e = $(this).find('.section_title_text').eq(0);
            _classNext = $(this).data('class');
            $('.other-2').css('top', _e.offset().top - docScroll).text(_e.text());
        }
    });
    $('body').removeClass().addClass(_classNext);
    $('.careers_text').css('column-gap', $('.wrapper').width() / 12);
    if (window.innerWidth > 1200) {
        requestAnimationFrame(cases_canvas);
    }
};


function cases_canvas() {

    if (docWidth < 1600) {
        _font = "200px Gotham Pro Bold";
    }

    $('.new-cases_image').each(function () {
        $('.new-cases_item').not('fade').show();
        $(this).addClass('load');

        if ($(this).width() / $(this).height() > $(this).find('img').width() / $(this).find('img').height()) {
            $(this).find('img').height('auto');
            $(this).find('img').width('100%');
        }
        else {
            $(this).find('img').width('auto');
            $(this).find('img').height('100%');
        }

        // $('.new-cases_item:gt(2)').not('fade').hide();

    });

    $('.new-cases_canvas').each(function () {
        $('.new-cases_item').not('fade').show();
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
            $('.new-cases_image').removeClass('load');
            if (window.innerWidth > 1200) {
                $('.new-cases_item:gt(2)').not('fade').hide();
            }
        };
    });

}

$('.new-cases_link').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('fader');
    $('.new-cases_item:gt(2)').toggle().toggleClass('fade');
    $(document).scroll();
    $('html,body').animate({scrollTop: $('.new-cases_item').eq(2).offset().top + $('.new-cases_item').eq(2).height() / 2});
});
var wi = 0;
$('.head_title_text').each(function () {
    wi += $(this).width() / $('.head_title_text').length;
    $('.head_title_span').width(wi);
});

nextTitleText()

function nextTitleText() {
    if ($('.clients_title_text.active').next().length) {
        var next = $('.clients_title_text.active').next();
        $('.clients_title_text').removeClass('active');
        next.addClass('active')
    }
    else {
        var next = $('.clients_title_text:first-child');
        $('.clients_title_text').removeClass('active');
        next.addClass('active')
    }
    setTimeout(function () {
        nextTitleText()
    }, 3000)
}


nextTitleTextCases()

function nextTitleTextCases() {
    if ($('.cases_title_text.active').next().length) {
        var next = $('.cases_title_text.active').next();
        $('.cases_title_text').removeClass('active');
        next.addClass('active')
    }
    else {
        var next = $('.cases_title_text:first-child');
        $('.cases_title_text').removeClass('active');
        next.addClass('active')
    }
    setTimeout(function () {
        nextTitleTextCases()
    }, 3000)
}