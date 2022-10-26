import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        name: '',
        employee_number: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const locationUrl = `http://localhost:8080/api/technicians/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      this.setState({
        name: '',
        employee_number: '',
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Enter a Technician</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.name} placeholder="name" required type="text" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.employee_number} placeholder="Employee Number" required type="number" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Enter</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TechnicianForm;
