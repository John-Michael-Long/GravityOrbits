import React from 'react';
import CreatePlanetForm from './CreatePlanetForm.jsx';

const TopMenuBar = (props) => {
  return (
   <div className="top-menu-bar">
    <span className="save-button">SAVE</span>
    <span className="planet-button" onClick={props.handleCreatePlanetClick}>CREATE PLANET</span>
    <span className="star-button">CREATE STAR</span>
    <span className="settings-button">SETTINGS</span>
    {!props.planetFormIsHidden && <CreatePlanetForm handleCreatePlanetInput={props.handleCreatePlanetInput} />}
  </div>
  );
}

export default TopMenuBar;