$(document).ready(function(){
});

    axios .get("http://localhost:3000/user/RecomendMovies", {
                    headers: { Authorization: "Bearer " + localStorage.jwt },
      }).then (response => {
        document.getElementById("number_1").innerHTML = response.data.result[0]
        document.getElementById("number_2").innerHTML = response.data.result[1]
        document.getElementById("number_3").innerHTML = response.data.result[2]
      })
    