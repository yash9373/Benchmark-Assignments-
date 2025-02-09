import product from "./product.js";
class search {
  static async searchProduct(title) {
    product.products.forEach((product) => {
      if (product.title.toLowerCase().includes(title.toLowerCase())) {
        console.log(product.title);
      }
    });
  }
}
