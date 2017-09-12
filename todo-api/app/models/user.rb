# == Schema Information
#
# Table name: users
#
#  id                :integer          not null, primary key
#  name              :string(20)       not null, unique
#  profile           :string(140)
#  password_digest   :string           not null

class User < ApplicationRecord
  has_many :categories, dependent: :destroy

  has_secure_password

  validates :name, presence: true, uniqueness: true

  def self.from_token_request request
    name = request.params["auth"] && request.params["auth"]["name"]
    self.find_by name: name
  end
end
