import React from 'react';

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            automobile: '',
            salesperson: '',
            customer: '',
            price: '',
            automobiles: [],
            salespersons: [],
            customers: [],

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAutomobile = this.handleChangeAutomobile.bind(this);
        this.handleChangeSalesperson = this.handleChangeSalesperson.bind(this);
        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
    }

    async loadAutos() {
        const url = 'http://localhost:8090/api/automobilevos/';
        const response = await fetch(url);
        console.log('response', response)
        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            this.setState({ automobiles: data.automobilevos.filter( automobilevo => automobilevo.sold === false) });
            }
        }

    async loadSalesPersons() {
        const url = 'http://localhost:8090/api/salespersons/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ salespersons: data.salespersons });
            }
        }

    async loadsCustomers() {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ customers: data.customers });
            }
        }

    async componentDidMount(){
        this.loadAutos();
        this.loadSalesPersons();
        this.loadsCustomers();
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.automobiles;
        delete data.salespersons;
        delete data.customers;

        const autovosoldUrl = 'http://localhost:8090/api/automobilevos/';
        const autovofetchConfig = {
            method: "put",
            body: JSON.stringify({
                vin : data.automobile
            }),
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const autovoresponse = await fetch(autovosoldUrl, autovofetchConfig);
        const salesrecordUrl = 'http://localhost:8090/api/salesrecords/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const salesrecordresponse = await fetch(salesrecordUrl, fetchConfig);
        if (salesrecordresponse.ok && autovoresponse.ok){
            this.setState({
                automobile: '',
                salesperson: '',
                customer: '',
                price: '',
            });
        }
    }

    handleChangeAutomobile(event) {
        const value = event.target.value;
        this.setState({ automobile: value });
    }

    handleChangeSalesperson(event) {
        const value = event.target.value;
        this.setState({salesperson: value});
    }

    handleChangeCustomer(event) {
        const value = event.target.value;
        this.setState({customer: value});
    }

    handleChangePrice(event) {
        const value = event.target.value;
        this.setState({price: value});
    }

    render() {
        return (
            <div className="row">
                <div className= "offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new salesrecord</h1>
                        <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                            <div className="mb-3">
                                <select onChange={this.handleChangeAutomobile} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Choose a automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.vin}>{automobile.vin}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChangeSalesperson} value={this.state.salesperson} required name="salesperson" id="salesperson" className="form-select">
                                    <option value="">Choose a salesperson</option>
                                    {this.state.salespersons.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChangeCustomer} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangePrice} value={this.state.price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesRecordForm;
