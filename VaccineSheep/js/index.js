table = document.getElementById("vaccineSheepTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []

allSheeps = []
allVaccines = []
objToUpdate = null

filterCriteriaForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    startDate = e.target.startDate.value
    finishDate = e.target.finishDate.value
    vaccineId = e.target.vaccineId.value
    sheepId = e.target.sheepId.value
    if(!finishDate || !startDate){
        showMessage("error","Error","Seleccione el rango de fechas")
        return
    }
    objeto = {
        startDate:startDate,
        finishDate:finishDate,
        sheepId:sheepId,
        vaccineId:vaccineId
    }
    newUrl = urlVaccineSheep+"GetVaccineSheepWithFilters"
    fetchRequest(newUrl, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Error al cargar los datos")
            console.log(error);
        } else {
            table.innerHTML = ""
            document.getElementById("error").innerHTML = ""
            allData = data
            data.forEach(element => {
                tds = createVaccineSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
            });
        }
    });
})
cleanFilters.addEventListener("click",(e)=>{
    filterCriteriaForm.reset()
    getAllVaccineSheep()
    e.preventDefault()
})
getAllVaccineSheep()
function getAllVaccineSheep(){
    fetchRequest(urlVaccineSheep, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Error al cargar los datos")
            console.log(error);
        } else {
            table.innerHTML = ""
            document.getElementById("error").innerHTML = ""
            allData = data
            data.forEach(element => {
                tds = createVaccineSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
            });
        }
    });
}
//getVaccines
fetchRequest(urlVaccine, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        allVaccines = data
        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            indicatedDose = getIndicatedDoseString(element.indicatedDose)

            options += `<option value="${element.id}">${element.name}. (${indicatedDose})</option>`
        });
        createForm.vaccineId.innerHTML = options  
        filterCriteriaForm.vaccineId.innerHTML = options
    }
});
//getSheeps
fetchRequest(urlSheep, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        allSheeps = data

        options = ""
        options += `<option disabled selected value="0">Seleccione un dato</option>`
        data.forEach(element => {
            options += `<option value="${element.id}">${element.id}</option>`
        }); 
        filterCriteriaForm.sheepId.innerHTML = options
    }
});
createForm.vaccineId.addEventListener('change',(e)=>{
    vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeVaccines()}</p>`
})
btnApplyVaccineToAllSheeps.addEventListener('click',(e)=>{
    vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeVaccines()}</p>`
})
 function clearResume(){
    vaccineResume.innerHTML = ``
 }

function getResumeVaccines(){
    currentVaccineId = createForm.vaccineId.value
    currentVaccine = findInArray(allVaccines,currentVaccineId)
    cadena = ""
    allSheeps.forEach(element => {
        //console.log(element)
        appliedDose = calculateDoseRecomended(currentVaccine.indicatedDose,element.weight)
        cadena += `Carnero ${foliator(element.id+"",lengthFolio)}(${element.weight}Kg) -> ${appliedDose} <br>`
    });
    return cadena
}
function calculateDoseRecomended(indicatedDose,weight){
    quantityVolume = indicatedDose.split("/")[0].split("|")[0]
    unitVolume = indicatedDose.split("/")[0].split("|")[1]
    
    quantityWeight = indicatedDose.split("/")[1].split("|")[0]
         
    doseRecomended = (weight * quantityVolume) / quantityWeight

    return doseRecomended+""+unitVolume
}
function getIndicatedDoseString(indicatedDose){
    quantityVolume = indicatedDose.split("/")[0].split("|")[0]
    unitVolume = indicatedDose.split("/")[0].split("|")[1]

    quantityWeight = indicatedDose.split("/")[1].split("|")[0]
    unitWeight = indicatedDose.split("/")[1].split("|")[1]

    indicatedDoseString = `${quantityVolume+" "+unitVolume} por cada ${quantityWeight+" "+unitWeight}`
    return indicatedDoseString
}

function createVaccineSheepTds(vaccineSheep) {
    creationDate = formatDate(vaccineSheep.creationDate,true)
    modificationDate = formatDate(vaccineSheep.modificationDate,true)
    applicationDate  = formatDate(vaccineSheep.applicationDate,false)
    quantityVolume = vaccineSheep.vaccine.indicatedDose.split("/")[0].split("|")[0]
    unitVolume = vaccineSheep.vaccine.indicatedDose.split("/")[0].split("|")[1]

    quantityWeight = vaccineSheep.vaccine.indicatedDose.split("/")[1].split("|")[0]
    unitWeight = vaccineSheep.vaccine.indicatedDose.split("/")[1].split("|")[1]

    indicatedDose = `${quantityVolume+" "+unitVolume} por cada ${quantityWeight+" "+unitWeight}`

    auxActive = ""
    if(vaccineSheep.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
    }
    tr = `<td>${vaccineSheep.id}</td> 
          <td>${vaccineSheep.sheep.description}</td>
          <td>${vaccineSheep.sheep.weight}Kg</td>
          <td>${vaccineSheep.vaccine.name}</td>
          <td>${indicatedDose}</td>
          <td>${vaccineSheep.doseApplied}</td>
          <td>${applicationDate}</td>
          <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
            <button onclick="update(${vaccineSheep.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="Delete(${vaccineSheep.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            </div>
          </td>`
    return tr
}