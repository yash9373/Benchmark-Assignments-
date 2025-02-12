abstract class Payment {
  protected amount: number;
  protected date: string;

  constructor(amount: number, date: string) {
    this.amount = amount;
    this.date = date;
  }

  abstract processPayment(): void;
}

class CreditCardPayment extends Payment {
  #cardNumber: string;

  constructor(amount: number, date: string, cardNumber: string) {
    super(amount, date);
    this.#cardNumber = cardNumber;
  }

  processPayment(): void {
    console.log(
      `Processing credit card payment of $${this.amount} on ${this.date}`
    );
  }
}

class PayPalPayment extends Payment {
  private email: string;

  constructor(amount: number, date: string, email: string) {
    super(amount, date);
    this.email = email;
  }

  processPayment(): void {
    console.log(
      `Processing PayPal payment of $${this.amount} on ${this.date} from ${this.email}`
    );
  }
}

class CryptoPayment extends Payment {
  private walletAddress: string;

  constructor(amount: number, date: string, walletAddress: string) {
    super(amount, date);
    this.walletAddress = walletAddress;
  }

  processPayment(): void {
    console.log(
      `Processing Crypto payment of $${this.amount} on ${this.date} from wallet ${this.walletAddress}`
    );
  }
}

const creditCardPayment = new CreditCardPayment(100, "2025-02-12", "1234");
const payPalPayment = new PayPalPayment(50, "2025-02-12", "user@qwert.com");
const cryptoPayment = new CryptoPayment(200, "2025-02-12", "0x1234567890");

creditCardPayment.processPayment();
payPalPayment.processPayment();
cryptoPayment.processPayment();
