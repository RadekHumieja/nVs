const body = document.querySelector('body');

const mediaQuares = () => {
	if (body.clientWidth >= 765) {
		navWidth765();
	}
	if (body.clientWidth >= 1200) {
		navBurgerWrapper();
	}
};
const navBurgerWrapper = () => {
	const navBurger = document.querySelector('.nav_burger');
	navBurger.classList.add('burger-wrapper');
	// console.log(navBurger);
};
const navWidth765 = () => {
	const navLogo = document.querySelector('.nav_logo');
	const homeBox = document.querySelector('.home_box');
	const navList = document.querySelector('.nav_list');
	const btnBlogNav = document.querySelector('.nav_list-btn--blog');
	const positionHomeX = homeBox.offsetLeft;
	const positionHomeY = homeBox.offsetTop;
	const homeWidth = homeBox.clientWidth;

	const logoPlace = () => {
		navLogo.style.top = positionHomeY - navLogo.clientHeight - 80 + 'px';
		navLogo.style.left = positionHomeX - navLogo.clientWidth + 80 + 'px';
	};
	const navListPlace = () => {
		if (navList.classList.contains('nav-fixed')) return;
		navList.style.top = positionHomeY - 40 + 'px';
		navList.style.right = positionHomeX - 10 + 'px';
	};
	const btnBlogPsition = () => {
		if (navList.classList.contains('nav-fixed')) {
			btnBlogNav.style.position = 'static';
			navList.style.scale = '1.6';
			return;
		}
		btnBlogNav.style.top = homeBox.offsetTop - navList.offsetTop + 10 + 'px';
		const x =
			(homeBox.offsetWidth -
				(homeBox.offsetLeft + homeBox.offsetWidth - navList.offsetLeft) +
				50) /
			1.3;
		btnBlogNav.style.left = -x + 'px';
	};
	navListPlace();
	logoPlace();
	btnBlogPsition();
};
mediaQuares()
setInterval(() => {
	mediaQuares();
}, 200);
