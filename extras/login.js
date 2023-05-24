loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    data = {
        email:loginForm.email.value,
        password:loginForm.password.value
    }
    e.target.btnLogin.style.display="none"
    e.target.loading.style.display = ""
    fetchRequest(urlUser+"Login", { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'}}, function (error, data) {
        e.target.btnLogin.style.display=""
        e.target.loading.style.display = "none"
        if (error) {

        } else {
            document.cookie = "auth="+data.data.token;
            showMessage("success","Mensaje",`logueado como: ${data.data.email}`)
            window.location.href = "/index.html"
        }
    });

})

