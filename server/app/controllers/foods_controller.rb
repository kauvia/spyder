class FoodsController < ApplicationController
    before_action :authenticate_user!
    respond_to :json


    def index

      render :json => {
        'food' => current_user.food.order(created_at: :desc)
    }
    end

    def new
        render :json => {
          "user info"=>current_user.id,
          "food"=>current_user.food
        }
    end

    def create

       item=current_user.food.create(name: params[:food][:name], calories: params[:food][:calories], carbs: params[:food][:carbs], proteins: params[:food][:proteins], fats: params[:food][:fats])
       item.update_attribute :created_at, params[:date]
    end

    def update
        if food.update(food_params)
            redirect_to @food
        else
            render 'edit'
        end

        render :json => {"food"=>current_user.food}
    end

    def destroy
        current_user.food.destroy(params[:id])

    end

  private

    def food_params
      params.require(:food).permit(:name, :calories, :carbs, :proteins, :fats, :food_ids => [])
    end

end