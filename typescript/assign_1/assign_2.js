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
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentPrice, isAvailable) {
        this.Brand = brand;
        this.Model = model;
        this.RentPrice = rentPrice;
    }
    Vehicle.prototype.displayInfo = function () {
        console.log("Brand: ".concat(this.Brand, ", Model: ").concat(this.Model, ", Rent Price: ").concat(this.RentPrice));
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.calculateRentPrice = function () {
        return this.RentPrice * 0.1;
    };
    return Car;
}(Vehicle));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bike.prototype.calculateRentPrice = function () {
        return this.RentPrice * 0.05;
    };
    return Bike;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Truck.prototype.calculateRentPrice = function () {
        return this.RentPrice * 0.2;
    };
    return Truck;
}(Vehicle));
var car = new Car("Toyota", "Corolla", 100, true);
var bike = new Bike("Honda", "CBR", 50, true);
var truck = new Truck("Ford", "F150", 200, true);
car.displayInfo();
bike.displayInfo();
truck.displayInfo();
