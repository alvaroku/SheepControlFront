////////////////SheepUpdate///////////////
function update(id) {
    objToUpdate = findInArray(allData,id)
    updateForm.roleId.value = objToUpdate.role.id
    updateForm.userId.value = objToUpdate.user.id
}
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault()

            data = {
                roleId:updateForm.roleId.value,
                userId:updateForm.userId.value
            }

            fetchRequest(urlRoleUser + objToUpdate.id, { method: 'PUT', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)

                    tr.innerHTML = createRoleUserTds(data.data)
                    
                    objToUpdate = null
                    updateForm.reset()
                     
                    showMessage("success","Mensaje",data.message)

                    let index = allData.findIndex(obj => obj.id === data.data.id); // busca el objeto con id 3 y devuelve su posición en el array

                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = data.data; // asigna el nuevo objeto en su posición
                    }

                    //document.querySelector('#exampleModal2').classList.remove('show');
                    //document.querySelector('.modal-backdrop').remove();

                }
            });

        })


        function toggleActive(event,id){

            fetchRequest(urlRoleUser+"toggleActive/" + id, {headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    event.preventDefault()
                } else {
                    tr = document.getElementById(id)
                    
                    dataToogle = findInArray(allData,id)
                    dataToogle.active = data.data
        
                    tr.innerHTML = createRoleUserTds(dataToogle)
        
                    let index = allData.findIndex(obj => obj.id === id); // busca el objeto con id 3 y devuelve su posición en el array
        
                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = dataToogle; // asigna el nuevo objeto en su posición
                    }
        
                    showMessage("success","Mensaje",data.message)
        
                }
            });
            
        }