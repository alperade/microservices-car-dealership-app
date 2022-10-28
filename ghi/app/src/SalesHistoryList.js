import React from 'react';

class SalesRecordsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        salesperson: '',
        salesrecords: [],
        salesrecordsfiltered : [],
      }
      this.handleSalesperson = this.handleSalesperson.bind(this);
      this.filteredfunction = this.filteredfunction.bind(this);
    }
    async componentDidMount() {
        const url = 'http://localhost:8090/api/salesrecords/'
        const response = await fetch(url)
        if (response.ok){
          const data = await response.json()
          this.setState({ salesrecords: data.salesrecords, salesrecordsfiltered: data.salesrecords
          })
        }
      }
    filteredfunction() {
      let filtered = this.state.salesrecords.filter(salesrecord => salesrecord.salesperson.name.includes(this.state.salesperson))
      this.setState({salesrecordsfiltered: filtered})
    }

    handleSalesperson(event) {
      const newState = {};
      newState[event.target.name] = event.target.value;
      this.setState(newState, () => {this.filteredfunction()});
    }

    render(){

    return (
      <div className="container">
        <input type="text" onChange={this.handleSalesperson} value={this.state.salesperson} placeholder="Enter a salesperson's name" name = "salesperson"/>
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
            {this.state.salesrecordsfiltered.map((salesrecord) => {
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
