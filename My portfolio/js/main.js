var End = false;
var openUi = false;
var AnimInActive = false;
var canLoaderAnim = true;
function fillText(text, text_input, length, speed = 'fast', parent = '') {
    let typeSpeed = (speed == 'fast' ? 1 : (speed == 'slow' ? 70 : 30));
    setTimeout(function(){
        if(length < text.length) {
            let elem = '';
            if(parent != '') {
                elem = $(parent).find(text_input);
            } else {
                elem = $(text_input);
            }
            $(text_input).html(elem.text() + text[length++]);
            if(!End || text_input != '.job-description') {
                fillText(text, text_input, length, speed, parent);
            } else {
                End = false;
            }
        } else {
            $(text_input).addClass('active');
            if(text_input == '.visual-text.about') {
                show_icons_start();
            } else {
                AnimInActive = false;
            }
        }
    }, typeSpeed)
}

function hide_element(element) {
    element.removeClass('touchable');
    element.removeClass('active');
    setTimeout(function(){
        // element.addClass('closed');
        setTimeout(function() {
            AnimInActive = false;
            End = false;
        },500)
    }, 300)
}

function show_element(element) {
    // element.removeClass('closed');
    element.addClass('active');
}

function show_icons_start() {
    show_icon(0);
}

function show_icon(number) {
    setTimeout(function(){
        let icons = $('.technologies .icon');
        $(icons[number]).addClass('active');
        number++;
        if(number < icons.length) {
            show_icon(number);
        }
    }, 300)
}


function start_transition(element, status, speed, font_size) {
    let width = element.width();
    let height = element.height();
    let padding = element.css('padding');
    let newElement = $('<div id="transition"><div class="text"></div>').css({'width': '100%', 'position': 'absolute', 'top': '0px', 'left': '0px', 'font-size': font_size});
    $(element).append(newElement);
    let transitionText = '';
    let i = 0;
    add_transition(i, newElement, element, status, speed)
}

function get_rand_symbol() {
    let asciiSymbols = ['A', 'B', ' Full Stack ', 'D', '/', '?', '.', '>', ':', ';', '|', '~', ']', '[', '{', '}'];
    // let asciiSymbols = ['A', '0', '1', 'O', 'I'];
    randSymbol = asciiSymbols[Math.floor(Math.random() * asciiSymbols.length)];
    return randSymbol;
}

function add_transition(i, newElement, element, status, speed) {
    let anim_speed = (speed == 'fast' ? 0.1 : 70);
    let type_speed = (speed == 'fast' ? 11 : 3);
    let max_height = (speed == 'fast' ? $(element).height() - 20 : $(element).height())
    setTimeout(() => {
        let text = $(newElement).find('.text').html();
        // if(element.html().length === 0) {
        //     let randSymbol = get_rand_symbol();

            for(let i = 0; i < type_speed; i++) {
                text += get_rand_symbol();
            }
            // text.replace(symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]);
        // } else {
        //     text = '';
        //     for(let b = 0; b < i; b++){
        //         let randSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        //         text += randSymbol;
        //     }
        // }
        $(newElement).find('.text').html(text);
        i++;
        if($(newElement).height() < max_height) {
            add_transition(i, newElement, element, status, speed);
        } else {
            end_transition(element, status);
        }
    }, anim_speed);
}

function end_transition(element, status) {
    if(status) {
        show_element(element);
        $(element).trigger('anim_script_done');
    } else {
        hide_element(element);
    }
    setTimeout(function(){
        $('#transition').remove();
    }, 200)
}


window.onbeforeunload = function(e) {
    $('.end').addClass("active");
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 200)
};


