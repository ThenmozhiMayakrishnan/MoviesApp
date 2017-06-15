class UsersController < ApplicationController
	def login
		user = User.includes(:carts).where(email: params[:email]).where(password: params[:password]).first
		if user.nil?
			if User.where(email: params[:email]).count > 0
				render :json => {message: "Password is wrong",status: 400 }
			else
				render :json => {message: "Not registered yet",status: 400 }
			end
		else
			render :json => {message: "success", username: user.name, email: user.email, id: user.id, cartQuantity: user.carts.length}
		end
	end
	def signin
		@signin = true
	end
	def register
		@signin = false
		render 'signin'
	end
	def registeruser
	  	user = User.new(user_params)
	  	if user.save
	  		render :json => {message: "success", username: user.name, email: user.email, id: user.id, cartQuantity: 0}
	  	else
	  		render :json => {message: "Error in registering",status: 500 }
	  	end
	end
	private
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end
end
