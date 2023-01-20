import React, { useRef, useEffect } from 'react'
// import Map from '../_map'

import maplibregl from 'maplibre-gl'

const MapDefault = () => {

  const mapContainerRef = useRef(null)

    useEffect(() => {
      if (!maplibregl.supported()) {
        alert('Your browser does not support MapLibre GL');
        } else {
         const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
            center: [8.55301, 47.35257],
            zoom: 8,
        })
        map.addControl(new maplibregl.NavigationControl())
        const scale = new maplibregl.ScaleControl({
            maxWidth: 80,
            unit: 'metric'
        })
        map.addControl(scale)
      }
    }, [])
return ( 
       <div
           ref={mapContainerRef}
           style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0, 
              bottom: 0,
           }}
        />
)
}

export default MapDefault
