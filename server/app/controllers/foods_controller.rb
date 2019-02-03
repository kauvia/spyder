class FoodsController < ApplicationController
    before_action :authenticate_user!

    def index
      p current_user.id
      p current_user.stat
      render :json => {
        "user info"=>current_user.id,
        "food"=>current_user.food
    }
    end

    def new
        render :json => {
          "user info"=>current_user.id,
          "food"=>current_user.food
        }
    end

    def create
    end

    def edit
    end

    def update
    end

    def destroy
    end

  private

    def food_params
      params.require(:food).permit(:name, :food_ids => [])
    end

end