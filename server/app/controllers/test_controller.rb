class TestController < ApplicationController
    before_action :authenticate_user!


    def index
      p session[:user_id]
      render :json => {"hello"=>"world"}
    end
  
  end