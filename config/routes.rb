Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :movies do
  	resources :reviews
  end
  namespace :users do
  	get 'signin'
  	get 'register'
  	post 'login'
  	post 'registeruser'
  end
  post 'users/addtocart', to: 'carts#addtocart'
  get 'users/:user/cart', to: 'carts#showcart'
  post 'users/:user/cart/edit', to: 'carts#updatecartquantity'
  delete 'users/:user/cart/:id', to: 'carts#deleteitem' 
  put 'users/:user/cart/order', to: 'orders#placeorder'
  root 'movies#index'
end