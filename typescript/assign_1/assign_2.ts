abstract class Vehicle {
  Brand: string;
  Model: string;
  RentPrice: number;

  constructor(
    brand: string,
    model: string,
    rentPrice: number,
    isAvailable: boolean
  ) {
    this.Brand = brand;
    this.Model = model;
    this.RentPrice = rentPrice;
  }
  displayInfo(): void {
    console.log(
      `Brand: ${this.Brand}, Model: ${this.Model}, Rent Price: ${this.RentPrice}`
    );
  }
}

class Car extends Vehicle {
  calculateRentPrice(): number {
    return this.RentPrice * 0.1;
  }
}

class Bike extends Vehicle {
  calculateRentPrice(): number {
    return this.RentPrice * 0.05;
  }
}

class Truck extends Vehicle {
  calculateRentPrice(): number {
    return this.RentPrice * 0.2;
  }
}

const car = new Car("Toyota", "Corolla", 100, true);
const bike = new Bike("Honda", "CBR", 50, true);
const truck = new Truck("Ford", "F150", 200, true);

car.displayInfo();
bike.displayInfo();
truck.displayInfo();
