import getData from "./getData.js";
import ProductObj from "./productObj.js";

class Product {
  static products = [];

  // Render products from API or data
  static async renderProducts() {
    const data = await getData.getProducts();
    const pGrid = document.querySelector(".product-grid");

    // Clear previous products if any
    pGrid.innerHTML = "";

    // Create and display each product
    data.forEach((product) => {
      pGrid.appendChild(Product.createAndDisplayProduct(product));
      // Store each product in the static products array
      this.products.push(
        new ProductObj(
          product.title,
          product.price,
          product.image,
          product.description // Fixed typo: 'describtion' -> 'description'
        )
      );
    });
  }

  // Create and display product card
  static createAndDisplayProduct(product) {
    const productElement = document.createElement("div");
    productElement.className = "product-card";
    productElement.innerHTML = `
        <img src="${product.image}" class="product-image" />
        <h3 class="title">${product.title}</h3>
        <div class="price">${product.price}</div>
        <button class="add-to-cart">Add to Cart</button>
      `;
    return productElement;
  }

  static searchProduct(searchTerm) {
    const pGrid = document.querySelector(".product-grid");

    const searchResult = this.products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    pGrid.innerHTML = "";

    if (searchResult.length > 0) {
      searchResult.forEach((product) => {
        pGrid.appendChild(Product.createAndDisplayProduct(product));
      });
    } else {
      pGrid.innerHTML = "<p>No products found.</p>";
    }
  }

  static sortLowToHigh() {
    const pGrid = document.querySelector(".product-grid");

    this.products.sort((a, b) => a.price - b.price);

    pGrid.innerHTML = "";

    this.products.forEach((product) => {
      pGrid.appendChild(Product.createAndDisplayProduct(product));
    });
  }

  static sortHighToLow() {
    const pGrid = document.querySelector(".product-grid");

    this.products.sort((a, b) => b.price - a.price);

    pGrid.innerHTML = "";

    this.products.forEach((product) => {
      pGrid.appendChild(Product.createAndDisplayProduct(product));
    });
  }
}

export default Product;
