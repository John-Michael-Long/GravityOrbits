import React from 'react';
import TopMenuBar from './TopMenuBar.jsx';
import SpaceContainer from './SpaceContainer.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planetProperties: [
        {
          mass: 10,
          x_position: 700,
          y_position: 200,
          x_velocity: 20,
          y_velocity: -20,
          x_accel: 1,
          y_accel:1,
          p_x: 2500,
          p_y: 1
        },
        {
          mass: 1000,
          x_position: 700,
          y_position: 500,
          x_velocity: 20,
          y_velocity: -20,
          x_force: 20,
          y_force: 20
        },
      ],
      planetPropertiesUpdate: [
        {
          mass: 10,
          x_position: 7,
          y_position: 5,
          x_velocity: 20,
          y_velocity: -20,
          x_accel: 1,
          y_accel:1,
          p_x: 2000,
          p_y: 0
        },
        {
          mass: 1000,
          x_position: 500,
          y_position: 700,
          x_velocity: 20,
          y_velocity: -20,
          x_force: 20,
          y_force: 20
        },
      ]
    };
  }

  componentDidMount(){
    this.timestep()
  }

  timestep() {
    console.log('entered timestep')
    this.updatePostition();
    setTimeout(this.timestep.bind(this, 10), 10);
  }

  calculateDistance() {
    let x_dist = Math.abs(this.state.planetProperties[0].x_position - this.state.planetProperties[1].x_position);
    let y_dist = Math.abs(this.state.planetProperties[0].y_position - this.state.planetProperties[1].y_position);

    if(this.state.planetProperties[0].x_position > this.state.planetProperties[1].x_position){
      x_dist *= -1
    }

    if(this.state.planetProperties[0].y_position > this.state.planetProperties[1].y_position){
      y_dist *= -1
    }

    return [x_dist, y_dist];
  }

  calculateForce(r_dist) {
    let magnitude = 100000;
    let force = magnitude * this.state.planetProperties[0].mass * this.state.planetProperties[1].mass / (r_dist * r_dist)
    return force;
  }

  updatePostition() {
    // let x_velocity = planetProperties[0].x_velocity;
    // let y_velocity = this.state.planetProperties[0].y_velocity;

    let xy_dist = this.calculateDistance();
    let x_dist =  xy_dist[0];
    let y_dist =  xy_dist[1]; 

    let r_dist = Math.pow(Math.pow(x_dist, 2) + Math.pow(y_dist, 2), 0.5)
    let force = this.calculateForce(r_dist)
    let x_unit = x_dist / r_dist;
    let y_unit = y_dist / r_dist;

    let delta_t = .01

    let planets = this.state.planetProperties;
    let planet = planets[0];

    let force_x = force * x_unit; 
    let force_y = force * y_unit;

    let delta_px = force_x * delta_t;
    let delta_py = force_y * delta_t;

    planet.p_x += delta_px;
    planet.p_y += delta_py;

    let delta_x = planet.p_x * delta_t / planet.mass;
    let delta_y = planet.p_y * delta_t / planet.mass;

    planet.x_position += delta_x;
    planet.y_position += delta_y;

    let v_orbit = Math.sqrt( (500000 * planets[1].mass) / r_dist )


    console.log('V_orbit:', v_orbit )
    console.log('p_orbit:', v_orbit * planet.mass)



    // planet.x_accel = force_x / planet.mass;
    // planet.y_accel = force_y / planet.mass;
    // planet.x_position = planet.x_position + planet.x_velocity * delta_t + 0.5 * planet.x_accel * delta_t * delta_t;
    // planet.y_position = planet.y_position + planet.y_velocity * delta_t + 0.5 * planet.y_accel * delta_t * delta_t;
    // planet.x_velocity = planet.x_velocity + planet.x_accel * delta_t;
    // planet.y_velocity = planet.y_velocity + planet.y_accel * delta_t;


    console.log('x_unit:', x_unit)
    console.log('y_unit:', y_unit)
    console.log('x_dist:', x_dist)
    console.log('y_dist:', y_dist)
    console.log('force_x:', force_x)
    console.log('force_y:', force_y)
    console.log('p_2x:', planet.p_x)
    console.log('p_2y:', planet.p_y)
    console.log('delta_x:', delta_x)
    console.log('delta_y:', delta_y)

    console.log('planet:', planet)
    // console.log('x_position:', planet.x_position)
    // console.log('y_position:', planet.y_position)

    planets[0] = planet;

    this.setState({
      planetProperties: planets
    })
  }

  render() {
    return (
      <div className="orbits-container">
        <TopMenuBar />
        <SpaceContainer planetProperties={this.state.planetProperties} />
      </div>
    );
  }
}

export default App;

