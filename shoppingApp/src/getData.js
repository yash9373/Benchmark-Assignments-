class getData {
  static async getProducts() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products", {
        timeout: 5000,
      });
      console.log("Products fetched successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  }
}

export default getData;
