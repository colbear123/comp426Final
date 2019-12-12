$(document).ready(function(){
  });

  function loadQuiz() {
    if(document.getElementById("Title").value.length >= 1) {
      localStorage.setItem("Title", document.getElementById("Title").value);
      
      window.location.href = 'quizHandler.html'
    }
    
  }