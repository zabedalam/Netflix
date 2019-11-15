const url = "https://strive-school-testing-apis.herokuapp.com/api/movies/";
const url2 = "https://strive-school-testing-apis.herokuapp.com/api/movies/fantasy";

// const categories = ["drama", "action", "comedy"]

window.onload = async () => {
    await loadMovies();
};

loadMovies = async () => {
    let movies = await getMovies();
    console.log("MOVIES", movies);
    document.querySelector("#productColumn").innerHTML =

        movies
        .map(
            movie => `<li class="list-group-item">
      <div class="col-md-6">
  <img src="${movie.imageUrl}" style="width:50%"/>
   <p>${movie.name} - ${movie.category}</p>
  <input type="button" class="btn btn-danger" value="X" onclick="deleteRow('${movie._id}')" />
      </div>
      `
        )
        .join("") +
        " </ul>";
};

getMovies = async () => {
    let username = "user20";
    let password = "Y2cJZ38UPMmnPdAW";
    let token = btoa(username + ":" + password);
    let response = await fetch(url2, {
        headers: {
            Authorization: "Basic " + token
        }
    });
    return await response.json();
};
handleSubmit = async () => {
    event.preventDefault();
    let myMovie = {
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        category: document.querySelector("#category").value,
        imageUrl: document.querySelector("#image").value
    };

    console.log("MYMOVIE", JSON.stringify(myMovie));
    let response = await createMovie(myMovie);
    console.log(response);
    if (response) {
        await loadMovies();
    } else {
        alert("The product was not saved");
    }
};

createMovie = async movie => {
    let username = "user20";
    let password = "Y2cJZ38UPMmnPdAW";
    let token = btoa(username + ":" + password);
    let resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
            Authorization: "Basic " + token,
            "Content-type": "application/json"
        }
    });

    return resp;
};

deleteMovie = async id => {
    let username = "user20";
    let password = "Y2cJZ38UPMmnPdAW";
    let token = btoa(username + ":" + password);
    let reponse = await fetch(url + id, {
        method: "DELETE",
        headers: {
            Authorization: "Basic " + token
        }
    });
    return reponse;
};

deleteRow = async id => {
    let button = event.currentTarget;
    let success = await deleteMovie(id);

    if (success) {
        var li = button.closest(".list-group-item");
        li.parentElement.removeChild(li);
    } else {
        alert("Something went worng!Please try later");
    }
};