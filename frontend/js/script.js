;'use strict';

(function () {


    $(document).ready(function(){
        $(".callback-button").click(function(){
            $.fancybox.open($('.modal-wrap'), {});
        })
        $(".top-search").click(function(){
            $(this).addClass('seach-active');
        });

        $(document).click(function(e) {

            if($(".seach-active").length) {
               if($(e.target).closest(".top-search").length === 0) {
                   $(".seach-active").removeClass("seach-active");
               }
            }
        })

        $('#top-slider').slick({
            fade: true,
            speed: 2000,
            dots: true,
            arrows:false,
            autoplay: true,
            appendDots: $("#slider-pager"),
        });
    });
})();
