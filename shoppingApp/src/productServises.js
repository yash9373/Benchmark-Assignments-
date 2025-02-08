import Product from "./procucts.js";
class ProductServices {
  static async getProducts() {
    console.log("Fetching products...");

    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log("Products fetched: ", res.data);
      return res.data.map(
        (p) => new Product(p.title, p.price, p.category, p.description, p.image)
      );
    } catch (error) {
      console.log("Error fetching products: ", error);
      console.error(error);
      return [];
    }
  }
}

export default ProductServices;
