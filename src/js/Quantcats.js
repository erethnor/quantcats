"use strict";

import conf from "./config.js";
import Network from "./Network.js";

class Quantcats {
	constructor() {
		this.futureCatBag = Network.get( conf.url.bag );

		this.IDs = [];
		this.selectedCats = [];
		this.clowders = [];
	}

	async checkClowder( IDs ) {
		const queryString = [ for ( ID of IDs ) `cat=${ID}` ].join("&");

		try {
			const data = await Network.get( conf.url.clowder, queryString );

			console.log( data );

			if ( data.valid ) {
				this.clowders.push( data.id );
			} else {
				alert( conf.messages.invalidClowder );
			}
		} catch ( e ) {
			alert( conf.messages.invalidClowder );
		} finally {
			// empty
			this.selectedCats.length = 0;
		}
	}

	async populateIDs() {
		try {
			const catsBag = await this.futureCatBag;

			for ( let catData of catsBag.cats ) {
				this.IDs.push( catData.join("") );
			}
		} catch ( e ) {
			console.warn( "No initial cat data", e );
		}
	}

	toggle( ID ) {
		const index = this.selectedCats.indexOf( ID );

		if ( ~index ) {
			// remove
			this.selectedCats.splice( index, 1 );
		} else {
			let compareToSolutions = this.selectedCats.slice(0);
			compareToSolutions.push( ID );

			if ( ~this.clowders.indexOf( compareToSolutions.sort().join(",") ) ) {
				alert( conf.messages.duplicateSolution );
				this.selectedCats.length = 0;

				return;
			}

			this.selectedCats.push( ID );
		}

		if ( this.selectedCats.length === 3 ) {
			this.checkClowder( this.selectedCats );
		}
	}
}

export default Quantcats;
