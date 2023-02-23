import React, { useRef, useEffect, useState } from 'react'
import { Map } from '../../'
import "maplibre-gl/dist/maplibre-gl.css"
import maplibregl from 'maplibre-gl'
import mapTheme from '../pbMapTheme'

const MapDefault = (props) => {

  //set Map instance to access from outside useEffect
  const [mapInstance, setMapInstance] = useState(null)

  const mapContainerRef = useRef(null)

  // linking Maplibre methods to PB custom zoom in, zoom out, and fly to buttons
  const handleZoomIn = (map) => {map.zoomIn({duration:1000})}
  const handleZoomOut = (map) => {map.zoomOut({duration:1000})}
  const handleFlyTo = (map) => {map.flyTo({
                                center: [-75.379143, 39.831200],
                                zoom: 13,
                                bearing: 0,
                                curve: 1, // change the speed at which it zooms out
                                easing: function (t) {
                                return t;
                                },
                                essential: true
                                });}

  //This function is called by the useEffect when map instance first loads
  const loadMap = ( { target: map }) => {
  const defaultPosition = [-75.379143, 39.831200]
        //set marker/pin
        new maplibregl.Marker({
          color: mapTheme.marker,
        }).setLngLat(defaultPosition)
        .setPopup(new maplibregl.Popup({closeButton: false}).setHTML(`<h4 class="pb_title_kit_size_4">Hello World!</h4>`)) // add popup
        .addTo(map);

        // disable map zoom when using scroll
        map.scrollZoom.disable();
        
        //set map instance
        setMapInstance(map)
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
  <Map flyTo
      flyToClick={()=> {handleFlyTo(mapInstance)}}
      zoomBtns
      zoomInClick={() => {handleZoomIn(mapInstance)}}
      zoomOutClick={()=> {handleZoomOut(mapInstance)}}
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
