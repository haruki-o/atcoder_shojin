Rails.application.routes.draw do
  resources :contests
  get 'contests', to: 'contest#index'
  post 'contests', to: 'contest#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :apis
  get 'apis', to: 'api#index'
  
end
