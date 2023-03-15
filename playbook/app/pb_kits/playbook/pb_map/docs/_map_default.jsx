import React, { useRef, useEffect, useState } from 'react'
import { Map, mapTheme, Title, IconCircle, Flex } from '../../'
import maplibregl from 'maplibre-gl'
import ReactDOM from 'react-dom'

const MapDefault = (props) => {

  //set Map instance to access from outside useEffect
  const [mapInstance, setMapInstance] = useState(null)
  const mapContainerRef = useRef(null)

  //Set default position
  const defaultPosition = [-75.379143, 39.831200]

  const mapPopup = document.createElement("div");
  ReactDOM.render( 
    <Flex align="center" 
        orientation="column"
    >
    <Title marginBottom='xs'
        size={4}
        text="Hello World!"
    /> 
      <IconCircle
          icon="rocket"
          size="sm"
          variant="orange"
      />
    </Flex>,
    mapPopup
  );

  // linking Maplibre methods to PB custom zoom in, zoom out, and fly to buttons
  const handleZoomIn = (map) => {map.zoomIn({...mapTheme.zoomConfig})}
  const handleZoomOut = (map) => {map.zoomOut({...mapTheme.zoomConfig})}
  const handleFlyTo = (map) => {map.flyTo({
                                center: defaultPosition,
                                ... mapTheme.flyToConfig
                                });}

  //This function is called by the useEffect when map instance first loads
  const loadMap = ( { target: map }) => {
        //set marker/pin
        new maplibregl.Marker({
          color: mapTheme.marker,
        }).setLngLat(defaultPosition)
        .setPopup(new maplibregl.Popup({closeButton: false}).setDOMContent(mapPopup)) // add popup
        .addTo(map);

        // disable map zoom when using scroll
        map.scrollZoom.disable();
        
        //add attributioncontrols
        map.addControl(new maplibregl.AttributionControl({
          compact: true
          }));

        //set map instance
        setMapInstance(map)
  }

    useEffect(() => {
         new maplibregl.Map({
            container: mapContainerRef.current,
            center: defaultPosition,
            ...mapTheme.mapConfig
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
