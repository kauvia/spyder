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

    def stat_params
      params.require(:stat).permit(:name, :stat_ids => [])
    end

end