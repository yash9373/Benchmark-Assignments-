import getData from "./getData.js";

class Product {
  static async renderProducts() {
    const data = await getData.getProducts(); // Assuming it returns an array of products
    const pGrid = document.querySelector(".product-grid");

    data.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
        <img src="${product.image}" class="product-image" />
        <h3 class="title">${product.title}</h3>
        <div class="price">${product.price}</div>
        <button class="add-to-cart">Add to Cart</button>
      `;
      pGrid.appendChild(productElement);
    });
  }
}

export default Product;
