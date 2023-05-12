 ////////////////SheepCreate////////////////
        // Agregar un event listener al input de tipo file
        createForm.photo.addEventListener('change', function () {
            // Verificar que se haya seleccionado un archivo de imagen
            if (createForm.photo.files && createForm.photo.files[0]) {
                // Crear un objeto FileReader
                var reader = new FileReader();

                // Configurar el evento load del FileReader
                reader.onload = function (e) {
                    // Mostrar la imagen en el elemento img
                    createForm.currentSelectedPhoto.src = e.target.result;
                }

                // Leer el contenido del archivo de imagen
                reader.readAsDataURL(createForm.photo.files[0]);
            }
        });
        createForm.addEventListener("submit", (e) => {
            e.preventDefault()

            quantityVolume = e.target.indicatedDoseVolume.value
            unitVolume = e.target.unitDoseVolume.value

            quantityWeight = e.target.indicatedDoseWeight.value
            unitWeight = e.target.unitDoseWeight.value

            let indicatedDose = `${quantityVolume+"|"+unitVolume+"/"+quantityWeight+"|"+unitWeight}`

            // Obtener la imagen del input de tipo file
            const file = createForm.photo.files[0];
            // Crear un objeto FormData y agregar la imagen a él
            const formData = new FormData();

            formData.append('imageFile', file);
            formData.append('name', e.target.name.value);
            formData.append('indicatedDose', indicatedDose);
            formData.append('description', e.target.description.value);
            
            fetchRequest(urlVaccine, { method: 'POST', body: formData,headers:{"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Ocurrió un error al registrar")
                    console.log(error)
                } else {
                    tds = createVaccineTds(data.data)
                    table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`

                    requestImage(urlVaccine + "GetImage/" + data.data.photo, function (error, dataImg) {
                        if (dataImg) {
                            const img = document.getElementById("img-" + data.data.id);
                            img.src = URL.createObjectURL(dataImg);
                        }
                    })

                    showMessage("success","Mensaje","Registro creado")
                    allData.push(data.data)
                    createForm.reset()
                    createForm.currentSelectedPhoto.src = ""
                    //document.querySelector('#exampleModal').classList.remove('show');
                    //document.querySelector('.modal-backdrop').remove();
                }
            });

        })