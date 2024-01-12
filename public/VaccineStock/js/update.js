////////////////SheepUpdate///////////////

function update(id) {
    objToUpdate = allData.find(function (elemento) {
        return elemento.id === id;
    });
    updateForm.acquisitionDate.value = objToUpdate.acquisitionDate.substring(0, 10)
    updateForm.netContent.value = objToUpdate.netContent
    updateForm.unities.value = objToUpdate.unities
    updateForm.unitPrice.value = objToUpdate.unitPrice
    updateForm.acquisitionCost.value = objToUpdate.acquisitionCost
    updateForm.vaccineId.value = objToUpdate.vaccineId

}
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // formData.append("netContent",e.target.netContent.value)
            // formData.append("unities",e.target.unities.value)
            // formData.append("unitPrice",e.target.unitPrice.value)
            // formData.append("acquisitionCost",e.target.acquisitionCost.value)

            objeto = {
                acquisitionDate:e.target.acquisitionDate.value,
                vaccineId: objToUpdate.vaccineId,
                netContent: e.target.netContent.value,
                unities: e.target.unities.value,
                unitPrice: e.target.unitPrice.value,
                acquisitionCost: e.target.acquisitionCost.value
              }
              btnRequest1.style.display="none"
            loading1.style.display = ""
            fetchRequest(urlVaccineStock + objToUpdate.id, { method: 'PUT', body: JSON.stringify(objeto),headers:{'Content-Type': 'application/json','Accept': 'application/json'
            ,"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
                
btnRequest1.style.display=""
loading1.style.display = "none"
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)

                    tr.innerHTML = createVaccineTds(data.data)
                    
                    objToUpdate = null
                    updateForm.reset()
                   
                    showMessage("success","Mensaje",data.message)

                    let index = allData.findIndex(obj => obj.id === data.data.id); // busca el objeto con id 3 y devuelve su posición en el array

                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = data.data; // asigna el nuevo objeto en su posición
                    }

                }
            });

        })
    
        function toggleActive(event,id){

            fetchRequest(urlVaccineStock+"toggleActive/" + id, {headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    event.preventDefault()
                } else {
                    tr = document.getElementById(id)
                    
                    dataToogle = findInArray(allData,id)
                    dataToogle.active = data.data
        
                    
                    tr.innerHTML = createVaccineTds(dataToogle)
        
 
        
                    let index = allData.findIndex(obj => obj.id === id); // busca el objeto con id 3 y devuelve su posición en el array
        
                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = dataToogle; // asigna el nuevo objeto en su posición
                    }
        
                    showMessage("success","Mensaje",data.message)
        
                }
            });
            
        }


        updateForm.unitPrice.addEventListener("change",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.unities.value)){
                updateForm.acquisitionCost.value = updateForm.unitPrice.value * updateForm.unities.value
            }
        })
        updateForm.unitPrice.addEventListener("keyup",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.unities.value)){
                updateForm.acquisitionCost.value = updateForm.unitPrice.value * updateForm.unities.value
            }
        })
        
        updateForm.unities.addEventListener("change",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.unitPrice.value)){
                updateForm.acquisitionCost.value = updateForm.unitPrice.value * updateForm.unities.value
            }
        })
        updateForm.unities.addEventListener("keyup",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.unitPrice.value)){
                updateForm.acquisitionCost.value = updateForm.unitPrice.value * updateForm.unities.value
            }
        })