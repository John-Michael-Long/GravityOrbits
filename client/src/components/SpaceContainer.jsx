import React from 'react';
import Planet from './Planet.jsx'

const SpaceContainer = (props) => {
  return (
    <div className="space-container">
    {
      props.planetProperties.map( (planetProps, index) => (
        <Planet key={index} planetProps={planetProps} />
      ))
    }
    </div>
  );
}

export default SpaceContainer;