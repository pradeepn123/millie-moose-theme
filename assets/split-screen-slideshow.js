(function () {
	const slideshow = () => {
		$(".split-screen-slideshow-section").each(function () {
			if ($(this).hasClass("slider_started")) {
				return "";
			}
			$(this).addClass("slider_started");
			const id = $(this).attr("id");
			const box = $(this).find(".split-screen-slideshow");
			const autoplay = box.data("autoplay");
			const parallax = box.data("parallax");
			const stopAutoplay = box.data("stop-autoplay");
			const delay = box.data("delay") * 1000;
			let stickySlider = true;
			if ($(`#${id} .split-screen-slideshow__img.swiper`).length > 0) {
				stickySlider = false;
			}

			let autoplayParam;
			if (autoplay && !stickySlider) {
				autoplayParam = {
					autoplay: {
						delay: delay,
						pauseOnMouseEnter: stopAutoplay,
						disableOnInteraction: false,
					},
				};
			} else {
				autoplayParam = { autoplay: false };
			}

			const commonParams = {
				speed: box.data("speed") * 1000,
				effect: box.data("effect"),
				loop: false,
				autoHeight: false,
				calculateHeight: false,
				keyboard: true,
				parallax: parallax,
				direction: "vertical",
				...autoplayParam,
			};

			const textSlider = new Swiper(
				`#${id} .split-screen-slideshow__text.swiper`,
				{
					...commonParams,
					navigation: {
						nextEl: `#${id} .swiper-button-next`,
						prevEl: `#${id} .swiper-button-prev`,
					},
					pagination: {
						el: `#${id} .swiper-pagination`,
						type: "bullets",
						renderBullet: function (activeIndex, className) {
							return (
								'<span class="' + className + '">' + "<em>" + "</em>" + "</span>"
							);
						},
					},
				}
			);

			if (!stickySlider) {
				const imgSlider = new Swiper(
					`#${id} .split-screen-slideshow__img.swiper`,
					{
						...commonParams,
						autoplay: false,
					}
				);
				textSlider.controller.control = imgSlider;
				imgSlider.controller.control = textSlider;
			} else {
				let oldScroll = 0
				$(window).scroll(() => {
					const scroll = window.scrollY;
					const position = $(this).offset().top;
					const images = $(this).find(".split-screen-slideshow__img-wrapper");
					const imagesCount = images.length;
					const height = $(this).height();
					const realHeight = height - height / imagesCount;
					const realScroll = scroll - position;
					const slidesCount = textSlider.slides.length;
					let scrollTo = ''
					if (scroll > oldScroll) {
						// down
						scrollTo = 'down'
					} else {
						//up
						scrollTo = 'up'
					}
					oldScroll = scroll
					images.each(function(index) {
						const imageHeight = $(this).height();
						let imagesHeight = 0;
						for (let i = 0; i < index; i++) {
							imagesHeight += $(images[i]).height()
						}
						if( scrollTo === 'down') {
							if ( realScroll >= imagesHeight + imageHeight / 2 && realScroll < imagesHeight + imageHeight * 1.5 ) {
								if (index === slidesCount)return;
								textSlider.slideTo(index + 1);
							}
						} else if(scrollTo === 'up') {
							if ( realScroll >= imagesHeight - imageHeight / 2 && realScroll < imagesHeight + imageHeight / 2) {
								if (index === 0) {
									textSlider.slideTo(index);
									return;
								};
								textSlider.slideTo(index);
							}
						}
						if(index === 0) return;
						if (realScroll >= imagesHeight - imageHeight && realScroll <= imagesHeight + imageHeight) {
							let progress = Math.floor((100 * (imagesHeight - realScroll)) / imageHeight);
							if (progress > 95) progress = 100;
							if (progress < 5) progress = 0;
							$(this).css('clip-path',`polygon(0 ${progress}%,100% ${progress}%,100% 100%,0 100%)`)
						}
					})
				});
			}
		});
	};

	document.addEventListener("DOMContentLoaded", function () {
		slideshow();
		document.addEventListener("shopify:section:load", function () {
			slideshow();
		});
	});
})();
