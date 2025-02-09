import Product from "./../src/product.js";
import CartServises from "../src/cartServises.js";
import getData from "../src/getData.js";
import cart from "../src/cart.js";
import Checkout from "../src/checkOut.js";
document.addEventListener("DOMContentLoaded", () => {
  Product.renderProducts();
});
// Use event delegation on .product-grid
document.querySelector(".product-grid").addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    console.log("Button clicked:", event.target);
    const productCard = event.target.closest(".product-card");
    const productTitle = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector(".price").textContent;
    const productImage = productCard.querySelector(".product-image").src;

    const newCart = new cart(productTitle, productPrice, productImage);
    CartServises.addProduct(newCart);
  }
});

document.querySelector(".cart-items").addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    const productCard = event.target.closest(".cart-item");
    const productTitle = productCard.querySelector(".product-name").textContent;
    CartServises.removeProduct(productTitle);
  }
});
document.querySelector(".checkout-btn").addEventListener("click", () => {
  const cart = CartServises.cart;
  if (cart.length === 0) {
    alert("Your cart is empty! Please add some items before checkout.");
    return;
  }
  Checkout.showCheckoutModal();
});
document.querySelector(".search-btn").addEventListener("click", () => {
  const searchTerm = document.querySelector(".search-input").value;
  Product.searchProduct(searchTerm);
});

const lowToHigh = document.getElementById("sortlth");
lowToHigh.addEventListener("click", () => {
  Product.sortLowToHigh();
});
const highToLow = document.getElementById("sorthtl");
highToLow.addEventListener("click", () => {
  Product.sortHighToLow();
});
