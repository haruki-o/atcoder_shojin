Rails.application.routes.draw do
    get '/contests', to: 'contests#index'
    post '/contests', to: 'contests#create'
    patch '/contests', to: 'contests#update'
    
    get '/apis', to: 'apis#index'
    
    get '/contest_page/user/:contest_name/:time', to: 'users#index'
    get '/users/history/:contest_name/:user_name', to: 'users#all'
    post '/contest_page/:contest_name/:time/:user_name', to: 'users#create'
    patch '/contest_page/user/update', to: 'users#update'

    get '/contest_page/:contest_name/:time', to: 'histories#index'
    get '/history/:contest_name', to: 'histories#find'
    post '/history', to: 'histories#create'
end
