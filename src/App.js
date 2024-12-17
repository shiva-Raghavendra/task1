import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phoneNumber: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.employeeId) tempErrors.employeeId = "Employee ID is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone Number is required";
    if (!/^\d{10}$/.test(formData.phoneNumber)) tempErrors.phoneNumber = "Phone Number must be 10 digits";
    if (!formData.dateOfJoining) tempErrors.dateOfJoining = "Date of Joining is required";
    if (!formData.role) tempErrors.role = "Role is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Send data to backend
      axios.post('http://localhost:5000/add-employee', formData)
        .then((res) => {
          alert("Employee added successfully!");
          setFormData({
            name: '',
            employeeId: '',
            email: '',
            phoneNumber: '',
            dateOfJoining: '',
            role: '',
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="App">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Employee ID:</label>
          <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} />
          {errors.employeeId && <span>{errors.employeeId}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Date of Joining:</label>
          <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
          {errors.dateOfJoining && <span>{errors.dateOfJoining}</span>}
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
          {errors.role && <span>{errors.role}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
