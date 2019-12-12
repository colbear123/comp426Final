const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(document).ready(function(){
    $("#Login").on("click", submitRegistry);
});


async function submitRegistry() {
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username)
    const password = document.getElementById("password").value;
    try {
        const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/login',
        data: {
            "name": username,
            "pass": password,
        }
    }).then (response => {
        var jwt = response.data.jwt
        localStorage.setItem("jwt", jwt);
    })
        const result1 = await pubRoot.post('/Login/', {
            data: {username: username,
                    guest: "false"
            }
            
        })
        const result2 = await pubRoot.post('/Accounts/' + username, {
            data: {username: username,
                    guest: "false"
                }
          });
        window.location.assign('http://localhost:3001/title.html');
}
        catch(error) {
            document.getElementById('message').innerHTML = 
            `<div class="alert">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                Incorret Password, please retry.
            </div>`;
        }

}