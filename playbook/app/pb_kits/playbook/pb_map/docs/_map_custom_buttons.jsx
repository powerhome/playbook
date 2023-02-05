import React, { useRef, useEffect } from 'react'
import Map from '../_map'
import maplibregl from 'maplibre-gl'

const MapCustomButtons = () => {

  const mapContainerRef = useRef(null)

    useEffect(() => {
      if (!maplibregl.supported()) {
        alert('Your browser does not support MapLibre GL');
        } else {
         const map = new maplibregl.Map({
            attributionControl: false,
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

        //add custom buttons for zoom in and out control
        map.on('load', function () {
          const zoomInBtn = document.querySelector("#zoom-in-button")
          zoomInBtn.addEventListener('click', function () {
            map.zoomIn({duration: 1000})
          })
          const zoomOutBtn = document.querySelector("#zoom-out-button")
          zoomOutBtn.addEventListener('click', function () {
            map.zoomOut({duration: 1000})
          })
        })

        //Add Zoom button
        map.on('load', function () {
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
        })
        
        //add attributioncontrols
        map.addControl(new maplibregl.AttributionControl({
          compact: true
          }));

      }
    }, [])
return ( 
  <Map flyTo = "true"
      zoomBtns="true"
  >
       <div
           ref={mapContainerRef}
           style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0, 
              bottom: 0,
              // filter: 'invert(1) hue-rotate(180deg)'
           }}
        />
  </Map>
)
}

export default MapCustomButtons
