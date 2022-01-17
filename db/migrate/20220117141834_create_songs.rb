class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.integer :year
      t.string :album_cover
      t.string :track
      t.string :genre
      t.integer :famousness

      t.timestamps
    end
  end
end
