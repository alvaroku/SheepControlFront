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

    const file = createForm.photo.files[0];

    // Crear un objeto FormData y agregar la imagen a él
    const formData = new FormData();

    formData.append('imageFile', file);
    formData.append('name', e.target.name.value);
    formData.append('lastName', e.target.lastName.value);
    formData.append('phoneNumber', e.target.phoneNumber.value);
    formData.append('email', e.target.email.value);
    formData.append('birthDate', e.target.birthDate.value);
    formData.append('photo',user.photo);
    
    btnRequest.style.display="none"
    loading.style.display = ""

    fetchRequest(urlUser+"UpdateProfile/" + user.id, { method: 'PUT', body: formData,headers:{"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
        btnRequest.style.display=""
        loading.style.display = "none"
        if (error) {
            showMessage("error","Mensaje","Error al actualizar")
            console.log(error);
        } else {
            createForm.reset()
            currentSelectedPhoto.src = ""
            showMessage("success","Mensaje","Datos actualizados")

            user = data.data
            document.getElementById("name").textContent = user.name + " " + user.lastName 
            document.getElementById("email").textContent = user.email
            document.getElementById("phoneNumber").textContent = user.phoneNumber
            document.getElementById("birthDate").textContent =  formatDate(user.birthDate,false)
            document.getElementById("creationDate").textContent = "Registrado el "+ formatDate(user.creationDate,false)
            if(user.photo){
                profile.src = urlUser+"GetImage/"+user.photo 
            }
        }
    });

})