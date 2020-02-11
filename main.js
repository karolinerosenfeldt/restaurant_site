fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res=>res.json())
    .then(createCategories)

function createCategories(data){
    console.log(data)
    data.forEach(function(oneCat){

        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("#wrapper").appendChild(section);
    })
    getProducts();
}


function getProducts(){
fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    })

    .then(function (data) {
        const superheroes = data
        data.forEach(showDish)
    })
}

function showDish(course) {
    console.log(course)
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = course.name;

    clone.querySelector(".price-full span").textContent = course.price;

    clone.querySelector(".info").textContent = course.shortdescription;

    clone.querySelector(".price-discount span").textContent = course.discount;

    if (course.discount) {
        clone.querySelector(".price-discount").textContent = course.price;
        const newPrice = Math.round(course.price - course.price * course.discount / 100);

        clone.querySelector(".price-full span").textContent = newPrice;
    } else {
        clone.querySelector(".price-discount").remove()
        clone.querySelector(".price-full span").textContent = course.price
    }

    console.log(`#${course.category}`)
    document.querySelector(`#${course.category}`).appendChild(clone);

    /*const parent = document.querySelector("#starter");
    parent.appendChild(clone);*/
}
