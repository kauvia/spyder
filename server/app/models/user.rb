class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,:jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist
  
  validates :username, uniqueness: true

  has_many :food
  has_many :exercise
  has_many :stat
  
end
