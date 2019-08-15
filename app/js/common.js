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





    $(".calc__range_line").on("change mousedown mouseup touchstart touchend", function() {
        $(this).on("mousemove touchmove change", function() {
            $(this).parent().find(".calc__input_val").val($(this).val());
        })
        $(this).parent().find(".calc__input_val").val($(this).val());
        // calculator();
        scan_n_set ();
    });
    


    $(".calc__input_val").on("click mousemove touchmove change mousedown mouseup touchstart touchend", function() {
        $(this).parent().find(".calc__range_line").val($(this).val());
        // calculator();
        scan_n_set ();
    });


    // $(".calc__activator_display-phone").on("click", function() {
    //     grandma = $(this).parents();
    //     if ($(this).prop("checked")) {
    //         grandma.find(".cost-phone-container").removeClass("disabled");
    //     } else {
    //         grandma.find(".cost-phone-container").addClass("disabled");
    //     }
    //     calculator();
    //     scan_n_set ();
    //     $(this).attr("checked");
        
    // });

    scan_n_set ();

   

    $(".calc__activator_display-phone").on("click", function(){
        let priceSupport = 2000
        // grandma = $(this).parents();
        if ($(this).prop("checked")) {
            $('#price-support').text(priceSupport + " p")
        } else {
            $('#price-support').text("0 p")
        }
    });


    function scan_n_set () {
        if($("#js-calc_val_0").val()){
            var num_comps = parseInt($("#js-calc_val_0").val())
        } else {
            // var num_comps = 0
        }
        var price_comp = 100
        // if(jQuery("#js-calc_val_1").val()){var num_vizits = parseInt(jQuery("#ex3").val())}else{var num_vizits=1}
        // var price_vizit = 1000
        if($("#js-calc_val_1").val()){
            var num_servers = parseInt($("#js-calc_val_1").val())
        } else {
            // var num_servers = 0
        }
        var price_server = 200
        if($("#js-calc_val_2").val()){
            var num_virt_servers = parseInt($("#js-calc_val_2").val())
        } else {
            // var num_virt_servers = 0
        }
        var price_virt_server = 300

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
            let priceSetup = num_comps + num_servers + num_virt_servers

            var price_comps = num_comps*price_comp
            var price_servers = num_servers*price_server
            var price_virt_servers = num_virt_servers*price_virt_server
            var total_price_comps = price_comps+price_servers+price_virt_servers
            
        // } else {
        //     var total_price_comps = 0
        //     // jQuery("#voip_server_pdf").val(0);
        //     }

        
        
        // var hours_vizit = Math.ceil(num_comps/5)*num_vizits
        // var price_vizits = hours_vizit*price_vizit
        
        $('.license__count').text(priceSetup)
        $('.license__count-input').val(priceSetup)
        $('.price-total-input').val(total_price_comps)
        
        // var total_price_all = total_price_comps+voip_server_price

        $('#price-obe').text(price_comps + " p/мес.")
        $('#price-ob').text(price_servers + " p/мес.")
        $('#price-obp').text(price_virt_servers + " p/мес.")
        $('#price-total').text(total_price_comps + " p/мес.")
                
        $("#total_price-comp").text(total_price_comps)
        // $("#total_price-phone").text(voip_server_price)
        // $("#total_price-all").text(total_price_all)
        
        // jQuery("#num_comps_pdf").val(num_comps)
        // jQuery("#num_vizits_pdf").val(num_vizits)
        // jQuery("#num_servers_pdf").val(num_servers)
        // jQuery("#num_rols_pdf").val(num_rols)

        $("#calc__switcher-setup").on("click", function(){
            let priceSetupTotal = priceSetup * 50
            if ($(this).prop("checked")) {
                // priceSetupTotal >= 20000
                if (total_price_comps >= 20000) {
                    $('.ob-price-result').text("Бесплатно")
                } else {
                    $('.ob-price-result').text(priceSetupTotal + " р")
                }
                
            } else {
                $('.ob-price-result').text("0 р")
            }
            
        });

        // $("#price-total").bind("DOMSubtreeModified", function(){
        //     let priceSetupTotal = priceSetup * 50
        //     if ($("#calc__switcher-setup").prop("checked")) {
        //         // priceSetupTotal >= 20000
        //         if (total_price_comps >= 20000) {
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
            let priceSetupTotal = priceSetup * 50
            if ($("#calc__switcher-setup").prop("checked")) {
                // priceSetupTotal >= 20000
                if (total_price_comps >= 20000) {
                    $('.ob-price-result').text("Бесплатно")
                } else {
                    $('.ob-price-result').text(priceSetupTotal + " р")
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
                
        //         if (total_price_comps >= 20000) {
        //             $('.ob-price-result').text("Бесплатно")
        //         } else {
                    
        //             $('.ob-price-result').text(priceSetupTotal + " р")
        //         }
                
        //     } else {
        //         $('.ob-price-result').text("0 р")
        //     }
            
        // });
        
        $(".calc__input_val").on("keypress change", function() {
            let priceSetupTotal = ($('.license__count-input').val()) * 50
            if ($("#calc__switcher-setup").prop("checked")) {
                if ($('.price-total-input').val() >= 20000) {
                    $('.ob-price-result').text("Бесплатно")
                } else {
                    
                    $('.ob-price-result').text(priceSetupTotal + " р")
                }
                
            } else {
                $('.ob-price-result').text("0 р")
            }
            console.log(priceSetupTotal)
        });
        
    };

    

});