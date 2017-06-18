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

		$(".reference-modal-close").click(function(){
			$(this).closest(".reference-modal").fadeOut('fast');
		});

		$(".reference-item-link").click(function(){
			$(this).toggleClass('show');
			
			$(".reference-item-link").each(function(){
				if($(this).hasClass('show')) {
					$(this).next(".reference-modal").fadeOut('fast');
				}
			})
			$(this).next(".reference-modal").fadeToggle('fast');
		});

		$('.big-slider').each(function(){
			var pager = $(this).next(".container").find(".slider-pager");
			$(this).slick({
				fade: true,
				speed: 2000,
				dots: true,
				arrows:false,
				autoplay: true,
				appendDots: pager,
			});
		});


		$(".form-block input[type='file']").styler({
			filePlaceholder: 'Загрузите изображение дома вашей мечты в формате .jpeg или .png'
		});
	});
})();
