class CartsController < ApplicationController
	def addtocart
		cart = Cart.where(user: params[:user]).where(movie: params[:movie]).first
		if cart.nil?
			savetocart
		else
			updatecart(cart)
		end
	end
	def showcart
		cartItems = []
		@items = Cart.getCartByUser(params[:user], true)
		@items.each {|item|
			movie = item.movie
			cartItem = {
				id: item.id,
				movie_name: movie.name,
				quantity: item.quantity,
				user_id: item.user_id,
				movie_id: movie.id
			}
			cartItems << cartItem
		}
		@cartItems = cartItems
	end
	def updatecartquantity
		if Cart.updateQuantity(params[:id], params[:quantity])
			render :json => {message: "Quantity updated successfully"}
		else
			render :json => {message: "Error while updating quantity",status: 400 }
		end
	end
	def deleteitem
		if Cart.deleteById(params[:id])
			render :json => {message: "Movie removed successfully"}
		else
			render :json => {message: "Error while removing movie",status: 400 }
		end
	end

	private
	def savetocart
    	quantity = 1
    	user = User.finduser(params[:user])
    	movie = Movie.findMovieById(params[:movie])
    	cart = Cart.new({user: user, movie: movie, quantity: quantity})
    	if cart.save
    		render :json => {message: "Added successfully"}
    	else
    		render :json => {message: "Error while adding to cart",status: 400 }
    	end
    end
    def updatecart(cart)
    	cart[:quantity] += 1;
    	if cart.save
    		render :json => {message: "Quantity increased successfully"}
    	else
    		render :json => {message: "Error while increasing quantity",status: 400 }
    	end
    end
end
