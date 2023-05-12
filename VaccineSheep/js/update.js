////////////////SheepUpdate///////////////
function update(id) {
    objToUpdate = findInArray(allData,id)
      
    updateForm.applicationDate.value = objToUpdate.applicationDate.substring(0, 10)
    updateForm.doseApplied.value = objToUpdate.doseApplied
    updateForm.indicatedDose.value = getIndicatedDoseString(objToUpdate.vaccine.indicatedDose)

    currentVaccine = objToUpdate.vaccine
    currentSheep = objToUpdate.sheep

    quantityVolume = currentVaccine.indicatedDose.split("/")[0].split("|")[0]
    unitVolume = currentVaccine.indicatedDose.split("/")[0].split("|")[1]
    
    quantityWeight = currentVaccine.indicatedDose.split("/")[1].split("|")[0]
         
    doseRecomended = (currentSheep.weight * quantityVolume) / quantityWeight

    updateForm.indicatedDoseToApply.value = doseRecomended+""+unitVolume
}
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault()

            data = {
                applicationDate: e.target.applicationDate.value,
                doseApplied: e.target.doseApplied.value
            }

            fetchRequest(urlVaccineSheep + objToUpdate.id, { method: 'PUT', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
            ,"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)

                    tr.innerHTML = createVaccineSheepTds(data.data)
                    
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