createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    data = {
        clave:"",
        description: createForm.description.value,
        controllerId:createForm.controllerId.value,
        actionId:createForm.actionId.value
    }
    fetchRequest(urlPermission, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            tds = createPermissionTds(data.data)
            table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`
            allData.push(data.data)
            createForm.reset()
            
        }
    });

})