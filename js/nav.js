const dataDay = document.querySelectorAll('.nav_logo-data--day');
const dataMonth = document.querySelectorAll('.nav_logo-data--month');
const dataYear = document.querySelectorAll('.nav_logo-data--year');

const navList = document.querySelector('.nav_list');
const navBurger = document.querySelector('.nav_burger');
const navAside = document.querySelector('.nav_aside');

const date = new Date();
const getDay = date.getDate();
const getMonth = date.getMonth();
const getYear = date.getFullYear();

const month = [
	'Styczeń',
	'Luty',
	'Marzec',
	'Kwiecień',
	'Maj',
	'Czerwiec',
	'Lipiec',
	'Sierpień',
	'Wrzesień',
	'Październik',
	'Listopad',
	'Grudzień',
];
const changingData = () => {
	dataDay.forEach((day) => {
		day.textContent = getDay;
	});
	dataMonth.forEach((mon) => {
		mon.textContent = month[getMonth];
	});
	dataYear.forEach((year) => {
		year.textContent = getYear;
	});
};

const scrollActive = () => {
	const scroll = parseInt(scrollY);
	if (scroll >= navList.offsetTop + navList.offsetWidth + 20) {
		navBurger.style.display = 'block';
		navBurger.style.scale = 1;
	} else {
		navBurger.style.scale = 0;
		navAside.classList.add('nav-active');
	}
	// console.log(scroll);
};
const burgerClick = () => {
	navAside.classList.toggle('nav-active');
};
const clickWindow = (e) => {
	if (
		e.target.classList.contains('nav_burger') ||
		e.target.classList.contains('nav_burger-btn') ||
		e.target.classList.contains('nav_burger-btn--item')
	) {
		return;
	} else {
		setTimeout(() => {
			navAside.classList.add('nav-active');
		}, 200);
	}
};
changingData();
window.addEventListener('scroll', scrollActive);
window.addEventListener('click', clickWindow);
navBurger.addEventListener('click', burgerClick);
