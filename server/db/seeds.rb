# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Food.destroy_all
Exercise.destroy_all
Stat.destroy_all

foods = ["Hokkien Mee","Spicy Tomato Tuna Salad", "Spaghetti & Meatballs", "Caviar", "Canadian Pizza","Grape Drink", "Pina Coladas", "Bananas", "Beer", "Chewing Gum"]
exerciseReps = ["Pull up","Sit up", "Crunches", "Deadlift", "Rows" ]
exerciseDur = ["Golf","Tennis","E-Sports","Chess","Extreme Ironing"]
activities = ["low","medium","high"]

User.create!([
    {username: "a", password: "password", password_confirmation: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
    {username: "abc", password: "password", password_confirmation: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
    {username: "123", password: "password", password_confirmation: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil}
  ])

  1000.times do 
    fd = foods[rand(10)]
    fdDB = Food.create(name:fd,calories:rand(500),carbs:rand(500),proteins:rand(500),fats:rand(500),:user_id=>1)
    fdDB.update_attribute :created_at, (rand*365).days.ago
    exr = exerciseReps[rand(5)]
    exd = exerciseDur[rand(5)]

    coin = rand(10)
    if coin < 6 
      exrDB = Exercise.create(name:exr, reps:rand(100), calories_burnt:rand(500),:user_id=>1)
      exrDB.update_attribute :created_at, (rand*365).days.ago
    else
      exdDB = Exercise.create(name:exd, duration:rand(200), calories_burnt:rand(500),:user_id=>1)
      exdDB.update_attribute :created_at, (rand*365).days.ago
    end
    if coin < 1 
      stDB = Stat.create(height:111, weight:50+rand(20), target_weight:50+rand(20), age:36 ,gender:"female", activity_level:activities[rand(3)], birthday:1994-01-01, :user_id=>1)
      stDB.update_attribute :created_at, (rand*365).days.ago
    end
  end  

  Food.create(name:"bananas",calories:500,carbs:20,proteins:20,fats:20,:user_id=>2)
  Food.create(name:"apples",calories:500,carbs:20,proteins:20,fats:20,:user_id=>2)
  Exercise.create(name:"Crunches", reps:10, calories_burnt:510,:user_id=>2)
  Exercise.create(name:"Chess", duration:123, calories_burnt:50,:user_id=>2)
  Stat.create(height:150,weight:55,target_weight:40,age:22,gender:"male",activity_level:"high",:user_id=>2)

  Food.create(name:"steak",calories:500,carbs:20,proteins:20,fats:20,:user_id=>3)
  Food.create(name:"lobster",calories:500,carbs:20,proteins:20,fats:20,:user_id=>3)
  Exercise.create(name:"Ice skating", duration:140, calories_burnt:50,:user_id=>3)
  Stat.create(height:170,weight:55,target_weight:155,age:96,gender:"male",activity_level:"low",:user_id=>3)