import React from "react";

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if(response.ok){
            this.setState({
                name: '',
            });
        }
    }
    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value });
    }
    render() {
        return (
            <div className="row">
                <div className= "offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} value={this.state.name} placeholder="Manufacturer" required type="text" name="name" className="form-control" />
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default ManufacturerForm;
