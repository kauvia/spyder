const store = {
    user: {
        username: "jon@gmail.com",
        height: 200.2,              //cm
        weight: 99.1,               //kg
        target_weight: 22,          
        age: 99,                    //yrs
        gender: "male",
        activity_level: "awesome"   // pls change this...
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
    food_excercise_models: {
        food: [
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2},
            {name: "Hokkien Mee", calories: 203.2, carbs: 344.3, proteins: 34.2, fats: 233.2}
        ],
        excercise: [
            {name: "jog", reps: 1, duration: 1, calories_burnt_perunit: 393.0}
        ]
    }
}
       
export default store