var AddToCart = React.createClass({
	getInitialState() {
		return {
			authentication: userDetails.getUser(),
			movie: this.props.movie
		}
	},
	addToCart() {
		if(this.state.authentication) {
			var data = {
				user: this.state.authentication.id,
				movie: this.state.movie.id
			};
			var that = this;
			var successCallback = function(response) {
				/*if(response.status && response.status === 400) {
					alert(response.message);
					return;
				} else {
					alert(response.message);
				}*/
				alert(response.message);
				if(response.message.indexOf('Quantity') === -1) {
					var authentication = JSON.parse(getCookie("authentication"));
					authentication.cartQuantity += 1;
					setUserCookie(authentication, true);
					that.props.updateCartState(authentication.cartQuantity);
				}
			};
			sendRequest("/users/addtocart", 'POST', data, successCallback);
		} else {
			alert("Signin and buy");
			window.location.href = "/users/signin";
		}
	},

	render() {
		return <button onClick={this.addToCart}>Buy</button>
	}
});