table = document.getElementById("roleUserTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []
allUsers = []
allRoles = []
objToUpdate = null

fetchRequest(urlRoleUser, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        table.innerHTML = ""
        document.getElementById("error").innerHTML = ""
        allData = data
        data.forEach(element => {
            tds = createRoleUserTds(element)
            table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
        });
    }
});
fetchRequest(urlUser, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        document.getElementById("error").innerHTML = ""
        allUser = data
        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            options += `<option value="${element.id}">${element.name} ${element.lastName}</option>`
        });
        createForm.userId.innerHTML = options  
        updateForm.userId.innerHTML = options  
    }
});
fetchRequest(urlRole, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        document.getElementById("error").innerHTML = ""
        allRoles = data
        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            options += `<option value="${element.id}">${element.name}</option>`
        });
        createForm.roleId.innerHTML = options  
        updateForm.roleId.innerHTML = options  
    }
});
createForm.userId.addEventListener("change",(e)=>{
    selectElement = createForm.roleId
    selectElement.options[0].selected = false
    for (var i = 1; i < selectElement.options.length; i++) {
      option = selectElement.options[i];
      find =  allData.find(function (elemento) {
            return elemento.userId == e.target.value && elemento.roleId ==option.value ;
        });
        if(find != undefined){
            option.selected = true
        }else{
            option.selected = false
        }   
    }
})
function createRoleUserTds(data) {
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
        <td>${data.role.name}</td> 
        <td>${data.user.name} ${data.user.lastName}</td>
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