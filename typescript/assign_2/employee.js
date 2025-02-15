"use strict";
class Department {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployee(id) {
        this.employees = this.employees.filter((emp) => emp.id !== id);
    }
    getTotalSalary() {
        return this.employees.reduce((sum, emp) => sum + emp.salary, 0);
    }
    listEmployees() {
        console.log(this.employees);
    }
}
class GenericStorage {
    constructor() {
        this.storage = [];
    }
    add(item) {
        this.storage.push(item);
    }
    remove(item) {
        this.storage = this.storage.filter((storedItem) => storedItem !== item);
    }
    getAll() {
        return this.storage;
    }
}
function updateSalary(employee, newSalary) {
    return Object.assign(Object.assign({}, employee), { salary: newSalary });
}
const emp1 = {
    id: 1,
    name: "Alice",
    position: "Developer",
    salary: 60000,
};
const emp2 = {
    id: 2,
    name: "Bob",
    position: "Designer",
    salary: 55000,
};
const manager = {
    id: 3,
    name: "Charlie",
    position: "Manager",
    salary: 80000,
    teamSize: 5,
};
const dept = new Department();
dept.addEmployee(emp1);
dept.addEmployee(emp2);
dept.addEmployee(manager);
dept.listEmployees();
console.log("Total Salary:", dept.getTotalSalary());
dept.removeEmployee(2);
dept.listEmployees();
console.log("Total Salary after removal:", dept.getTotalSalary());
const storage = new GenericStorage();
storage.add(emp1);
storage.add(emp2);
console.log(storage.getAll());
storage.remove(emp1);
console.log(storage.getAll());
const updatedEmp = updateSalary(emp1, 70000);
console.log(updatedEmp);
