const form = document.querySelector(".form");
const feedbackButtons = document.querySelectorAll(".feedback-btn");
const overlay = document.querySelector(".overlay");
const formVisible = document.querySelector(".form--visible");
const burgerBtn = document.querySelector(".header__menu");
const burgerMenu = document.querySelector(".burger__menu");
const body = document.body;

const showForm = () => {
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  let isOpen = form.classList.contains("form--visible");

  overlay.style.zIndex = "6";
  burgerMenu.classList.remove("burger__menu--active");
  burgerBtn.classList.remove("header__menu--active");
  if (isOpen) {
    form.classList.remove("form--visible");
    overlay.classList.remove("form--visible");

    form.addEventListener("transitionend", function handler() {
      body.style.paddingRight = "";
      body.classList.remove("scroll--hidden");
      form.removeEventListener("transitionend", handler);
    });
  } else {
    body.style.paddingRight = `${scrollbarWidth}px`;
    body.classList.add("scroll--hidden");

    form.classList.add("form--visible");
    overlay.classList.add("form--visible");
  }
};

overlay.addEventListener("click", () => {
  if (burgerMenu.classList.contains("burger__menu--active")) {
    overlay.classList.remove("form--visible");
    burgerMenu.classList.remove("burger__menu--active");
    burgerBtn.classList.remove("header__menu--active");
    body.classList.remove("scroll--hidden");
  } else showForm();
});

burgerMenu.addEventListener("click", () => {
  overlay.style.zIndex = "4";
  burgerMenu.classList.toggle("burger__menu--active");
  burgerBtn.classList.toggle("header__menu--active");
  overlay.classList.toggle("form--visible");
  body.classList.toggle("scroll--hidden");
});

feedbackButtons.forEach((element) => {
  element.addEventListener("click", () => showForm());
});
