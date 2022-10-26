import React from 'react';

class VehicleModelForm extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        name: '',
        picture_url: '',
        manufacturer: '',
        manufacturers: []
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
      const url = 'http://localhost:8100/api/manufacturers/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this.setState({ manufacturers: data.manufacturers });
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
    data.manufacturer_id = data.manufacturer;
    delete data.manufacturers

    const modelsUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(modelsUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      this.setState({
        name: '',
        picture_url: '',
        manufacturer: '',
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Vehicle Model</h1>
            <form onSubmit={this.handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChange} placeholder="Name" required
                  value={this.state.name} type="text" name="name" id="name"
                  className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
                <div className="form-floating mb-3">
                  <input  onChange={this.handleChange} placeholder="Picture URL" required
                    value={this.state.picture_url} type="url" name="picture_url" id="picture_url"
                    className="form-control" />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleChange} required name="manufacturer"
                    value={this.state.manufacturer} id="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
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

export default VehicleModelForm;
