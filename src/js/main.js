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

/* PAGE THEME */

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

/* LOGIN */

const adminAPI = "http://localhost:8000/admin";
const closeLogin = document.querySelector('#close-login');
const loginForm = document.querySelector('.login');
const loginEmail = document.querySelector('.login__email');
const loginPassword = document.querySelector('.login__password');

headerRegistration.addEventListener("click", function (e) {
	loginForm.style = "display: block";
});
closeLogin.addEventListener("click", function (e) {
	loginForm.style = "display: none";
});

fetch(adminAPI)
	.then(res => {
		return res.json();
	})
	.then(data => {
		loginForm.addEventListener("submit", function (e) {
			e.preventDefault();
			if (String(loginEmail.value) == data[0].email && String(loginPassword.value) == data[0].password) {
				window.location.href = "adminPage.html";
				loginEmail.value = "";
				loginPassword.value = "";
			} else {
				alert("Неверные учетные данные");
			}
		});
	});

/* SEARCH */

const searchInput = document.querySelector('.header__input');

searchInput.addEventListener("input", function (e) {
	const inputValue = e.target.value.toLowerCase();
	fetch(API).then(res => {
		return res.json();
	}).then(data => {
		userList.innerHTML = "";
		data.forEach(element => {
			let objName = element.name;
			let lowerElement = objName.toLowerCase();
			if (lowerElement.includes(inputValue)) {
				userList.innerHTML += `
                    <li class="cart-items__item">
                        <div class="cart-items__image-ibg"><img src="${element.photo}" alt="cup"></div>
                        <div class="cart-items__text">
                            <div class="cart-items__title">${element.name}</div>
                            <div class="cart-items__sub-title">${element.subTitle}</div>
                            <div class="cart-items__price">$${element.price}</div>
                        </div>
                    </li>
                `;
			}
		});
	})
});