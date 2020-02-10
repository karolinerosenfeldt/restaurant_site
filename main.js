fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function(response){
    return response.json()
})

.then(function (data){
    const superheroes = data
    data.forEach(showDish)
})

function showDish(course){
    console.log(course)
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = course.name;

    clone.querySelector(".price-full span").textContent = course.price;

    clone.querySelector(".info").textContent = course.shortdescription;

    const parent = document.querySelector("#starters");
    parent.appendChild(clone);
}






