import { useState } from "react";
import Header from "./components/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    job: "",
    sexe: "",
    exp_year: 0,
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChangeEmployee = (event) => {
    setCurrentEmployee({ ...currentEmployee, [event.target.name]: event.target.value });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  };

  const handleAddEmployee = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!currentEmployee.name) newErrors.name = "Please enter a name.";
    if (!currentEmployee.email) newErrors.email = "Please enter an email.";
    if (!currentEmployee.phone) newErrors.phone = "Please enter a phone number.";
    if (!currentEmployee.job) newErrors.job = "Please select a job.";
    if (!currentEmployee.sexe) newErrors.sexe = "Please select a sexe.";
    if (!currentEmployee.exp_year && currentEmployee.exp_year !== 0) newErrors.exp_year = "Please enter experience years.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let newEmployee = { ...currentEmployee, id: employees.length + 1 };
    setEmployees([...employees, newEmployee]);
    setSelectedEmployee(newEmployee);
    setCurrentEmployee({
      id: "",
      name: "",
      email: "",
      phone: "",
      job: "",
      sexe: "",
      exp_year: 0,
    });
    document.querySelectorAll('input[name="sexe"]').forEach((input) => {
      input.checked = false;
    });
    setErrors({});
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((item) => item.id !== id));
    if (selectedEmployee && selectedEmployee.id === id) {
      setSelectedEmployee(null);
    }
  };

  const getSexIcon = (sexe) => {
    return sexe === "male" ? <i className="fas fa-mars"></i> : <i className="fas fa-venus"></i>;
  };

  const getSexImage = (sexe) => {
    return sexe === "male" ? "/images/male.png" : "/images/female.png";
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-md-7">
            <h2 className="text text-primary">Add New Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={currentEmployee.name}
                  onChange={handleChangeEmployee}
                />
                {errors.name && <div className="alert alert-danger">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={currentEmployee.email}
                  onChange={handleChangeEmployee}
                />
                {errors.email && <div className="alert alert-danger">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="phone"
                  value={currentEmployee.phone}
                  onChange={handleChangeEmployee}
                />
                {errors.phone && <div className="alert alert-danger">{errors.phone}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="job">Job</label>
                <select
                  name="job"
                  id="job"
                  className="form-control"
                  value={currentEmployee.job}
                  onChange={handleChangeEmployee}
                >
                  <option value="" disabled>
                    Select Job
                  </option>
                  <option value="Big Data">Big Data</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Web Designer">Web Designer</option>
                  <option value="Mobile Developer">Mobile Developer</option>
                  <option value="Software Engineer">Software Engineer</option>
                </select>
                {errors.job && <div className="alert alert-danger">{errors.job}</div>}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="sexe">Sexe </label>
                <br />
                <input
                  type="radio"
                  name="sexe"
                  id="male"
                  value="male"
                  onChange={handleChangeEmployee}
                />
                Male
                <input
                  type="radio"
                  name="sexe"
                  id="female"
                  value="female"
                  onChange={handleChangeEmployee}
                />
                Female
                {errors.sexe && <div className="alert alert-danger">{errors.sexe}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exp_year">Experience Years</label>
                <input
                  type="number"
                  max={20}
                  min={0}
                  className="form-control"
                  name="exp_year"
                  id="exp_year"
                  value={currentEmployee.exp_year}
                  onChange={handleChangeEmployee}
                />
                {errors.exp_year && <div className="alert alert-danger">{errors.exp_year}</div>}
              </div>
              <div className="mt-2 mt-3">
                <button className="btn btn-success" type="submit">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <h2 className="text text-primary">Employee Details</h2>
            {selectedEmployee ? (
              <div className="card mb-3">
                <div className="card-body">
                  <img src={getSexImage(selectedEmployee.sexe)} alt="Employee" style={{ width: "50px", height: "50px" }} />
                  <h5 className="card-title">{selectedEmployee.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {selectedEmployee.email}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {selectedEmployee.phone}
                  </p>
                  <p className="card-text">
                    <strong>Job:</strong> {selectedEmployee.job}
                  </p>
                  <p className="card-text">
                    <strong>Sexe:</strong> {getSexIcon(selectedEmployee.sexe)} {selectedEmployee.sexe}
                  </p>
                  <p className="card-text">
                    <strong>Experience Years:</strong> {selectedEmployee.exp_year}
                  </p>
                </div>
              </div>
            ) : (
              <p>No employee selected</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text text-primary">Employees List</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Job</th>
                    <th scope="col">Sexe</th>
                    <th scope="col">Experience Years</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((item) => (
                    <tr key={item.id} onClick={() => setSelectedEmployee(item)}>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.job}</td>
                      <td>{getSexIcon(item.sexe)}</td>
                      <td>{item.exp_year}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEmployee(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
