"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CreditCardPayment_cardNumber;
class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }
}
class CreditCardPayment extends Payment {
    constructor(amount, date, cardNumber) {
        super(amount, date);
        _CreditCardPayment_cardNumber.set(this, void 0);
        __classPrivateFieldSet(this, _CreditCardPayment_cardNumber, cardNumber, "f");
    }
    processPayment() {
        console.log(`Processing credit card payment of $${this.amount} on ${this.date}`);
    }
}
_CreditCardPayment_cardNumber = new WeakMap();
class PayPalPayment extends Payment {
    constructor(amount, date, email) {
        super(amount, date);
        this.email = email;
    }
    processPayment() {
        console.log(`Processing PayPal payment of $${this.amount} on ${this.date} from ${this.email}`);
    }
}
class CryptoPayment extends Payment {
    constructor(amount, date, walletAddress) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }
    processPayment() {
        console.log(`Processing Crypto payment of $${this.amount} on ${this.date} from wallet ${this.walletAddress}`);
    }
}
const creditCardPayment = new CreditCardPayment(100, "2025-02-12", "1234");
const payPalPayment = new PayPalPayment(50, "2025-02-12", "user@qwert.com");
const cryptoPayment = new CryptoPayment(200, "2025-02-12", "0x1234567890");
creditCardPayment.processPayment();
payPalPayment.processPayment();
cryptoPayment.processPayment();
