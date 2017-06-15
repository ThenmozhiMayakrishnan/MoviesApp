var ListMovies = React.createClass({
	getInitialState() {
		return {
			movies: this.props.movies,
			searchTerm: ''
		}
	},
	getMovies(searchData) {
		$.ajax({ 
			url: '/movies', 
			type: 'GET', 
			data: searchData, 
			success: (response) => {
				if(typeof response === 'object' && response.data) {
					if(response.data.length) {
						this.setState({movies: response.data})
					} else {
						alert('No matches found. clearing the search');
						this.clearSearch();
					}
				} else {
					this.setState({movies: this.props.movies})
				}
			}
		});
	},
	handleKeyUp (event) {
		if(event.which === 13) {
			var searchTerm = event.target.value
			if(!searchTerm.length) {
				alert('Enter the search term');
			} else {
				this.getMovies({searchTerm: searchTerm});
			}
		}
	},
	clearSearch () {
		$('#search')[0].value = '';
		this.getMovies({});
	},
	render() {
		var that = this;
		var movies = this.state.movies.map(function (movie) { 
			return ( 
				<MovieComponent key={movie.id} movie={movie} />
			) 
		}); 
		return(
			<div>
				<input name="searchTerm" type="text"  id="search" placeholder="Enter the search term" onKeyUp={this.handleKeyUp}/>
				<button onClick={this.clearSearch}>Clear Search</button>
				<div> Movies List </div>
				<div> {movies} </div> 
			</div>
		) 
	} 
});

var MovieComponent = React.createClass({
	showDetails(movie) {
		window.location.href= "/movies/"+movie.id;
	},
	render () {
		var movie = this.props.movie;
		return <div key={movie.id} onClick={this.showDetails.bind(this, this.props.movie)}>{movie.name}</div> 
	}
});