"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let cart = [];
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const products = yield response.json();
            displayProducts(products);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    });
}
function displayProducts(products) {
    const container = document.querySelector(".products-container");
    container.innerHTML = "";
    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
      <img src="${product.image}" width="100">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
        container.appendChild(div);
    });
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = parseInt(event.target.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}
function addToCart(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://fakestoreapi.com/products/${productId}`);
            const product = yield response.json();
            cart.push(product);
            updateCart();
        }
        catch (error) {
            console.error("Error adding to cart:", error);
        }
    });
}
function updateCart() {
    const cartContainer = document.querySelector(".cart-items");
    const totalElement = document.querySelector(".total-price");
    const cartCountElement = document.querySelector(".cart-count");
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
      <img src="${item.image}" width="50">
      <h4>${item.title}</h4>
      <p>$${item.price}</p>
      <button class="remove-from-cart" data-index="${index}">Remove</button>
    `;
        cartContainer.appendChild(div);
        total += item.price;
    });
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartCountElement.textContent = `${cart.length}`;
    document.querySelectorAll(".remove-from-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = parseInt(event.target.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
document.querySelector(".checkout-btn").addEventListener("click", () => {
    const modal = document.querySelector(".checkout-modal");
    const summaryContainer = document.querySelector(".cart-summary");
    const totalElement = document.querySelector(".total-checkout");
    summaryContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${item.title} - $${item.price}</p>`;
        summaryContainer.appendChild(div);
        total += item.price;
    });
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    modal.style.display = "block";
});
document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".checkout-modal").style.display =
        "none";
});
fetchProducts();
