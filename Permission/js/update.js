////////////////SheepUpdate///////////////
function update(id) {
    objToUpdate = findInArray(allData,id)
    updateForm.clave.value = objToUpdate.clave
    updateForm.description.value = objToUpdate.description
    updateForm.controllerId.value = objToUpdate.controller.id
    updateForm.actionId.value = objToUpdate.action.id
}
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault()

            data = {
                clave:"",
                description: updateForm.description.value,
                controllerId:updateForm.controllerId.value,
                actionId:updateForm.actionId.value
            }

            fetchRequest(urlPermission + objToUpdate.id, { method: 'PUT', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)

                    tr.innerHTML = createPermissionTds(data.data)
                    
                    objToUpdate = null
                    updateForm.reset()
                     
                    showMessage("success","Mensaje","Registro actualizado")

                    let index = allData.findIndex(obj => obj.id === data.data.id); // busca el objeto con id 3 y devuelve su posición en el array

                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = data.data; // asigna el nuevo objeto en su posición
                    }

                    //document.querySelector('#exampleModal2').classList.remove('show');
                    //document.querySelector('.modal-backdrop').remove();

                }
            });

        })