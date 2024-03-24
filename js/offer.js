class Filtration {
	constructor(item) {
		this.item = document.querySelector(item);
		this.category = this.item.dataset.category;
		this.items = document.querySelectorAll('.offer_website-tab');
		this.select();
	}
	animeStart = (el) => {
		el.classList.remove('anime-item-end');
		el.style.opacity = 0;
		el.style.display = 'block';
		el.classList.add('anime-item-start');
	};
	animeEnd = (el) => {
		el.classList.remove('anime-item-start');
		el.classList.add('anime-item-end');
	};
	activeBtn = () => {
		const btns = document.querySelectorAll('.offer_website-btn');
		btns.forEach((btn) => btn.classList.remove('active_gray'));
		this.item.classList.add('active_gray');
	};
	select = () => {
		this.items.forEach((el) => {
			const categoryItem = el.dataset.categoryitem;
			this.animeEnd(el);
			setTimeout(() => {
				if (categoryItem == this.category) {
					this.animeStart(el);
					this.activeBtn(el);
				} else {
					el.style.display = 'none';
				}
			}, 300);
		});
	};
}
function filter(el) {
	let filtration = new Filtration(el);
}
