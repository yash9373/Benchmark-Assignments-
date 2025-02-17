interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

let cart: Product[] = [];

// Fetch products from API
async function fetchProducts(): Promise<void> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products: Product[] = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products on the page
function displayProducts(products: Product[]): void {
  const productsContainer = document.querySelector(".product-grid")!;
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src="${product.image}" width="100">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
    productsContainer.appendChild(div);
  });

  // Attach event listeners to buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(
        (button as HTMLElement).getAttribute("data-id")!
      );
      addToCart(productId);
    });
  });
}

// Add product to cart
async function addToCart(productId: number): Promise<void> {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product: Product = await response.json();
    cart.push(product);
    updateCart();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}

// Remove product from cart
function removeFromCart(index: number): void {
  cart.splice(index, 1);
  updateCart();
}

// Update the cart display
function updateCart(): void {
  const cartContainer = document.querySelector(".cart-items")!;
  const totalPriceElement = document.querySelector(".total_price")!;
  cartContainer.innerHTML = "";

  let totalPrice = 0;

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
    totalPrice += item.price;
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Attach event listeners to remove buttons
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(
        (button as HTMLElement).getAttribute("data-index")!
      );
      removeFromCart(index);
    });
  });
}

// Sort functions
const sortLowToHigh = (): void => {
  const productsContainer = document.querySelector(".product-grid")!;
  const sortedProducts = Array.from(
    productsContainer.children
  ) as HTMLElement[];
  sortedProducts.sort((a, b) => {
    return (
      parseFloat(a.querySelector("p")!.textContent!.substring(1)) -
      parseFloat(b.querySelector("p")!.textContent!.substring(1))
    );
  });
  sortedProducts.forEach((product) => productsContainer.appendChild(product));
};

const sortHighToLow = (): void => {
  const productsContainer = document.querySelector(".product-grid")!;
  const sortedProducts = Array.from(
    productsContainer.children
  ) as HTMLElement[];
  sortedProducts.sort((a, b) => {
    return (
      parseFloat(b.querySelector("p")!.textContent!.substring(1)) -
      parseFloat(a.querySelector("p")!.textContent!.substring(1))
    );
  });
  sortedProducts.forEach((product) => productsContainer.appendChild(product));
};

// Event Listeners
window.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  document.getElementById("sortlth")!.addEventListener("click", sortLowToHigh);
  document.getElementById("sorthtl")!.addEventListener("click", sortHighToLow);
});
