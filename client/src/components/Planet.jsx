import React from 'react';

class Planet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x_value: 0,
      y_value: 0,
      z_value: 0,
      mass: 10,
      x_vel: 0,
      y_vel: 0,
      z_vel: 0
    };
  }

  render() {
   // console.log('PROPS:',this.props)
   let z_magnitude;
    if(this.props.planetProps.z_position < -5000){
      z_magnitude = 1
    } else if(this.props.planetProps.z_position > 5000){
      z_magnitude = 10000
    } else {
      z_magnitude = 5000 + this.props.planetProps.z_position;
    }

    let size = (200 * z_magnitude / 10000) + 10 //* this.props.planetProps.mass/2000;

    const positionStyle = {
      left: this.props.planetProps.x_position,
      top: this.props.planetProps.y_position,
      zIndex: z_magnitude,
      height: size + 'px',
      width: size + 'px'
    }
    return (
      <div className="planet" style={positionStyle}>
      <div>size:{Math.round(size)}</div>
      <div>X:{Math.round(this.props.planetProps.x_position)}</div>
      <div>Y:{Math.round(this.props.planetProps.y_position)}</div>
      <div>Z:{Math.round(this.props.planetProps.z_position)}</div>
      </div>
    );
  }
}

export default Planet;

