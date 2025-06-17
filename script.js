// Enhanced meal database with detailed cooking instructions
const meals = {
    quick: [
        { 
            name: "Avocado Toast", 
            ingredients: [
                "2 slices whole grain bread",
                "1 ripe avocado",
                "1/2 lemon (juiced)",
                "Salt and pepper to taste",
                "Red pepper flakes (optional)",
                "1 tbsp olive oil"
            ],
            time: 5,
            image: "quickbites-simple\images\avocado-toast.jpg",
            instructions: [
                "Toast the bread until golden and crisp",
                "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl",
                "Mash the avocado with lemon juice, salt, and pepper",
                "Spread the avocado mixture evenly on the toast",
                "Drizzle with olive oil and sprinkle with red pepper flakes if desired",
                "Serve immediately"
            ]
        },
        { 
            name: "Microwave Scrambled Eggs", 
            ingredients: [
                "2 large eggs",
                "1 tbsp milk or water",
                "1 tsp butter",
                "Salt and pepper to taste",
                "Chopped chives or parsley for garnish"
            ],
            time: 7,
            image: "quickbites-simple\images\scrambled-eggs.jpeg",
            instructions: [
                "Coat a microwave-safe bowl with butter",
                "In the bowl, whisk together eggs, milk, salt, and pepper",
                "Microwave on high for 45 seconds, then stir",
                "Continue microwaving in 15-second intervals, stirring between each, until eggs are softly set (about 2 minutes total)",
                "Let stand for 1 minute before serving",
                "Garnish with fresh herbs if desired"
            ]
        }
    ],
    medium: [
        { 
            name: "Vegetable Stir Fry", 
            ingredients: [
                "1 cup mixed bell peppers (sliced)",
                "1 cup broccoli florets",
                "1 carrot (julienned)",
                "2 cloves garlic (minced)",
                "1 tbsp ginger (grated)",
                "2 tbsp soy sauce",
                "1 tbsp sesame oil",
                "1 tbsp vegetable oil",
                "1 tsp cornstarch (optional)",
                "Cooked rice for serving"
            ],
            time: 15,
            image: "quickbites-simple\images\stir-fry.jpeg",
            instructions: [
                "Heat vegetable oil in a wok or large skillet over high heat",
                "Add garlic and ginger, stir for 15 seconds until fragrant",
                "Add carrots and stir-fry for 1 minute",
                "Add broccoli and bell peppers, stir-fry for 2-3 minutes until crisp-tender",
                "In a small bowl, mix soy sauce with sesame oil and cornstarch (if using)",
                "Pour sauce over vegetables and toss to coat",
                "Cook for 1 more minute until sauce thickens slightly",
                "Serve immediately over cooked rice"
            ]
        },
        { 
            name: "Pasta Aglio e Olio", 
            ingredients: [
                "8 oz spaghetti or linguine",
                "4 cloves garlic (thinly sliced)",
                "1/2 cup extra virgin olive oil",
                "1 tsp red pepper flakes",
                "1/4 cup fresh parsley (chopped)",
                "Salt to taste",
                "1/2 cup pasta water",
                "Grated Parmesan cheese (optional)"
            ],
            time: 20,
            image: "quickbites-simple\images\pasta.jpg",
            instructions: [
                "Bring a large pot of salted water to boil",
                "Cook pasta according to package directions (reserve 1/2 cup pasta water before draining)",
                "While pasta cooks, heat olive oil in a large pan over medium heat",
                "Add garlic slices and cook until golden (about 2 minutes), stirring frequently",
                "Add red pepper flakes and cook for 30 seconds more",
                "Add drained pasta to the pan along with 1/4 cup pasta water",
                "Toss to coat, adding more pasta water as needed to create a light sauce",
                "Stir in chopped parsley and season with salt",
                "Serve with grated Parmesan if desired"
            ]
        }
    ]
};

// DOM elements
const timeSlider = document.getElementById('timeSlider');
const timeValue = document.getElementById('timeValue');
const generateBtn = document.getElementById('generateBtn');
const mealName = document.getElementById('mealName');
const mealImage = document.getElementById('mealImage');
const mealTime = document.getElementById('mealTime');
const ingredientsList = document.getElementById('ingredientsList');
const instructionsList = document.getElementById('instructionsList');

// Generate meal based on selected time
function generateMeal() {
    const selectedTime = parseInt(timeSlider.value);
    
    // Filter meals that match the selected time category
    let mealPool;
    if (selectedTime <= 10) {
        mealPool = meals.quick.filter(meal => meal.time <= selectedTime);
        // If no quick meals match, include the fastest medium meals
        if (mealPool.length === 0) {
            mealPool = [...meals.quick, ...meals.medium.filter(meal => meal.time <= 15)];
        }
    } else {
        mealPool = [...meals.quick, ...meals.medium.filter(meal => meal.time <= selectedTime)];
    }
    
    // If still no meals, use all meals
    if (mealPool.length === 0) mealPool = [...meals.quick, ...meals.medium];
    
    // Select random meal
    const randomMeal = mealPool[Math.floor(Math.random() * mealPool.length)];
    
    // Update display
    displayMeal(randomMeal);
}

// Display the selected meal
function displayMeal(meal) {
    mealName.textContent = meal.name;
    mealImage.src = meal.image;
    mealTime.textContent = `${meal.time} min`;
    
    // Update ingredients
    ingredientsList.innerHTML = '';
    meal.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Update instructions with step numbers
    instructionsList.innerHTML = '';
    meal.instructions.forEach((step, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="step-number">${index + 1}.</span> ${step}`;
        instructionsList.appendChild(li);
    });
}

// Initialize time slider
timeSlider.addEventListener('input', function() {
    timeValue.textContent = this.value;
    generateMeal();
});

// Generate first meal on load
window.addEventListener('DOMContentLoaded', generateMeal);

// Generate new meal on button click
generateBtn.addEventListener('click', generateMeal);