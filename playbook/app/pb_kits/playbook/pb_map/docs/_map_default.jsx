import React from 'react'
import Map from '../_Map'
import { Title } from '../..'
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";


const MapDefault = () => {
  const position = [39.831200, -75.379143];
    const customMarkerIcon = divIcon({className: 'custom-icon'});

  return (
  <div>
    <Map>
      <MapContainer
          center={position}
          maxZoom={18}
          style={{ height:"500px"}}
          zoom={13}
      >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Marker icon={customMarkerIcon} 
            position={position}
        >
        <Popup>
        <Title size="4">
          Im a popover
        </Title>
        </Popup>
        </Marker>
      </MapContainer>

    </Map>
  </div>
  )
}

export default MapDefault
