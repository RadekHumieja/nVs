const msgStatus = document.querySelector('.msg-status');
const contactBox = document.querySelectorAll('.contact-box');
const rodo = document.querySelector('.contact-box--rodo');
const form = document.querySelector('#form');

function checkImput() {
	contactBox.forEach((inp) => {
		const inpValue = inp.children[1].value;
		const inpError = inp.children[2];
		if (inpValue === '' || inpValue.length <= 3) {
			inp.children[1].classList.add('error');
			inp.children[2].classList.add('error');
		} else {
			inp.children[1].classList.remove('error');
			inp.children[2].classList.remove('error');
		}
	});
	if (rodo.children[0].checked) {
		rodo.children[1].classList.remove('error');
	} else {
		rodo.children[1].classList.add('error');
	}
}
function checkMail() {
	const mail = document.querySelector('#email');
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	const mailTest = re.test(mail.value);
	if (!mailTest) {
		mail.classList.add('error');
		mail.parentElement.children[2].classList.add('error');
	}
}
function checkError(e) {
	const error = document.querySelectorAll('.error');
	if (error.length !== 0) {
		e.preventDefault();
	}
}
function checkForm(e) {
	checkImput();
	checkMail();
	checkError(e);
}

if (document.location.search === '?mail_status=sent') {
	msgStatus.classList.add('success');
	msgStatus.textContent = 'Wiadomość wysłana!';

	setTimeout(() => {
		msgStatus.classList.remove('success');
		window.location.replace(
			'http://localhost:3000/Desktop/nVc/nVc.www/contact.html'
		);
	}, 3000);
}

if (document.location.search === '?mail_status=error') {
	msgStatus.classList.add('error');
	msgStatus.textContent = 'Wystąpił błąd.';

	setTimeout(() => {
		msgStatus.classList.remove('error');
		window.location.replace(
			'http://localhost:3000/Desktop/nVc/nVc.www/contact.html'
		);
	}, 3000);
}
form.addEventListener('submit', checkForm);
