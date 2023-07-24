table = document.getElementById("saleSheepTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []
allSheeps = []
objectToUpdate = null
getAllSaleSheep()
function getAllSaleSheep(){
    fetchRequest(urlSheepHistoricWeight, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Error al cargar los datos")
            console.log(error);
        } else {
            table.innerHTML = ""
             
            allData = data.data
            data.data.forEach(element => {
                tds = createSaleSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
            });
        }
    });
}

//getSheeps
fetchRequest(urlSheep+"GetSheepsWithFinalWeight", { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        allSheeps = data

        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            if(!element.sold){
                options += `<option value="${element.id}">${element.id}</option>`
            }
        }); 
        createForm.sheepId.innerHTML = options
    }
});

function createSaleSheepTds(vaccineSheep) {
    creationDate = formatDate(vaccineSheep.creationDate,true)
    modificationDate = formatDate(vaccineSheep.modificationDate,true)
    WeighingDate = formatDate(vaccineSheep.weighingDate,false)
    auxActive = ""
    toggle = ""
    if(vaccineSheep.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
        toggle = `<input onclick="toggleActive(event,${vaccineSheep.id})" class="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault">`
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
        toggle = `<input onclick="toggleActive(event,${vaccineSheep.id})" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">`
    }
    tr = `<td>${vaccineSheep.id}</td> 
          <td>${vaccineSheep.sheepId}</td>
          <td>${vaccineSheep.previousWeight}Kg</td>
          <td>${vaccineSheep.newWeight}Kg</td>
          <td>${vaccineSheep.differenceWithPreviousWeight}Kg</td>
          <td>${WeighingDate}</td>
          <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
          
            <button class="btn btn-danger" onclick="Delete(${vaccineSheep.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                ${toggle}
            </div>
          </td>`
    return tr
}

 