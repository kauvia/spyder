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



User.create!([
    {username: "a", password: "password", password_confirmation: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
    {username: "abc", password: "password", password_confirmation: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil},
    {username: "123", password: "password", password_confirmation: "password", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil}
  ])

  Food.create(name:"Hokkien Mee",calories:500,carbs:20,proteins:20,fats:20,:user_id=>1)
  Food.create(name:"Been Hoon",calories:500,carbs:20,proteins:20,fats:20,:user_id=>1)
  Food.create(name:"Fried Rice",calories:500,carbs:20,proteins:20,fats:20,:user_id=>1)
  Exercise.create(name:"Pull up", reps:10, calories_burnt:50,:user_id=>1)
  Stat.create(height:111,weight:75,target_weight:65,age:36,gender:"female",activity_level:"medium",:user_id=>1)

  Food.create(name:"bananas",calories:500,carbs:20,proteins:20,fats:20,:user_id=>2)
  Food.create(name:"apples",calories:500,carbs:20,proteins:20,fats:20,:user_id=>2)
  Exercise.create(name:"Crunches", reps:10, calories_burnt:510,:user_id=>2)
  Exercise.create(name:"Chess", duration:123, calories_burnt:50,:user_id=>2)
  Stat.create(height:150,weight:55,target_weight:40,age:22,gender:"male",activity_level:"high",:user_id=>2)

  Food.create(name:"steak",calories:500,carbs:20,proteins:20,fats:20,:user_id=>3)
  Food.create(name:"lobster",calories:500,carbs:20,proteins:20,fats:20,:user_id=>3)
  Exercise.create(name:"Ice skating", duration:140, calories_burnt:50,:user_id=>3)
  Stat.create(height:170,weight:55,target_weight:155,age:96,gender:"male",activity_level:"low",:user_id=>3)