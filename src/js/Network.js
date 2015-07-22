"use strict";

const returnJSON = res => res.json();

class Network {
	static get( url, queryString ) {
		if ( queryString ) {
			url += `?${queryString}`;
		}

		return fetch( url )
			.then( returnJSON );
	}
}

export default Network;
