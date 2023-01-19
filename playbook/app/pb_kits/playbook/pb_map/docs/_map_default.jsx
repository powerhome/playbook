import React from 'react'
import Map from '../_map'
import { Map as PigeonMap, Marker } from "pigeon-maps"

const MapDefault = () => (
  <div>
    <Map>
    <PigeonMap defaultCenter={[50.879, 4.6997]} 
        defaultZoom={11}
        height={300} 
    >
      <Marker anchor={[50.879, 4.6997]}
          width={50}  
      />
    </PigeonMap>
      </Map>
  </div>
)

export default MapDefault
