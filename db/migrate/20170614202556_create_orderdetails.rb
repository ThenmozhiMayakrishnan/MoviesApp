class CreateOrderdetails < ActiveRecord::Migration[5.1]
  def change
    create_table :orderdetails do |t|
      t.references :order, foreign_key: true
      t.references :movie, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
