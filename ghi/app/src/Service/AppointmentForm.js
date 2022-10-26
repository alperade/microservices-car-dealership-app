import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        vin: '',
        customer_name: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
        technicians: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.technicians;

    const appointmentsUrl = `http://localhost:8080/api/appointments/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(appointmentsUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      this.setState({
        vin: '',
        customer_name: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
      });
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
                <input onChange={this.handleChange} value={this.state.vin} placeholder="vin" required type="text" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.customer_name} placeholder="Customer Name" required type="text" id="customer_name" className="form-control" />
                <label htmlFor="customer_name">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.date} placeholder="Date" type="date" id="date" className="form-control" />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.time} placeholder="Time" required type="time" id="time" className="form-control" />
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.technician} required className="form-select" id="technician">
                  <option value="">Choose a Technician</option>
                  {this.state.technicians.map(technician => {
                    return (
                      <option key={technician.id} value={technician.employee_number}>{technician.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} value={this.state.reason} placeholder="Reason" required type="text" id="reason" className="form-control" />
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
