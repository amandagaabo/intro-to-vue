// enable dev tools
Vue.config.devtools = true;

Vue.component("product-review", {
	template: `
		<form class="review-form" @submit.prevent="onSubmit">
			<p v-if="errors.length">
				<b>Please correct the following error(s):</b>
				<ul>
					<li v-for="error in errors">
						{{ error }}
					</li>
				</ul>
			</p>
			<p>
				<label for="name">
					Name:
				</label>
				<input id="name" v-model="name"/>
			</p>

			<p>
				<label for="review">
					Review:
				</label>
				<textarea id="review" v-model="review"/>
			</p>

			<p>
				<label for="rating">Rating:</label>
				<select id="rating" v-model.number="rating">
					<option>5</option>
					<option>4</option>
					<option>3</option>
					<option>2</option>
					<option>1</option>
				</select>
			</p>

			<p>Would you recommend this product?</p>
				<label>
					Yes
					<input
						type="radio"
						value="Yes"
						v-model="recommend"
					/>
				</label>
				<label>
					No
					<input
						type="radio"
						value="No"
						v-model="recommend"
					/>
				</label>

			<p>
				<input type="submit" value="Submit"/>
			</p>
		</form>
	`,
	data () {
		return {
			name: null,
			review: null,
			rating: null,
			recommend: null,
			errors: []
		}
	},
	methods: {
		onSubmit () {
			if (this.name && this.review && this.rating && this.recommend) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
					recommend: this.recommend
				}
				// emit event to send to parent
				this.$emit('review-submitted', productReview)
				this.name = null
				this.review = null
				this.rating = null
				this.recommend = null
			}
			else {
				if (!this.name) this.errors.push("Name is required.")
				if (!this.review) this.errors.push("Review is required.")
				if (!this.rating) this.errors.push("Rating is required.")
				if (!this.recommend) this.errors.push("Recommend is required.")
			}
		}
	}
})

Vue.component("product-details", {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: `
		<ul>
			<li v-for="detail in details">
				{{ detail }}
			</li>
		</ul>
	`
})

Vue.component("product", {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
			<div class="product-image">
				<!-- v-bind is used when you want the attribute (src) to update when data changes -->
				<!-- shorthand for v-bind is just :attribute -->
				<!-- attributes: href, alt, title, class, style, disabled, src, etc -->
				<img v-bind:src="image"/>
			</div>

			<div class="product-info">
				<h1>
					<!-- {{ }} = expression, where you can use Vue data -->
					{{ title }}
				</h1>

				<!-- v-if, v-else-if and v-else are used to conditionally display something -->
				<!-- v-if adds or removes the element from the dom -->
				<!-- use v-show to toggle visibility if the view will be toggled a lot for better perforance -->
				<p v-if="inventory > 10">
					In Stock
				</p>
				<p v-else-if="inventory <= 10 && inventory > 0">
					Almost Gone
				</p>
				<p
					v-else
					:class="{ outOfStock: inventory === 0 }"
				>
					Out of Stock
				</p>

				<p>
					Shipping: {{ shipping }}
				</p>

				<p v-if="onSale">
					{{ saleMessage }}
				</p>

				<product-details
					:details="details"
				/>

				<ul>
					<li v-for="size in sizes">
						{{ size }}
					</li>
				</ul>

				<!-- use key with v-bind when looping and creating elements -->
				<!-- v-on has a short cut: @ -->
				<!-- can call a method with v-on/@ and pass a property to it -->
				<!-- :style uses style binding so you can reference data in the style properties -->
				<!-- can also bind to a styleObject that lives in data instead of listing individual styles -->
				<div
					v-for="variant, index in variants"
					class="color-box"
					:key="variant.variantId"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="updateProduct(index)"
				>
				</div>

				<!-- v-on is used to listen for then handle events -->
				<!-- events: click, mouseover, submit, keyup -->
				<!-- can write expression (itemsInCart += 1) or call a method -->
				<!-- conditionally add a class by using an object where the key is the class name and value is an expression for if it is added -->
				<button
					@click="addToCart"
					:class="{ disabledButton: inventory === 0 }"
					:disabled="inventory === 0"
				>
					Add to Cart
				</button>

				<button @click="removeFromCart">
					Remove from Cart
				</button>
			</div>

			<div>
				<h2>Reviews</h2>
				<p v-if="!reviews.length">There are no reviews yet.</p>

				<ul>
					<li v-for="review in reviews">
						<p> {{ review.name }} </p>
						<p> Rating: {{ review.rating }} </p>
						<p> Recommend: {{ review.recommend }} </p>
						<p> {{ review.review }} </p>
					</li>
				</ul>
			</div>
			<product-review @review-submitted="addReview"></product-review>
		</div>
	`,
	// variables that you want access to in the html
	data () {
		return {
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
					variantOnSale: true
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: "./assets/vmSocks-blue.jpg",
					variantQuantity: 15,
					variantOnSale: false
				}
			],
			sizes: [
				"S",
				"M",
				"L"
			],
			reviews: []
		}
	},
	methods: {
		addToCart: function () {
			// emit event, takes event name and params to pass to method
			this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
		},
		removeFromCart: function () {
			this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId)
		},
		updateProduct: function (index) {
			this.selectedVariant = index;
		},
		addReview: function (productReview) {
			this.reviews.push(productReview)
		}
	},
	computed: {
		title () {
			return this.brand + " " + this.product
		},
		onSale () {
			return this.variants[this.selectedVariant].variantOnSale
		},
		inventory () {
			return this.variants[this.selectedVariant].variantQuantity
		},
		image () {
			return this.variants[this.selectedVariant].variantImage
		},
		saleMessage () {
			return this.brand + " " + this.product + " are on sale!"
		},
		shipping () {
			if (this.premium) return "Free"
			return "$5.99"
		}
	}
})


const app = new Vue({
	// connects to div in html with id app
	el: "#app",
	data: {
		premium: true,
		cart: []
	},
	methods: {
		addItem (id) {
			this.cart.push(id)
		},
		removeItem (id) {
			for(let i = this.cart.length - 1; i >= 0; i--) {
				if (this.cart[i] === id) {
					this.cart.splice(i, 1);
					// only return one so escape after one is removed
					return;
				}
			}
		}
	}
})
