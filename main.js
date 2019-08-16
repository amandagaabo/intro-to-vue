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
				variantColor: "green",
				variantImage: "./assets/vmSocks-green.jpg"
			},
			{
				variantId: 2235,
				variantColor: "blue",
				variantImage: "./assets/vmSocks-blue.jpg"
			}
		],
		sizes: [
			"S",
			"M",
			"L"
		],
		itemsInCart: 0
	},
	methods: {
		addToCart: function () {
			this.itemsInCart += 1;
		},
		removeFromCart: function () {
			if (this.itemsInCart > 0) this.itemsInCart -= 1;
			else this.itemsInCart = 0;
		},
		updateProduct: function (variantImage) {
			this.image = variantImage;
		}
	}
})
