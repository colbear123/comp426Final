var counterLike = 0;
var counterUnlike = 0;
$(document).ready(function(){
  login()
});
async function login() {
  if(!localStorage.guest) {
  document.getElementById("Login").innerHTML = "Logout"
  
}
  else {
  //localStorage.setItem("username": document.getElementById("username").innerHTML)
  document.getElementById("Login").innerHTML = "Login"
  document.getElementById("quiz").innerHTML = "Quizzes " + "<i class='fa fa-caret-down'></i>"
  document.getElementById("quiz1").innerHTML = "Make a Quiz! " + "<i class='fa fa-lock'></i>"
  document.getElementById("quiz2").innerHTML = "Take a Quiz! " + "<i class='fa fa-lock'></i>"
  document.getElementById("recommend").innerHTML = "Recommended " + "<i class='fa fa-lock'></i>"

}
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
}

const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'
const menuBar = document.createElement('img')
menuBar.src = ''

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      if(!localStorage.guest) {
        axios .post("http://localhost:3000/user/LikeMovies", {
          data: 0,},{
         headers: { Authorization: "Bearer " + localStorage.jwt }},)
         axios .post("http://localhost:3000/user/DislikedMovies", {
          data: 0,},{
         headers: { Authorization: "Bearer " + localStorage.jwt }},)
        axios .post("http://localhost:3000/user/RecomendMovies", {
          data: 0,},{
         headers: { Authorization: "Bearer " + localStorage.jwt }},)
      axios .post("http://localhost:3000/user/ListOfMovies/" + movie.id, {
          data: (movie.rt_score/125)},{
          headers: { Authorization: "Bearer " + localStorage.jwt }}, )
      }


      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      card.setAttribute('id', movie.id)
      const h1 = document.createElement('h1')
      h1.textContent = movie.title

      const p = document.createElement('p')

      var like = document.createElement('BUTTON')
      var unlike = document.createElement('BUTTON')
      like.id = "Like" + movie.id;
      unlike.id = "Unlike" + movie.id;
      like.className = "White" + movie.id;
      unlike.className = "White" + movie.id;
      like.innerHTML = "<i class='fas fa-thumbs-up'</i>";
      unlike.innerHTML = "<i class='fas fa-thumbs-down'</i>";
      movie.description = movie.description.substring(0, 300)
      p.textContent = `${movie.description}...`
      if(!localStorage.guest) {
        axios .get("http://localhost:3000/user/LikeMovies", {
                    headers: { Authorization: "Bearer " + localStorage.jwt },
      }).then (response => {
        var obj = response.data.result
        for(var key in obj) {
          if(key == movie.title) {
            var request3 = new XMLHttpRequest()
            request3.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
            request3.onload = function() {
            var data3 = JSON.parse(this.response)
            if (request3.status >= 200 && request3.status < 400) {
            data3.forEach(movie3 => { 
              if(movie3.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie3.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response3 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie3.id, {
                      data: response3.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie3.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie3.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response3 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie3.id, {
                      data: response3.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie3.release_date > movie.release_date && (movie.release_date  + 9 > movie3.release_date) 
              || (movie3.release_date <= movie.release_date) && (movie3.release_date + 9 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie3.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response3 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie3.id, {
                      data: response3.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
            })
          }

          }
          request3.send()

            like.className = "Green" + movie.id
            $('#Like' + movie.id).css("background-color", "green")

          }
        }
        })
        axios .get("http://localhost:3000/user/DislikedMovies", {
                    headers: { Authorization: "Bearer " + localStorage.jwt },
      }).then (response => {
        var obj = response.data.result
        for(var key in obj) {
          if(key == movie.title) {
            var request4 = new XMLHttpRequest()
            request4.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
            request4.onload = function() {
            var data4 = JSON.parse(this.response)
            if (request4.status >= 200 && request4.status < 400) {
            data4.forEach(movie4 => { 
              if(movie4.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie4.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response4 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie4.id, {
                      data: response4.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie4.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie4.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response4 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie4.id, {
                      data: response4.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie4.release_date > movie.release_date && (movie.release_date  + 9 > movie4.release_date) 
              || (movie4.release_date <= movie.release_date) && (movie4.release_date + 9 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie4.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response4 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie4.id, {
                      data: response4.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
            })
          }

          }
            request4.send()
            unlike.className = "Red" + movie.id
            $('#Unlike' + movie.id).css("background-color", "Red")
          }
        }
        })
      }

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
      if(!localStorage.guest) {
        card.appendChild(like)
        card.appendChild(unlike)
      }
      $('#Like' + movie.id).click(function(event) {
        event.preventDefault()
      },
      //Like Clicked
       async function(event) {
        var temp = ($(this).attr("class"))
        //add 2
        if(temp.includes("White") && $('#Unlike' + movie.id).attr("class").includes("Red")) {
          $('#Unlike' + movie.id).css("background-color", "White")
          unlike.className = "White" + movie.id;
          axios .delete("http://localhost:3000/user/DislikedMovies/" + movie.title, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},)
          axios .post("http://localhost:3000/user/LikeMovies/" + movie.title, {
              data: movie.id},{
              headers: { Authorization: "Bearer " + localStorage.jwt }},) 
          like.className = "Green" + movie.id;
          $('#Like' + movie.id).css("background-color", "Green")
          var request5 = new XMLHttpRequest()
          request5.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request5.onload = function() {
          var data5 = JSON.parse(this.response)
          if (request5.status >= 200 && request5.status < 400) {
            data5.forEach(movie2 => {
              if(movie2.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response5 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response5.data.result +2},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie2.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response5 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response5.data.result +2},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie2.release_date > movie.release_date && (movie.release_date  + 3 > movie2.release_date) 
              || (movie2.release_date <= movie.release_date) && (movie2.release_date + 3 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response5 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response5.data.result +2},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }

            })  
  }
          
}
request5.send()
            }
        //add 1
        else if(temp.includes("White") && $('#Unlike' + movie.id).attr("class").includes("White")) {
          axios .post("http://localhost:3000/user/LikeMovies/" + movie.title, {
            data: movie.id},{
            headers: { Authorization: "Bearer " + localStorage.jwt }}, )
            like.className = "Green" + movie.id; 
            $('#Like' + movie.id).css("background-color", "Green")
          var request2 = new XMLHttpRequest()
          request2.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request2.onload = function() {
          var data2 = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(movie2 => {
              if(movie2.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie2.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie2.release_date > movie.release_date && (movie.release_date  + 3 > movie2.release_date) 
              || (movie2.release_date <= movie.release_date) && (movie2.release_date + 3 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }

            })  
  }
          
}
request2.send()
        }
        //subtract 1
        else if(temp.includes("Green") && $('#Unlike' + movie.id).attr("class").includes("White")) {
          axios .delete("http://localhost:3000/user/LikeMovies/" + movie.title, {
            headers: { Authorization: "Bearer " + localStorage.jwt }}, )
            like.className = "White" + movie.id; 
            $('#Like' + movie.id).css("background-color", "White")
            var request2 = new XMLHttpRequest()
          request2.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request2.onload = function() {
          var data2 = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(movie2 => {
              if(movie2.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
                    
              }
              if(movie2.producer == movie.producer) {  
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
                    
              }
              if((movie2.release_date > movie.release_date && (movie.release_date  + 3 > movie2.release_date) 
              || (movie2.release_date <= movie.release_date) && (movie2.release_date + 3 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }

            })  
  }
          
}
request2.send()
        }

      })
      
      $('#Unlike' + movie.id).click(function(event) {
      },
      //Unlike Clicked
      function(event) {
        var temp1 = ($(this).attr("class"))
        //subtract 2
        if(temp1.includes("White") && $('#Like' + movie.id).attr("class").includes("Green")) {
          $('#Unlike' + movie.id).css("background-color", "Red")
          unlike.className = "Red" + movie.id;
          axios .post("http://localhost:3000/user/DislikedMovies/" + movie.title, {
                data: movie.id},{
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
          unlike.className = "Red" + movie.id;
          axios .delete("http://localhost:3000/user/LikeMovies/" + movie.title, {
          headers: { Authorization: "Bearer " + localStorage.jwt }}, )
          like.className = "White" + movie.id;
          $('#Like' + movie.id).css("background-color", "White")
          var request2 = new XMLHttpRequest()
          request2.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request2.onload = function() {
          var data2 = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(movie2 => {
              if(movie2.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -2},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie2.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -2},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie2.release_date > movie.release_date && (movie.release_date  + 3 > movie2.release_date) 
              || (movie2.release_date <= movie.release_date) && (movie2.release_date + 3 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -2},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }

            })  
  }
          
}
request2.send()
                }
        //subtract 1
        else if(temp1.includes("White") && $('#Like' + movie.id).attr("class").includes("White")) {
          axios .post("http://localhost:3000/user/DislikedMovies/" + movie.title, {
            data: movie.id},{
            headers: { Authorization: "Bearer " + localStorage.jwt }}, )
            unlike.className = "Red" + movie.id; 
            $('#Unlike' + movie.id).css("background-color", "Red")
            var request2 = new XMLHttpRequest()
          request2.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request2.onload = function() {
          var data2 = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(movie2 => {
              if(movie2.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie2.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie2.release_date > movie.release_date && (movie.release_date  + 3 > movie2.release_date) 
              || (movie2.release_date <= movie.release_date) && (movie2.release_date + 3 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result -1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }

            })  
  }
          
}
request2.send()
        }
        //add 1
        else if(temp1.includes("Red") && $('#Like' + movie.id).attr("class").includes("White")) {
          axios .delete("http://localhost:3000/user/DislikedMovies/" + movie.title, {
            headers: { Authorization: "Bearer " + localStorage.jwt }}, )
            unlike.className = "White" + movie.id; 
            $('#Unlike' + movie.id).css("background-color", "White")
            var request2 = new XMLHttpRequest()
          request2.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
          request2.onload = function() {
          var data2 = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(movie2 => {
              if(movie2.director == movie.director) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if(movie2.producer == movie.producer) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }
              if((movie2.release_date > movie.release_date && (movie.release_date  + 3 > movie2.release_date) 
              || (movie2.release_date <= movie.release_date) && (movie2.release_date + 3 > movie.release_date))) {
                axios .get("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                    headers: { Authorization: "Bearer " + localStorage.jwt }},) 
                    .then (response2 => {
                      axios .post("http://localhost:3000/user/ListOfMovies/" + movie2.id, {
                      data: response2.data.result +1},{
                      headers: { Authorization: "Bearer " + localStorage.jwt }}, )
                    })
              }

            })  
  }
          
}
request2.send()
        }
       
        })
      
    })
      //certain card was clicked(think about this.)
      // open the correct dynamic page
      
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}


request.send()
