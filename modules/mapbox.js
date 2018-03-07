var mapBox = {
  init: function() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVjb3RyYXgiLCJhIjoiY2plZmt2MWRtMGNiNjMzcjRqd2h3d2xqZSJ9.4Jzow4RzYK6SCw0_WMxZ4A';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [4.90, 52.3745],
      zoom: 15.5
    });
    this.popup
  },
  popup: function() {
    console.log('hi')

    // add markers to map
    geojson.features.forEach(function(marker) {


      // create a HTML element for each feature
      var el = document.createElement('div');
      var aside = document.querySelector('aside')
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      const mark = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({
            offset: 25
          }) // add popups
          .setHTML(`
                <h3>${marker.properties.title}</h3>
                <p>Beschrijving: ${marker.properties.description}</p>
                <p>Bouwjaar: ${marker.properties.bouwjaar}</p>
                <a href=#>Lees Meer</a>
            `)
        )
        .addTo(map);
    })
    var popup = mark.getPopup()
    var buttons = Array.from(document.querySelectorAll('.mapboxgl-pop-up-content a'))

    popup._content.querySelector('a').addEventListener('click', function() {
      aside.classList.add('active')
      console.log(map)
    })
  }
}

export default mapBox
