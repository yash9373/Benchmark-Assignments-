const products = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Shoes", price: 100, category: "Fashion" },
  { name: "Phone", price: 800, category: "Electronics" },
  { name: "Watch", price: 200, category: "Accessories" },
  { name: "TV", price: 1500, category: "Electronics" },
];

const uppercaseNames = products.map((p) => p.name.toUpperCase());

const electronics = products.filter((p) => p.category === "Electronics");

const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

const totalByCategory = (category) =>
  products
    .filter((p) => p.category === category)
    .map((p) => p.price)
    .reduce((sum, price) => sum + price, 0);

console.log(uppercaseNames);
console.log(electronics);
console.log(totalPrice);
console.log(totalByCategory("Electronics"));
