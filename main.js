const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCat) {
        //create links
        const link = document.createElement("a");
        link.setAttribute("href", `#${oneCat}`)
        link.textContent = oneCat;
        document.querySelector("nav").appendChild(link);

        //create sections
        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("#wrapper").appendChild(section);
    })
    getProducts();
}


function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            const superheroes = data
            data.forEach(showDish)
        })
}

function showData(jsonData) {
    console.log(jsonData)
    jsonData.forEach(showDish)
}

function showDish(course) {
    console.log(course)
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = course.name;

    clone.querySelector(".price-full span").textContent = course.price;

    clone.querySelector(".info").textContent = course.shortdescription;

    clone.querySelector(".price-discount span").textContent = course.discount;

    if (!course.soldout) {
        clone.querySelector(".soldOutImg").remove();
    }

    if (course.discount) {
        clone.querySelector(".price-discount span").textContent = course.price;
        const newPrice = Math.round(course.price - course.price * course.discount / 100);

        clone.querySelector(".price-full span").textContent = newPrice;
    } else {
        clone.querySelector(".price-discount").remove()
        clone.querySelector(".price-full span").textContent = course.price
    }

    clone.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
            .then(res => res.json())
            .then(showDetails);
    });


    function showDetails(data) {
        console.log(data)
        modal.querySelector(".modal-name").textContent = data.name;
        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.querySelector(".modal-price span").textContent = data.price;

        modal.classList.remove("hide")

    }

    const imageName = course.image;

    const base = "https://kea-alt-del.dk/t5/site/imgs/";

    const smallImg = base + "small/" + imageName + "-sm.jpg";

    const mediumImg = base + "medium/" + imageName + "-md.jpg";

    const largeImg = base + "large/" + imageName + ".jpg";

    clone.querySelector("img").src = smallImg;

    /*const parent = document.querySelector("#starter");
    parent.appendChild(clone);*/

    console.log(`#${course.category}`)
    document.querySelector(`#${course.category}`).appendChild(clone);
}
