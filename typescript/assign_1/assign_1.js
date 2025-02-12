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
// Abstract class Employee
var Employee = /** @class */ (function () {
    function Employee(name, id, salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    Employee.prototype.displayInfo = function () {
        console.log("Employee: ".concat(this.name, ", ID: ").concat(this.id, ", Salary: ").concat(this.salary));
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manager.prototype.calculateBonus = function () {
        return this.salary * 0.2;
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Engineer.prototype.calculateBonus = function () {
        return this.salary * 0.15;
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intern.prototype.calculateBonus = function () {
        return this.salary * 0.05;
    };
    return Intern;
}(Employee));
var manager = new Manager("Bob", 102, 80000);
var engineer = new Engineer("Charlie", 103, 60000);
var intern = new Intern("David", 104, 20000);
manager.displayInfo();
console.log("Manager Bonus:", manager.calculateBonus());
engineer.displayInfo();
console.log("Engineer Bonus:", engineer.calculateBonus());
intern.displayInfo();
console.log("Intern Bonus:", intern.calculateBonus());