$(document).ready(function() {
    $('.end').removeClass("active");
    window.scrollTo(0, 0);

    // $('.expertise').on('mouseenter', function(){
    //     let background = $(this).css('background')
    //     $('.page-color').css({'background' : background});
    //         $('.page-color').addClass('show');
    // }).mouseleave(function(){
    //     $('.page-color').removeClass('show');
    //     setTimeout(function(){
    //         $('.page-color').css({'background' : 'unset'})
    //     }, 300)
    // })

    let notifications = $('.notification');
    if($(notifications).length > 0) {
        $(notifications).each(function(index, val) {
            setTimeout(function(){
                // $(val).find('.progress').css({'transform': 'translateX(-50%) scaleX(1)'})
                $(val).addClass('active');
                setTimeout(function() {
                    $(val).addClass('hide');
                }, index+1 * 300)
            }, index * 600)
        });
    }

    // let portfolioPage = $('.portfolio.page');

    let sliderObject = document.getElementById('slideshow');

    let sliderSettigns = {
        showCount: 1,
        frontLoop: true,
        backLoop: true,
        autoSlide: true,
        autoSlideTime: 6000,
        margin: 50,
        buttonsSvg: ['<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <polygon points="241.367,64.458 0,245.001 241.367,425.542 176.545,267.963 490,267.963 490,222.026 176.55,222.026 "/></svg>','<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <polygon points="313.447,222.026 0,222.026 0,267.964 313.451,267.964 248.629,425.546 490,245 248.629,64.454 "/></svg>']
    };

    // $(portfolioPage).removeClass('active').addClass('closed');
    // $('#side-information').removeClass('active');

    let development_mode = $('#coming_soon').val();
    if(development_mode == '') {
        let coming_soon = $('#coming_soon_text').val();
        fillText(coming_soon,'.coming-soon-text-box',0, 'slow');
    }
    let oldScroll = 0;
    AnimInActive = false;
    let oldText = '';
    let about_text = $('.about-text-value');
    about_text.each(function(index,val) {
        let number = index+1;
        let text = $(val).val();
        let elemName = `.visual-text-about-${number}`;
        fillText(text, elemName, 0, 'normal');
    });
    let textlength = 0;
    fillText(about_text, '.visual-text.about', 0, 'normal');


    $(document).delegate('.visual-text.active','mouseenter mouseleave',function(event) {
        if (event.type === 'mouseenter') {
            let newHtml = '';
            let hoverText = $(this).text();
            $(this).addClass('hovered');
            oldText = hoverText;
            for (var letter of hoverText) {
                newHtml += `<span class="hovered-visual-text">${letter}</span>`
            }
            $(this).html(newHtml);
        } else {
            $(this).removeClass('hovered');
            if (oldText != '') {
                $(this).html(oldText);
            }
            oldText = '';
        }
    })

    // $('.visual-text.active').hover(function(){
    //     let newHtml = '';
    //     let hoverText = $(this).text();
    //     oldText = hoverText;
    //     for(var letter of hoverText) {
    //         newHtml += `<span class="hovered-visual-text">${letter}</span>`
    //     }
    //     $(this).html(newHtml);
    // }, function(){
    //     if(oldText != '') {
    //         $(this).html(oldText);
    //     }
    //     oldText = '';
    // })

    $('.visual-text').delegate('.hovered-visual-text','mouseenter mouseleave',function(event){
        if(event.type === 'mouseenter') {
            $(this).prev().addClass('active');
            $(this).prev().prev().addClass('active');
            $(this).next().addClass('active');
            $(this).next().next().addClass('active');
            $(this).addClass('active');
        } else {
            $(this).prev().removeClass('active');
            $(this).prev().prev().removeClass('active');
            $(this).next().removeClass('active');
            $(this).next().next().removeClass('active');
            $(this).removeClass('active');
        }
    })

    let titleText = $('.title-text');
    for(let i = 0; i< titleText.length; i++) {
        let t_text = $(titleText[i]);
        let text = t_text.text();
        let textLength = t_text.text().length;
        let startLength = textLength;
        let oldTitle = $(t_text).text();
        let canAnim = true;
        setInterval(function(){
            if(textLength > 0 && canAnim) {
                $(t_text).text($(t_text).text().slice(0, $(t_text).text().length - 1));
                textLength--;
            } else {
                canAnim = false
                if(oldTitle[textLength] != undefined) {
                    $(t_text).text($(t_text).text() + oldTitle[textLength]);
                    textLength++;
                }
                if(textLength == startLength) {
                    setTimeout(function() {
                        canAnim = true;
                    }, 2000)
                }
            }
        }, 300)
    }

    // let symbol = `<span id="ascii"></span>`;
    // symbol += `<span style="position: fixed" id="ascii2"></span>`;
    // $('body').append(symbol)

    let cursor = $('#cursor');
    let cursor_background = $('#cursor_shape');

    if($(window).width() > 620) {
        $(document).on('mousemove', function(e) {
            let background_css = `radial-gradient(600px at ${e.pageX}px ${e.pageY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
            // let background_css = `radial-gradient(600px at ${e.pageX}px ${e.pageY}px, rgb(64 216 29 / 15%), transparent 80%)`;
            cursor.css({'top': e.pageY, 'left': e.pageX});
            // cursor_background.css({'background': background_css});
            // $('#ascii').text(randSymbol);

            // let symbol = `<span style="position: fixed; top: ">${randSymbol}</span>`;
            // $('body').append()
        })
    }

    $('#toggle_sidebar').on('click', function() {
        let element = $('.sidebar');
        if($(this).hasClass('acttive')) {
            $(this).removeClass('acttive');
            $('.sidebar-inner').css({'opacity' : '0'})
        } else {
            $(this).addClass('acttive');
            start_transition(element, true);
        }
    });

    $('.nav-item').on('click',function(e){
        e.preventDefault();
        if(!AnimInActive && !$(this).hasClass('active')) {
            oldScroll = 0;
            AnimInActive = true;
            let id = $(this).find('a').attr('href');
            $('.nav-item').removeClass('active');
            $(this).addClass('active');
            let newPage = $(`#${id}`);
            let activePage = $('.page.active');
            activePage.removeClass('active');
            setTimeout(function(){
                activePage.addClass('closed');
                setTimeout(function(){
                    newPage.removeClass('closed');
                    setTimeout(function(){
                        newPage.addClass('active');
                        AnimInActive = false;
                    },100)
                },100)
            }, 300);
        }
    })

    $('.contact-check').on('change', function(){
        if($(this).is(':checked')) {
            $(this).parent('label').addClass('checked');
        }else {
            $(this).parent('label').removeClass("checked");
        }
    })

    $('input').on('change', function() {
        let label = $(this).parents('label');
        if($(this).val() != '') {
            if(!label.hasClass('filled')) {
                label.addClass('filled');
            }
        } else {
            label.removeClass('filled');
        }
    })
    $(window).on('resize', function(){
        $('.job.active').click();
    })
    // $('.job').on('mouseenter mouseleave', function(event) {
    //     let information = $(this).find('.job-information');
    //     if(event.type === 'mouseenter') {
    //         $(this).on('mousemove', function(e) {
    //             let y = e.pageY;
    //             let x = e.pageX;
    //             x = x - information.width() - 50;
    //             y = y - (information.height() / 2);
    //             information.css({'left': x, 'top': y});
    //         })
    //         information.addClass('active');
    //     } else {
    //         information.removeClass('active');
    //     }
    // });

    $('.popup-close').on('click', function() {
        hide_element($(this).parents('.popup'));
    })

    $('#language-switcher').on('click', function () {
        script_animation_toggle('#language-switcher-dropdown', 'slow')
    })


    $('.job').on('dblclick', function (e) {
        e.preventDefault();
    })

    $(document).delegate('.job', 'click', function () {
        if(!AnimInActive) {
            AnimInActive = true;
            let job = $(this);
            job.addClass('clicked');
            setTimeout(function(){
                job.removeClass('clicked');
            }, 200)

            if(!$('.portfolio.page').hasClass('clicked')) {
                $('.portfolio.page').addClass('clicked');
                setTimeout(function(){
                    $('.click-anim').remove();
                },300)
            }
            if(job.hasClass('active')) {
                job.removeClass('active');
                setTimeout(function(){
                    $('#side-information').find('.job-title').text('');
                    // $('#side-information').find('.job-image img').attr('src', '');
                    $('#side-information').find('.job-description').text('');
                },300)
                End = true;
                script_animation_toggle('#side-information-inner', 'fast', 14);
            } else {
                if($('.job.active').length > 0) {
                    $('.job').removeClass('active');
                    setTimeout(function(){
                        $('#side-information').find('.job-title').text('');
                        // $('#side-information').find('.job-image img').attr('src', '');
                        $('#side-information').find('.job-description').text('');
                    },300)
                    End = true;
                    script_animation_toggle('#side-information-inner', 'fast', 14);
                }
                setTimeout(function(){
                    job.addClass('active');
                    let title = job.find('input.job-title').val();
                    let image = job.find('input.job-image');

                    $('#side-information').find('.job-title').text(title);
                    image.each(function(index, val) {
                        let src = $(val).val();
                        $('#slideshow').append(`<div class="slideshowItem"><img src="${src}" alt=""></div>`);
                        // $('#slideshow').find('.job-image img').attr('src', image);
                    });

                    let sliderObject = document.getElementById('slideshow');
                    let sliderSettigns = {
                        showCount: 1,
                        frontLoop: true,
                        backLoop: true,
                        autoSlide: true,
                        autoSlideTime: 6000,
                        margin: 50,
                        buttonsSvg: ['<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <polygon points="241.367,64.458 0,245.001 241.367,425.542 176.545,267.963 490,267.963 490,222.026 176.55,222.026 "/></svg>','<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <polygon points="313.447,222.026 0,222.026 0,267.964 313.451,267.964 248.629,425.546 490,245 248.629,64.454 "/></svg>']
                    };
                    let Slider = HSlider(sliderObject, sliderSettigns);

                    // $('#side-information').find('.job-description').text(description);
                    // $('#job-popup').addClass('touchable');
                    script_animation_toggle('#side-information-inner', 'fast', 14);
                },300)
            }
        }
    })

    $('#side-information').on('anim_script_done', function () {
        let description = $('.job.active').find('input.job-description').val();
        fillText(description, '.job-description', 0, 'fast', '#side-information');
    })

    $('#side-information').on('anim_script_end', function () {
        let sliderObject = $('#slideshow');
        setTimeout(function(){
            sliderObject.html('');
        }, 300)
    })

    $(document).on('scroll', function(e) {
        let scroll = $(window).scrollTop();
        let diff = oldScroll - scroll;
            let newX = $('#cursor').css('top').replace(/[^-\d\.]/g, '');
            if(newX <= $('.page.active').height() + 1) {
                $('#cursor').css({'top': +newX-diff});
            }
        oldScroll = scroll;
    })

    $('button, a, .job, .nav-item, label.checkbox, .expertise').on('mouseenter mouseleave', function(event) {
        if(event.type == 'mouseenter') {
            $('#cursor').addClass('hover');
        } else {
            $('#cursor').removeClass('hover');
        }
    })

    $('.experience-folder').on('click', function(){
        let id = $(this).attr('data-id');
        let folder = $(`.experience-child[data-child="${id}"]`);
        let button = $(this);
        $(this).addClass('click');
        setTimeout(function(){
            $(button).removeClass('click');
        },200);
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(folder).slideUp();
        } else {
            $(this).addClass('active');
            $(folder).slideDown();
        }
    })

    $('.link-to-contact').on('click', function(e) {
        e.preventDefault();
        $('.header .contact').click();
    })

    $('button.file').on('click', function(){
        let thisButton = $(this);
        let id = $(this).attr('data-id');
        let info_block = $(`.experience-information-child[data-child="${id}"]`);
        let button = $(this);
        if($(window).width() < 620) {
            if(!$(thisButton).hasClass('active')) {
                let sidebar = $('.experience-inner .sidebar');
                sidebar.addClass('hide');
                $(sidebar).parent('.window-content').addClass('hide-sidebar');
                setTimeout(function(){
                    $('#show_sidebar').addClass('show');
                }, 300)
            }
        }
        $(this).addClass('click');
        setTimeout(function(){
            $(button).removeClass('click');
        },200);
        if($(info_block).hasClass('active')) {
            $('.experience-information').removeClass('active');
            $(info_block).removeClass('active');
            $(this).removeClass('active');
            $('.experience-information-title').text('');
        } else {
            $('.experience-information-child.active').removeClass('active');
            $('button.file.active').removeClass('active');
            setTimeout(function(){
                if(!$('.experience-information').hasClass('active')) {
                    $('.experience-information').addClass('active');
                }
                $(thisButton).addClass('active');
                $(info_block).addClass('active');
                $('.experience-information-title').text(`${id}.txt`);
            }, 300);
        }
    });

    $('#show_sidebar').on('click', function(){
        let sidebar = $('.experience-inner .sidebar');
        $('#show_sidebar').removeClass('show');
        sidebar.removeClass('hide');
        $(sidebar).parent('.window-content').removeClass('hide-sidebar');
        $('button.file.active').click();
    })

    if($(window).width() < 620) {
        let navScrollHint;
        $('.header-navigation').animate({scrollLeft: $('.header-navigation').scrollLeft()+20}, 400);
        setTimeout(function(){
            $('.header-navigation').animate({scrollLeft: $('.header-navigation').scrollLeft()-20}, 400);
        }, 400);
        navScrollHint = setInterval(function(){
            $('.header-navigation').animate({scrollLeft: $('.header-navigation').scrollLeft()+20}, 400);
            setTimeout(function(){
                $('.header-navigation').animate({scrollLeft: $('.header-navigation').scrollLeft()-20}, 400);
            }, 400);
        }, 3000);
        $($('.header-navigation')).on('touchmove', function(){
            clearInterval(navScrollHint);
        });
    }

    $('#filter_toggle').on('click', function(){
        if($('.project-filters').hasClass('show')) {
            $('.project-filters').removeClass('show');
            $(this).removeClass('pressed');
        } else {
            $('.project-filters').addClass('show');
            $(this).addClass('pressed');

        }
    })
    const phrases = [
        'Full Stack Developer',
        'Game Developer',
        'Web Artist',
        'Web Developer',
    ]

    const el = document.querySelector('#loader_change_text')
    const fx = new TextScramble(el)

    let counter = 0
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 2300)
        })
        counter = (counter + 1) % phrases.length
    }
    if($('.loader').hasClass('active')) {
        next()
    }

    let i = 0;
    setTimeout(function(){
        if($(window).width() < 640) {
            let Text = $('#fill_text').html().toString();
            $('#fill_text').html('--------------------');
        }
       setTimeout(function(){
           while($('#loader_progress_bar').width() < $(window).width() && i < 50 && $('.loader').hasClass('active')) {
               size = parseInt($('#loader_progress_bar').css("font-size"), 10);
               $('#loader_progress_bar').css("font-size", size + 3);
               i++;
               setTimeout(function(){
                   $('#loader_progress_bar').addClass('show');
                   setTimeout(function(){
                       Load(1,$('#fill_text'));
                   },600)
               },300)
           }
       },200)
    }, 200)

    $('#skip_loader').on('click',function(){
        $('.loader').addClass('remove');
        canLoaderAnim = false;
        $('#cursor').removeClass('hover');
        setTimeout(function(){
            $('.loader').remove();
        }, 300);
    });
    
    $(".technologies .icon").mouseleave(function () {
        let icon = $(this);
        $(this).data('timeout', setTimeout(function () {
            $(icon).css({'top': 0+'px'})
            $(icon).css({'left': 0+'px'})
        }, 1000));
    }).mouseenter(function () {
        clearTimeout($(this).data('timeout'));
        let icon = $(this);
        let firstAdd;
        let secondAdd;
        let firstRand = Math.floor(Math.random() * (220 - 120 + 1) + 120)
        let SecondRand = Math.floor(Math.random() * (220 - 120 + 1) + 120)
        let firstAdds = {1: `${firstRand}`, 2: `-${firstRand}`, 3: `-${firstRand}`, 4: `${firstRand}`}
        let secondAdds = {1: `-${SecondRand}`, 2: `${SecondRand}`,3: `-${SecondRand}`, 4: `${SecondRand}`}
        let rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        firstAdd = firstAdds[rand]
        rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        secondAdd = secondAdds[rand]
        let newFirst = parseInt($(this).css('top')) + (parseInt(firstAdd));
        let newSecond = parseInt($(this).css('left')) + (parseInt(secondAdd));
        let css = {};
        css['top'] = `${newFirst}px`;
        css['left'] = `${newSecond}px`;
        $(this).css(css);
    });

    $('.expertise').on('click', function(){
        if($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
        } else {
            $(this).addClass('clicked');
        }
    })

    $('#scroll_top').on('click', function(){
        $('html, body').animate({scrollTop: 0}, 1000);
    });

    $('.contact-form').on('submit', function(e){
        console.log('submit');
        e.preventDefault();
        let accept = true;
        let form = $(this);
        let inputs = {
            'name' : 'input[name="name"]',
            'email' : 'input[name="email"]',
            'textarea' : 'textarea'
        }
        for( const [key, value] of Object.entries(inputs)) {
            let error = $(value).length < 2;
            switch (key) {
                case 'textarea':
                    if(error) {
                        accept = false;
                        $(value).addClass('error');
                    } else {
                        $(value).removeClass('error');
                    }
                break;
                default:
                    if(error) {
                        accept = false;
                        $(value).parents('label').addClass('error');
                    } else {
                        $(value).parents('label').removeClass('error');
                    }
                break;
            }
        }
        if(accept) {
            form.submit();
        }
    });

    $('.contact-form input').on('input', function(e){

        if($(this).attr('name') == 'email') {
            if(!$(this).val().includes('@') || !$(this).val().includes('.')){
                $(this).parents('label').addClass('error');
                $(this).parents('label').removeClass('no-error');
            } else if ($(this).val().length < 5) {
                $(this).parents('label').addClass('error');
                $(this).parents('label').removeClass('no-error');
            } else {
                if ($(this).val().includes('@')) {
                    if ($(this).val().includes('.')) {
                        $(this).parents('label').addClass('no-error');
                        $(this).parents('label').removeClass('error');
                    }
                }
            }
        } else {
            if($(this).val().length < 2) {
                $(this).parents('label').addClass('error');
                $(this).parents('label').removeClass('no-error');
            } else {
                $(this).parents('label').addClass('no-error');
                $(this).parents('label').removeClass('error');
            }
        }
    });

    $('.contact-form textarea').on('input', function(e){
        if($(this).val().length < 2) {
            $(this).addClass('error');
            $(this).removeClass('no-error');
        } else {
            $(this).addClass('no-error');
            $(this).removeClass('error');
        }
    });
})


