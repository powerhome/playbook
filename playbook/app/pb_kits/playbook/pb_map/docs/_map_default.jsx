import React, { useRef, useEffect } from 'react'
import { Map } from '../../'

import maplibregl from 'maplibre-gl'

const MapDefault = () => {

  const mapContainerRef = useRef(null)

    useEffect(() => {
      if (!maplibregl.supported()) {
        alert('Your browser does not support MapLibre GL');
        } else {
         const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-75.379143, 39.831200],
            zoom: 13,
        })
        //set marker/pin
        /* eslint-disable-next-line */
        const marker = new maplibregl.Marker({
          color: "#0056CF",
        }).setLngLat([-75.379143, 39.831200])
        .setPopup(new maplibregl.Popup({className: 'map_popup', closeButton: false}).setHTML(`<h4 class="pb_title_kit_size_4">Hello World!</h4>`)) // add popup
        .addTo(map);

        //add zoom controls
        map.addControl(new maplibregl.NavigationControl({showCompass: false}))

        // disable map zoom when using scroll
        map.scrollZoom.disable();

      }
    }, [])
return ( 
  <Map>
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
    </Map>
)
}

export default MapDefault
