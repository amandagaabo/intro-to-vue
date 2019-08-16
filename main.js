const app = new Vue({
	// connects to div in html with id app
	el: "#app",
	// variables that you want access to in the html
	data: {
		product: "Socks",
		image: "./assets/vmSocks-green.jpg",
		link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks"
	}
})
