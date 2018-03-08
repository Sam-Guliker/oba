// import currentData from './data.js'
import sparqlRequest, {thisData} from './request.js'

var mapBox = {
  map: '',
  init: function() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVjb3RyYXgiLCJhIjoiY2plZmt2MWRtMGNiNjMzcjRqd2h3d2xqZSJ9.4Jzow4RzYK6SCw0_WMxZ4A';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [4.90, 52.37],
      zoom: 15,
      pitch: 45,
      bearing: -17.6,
      hash: true,
      container: 'map'
    });
    this.map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = mapBox.map.getStyle().layers;
    console.log(mapBox.map)

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

        mapBox.map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                ],
                'fill-extrusion-opacity': .6
            }
        }, labelLayerId);
    });

    this.popup()
  },
  popup: function() {
    // console.log(typeof thisData)
    // console.log(thisData.length)

    // add markers to map
    thisData.features.forEach(function(marker) {
      // console.log(111, marker)


      // create a HTML element for each feature
      var el = document.createElement('div');
      var aside = document.querySelector('aside')
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(mapBox.map);
      const mark = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({
            offset: 25
          }) // add popups
          .setHTML(`
                <h2>${marker.properties.name}</h2>
                <img src="${marker.properties.image}"/>
                <p>De leeftijd van het gebouw: ${marker.properties.byear} -  ${marker.properties.eyear}</p>
            `)
        )
        .addTo(mapBox.map);
    })
  }
}

export default mapBox
