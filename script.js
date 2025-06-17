// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Recipe Database
const recipes = [
    {
        id: 1,
        name: "Avocado Toast with Egg",
        time: 5,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "1 slice whole grain bread",
            "1/2 ripe avocado",
            "1 egg",
            "1 tsp lemon juice",
            "Pinch of red pepper flakes",
            "Salt and pepper to taste"
        ],
        procedure: [
            "Toast the bread until golden and crisp",
            "Meanwhile, mash the avocado with lemon juice, salt, and pepper",
            "Fry or poach the egg to your liking",
            "Spread the mashed avocado on toast, top with the egg",
            "Sprinkle with red pepper flakes and enjoy!"
        ]
    },
    {
        id: 2,
        name: "Greek Yogurt Parfait",
        time: 3,
        image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "1 cup Greek yogurt",
            "1/2 cup granola",
            "1/2 cup mixed berries (fresh or frozen)",
            "1 tbsp honey",
            "1 tbsp chia seeds (optional)"
        ],
        procedure: [
            "In a bowl or glass, layer half the yogurt",
            "Add a layer of granola and berries",
            "Repeat with remaining yogurt and toppings",
            "Drizzle with honey and sprinkle chia seeds",
            "Enjoy immediately or refrigerate for up to 2 hours"
        ]
    },
    {
        id: 3,
        name: "Microwave Omelette",
        time: 5,
        image: "https://www.kimscravings.com/wp-content/uploads/2016/07/egg-white-omelet-09.jpg",
        ingredients: [
            "2 eggs",
            "2 tbsp milk",
            "1/4 cup shredded cheese",
            "1/4 cup diced vegetables (bell pepper, onion, spinach)",
            "Salt and pepper to taste"
        ],
        procedure: [
            "Whisk eggs and milk in a microwave-safe bowl",
            "Add vegetables, cheese, and seasonings",
            "Microwave on high for 1 minute, stir",
            "Microwave for another 1-2 minutes until set",
            "Let stand 1 minute before serving"
        ]
    },
    {
        id: 4,
        name: "15-Minute Stir Fry",
        time: 15,
        image: "https://thecuriousplate.com/wp-content/uploads/2021/09/Easy-Chicken-Corn-Stir-Fry-www.thecuriousplate.com-1-1024x1536.jpg",
        ingredients: [
            "1 cup pre-cut stir-fry vegetables",
            "1 chicken breast, sliced thin",
            "2 tbsp stir-fry sauce",
            "1 cup cooked rice",
            "1 tbsp oil",
            "1 clove garlic, minced"
        ],
        procedure: [
            "Heat oil in a pan over high heat",
            "Add chicken and cook until no longer pink (5-6 mins)",
            "Add garlic and vegetables, cook 3-4 minutes",
            "Stir in sauce and cook 1 more minute",
            "Serve over rice"
        ]
    },
    {
        id: 5,
        name: "30-Minute Sheet Pan Dinner",
        time: 30,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "2 chicken thighs",
            "1 cup baby potatoes, halved",
            "1 cup broccoli florets",
            "2 tbsp olive oil",
            "1 tsp garlic powder",
            "1 tsp paprika",
            "Salt and pepper to taste"
        ],
        procedure: [
            "Preheat oven to 400°F (200°C)",
            "Toss potatoes with 1 tbsp oil and seasonings, roast for 15 mins",
            "Add chicken and broccoli with remaining oil",
            "Roast for another 15 minutes until chicken is cooked",
            "Serve immediately"
        ]
    }
];

// Time Slider Functionality
const timeSlider = document.getElementById('timeSlider');
const selectedTime = document.getElementById('selectedTime');
const generateBtn = document.getElementById('generateRecipes');
const recipeDisplay = document.getElementById('recipeDisplay');

timeSlider.addEventListener('input', function() {
    selectedTime.textContent = this.value;
});

// Generate Recipes Based on Selected Time
generateBtn.addEventListener('click', function() {
    const selectedTime = parseInt(timeSlider.value);
    const matchingRecipes = recipes.filter(recipe => recipe.time <= selectedTime);
    
    if (matchingRecipes.length === 0) {
        recipeDisplay.innerHTML = `
            <div class="placeholder">
                <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="No recipes found">
                <h3>No recipes found for ${selectedTime} minutes</h3>
                <p>Try increasing your time budget or check our meal plans for more options</p>
            </div>
        `;
        return;
    }
    
    recipeDisplay.innerHTML = matchingRecipes.map(recipe => `
        <div class="recipe-card">
            <div class="recipe-image" style="background-image: url('${recipe.image}')">
                <span class="time-badge">${recipe.time} mins</span>
            </div>
            <div class="recipe-details">
                <h3>${recipe.name}</h3>
                
                <div class="ingredients">
                    <h4><i class="fas fa-shopping-basket"></i> Ingredients</h4>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="procedure">
                    <h4><i class="fas fa-list-ol"></i> Instructions</h4>
                    <ol class="procedure-list">
                        ${recipe.procedure.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `).join('');
    
    // Animate recipe cards
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('show');
        }, 100);
    });
});

// Initialize with some recipes
window.addEventListener('DOMContentLoaded', () => {
    timeSlider.value = 15;
    selectedTime.textContent = 15;
    generateBtn.click();
});function generateShoppingList(planId) {
    const plan = mealPlans[planId];
    const allIngredients = [];
    
    plan.days.forEach(day => {
        day.meals.forEach(meal => {
            meal.ingredients.forEach(ing => {
                if (!allIngredients.includes(ing)) {
                    allIngredients.push(ing);
                }
            });
        });
    });
    
    return allIngredients;
}
