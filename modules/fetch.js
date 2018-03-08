var sparqlquery = `
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      SELECT ?cho ?title ?img ?description WHERE {
      ?cho dc:description ?description .
      ?cho dc:title ?title .
      ?cho foaf:depiction ?img .
      FILTER (CONTAINS(?description , "Monument"))
    }`;
    // more fun dc:types: 'affiche', 'japonstof', 'tegel', 'herenkostuum'
    // more fun dc:subjects with Poster.: 'Privacy.', 'Pop music.', 'Music.', 'Squatters movement.'

var encodedquery = encodeURI(sparqlquery);

var queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

fetch(queryurl)
    .then((resp) => resp.json()) // transform the data into json
    .then(function(data) {

    var rows = data.results.bindings; // get the results
    var imgdiv = document.getElementById('images');
    console.log(rows);

    for (i = 0; i < rows.length; ++i) {

        var img = document.createElement('img');
        img.src = rows[i]['img']['value'];
        img.title = rows[i]['title']['value'];
        imgdiv.appendChild(img);

    }
})

.catch(function(error) {
    // if there is any error you will catch them here
    console.log(error);
})

var geojson = {
  type: 'FeatureCollection',
  features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.898614883422852,
          52.37590865206193
        ]
      },
      properties: {
        title: 'Guldehandsteeg 11	',
        description: 'Hoekhuis met twee ingangen met stoep aan de Guldehandsteeg',
        bouwjaar: '17e or 18e eeuw'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.902587234973907,
          52.3759037397709
        ]
      },
      properties: {
        title: 'Oudezijds Kolk 3',
        description: 'Pakhuis',
        bouwjaar: '	waarschijnlijk 17e eeuw'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.902587234973907,
          52.3759037397709
        ]
      },
      properties: {
        title: 'Nieuwebrugsteeg 3	',
        description: 'Hoekhuis met trapgevel	',
        bouwjaar: '1619'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.898781180381775,
          52.37458067615798
        ]
      },
      properties: {
        title: 'Sint Olofspoort 2	',
        description: 'Pand met klokgevel van s-vormige silhouet',
        bouwjaar: '18 eeuw	'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.752536416053772,
          52.38378890070519
        ]
      },
      properties: {
        title: 'Stormsteeg 6',
        description: 'Twee huizen achter een gezamenlijke gevel met in- en uitgezwenkte top	',
        bouwjaar: 'tweede kwart 18e eeuw'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.9004065990448,
          52.375317535783296
        ]
      },
      properties: {
        title: 'Vredenburgersteeg 1 ',
        description: 'Pakhuis',
        bouwjaar: '	waarschijnlijk 17e eeuw'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          4.897863864898682,
          52.37472149916998
        ]
      },
      properties: {
        title: 'Enge Kerksteeg 1',
        description: 'Pand met halsgevel met gedeelde vleugelstukken en lofwerk in de afdekking',
        bouwjaar: 'eerste helft 18e eeuw'
      }

    }
  ]
};

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVjb3RyYXgiLCJhIjoiY2plZmt2MWRtMGNiNjMzcjRqd2h3d2xqZSJ9.4Jzow4RzYK6SCw0_WMxZ4A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [4.90, 52.3745],
  zoom: 15.5
});

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

    console.log( mark.getPopup() )

    var buttons = Array.from(document.querySelectorAll('.mapboxgl-pop-up-content a'))
    console.log( buttons )

    buttons.forEach(function(element){
      console.log(element)
    })

    // buttons.addEventListener('click', function(){
    //   console.log('hi')
    //   console.log(map)
    //   aside.classList.add('active')
    //   map.classList.add('min-width')
    // })
});

// Manipulating the width
