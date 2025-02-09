import Product from "./product.js";

class ViewProduct {
  static displayProduct(title) {
    const product = Product.products.find((product) => product.title === title);
    console.log(product.description);
    if (!product) return;

    const mainContent = document.querySelector(".main-content");
    const productGrid = document.querySelector(".product-grid");

    // Hide product grid
    productGrid.style.display = "none";

    // Create product details container
    const productElement = document.createElement("div");
    productElement.className = "product-details";
    productElement.innerHTML = `
    <div class="product-page">
  <!-- Left: Product Image -->
  <div class="product-image-container">
    <img src="${product.image}" class="product-image" alt="${product.title}" />
  </div>

  <!-- Right: Product Details -->
  <div class="product-details">
    <h1 class="title">${product.title}</h1>
    <p class="brand">Brand: <span>${product.brand || "Generic"}</span></p>

    <div class="price-section">
      <span class="price">$${product.price}</span>
      <span class="discount">-15%</span>
    </div>

    <p class="description">${product.description}</p>



    <div class="delivery-info">
      <p>🚚 Free Delivery by <b>Monday, Feb 12</b></p>
      <p>📍 Ships to Your Location</p>
    </div>

    <div class="button-group">
      <button class="add-to-cart">Add to Cart</button>
    </div>

    <button id="backToProducts" class="back-to-products">⬅ Back to Products</button>
  </div>
</div>

  `;

    mainContent.innerHTML = "";
    mainContent.appendChild(productElement);

    // ✅ Fix: Ensure back button shows the product grid again
    document.getElementById("backToProducts").addEventListener("click", () => {
      productElement.remove(); // Remove product details
      productGrid.style.display = "grid"; // Show product grid
      //product.renderProducts(); // Render products
      mainContent.appendChild(productGrid); // Append product grid to main content
    });
  }
}

export default ViewProduct;
