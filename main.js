const app = new Vue({
	// connects to div in html with id app
	el: "#app",
	// variables that you want access to in the html
	data: {
		product: "Socks",
		image: "./assets/vmSocks-green.jpg",
		inventory: 8,
		onSale: true
	}
})
