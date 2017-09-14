#
#                        Prefix Verb   URI Pattern                                 Controller#Action
#
#                api_user_token POST   /api/v1/user_token(.:format)                api/user_token#create
#                api_user_tasks GET    /api/v1/users/:user_id/tasks(.:format)      api/tasks#index
#                               POST   /api/v1/users/:user_id/tasks(.:format)      api/tasks#create
#                      api_task GET    /api/v1/tasks/:id(.:format)                 api/tasks#show
#                               PATCH  /api/v1/tasks/:id(.:format)                 api/tasks#update
#                               PUT    /api/v1/tasks/:id(.:format)                 api/tasks#update
#                               DELETE /api/v1/tasks/:id(.:format)                 api/tasks#destroy
#           api_user_categories GET    /api/v1/users/:user_id/categories(.:format) api/categories#index
#                               POST   /api/v1/users/:user_id/categories(.:format) api/categories#create
#                  api_category GET    /api/v1/categories/:id(.:format)            api/categories#show
#                               PATCH  /api/v1/categories/:id(.:format)            api/categories#update
#                               PUT    /api/v1/categories/:id(.:format)            api/categories#update
#                               DELETE /api/v1/categories/:id(.:format)            api/categories#destroy
#                     api_users POST   /api/v1/users(.:format)                     api/users#create
#                      api_user GET    /api/v1/users/:id(.:format)                 api/users#show
#                               PATCH  /api/v1/users/:id(.:format)                 api/users#update
#                                       PUT    /api/v1/users/:id(.:format)                 api/users#update
#                               DELETE /api/v1/users/:id(.:format)                 api/users#destroy
#
#

Rails.application.routes.draw do
  namespace :api do
    scope '/v1' do
      post 'user_token' => 'user_token#create'

      resources :users, except: [:index], shallow: true do
        resources :tasks
        resources :categories
      end
    end
  end
end
