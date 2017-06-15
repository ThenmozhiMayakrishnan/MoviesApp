class ReviewsController < ApplicationController
	def create
		@movie = Movie.find(params[:movie_id])
	    @review = @movie.reviews.create(review_params)
	    render :json => params["review"]
	end
	private
    def review_params
      params.require(:review).permit(:reviewer, :review, :rating)
    end
end
