class MoviesController < ApplicationController
	def index
		if params["searchTerm"]
			searchTerm = params["searchTerm"]
			movies = {data: Movie.where("name like ?", "%#{searchTerm}%").select("id, name")}
			render :json => movies
		else
			@movies = Movie.all.select("id, name")
		end
	end
	def show
		@movie = Movie.includes(:reviews).find(params[:id])
	end
end