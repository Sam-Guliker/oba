# Oba - Amsterdam
An 1 week project with the :mortar_board: OBA - Amsterdam. :mortar_board:

[![https://gyazo.com/827df2002f9a1fcd478e2115be8c1c3f](https://i.gyazo.com/827df2002f9a1fcd478e2115be8c1c3f.gif)](https://gyazo.com/827df2002f9a1fcd478e2115be8c1c3f)

## The Project
It was an open project. I had to work with SPARQL to get data and
clean and use the data. The subject was not given. I chose for  the "lost"buildings of Amsterdam

## Features
* [SPARQL](https://www.w3.org/TR/sparql11-query/)
* [MapboxGL](https://www.mapbox.com/mapbox-gl-js/api/) :ok_hand: :ok_hand:

### Getting the data
The sparQL code. This will get you the data of the old buildings that 
doesn't exist anymore and some extra data
such as:
  - The label/name of the building
  - An Old image
  - The Coordinates
  - The ages of when it was build and when it died  
  
``` Javascript
 var sparqlquery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX hg:     <http://rdf.histograph.io/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
    PREFIX geo: <http://www.opengis.net/ont/geosparql#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT ?gebouw ?wkt ?begin ?end ?label (SAMPLE(?img) AS ?image) WHERE {
      ?item dct:spatial ?gebouw .
      ?gebouw rdf:type hg:Building .
      ?gebouw geo:hasGeometry/geo:asWKT ?wkt .
      ?gebouw sem:hasEarliestBeginTimeStamp ?begin  .
      ?gebouw sem:hasEarliestEndTimeStamp ?end  .
      ?item foaf:depiction ?img .
      ?gebouw skos:prefLabel ?label
    }
    GROUP BY ?gebouw ?wkt ?begin ?end ?label`;
```  

### Changing the data
After getting the data I still need to clean it up so 
I could use it for the map.The coordinates was a pain.:unamused:  
I had to go into the string and clean it and seperate the `longitude` and the `latitude`.
 After that I made my own array and pushed the usable data in there.:relieved:  
 ```Javascript
 var encodedquery = encodeURIComponent(sparqlquery);

    var queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

    return fetch(queryurl)
      .then((resp) => resp.json()) // transform the data into json
      .then(function(data) {

        var rows = data.results.bindings; // get the results
        var imgdiv = document.getElementById('images');
        console.log(data)
        // var thisData = {features: []}

        rows.forEach(function(data){
          // console.log(data)
          if (data.wkt.value.includes('POLYGON')) {
            return
          }

          var doc = data.wkt.value;
          var first = doc.indexOf('4');
          var end = doc.indexOf(')');
          doc = doc.substring(first, end);

          var coordinates = doc.split(" ");
          console.log(coordinates)

          thisData.features.push({
            geometry: {
            type:'Point',
            coordinates: coordinates
          },
          properties: {
            byear: data.begin.value,
            eyear: data.end.value,
            image: data.image.value,
            name: data.label.value
          }})
        })
```

## Augmented Reality?
After the project I wanted to try to play with :fire: _AR_ :fire:  for the project. 
Its on an other branch. I want to display the old building through your phone.
### License
Copyright © 2018 Sam Guliker. Released under the [MIT license](https://opensource.org/licenses/MIT)
