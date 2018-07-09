import React from 'react';

class CreatePlanetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mass: '',
      x_position: '',
      y_position: '',
      z_position: '',
      p_x: '',
      p_y: '',
      p_z: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const minPosition = 10;
    const maxPosition = 2000;
    const minMomentum = 1000;
    const maxMomentum = 1000000;
    let newPlanet = {
      mass: this.state.mass === "" ? 1000 + Math.floor(Math.random() * 19000) : this.state.mass,
      x_position: this.state.x_position === "" ? minPosition + Math.floor(Math.random() * maxPosition) : this.state.x_position,
      y_position: this.state.y_position === "" ? minPosition + Math.floor(Math.random() * maxPosition) : this.state.y_position,
      z_position: this.state.z_position === "" ? minPosition + Math.floor(Math.random() * maxPosition) : this.state.z_position,
      p_x: this.state.p_x === "" ? minMomentum + Math.floor(Math.random() * maxMomentum) : this.state.p_x,
      p_y: this.state.p_y === "" ? minMomentum + Math.floor(Math.random() * maxMomentum) : this.state.p_y,
      p_z: this.state.p_z === "" ? minMomentum + Math.floor(Math.random() * maxMomentum) : this.state.p_z,
    }
    this.props.handleCreatePlanetInput(newPlanet)
  }

  render() {
    return (
      <form className="create-planet-form" onSubmit={this.handleSubmit}>
        <label>
          Initial mass:
          <input 
            name="mass" 
            type="number" 
            value={this.state.mass} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Initial x-position:
          <input 
            name="x_position"
            type="number" 
            value={this.state.x_position} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Initial y-position:
          <input 
            name="y_position"
            type="number" 
            value={this.state.y_position} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Initial z-position:
          <input
            name="z_position" 
            type="number" 
            value={this.state.z_position} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Initial x-momentum:
          <input
            name="p_x"
            type="number" 
            value={this.state.p_x} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Initial y-momentum:
          <input
            name="p_y" 
            type="number" 
            value={this.state.p_y} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Initial z-momentum:
          <input
            name="p_z"
            type="number" 
            value={this.state.p_z} 
            onChange={this.handleInputChange} />
        </label>
        <button>submit</button>
      </form>
    );    
  }
}

export default CreatePlanetForm;

// this.handleMassChange = this.handleMassChange.bind(this);
  // this.handleX_positionChange = this.handleX_positionChange.bind(this);

  // handleMassChange(event) {
  //   this.setState({
  //     mass: event.target.value
  //   });
  // }
  // handleX_positionChange(event) {
  //   this.setState({
  //     x_position: event.target.value
  //   });
  // }
  // handleY_positionChange(event) {
  //   this.setState({
  //     y_position: event.target.value
  //   });
  // }
  // handleZ_positionChange(event) {
  //   this.setState({
  //     z_position: event.target.value
  //   });
  // }
  // handleX_momentumChange(event) {
  //   this.setState({
  //     p_x: event.target.value
  //   });
  // }
  // handleY_momentumChange(event) {
  //   this.setState({
  //     p_y: event.target.value
  //   });
  // }
  // handleZ_momentumChange(event) {
  //   this.setState({
  //     p_z: event.target.value
  //   });
  // }