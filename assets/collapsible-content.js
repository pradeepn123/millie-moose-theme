(function () {
	const showContactForm = () => {
		$(".collapsible-contact-support__button").click(function () {
			$(".collapsible-contact-support__contact-form").slideToggle();
		});
		$(".collapsible-content-summery").click(function () {
			if (!$(this).hasClass("active")) {
				$(".collapsible-content-summery.active").removeClass("active");
				$(this).addClass("active");
				$(".collapsible-content-block__description").stop().slideUp(300);
				$(this)
					.siblings(".collapsible-content-block__description")
					.eq($(this).index())
					.stop()
					.slideDown(300);
			} else {
				$(this).removeClass("active");
				$(this)
					.siblings(".collapsible-content-block__description")
					.stop()
					.slideUp(300);
			}
		});
	};

	showContactForm();
})();
