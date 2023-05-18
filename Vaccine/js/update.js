////////////////SheepUpdate///////////////

function update(id) {
    objToUpdate = allData.find(function (elemento) {
        return elemento.id === id;
    });
      

    quantityVolume = objToUpdate.indicatedDose.split("/")[0].split("|")[0]
    unitVolume = objToUpdate.indicatedDose.split("/")[0].split("|")[1]

    quantityWeight = objToUpdate.indicatedDose.split("/")[1].split("|")[0]
    unitWeight = objToUpdate.indicatedDose.split("/")[1].split("|")[1]


    updateForm.name.value = objToUpdate.name
    updateForm.observations.value = objToUpdate.observations
    updateForm.indicatedDoseVolume.value = quantityVolume
    updateForm.unitDoseVolume.value = unitVolume
    updateForm.indicatedDoseWeight.value = quantityWeight
    updateForm.unitDoseWeight.value = unitWeight


    img = document.getElementById("img-" + id)
    updateForm.currentPhoto.src = img.src

}
        // Agregar un event listener al input de tipo file
        updateForm.photo.addEventListener('change', function () {
            // Verificar que se haya seleccionado un archivo de imagen
            if (updateForm.photo.files && updateForm.photo.files[0]) {
                // Crear un objeto FileReader
                var reader = new FileReader();

                // Configurar el evento load del FileReader
                reader.onload = function (e) {
                    // Mostrar la imagen en el elemento img
                    updateForm.currentSelectedPhoto.src = e.target.result;
                }

                // Leer el contenido del archivo de imagen
                reader.readAsDataURL(updateForm.photo.files[0]);
            }
        });
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault()

            quantityVolume = e.target.indicatedDoseVolume.value
            unitVolume = e.target.unitDoseVolume.value

            quantityWeight = e.target.indicatedDoseWeight.value
            unitWeight = e.target.unitDoseWeight.value

            let indicatedDose = `${quantityVolume+"|"+unitVolume+"/"+quantityWeight+"|"+unitWeight}`

            const file = updateForm.photo.files[0];

            // Crear un objeto FormData y agregar la imagen a él
            const formData = new FormData();

            formData.append('imageFile', file);
            formData.append('name', e.target.name.value);
            formData.append('indicatedDose', indicatedDose);
            formData.append('observations', e.target.observations.value);
            formData.append('photo', objToUpdate.photo);
            
            fetchRequest(urlVaccine + objToUpdate.id, { method: 'PUT', body: formData,headers:{"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)
                     
                    auxImg = document.getElementById("img-" + objToUpdate.id).src

                    tr.innerHTML = createVaccineTds(data.data)
                    
                    if (file) {
                        requestImage(urlVaccine + "GetImage/" + data.data.photo, function (error, dataImg) {
                            if (dataImg) {
                                const img = document.getElementById("img-" + data.data.id);
                                img.src = URL.createObjectURL(dataImg);
                            }
                        })

                    } else {
                        const img = document.getElementById("img-" + data.data.id);
                        img.src = auxImg
                    }
                    objToUpdate = null
                    updateForm.reset()
                    updateForm.currentSelectedPhoto.src = ""
                    updateForm.currentPhoto.src = ""
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
    
        function toggleActive(event,id){

            fetchRequest(urlRole+"toggleActive/" + id, {headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    event.preventDefault()
                } else {
                    tr = document.getElementById(id)
                    
                    dataToogle = findInArray(allData,id)
                    dataToogle.active = data.data
        
                    imgSrc = document.getElementById("img-"+id).src

                    tr.innerHTML = createVaccineTds(dataToogle)
        
                    document.getElementById("img-"+id).src = imgSrc
        
                    let index = allData.findIndex(obj => obj.id === id); // busca el objeto con id 3 y devuelve su posición en el array
        
                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = dataToogle; // asigna el nuevo objeto en su posición
                    }
        
                    showMessage("success","Mensaje","Registro actualizado")
        
                }
            });
            
        }