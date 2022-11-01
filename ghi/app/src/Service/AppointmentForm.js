import React from 'react';

class AppointmentForm extends React.Component {
  state = {
    userInput: {
      vin: '',
      customer_name: '',
      date: '',
      time: '',
      technician: '',
      reason: '',
    },
    technicians: [],
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({userInput: {
      ...this.state.userInput,
      [name]: value
    }})
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentsUrl = `http://localhost:8080/api/appointments/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(this.state.userInput),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(appointmentsUrl, fetchConfig);
    if (response.ok) {
      await response.json();

      const cleared = {
        userInput: {
          vin: '',
          customer_name: '',
          date: '',
          time: '',
          technician: '',
          reason: '',
        },
        technicians: [],
      }
      this.setState(cleared)
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Enter a service appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.userInput.vin} placeholder="vin" required type="text" name="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.userInput.customer_name} placeholder="Customer Name" required type="text" name="customer_name" className="form-control" />
                <label htmlFor="customer_name">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.userInput.date} placeholder="Date" type="date" name="date" className="form-control" />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.userInput.time} placeholder="Time" required type="time" name="time" className="form-control" />
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.userInput.technician} required className="form-select" name="technician">
                  <option value="">Choose a Technician</option>
                  {this.state.technicians.map(technician => {
                    return (
                      <option key={technician.id} value={technician.employee_number}>{technician.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.userInput.reason} placeholder="Reason" required type="text" name="reason" className="form-control" />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
