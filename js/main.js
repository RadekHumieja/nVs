const nav = document.querySelector('.nav');
const home = document.querySelector('.home');
const main = document.querySelector('.main');
const imgPortfolio = document.querySelector('.examples_img');
const imgPortfolioAll = document.querySelectorAll('.examples_img img');
const cartBlog = document.querySelectorAll('.blog_cart');
const blog = document.querySelector('.education_box-slider');

let indexCart = 0;
let resetSetTimeout = false;
let observerOptions = {
	threshold: 0.1,
};
let isAnimationStarted = false;
let activeTimeouts = [];
let cartBlogTimeOne = 9000;
let cartBlogTimeTwo = 1000;

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
// responsive();

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
