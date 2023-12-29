const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", recipeApp);

function recipeApp() {

  const userInput = document.getElementById("user-input").value;
  result.innerHTML = `<h3 class="input-error">Loading...</h3>`
  if (userInput.length == 0) {
    result.innerHTML = `<h3 class="input-error">Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInput)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let count = 0;
        let ingredients = [];

        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal["strMeasure" + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `<img src="${myMeal.strMealThumb}" />
                        <div class="details">
                            <h2>${myMeal.strMeal}</h2>
                            <h3>${myMeal.strArea}</h3>
                        </div>
                        <div id="ingredient-content">
                            <div id="recipe">
                            <button id="hide-recipe"><i class="ri-close-line"></i></button>
                            <pre id="instructions"> ${myMeal.strInstructions}</pre>
                            </div>
                        </div>
                        <button id="show-recipe">View Recipe</button>`;

        let ingredientContent = document.getElementById("ingredient-content");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientContent.appendChild(parent);
        });
        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3 class="input-error">No Records Found</h3>`;
      });
  }
}