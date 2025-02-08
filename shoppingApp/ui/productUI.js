import productServises from "../src/productServises.js";

class ProductUI {
  static async renderProducts() {
    try {
      const products = await productServises.getProducts();

      const productList = document.getElementById("productList_");
      if (!productList) {
        console.error("Product list container not found");
        return;
      }

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("col-md-4", "mb-4");

        productElement.innerHTML = `
          <div class="card shadow-sm p-3" style="width: 18rem">
            <img
              src="${product.image}"
              class="card-img-top"
              alt="Product Image"
            />
            <div class="card-body text-center">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text text-muted">
                ${product.description}
              </p>
              <h6 class="text-primary">${product.price}</h6>
              <a href="#" class="btn btn-success w-100">🛒 Add to Cart</a>
            </div>
          </div>
        `;

        productList.appendChild(productElement);
      });
    } catch (error) {
      console.error("Error rendering products:", error);
    }
  }
}

export default ProductUI;
