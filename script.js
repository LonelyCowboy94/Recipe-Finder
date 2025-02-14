const input = document.getElementById("ingredients");
const findBtn = document.getElementById("findBtn");
const resultsDiv = document.getElementById("results");
const heading = document.getElementById('heading');

const apiKey = 'c7581142a4f74e9e9706464bdc5f37da';
const apiUrl = 'https://api.spoonacular.com/recipes/findByIngredients';

function displayRecipes(data) {
    resultsDiv.innerHTML = "";  

    data.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const title = document.createElement('h3');
        title.textContent = recipe.title;
  
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title;
 
        recipeDiv.addEventListener('click', function() {
            window.open(`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`, "_blank");
        });

        recipeDiv.appendChild(title);
        recipeDiv.appendChild(img);

        resultsDiv.appendChild(recipeDiv);
    });
}

function searchRecipes() {
    const ingredients = input.value.trim();
    
    if (ingredients === "") {
        heading.innerHTML = "Please enter some ingredients or recipe";
        resultsDiv.innerHTML = "";
        // alert("Please enter some ingredients");
    } else {
        console.log("Searching for recipes with ingredients:", ingredients);
        heading.innerHTML = "Here are a few recipes"
        fetch(`${apiUrl}?ingredients=${ingredients}&apiKey=${apiKey}&number=30`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log("Found recipes:", data);
                    displayRecipes(data);
                } else {
                    alert("No recipes found with the given ingredients");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert("There was an error fetching recipes. Please try again.");
            });
    }
}

findBtn.addEventListener('click', searchRecipes);

input.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        searchRecipes();
    }
});

input.addEventListener('input', function() {
    if (input.value.trim() === "") {
        resultsDiv.innerHTML = "";
        heading.innerText = "Recipe Finder"
    }
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none"; 
    }
};

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
