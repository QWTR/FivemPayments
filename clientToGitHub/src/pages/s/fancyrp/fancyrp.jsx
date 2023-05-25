import React,{useState, useEffect} from 'react';
import { json, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getserverinfoez, PayForItemRoute } from "../../utils/APIRoutes"
import axios from "axios";
import { Link } from "react-router-dom";
import Swiper, {SwiperOptions,Navigation, Pagination, Scrollbar} from "swiper"
import $ from 'jquery';
import '../Scss/responsive.css';
import '../Scss/style.css';
import '../Scss/new.css';
import '../all.css';
import '../Scss/server.css';
import '../Sjs/count-down';
import '../Sjs/jquery.easing';
import 'swiper/swiper-bundle.min.css';
import '../Sjs/shortcodes';

const Fancy = () => {
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    const navigate = useNavigate();
    const [type,setType] = useState(undefined);
    const [option,setOption] = useState(undefined);
    const ItemsToInsert = [];
    const [steamlogin, setSteamlogin] = useState(undefined);
    const [server, setServer] = useState([]);
    const [isPloaded, SetLoaded] = useState(undefined);
    const [hujkurwadupa, setHujkurwadupa] = useState(undefined)
    const [valuesOfBuyMenu,setValuesOfBuyMenu] = useState({})
    const [tip,setTip] = useState(undefined)
    let isLoad = undefined

    //jquer mainjs
    useEffect(()=>{
            (function ($) {
                "use strict";
            
                var themesflatTheme = {
            
                    // Main init function
                    init: function () {
                        this.config();
                        this.events();
                    },
            
                    // Define vars for caching
                    config: function () {
                        this.config = {
                            $window: $(window),
                            $document: $(document),
                        };
                    },
            
                    // Events
                    events: function () {
                        var self = this;
            
                        // Run on Window Load
                        self.config.$window.on('load', function () {
            
                        });
                    },
                }; // end themesflatTheme
            
                // Start things up
                themesflatTheme.init();
            
                var ajaxContactForm = function () {
                    $('#contactform,#commentform,#create-item-1').each(function () {
                        $(this).validate({
                            submitHandler: function (form) {
                                var $form = $(form),
                                    str = $form.serialize(),
                                    loading = $('<div />', { 'className': 'loading' });
            
                                $.ajax({
                                    type: "POST",
                                    url: $form.attr('action'),
                                    data: str,
                                    beforeSend: function () {
                                        $form.find('.form-submit,comment-form').append(loading);
                                    },
                                    success: function (msg) {
                                        var result, cls;
                                        if (msg === 'Success') {
                                            result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                            cls = 'msg-success';
                                        } else {
                                            result = 'Error sending email.';
                                            cls = 'msg-error';
                                        }
            
                                        $form.prepend(
                                            $('<div />', {
                                                'className': 'flat-alert ' + cls,
                                                'text': result
                                            }).append(
                                                $('<a className="close" href="#"><i className="fas fa-times"></i></a>')
                                            )
                                        );
            
                                        $form.find(':input').not('.submit').val('');
                                    },
                                    complete: function (xhr, status, error_thrown) {
                                        $form.find('.loading').remove();
                                    }
                                });
                            }
                        });
                    }); // each contactform
                };
            
                // Dark Light Mode
                $(".dark").on('click', function (e) {
                    e.preventDefault();
                    $(".body").addClass("is_dark")
                    $(".light").removeClass("is_active")
                    $(".dark").addClass("is_active")
            
                    $(".tf-text").removeClass("style")
                    $(".tf-text").addClass("s1")
                    document.getElementById("logo_header").src = "/mainImages/logo_dark.png";
                    $('.mode_switcher h6 span').text('Dark Mode');
                    document.getElementById("moon_dark").src = "/mainImages/moon.png";
                });
            
                $(".light").on('click', function (e) {
                    e.preventDefault();
                    $(".body").removeClass("is_dark")
                    $(".light").addClass("is_active")
                    $(".dark").removeClass("is_active")
                    
                    $(".tf-text").addClass("style")
                    $(".tf-text").removeClass("s1")
                    document.getElementById("logo_header").src = "/mainImages/logo_dark.png";
                    document.getElementById("moon_dark").src = "/mainImages/moon.png";
                    $('.mode_switcher h6 span').text('Light Mode');
                });
            
                // Loadmore Item
            
                $(".fl-item").slice(0, 12).show();
                $("#loadmore").on("click", function(e){
                e.preventDefault();
                $(".fl-item:hidden").slice(0, 8).slideDown();
                if($(".fl-item:hidden").length === 0) {
                    $("#loadmore").hide();
                }
                //   de_size();
                });
            
                // Header Fixed
                var headerFixed = function () {
                    if ($('body').hasClass('header-fixed')) {
                        var nav = $('#header_main');
                        if (nav.length) {
                            var offsetTop = nav.offset().top,
                                headerHeight = nav.height(),
                                injectSpace = $('<div />', {
                                    height: headerHeight
                            }).insertAfter(nav);
                            injectSpace.hide();
                            $(window).on('load scroll', function () {
                                if ($(window).scrollTop() > 400) {
                                    nav.addClass('is-fixed');
                                    injectSpace.show();
                                } else {
                                    nav.removeClass('is-fixed');
                                    injectSpace.hide();
                                }
            
                                if ($(window).scrollTop() > 500) {
                                    nav.addClass('is-small');
                                } else {
                                    nav.removeClass('is-small');
                                }
                            })
                        }
                    }
                };
            
                var retinaLogos = function() {
                    var retina = window.devicePixelRatio > 1 ? true : false;
                    if(retina) {
                        if(!$('body').hasClass('is_dark')) {
                            $('#site-logo').find('img').attr( {src:'/mainImages/logo@2x.png',width:'151',height:'45'} );
                        }
                        else {
                            $('#site-logo').find('img').attr( {src:'/mainImages/logo_dark@2x.png',width:'151',height:'45'} );
                            $('#logo-footer').find('img').attr( {src:'/mainImages/logo_dark@2x.png',width:'151',height:'45'} );
                        }
                    }   
                };
            
                // Mobile Navigation
                var mobileNav = function () {
                    var mobile = window.matchMedia("(max-width: 991px)");
                    var wrapMenu = $("#site-menu ");
                    var navExtw = $(".nav-extend.active");
                    var navExt = $(".nav-extend.active").children();
                
                    responsivemenu(mobile);
                
                    mobile.addListener(responsivemenu);
                
                    function responsivemenu(mobile) {
                    if (mobile.matches) {
                        $("#main-nav")
                        .attr("id", "main-nav-mobi")
                        .appendTo("#site-header-inner")
                        .hide()
                        .children(".menu")
                        .append(navExt)
                        .find("li:has(ul)")
                        .children("ul")
                        .removeAttr("style")
                        .hide()
                        .before('<span className="arrow"></span>');
                    } else {
                        $("#main-nav-mobi")
                        .attr("id", "main-nav")
                        .removeAttr("style")
                        .prependTo(wrapMenu)
                        .find(".ext")
                        .appendTo(navExtw)
                        .parent()
                        .siblings("#main-nav")
                        .find(".sub-menu")
                        .removeAttr("style")
                        .prev()
                        .remove();
                
                        $(".mobile-button").removeClass("active");
                        $(".mobile-button-style2").removeClass("active");
                        $(".sub-menu").css({ display: "block" });
                    }
                    }
                    $(document).on("click", ".mobile-button", function () {
                    $(this).toggleClass("active");
                    $("#main-nav-mobi").slideToggle();
                    });
                    $(document).on("click", ".mobile-button-style2", function () {
                    $(this).toggleClass("active");
                    $("#main-nav-mobi").slideToggle();
                    });
                    $(document).on("click", "#main-nav-mobi .arrow", function () {
                    $(this).toggleClass("active").next().slideToggle();
                    });
                };
            
                var ajaxSubscribe = {
                    obj: {
                        subscribeEmail: $('#subscribe-email'),
                        subscribeButton: $('#subscribe-button'),
                        subscribeMsg: $('#subscribe-msg'),
                        subscribeContent: $("#subscribe-content"),
                        dataMailchimp: $('#subscribe-form').attr('data-mailchimp'),
                        success_message: '<div className="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
                        failure_message: '<div className="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
                        noticeError: '<div className="notification_error">{msg}</div>',
                        noticeInfo: '<div className="notification_error">{msg}</div>',
                        basicAction: 'mail/subscribe.php',
                        mailChimpAction: 'mail/subscribe-mailchimp.php'
                    },
            
                    eventLoad: function () {
                        var objUse = ajaxSubscribe.obj;
            
                        $(objUse.subscribeButton).on('click', function () {
                            if (window.ajaxCalling) return;
                            var isMailchimp = objUse.dataMailchimp === 'true';
            
                            if (isMailchimp) {
                                ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                            } else {
                                ajaxSubscribe.ajaxCall(objUse.basicAction);
                            }
                        });
                    },
            
                    ajaxCall: function (action) {
                        window.ajaxCalling = true;
                        var objUse = ajaxSubscribe.obj;
                        var messageDiv = objUse.subscribeMsg.html('').hide();
                        $.ajax({
                            url: action,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                subscribeEmail: objUse.subscribeEmail.val()
                            },
                            success: function (responseData, textStatus, jqXHR) {
                                if (responseData.status) {
                                    objUse.subscribeContent.fadeOut(500, function () {
                                        messageDiv.html(objUse.success_message).fadeIn(500);
                                    });
                                } else {
                                    switch (responseData.msg) {
                                        case "email-required":
                                            messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is required.</strong>'));
                                            break;
                                        case "email-err":
                                            messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email invalid.</strong>'));
                                            break;
                                        case "duplicate":
                                            messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is duplicate.</strong>'));
                                            break;
                                        case "filewrite":
                                            messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>Mail list file is open.</strong>'));
                                            break;
                                        case "undefined":
                                            messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>undefined error.</strong>'));
                                            break;
                                        case "api-error":
                                            objUse.subscribeContent.fadeOut(500, function () {
                                                messageDiv.html(objUse.failure_message);
                                            });
                                    }
                                    messageDiv.fadeIn(500);
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert('Connection error');
                            },
                            complete: function (data) {
                                window.ajaxCalling = false;
                            }
                        });
                    }
                };
            
                var alertBox = function () {
                    $(document).on('click', '.close', function (e) {
                        $(this).closest('.flat-alert').remove();
                        e.preventDefault();
                    })
            
                };
            
                var headerConnect = function () {
                    $('body').on('click', function (e) {
                        var clickID = e.target.id;
                        if ((clickID !== '#target-avatar')) {
                            $('.header_avatar').removeClass('show');
                        }
                    });
            
                    $('.header_avatar').on('click', function (event) {
                        event.stopPropagation();
                    });
            
                    $('.avatar_popup').on('click', function (event) {
                        event.stopPropagation();
                    });
            
                    $('.header_avatar').on('click', function (event) {
                        if (!$('.header_avatar').hasClass("show")) {
                            $('.header_avatar').addClass('show');
                            event.preventDefault();
                        }
            
                        else
                            $('.header_avatar').removeClass('show');
                            event.preventDefault();
                    });
                }
            
                // Dom Ready
                $(function () {
                    $( window ).on('load resize',function() {
                        retinaLogos();
                    });
                    mobileNav();
                    ajaxSubscribe.eventLoad();
                    ajaxContactForm();
                    alertBox();
                    headerFixed();
                    headerConnect();
                });
            })($);
         
    },[$])
    //swiperjs
    useEffect(()=>{
        Swiper.use([Navigation, Pagination]);
        var swiper =  new Swiper(".slider", {
            // autoplay: {
            // delay: 6000,
            // disableOnInteraction: false,
            // },
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            slidesPerView: 1,
            loop: false,
            speed: 500,
            fade:'true',
            grabCursor:true,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
        });
        
        var swiper =  new Swiper(".live-auc", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            loop:false,
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                550: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1300: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });
        
        var swiper =  new Swiper(".trendy", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            loop:false,
            slidesPerView: 1,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            spaceBetween: 30,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
                992: {
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
            },
        });
        
        var swiper =  new Swiper(".hot-coll", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            slidesPerView: 2,
            loop: false, 
            spaceBetween: 26,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 26,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 26,
                },
            },
        });
        
        var swiper =  new Swiper(".author-best", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            slidesPerView: 2,
            loop: false, 
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                },
            },
        });
        
        
        var swiper =  new Swiper(".live-auc.style-2", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            loop:false,
            slidesPerView: 1,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            spaceBetween: 30,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
            },
        });
        
        var swiper =  new Swiper(".popular-coll", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            loop:false,
            slidesPerView: 1,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            spaceBetween: 30,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
                992: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
            },
        });
        
        var swiper =  new Swiper(".popular-coll-2", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            loop:false,
            slidesPerView: 1,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            spaceBetween: 30,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
                1366: {
                    slidesPerView: 4,
                    slidesPerColumn: 2,
                    spaceBetween: 30,
                },
            },
        });
        
        var swiper =  new Swiper(".latest-coll", {
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            //     },
            loop:false,
            slidesPerView: "auto",
            spaceBetween: 30,
            navigation: {
                clickable: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                550: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                },
            },
        });
 
    },[Swiper]) 
    //STEAM
    useEffect(() => { 
      const getUser = () => {
        if(steamlogin === undefined){ 
            fetch("http://localhost:5000/api/auth/steam/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            }).then((response) => {
                
                if (response.status === 200) return response.json() ;
                throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                setSteamlogin(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            });
            };
            
        }
      getUser();
      
    });
    //CATEGORY SELECT
    useEffect(()=>{
        if(option === undefined){
            setTimeout(() => {
                setOption(document.querySelector('.category-slide.active'));
            }, 250);
            
        }
    },[option]);
    const changeOption = (event) =>{
        option.classList.remove('active'); 
        setType(event.target.getAttribute('data-category')); 
        event.currentTarget.classList.add('active'); 
        setOption(event.target);
        var elems = document.querySelectorAll('.itemsToBuy .col-6')
        var index = 0, length = elems.length;
        for ( ; index < length; index++) {
            elems[index].style = 'display:none;';
        }
        if(event.target.getAttribute('data-category') !== 'wszystko'){
            var elems = document.querySelectorAll('.itemsToBuy .col-6.cat-'+event.target.getAttribute('data-category'))
            var index = 0, length = elems.length;
            for ( ; index < length; index++) {
                elems[index].style = 'display:block;';
            }
        }else{
     
            var elems = document.querySelectorAll('.itemsToBuy .col-6')
            var index = 0, length = elems.length;
            for ( ; index < length; index++) {
            elems[index].style = 'display:block;';
            }
        }
    }
    //BD
    useEffect(()=>{
        async function wowo(){
            document.title = `${window.location.pathname.slice(3)} - sklep`
            var servera = window.location.pathname.slice(3)
            const data = await axios.post(getserverinfoez,{
                servera
            })
            setServer(data.data.server)
            
        }
        wowo()
        // document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
    },[]);
    
    useEffect(()=>{
        if(server.serverStyle !== undefined){
            for(let i in server.serverStyle[0]){
                document.documentElement.style.setProperty(`--${i}`,server.serverStyle[0][i]);
            }
            SetLoaded(true)
        }
    },[server]);
    //click
    const CloseBuyMenu = (e)=>{
        $('.buyMenuCont').fadeOut();
        
    } 
    const OpenBuyMenu = (kurwa,itemImg,itemcategory,itemlabel,price,itemdesc)=>{
        $('.buyMenuCont').fadeIn();
        $('#aa').prop('src',itemImg)
        $('#bb').html(itemcategory)
        $('#cc').html(itemlabel)
        $('#dd').html(itemdesc)
        $('#esdfade span').html(price+"zł")
        localStorage.removeItem('item')
        let itemIF = {img:itemImg,label:itemlabel,desc:itemdesc,itemcategory:itemcategory,price:price}
        localStorage.setItem('item',JSON.stringify(itemIF))
        
        setHujkurwadupa(kurwa)
    
    }
    const handleChange = (event)=>{
        setValuesOfBuyMenu({...valuesOfBuyMenu,[event.target.name]: event.target.value})
        console.log(valuesOfBuyMenu)
    }
    const thanksForTip = (e)=>{
        let OldPrice = JSON.parse(localStorage.getItem('item'))
        
        if(document.getElementById('CashCheck').checked){
            setTip(true)
            let newPrice = OldPrice.price + (OldPrice.price*0.05)
            $('#esdfade span').html(newPrice+"zł")
        }else{
            setTip(false)
            $('#esdfade span').html(OldPrice.price+"zł")
        }
        
    }
    const payValidation = ()=>{
   
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(localStorage.getItem('puhId')){localStorage.removeItem('puhId'); localStorage.removeItem('server')}
        
        if(validRegex.test(valuesOfBuyMenu.email)){
            if(document.getElementById('zgodaCheck').checked && document.getElementById('regulaminCheck').checked){
                
                return true;
            }else{
                toast.error('Zaakceptuj wszystkie zgody',toastOptions)
                return false;
            }
            
        }else{
            toast.error('Niepoprawny email',toastOptions)
            return false;
        }
    }
    const payForItem = async (e)=>{
        if(payValidation()){
            let serv = server.server
            const values = valuesOfBuyMenu;
            const data = await axios.post(PayForItemRoute,{
                hujkurwadupa,
                serv,
                steamlogin,
                values,
                tip
            });
        
            if(data.data.link.length > 5){
                localStorage.setItem('puhId',data.data.tranId)
                localStorage.setItem('server',server.server)
                console.log(data.data.tranId)
                window.location.assign(data.data.link)
            }
        }else{

        }
        
   
    }
    var lastCostumers = server.puhHist;
    var allitems = server.allItems;
    var categories = server.itemscategory;
    var zestawy = server.zestawy;
    var addons = server.Addons
    var socials = server.socials
    return (
        <main className="body header-fixed is_dark">
            {/* <div className="loadingPage">
                <div className="preload-logo"></div>
            </div> */}
            <div id="wrapper">
                <div id="page" className="clearfix">
                    <header id="header_main" className="header_1 js-header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mobile-button"><span></span></div>
                                    <div id="site-header-inner" className="flex">
                                        <div id="site-logo" className="clearfix">
                                            <div id="site-logo-inner">
                                                <a rel="home" className="main-logo">
                                                    {/* <img id="logo_header" src="https://cdn.discordapp.com/attachments/702788153022480477/1079122774288781363/1670290573674.png"
                                                        alt="nft-gaming"
                                                        data-retina="https://cdn.discordapp.com/attachments/702788153022480477/1079122774288781363/1670290573674.png" data-width="151"
                                                        data-height="45"></img> */}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SteamLogin" >
                                        {steamlogin === undefined?(
                                            <p><a href={`http://localhost:5000/api/auth/steam/`}>Zaloguj się przez  steam</a></p>
                                            ):(
                                                <div className='steamInfo'>
                                                    <div className="UserSteam">
                                                        <p>Witaj {steamlogin.displayName}!</p>
                                                        <span><a href={`http://localhost:5000/api/auth/steam/logout`}>Wyloguj się</a></span>
                                                        <img src={steamlogin.photos[1].value}></img>
                                                        
                                                    </div>
                                                </div> 
                                                
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </header>
                    <section className="tf-slider">
                        <div className="swiper-container slider ">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="slider-item">
                                        <div className="overlay"></div>
                                        <div className="slider-inner flex home-1">
                                            <div className="slider-content">
                                                <h1 className="heading">Szybko i bezpiecznie</h1>
                                                <p className="sub-heading">Ekspresowa realizacja i wygodne zakupy. Nie zwlekaj!</p>
                                                <div className="button-slider">
                                                    <a href='#tf2-trendy-collection2' className="sc-button btn-bordered-white style letter stobuy">
                                                        <span>Zobacz przedmioty!</span>
                                                    </a>
                                                    <a href={server.discord} target='_blank' className="sc-button btn-bordered-white style" >
                                                        <i className="fa-brands fa-discord"></i>
                                                        <span>Discord</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="slider-img">
                                                <div className="img-home-1">
                                                    <img src="/mainImages/img-slider-1.png" alt="Image"></img>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="slider-item ">
                                        <div className="overlay "></div>
                                        <div className="container">
                                            <div className="slider-inner style-2 home-1 flex">
                                                <div className="slider-content">
                                                    <h1 className="heading">Zobacz jakie to proste!</h1>
                                                    <p className="sub-heading">Odrazu po opłaceniu produktu dostaniesz go w grze! </p>
                                                    <div className="button-slider">
                                                        <a href='#tf2-trendy-collection2' className="sc-button btn-bordered-white style letter ">
                                                            <span>Zobacz Przedmioty!</span>
                                                        </a>
                                                        <a href={server.discord} target='_blank' className="sc-button btn-bordered-white style" >
                                                            <i className="fa-brands fa-discord"></i>
                                                            <span>Discord</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="slider-img flex">
                                                    <div className="img-left">
                                                        <div className="img-1"><img src="/mainImages/img-slider-3.jpg"
                                                                alt="Image"></img></div>
                                                        <div className="img-2"><img src="/mainImages/img-slider-4.jpg"
                                                                alt="Image"></img></div>

                                                    </div>
                                                    <div className="img-right">
                                                        <img src="/mainImages/img-slider-5.jpg" alt="Image"></img>
                                                        <div className="box-avatar flex">
                                                            <div className="list-avatar flex">
                                                                <img src="/mainImages/avt-8.jpg" alt="Image"></img>
                                                                <img src="/mainImages/avt-9.jpg" alt="Image"></img>
                                                                <img src="/mainImages/avt-10.jpg" alt="Image"></img>
                                                                <img src="/mainImages/avt-11.jpg" alt="Image"></img>
                                                            </div>
                                                            <div className="icon-plus">
                                                                <a href="#"><i className="fas fa-plus"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        
                        </div>
                    </section>
                    <section className="tf-latest-collections tf-section bg-color-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sc-heading style-2">
                                        <div className="content-left">
                                            <div className="inner">
                                                <h3>Zestawy</h3>
                                                <p className="desc">Wszystko co najlepsze za jednym razem!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {
                                            zestawy !== undefined ?(
                                                zestawy.map((zestaw, index)=>{
                                                    return(
                                                    <div className="carousel-item active" key={index}>
                                                        <div className="zestawyCont">
                                                            <div className="zestawTitle">{zestaw.zestawtTitle}</div>
                                                            <div className="zestawDesc">
                                                                {zestaw.zestawDesc}
                                                            </div>
                                                            <div className="zestawcena">
                                                                <span className='newc'>{zestaw.zestawPrice}zł</span>
                                                                <span className="oldc">{zestaw.zestawOldPrice}zł</span>
                                                            </div>
                                                            <img src={zestaw.zestawImg}></img>
                                                        </div>
                                                    </div>
                                                    );
                                                })
                                            ):''
                                        }
                                       
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="tf-best-seller">
                        <div className="best-seller-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sc-heading style-2">
                                        <div className="content-left">
                                            <div className="inner">
                                                <h3>Ostatni Kupujący</h3>
                                                <p className="desc">Osoby które ostatnio zakupiły coś w naszym sklepie </p>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="asdasdasdasd">
                                    {
                                        lastCostumers !== undefined ?(
                                            lastCostumers = lastCostumers.slice(-6),
                                            lastCostumers.map((costumer,index)=>{
                                                
                                                return(
                                                    <div className="col-lg-2 col-md-4 col-6" key={index}>
                                                        <div className="sc-author" >
                                                            <div className="card-avatar">
                                                                <img src={costumer.avatar} alt="avatar"></img>
                                                            </div>
                                                            <div className="infor">
                                                                <h6> <a >{costumer.nick}</a> </h6>
                                                                <div className="details">{costumer.item}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ):''
                                    }
                                </div>  
                            </div>
                        </div>
                    </section>
                    <section id='tf2-trendy-collection2' className="tf-trendy-collections tf-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sc-heading style-2">
                                        <div className="content-left">
                                            <div className="inner">
                                                <h3>Wszystkie Przedmioty</h3>
                                                <p className="desc"><i className="fa-solid fa-check"></i> Realizacja zamówień jest natychmiastowa</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="categorySelectShop ">
                                                <div className="categorySslide">
                                                    <div className="categorySwiperWraper">
                                                        <div className="category-slide active" data-category='wszystko' onClick={(e)=>changeOption(e)}>Wszystko</div>
                                                        {
                                                            categories !== undefined?(
                                                                categories.map((category,index)=>{
                                                                    if(index > 0){
                                                                        return(
                                                                            <div key={index} className="category-slide" data-category={category.category} onClick={(e)=>changeOption(e)}>{category.category}</div>
                                                                        );
                                                                    }
                                                                    
                                                                })
                                                            ):''
                                                        }
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="itemsToBuy">
                                                <div className="row">
                                                    {
                                                        allitems !== undefined?(
                                                            allitems.map((item,index)=>{
                                                                return(
                                                                    <div className={`col-lg-3 col-6 cat-${item.itemcategory}`} onClick={(e)=>OpenBuyMenu(item.itemname,item.itemImg,item.itemcategory,item.itemlabel,item.itemprice,item.itemdesc)} data-category={item.itemcategory} key={index}>
                                                                        <div className="itemtobuycont">
                                                                            <div className="itbcimg">
                                                                                <img src={item.itemImg} alt="Image"></img>
                                                                                <label>{item.itemcategory}</label>
                                                                            </div>
                                                                            <div className="itemtobuyinfo">
                                                                                <div className="itemtobuyTitle">
                                                                                    {item.itemlabel}
                                                                                </div>
                                                                                <div className="itemtobuyDesc">
                                                                                    {item.itemdesc}
                                                                                </div>
                                                                                <div className="itemtobuyPrice">
                                                                                    <span>{item.itemprice}zł</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        ):''
                                                    }
                                                </div>
                                            </div>    
                                        </div>     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="new-letter">
                        <div className="container">
                            <div className="new-letter-inner style-2 flex">
                                <div className="new-letter-content">
                                    <h3 className="heading">Potrzebujesz własnego sklepu?</h3>
                                    <p className="sub-heading">Dołącz do naszego discorda juz teraz napisz do nas i zacznij działać! </p>
                                </div>
                                <div className="new-letter-img">
                                    <div className="form-subcribe">
                                        <form id="subscribe-form" action="#" method="GET" acceptCharset="utf-8"
                                            className="form-submit">
                                            <input name="email" disabled className="email" type="email"
                                                placeholder="Dołącz do naszego discorda" required=""></input>
                                            <a href='https://discord.gg/SnGbvRRGnv'>
                                                <button name="submit"  id="submit" className="sc-button style letter style-2">
                                                    <span>Dołącz teraz</span> 
                                                </button>
                                            </a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer id="footer" className="clearfix bg-style ft-home-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-6 col-md-6 col-12">
                                    <div className="widget widget-logo">
                                        <div className="logo-footer" id="logo-footer">
                                            <a href={server.discord} target='_blank' >
                                                Fancy RolePlay
                                            </a>
                                        </div>
                                        <p className="sub-widget-logo">Zakup w naszym sklepie jest zautomatyzowany w 100%, odrazu po opłaceniu produktu dostaniesz go w grze! </p>
                                            <h5 className="title-widget">
                                                <a href='http://lcore.pl/regulamin'>Regulamin </a>
                                                <a href='http://lcore.pl/'> &nbsp;&nbsp;Strona główna</a>
                                            </h5>

                                        <div className="widget-social">
                                            <ul>
                                                {
                                                    socials !== undefined ?(
                                                        socials.length > 0 ?(
                                                            socials.map((social, index)=>{
                                                                return(
                                                                <li key={index}><a href={social.link} className="active"><i className={social.icon}></i></a></li>
                                                                );
                                                            })
                                                        ):""
                                                    ):""
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <div className="widget widget-menu menu-marketplace">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    <div className="bottom">
                        <div className="container">
                            <div className="bottom-inner">
                                Copyright © 2023 lcore Wszelkie prawa zastrzeżone.  &nbsp;Ta strona nie jest powiązana ze Steam ani Valve
                            </div>
                        </div>
                    </div>

                </div>
            
            </div>
            <a id="scroll-top"></a>
            <div className="buyMenuCont" >
                <div className="buyMenu">
                    <div className="closebuyMenu" onClick={(e)=>CloseBuyMenu(e)} style={{zIndex:'999999'}}>
                        <i className="fa-solid fa-x"></i>
                    </div>
                    <div className="itemBuyMenuCont">
                        <form action="" className="userInfoFrom">        
                            <div className="row">
                                <div className="col-lg-8 col-12 userInfoBuyMenu">

                                    <h3>Finalizacja Zakupu</h3>
                                    <br></br>
                                    <h5>Twoje Dane</h5>
                                    <br></br>

                                    <label className='inputLabel' htmlFor="kod">Adres e-mail<span>*wymagany</span></label>
                                    <input type="email" onChange={(e)=> handleChange(e)} name="email" id="userInfoFromEmail" placeholder='Email' className='userInfoFromInput' />
                                    {
                                        addons !== undefined ?(
                                            addons.map((addon,index)=>{                  
                                                return(<label key={index} className='inputLabel' htmlFor={addon}>{addon}</label>);
                                            })
                                            
                                        ):''
                                    }
                                    {
                                        addons !== undefined ?(
                                            addons.map((addon,index)=>{
                                                return(<input type="email" key={index} onChange={(e)=> handleChange(e)} name={addon} id="userInfoFromEmail" placeholder={addon} className='userInfoFromInput' />);
                                            })
                                            
                                        ):''
                                    }
                                    <label className='inputLabel' id='userInfoFromCode' htmlFor="kod">Kod Rabatowy</label>
                                    <input type="text"  onChange={(e)=> handleChange(e)} name="kod" id="userInfoFromCode" placeholder='Kod' className='userInfoFromInput' />
                                    
                                    <div className="Zgody">
                                        <h5>zgody</h5>
                                        <br></br>
                                        <div className="regdiv">
                                            <input type="checkbox" name="regulaminCheck" id="regulaminCheck" className='userInfoFromCheck' />
                                            <label htmlFor="regulaminCheck">Oświadczam, że zapoznałem(-am) się z <a href='http://lcore.pl/regulamin'>Regulaminem</a> i w pełni akceptuję jego treść.</label>
                                        </div>
                                        <div className="zgodadiv">
                                            <input  type="checkbox" name="zgodaCheck" id="zgodaCheck" className='userInfoFromCheck' />
                                            <label  htmlFor="zgodaCheck">Wyrażam zgodę na natychmiastowe dostarczenie usługi i rozumiem, że jeśli płatność zostanie zrealizowana to nie przysługuje mi prawo do odstąpienia od umowy zawartej elektronicznie.</label>
                                        </div>
                                        <div className="Cashadiv">
                                            <div className="CashaCont">
                                                <input onClick={(e)=>thanksForTip(e)} type="checkbox" name="CashCheck" id="CashCheck" className='userInfoFromCheck' />
                                                <label onClick={(e)=>thanksForTip(e)} htmlFor="CashCheck">Chcę powiększyć wartość zamówienia o 5%, a wartość wpłaty przekazać w pełni na rozwój platformy lcore.</label>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div className="col-lg-4 col-12 InfoAbItem">
                                    <div className="InfoAbCont">
                                        <div className="itAbcimg">
                                            <img id='aa' src='https://cdn.discordapp.com/attachments/959822601264455690/1077708957130428566/skrzynki-niespodzianki_15__icon.png' alt="Image"></img>
                                            <label id='bb'></label>
                                        </div>
                                        <div className="itemAbtobuyinfo">
                                            <div className="itemtobuyTitle" id='cc'>
                                                item.itemlabel
                                            </div>
                                            <div className="itemtobuyDesc" id='dd'>
                                                item.itemdesc
                                            </div>
                                            <div className="itemtobuyPrice" id='esdfade'>
                                                <span >151.00zł</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="subForm">
                                {
                                    steamlogin !== undefined?
                                    (<p className='logStm' onClick={(e)=>payForItem(e)} style={{cursor:'pointer'}}>Zapłać (Kupujesz jako {steamlogin.displayName})</p>)
                                    :
                                    (<a  href={`http://localhost:5000/api/auth/steam/`}><p className='logStm'>Zaloguj się przez steama</p></a>)
                                }
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </main>
);
}
export default Fancy;
