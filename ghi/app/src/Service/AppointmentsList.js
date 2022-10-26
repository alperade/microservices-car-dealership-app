import React from 'react';

class  AppointmentsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "appointments": [],
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

  async delete(apptToDelete){
    const url =`http://localhost:8080/api/appointments/${apptToDelete}/`
    const fetchConfig = {
      method : "delete",
      headers : {
        "Content-Type": "application/json"
      }
    }
    await fetch (url, fetchConfig)
    const updatedAppts = this.state.appointments.filter(appointment => appointment.id !== apptToDelete)
    this.setState({"appointments": updatedAppts})
  }

  async complete(apptToComplete){
    const url =`http://localhost:8080/api/appointments/${apptToComplete}/`
    const fetchConfig = {
      method : "put",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"is_finished": true})
    }
    await fetch (url, fetchConfig);
    let listAppts = this.state.appointments;
    for (let appt of listAppts) {
      if (appt.id === apptToComplete) {
        appt.is_finished = true;
      }
    }
    this.setState({"appointments": listAppts})
  }

  render(){
    return (
      <div className="container">
        <h1>Service Appointments</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.appointments.filter((appointment) => appointment.is_finished === false).map(appointment => {
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.customer_name } {appointment.vip ? "(VIP)":true}</td>
                  <td>{ appointment.date }</td>
                  <td>{ appointment.time.toLocaleString('en-US', { hour: 'numeric', hour12: true }) }</td>
                  <td>{ appointment.technician }</td>
                  <td>{ appointment.reason }</td>
                  <td>
                    <form>
                      <button className="btn btn-danger" onClick={() => this.delete(appointment.id)}>Cancel</button>
                    </form>
                  </td>
                  <td>
                    <form>
                      <button className="btn btn-success" onClick={() => this.complete(appointment.id)}>Finished</button>
                    </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AppointmentsList;
