var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var cart = [];
// Fetch products from API
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    displayProducts(products);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching products:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Display products on the page
function displayProducts(products) {
    var productsContainer = document.querySelector(".product-grid");
    productsContainer.innerHTML = "";
    products.forEach(function (product) {
        var div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = "\n        <img src=\"".concat(product.image, "\" width=\"100\">\n        <h3>").concat(product.title, "</h3>\n        <p>$").concat(product.price, "</p>\n        <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n      ");
        productsContainer.appendChild(div);
    });
    // Attach event listeners to buttons
    document.querySelectorAll(".add-to-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            var productId = parseInt(button.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}
// Add product to cart
function addToCart(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, product, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(productId))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    product = _a.sent();
                    cart.push(product);
                    updateCart();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error adding to cart:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
// Update the cart display
function updateCart() {
    var cartContainer = document.querySelector(".cart-items");
    var totalPriceElement = document.querySelector(".total_price");
    cartContainer.innerHTML = "";
    var totalPrice = 0;
    cart.forEach(function (item, index) {
        var div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = "\n        <img src=\"".concat(item.image, "\" width=\"50\">\n        <h4>").concat(item.title, "</h4>\n        <p>$").concat(item.price, "</p>\n        <button class=\"remove-from-cart\" data-index=\"").concat(index, "\">Remove</button>\n      ");
        cartContainer.appendChild(div);
        totalPrice += item.price;
    });
    totalPriceElement.textContent = "Total: $".concat(totalPrice.toFixed(2));
    // Attach event listeners to remove buttons
    document.querySelectorAll(".remove-from-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            var index = parseInt(button.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
}
// Sort functions
var sortLowToHigh = function () {
    var productsContainer = document.querySelector(".product-grid");
    var sortedProducts = Array.from(productsContainer.children);
    sortedProducts.sort(function (a, b) {
        return (parseFloat(a.querySelector("p").textContent.substring(1)) -
            parseFloat(b.querySelector("p").textContent.substring(1)));
    });
    sortedProducts.forEach(function (product) { return productsContainer.appendChild(product); });
};
var sortHighToLow = function () {
    var productsContainer = document.querySelector(".product-grid");
    var sortedProducts = Array.from(productsContainer.children);
    sortedProducts.sort(function (a, b) {
        return (parseFloat(b.querySelector("p").textContent.substring(1)) -
            parseFloat(a.querySelector("p").textContent.substring(1)));
    });
    sortedProducts.forEach(function (product) { return productsContainer.appendChild(product); });
};
// Event Listeners
window.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
    document.getElementById("sortlth").addEventListener("click", sortLowToHigh);
    document.getElementById("sorthtl").addEventListener("click", sortHighToLow);
});
