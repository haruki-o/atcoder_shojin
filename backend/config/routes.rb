Rails.application.routes.draw do
  resources :contests
  get 'contests', to: 'contest#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
