const url1 = "https://strive-school-testing-apis.herokuapp.com/api/movies/";
let username = "user20";
let password = "Y2cJZ38UPMmnPdAW";
let token = btoa(username + ":" + password);
myHeaders = {
    Authorization: "Basic " + token,
    "Content-type": "application/json"
}

getCategories = async () => {
    let categories = await fetch(url1, {
        headers: myHeaders
    })
    return await categories.json()

}

getCategory = async (category) => {
    let movies = await fetch(url1 + category, {
        headers: myHeaders
    })
    return await movies.json()


}


window.onload = async () => {
    let categories = await getCategories()
    let movieSaved = document.querySelector("#movieContainer")

    categories.forEach(async category => {
        let movies = await getCategory(category)
        movieSaved.innerHTML += `<h1>${category}<h1>
        <div class="container">
        <div class="row">
        ${movies.map(movie=>`
        <div class="col-md-3">
        <img src="${movie.imageUrl}">

        <p>${movie.name}</p>
        </div>
        
        `)}
        </div>
        </div>
        `
        console.log(movies)
    });
}