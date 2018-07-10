import React from 'react';
import axios from 'axios';
import TopMenuBar from './TopMenuBar.jsx';
import SpaceContainer from './SpaceContainer.jsx';
import CreatePlanetForm from './CreatePlanetForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planetFormIsHidden: true,
      saveFormIsHidden: true,
      planetProperties: [
        {
          mass: 2000,
          x_position: 2500,
          y_position: 200,
          z_position: -200,
          p_x: -500000,
          p_y: 0,
          p_z: 1000
        },
        {
          mass: 6000,
          x_position: 1500,
          y_position: 1000,
          z_position: 0,
          p_x: 20000,
          p_y: -100,
          p_z: -10000
        },
        {
          mass: 4000,
          x_position: 200,
          y_position: 1500,
          z_position: 200,
          p_x: 150000,
          p_y: 200,
          p_z: 200000
        },
        {
          mass: 8000,
          x_position: 2000,
          y_position: 1700,
          z_position: 400,
          p_x: 1500000,
          p_y: 200,
          p_z: 200000
        },
      ]
    };

    this.handleCreatePlanetClick = this.handleCreatePlanetClick.bind(this)
    this.handleCreatePlanetInput = this.handleCreatePlanetInput.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleSaveSubmit = this.handleSaveSubmit.bind(this)
  }

  handleSaveSubmit(username, password) {
    axios.post('/savedgames', {
      username: username,
      password: password,
      planetProperties: this.state.planetProperties
    })
    .then( res => {
      console.log('server response:', res.data)
    })
    .catch( err => {
      console.log('server err:', err)
    })
    this.setState({
      saveFormIsHidden: true
    })
  }

  handleSaveClick() {
    console.log('entered handleSaveClick')
    let value = this.state.saveFormIsHidden;
    this.setState({
      saveFormIsHidden: !value
    })
  }

  handleCreatePlanetClick(){
    console.log('clicked handleCreatePlanetClick');
    //display input form
    let value = this.state.planetFormIsHidden;
    this.setState({
      planetFormIsHidden: !value
    })
    
  }

  handleCreatePlanetInput(newPlanet){
    console.log('clicked handleCreatePlanetInput:', newPlanet);
    //push input data to planet properties
    let planets = this.state.planetProperties;
    planets.push(newPlanet)
    this.setState({
      planetProperties: planets,
      planetFormIsHidden: true
    })
  }

  componentDidMount(){
    this.timestep()
  }

  timestep() {
    //const updateAllPlanets = current => {
    for(let i = 0; i < this.state.planetProperties.length; i++)
      for(let j = 0; j < this.state.planetProperties.length; j++) {
        if (j !== i) {
          this.updatePostition(j, i);
        }
      }
    //}
    setTimeout(this.timestep.bind(this, 10), 10);
  }

  calculateDistance(planet1, planet2) {
    let x_dist = Math.abs(this.state.planetProperties[planet1].x_position - this.state.planetProperties[planet2].x_position);
    let y_dist = Math.abs(this.state.planetProperties[planet1].y_position - this.state.planetProperties[planet2].y_position);
    let z_dist = Math.abs(this.state.planetProperties[planet1].z_position - this.state.planetProperties[planet2].z_position);
    if(this.state.planetProperties[planet1].x_position > this.state.planetProperties[planet2].x_position){
      x_dist *= -1
    }
    if(this.state.planetProperties[planet1].y_position > this.state.planetProperties[planet2].y_position){
      y_dist *= -1
    }
    if(this.state.planetProperties[planet1].z_position > this.state.planetProperties[planet2].z_position) {
      z_dist *= -1
    }
    return [x_dist, y_dist, z_dist];
  }

  calculateForce(r_dist, planet1, planet2) {
    let magnitude = 300000;
    let force = magnitude * this.state.planetProperties[planet1].mass * this.state.planetProperties[planet2].mass / Math.pow(r_dist, 2)
    return force;
  }

  updatePostition(planet1, planet2) {
    let xyz_dist = this.calculateDistance(planet1, planet2);
    let x_dist = xyz_dist[0];
    let y_dist = xyz_dist[1]; 
    let z_dist = xyz_dist[2]; 
    let r_dist = Math.pow(Math.pow(x_dist, 2) + Math.pow(y_dist, 2) + Math.pow(z_dist, 2), 0.5)
    let force = this.calculateForce(r_dist, planet1, planet2)
    let x_unit = x_dist / r_dist;
    let y_unit = y_dist / r_dist;
    let z_unit = z_dist / r_dist;
    let delta_t = .002
    let planets = this.state.planetProperties;
    let planet = planets[planet1];
    let force_x = force * x_unit; 
    let force_y = force * y_unit;
    let force_z = force * z_unit;
    let delta_px = force_x * delta_t;
    let delta_py = force_y * delta_t;
    let delta_pz = force_z * delta_t;
    planet.p_x += delta_px;
    planet.p_y += delta_py;
    planet.p_z += delta_pz;
    let delta_x = planet.p_x * delta_t / planet.mass;
    let delta_y = planet.p_y * delta_t / planet.mass;
    let delta_z = planet.p_z * delta_t / planet.mass;

    planet.x_position += delta_x;
    planet.y_position += delta_y;
    planet.z_position += delta_z;

    console.log('window.innerWidth:', window.innerWidth)
    console.log('window.innerHeight:', window.innerHeight)

    // if(planet.x_position > window.innerWidth){
    //   planet.x_position = 0;
    // }
    // if(planet.y_position > window.innerHeight){
    //   planet.y_position = 0;
    // }
    // if(planet.z_position > 10000 || planet.z_position < -10000){
    //   planet.z_position = 0;
    // }
    // if(planet.x_position < 0){
    //   planet.x_position = window.innerWidth;
    // }
    // if(planet.y_position < 0){
    //   planet.y_position = window.innerHeight;
    // }


    // console.log('currentPlanet:', planet1)
    // console.log('planetProperties:', this.state.planetProperties)
    // console.log('x_unit:', x_unit)
    // console.log('y_unit:', y_unit)
    // console.log('z_unit:', z_unit)
    // console.log('x_dist:', x_dist)
    // console.log('y_dist:', y_dist)
    // console.log('z_dist:', z_dist)
    // console.log('force_x:', force_x)
    // console.log('force_y:', force_y)
    // console.log('force_z:', force_z)
    // console.log('p_2x:', planet.p_x)
    // console.log('p_2y:', planet.p_y)
    // console.log('p_2z:', planet.p_z)
    // console.log('delta_x:', delta_x)
    // console.log('delta_y:', delta_y)
    // console.log('delta_z:', delta_z)

    planets[planet1] = planet;

    this.setState({
      planetProperties: planets
    })
  }

  render() {
    return (
      <div className="orbits-container">
        <TopMenuBar 
          handleCreatePlanetClick={this.handleCreatePlanetClick}
          handleCreatePlanetInput={this.handleCreatePlanetInput}
          handleSaveClick={this.handleSaveClick}
          handleSaveSubmit={this.handleSaveSubmit}
          planetFormIsHidden={this.state.planetFormIsHidden}
          saveFormIsHidden={this.state.saveFormIsHidden}
        />
        <SpaceContainer planetProperties={this.state.planetProperties} />
      </div>
    );
  }
}

export default App;

