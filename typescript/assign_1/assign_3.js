var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CreditCardPayment_cardNumber;
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber) {
        var _this = _super.call(this, amount, date) || this;
        _CreditCardPayment_cardNumber.set(_this, void 0);
        __classPrivateFieldSet(_this, _CreditCardPayment_cardNumber, cardNumber, "f");
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        console.log("Processing credit card payment of $".concat(this.amount, " on ").concat(this.date));
    };
    return CreditCardPayment;
}(Payment));
_CreditCardPayment_cardNumber = new WeakMap();
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, email) {
        var _this = _super.call(this, amount, date) || this;
        _this.email = email;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        console.log("Processing PayPal payment of $".concat(this.amount, " on ").concat(this.date, " from ").concat(this.email));
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, walletAddress) {
        var _this = _super.call(this, amount, date) || this;
        _this.walletAddress = walletAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        console.log("Processing Crypto payment of $".concat(this.amount, " on ").concat(this.date, " from wallet ").concat(this.walletAddress));
    };
    return CryptoPayment;
}(Payment));
var creditCardPayment = new CreditCardPayment(100, "2025-02-12", "1234");
var payPalPayment = new PayPalPayment(50, "2025-02-12", "user@qwert.com");
var cryptoPayment = new CryptoPayment(200, "2025-02-12", "0x1234567890");
creditCardPayment.processPayment();
payPalPayment.processPayment();
cryptoPayment.processPayment();
