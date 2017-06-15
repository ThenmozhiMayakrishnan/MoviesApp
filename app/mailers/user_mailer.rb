class UserMailer < ApplicationMailer
	default from: 'kumarthenmozhi@gmail.com'

	def welcome_email(user)
		@user = user
		mail(to: @user.email, subject: 'Order Confirmation')
	end
	def order(params, user, order)
		@user = user
		@order = order
		@movies = params[:movies]
		@cost = params[:cost]
		mail(to: @user.email, subject: 'Order Confirmation')
	end
end
