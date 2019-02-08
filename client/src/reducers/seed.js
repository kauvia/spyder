const store = {
    user: {
        username: "jon@gmail.com",
        height: 200.2,              //cm
        weight: 99.1,               //kg
        target_weight: 22,          
        age: 99,                    //yrs
        gender: "male",
        activity_level: "awesome",   // pls change this...
        user_id: 22
    },
    user_log: [
        {
            date: 29932898493703,
            food_log: [
                {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
                {name: "Bee Hoon", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
                {name: "Fried Rice", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2}
            ],
            excercises: [
                {name: "jog", reps: 1, duration: 23, calories_burnt: 393.0}
            ]
        },
        {
            date: 39932898493703,
            food_log: [
                {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
                {name: "Bee Hoon", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
                {name: "Fried Rice", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2}
            ],
            excercises: [
                {name: "jog", reps: 1, duration: 23, calories_burnt: 393.0}
            ]
        },
        {
            date: 49932898493703,
            food_log: [
                {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
                {name: "Bee Hoon", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
                {name: "Fried Rice", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2}
            ],
            excercises: [
                {name: "jog", reps: 1, duration: 23, calories_burnt: 393.0}
            ]
        },
    ],
    food_exercise_models: {
        food: [
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2}
        ],
        exercise: [
            {name: "jog", reps: false, calories_burnt_perunit: 393.0},
            {name: "pull ups", reps: true, calories_burnt_perunit: 787.0},
            {name: "crunches", reps: true, calories_burnt_perunit: 888.0},
            {name: "push ups", reps: true, calories_burnt_perunit: 445.0},
            {name: "extreme ironing", reps: true, calories_burnt_perunit: 889.0},
            {name: "deadlift", reps: true, calories_burnt_perunit: 56.0},
            {name: "chess", reps: false, calories_burnt_perunit: 866.0},
            {name: "golf", reps: false, calories_burnt_perunit: 223.0},
            {name: "e sports", reps: false, calories_burnt_perunit: 112.0},
            {name: "tennis", reps: false, calories_burnt_perunit: 344.0},
            {name: "rows", reps: true, calories_burnt_perunit: 211.0}
        ]
    }
}
       
export default store