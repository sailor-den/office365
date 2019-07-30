$(document).ready(function($){
    $(window).scroll(function(){
        let st = $(this).scrollTop();
    
        $(".banner__title",).css({
            "transform" : "translate(0%, " + st / 3 + "%"
        });

        $(".banner__subtitle",).css({
            "transform" : "translate(0%, " + st / 1.5 + "%"
        });
    });

    $(".header__link").mPageScroll2id();

    $(window).scroll(function(){
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('top--active')
		} else {
			$('.top').removeClass('top--active')
		}
    });
    
    $('.top').click(function(){
		$('html, bode').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
});