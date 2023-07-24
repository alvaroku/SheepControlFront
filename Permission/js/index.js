table = document.getElementById("permissionTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []
allControllers = []
allActions = []
objToUpdate = null

fetchRequest(urlPermission, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        table.innerHTML = ""
        document.getElementById("error").innerHTML = ""
        allData = data
        data.forEach(element => {
            tds = createPermissionTds(element)
            table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
        });
    }
});
fetchRequest(urlController, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        allControllers = data
        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            options += `<option value="${element.id}">${element.name}</option>`
        });
        createForm.controllerId.innerHTML = options  
        updateForm.controllerId.innerHTML = options  
    }
});
fetchRequest(urlAction, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        allActions = data
        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            options += `<option value="${element.id}">${element.name}</option>`
        });
        createForm.actionId.innerHTML = options  
        updateForm.actionId.innerHTML = options  
    }
});
function createPermissionTds(data) {
    creationDate = formatDate(data.creationDate,true)
    modificationDate = formatDate(data.modificationDate,true)

    auxActive = ""
    toggle = ""
    if(data.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
        toggle = `<input onclick="toggleActive(event,${data.id})" class="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault">`
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
        toggle = `<input onclick="toggleActive(event,${data.id})" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">`
    }
    tr = `<td>${data.id}</td> 
        <td>${data.clave}</td>  
        <td>${data.description}</td>
        <td>${data.controller.name}</td>
        <td>${data.action.name}</td>
        <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
            <button onclick="update(${data.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="Delete(${data.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                ${toggle}
            </div>
          </td>`
    return tr
}