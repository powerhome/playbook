import React, { useRef, useEffect } from 'react'
import Map from '../_map'
import { Icon } from '../..'
import maplibregl from 'maplibre-gl'
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const MapWithButtons = () => {

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
        .setPopup(new maplibregl.Popup({className: 'map_popup'}).setHTML(`<h4 class="pb_title_kit_size_4">Hello World!</h4>`)) // add popup
        .addTo(map);

        //add controls
        map.addControl(new maplibregl.NavigationControl({showCompass: false}))

        //add attributioncontrols
        map.addControl(new maplibregl.AttributionControl({
            compact: true
            }));

        //Add polygon draw button using map-box-gl-draw plugin
        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
            polygon: true,
            trash: true
            }
            });
            map.addControl(draw);
            
            
            //Add Zoom button
            map.on('load', function () {
            const button = document.querySelector("#zoom-button")
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
        


      }
    }, [])


    
return ( 
  <Map>
    <div className='map-zoom-button'
        id="zoom-button"
    ><Icon icon="eye"/></div>
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

export default MapWithButtons
