import cart from "./cart.js";
import CartServices from "./cartServises.js";
class Checkout {
  static showCheckoutModal() {
    const modal = document.querySelector(".checkout-modal");
    const cartItemsList = document.querySelector(".cart-items-list");
    const totalPriceElement = document.querySelector(".total-price");

    // Clear previous cart items in the modal
    cartItemsList.innerHTML = "";

    // Populate the modal with the cart items and total price
    CartServices.cart.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.innerHTML = `${product.title} - $${product.price}`;
      cartItemsList.appendChild(productItem);
    });

    totalPriceElement.textContent = `Total: $${CartServices.totalCartPrice()}`;

    // Show the modal
    modal.style.display = "flex";

    // Close the modal when clicking the "Close" button
    document.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none"; // Hides the modal
    });

    // Handle form submission for user details
    document.querySelector(".checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const address = document.querySelector("#address").value;

      // Simulate order placement
      alert(
        `Order placed successfully!\nName: ${name}\nAddress: ${address}\nTotal: $${CartServices.totalCartPrice()}`
      );

      // Close the modal after submitting the order
      modal.style.display = "none";

      // Optionally, clear the cart
      CartServices.cart = [];
      CartServices.displayCart();
    });
  }
}
export default Checkout;
