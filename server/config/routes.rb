Rails.application.routes.draw do
  devise_for  :users,
              controllers: {
                sessions: 'sessions',
                registrations: 'registrations'
              }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/users/validate' => 'users#validate'

  get '/allowance' => 'allowance#index'

  get '/foods' => 'foods#index', as: 'foods'
  post '/foods' => 'foods#create'
  delete '/foods' => 'foods#destroy'


  get '/exercises' => 'exercises#index', as: 'exercises'
  post '/exercises' => 'exercises#create'
  delete '/exercises' => 'exercises#destroy'



  get '/stats' => 'stats#index', as: 'stats'
  get '/stats/new' => 'stats#new', as: 'new_stat'
  post '/stats' => 'stats#create'

  patch '/stats/:id' => 'stats#update'
  delete '/stats/:id' => 'stats#destroy'

  get '/test' => 'test#index'

end