function Load(step, elem) {
    if(canLoaderAnim) {
        let wait = 80;

        if($(window).width() < 640) {
            wait = 120;
        }
        var currentStep = step;
        let count = elem.html().toString().length;
        setTimeout(function(){
            if(currentStep < count-1 && $('.loader').hasClass('active')) {
                let Text = $(elem).html().toString();
                let newStep = currentStep+ 1;
                Text = Text.slice(0, currentStep) + '#' + Text.slice(currentStep + 1);
                $(elem).html(Text)
                Load(newStep, $(elem));
            } else {
                finish_loading();
            }
        }, wait)
    }
}

function finish_loading() {
    setTimeout(function(){
        $('.loader').addClass('hide');
        setTimeout(function(){
            $('#progress_text').text('ERROR');
            $('#progress_text').addClass('error active');
            setTimeout(function(){
                $('#progress_text').removeClass('error');
                const el = document.querySelector('#progress_text');
                const fx = new TextScramble(el);
                fx.setText('Welcome ;)');
                $('#progress_text').addClass('welcome');
                setTimeout(function(){
                    $('.loader').addClass('remove');
                    setTimeout(function(){
                        $('.loader').remove();
                    }, 300);
                }, 2500)
            },3000)
        })
    }, 2000)
}

function script_animation_toggle(id, speed, font_size = '7') {
    font_size += 'px';
    let element = $(id);
    if(element.hasClass('active')) {
        hide_element(element);
        $(element).trigger('anim_script_end');
        endInterval();
    } else {
        start_transition(element, true, speed, font_size);
    }
}

class TextScramble {
    constructor(el) {
        this.el = el
        // this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.chars = 'qwertyuiopasdfghjklzxcvbnm'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 20)
            const end = start + Math.floor(Math.random() * 20)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="char">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequst = requestAnimationFrame(this.update)
            // var update = this.update;
            // var frameRequest = this.frameRequest;
            // setTimeout(function(){
            //     frameRequest = requestAnimationFrame(update)
            // }, 20)
            // this.frameRequest = frameRequest;
            this.frame++

        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

document.addEventListener('readystatechange', event => {

    // $('video[autoplay]').each(function() {this.play();});
});

