import cart from "./cart.js";

class CartServices {
  static cart = [];

  static displayCart() {
    const cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = "";
    CartServices.cart.forEach((element) => {
      const productElement = document.createElement("div");
      productElement.className = "cart-item";
      productElement.innerHTML = `
        <img src="${element.image}" alt="Product Image" />
        <div class="product-info">
          <p class="product-name">${element.title}</p>  <!-- Product Name -->
          <span class="price">${element.price}</span>
          <span class="delete-icon"><i class="fa-solid fa-trash"></i></span>
        </div>`;
      cartContainer.appendChild(productElement);
    });

    this.updateTotalPrice();
  }

  static totalCartPrice() {
    let total = 0;
    CartServices.cart.forEach((product) => {
      total += parseFloat(product.price);
    });
    return total.toFixed(2); // Formatting to 2 decimal places
  }

  static updateTotalPrice() {
    const total = this.totalCartPrice();
    const totalPriceElement = document.querySelector(".total_price");
    totalPriceElement.textContent = `Total: $${total}`;
  }

  static addProduct(product) {
    CartServices.cart.push(product);
    console.log("Product added to cart:", product);
    this.displayCart();
  }

  static removeProduct(title) {
    const index = CartServices.cart.findIndex(
      (product) => product.title === title
    );
    if (index !== -1) {
      CartServices.cart.splice(index, 1);
      console.log("Product removed from cart:", title);
      this.displayCart();
    }
  }
}
export default CartServices;
