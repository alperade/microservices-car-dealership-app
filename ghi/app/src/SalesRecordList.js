import React from 'react';

class  SalesRecordsList extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        "salesrecords": [],
      }
      this.dlt = this.dlt.bind(this)
      this.refresh = this.refresh.bind(this)
    }
      async refresh(){
        const url = 'http://localhost:8090/api/salesrecords/'
        const response = await fetch(url)
        if (response.ok){
          const data = await response.json()
          this.setState({ salesrecords: data.salesrecords})
        }
      }
      async componentDidMount(){
        this.refresh()
      }
      async dlt(event){
        const url =`http://localhost:8090/api/salesrecords/${event}/`
        const fetchConfig = {
          method : "delete",
          headers : {
            "Content-Type": "application/json"
          }
        }
        await fetch (url, fetchConfig)
        this.refresh()

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
                  <td>{ salesrecord.price }</td>
                  <td>
                  <form>
                    <button onClick={() => this.dlt(salesrecord.id)}>Delete</button>
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
export default SalesRecordsList;
