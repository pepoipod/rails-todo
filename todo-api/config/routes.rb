Rails.application.routes.draw do
  scope '/api/v1' do
    post 'user_token' => 'user_token#create'

    resources :users, except: [:index]
    resources :tasks
    resources :categories
  end
end
