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

            fetchRequest(urlSheep + objToUpdate.id, { method: 'PUT', body: formData }, function (error, data) {
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