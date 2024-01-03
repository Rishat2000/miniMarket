import '../scss/style.scss';

const API = "http://localhost:8000/carts";

const addForm = document.querySelector('.add');
const updateForm = document.querySelector('.update');

document.addEventListener("click", popup);

function popup(e) {
	const targetElement = e.target;
	if (targetElement.closest('.admin__add')) {
		addForm.style = "display: block"
	}
	if (targetElement.closest('#close-image')) {
		addForm.style = "display: none";
	}
	if (targetElement.closest(".admin-items__edit")) {
		updateForm.style = "display: block";
	}
	if (targetElement.closest("#close-update")) {
		updateForm.style = "display: none";
	}
}

/* ------------------------------------------------------ */

const inputName = document.querySelector('#name');
const inputSubTitle = document.querySelector('#subTitle');
const inputPrice = document.querySelector('#price');
const inputPhoto = document.querySelector('#photo');
const adminList = document.querySelector('.admin-items');

const updateName = document.querySelector('#updateName');
const updateSubTitle = document.querySelector('#updateSubTitle');
const updatePrice = document.querySelector('#updatePrice');
const updatePhoto = document.querySelector('#updatePhoto');

addForm.addEventListener("submit", function (e) {
	e.preventDefault();
	if (!inputName.value.trim() && !inputSubTitle.value.trim() && !inputPrice.value.trim()) {
		alert("Заполните все поля!");
	} else {
		const reader = new FileReader();
		reader.onload = function (event) {
			let obj = {
				name: inputName.value,
				subTitle: inputSubTitle.value,
				price: inputPrice.value,
				photo: event.target.result,
			};
			create(obj);
			inputName.value = '';
			inputSubTitle.value = '';
			inputPrice.value = '';
			inputPhoto.value = '';
		};
		if (!inputPhoto.files[0]) {
			alert("Выберете картинку");
		} else {
			reader.readAsDataURL(inputPhoto.files[0]);
			addForm.style = "display: none";
		}
	}
});

function create(obj) {
	fetch(API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(obj),
	}).then(() => readAdmin());
}

function readAdmin() {
	fetch(API).then(res => {
		return res.json();
	}).then(data => {
		adminList.innerHTML = "";
		data.forEach(element => {
			adminList.innerHTML += `
			<li class="admin-items__item" id="${element.id}">
				<div class="admin-items__image-ibg"><img src="${element.photo}" alt="cup"></div>
				<div class="admin-items__text">
					<div class="admin-items__title">${element.name}</div>
					<div class="admin-items__sub-title">${element.subTitle}</div>
					<div class="admin-items__price">$${element.price}</div>
				</div>
				<div class="admin-items__edit" id="${element.id}">EDIT</div>
				<div class="admin-items__delete" id="${element.id}">DELETE</div>
			</li>
			`
		});
	})
}
readAdmin();

function deleteCart() {
	document.addEventListener("click", function (e) {
		const cartDeleteClass = e.target;
		if (cartDeleteClass.closest(".admin-items__delete")) {
			let cartId = cartDeleteClass.id;
			fetch(`${API}/${cartId}`, {
				method: "DELETE"
			})
				.then(res => res.json())
				.then(() => {
					readAdmin();
				})
		}
	});
}
deleteCart();

document.addEventListener("click", function (e) {
	const targetElement = e.target;
	const id = targetElement.id;
	if (targetElement.closest(".admin-items__edit")) {
		fetch(`${API}/${id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				updateName.value = data.name;
				updateSubTitle.value = data.subTitle;
				updatePrice.value = data.price;
			});
	}
	updateForm.addEventListener("submit", function (e) {
		const reader = new FileReader();
		reader.onload = function (event) {
			let updateObject = {
				name: updateName.value,
				subTitle: updateSubTitle.value,
				price: updatePrice.value,
				photo: event.target.result,
			};
			editCart(updateObject, id);
		};
		reader.readAsDataURL(updatePhoto.files[0]);
		e.preventDefault();
	});
});


function editCart(newObj, id) {
	fetch(`${API}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(newObj),
	}).then(() => {
		readAdmin()
		updateForm.style = "display: none"
	})
}