const APIurl = "http://quantcats.herokuapp.com";

const config = Object.freeze({
	url: {
		api: APIurl,
		bag: `${APIurl}/bag`,
		images: `${APIurl}/static/cats`,
		clowder: `${APIurl}/clowder`
	},
	messages: {
		invalidClowder: "These cats don't get along!",
		duplicateSolution: "You have found this solution already!"
	}
});

export default config;
