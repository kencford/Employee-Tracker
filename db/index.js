const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // left join for all 3 (Joe will have examples later)
  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      // CREATE SELECT STATMENT WITH THE FOLLOWING COLUMNS FROM THREE TABLES.
      // id, first_name, last_name FROM employee TABLE AND department name from department TABLE AND SELECT salary FROM role TABLE
      // YOUR NEED TO USE LEFT JOINS TO JOIN THREE TABLES
      // TODO: YOUR CODE HERE
      `select
      e.id
     ,e.first_name
     ,e.last_name
     ,r.title as "Title"
     ,d.name as "Department"
     ,r.salary as "Salary"
     ,concat(ee.first_name," ",ee.last_name) as "Manager"
     from employee e
       left join role r 
         on e.role_id = r.id
       left join department d
         on r.department_id = d.id
       left join employee ee
         on e.manager_id = ee.id
     order by
      e.last_name
     ,e.first_name
     
     `
    );
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }


  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    // console.log("in updateEmployeeRole in indexedDB.js:");
    // console.log("employeeId: ", employeeId);
    // console.log("roleID: ", roleId);
    // console.log(
    //   `update employee
    //   set
    //    role_id = ${roleId}
    //   where id = ${employeeId}`
    // );
    return this.connection.query(
      // TODO: YOUR CODE HERE
     `update employee
      set
       role_id = ${roleId}
      where id = ${employeeId}`
    );

  }

  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.query(
      // SELECT THE FOLLOWING COLUMNS:
      // id, title, salary FROM role TABLE AND department name FROM department TABLE
      // YOU NEED TO USE LEFT JOIN TO JOIN role and department TABLES
      // TODO: YOUR CODE HERE
      `select
      r.id
     ,r.title
     ,r.salary
     ,d.name
     from role r
       left join department d
         on r.department_id = d.id
     order by r.title`
    );
  }

  // Create a new role
  createRole(role) {
    console.log("role: ", role);
    const title = role.title;
    const salary = role.salary;
    const department_id = role.department_id;
    // console.log(title, salary, department_id);
    
    return this.connection.query(
      // TODO: YOUR CODE HERE
      `insert into role(title, salary, department_id)
        values ("${title}", ${salary}, ${department_id})`
    );
  }


  // Find all departments, join with employees and roles and sum up utilized department budget
  findAllDepartments() {
    return this.connection.query(
      `SELECT department.id
      ,department.name
      ,SUM(role.salary) AS "Utilized Budget"
      FROM department LEFT JOIN role ON role.department_id = department.id
      LEFT JOIN employee ON employee.role_id = role.id
      GROUP BY department.id, department.name`
    );
  }

  // Create a new department
  createDepartment(department) {
    const departmentName = department.name;
    // console.log(
    //   `insert into department(name)
    //    values ("${departmentName}")`    
    // )
    return this.connection.query(
      // TODO: YOUR CODE HERE
      `insert into department(name)
        values ("${departmentName}")`
    );
  }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee \
      LEFT JOIN role on employee.role_id = role.id \
      LEFT JOIN department department on role.department_id = department.id \
      WHERE department.id = ?;",
      departmentId
    );
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title \
      FROM employee LEFT JOIN role on role.id = employee.role_id \
      LEFT JOIN department ON department.id = role.department_id \
      WHERE manager_id = ?;",
      managerId
    );
  }
}

module.exports = new DB(connection);
