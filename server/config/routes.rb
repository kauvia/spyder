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
  get '/foods/new' => 'foods#new', as: 'new_food'
  post '/foods' => 'foods#create'
  delete '/foods' => 'foods#destroy'


  get '/exercises' => 'exercises#index', as: 'exercises'
  get '/exercises/new' => 'exercises#new', as: 'new_exercise'
  post '/exercises' => 'exercises#create'

  patch '/exercises/:id' => 'exercises#update'
  delete '/exercises/:id' => 'exercises#destroy'


  get '/stats' => 'stats#index', as: 'stats'
  get '/stats/new' => 'stats#new', as: 'new_stat'
  post '/stats' => 'stats#create'

  patch '/stats/:id' => 'stats#update'
  delete '/stats/:id' => 'stats#destroy'

  get '/test' => 'test#index'

end
