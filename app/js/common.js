$(document).ready(function($){

    // var user = detect.parse(navigator.userAgent);
    // console.log(user.browser.family);

    // if (user.browser.family === "IE")  {
    // // if (user.browser.family === "IE" || user.browser.family === "Edge")  {
    //     document.write('Please change browser on Edge, Chrome, Firefox, Opera. Not IE.');
    //     // document.write('Please change browser on Chrome, Firefox or Opera. Not IE and Edge.');
    //     // alert('Please change browser');   
    //   }

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
            var obe = parseInt($("#js-calc_val_0").val());
        } else {
            // var obe = 0
        }
        var priceObe = 371.25
        // if(jQuery("#js-calc_val_1").val()){var num_vizits = parseInt(jQuery("#ex3").val())}else{var num_vizits=1}
        // var price_vizit = 1000
        if($("#js-calc_val_1").val()){
            var ob = parseInt($("#js-calc_val_1").val());
        } else {
            // var ob = 0
        }
        var priceOb = 612.54
        if($("#js-calc_val_2").val()){
            var obp = parseInt($("#js-calc_val_2").val());
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


        $(".calc__range_line").on("change mousedown mouseup touchstart touchend", function() {
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
            // console.log(licenseCountTotal)
        });

        $('.header__button').on('click', function() {
        
            let obeForm = $('#js-calc_val_0').val();
            $('#obeForm').val(obeForm);
            // console.log(obeForm);
    
            $('#priceObesForm').val(priceObes);
            console.log(priceObes);
            
            let obForm = $('#js-calc_val_1').val();
            $('#obForm').val(obForm);
            // console.log(obForm);
    
            $('#priceObsForm').val(priceObs);
    
            let obpForm = $('#js-calc_val_2').val();
            $('#obpForm').val(obpForm);
            // console.log(obpForm);
    
            $('#priceObpsForm').val(priceObps);
    
            // let obeFormPrice = $('#price-obe');
            // console.log(obeFormPrice[0]);
    
            let licenseCountForm = $('.license__count-input').val();
            $('#licenseCountForm').val(licenseCountForm);
    
            // console.log(obeForm);
            // console.log(licenseCountForm);

            $('#totalPriceLicenseForm').val(totalPriceLicense);
            // console.log(totalPriceLicense);
            
        });
        
    };

    calculate ();


    

    // $('.header__button').on('click', function() {
    //     $('.wrapper').addClass('blur');
    // });

    // $('.close').on('click', function(){
    //     $('.wrapper').removeClass('blur');
    // });


    // function() {
    //     var result = []; // массив данных из калькулятора
    //     var resultCeilTable = [];
    //     if (($(this).data("value") == "Калькулятор обслуживания" || $(this).data("value") == "Калькулятор разовых работ") && $(this).val() != "Попробовать бесплатно") {
    //       $(".calc__input_val").filter(function(index) {
    //         if (!$(this).prop("disabled") && $(this).parent().parent().parent().hasClass("selected")) {
    //           calcElement = $(this).data();
    //           calcElement.quantity = $(this).val();
    //           result.push(calcElement);
    //         }
    //       });
    //       $(".table_main.selected").find(".js-main_factors").filter(function(index) {
    //         table = $(this).data();
    //         resultCeilTable.push(table);
    //       });
    //       if (result.length != 0) {
    //         $(".order_form form h4").html("Форма отправки расчёта");
    //         $(".order_form").find(".js-message").html("Укажите почту, <br/> на которую нужно отправить расчёт");
    //         if ($(this).data("value") == "Калькулятор обслуживания") {
    //           $(".order_form").find(".js-phone_number").prop("disabled", false);
    //           $(".order_form").find(".js-name_company").prop("disabled", false);
    //         } else {
    //           $(".order_form").find(".js-phone_number").prop("disabled", true);
    //           $(".order_form").find(".js-name_company").prop("disabled", true);
    //         }
    //         $(".order_form").find(".js-mail").prop("disabled", false);
    //         $(".order_form").find(".js-call").attr("data-value", $(this).data("value"));
    //         $(".order_form").find(".js-call").attr("onClick", $(this).data("yacont"));
    //         $(".order_form").find(".js-call").val($(this).html().trim());
    //         $(".order_form").addClass("show");
    //         $(".wrapper").addClass("blur");
    //       }
    //     } else if (($(this).html()).trim() == "Попробовать бесплатно") {
    //       $(".order_form").addClass("show");
    //       $(".order_form").html("<form id='form' name='Demo' action='https://1cfresh.com/a/httpextreg/hs/ExternalRegistration/register' ; method='post' novalidate='novalidate'><div class='close_cross'></div><h4>Подключение 1С:ФРЕШ</h4><input name='fio' type='text' class='req' placeholder='Ваше Имя:'><input name='phone' type='text' class='req' placeholder='Ваш телефон:'><input name='email' type='text' class='req email' placeholder='E-mail:'><div id='form-error' class='form-row c-red text-center d-none'></div><div id='form-success' class='form-row text-center d-none'><b>Спасибо!</b></div><input type='button' onclick='validate(); return false;' class='button_b js-call' value='Получить бесплатный доступ'/><li>Нажимая на кнопку, Вы подтверждаете, что<br> ознакомлены с <a href='/dogovorom-oferty/' style='text-decoration: underline'>договором-оферты.</a></li><input name='promouser' value='extreg-166206-000000000000000001' type='hidden'><input name='promo' value='191' type='hidden'><input name='subid' id='subid' type='hidden'><input name='unknownErrorRedirectUrl' id='inputUnknownErrorRedirectUrl' type='hidden'><input name='userExistsErrorRedirectUrl' id='inputUserExistsErrorRedirectUrl' type='hidden'><input name='serviceUnavailableErrorRedirectUrl' id='inputServiceUnavailableErrorRedirectUrl' type='hidden'><input name='promocodeNotFoundRedirectUrl' id='inputPromocodeNotFoundRedirectUrl' type='hidden'><input name='promocodeBlockedRediretUrl' id='inputPromocodeBlockedRediretUrl' type='hidden'><input name='promocodeExpiredRedirectUrl' id='inputPromocodeExpiredRedirectUrl' type='hidden'></form><div id='popup'><div class='close_cross'></div><div class='popup-wrapper' id='popupBlock' onclick='popupClickHandler();'><!-- ОШИБКА: Ошибка соединения --><div id='popup-content-serviceUnavailableErrorRedirectUrl' class='d-none error-content'><a name='serviceUnavailableErrorRedirectUrl'></a><div id='serviceUnavailableErrorRedirectUrl'><p><strong>Произошла ошибка</strong></p><p>В данный момент наблюдаются проблемы с доступом к сайту 1Cfresh.com.</p><p>Для завершения регистрации перейдите по ссылке из письма, которое вы получили после начала регистрации или свяжитесь с нами по телефону +78126400304</p></div></div><!-- ОШИБКА: Пользователь с введенным email уже существует --><div id='popup-content-userExistsErrorRedirectUrl' class='d-none error-content'><a name='userExistsErrorRedirectUrl'></a><div id='userExistsErrorRedirectUrl'><p><strong>Произошла ошибка</strong></p><p>Вы уже начинали регистрироваться с этим электронным адресом.</p><p>Пожалуйста, используйте другой e-mail.</p><p>Или для завершения регистрации перейдите по ссылке из письма, которое вы получили после начала регистрации и свяжитесь с нами по телефону +78126400304</p></div></div><!-- ОШИБКА: Другая ошибка --><div id='popup-content-unknownErrorRedirectUrl' class='d-none error-content'><a name='unknownErrorRedirectUrl'></a><div id='unknownErrorRedirectUrl'><p><strong>Произошла ошибка</strong></p><p>В данный момент наблюдаются проблемы при регистрации.</p><p>Для завершения регистрации перейдите по ссылке из письма, которое вы получили после начала регистрации или свяжитесь с нами по телефону +78126400304</p></div></div><!-- ОШИБКА: Промокод не найден --><div id='popup-content-promocodeNotFoundRedirectUrl' class='d-none error-content'><a name='promocodeNotFoundRedirectUrl'></a><div id='promocodeNotFoundRedirectUrl'><p><strong>Произошла ошибка</strong></p><p><strong>Введён неверный ПромоКод</strong></p><p>Внимательно проверьте полученный вами ПромоКода и введите правильные символы</p></div></div><!-- ОШИБКА: Промокод заблокирован --><div id='popup-content-promocodeBlockedRediretUrl' class='d-none error-content'><a name='promocodeBlockedRediretUrl'></a><div id='promocodeBlockedRediretUrl'><p><strong>Произошла ошибка</strong></p><p><strong>ПромоКод заблокирован</strong></p></div></div><!-- ОШИБКА: Срок действия промокода истек --><div id='popup-content-promocodeExpiredRedirectUrl' class='d-none error-content'><a name='promocodeExpiredRedirectUrl'></a><div id='promocodeExpiredRedirectUrl'><p><strong>Произошла ошибка</strong></p><p><strong>Срок действия этого ПромоКода истек</strong></p></div></div></div></div><script src='/bitrix/templates/itart/js/1с-fresh.js' type='text/javascript' charset='utf-8'></script>");
    //       $(".order_form").find(".js-call").attr("onClick", $(this).data("yacont"));
    //     } else {
    //       $(".order_form form h4").html("Форма заказа звонка");
    //       $(".order_form").find(".js-message").html("Мы перезвоним и ответим <br/> на все интересующие вас вопросы");
    //       $(".order_form").find(".js-phone_number").prop("disabled", false);
    //       $(".order_form").find(".js-name_company").prop("disabled", true);
    //       $(".order_form").find(".js-mail").prop("disabled", true);
    //       $(".order_form").find(".js-call").attr("onClick", $(this).data("yacont"));
    //       $(".order_form").find(".js-call").val($(this).html().trim());
    //       $(".order_form").addClass("show");
    //       $(".wrapper").addClass("blur");
    //     }
    //     reqProperty.call = $(this).data();
    //     reqProperty.calc = result;
    //     reqProperty.table = resultCeilTable;
    //   }


    // function() {
    //     if ($(this).data("value")) reqProperty.call = $(this).data();
    //     var pageTitle = $("h1").html() == undefined ? "Главная" : $("h1").html();
    //     var tariff = $(".js-calc__header_item.selected");
    //     tariff = tariff !== undefined && tariff.html() != "" ? tariff.html() : "Стандартный";
    //     var nameCompany = $(this).parent().find(".js-name_company");
    //     var phone = $(this).parent().find(".js-phone_number");
    //     var mail = $(this).parent().find(".js-mail");
    //     var minVal = $(".calc__sliders.selected").find(".js-cal_min_val");
    //     $(".js-message").html("<div style='width: 200px; height: 200px; background-image: url(/bitrix/templates/itart/images/bootstrap/loading.gif); background-repeat: no-repeat; background-position: center;'></div>");
    //     $(".order_form input").addClass("hidden");
    //     $(".order_form li").addClass("hidden");
    //     var recoverDefault = function() {
    //       setTimeout("$(\".order_form input\").removeClass('hidden')", 2000);
    //       setTimeout("$(\".order_form li\").removeClass('hidden');", 2000);
    //     }
    //     if ((($(this).data("value") == "Калькулятор разовых работ") &&
    //         (!mail.prop("disabled") && mail.val().length != 0)) ||
    //       (($(this).data("value") == "Калькулятор обслуживания") &&
    //         (!nameCompany.prop("disabled") && nameCompany.val().length != 0) &&
    //         (!phone.prop("disabled") && phone.val().length != 0) &&
    //         (!mail.prop("disabled") && mail.val().length != 0))) {
    //       $.ajax({
    //         url: "/mail/mail.php",
    //         data: {
    //           pageTitle: pageTitle,
    //           call: reqProperty.call.value,
    //           nameCompany: nameCompany.val(),
    //           tariff: tariff,
    //           phone: phone.val(),
    //           mail: mail.val(),
    //           calc: reqProperty.calc,
    //           table: reqProperty.table,
    //           minPrice: minVal.data("min"),
    //           minPriceText: minVal.html()
    //         },
    //         type: "POST",
    //         success: function(data) {
    //           if (data == "success") {
    //             $(".js-message").html("<span style='color:green'>Ваш расчёт отправлен на почту <br/>" + mail.val() + ".</span>");
    //             setTimeout("$(\".wrapper\").removeClass(\"blur\")", 2000);
    //             setTimeout("$(\".order_form\").removeClass(\"show\");", 2000);
    //           } else if (data == "not success") {
    //             $(".js-message").html("<span style='color:red'>Введите корректный E-mail</span>");
    //           } else {
    //             $(".js-message").html("<span style='color:red'>Ваше сообщение не отправлено!</span>");
    //           }
    //           recoverDefault();
    //         },
    //         error: function(data) {
    //           $(".js-message").html("<span style='color:red'>Ваш расчёт не был отрпавлен. <br/> Попробуйте ещё или свяжитесь с нами.</span>");
    //           recoverDefault();
    //         }
    //       });
    //     } else if (!phone.prop("disabled") && phone.val().length != 0) {
    //       $.ajax({
    //         url: "/mail/mail.php",
    //         data: {
    //           pageTitle: pageTitle,
    //           call: reqProperty.call.value,
    //           phone: phone.val()
    //         },
    //         type: "POST",
    //         success: function(data) {
    //           if (data == "success") {
    //             $(".js-message").html("<span style='color:green'>Спасибо за обращение! <br/> В ближайшее время с Вами свяжется наш менеджер.</span>");
    //             setTimeout("$(\".wrapper\").removeClass(\"blur\")", 2000);
    //             setTimeout("$(\".order_form\").removeClass(\"hidden\");", 2000);
    //           } else {
    //             $(".js-message").html("<span style='color:red'>Ваше сообщение не отправлено!</span>");
    //           }
    //           recoverDefault()
    //         },
    //         error: function(data) {
    //           $(".js-message").html("<span style='color:red'>Ваш расчёт не был отрпавлен. <br/> Попробуйте ещё или свяжитесь с нами.</span>");
    //           recoverDefault()
    //         }
    //       });
    //     } else {
    //       $(".js-message").html("<span style='color:red'>Данное действие не допустимо!</span>");
    //       recoverDefault()
    //     }
    //   }
});