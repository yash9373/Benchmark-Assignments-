import cart from "./cart.js";
import CartServices from "./cartServises.js";
class Checkout {
  static showCheckoutModal() {
    const modal = document.querySelector(".checkout-modal");
    const cartItemsList = document.querySelector(".cart-items-list");
    const totalPriceElement = document.querySelector(".total-price");

    cartItemsList.innerHTML = "";

    CartServices.cart.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.innerHTML = `${product.title} - $${product.price}`;
      cartItemsList.appendChild(productItem);
    });

    totalPriceElement.textContent = `Total: $${CartServices.totalCartPrice()}`;

    modal.style.display = "flex";

    document.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none";
    });

    document.querySelector(".checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const address = document.querySelector("#address").value;

      alert(
        `Order placed successfully!\nName: ${name}\nAddress: ${address}\nTotal: $${CartServices.totalCartPrice()}`
      );

      modal.style.display = "none";

      CartServices.cart = [];
      CartServices.displayCart();
    });
  }
}
export default Checkout;
