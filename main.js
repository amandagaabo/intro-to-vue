const app = new Vue({
	// connects to div in html with id app
	el: "#app",
	// variables that you want access to in the html
	data: {
		product: "Socks",
		image: "./assets/vmSocks-green.jpg",
		inventory: 8,
		onSale: true,
		details: [
			"80% cotton",
			"20% polyester",
			"Gender-neutral"
		],
		variants: [
			{
				variantId: 2234,
				variantColor: "green"
			},
			{
				variantId: 2235,
				variantColor: "blue"
			}
		],
		sizes: [
			"S",
			"M",
			"L"
		]
	}
})
