var AddReview = React.createClass({
	getInitialState() {
		var initialState = {
			movie: this.props.movie,
			review: {
				reviewer: '',
				review: '',
				rating: '',
			}
		}
		initialState.movie.reviews = this.props.reviews;
		return initialState;
	},
	addComment() {
		if(!this.state.review.reviewer.length) {
			alert("Reviewer name cannot be empty");
			return;
		} else if(!this.state.review.review.length){
			alert("Review cannot be empty");
			return;
		} else if(this.state.review.rating === ''){
			alert("Rating cannot be empty");
			return;
		}
		$.ajax({
			url: window.location.pathname + '/reviews', 
			type: 'POST', 
			data: {
				review: this.state.review
			}, 
			success: (response) => {
				var movie = this.state.movie;
				movie.reviews.push(response);
				this.setState({movie:movie});
				var review = {
					reviewer: '',
					review: '',
					rating: '',
				}
				this.setState({review: review});
			},
			error: (error) => {
				alert("Error in adding reviews")
			}
		});
	},
	inputHandler(event) {
		event.preventDefault();
		var review = this.state.review;
		review[event.target.name] = event.target.value;
		this.setState({review: review});
	},
	render () {
		return <div>
				<div>Reviewer</div>
				<input name="reviewer" value={this.state.review.reviewer} id="reviewer" type="text" placeholder="Enter your name" onChange={this.inputHandler}/>
				<div>Review</div>
				<textarea value={this.state.review.review} name="review" onChange={this.inputHandler}></textarea>
				<div>Rating</div>
				<input value={this.state.review.rating} name="rating" type="number" max="5" min="0" onChange={this.inputHandler}/>
				<button onClick={this.addComment}>Add Review</button>
				<h3>Reviews:</h3>
				<ReviewsTable reviews={this.state.movie.reviews}/>
		</div>
	}
});