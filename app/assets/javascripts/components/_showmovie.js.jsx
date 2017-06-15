var ShowMovie = React.createClass({
	render() {
		var movie = this.props.movie;
		return <div>
			{this.props.cartElement}
			<div><h3>MOVIE</h3></div>
			<div>Name: {movie.name}</div>
			<div>Description: {movie.description}</div>
			</div>
	}
});