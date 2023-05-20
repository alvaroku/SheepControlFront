////////////////SheepUpdate///////////////

function update(id) {
    let sheep = allSheeps.find(function (elemento) {
        return elemento.id === id;
    });
    objToUpdate = sheep

    updateForm.birthDate.value = sheep.birthDate.substring(0, 10)
    updateForm.weight.value = sheep.weight
    updateForm.description.value = sheep.description
    updateForm.sex.value = sheep.sex
    updateForm.isAcquisition.checked = sheep.isAcquisition

    if(sheep.isAcquisition){
        updateForm.kiloPrice.disabled = false
        updateForm.acquisitionCost.disabled = false
        updateForm.kiloPrice.value = sheep.kiloPrice
        updateForm.acquisitionCost.value = sheep.acquisitionCost
    }

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

            const file = updateForm.photo.files[0];

            // Crear un objeto FormData y agregar la imagen a él
            const formData = new FormData();

            formData.append('ImageFile', file);
            formData.append('birthDate', e.target.birthDate.value);
            formData.append('weight', e.target.weight.value);
            formData.append('description', e.target.description.value);
            formData.append('sex', e.target.sex.value);
            formData.append('photo', objToUpdate.photo);

            formData.append("isAcquisition",e.target.isAcquisition.checked)
            
            kiloPrice = 0
            acquisitionCost = 0

            if(e.target.isAcquisition.checked){
                kiloPrice = e.target.kiloPrice.value
                acquisitionCost = e.target.acquisitionCost.value
            }
            
            formData.append("kiloPrice",kiloPrice)
            formData.append("acquisitionCost",acquisitionCost)

            
            fetchRequest(urlSheep + objToUpdate.id, { method: 'PUT', body: formData ,headers:{"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)
                     
                    auxImg = document.getElementById("img-" + objToUpdate.id).src

                    tr.innerHTML = createSheepTds(data.data)
                    
                    if (file) {
                        requestImage(urlSheep + "GetImage/" + data.data.photo, function (error, dataImg) {
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

                    let index = allSheeps.findIndex(obj => obj.id === data.data.id); // busca el objeto con id 3 y devuelve su posición en el array

                    if (index !== -1) { // si el objeto se encontró en el array
                        allSheeps[index] = data.data; // asigna el nuevo objeto en su posición
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
                    
                    dataToogle = findInArray(allSheeps,id)
                    dataToogle.active = data.data
        
                    imgSrc = document.getElementById("img-"+id).src

                    tr.innerHTML = createSheepTds(dataToogle)
        
                    document.getElementById("img-"+id).src = imgSrc

                    let index = allSheeps.findIndex(obj => obj.id === id); // busca el objeto con id 3 y devuelve su posición en el array
        
                    if (index !== -1) { // si el objeto se encontró en el array
                        allSheeps[index] = dataToogle; // asigna el nuevo objeto en su posición
                    }
        
                    showMessage("success","Mensaje","Registro actualizado")
        
                }
            });
            
        }


        updateForm.isAcquisition.addEventListener("click",(e)=>{
            if(e.target.checked){
                updateForm.kiloPrice.disabled = false
                updateForm.acquisitionCost.disabled = false

                if(objToUpdate.isAcquisition){
                    updateForm.acquisitionCost.value = updateForm.weight.value * objToUpdate.kiloPrice
                    updateForm.kiloPrice.value = objToUpdate.kiloPrice
                }else{
                    
                }

            }else{//setear los valores antiguis
                updateForm.kiloPrice.disabled = true
                    updateForm.acquisitionCost.disabled = true
                    updateForm.kiloPrice.value = ""
                    updateForm.acquisitionCost.value = ""
            }
        })
        updateForm.kiloPrice.addEventListener("change",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.weight.value)){
                updateForm.acquisitionCost.value = updateForm.kiloPrice.value * updateForm.weight.value
            }
        })
        updateForm.kiloPrice.addEventListener("keyup",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.weight.value)){
                updateForm.acquisitionCost.value = updateForm.kiloPrice.value * updateForm.weight.value
            }
        })
        
        updateForm.weight.addEventListener("change",(e)=>{
            if(parseFloat(e.target.value) && parseFloat(updateForm.kiloPrice.value)){
                updateForm.acquisitionCost.value = updateForm.kiloPrice.value * updateForm.weight.value
            }
        })
        updateForm.weight.addEventListener("keyup",(e)=>{
            if(updateForm.isAcquisition.checked){
                if(parseFloat(e.target.value) && parseFloat(updateForm.kiloPrice.value)){
                    updateForm.acquisitionCost.value = updateForm.kiloPrice.value * updateForm.weight.value
                }
            }
        })
        