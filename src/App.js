import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    salary: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("employeeData");
    if (storedData) {
      try {
        setEmployeeData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing data from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (employeeData.length > 0) {
      localStorage.setItem("employeeData", JSON.stringify(employeeData));
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingEmployee = employeeData.find((emp) => emp.id === formData.id);
    if (existingEmployee) {
      alert("Employee ID already exists. Please enter a unique ID.");
      return;
    }

    const newEmployee = { ...formData };

    setEmployeeData((prevData) => [...prevData, newEmployee]);
    setFormData({
      id: "",
      name: "",
      age: "",
      salary: "",
      contact: "",
      address: "",
    });
  };

  return (
    <div className="app">
      <h1>Employee Data</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Employee ID"
          required
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="no-arrow"
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
          className="no-arrow"
        />

        <input
          type="number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact No"
          required
          className="no-arrow"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />

        <button type="submit">Add Employee</button>
      </form>

      {employeeData.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Contact No</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.salary}</td>
                <td>{employee.contact}</td>
                <td>{employee.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
