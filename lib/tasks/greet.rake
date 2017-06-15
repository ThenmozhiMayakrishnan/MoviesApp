namespace :db do
	desc "Populates the movie db"
	task :populate => :environment do
		o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
		movies = [];
		10.times {
			string = (0...10).map { o[rand(o.length)] }.join
			movies << {name: string, price:100}
		}
		Movie.create(movies)
		puts "Created 10 movies"
	end
end