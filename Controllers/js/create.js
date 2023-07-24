createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    data = {
        name:createForm.name.value
    }
    fetchRequest(urlController, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            tds = createControllerTds(data.data)
            table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`
            allData.push(data.data)
            createForm.reset()
            
        }
    });

})