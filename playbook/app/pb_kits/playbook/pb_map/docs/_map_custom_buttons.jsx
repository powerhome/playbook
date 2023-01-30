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
            container: mapContainerRef.current,
            style: 'https://api.maptiler.com/maps/positron/style.json?key=g8IQm57iZcbJ6Ky1HmG4',
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

        //add custom buttons for zoom in and out control
        map.on('load', function () {
            const zoomBtn = document.querySelector(".map-custom-buttons-example").querySelector(".maplibregl-ctrl-zoom-in")
            const zoomOutBtn = document.querySelector(".map-custom-buttons-example").querySelector(".maplibregl-ctrl-zoom-out")
            const currentSvg = document.querySelector(".map-custom-buttons-example").querySelectorAll(".maplibregl-ctrl-icon")
            currentSvg.forEach(element => element.remove())
            const zoomIcon = document.createElement("i")
            zoomIcon.classList.add("pb_icon_kit", "far", "fa-fw", "fa-plus", "fa-2x", "map-custom-icon")
            zoomBtn.append(zoomIcon)
            const zoomOutIcon = document.createElement("i")
            zoomOutIcon.classList.add("pb_icon_kit", "far", "fa-fw", "fa-minus", "fa-2x", "map-custom-icon")
            zoomOutBtn.append(zoomOutIcon)
        })

      }
    }, [])
return ( 
  <Map>
    <div className="map-custom-buttons-example">
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
        </div>
    </Map>
)
}

export default MapCustomButtons
