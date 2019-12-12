const privRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });

  $(document).ready(function(){
    reloadPage()
  });

var correct_amount=0;


async function reloadPage() {
    //console.log(localStorage)
    axios .get("http://localhost:3000/public/QuizTitle", {
    }).then(response => {
        console.log(response.data)
    })
   
    axios .get("http://localhost:3000/private/Quizzes/", {
    headers: { Authorization: "Bearer " + localStorage.jwt }},
)

.then(response => {
var obj = response.data.result

for (var i=0; i++; i>5) {
    obj[i] = answerArray[i];
    obj[i+5] = questionArray[i];
}
    const root = document.getElementById("root1")
    const img = document.createElement("img")
    
  
//console.log(WArray[0]);
 //   console.log(obj[counter+4].value);
 var counter =  parseInt(document.getElementById("counter").innerHTML.substring(9,10))
 //var arr=obj[counter3-1]
 $("#counter1").text(obj[counter-1]).toString;
    document.getElementById("guestButton").innerHTML = "Next";
   // console.log(sad);
    var answer = document.getElementById("answer").value
   
    
    if(answer.length > 0) {
   
        if (answer == obj[counter+4]) {
            correct_amount++;
            console.log(correct_amount);
        
        } else{
            console.log(correct_amount);
        }
        //make axios request
        if(counter == 4) {
         //   console.log("potato");
            
        }
        if(counter == 5) {
            $("#Return").css("display", "block");
            var prompt;

            if (correct_amount <= 2) {
                $('#counter').text( "You got "+ correct_amount+  " of 5 correct: " + "It's okay to cry. -When Marnie Was There (2014)"); 
                //root1.show();
                img.src = "giphy.gif"
                root.appendChild(img)
                //root.show()
            }   else if (correct_amount <= 4) {
                $('#counter').text( "You got " + correct_amount+  " of 5 correct: " + "You cannot alter your fate. However, you can rise to meet it. ----- Princess Mononoke (1997)") 
                    //root2.show();
                    img.src = "https://s.yimg.com/uu/api/res/1.2/ZeZuY45pjHvv7dFcESRq9g--~B/aD0xMDgwO3c9MTkyMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-06/842e2a30-8c49-11e9-9bfd-4e31be7cf4f9"
                    img.id ="img3"
                    root.appendChild(img)
                    //root.show()
                } else if (correct_amount = 5) {
                    $('#counter').text( "You got "+ correct_amount+  " of 5 correct: " + "Always believe in yourself. Do this and no matter where you are, you will have nothing to fear. ----The Cat Returns (2002)")
                    //root3.show();
                    img.src = "https://pbs.twimg.com/media/DZBrICbUMAAZmre.jpg"
                    img.id = "img3"
                    root.appendChild(img)
                    //root.show()
                }
        $("#counter1").css("display", "none");  
        $("#cancelButton").css("display", "none");
        $('#guestButton').css("display", "none");
        $('#answer').css("display", "none");
        //$('#counter').css("display", "none");
        $('question').css("display", "none");
        $('#Score').css("display", "block");
        $('leave').css("display", "block");     
        $("score").attr("value", "You got "+ correct_amount+  " of 5 correct: " +prompt);
        
        }
        else {
            document.getElementById("counter").value = obj[counter];
            document.getElementById("answer").value = ""
            counter++;
            
            document.getElementById("counter").innerHTML = "Question " + counter + " of 5"
           // document.getElementById("").innerHTML = questionArray[counter];
        }
    }
    else {

    }

return correct_amount;
})
}
