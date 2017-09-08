# == Schema Information
#
# Table name: users
#
#  id                :integer          not null, primary key
#  name              :string(20)
#  profile           :string(140)
#  password_digest   :string           not null

class User < ApplicationRecord
  has_many :categories, dependent: :destroy

  has_secure_password
end
