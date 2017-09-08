# == Schema Information
#
# Table name: categories
#
#  id                :integer          not null, primary key
#  title             :string(140)      not null
#  is_complete       :boolean
#  is_favorite       :boolean
#  expire_date       :datetime
#  user_id           :integer          not null
#  category_id       :integer

class Task < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
end
