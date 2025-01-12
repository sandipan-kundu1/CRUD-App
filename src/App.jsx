import { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'Rahul', lastName: 'Sharma', age: 25, email: 'rahul.sharma@gmail.com', department: 'Finance', phone: '9876543210' },
    { id: 2, firstName: 'Sandipan', lastName: 'Kundu', age: 19, email: 'sandipan.kundu@gmail.com', department: 'Engineering', phone: '9123456789' },
    { id: 3, firstName: 'Sunil', lastName: 'Patra', age: 30, email: 'sunil.patra@gmail.com', department: 'HR', phone: '9345678912' },
    { id: 4, firstName: 'Sayan', lastName: 'Roy', age: 35, email: 'sayan.roy@gmail.com', department: 'Management', phone: '9123451234' },
    { id: 5, firstName: 'Aditi', lastName: 'Verma', age: 28, email: 'aditi.verma@gmail.com', department: 'Marketing', phone: '9876549870' },
    { id: 6, firstName: 'Priya', lastName: 'Roy', age: 32, email: 'priya.roy@gmail.com', department: 'Sales', phone: '9876512345' },
    { id: 7, firstName: 'Ravi', lastName: 'Kumar', age: 45, email: 'ravi.kumar@gmail.com', department: 'Operations', phone: '9876542222' },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = () => {
    setIsFormVisible(true);
    setIsEditMode(false);
    setFirst("");
    setLast("");
    setAge("");
    setEmail("");
    setDepartment("");
    setPhone("");
  };

  const handleEdit = (employee) => {
    setIsFormVisible(true);
    setIsEditMode(true);
    setCurrentEmployee(employee);
    setFirst(employee.firstName);
    setLast(employee.lastName);
    setAge(employee.age);
    setEmail(employee.email);
    setDepartment(employee.department);
    setPhone(employee.phone);
  };

  const handleSave = () => {
    if (first && last && age && email && department && phone) {
      if (isEditMode) {
        setEmployees(
          employees.map((emp) =>
            emp.id === currentEmployee.id
              ? { ...emp, firstName: first, lastName: last, age: parseInt(age), email:email, department:department, phone:phone }
              : emp
          )
        );
        setIsFormVisible(false);
        alert('Employee details updated successfully');
      } else {
        const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
        setEmployees([...employees, { id: newId, firstName: first, lastName: last, age: parseInt(age), email:email, department:department, phone:phone }]);
        setIsFormVisible(false);
        alert('Employee details inserted successfully');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDelete = (empId) => {
    setEmployees(employees.filter((employee) => employee.id !== empId));
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Details of Company</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Employee
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isEditMode ? 'Edit Employee' : 'Add Employee'}
            </h2>
            <label className="block text-gray-600">First Name:</label>
            <input
              type="text"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className="border rounded w-full mb-2 p-2"
            />
            <label className="block text-gray-600">Last Name:</label>
            <input
              type="text"
              value={last}
              onChange={(e) => setLast(e.target.value)}
              className="border rounded w-full mb-2 p-2"
            />
            <label className="block text-gray-600">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded w-full mb-2 p-2"
            />
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full mb-2 p-2"
            />
            <label className="block text-gray-600">Department:</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border rounded w-full mb-2 p-2"
            />
            <label className="block text-gray-600">Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded w-full mb-4 p-2"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsFormVisible(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}

        <table className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.age}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
