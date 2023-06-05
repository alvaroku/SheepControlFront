function update(id){
    objectToUpdate = findInArray(allData,id)
    updateForm.sheepId.value = objectToUpdate.sheepId
    updateForm.newWeight.value = objectToUpdate.newWeight
    updateForm.weighingDate.value = objectToUpdate.weighingDate.substring(0, 10)
}

updateForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    data = {
        sheepId: e.target.sheepId.value,
        weighingDate: e.target.weighingDate.value,
        newWeight: e.target.newWeight.value
    }
    btnRequest1.style.display="none"
    loading1.style.display = ""
    fetchRequest(urlSheepHistoricWeight+objectToUpdate.id, { method: 'PUT', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        btnRequest1.style.display=""
        loading1.style.display = "none"
        if (error) {
            showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            tr = document.getElementById(data.data.id)

                    tr.innerHTML = createSaleSheepTds(data.data)
                    
                    objectToUpdate = null
                    updateForm.reset()
                     
                    showMessage("success","Mensaje","Registro actualizado")

                    let index = allData.findIndex(obj => obj.id === data.data.id); // busca el objeto con id 3 y devuelve su posición en el array

                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = data.data; // asigna el nuevo objeto en su posición
                    }
        }
    });
})



function toggleActive(event,id){

    fetchRequest(urlSheepHistoricWeight+"toggleActive/" + id, {headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Error al actualizar")
            event.preventDefault()
        } else {
            tr = document.getElementById(id)
            
            dataToogle = findInArray(allData,id)
            dataToogle.active = data.data

            tr.innerHTML = createSaleSheepTds(dataToogle)

            let index = allData.findIndex(obj => obj.id === id); // busca el objeto con id 3 y devuelve su posición en el array

            if (index !== -1) { // si el objeto se encontró en el array
                allData[index] = dataToogle; // asigna el nuevo objeto en su posición
            }

            showMessage("success","Mensaje","Registro actualizado")

        }
    });
    
}