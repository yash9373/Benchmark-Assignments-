interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

interface Manager extends Employee {
  teamSize: number;
}

class Department {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }

  getTotalSalary(): number {
    return this.employees.reduce((sum, emp) => sum + emp.salary, 0);
  }

  listEmployees(): void {
    console.log(this.employees);
  }
}

class GenericStorage<T> {
  private storage: T[] = [];

  add(item: T): void {
    this.storage.push(item);
  }

  remove(item: T): void {
    this.storage = this.storage.filter((storedItem) => storedItem !== item);
  }

  getAll(): T[] {
    return this.storage;
  }
}

function updateSalary<T extends Employee>(employee: T, newSalary: number): T {
  return { ...employee, salary: newSalary };
}

const emp1: Employee = {
  id: 1,
  name: "Alice",
  position: "Developer",
  salary: 60000,
};
const emp2: Employee = {
  id: 2,
  name: "Bob",
  position: "Designer",
  salary: 55000,
};
const manager: Manager = {
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

const storage = new GenericStorage<Employee>();

storage.add(emp1);
storage.add(emp2);
console.log(storage.getAll());

storage.remove(emp1);
console.log(storage.getAll());

const updatedEmp = updateSalary(emp1, 70000);
console.log(updatedEmp);
