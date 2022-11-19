(function (html) {
	'use strict';

	const cfg = {
		finalDate: 'March 19, 2023 00:00:00'
	};


	const ssPreloader = function () {

		const body = document.querySelector('body');
		const preloader = document.querySelector('#preloader');
		const intro = document.querySelector('.s-intro');

		if (!(preloader && intro)) return;

		html.classList.add('ss-preload');

		window.addEventListener('load', function () {

			html.classList.remove('ss-preload');
			html.classList.add('ss-loaded');

			preloader.addEventListener('transitionstart', function gotoTop(e) {
				if (e.target.matches('#preloader')) {
					window.scrollTo(0, 0);
					preloader.removeEventListener(e.type, gotoTop);
				}
			});

			preloader.addEventListener('transitionend', function afterTransition(e) {
				if (e.target.matches('#preloader')) {
					body.classList.add('ss-show');
					e.target.style.display = 'none';
					preloader.removeEventListener(e.type, afterTransition);
				}
			});

		});

		window.addEventListener('beforeunload', function () {
			body.classList.remove('ss-show');
		});
	};

	const ssCountdown = function () {

		const finalDate = new Date(cfg.finalDate).getTime();
		const daysSpan = document.querySelector('.counter .ss-days');
		const hoursSpan = document.querySelector('.counter .ss-hours');
		const minutesSpan = document.querySelector('.counter .ss-minutes');
		const secondsSpan = document.querySelector('.counter .ss-seconds');
		let timeInterval;

		if (!(daysSpan && hoursSpan && minutesSpan && secondsSpan)) return;

		function timer() {

			const now = new Date().getTime();
			let diff = finalDate - now;

			if (diff <= 0) {
				if (timeInterval) {
					clearInterval(timeInterval);
				}
				return;
			}

			let days = Math.floor(diff / (1000 * 60 * 60 * 24));
			let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			let minutes = Math.floor((diff / 1000 / 60) % 60);
			let seconds = Math.floor((diff / 1000) % 60);

			if (days <= 99) {
				if (days <= 9) {
					days = '0' + days;
				} else {
					days = days;
				}
			}

			hours <= 9 ? hours = '0' + hours : hours;
			minutes <= 9 ? minutes = '0' + minutes : minutes;
			seconds <= 9 ? seconds = '0' + seconds : seconds;

			daysSpan.textContent = days;
			hoursSpan.textContent = hours;
			minutesSpan.textContent = minutes;
			secondsSpan.textContent = seconds;

		}

		timer();
		timeInterval = setInterval(timer, 1000);
	};

	(function ssInit() {
		ssPreloader();
		ssCountdown();
	})();

})(document.documentElement);
