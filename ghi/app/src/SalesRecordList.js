import React from 'react';

class SalesRecordsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        "salesrecords": [],
      }

    }
    async componentDidMount() {
        const url = 'http://localhost:8090/api/salesrecords/'
        const response = await fetch(url)
        if (response.ok){
          const data = await response.json()
          this.setState({ salesrecords: data.salesrecords})
        }
      }

    render(){

    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sales person</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Sale price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.salesrecords.map((salesrecord) => {
              return (
                <tr key={salesrecord.id}>
                  <td>{ salesrecord.salesperson.name}</td>
                  <td>{ salesrecord.customer.name }</td>
                  <td>{ salesrecord.automobile.vin }</td>
                  <td>${ new Intl.NumberFormat().format(salesrecord.price) }</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default SalesRecordsList;
