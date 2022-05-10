Rails.application.routes.draw do
    get '/contests', to: 'contests#index'
    post '/contests', to: 'contests#create'
    patch '/contests', to: 'contests#update'
    
    get '/apis', to: 'apis#index'
    
    get '/contest_page/:contest_name/:time', to: 'users#index'
    post '/contest_page/:contest_name/:time/:user_name', to: 'users#create'

    get '/contest_page/:contest_name/:time', to: 'histories#index'
    get '/history/:contest_name', to: 'histories#find'
    post '/history', to: 'histories#create'
end
