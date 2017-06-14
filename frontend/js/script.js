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
                //    console.log($(e.target).closest("div.top-search"));
                   $(".seach-active").removeClass("seach-active");
               }
            }
        })


    });
})();
