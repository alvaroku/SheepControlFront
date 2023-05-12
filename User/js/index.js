table = document.getElementById("userTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []
objToUpdate = null
fetchRequest(urlUser, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        table.innerHTML = ""
        document.getElementById("error").innerHTML = ""
        allData = data
        data.forEach(element => {
            tds = createUserTds(element)
            table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
        });
    }
});
// fetchRequest(urlPermission, { method: 'GET' }, function (error, data) {
//     if (error) {
//         showMessage("error","Mensaje","Error al cargar los datos")
//         console.log(error);
//     } else {
//         table.innerHTML = ""
//         document.getElementById("error").innerHTML = ""
//         allControllers = data
//         options = ""
//         options += `<option disabled selected value="0">Seleccione un dato</option>`
//         data.forEach(element => {
//             options += `<option value="${element.id}">${element.name}</option>`
//         });
//         //createForm.controllerId.innerHTML = options  
//         //updateForm.controllerId.innerHTML = options  
//     }
// });
function createUserTds(data) {
    creationDate = formatDate(data.creationDate,true)
    modificationDate = formatDate(data.modificationDate,true)
    birthDate = formatDate(data.birthDate,false)
    auxActive = ""
    if(data.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
    }
    tr = `<td>${data.id}</td> 
        <td>${data.name}</td>   
        <td>${data.lastName}</td>
        <td>${birthDate}</td>
        <td>${data.phoneNumber}</td>
        <td>${data.email}</td>
        <td>${data.password}</td>
        <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
            <button onclick="update(${data.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="Delete(${data.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            </div>
          </td>`
    return tr
}