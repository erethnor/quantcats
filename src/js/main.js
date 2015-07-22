"use strict";

import Quantcats from "./Quantcats.js";
import conf from "./config.js";

const quantcats = new Quantcats();
const elementToID = new WeakMap();
const IDToelement = new Map();

document.addEventListener( "DOMContentLoaded", quantcats.populateIDs.bind( quantcats ), false );

document.documentElement.addEventListener( "click", function( evt ) {
	if ( !evt.target.matches( ".cats-picker_cat" ) ) {
		return;
	}

	quantcats.toggle( elementToID.get( evt.target ) );
}, false );

// data binds to IDs to display cat images
Object.observe( quantcats.IDs, function() {
	const catTemplate = document.querySelector("#cat-template").content;
	const catsPicker = document.querySelector(".cats-picker");

	catsPicker.firstChild.remove();

	for ( let catID of quantcats.IDs ) {
		let catImg = catTemplate.querySelector("img");

		catImg.src = `${conf.url.images}/${catID}.png`;

		let catClone = document.importNode( catTemplate, true );
		catsPicker.appendChild( catClone );

		elementToID.set( catsPicker.lastElementChild, catID );
		IDToelement.set( catID, catsPicker.lastElementChild );
	}
} );

// data binds to selected cats to display selection effect
Object.observe( quantcats.selectedCats, function( changes ) {
	for ( let change of changes ) {
		let catID;
		let cat;

		if ( change.type === "add" ) {
			catID = change.object[ change.name ];
			cat = IDToelement.get( catID );
			cat.classList.add( "selected" );
		} else if ( change.type === "delete" ) {
			catID = change.oldValue;
			cat = IDToelement.get( catID );
			cat.classList.remove( "selected" );
		}
	}
} );

// display solutions
Object.observe( quantcats.clowders, function( changes ) {
	const catTemplate = document.querySelector("#cat-solution-template").content;
	const clowderItems = document.querySelectorAll(".clowders_groups_item");

	for ( let change of changes ) {
		if ( change.type === "add" ) {
			let catImg = catTemplate.querySelector("img");
			let solution = change.object[ change.name ];
			solution = solution.split( "," );

			for ( let i = 0; i < solution.length; i++ ) {

				catImg.src = `${conf.url.images}/${solution[i]}.png`;

				let catClone = document.importNode( catTemplate, true );
				clowderItems[ +change.name + i ].appendChild( catClone );
			}
		}
	}
} );
