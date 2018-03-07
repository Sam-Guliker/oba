import sparqlRequest from './modules/request.js'
import mapBox from './modules/mapbox.js'


(function() {

  var app = {

    init: function() {
      sparqlRequest.init()
      mapBox.init()
    }
  }
  app.init()
})();
