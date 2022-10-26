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
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ automobiles: data.automobiles });
            }
        }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/salespersons/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ salespersons: data.salespersons });
            }
        }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ customers: data.customers });
            }
        }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const salespersonUrl = 'http://localhost:8090/api/salespersons/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const salespersonresponse = await fetch(salespersonUrl, fetchConfig);
        if (salespersonresponse.ok){

            this.setState({
                name: '',
                employee_id: '',
            });
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleChangeEmployee_id(event) {
        const value = event.target.value;
        this.setState({employee_id: value});
    }

    render() {
        return (
            <div className="row">
                <div className= "offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new salesperson</h1>
                        <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeEmployee_id} value={this.state.employee_id} placeholder="Employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_id">Employee id</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesPersonForm;
