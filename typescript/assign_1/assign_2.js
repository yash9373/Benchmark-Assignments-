"use strict";
class Vehicle {
    constructor(brand, model, rentPrice, isAvailable) {
        this.Brand = brand;
        this.Model = model;
        this.RentPrice = rentPrice;
    }
    displayInfo() {
        console.log(`Brand: ${this.Brand}, Model: ${this.Model}, Rent Price: ${this.RentPrice}`);
    }
}
class Car extends Vehicle {
    calculateRentPrice() {
        return this.RentPrice * 0.1;
    }
}
class Bike extends Vehicle {
    calculateRentPrice() {
        return this.RentPrice * 0.05;
    }
}
class Truck extends Vehicle {
    calculateRentPrice() {
        return this.RentPrice * 0.2;
    }
}
const car = new Car("Toyota", "Corolla", 100, true);
const bike = new Bike("Honda", "CBR", 50, true);
const truck = new Truck("Ford", "F150", 200, true);
car.displayInfo();
bike.displayInfo();
truck.displayInfo();
