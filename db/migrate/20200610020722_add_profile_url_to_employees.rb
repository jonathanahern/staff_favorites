class AddProfileUrlToEmployees < ActiveRecord::Migration[5.2]
  def change
    add_column :employees, :profile_url, :string
  end
end
