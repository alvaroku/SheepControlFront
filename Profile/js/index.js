user = undefined
fetchRequest(urlUser+"GetProfileInfoByToken", { method: 'POST', body: {},headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
    if (error) {
        // if(loginForm){
        //     loginForm.style.display = ""
        // }
        //deleteCookie("auth")
        //window.location = "/login.html"
    } else {
        user = data.data
        document.getElementById("name").textContent = user.name + " " + user.lastName 
        document.getElementById("email").textContent = user.email
        document.getElementById("phoneNumber").textContent = user.phoneNumber
        document.getElementById("birthDate").textContent =  formatDate(user.birthDate,false)
        document.getElementById("creationDate").textContent = "Registrado el "+ formatDate(user.creationDate,false)
        if(user.photo){
            profile.src = urlUser+"GetImage/"+user.photo 
        }
    }
});

edit.addEventListener("click",(e)=>{
    createForm.name.value = user.name
    createForm.lastName.value = user.lastName
    createForm.phoneNumber.value = user.phoneNumber
    createForm.email.value = user.email
    createForm.birthDate.value = user.birthDate.substring(0, 10)
})