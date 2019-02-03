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
        current_user.food.create(name: params.name, calories: params.calories, carbs: params.carbs, proteins: params.proteins, fats: params.fats)
        # :defaults => { :format => 'json' }
    end

    def update
        if food.update(food_params)
            redirect_to @food
        else
            render 'edit'

        render :json => {"food"=>current_user.food}
    end

    def destroy
        current_user.food.destroy

        redirect_to food_path
    end

  private

    def food_params
      params.require(:food).permit(:name, :calories, :carbs, :proteins, :fats, :food_ids => [])
    end

end