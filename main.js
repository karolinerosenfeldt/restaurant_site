fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function(response){
    return response.json()
})

.then(function (data){
    showData(data)
})

function showData(jsonData){
    console.log(jsonData)
}

//1 make a template

//2 loop through json data
