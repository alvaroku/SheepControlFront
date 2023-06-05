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

             


            // Obtener la imagen del input de tipo file
            const file = createForm.photo.files[0];
            // Crear un objeto FormData y agregar la imagen a él
            const formData = new FormData();

            formData.append('ImageFile', file);
            formData.append('birthDate', e.target.birthDate.value);
            formData.append('weight', e.target.weight.value);
            formData.append('description', e.target.description.value);
            formData.append('sex', e.target.sex.value);
            formData.append("isAcquisition",e.target.isAcquisition.checked)
            
            kiloPrice = 0
            acquisitionCost = 0

            if(e.target.isAcquisition.checked){
                kiloPrice = e.target.kiloPrice.value
                acquisitionCost = e.target.acquisitionCost.value
            }
            
            formData.append("kiloPrice",kiloPrice)
            formData.append("acquisitionCost",acquisitionCost)

            btnRequest.style.display="none"
            loading.style.display = ""
            fetchRequest(urlSheep, { method: 'POST', body: formData,headers:{"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
                
                btnRequest.style.display=""
                loading.style.display = "none"
                if (error) {
                    showMessage("error","Mensaje","Ocurrió un error al registrar")
                    console.log(error);
                } else {
                    tds = createSheepTds(data.data)
                    table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`

                    requestImage(urlSheep + "GetImage/" + data.data.photo, function (error, dataImg) {
                        if (dataImg) {
                            const img = document.getElementById("img-" + data.data.id);
                            img.src = URL.createObjectURL(dataImg);
                        }
                    })

                    showMessage("success","Mensaje","Registro creado")
                    allSheeps.push(data.data)
                    createForm.reset()
                    e.target.kiloPrice.disabled = true
                    e.target.acquisitionCost.disabled = true
                    createForm.currentSelectedPhoto.src = ""
                }
            });

        })