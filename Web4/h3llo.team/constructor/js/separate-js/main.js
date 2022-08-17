$(document).ready(function () {
    var slick = $('.c_slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        arrows: false,
    })
    $('.c_controls-prev').click(function () {
        slick.slick('slickPrev')
    })
    $('.c_controls-next').click(function () {
        slick.slick('slickNext')
    })
});