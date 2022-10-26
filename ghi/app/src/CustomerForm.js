import React from 'react';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phone_number: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePhone_number = this.handleChangePhone_number.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const customerresponse = await fetch(customerUrl, fetchConfig);
        if (customerresponse.ok){

            this.setState({
                name: '',
                address: '',
                phone_number: '',
            });
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleChangeAddress(event) {
        const value = event.target.value;
        this.setState({address: value});
    }

    handleChangePhone_number(event) {
        const value = event.target.value;
        this.setState({phone_number: value});
    }

    render() {
        return (
            <div className="row">
                <div className= "offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeAddress} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangePhone_number} value={this.state.phone_number} placeholder="Phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerForm;
