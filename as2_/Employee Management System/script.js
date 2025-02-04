class Employee {
  constructor(name, id, salary) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }

  calculateBonus() {
    // Fixed method name
    return 0;
  }
}

class Manager extends Employee {
  calculateBonus() {
    return this.salary * 0.2;
  }
}

class Engineer extends Employee {
  calculateBonus() {
    return this.salary * 0.15;
  }
}

class Intern extends Employee {
  calculateBonus() {
    return this.salary * 0.05;
  }
}

document
  .getElementById("employeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const role = document.getElementById("role").value;
    const salary = parseFloat(document.getElementById("salary").value);

    let employee;
    if (role === "Manager") {
      employee = new Manager(name, id, salary); // Fixed parameter order
    } else if (role === "Engineer") {
      employee = new Engineer(name, id, salary);
    } else {
      employee = new Intern(name, id, salary);
    }

    document.getElementById("employeeDetails").innerHTML = `
      <p><strong>Name:</strong> ${employee.name}</p>
      <p><strong>ID:</strong> ${employee.id}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Salary:</strong> $${employee.salary}</p>
      <p><strong>Bonus:</strong> $${employee.calculateBonus()}</p>
    `;
  });
