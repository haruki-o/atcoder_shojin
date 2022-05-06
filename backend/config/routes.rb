Rails.application.routes.draw do
    get '/contests', to: 'contests#index'
    post '/contests', to: 'contests#create'
    patch '/contests', to: 'contests#update'
    get '/apis', to: 'apis#index'
    # get '/contest_page/:contest_name/:time', to: 'histories#index'
    post '/history', to: 'histories#create'
end
