var ReviewsTable = React.createClass({
	getInitialState() {
		return {
			reviews: this.props.reviews || []
		}
	},
	frameTable() {
		var rows = this.state.reviews.map(function(review, index) {
			return (
				<tr key={index}>
					<td>{review.reviewer}</td>
					<td>{review.review}</td>
					<td>{review.rating}</td>
				</tr>
			);
		});
		return (
			<table>
				<thead>
					<tr>
						<td>Reviewer</td>
						<td>Review</td>
						<td>Rating</td>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	},
	render() { 
		var viewData;
		return this.state.reviews.length ? this.frameTable() : (<div>No reviews made yet. Be the first one to review!!!</div>) 
	}
});