class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :image
      t.string :description

      t.timestamps
    end
    add_index :movies, :name, unique: true
  end
end
