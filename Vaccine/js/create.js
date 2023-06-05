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
            quantityWeight = e.target.indicatedDoseWeight.value

            let indicatedDose = `${quantityVolume+"|"+"ml"+"/"+quantityWeight+"|"+"kg"}`

            // Obtener la imagen del input de tipo file
            const file = createForm.photo.files[0];
            // Crear un objeto FormData y agregar la imagen a él
            const formData = new FormData();

            formData.append('imageFile', file);
            formData.append('name', e.target.name.value);
            formData.append('indicatedDose', indicatedDose);
            formData.append('observations', e.target.observations.value);
          
            
            formData.append("vaccineStock.acquisitionDate",e.target.acquisitionDate.value)
            formData.append("vaccineStock.netContent",e.target.netContent.value)
            formData.append("vaccineStock.unities",e.target.unities.value)
            formData.append("vaccineStock.unitPrice",e.target.unitPrice.value)
            formData.append("vaccineStock.acquisitionCost",e.target.acquisitionCost.value)
            btnRequest.style.display="none"
            loading.style.display = ""
            fetchRequest(urlVaccine, { method: 'POST', body: formData,headers:{"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
                btnRequest.style.display=""
                loading.style.display = "none"
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