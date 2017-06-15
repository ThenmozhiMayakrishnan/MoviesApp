class User < ApplicationRecord
	has_many :carts, :dependent => :destroy
	has_many :orders, :dependent => :destroy
	def self.finduser(id)
    	User.find(id)
    end
end