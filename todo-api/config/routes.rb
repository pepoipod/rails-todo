Rails.application.routes.draw do
  namespace :api do
    scope '/v1' do
      post 'user_token' => 'user_token#create'

      resources :users, except: [:index] , shallow: true do
        resources :tasks
        resources :categories
      end
    end
  end
end
