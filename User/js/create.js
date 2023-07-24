createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    data = {
        name:createForm.name.value,
        lastName:createForm.lastName.value,
        birthDate:createForm.birthDate.value,
        phoneNumber:createForm.phoneNumber.value,
        email:createForm.email.value,
        password:createForm.password.value
    }
    fetchRequest(urlUser, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
,"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            tds = createUserTds(data.data)
            table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`
            allData.push(data.data)
            createForm.reset()
            
        }
    });

})