class AddPriceToMovie < ActiveRecord::Migration[5.1]
  def change
		add_column :movies, :price, :integer
  end
end
