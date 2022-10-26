import React from 'react';

class  AppointmentsHistory extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      "appointments": [],
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const searchedVin = event.target.value;
    this.setState({ search: searchedVin })
  }

  search() {
    let vinCount = 0
    let tableShow = document.getElementById('service-table');
    let invalidVin = document.getElementById('invalid-vin');
    for (let appt of this.state.appointments) {
      if (appt.vin === this.state.search) {
        tableShow.classList.remove('d-none')
        invalidVin.classList.add('d-none')
        vinCount++
      }
    if (vinCount === 0) {
        invalidVin.classList.remove('d-none')
        tableShow.classList.add('d-none')
      }
    }
  }

  async componentDidMount() {
    let url = "http://localhost:8080/api/appointments/"
    let response = await fetch(url)

    if(response.ok){
      let data = await response.json();
      for (let appt of data.appointments) {
        let year = appt.date.slice(0,4);
        let month = appt.date.slice(5,7);
        let day = appt.date.slice(8,10);
        let hour = appt.time.slice(0,2);
        let minute = appt.time.slice(3,5);
        let jsDate = new Date(year,month,day,hour,minute);
        appt.time = jsDate.toLocaleString('en-US', { hour: 'numeric', hour12: true });
      }
      this.setState({"appointments": data.appointments})
    }
  }

  render(){
    return (
      <div className="container">
        <div className="input-group" style={{marginTop: 2 + 'em'}} >
          <input onChange={this.handleChange} value={this.state.search} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <button type="button" className="btn btn-outline-primary" onClick={() => this.search()}>Search VIN</button>
        </div>
        <div id="invalid-vin" className="d-none" style={{marginTop: 2 + 'em'}}>
          <h3>No results for this VIN. Please try again.</h3>
        </div>
        <div id="service-table" className="d-none">
          <h1 style={{marginTop: 1 + 'em'}} >Service Appointments for {this.state.search}</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
            {this.state.appointments.filter((appointment) => appointment.vin === this.state.search).map(appointment => {
                return (
                  <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer_name } {appointment.vip ? "(VIP)":true}</td>
                    <td>{ appointment.date }</td>
                    <td>{ appointment.time }</td>
                    <td>{ appointment.technician }</td>
                    <td>{ appointment.reason }</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AppointmentsHistory;
