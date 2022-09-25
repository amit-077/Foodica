// Search bar functionality

function getMealName(){
let food = document.getElementById("search").value.trim();
console.log(food);
apiCalled(food)
}
// Press Enter key to search

document.getElementById("search").addEventListener("keypress",function(event){
  if(event.key == "Enter"){
    event.preventDefault();
    document.getElementById("click-btn").click();
  }
})

// API calling

function apiCalled(food){
let html = ""
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i="+food+"").then(function(response) {
  return response.json()
}).then(function(result) {

// Creation of multiple cards

  if(result.meals){
  for (let i=0;i<result.meals.length;i++) {
    html += `<div class="col-lg-4 col-md-6 col-sm-6 card2">
      <div class="card card-single" style="width: 18rem;" data-id = ${result.meals[i].idMeal}>
        <img src="${result.meals[i].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="food-name">${result.meals[i].strMeal}</h5>
          <p class="food-description">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary meal-link" id="recepie-link">Get Recepie</a>
        </div>
      </div>
    </div>`
  }
  document.getElementById("meal-card").innerHTML = html;
      console.log(result.meals[1]);
}else{
  html = `<p class = "no-meals">0 meals found</p>`
  document.getElementById("meal-card").innerHTML = html;
}})
}

document.getElementById("meal-card").addEventListener("click",function(event){
  event.preventDefault();
  if(event.target.classList.contains("meal-link")){
    let mealItem = event.target.parentElement.parentElement;
    let meal_id = mealItem.dataset.id;
    console.log(meal_id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`).then(function(res){
      return res.json();
    }).then(function(result){
      displayInstructions(result);
        let meal_instruction = result.meals[0].strInstructions;

    })
  }
})


// display meal-instruction box.
function displayInstructions(result1){
  let html = "";
  html = `
  <div class="meal-name">
    <h3>${result1.meals[0].strMeal}</h3>
  </div>
  <div class="meal-category">
    <h3>${result1.meals[0].strCategory}</h3>
  </div>
  <div class="meal-instructions">
    <h3>${result1.meals[0].strInstructions}</h3>
  </div>
  <div class="meal-image">
    <img src="${result1.meals[0].strMealThumb}" class="card-img-top" alt="...">
  </div>
  <div class="recepie-video">
    <a href="${result1.meals[0].strYoutube}" target = "_blank">Watch Video</a>
  </div>`
  document.getElementById("meal-description").innerHTML = html;
  document.getElementById("meal-description").parentElement.classList.add("showThis");
}

//Hide meal-instruction box.
  document.getElementById("closeBox").addEventListener("click",function(){
    document.getElementById("meal-description").parentElement.classList.remove("showThis");
  })
