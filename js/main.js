const nav = document.querySelector('.nav');
const home = document.querySelector('.home');
const main = document.querySelector('.main');
const imgPortfolio = document.querySelector('.examples_img');
const imgPortfolioAll = document.querySelectorAll('.examples_img img');
const cartBlog = document.querySelectorAll('.blog_cart');
const blog = document.querySelector('.education_box-slider');
const opinions = document.querySelectorAll('.opinions_list-card');
const siteNum = document.querySelector('.opinions_site-num');

let indexCart = 0;
let resetSetTimeout = false;
let observerOptions = {
	threshold: 0.1,
};
let isAnimationStarted = false;
let activeTimeouts = [];
let cartBlogTimeOne = 9000;
let cartBlogTimeTwo = 1000;
let q;

document.addEventListener('DOMContentLoaded', () => {
	nav.classList.remove('disable');
	home.classList.remove('disable');
	setTimeout(() => {
		main.classList.remove('disable');
		shiftImg();
	}, 1000);
});

const responsive = () => {
	if (window.innerWidth < 765) {
		cartBlogTimeOne = 9000;
		cartBlogTimeTwo = 9000;
	}
};
responsive();

const shiftImg = () => {
	for (let i = 0; i < imgPortfolioAll.length; i++) {
		const img = imgPortfolioAll[i];
		if (img.classList.contains('active')) {
			const intervalImgPortfolio = setInterval(() => {
				const widthImgBox = imgPortfolio.offsetWidth;
				let widthImg = img.clientWidth;
				let posImg = img.offsetLeft;
				img.style.left = posImg - 1 + 'px';
				if (posImg < widthImg * -1) {
					clearInterval(intervalImgPortfolio);
					img.classList.add('disable');
					img.classList.remove('active');
				} else if (posImg == (widthImg - widthImgBox) * -1) {
					if (i + 1 >= imgPortfolioAll.length) {
						imgPortfolioAll[0].classList.remove('disable');
						imgPortfolioAll[0].classList.add('active');
						imgPortfolioAll[0].style.left = widthImgBox + 'px';
					} else {
						imgPortfolioAll[i + 1].classList.remove('disable');
						imgPortfolioAll[i + 1].classList.add('active');
						imgPortfolioAll[i + 1].style.left = widthImgBox + 'px';
					}
					clearInterval(intervalImgPortfolio);
					shiftImg();
				}
			}, 40);
		}
	}
};
const animeCart = () => {
	if (resetSetTimeout) {
		return;
	}
	cartBlog[indexCart].classList.remove('disable');
	indexCart++;
	if (indexCart % 2 == 0) {
		const delayOne = setTimeout(() => {
			animeCart();
		}, cartBlogTimeOne);
		activeTimeouts.push(delayOne);
	} else {
		if (indexCart == cartBlog.length) {
			const delayTwo = setTimeout(() => {
				animeCart();
			}, cartBlogTimeOne);
			activeTimeouts.push(delayTwo);
		} else {
			const delayThree = setTimeout(() => {
				animeCart();
			}, cartBlogTimeTwo);
			activeTimeouts.push(delayThree);
		}
	}
	if (indexCart == cartBlog.length) {
		indexCart = 0;
	}
};
const resetBlog = () => {
	resetSetTimeout = true;
	isAnimationStarted = false;
	cartBlog.forEach((cart) => {
		cart.classList.add('disable');
	});
	activeTimeouts.forEach((el) => {
		clearTimeout(el);
	});
	activeTimeouts = [];
};
function windowWidth() {
	const screen = window.innerWidth;
	if (screen < 765) {
		q = 1;
		startCard(q);
		displayCard(q);
	} else if (screen >= 765 && screen < 998) {
		q = 2;
		startCard(q);
		displayCard(q);
	} else if (screen >= 998 && screen < 1280) {
		q = 3;
		startCard(q);
		displayCard(q);
	} else if (screen >= 1280) {
		q = 4;
		startCard(q);
		displayCard(q);
	}
}
function startCard(q) {
	for (let i = 0; i < q; i++) {
		opinions[i].classList.remove('disable');
		opinions[i].style.opacity = 1;
	}
}
function displayCard(q) {
	const quantityCards = Math.ceil(opinions.length / q);
	let start = 0;
	for (let i = 0; i < quantityCards; i++) {
		const newEl = document.createElement('span');
		newEl.setAttribute('data-start', start);
		newEl.textContent = i + 1;
		siteNum.appendChild(newEl);
		start += q;
	}
	const spanItem = document.querySelectorAll('.opinions_site-num span');
	spanItem[0].classList.add('active');
	spanItem.forEach((el) =>
		el.addEventListener('click', (e) => {
			spanItem.forEach((item) => {
				item.classList.remove('active');
			});
			e.target.classList.add('active');
			const clickF1 = parseInt(el.attributes[0].nodeValue);
			arrowHidden(spanItem);
			showCard(clickF1);
		})
	);
	if (window.innerWidth < 390) {
		spanItem.forEach(span=>span.classList.add('disable'))
	}
}
function showCard(clickF1) {
	opinions.forEach((el) => {
		el.style.opacity = 0;
		const closeSetTime = setTimeout(() => {
			el.classList.add('disable');
		}, 300);
	});
	for (let i = clickF1; i < clickF1 + q; i++) {
		if (i <= opinions.length - 1) {
			opinions[i].style.opacity = 0;
			const showSetTime = setTimeout(() => {
				opinions[i].classList.remove('disable');
			}, 320);
			setTimeout(() => {
				opinions[i].style.opacity = 1;
			}, 420);
		}
	}
}
function arrowOpinion(int) {
	const spanItemActive = document.querySelectorAll('.opinions_site-num span');
	let spanAtributeValue;
	let spanIndex;
	for (let i = 0; i < spanItemActive.length; i++) {
		const element = spanItemActive[i];
		if (element.classList.contains('active')) {
			spanAtributeValue =
				parseInt(element.attributes[0].nodeValue) + q * `${int}`;
			spanIndex =
				Array.from(spanItemActive).indexOf(element) + parseInt(`${int}`);
			element.classList.remove('active');
		}
	}
	spanItemActive[spanIndex].classList.add('active');
	arrowHidden(spanItemActive);
	showCard(spanAtributeValue);
}
function arrowHidden(spanItem) {
	const arrowLeft = document.querySelector('.opinions_site-btn--left');
	const arrowRight = document.querySelector('.opinions_site-btn--right');
	if (spanItem[0].classList.contains('active')) {
		arrowLeft.style.visibility = 'hidden';
		arrowRight.style.visibility = 'visible';
	} else if (spanItem[spanItem.length - 1].classList.contains('active')) {
		arrowRight.style.visibility = 'hidden';
		arrowLeft.style.visibility = 'visible';
	} else {
		arrowLeft.style.visibility = 'visible';
		arrowRight.style.visibility = 'visible';
	}
}
windowWidth();
let observer = new IntersectionObserver((el) => {
	el.forEach((en) => {
		if (en.isIntersecting && !isAnimationStarted) {
			// obser();
			isAnimationStarted = true;
			resetSetTimeout = false;
			animeCart();
		} else {
			resetBlog();
		}
	});
}, observerOptions);
observer.observe(blog);
cartBlog.forEach((cart) =>
	cart.addEventListener('animationend', function () {
		cart.classList.add('disable');
	})
);
document.addEventListener('visibilitychange', () => {
	if (document.visibilityState == 'visible') {
		resetBlog();
		resetSetTimeout = false;
		animeCart();
	}
});
window.addEventListener('resize', () => {
	opinions.forEach((el) => {
		el.classList.add('disable');
	});
	const spanItem = document.querySelectorAll('.opinions_site-num span');
	spanItem.forEach((el) => {
		el.remove();
	});
	windowWidth();
});