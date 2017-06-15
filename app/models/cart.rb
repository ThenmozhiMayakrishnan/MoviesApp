class Cart < ApplicationRecord
  belongs_to :movie
  belongs_to :user
  def self.getCartByUser(userId, movie=false)
  	if movie
  		Cart.includes(:movie).where(user: userId)
  	else
  		Cart.where(user: userId)
  	end
  end
  def self.updateQuantity(id, quantity)
  	Cart.update(id, quantity: quantity)
  end
  def self.deleteById(id)
  	Cart.delete(id)
  end
  def self.deleteByUser(userId)
    Cart.where(user: userId).delete_all
  end
end
