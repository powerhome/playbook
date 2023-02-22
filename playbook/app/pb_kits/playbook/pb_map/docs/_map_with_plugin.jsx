import React, { useRef, useEffect } from 'react'
import { Map } from '../../'
import maplibregl from 'maplibre-gl'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import mapTheme from '../pbMapTheme'

const MapWithPlugin = () => {

  const mapContainerRef = useRef(null)

    //This function should contain all maplibre related code
    const loadMap = ( { target: map }) => {
        //set marker/pin
        /* eslint-disable-next-line */
        const marker = new maplibregl.Marker({
          color: mapTheme.marker,
        }).setLngLat([-75.379143, 39.831200])
        .setPopup(new maplibregl.Popup({className: 'map_popup', closeButton: false}).setHTML(`<h4 class="pb_title_kit_size_4">Hello World!</h4>`)) // add popup
        .addTo(map);

        //add zoom controls
        map.addControl(new maplibregl.NavigationControl({showCompass: false}))

        // disable map zoom when using scroll
        map.scrollZoom.disable();

        //Add polygon draw button using map-box-gl-draw plugin
        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
            polygon: true,
            trash: true
            }
            });
            map.addControl(draw);
    }

    useEffect(() => {
         new maplibregl.Map({
            container: mapContainerRef.current,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-75.379143, 39.831200],
            zoom: 13,
        }).on('load', loadMap)
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

export default MapWithPlugin
