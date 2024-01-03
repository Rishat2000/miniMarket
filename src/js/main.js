import '../scss/style.scss';

const API = "http://localhost:8000/carts";

/* ------------------------------------------------------ */

const body = document.querySelector('body');

/* SHOW CART ON USER PAGE */
const userList = document.querySelector('.cart-items');

function read() {
	fetch(API).then(res => {
		return res.json();
	}).then(data => {
		userList.innerHTML = "";
		data.forEach(element => {
			userList.innerHTML += `
			<li class="cart-items__item"">
				<div class="cart-items__image-ibg"><img src="${element.photo}" alt="cup"></div>
				<div class="cart-items__text">
					<div class="cart-items__title">${element.name}</div>
					<div class="cart-items__sub-title">${element.subTitle}</div>
					<div class="cart-items__price">$${element.price}</div>
				</div>
			</li>
			`
		});
	})
}
read();

/* PAGE THEMR */
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const header = document.querySelector('.header');
const headerRegistration = document.querySelector('.header__registration');

function setTheme(color) {
	if (color === 'light') {
		body.style = "background-color: #fff; color: #000;";
		header.style = "background-color: #ccc8c8;";
		headerRegistration.style = "background-color: #fff;";
		sun.style = "display: none";
		moon.style = "display: block";
	} else {
		body.style = "";
		header.style = "";
		headerRegistration.style = "";
		moon.style = "display: none";
		sun.style = "display: block";
	}
	localStorage.setItem('theme', color);
}

sun.addEventListener("click", () => setTheme('light'));
moon.addEventListener("click", () => setTheme('dark'));

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme);