import React from "react";
import Button from "../pb_button/_button";
import Icon from "../pb_icon/_icon";
import Flex from "../pb_flex/_flex";
import { getAllIcons } from "../utilities/icons/allicons"

type MapControlTypes = {
  zoomBtns?: boolean, 
  flyTo?: boolean, 
  zoomInClick?: () => void,
  zoomOutClick?: () => void,
  flyToClick?: () => void,
  children?: React.ReactNode | React.ReactNode[]
}

const eyeIcon = getAllIcons()["eye"]

const MapControls = ({
  zoomBtns,
  zoomInClick,
  zoomOutClick,
  flyTo,
  flyToClick,
  children,
}: MapControlTypes) => {
  return (
    <Flex className="custom-nav-control"
        orientation="column"
    >
      {zoomBtns ? (
        <>
          <div className="custom-nav-control-zoom">
            <Button className="map-zoom-in-button"
                onClick={zoomInClick}
            >
              <Icon icon="plus" />
            </Button>
            <Button className="map-zoom-out-button"
                onClick={zoomOutClick}
            >
              <Icon icon="minus" />
            </Button>
          </div>
          {flyTo ? (
            <Button className="map-flyto-button"
                onClick={flyToClick}
            >
              <Icon customIcon={eyeIcon.icon as unknown as { [key: string]: SVGElement }} />
            </Button>
          ) : null}
        </>
      ) : null}
      {children}
    </Flex>
  );
};

export default MapControls;
