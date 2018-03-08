const endpointUrl = 'https://query.wikidata.org/sparql',
      sparqlQuery = `SELECT ?Amsterdam_Centrum ?Amsterdam_CentrumLabel ?instance_of ?instance_ofLabel WHERE {
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
                ?Amsterdam_Centrum wdt:P276 wd:Q478282.
                OPTIONAL { ?Amsterdam_Centrum wdt:P1456 ?instance_of. }
            }
            LIMIT 100`,
      fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery ),
      headers = { 'Accept': 'application/sparql-results+json' };

fetch( fullUrl, { headers } )
    .then( body => body.json() )
    .then( json => {
        const { head: { vars }, results } = json;
        for ( const result of results.bindings ) {
            for ( const variable of vars ) {
                console.log( '%s: %o', variable, result[variable] );
            }
            console.log( '---' );
        }
} );
