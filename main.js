const app = new Vue({
	// connects to div in html with id app
	el: "#app",
	// variables that you want access to in the html
	data: {
		brand: "Vue Mastery",
		product: "Socks",
		selectedVariant: 0,
		details: [
			"80% cotton",
			"20% polyester",
			"Gender-neutral"
		],
		variants: [
			{
				variantId: 2234,
				variantColor: "green",
				variantImage: "./assets/vmSocks-green.jpg",
				variantQuantity: 3,
				variantItemsInCart: 0,
				variantOnSale: true
			},
			{
				variantId: 2235,
				variantColor: "blue",
				variantImage: "./assets/vmSocks-blue.jpg",
				variantQuantity: 15,
				variantItemsInCart: 0,
				variantOnSale: false
			}
		],
		sizes: [
			"S",
			"M",
			"L"
		]
	},
	methods: {
		addToCart: function () {
			if (this.variants[this.selectedVariant].variantQuantity > 0) {
				this.variants[this.selectedVariant].variantItemsInCart += 1
				this.variants[this.selectedVariant].variantQuantity -= 1
			}
		},
		removeFromCart: function () {
			if (this.variants[this.selectedVariant].variantItemsInCart > 0) {
				this.variants[this.selectedVariant].variantItemsInCart -= 1
				this.variants[this.selectedVariant].variantQuantity += 1
			}
		},
		updateProduct: function (index) {
			this.selectedVariant = index;
		}
	},
	computed: {
		title() {
			return this.brand + " " + this.product
		},
		onSale() {
			return this.variants[this.selectedVariant].variantOnSale
		},
		inventory() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		image() {
			return this.variants[this.selectedVariant].variantImage
		},
		itemsInCart() {
			return this.variants[this.selectedVariant].variantItemsInCart
		},
		saleMessage() {
			return this.brand + " " + this.product + "are on sale!"
		}
	}
})
