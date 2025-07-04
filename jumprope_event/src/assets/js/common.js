// rem 수치 변환
const windowSize = $(window).innerWidth(),
baseSize = 640;
if (windowSize < baseSize) {
    $(document).find('html').animate({fontSize:$(window).innerWidth()/360},0)
} else {
    $(document).find('html').animate({fontSize:baseSize/360},0)
}

// rem resize 수치 변환
$(window).on('resize',function() {
    if ($(window).innerWidth() < baseSize) {
        $(document).find('html').animate({fontSize:$(window).innerWidth()/360},0)
    } else {
        $(document).find('html').animate({fontSize:baseSize/360},0)
    }
});

// 탭
$(".tab-menu li").on("click", function() {
    $(this).parents(".tab-wrapper").find(".tab-menu li").removeClass("active");
    $(this).addClass("active");
    $(this).parents(".tab-wrapper").find(".tab_content").hide();
    $(this).parents(".tab-wrapper").find(".tab_content").eq($(this).index()).show();
});

// 팝업 모듈
// onclick="popup.open('레이어명')" 팝업 오픈
// onclick="popup.close('레이어명')" 팝업 닫힘
// open 되면 active 클래스 추가
const popup = (function() {
    let dim = $('.dim'),
    ico_close = $('.popup .pop_header .popup_header_close'),
    close_flag=true;
    function popupOpen(el) {
        el.removeClass('none');
        $("body").addClass('non_scroll');
        setTimeout(function () {
            var popupButtonHeight = el.find(".pop_body").children(".btn_box").height() || 0;
            var popupHeaderHeight = el.find(".pop_header").height() || 0;
            var popupContainerHeight = el.children(".popup_container").height() || 0;
            el.find(".pop-scroll").css({
            height: (popupContainerHeight - popupButtonHeight - popupHeaderHeight) + 'px'
            })
            el.addClass("active");
        }, 10);
    }
    function popupClose(el){
        el.removeClass("active");
        setTimeout(function(){
            el.addClass('none');
            if ($('.popup.active').length <= 1) {
                $("body").removeClass('non_scroll');
            }
        }, 500);
    }
    function popupCloseAll(el){
        el.removeClass("active");
        setTimeout(function(){
            // window.scrollTo(0,0);
            dim.hide();
            $("body").removeClass('non_scroll');
            el.addClass('none');
        }, 500);
    }
    return{
        init : function(){
            dim.on("click",function(){
                const targetPop = $(this).parents('.popup');
                if( targetPop.hasClass('vs_type') !== true || targetPop.hasClass('head_fix') !== true ){
                popupClose($(this).parents('.popup'));
                } else {
                targetPop.removeClass('active');
                close_flag=true
                }
            });
            ico_close.on("click",function(){
                popupClose($(this).parents('.popup'));
            });
        },
        open : function(el){
            popupOpen($("."+el));
        },
        close : function(el){
            popupClose($("."+el));
        },
        restoreChange: function(el, before, after){
            popupClose($("."+el));
            setTimeout(function() {
                $(`.${el} .${before}`).show(0);
                $(`.${el} .${after}`).hide(0);
            }, 501);
        },
        closeAll : function(el){
            popupcloseAll(el);
        }
    }
})();
popup.init();