# == Schema Information
#
# Table name: categories
#
#  id                :integer          not null, primary key
#  name              :string(20)       not null
#  user_id           :integer          not null

class Category < ApplicationRecord
  has_many :tasks, dependent: :destroy
end
