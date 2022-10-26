import React from 'react';

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      year: '',
      vin: '',
      model: '',
      models: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
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
    data.model_id = data.model;
    delete data.models;
    const automobilesUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(automobilesUrl, fetchConfig);

    if (response.ok) {
      this.setState({
        color: '',
        year: '',
        vin: '',
        model: '',
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} placeholder="Color" required
                  value={this.state.color} type="text" name="color" id="color"
                  className="form-control" />
                <label htmlFor="name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input  onChange={this.handleChange} placeholder="Year" required
                  value={this.state.year} type="number" name="year" id="year"
                  className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input  onChange={this.handleChange} placeholder="VIN" required
                  value={this.state.vin} type="text" name="vin" id="vin"
                  className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} required name="model"
                  value={this.state.model} id="model" className="form-select">
                <option value="">Choose a model</option>
                  {this.state.models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AutomobileForm;
