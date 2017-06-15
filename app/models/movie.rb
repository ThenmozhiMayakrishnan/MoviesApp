class Movie < ApplicationRecord
	has_many :reviews, :dependent => :destroy
	validates :name, presence: true, length: { minimum: 1 }
	def self.findMovieById(id)
		Movie.find(id)
	end
end