class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :director
      t.string :actors
      t.integer :year
      t.string :poster
      t.string :url
      t.string :genre
      t.integer :famousness

      t.timestamps
    end
  end
end
