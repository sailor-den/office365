$(document).ready(function($){

    // // Блокируем открытие сайта в опеределнных браузерах 
    // var user = detect.parse(navigator.userAgent);
    // console.log(user.browser.family);

    // if (user.browser.family === "IE")  {
    // // if (user.browser.family === "IE" || user.browser.family === "Edge")  {
    //     document.write('Please change browser on Edge, Chrome, Firefox, Opera. Not IE.');
    //     // document.write('Please change browser on Chrome, Firefox or Opera. Not IE and Edge.');
    //     // alert('Please change browser');   
    //   }


    // Параллакс
    $(window).scroll(function(){
        var st = $(this).scrollTop();
    
        $(".banner__title",).css({
            "transform" : "translate(0%, " + st / 3 + "%"
        });

        $(".banner__subtitle",).css({
            "transform" : "translate(0%, " + st / 1.5 + "%"
        });
    });

    $(".header__link").mPageScroll2id();

    // Скролл топ
    $(window).scroll(function(){
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('top--active');
		} else {
			$('.top').removeClass('top--active');
		}
    });

    // Анимация плавного скролл топа
    $('.top').click(function(){
		$('html, bode').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    // Добавляем css стили навбару при скролле
    var num = 1; //number of pixels before modifying styles

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num) {
            $('.header').addClass('scrolled');
        } else if ($(window).scrollTop() < num) {
            $('.header').removeClass('scrolled');
        } 
    });

    // Мобильный навбар
    $('.hamburger ').on('click', function(e){
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.header__nav--mobile').slideToggle(700);
    });

    $('.header__item--mobile').on('click', function(){
        $('.header__nav--mobile').fadeOut(600);
        $('.hamburger').toggleClass('is-active');
    });


    // Добавляем маску для поля с номера телефона
    $('#phone').mask('+7 (999) 999-99-99');

    // Добавляем маску для поля ввода колличества лицензий
    $('#js-calc_val_0').numberMask({pattern:/^-{0,1}\d*$/});
    $('#js-calc_val_1').numberMask({pattern:/^-{0,1}\d*$/});
    $('#js-calc_val_2').numberMask({pattern:/^-{0,1}\d*$/});

    // $('#js-calc_val_1').on('keydown', function(){
    //     $(this).val($(this).val().replace(/^(0$|-?[1-9]\d*(\.\d*[1-9]$)?|-?0\.\d*[1-9])$/));
    // });
    
  
    


    // Запрет ввода отрицательных занчений
    // get all number fields
    var numInputs = document.querySelectorAll('input[type="number"]');

    // Loop through the collection and call addListener on each element
    Array.prototype.forEach.call(numInputs, addListener); 


    function addListener(elm,index){
        elm.setAttribute('min', 0);  // set the min attribute on each field
        
        elm.addEventListener('keypress', function(e){  // add listener to each field 
            var key = !isNaN(e.charCode) ? e.charCode : e.keyCode;
            str = String.fromCharCode(key); 
            if (str.localeCompare('-') === 0){
            event.preventDefault();
            }
            
        });
    };


    // Проверяет отмечен ли чекбокс согласия
    // с обработкой персональных данных
    $('#check').on('click', function() {
        if ($("#check").prop("checked")) {
            $('#button').attr('disabled', false);
        } else {
            $('#button').attr('disabled', true);
        }
    });

    // Отправляет данные из формы на сервер и получает ответ
    $('#contactForm').on('submit', function(event) {
        
        event.preventDefault();

        var form = $('#contactForm'),
            button = $('#button'),
            answer = $('#answer'),
            loader = $('#loader');

        $.ajax({
            url: 'makepdf.php',
            type: 'POST',
            data: form.serialize(),
            beforeSend: function() {
                answer.empty();
                button.attr('disabled', true).css('margin-bottom', '20px');
                loader.fadeIn();
            },
            success: function(result) {
                loader.fadeOut(300, function() {
                    answer.html(result);
                });
                form.find('.form-control').val(' ');
                button.attr('disabled', false);
            },
            error: function() {
                loader.fadeOut(300, function() {
                    answer.html('Произошла ошибка! Попробуйте позже.');
                });
                button.attr('disabled', false);
            }
        });

    });


    // Передаем значения из лайна в интпут и обратно и запускаем функцию calculate
    $(".calc__range_line").on("mousedown mouseup mouseover mouseout touchstart touchend keyup", function() {
        $(this).on("mousemove touchmove", function() {
            $(this).parent().find(".calc__input_val").val($(this).val());
        });
        $(this).parent().find(".calc__input_val").val($(this).val());
        
        calculate ();
    });
    

    $(".calc__input_val").on("keyup mouseup touchend", function() {
        $(this).parent().find(".calc__range_line").val($(this).val());
        
        calculate ();
    });

   

    function calculate () {
        
        var obe = parseInt($("#js-calc_val_0").val());
        var priceObe = 374.63;

        var ob = parseInt($("#js-calc_val_1").val());
        var priceOb = 618.10;
        
        var obp = parseInt($("#js-calc_val_2").val());
        var priceObp = 936.62;

       
        var licenseCount = obe + ob + obp;
        
        var priceObes = obe*priceObe;
        priceObes = ((parseInt(priceObes*100))/100);

        var priceObs = ob*priceOb;
        priceObs = ((parseInt(priceObs*100))/100);

        var priceObs2 = ob*priceOb;
        priceObs2 = priceObs2.toFixed(2);

        var priceObps = obp*priceObp;
        priceObps = ((parseInt(priceObps*100))/100);

        // var totalPriceLicense = Math.ceil(priceObes+priceObs+priceObps);
        var totalPriceLicense = (priceObes+priceObs+priceObps).toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '); // возращает строку, 
        var totalPriceLicense2 = ((parseInt((priceObes+priceObs+priceObps)*100))/100); // поэтому для проверки условия создаем такую-же переменную, но уже числовую
        
        
        $('.license__count').html(licenseCount);
        $('.license__count-input').val(licenseCount);
        // $('.price-total-input').val(totalPriceLicense);
        $('#price-obe').html(priceObes + " p/мес.");
        $('#price-ob').html(priceObs2 + " p/мес.");
        $('#price-obp').html(priceObps + " p/мес.");
        $('#price-total').html(totalPriceLicense + " p/мес.");
        $("#total_price-comp").html(totalPriceLicense);
        
        // По клику запускаем расчет суммы настройки
        $("#calc__switcher-setup").on("click", function(){
            var setupPrice = String(licenseCount * 650.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($(this).prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').html("Бесплатно");
                } else {
                    $('.ob-price-result').html(setupPrice + " р");
                }
                
            } else {
                $('.ob-price-result').html("0 p");
            }
            // calculate ();
            
        });

        // Собираем данные из лайна делаем пересчет суммы настройки
        $(".calc__range_line").on("mousemove touchmove change", function() {
            var setupPrice = String(licenseCount * 650.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($("#calc__switcher-setup").prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').html("Бесплатно");
                } else {
                    $('.ob-price-result').html(setupPrice + " р")
                }
                
            } else {
                $('.ob-price-result').html("0 p");
            }
        });
        

        // Расчет суммы настройки
        var setupPrice = String(licenseCount * 650.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($("#calc__switcher-setup").prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').html("Бесплатно");
                } else {
                    $('.ob-price-result').html(setupPrice + " р");
                }
                
            } else {
                $('.ob-price-result').html("0 p");
            };
        
        // Пересчет суммы настройки из инпута    
        $(".calc__input_val").on("input change", function() {
            var setupPrice = String(licenseCount * 650.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($("#calc__switcher-setup").prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').html("Бесплатно");
                } else {
                    $('.ob-price-result').html(setupPrice + " р");
                }
                
            } else {
                $('.ob-price-result').html("0 p");
            }
        });

        $('.header__button').on('click', function() {

            document.body.style.overflow = 'hidden';
        
            var obeForm = $('#js-calc_val_0').val();
            $('#obeForm').val(obeForm);
    
            $('#priceObesForm').val(priceObes);
            
            var obForm = $('#js-calc_val_1').val();
            $('#obForm').val(obForm);
    
            $('#priceObsForm').val(priceObs);
    
            var obpForm = $('#js-calc_val_2').val();
            $('#obpForm').val(obpForm);
    
            $('#priceObpsForm').val(priceObps);
            
    
            var licenseCountForm = $('.license__count-input').val();
            console.log(licenseCountForm);
            $('#licenseCountForm').val(licenseCountForm);

            $('#totalPriceLicenseForm').val(totalPriceLicense);
            
        });

        $('.close').on('click', function(){
            document.body.style.overflow = '';
        });

        $('.modal').on('click', function(){
            document.body.style.overflow = '';
        });
        
    };

    calculate ();

});