$(document).ready(function($){

    var user = detect.parse(navigator.userAgent);
    console.log(user.browser.family);

    if (user.browser.family === "IE" || user.browser.family === "Edge")  {
        document.write('Please change browser on Chrome, Firefox or Opera. Not IE and Edge.');
        // alert('Please change browser');   
      }

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

    var num = 1; //number of pixels before modifying styles

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num) {
            $('.header').addClass('scrolled');
        } else if ($(window).scrollTop() < num) {
            $('.header').removeClass('scrolled');
        } 
    });

    // Добавляем маску для поля с номера телефона
    $('#phone').mask('+7 (999) 999-99-99');

    // Добавляем маску для поля ввода колличества лицензий
    $('#js-calc_val_0').numberMask({pattern:/^-{0,1}\d*$/});
    $('#js-calc_val_1').numberMask({pattern:/^-{0,1}\d*$/});
    $('#js-calc_val_2').numberMask({pattern:/^-{0,1}\d*$/});

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
            url: 'handler.php',
            type: 'POST',
            data: form.serialize(),
            beforeSend: function() {
                answer.empty();
                button.attr('disabled', true).css('margin-bottom', '20px');
                loader.fadeIn();
            },
            success: function(result) {
                loader.fadeOut(300, function() {
                    answer.text(result);
                });
                form.find('.form-control').val(' ');
                button.attr('disabled', false);
            },
            error: function() {
                loader.fadeOut(300, function() {
                    answer.text('Произошла ошибка! Попробуйте позже.');
                });
                button.attr('disabled', false);
            }
        });

    });

    // document.getElementById("js-calc_val_0").onkeydown = function(e){
    //     if((e.which >=48 && e.which <=57)  // цифры
    //         || (e.which >=96 && e.which <=105)  // num lock
    //         || e.which==8 // backspace
    //         || (e.which >=37 && e.which <=40) // стрелки
    //        || e.which==46) // delete 
    //     {
    //         return true;
    //     } else {
    //         return false;            
    //     }		 
    //     }
        


    $(".calc__range_line").on("change mousedown mouseup touchstart touchend", function() {
        $(this).on("mousemove touchmove change", function() {
            $(this).parent().find(".calc__input_val").val($(this).val());
        })
        $(this).parent().find(".calc__input_val").val($(this).val());
        
        calculate ();
    });
    

    $(".calc__input_val").on("click mousemove touchmove change mousedown mouseup touchstart touchend", function() {
        $(this).parent().find(".calc__range_line").val($(this).val());
        
        calculate ();
    });

    // document.getElementById("js-calc_val_0").onkeypress= function(event){
        
    //      event= event || window.event;
        
    //      if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
        
    //       return false;
        
    //     };

    

    // $(".calc__activator_display-phone").on("click", function() {
    //     grandma = $(this).parents();
    //     if ($(this).prop("checked")) {
    //         grandma.find(".cost-phone-container").removeClass("disabled");
    //     } else {
    //         grandma.find(".cost-phone-container").addClass("disabled");
    //     }
    //     calculator();
    //     calculate ();
    //     $(this).attr("checked");
        
    // });

    

   
    // $(".calc__activator_display-phone").on("click", function(){
    //     let priceSupport = 2000
    //     if ($(this).prop("checked")) {
    //         $('#price-support').text(priceSupport + " p")
    //     } else {
    //         $('#price-support').text("0 p")
    //     }
    // });


    function calculate () {
        if($("#js-calc_val_0").val()){
            var obe = parseInt($("#js-calc_val_0").val())
        } else {
            // var obe = 0
        }
        var priceObe = 371.25
        // if(jQuery("#js-calc_val_1").val()){var num_vizits = parseInt(jQuery("#ex3").val())}else{var num_vizits=1}
        // var price_vizit = 1000
        if($("#js-calc_val_1").val()){
            var ob = parseInt($("#js-calc_val_1").val())
        } else {
            // var ob = 0
        }
        var priceOb = 612.54
        if($("#js-calc_val_2").val()){
            var obp = parseInt($("#js-calc_val_2").val())
        } else {
            // var obp = 0
        }
        var priceObp = 928.18

        // if (jQuery("#1onoffswitch").attr('checked')=='checked'){
            // var video_server_price = 2000;
        //     jQuery("#video_server_pdf").val(1);
        // } else {
        //     var video_server_price = 0;
        //     jQuery("#video_server_pdf").val(0);
        //     }
        // if ($("#material-switcher-phone").attr('checked') == 'checked'){
        //     var voip_server_price = 5000;
        //     // jQuery("#voip_server_pdf").val(1);
        // } else {
        //     var voip_server_price = 0;
        //     // jQuery("#voip_server_pdf").val(0);
        //     }

        

        // if ($("#material-switcher").attr('checked') == 'checked'){
            let licenseCount = obe + ob + obp;
            
            var priceObes = obe*priceObe;
            priceObes = ((parseInt(priceObes*100))/100);
            var priceObs = ob*priceOb;
            priceObs = ((parseInt(priceObs*100))/100);
            var priceObps = obp*priceObp;
            priceObps = ((parseInt(priceObps*100))/100);
            // var totalPriceLicense = Math.ceil(priceObes+priceObs+priceObps);
            var totalPriceLicense2 = ((parseInt((priceObes+priceObs+priceObps)*100))/100);
            var totalPriceLicense = (priceObes+priceObs+priceObps).toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            // console.log(typeof(totalPriceLicense))
            // console.log(typeof(priceObes))
            console.log(totalPriceLicense2)
            
        // } else {
        //     var totalPriceLicense = 0
        //     // jQuery("#voip_server_pdf").val(0);
        //     }

        
        
        // var hours_vizit = Math.ceil(obe/5)*num_vizits
        // var price_vizits = hours_vizit*price_vizit
        
        $('.license__count').text(licenseCount);
        $('.license__count-input').val(licenseCount);
        $('.price-total-input').val(totalPriceLicense);
        
        // var total_price_all = totalPriceLicense+voip_server_price

        $('#price-obe').text(priceObes + " p/мес.");
        $('#price-ob').text(priceObs + " p/мес.");
        $('#price-obp').text(priceObps + " p/мес.");
        $('#price-total').text(totalPriceLicense + " p/мес.");
                
        $("#total_price-comp").text(totalPriceLicense)
        // $("#total_price-phone").text(voip_server_price)
        // $("#total_price-all").text(total_price_all)
        
        // jQuery("#obe_pdf").val(obe)
        // jQuery("#num_vizits_pdf").val(num_vizits)
        // jQuery("#ob_pdf").val(ob)
        // jQuery("#num_rols_pdf").val(num_rols)

        $("#calc__switcher-setup").on("click", function(){
            let licenseCountTotal = String(licenseCount * 580.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($(this).prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').text("Бесплатно")
                } else {
                    $('.ob-price-result').text(licenseCountTotal + " р")
                }
                
            } else {
                $('.ob-price-result').text("0 р")
            }
            // calculate ();
            
        });

        // calculate ();

        // $("#price-total").bind("DOMSubtreeModified", function(){
        //     let priceSetupTotal = priceSetup * 50
        //     if ($("#calc__switcher-setup").prop("checked")) {
        //         // priceSetupTotal >= 50000
        //         if (totalPriceLicense >= 50000) {
        //             $('.ob-price-result').text("Бесплатно")
        //         } else {
        //             $('.ob-price-result').text(priceSetupTotal + " р")
        //         }
                
        //     } else {
        //         $('.ob-price-result').text("0 р")
        //     }
        //     console.log(priceSetupTotal)
        //   });


        $(".calc__range_line").on("change", function() {
            let licenseCountTotal = String(licenseCount * 580.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($("#calc__switcher-setup").prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').text("Бесплатно")
                } else {
                    $('.ob-price-result').text(licenseCountTotal + " р")
                }
                
            } else {
                $('.ob-price-result').text("0 р")
            }
            // console.log(priceSetupTotal)
        });
        
        // $(".calc__input_val").on("keypress change", function() {
        //     let priceSetupTotal = priceSetup * 50
        //     if ($("#calc__switcher-setup").prop("checked")) {
        //         
                
        //         if (totalPriceLicense >= 50000) {
        //             $('.ob-price-result').text("Бесплатно")
        //         } else {
                    
        //             $('.ob-price-result').text(priceSetupTotal + " р")
        //         }
                
        //     } else {
        //         $('.ob-price-result').text("0 р")
        //     }
            
        // });
        
        $(".calc__input_val").on("keyup keypress blur change", function() {
            let licenseCountTotal = String(licenseCount * 580.00).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            if ($("#calc__switcher-setup").prop("checked")) {
                if (totalPriceLicense2 >= 50000) {
                    $('.ob-price-result').text("Бесплатно")
                } else {
                    
                    $('.ob-price-result').text(licenseCountTotal + " р")
                }
                
            } else {
                $('.ob-price-result').text("0 р")
            }
            console.log(licenseCountTotal)
        });
        
    };

    calculate ();


    $('.header__button').on('click', function() {
        $()
    });

});