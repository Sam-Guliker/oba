import sparqlRequest from './modules/request.js'
import mapBox from './modules/mapbox.js'


(function() {

  'use strict'

  var app = {

    init: function() {
      sparqlRequest.init()
      mapBox.init()
    }
  }
  app.init()
})();
