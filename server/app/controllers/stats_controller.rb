class StatsController < ApplicationController
    before_action :authenticate_user!

    def index
      p current_user.id
      p current_user.stat
      render :json => {
        "user info"=>current_user.id,
        "stat"=>current_user.stat
    }
    end

    def new
        render :json => {
        "user info"=>current_user.id,
        "stat"=>current_user.stat
    }
    end

    def create
        current_user.stat.create(height: params.height, weight:params.weight, target_weight: params.target_weight, age: params.age, gender: params.gender, activity_level: params.activity_level)
    end

    def show
        render :json => {"stat"=>current_user.stat}
    end

    def edit
        render :json => {"stat"=>current_user.stat}
    end

    def update
        render :json => {"stat"=>current_user.stat}

        if stat.update(stat_params)
            redirect_to @stat
        else
            render 'edit'
    end

    def destroy
        render :json => {"stat"=>current_user.stat}
        stat.destroy

        redirect_to stat_path
    end

  private

    def stat_params
      params.require(:stat).permit(:name, :stat_ids => [])
    end

end