class Api::TasksController < ApplicationController
  before_action :authenticate_user
  before_action :set_task, only: [:show, :update, :destroy]


  # GET /tasks
  def index
    @tasks = Task.all
    render json: @tasks
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    @task.user = User.find(params[:user_id])

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # GET /tasks/:id
  def show
    render json: @task
  end

  # PATCH /tasks/:id
  def update
    if @task.update(task_params)
      render json: @task, status: :ok, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    @task.destroy
  end

  private

  def set_task
    @user = User.find(params[:user_id])
    @task = @user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :is_complete, :is_favorite, :expire_date, :category_id)
  end
end