const privRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
var questionArray = []
var answerArray = []
$(document).ready(function(){
    reloadPage()
  });
async function reloadPage() {
    var question = document.getElementById("question").value
    var answer = document.getElementById("answer").value
    if(answer.length > 0 && question.length > 0) {
        var counter =  parseInt(document.getElementById("counter").innerHTML.substring(9,10))
        questionArray[counter-1] = question;
        answerArray[counter-1] = answer;
        //make axios request
        if(counter == 4) {
            document.getElementById("guestButton").innerHTML = "Submit"
        }
        if(counter == 5) {
            axios .post("http://localhost:3000/private/Quizzes/Title/" + localStorage.Title, {
                data: questionArray.concat(answerArray)},{
                    headers: { Authorization: "Bearer " + localStorage.jwt }},
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
        window.location.href = 'title.html'
        }
        else {
            document.getElementById("question").value = ""
            document.getElementById("answer").value = ""
            counter++;
            document.getElementById("counter").innerHTML = "Question " + counter + " of 5"
        }
    }
    else {

    }

}