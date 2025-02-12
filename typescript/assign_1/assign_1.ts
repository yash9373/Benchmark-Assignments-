// Abstract class Employee
abstract class Employee {
  protected name: string;
  protected id: number;
  protected salary: number;

  constructor(name: string, id: number, salary: number) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }

  abstract calculateBonus(): number;

  displayInfo(): void {
    console.log(
      `Employee: ${this.name}, ID: ${this.id}, Salary: ${this.salary}`
    );
  }
}

class Manager extends Employee {
  calculateBonus(): number {
    return this.salary * 0.2;
  }
}

class Engineer extends Employee {
  calculateBonus(): number {
    return this.salary * 0.15;
  }
}

class Intern extends Employee {
  calculateBonus(): number {
    return this.salary * 0.05;
  }
}

const manager = new Manager("Bob", 102, 80000);
const engineer = new Engineer("Charlie", 103, 60000);
const intern = new Intern("David", 104, 20000);

manager.displayInfo();
console.log("Manager Bonus:", manager.calculateBonus());

engineer.displayInfo();
console.log("Engineer Bonus:", engineer.calculateBonus());

intern.displayInfo();
console.log("Intern Bonus:", intern.calculateBonus());
