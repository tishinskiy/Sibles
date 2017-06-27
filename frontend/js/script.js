;'use strict';

(function () {


	$(document).ready(function(){

		$("[data-fancybox]").fancybox({
				// Options will go here
			});

		$(".callback-button, .callback-button-light").click(function(){
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

		var map;
		if($("#map").length) {


			DG.then(function () {
				map = DG.map('map', {
					center: [55.084190119666815,82.97772730228381],
					zoom: 15,
					boxZoom: false,
					geoclicker: false,
					zoomControl: false,
					fullscreenControl: false,
					scrollWheelZoom: false,
				});
				DG.marker([55.084190119666815,82.97772730228381]).addTo(map);
			});
		}

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

		if($("#carousel-list").length) {
			$('#carousel-list').slick({
				autoplay: true,
				centerMode: true,
				centerPadding: '30px',
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				// arrows:false,
				variableWidth: true
			})
		}


		$(".form-block input[type='file']").styler({
			filePlaceholder: 'Загрузите изображение дома вашей мечты в формате .jpeg или .png'
		});
	});
})();
