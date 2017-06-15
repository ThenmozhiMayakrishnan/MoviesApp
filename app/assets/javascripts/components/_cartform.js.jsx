var CartForm = React.createClass({
	getInitialState() {
		this.oldMovies = JSON.parse(JSON.stringify(this.props.cartItems || []));
		return {
			movies: this.props.cartItems || [],
			totalCost: this.calculate(this.props.cartItems)
		}
	},
	calculate(items) {
		var cost = 0;
		items = items || [];
		items.map(function(item) {
			cost += ((item.price || 100)*item.quantity);
		});
		return cost;
	},
	inputHandler(event) {
		event.preventDefault();
		this.state.movies[parseInt(event.target.name)].quantity = event.target.value;
		this.setState({movies: this.state.movies});
	},
	updateQuantity(event) {
		var that = this;
		var index = parseInt(event.target.id);
		if(this.state.movies[index].quantity == this.oldMovies[index].quantity){
			alert("Change quantity to update");
		} else {
			var data = {
				id: this.state.movies[index].id,
				quantity: this.state.movies[index].quantity
			};
			var successCallback = function(response) {
				if(response.status) {
					alert("Error in updating quantity");
					that.state.movies[index].quantity = that.oldMovies[index].quantity;
					that.setState({movies: this.state.movies})
				} else {
					alert("Quantity updated successfully");
					that.oldMovies[index].quantity = that.state.movies[index].quantity;
					that.setState({totalCost: that.calculate(that.state.movies)});
				}
			};
			sendRequest(window.location.pathname+'/edit', 'POST', data, successCallback);
		}
	},
	deleteCartItem(event) {
		var that = this;
		var index = parseInt($(event.target).attr('name'));
		var successCallback = function(response) {
			if(response.status) {
				alert("Error in removing item from cart");
			} else {
				alert("Item removed successfully");
				that.oldMovies.splice(index, 1);
				that.state.movies.splice(index, 1);
				that.setState({ movies: that.state.movies});
				var authentication = JSON.parse(getCookie("authentication"));
				authentication.cartQuantity -= 1;
				setUserCookie(authentication, true);
			}
		};
		sendRequest(window.location.pathname+'/'+this.state.movies[index].id, 'DELETE', {}, successCallback);
	},
	frameTable() {
		var that = this;
		var rows = this.state.movies.map(function(movie, index) {
			return (
				<tr key={index}>
					<td>{movie.movie_name}</td>
					<td><input name={index} type="number" min="0" value={that.state.movies[index].quantity} onChange={that.inputHandler}/></td>
					<td>{that.state.movies[index].price || 100}</td>
					<td>{that.state.movies[index].quantity * (that.state.movies[index].price || 100)}</td>
					<td>
						<button id={index} onClick={that.updateQuantity}>Update</button>&nbsp;
						<button name={index} onClick={that.deleteCartItem}>Delete</button>
					</td>
				</tr>
			);
		});
		rows.push((
				<tr key="end">
					<td></td>
					<td>Total cost</td>
					<td></td>
					<td>{that.state.totalCost}</td>
					<td></td>
				</tr>
			));
		return (
			<div>
				<h3>CART</h3>
				<table>
					<thead>
						<tr>
							<td>Movie</td>
							<td>Quantity</td>
							<td>Price per unit</td>
							<td>Cost</td>
							<td>Actions</td>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<button onClick={this.placeOrder}>Place order</button>
			</div>
		);
	},
	checkOrder() {
		for(var i = 0; i < this.state.movies.length; i++) {
			if(this.state.movies[i].quantity != this.oldMovies[i].quantity) {
				return i;
			}
		}
		return -1;
	},
	placeOrder() {
		var index = this.checkOrder();
		var that = this;
		if(index !== -1) {
			window.alert('The movie: '+ this.state.movies[index].movie_name+ ' not updated after changing the quantity');
			return;
		}
		var moviesToSend = this.state.movies.map(function(movie) {
			return {
				movie_id: movie.movie_id,
				quantity: movie.quantity,
				movie_name: movie.movie_name
			}
		})
		var data = {
			cost: this.state.totalCost,
			movies: moviesToSend
		};
		var successCallback = function() {
			window.alert('Order placed successfully');
			that.setState({movies: []});
			var authentication = JSON.parse(getCookie("authentication"));
			authentication.cartQuantity = 0;
			setUserCookie(authentication, true);
		};
		sendRequest(window.location.pathname+'/order', 'PUT', data, successCallback);
	},
	browseMovies() {
		window.location.href = "/"
	},
	render() { 
		var viewData;
		return this.state.movies.length ? this.frameTable() : (<div><div>Cart is Empty</div><button onClick={this.browseMovies}>Add movies</button></div>) 
	}
});