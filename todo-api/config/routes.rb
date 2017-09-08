Rails.application.routes.draw do
  scope '/api' do
    resources :users, except: [:index]
    resources :tasks
    resources :categories
  end
end
