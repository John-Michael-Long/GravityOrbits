import React from 'react';
import TopMenuBar from './TopMenuBar.jsx';
import SpaceContainer from './SpaceContainer.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planetProperties: [
        {
          mass: 100,
          x_position: 300,
          y_position: 300,
          x_velocity: 20,
          y_velocity: -20,
          x_force: 20,
          y_force: 20
        }
      ]
    };
  }

  timestep() {
    
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

