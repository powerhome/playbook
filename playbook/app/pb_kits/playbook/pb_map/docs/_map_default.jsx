import React from 'react'
import Map from '../_map'
import { Map as PigeonMap, Marker, ZoomControl } from "pigeon-maps"

const MapDefault = () => (
  <div>
    <Map>
      <PigeonMap defaultCenter={[39.831690, -75.383050]} 
          defaultZoom={11}
          height={600} 
      >
        <Marker anchor={[39.831690, -75.383050]}
            width={50}  
        />
        <ZoomControl />
      </PigeonMap>
    </Map>
  </div>
)

export default MapDefault
