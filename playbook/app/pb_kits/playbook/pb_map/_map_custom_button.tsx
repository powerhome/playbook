import React from "react";
import Button from "../pb_button/_button";
import Icon from "../pb_icon/_icon";

const MapCustomButton = ({ handleOnClick, icon, buttonPositionTop }:any) => {
  return (
    <div style={{position: 'absolute', right:11, top: buttonPositionTop}}>
      <Button className="pb_map-custom-button" 
        onClick={handleOnClick}
       >
        <Icon icon={icon} />
      </Button>
   </div>
  );
};

export default MapCustomButton;
