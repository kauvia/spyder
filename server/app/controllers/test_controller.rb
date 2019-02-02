class TestController < ApplicationController
    before_action :authenticate_user!

  ######################################################
  #
  # FOR ALL CONTROLLERS THAT ACCESS SENSITIVE INFO SUCH AS 
  # SPECIFIC USER REQUESTS (EG: LISTING ALL FOOD/STAT/EXERCISE)
  # MAKE SURE "before_action :authenticate_user!" IS IN THAT CONTROLLER
  # (basically all controllers except login/logout/signup)
  #
  # AFTER THAT, THE CURRENT USER IS ACCESSIBLE WITH "current_user"
  # SO IF U WANT TO RETRIEVE ALL FOOD/STAT/EXERCISE OR ANY OTHER KIND OF
  # INFO RELATED TO THAT USER, JUST USE current_user.food OR ANY OTHER
  # REGULAR ACTIVE-RECORD SEARCH METHODS PERTAINING TO THAT USER 
  #       SEE EXAMPLE BELOW( CAN BE TESTED VIA CLIENT AT LOGIN PAGE<CHECK CONSOLE>)
  #########################################################

    def index
      p current_user.food
      p current_user.stat
      render :json => {"hello"=>"world","exercise"=>current_user.exercise, "food"=>current_user.food}
    end
  
  end