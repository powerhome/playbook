import React from "react";
import Button from "../pb_button/_button";
import Icon from "../pb_icon/_icon";

const MapCustomButton = ({ handleOnClick, icon }:any) => {
  return (
      <Button className="pb_map-custom-button" 
        onClick={handleOnClick}
       >
        <Icon icon={icon} />
      </Button>
  );
};

export default MapCustomButton;
