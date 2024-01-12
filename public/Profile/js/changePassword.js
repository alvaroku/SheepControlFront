changePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if(e.target.newPassword.value != e.target.confirmPassword.value){
        showMessage("error","Error","Las contraseñas no coinciden.")
        return
    }


    data = {
        currentPassword: e.target.currentPassword.value,
        newPassword: e.target.newPassword.value
    }
    btnRequest2.style.display="none"
    loading2.style.display = ""
    fetchRequest(urlUser+"ChangePassword/" + user.id, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": `Bearer ${getCookie('auth')}` } }, function (error, data) {
        btnRequest2.style.display=""
            loading2.style.display = "none"
        if (error) {
            console.log(error);
        } else {
            showMessage("success", "Mensaje", data.message)
            changePasswordForm.reset()
        }
    });
})