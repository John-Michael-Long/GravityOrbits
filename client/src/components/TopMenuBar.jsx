import React from 'react';
import CreatePlanetForm from './CreatePlanetForm.jsx';
import SaveForm from './SaveForm.jsx';

const TopMenuBar = (props) => {
  return (
   <div className="top-menu-bar">
    <span className="save-button" onClick={props.handleSaveClick}>SAVE</span>
    <span className="load-button">LOAD</span>
    <span className="planet-button" onClick={props.handleCreatePlanetClick}>CREATE PLANET</span>
    <span className="star-button">QUICK CREATE PLANET</span>
    <span className="settings-button">SETTINGS</span>
    {!props.planetFormIsHidden && <CreatePlanetForm handleCreatePlanetInput={props.handleCreatePlanetInput} />}
    {!props.saveFormIsHidden && <SaveForm handleSaveSubmit={props.handleSaveSubmit} />}
  </div>
  );
}

export default TopMenuBar;