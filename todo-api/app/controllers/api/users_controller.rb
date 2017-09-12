class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: [:show, :update, :destroy]
  before_action :set_user, only: [:show, :update, :destroy]

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # GET /users/:id
  def show
    render json: @user
  end

  # PATCH /users/:id
  def update
    if @user.update(user_params)
      render json: @user, status: :ok, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :profile, :password, :password_confirm)
  end
end

