import mapBox from './mapbox.js'

var sparqlRequest = {

  init: function() {
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
    // more fun dc:types: 'affiche', 'japonstof', 'tegel', 'herenkostuum'
    // more fun dc:subjects with Poster.: 'Privacy.', 'Pop music.', 'Music.', 'Squatters movement.'

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

        // for (var i = 0; i < rows.length; ++i) {
        //
        //   var img = document.createElement('img');
        //   title.src = rows[i]['img']['value'];
        //   img.title = rows[i]['title']['value'];
        //   imgdiv.appendChild(img);
        // }
      })
      .catch(function(error) {
        // if there is any error you will catch them here
        console.log(error);
      })
  },
}

var thisData = {
  features: []
}

export default sparqlRequest
export {thisData}
