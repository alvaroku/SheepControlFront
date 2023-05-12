loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    data = {
        email:loginForm.email.value,
        password:loginForm.password.value
    }
    fetchRequest(urlUser+"Login", { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
}}, function (error, data) {
        if (error) {
            console.log(error);
            deleteCookie("auth")
        } else {
            document.cookie = "auth="+data.data.token;
            showMessage("success","Mensaje",`logueado como: ${data.data.email}`)
            setInfoUSer(data.data)
            loginForm.reset()
        }
    });

})

