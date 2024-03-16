const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const input = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".buttonWrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageWrapper = document.querySelector(".image-wrapper");

runEvents();

function runEvents() {
	form.addEventListener("submit", search);
	clearButton.addEventListener("click", clear);
}

function search(e) {
	imageWrapper.innerHTML = "";
	e.preventDefault();

	const value = input.value.trim();

	fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
		method: "GET",
		headers: {
			Authorization: "Client-ID A7NGShOZ05O8QwcEgQxL14AS_oGFgsjoO9N20d1CpVM",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			Array.from(data.results).forEach((image) => {
				//!image.urls.small
				addImageToUI(image.urls.small);
			});
		})
		.catch((err) => console.log(err));

	input.value = "";
}

function addImageToUI(url) {
	const div = document.createElement("div");
	div.className = "card";

	const img = document.createElement("img");
	img.setAttribute("src", url);
	img.width = "300";
	img.height = "300";

	div.append(img);
	imageWrapper.append(div);
}

function clear() {
	input.value = "";
	// Array.from(imageWrapper.children).forEach((div) => div.remove());
	imageWrapper.innerHTML = "";
}
