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

    clone.querySelector(".price-discount").textContent = course.discount;

    if (course.discount){
        clone.querySelector(".price-discount").textContent = course.price;
        const newPrice = Math.round(course.price - course.price * course.discount / 100);

        clone.querySelector(".price-full span").textContent = newPrice;
    } else{
        clone.querySelector(".price-discount").remove()
        clone.querySelector(".price-full span").textContent = course.price
    }

    const parent = document.querySelector("#starters");
    parent.appendChild(clone);
}






