const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});
const potato = new axios.create({
    baseURL: "http://localhost:3000/account/create"
});

$(document).ready(function(){
    $("#signupbtn").on("click", submitRegistry);
});
async function submitRegistry() {
    var passwordEqual = true
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm").value;
    const usernameExists = await pubRoot.get('/Login')
    console.log(usernameExists.data.result)
    //let posts = usernameExists.data.result.username
    if(password != confirmPassword) {
        passwordEqual = false
        document.getElementById('notes').innerHTML = 
        `<div class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Passwords did not match, please retry.
        </div>`;
    }
    //console.log(response1)

    //console.log(usernameExists.data.result)
    if(passwordEqual == true) {
        try {
        const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/create',
        data: {
            "name": username,
            "pass": password,
        }
    });
    const response1 = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/login',
        data: {
            "name": username,
            "pass": password,
        }
    }).then (response1 => {
        var jwt = response1.data.jwt
        localStorage.setItem("jwt", jwt);
    })
    const result1 = await pubRoot.post('/Login/', {
        data: {username: username,
                guest: "false"
        }
    })
    window.location.assign('http://localhost:3001/title.html');
}

catch(error) {
    document.getElementById('notes').innerHTML = `<div class="alert">
           <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
           Username is Already taken, please try again.
        </div>`
};
    }
    else {

    }
    
}
