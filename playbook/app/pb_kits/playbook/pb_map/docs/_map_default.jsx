import React, { useRef, useEffect } from 'react'
import { Map } from '../../'
import "maplibre-gl/dist/maplibre-gl.css"
import maplibregl from 'maplibre-gl'
import mapTheme from '../pbMapTheme'

const MapDefault = (props) => {

  
  const mapContainerRef = useRef(null)

  //This function should contain all maplibre related code
  const loadMap = ( { target: map }) => {
  const defaultPosition = [-75.379143, 39.831200]
        //set marker/pin
        /* eslint-disable-next-line */
        const marker = new maplibregl.Marker({
          color: mapTheme.marker,
        }).setLngLat(defaultPosition)
        .setPopup(new maplibregl.Popup({closeButton: false}).setHTML(`<h4 class="pb_title_kit_size_4">Hello World!</h4>`)) // add popup
        .addTo(map);

        // disable map zoom when using scroll
        map.scrollZoom.disable();

        //add custom buttons for zoom in and out control
          const zoomInBtn = document.querySelector("#zoom-in-button")
          zoomInBtn.addEventListener('click', function () {
            map.zoomIn({duration: 1000})
          })
          const zoomOutBtn = document.querySelector("#zoom-out-button")
          zoomOutBtn.addEventListener('click', function () {
            map.zoomOut({duration: 1000})
          })

        //Add flyTo button
          const button = document.querySelector("#flyto-button")
          button.addEventListener('click', function () {
             map.flyTo({
                center: [-75.379143, 39.831200],
                zoom: 13,
                bearing: 0,
                curve: 1, // change the speed at which it zooms out
                easing: function (t) {
                return t;
                },
                essential: true
                });
          })  
        
        // //add attributioncontrols
        // map.addControl(new maplibregl.AttributionControl({
        //   compact: true
        //   }));
  }

    useEffect(() => {
         new maplibregl.Map({
            // attributionControl: false,
            container: mapContainerRef.current,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-75.379143, 39.831200],
            zoom: 13,
        }).on('load', loadMap)
    }, [])

return ( 
  <Map flyTo = "true"
      zoomBtns="true"
      {...props}
  >
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
