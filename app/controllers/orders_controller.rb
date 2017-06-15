class OrdersController < ApplicationController
	def placeorder
		@user = User.finduser(params[:user])
		@order = Order.new({user: @user, status:"Placed", cost: params["cost"]})
		if @order.save
			createOrderDetails
		else
			render :json => {message: "Error while placing order",status: 400 }
		end
	end

	private
	def createOrderDetails
		params[:movies].each do |key, movie|
			orderDetail = Orderdetail.new({movie: Movie.findMovieById(movie[:movie_id]), order:@order, quantity:movie[:quantity]})
			orderDetail.save
		end
		Cart.deleteByUser(params[:user]);
		UserMailer.order(params,@user,@order).deliver_now
		render :json => {message: "Order placed successfully"}
	end
end
