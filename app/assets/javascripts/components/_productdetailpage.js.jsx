var ProductDetailPage = React.createClass({
	getInitialState() {
		return {
			cartQuantity: userDetails.getCart()
		} 
	},
	updateCartState(value) {
		this.setState({cartQuantity: value});
	},
	render() {
		var cartElement = <button id="cartButton" onClick={goToCart}>Cart {this.state.cartQuantity}</button>;
		return <div>
			<ShowMovie movie={this.props.movie} cartElement={cartElement} />
			<AddReview movie={this.props.movie} reviews={this.props.reviews}/>
			<AddToCart movie={this.props.movie} updateCartState={this.updateCartState}/>
		</div>
	}
});