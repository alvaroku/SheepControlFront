////////////////////////////////////SheepTable/////////////////////////////////////////////
table = document.getElementById("sheepTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
asignVaccineForm = document.getElementById("asignVaccineForm")
allSheeps = []
allVaccines = []
objToUpdate = null

fetchRequest(urlSheep, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        document.getElementById("error").innerHTML = ""
        allSheeps = data
        data.forEach(element => {
            tds = createSheepTds(element)

            table.innerHTML += `<tr id="${element.id}">${tds}</tr>`

            requestImage(urlSheep + "GetImage/" + element.photo, function (error, data) {
                if (data) {
                    img = document.getElementById('img-' + element.id);
                    img.src = URL.createObjectURL(data);
                }
            })


        });
    }
});
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
        asignVaccineForm.vaccineId.innerHTML = options  
    }
});

/////////Extras///////////

function createSheepTds(sheep) {
    creationDate = formatDate(sheep.creationDate,true)
    modificationDate = formatDate(sheep.modificationDate,true)
    birthDate = formatDate(sheep.birthDate,false)
    auxActive = ""
    toggle = ""
    if(sheep.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
        toggle = `<input onclick="toggleActive(event,${sheep.id})" class="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault">`
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
        toggle = `<input onclick="toggleActive(event,${sheep.id})" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">`
    }
    auxVendido = ""
    if(sheep.sold){
        auxVendido = '<span class="badge rounded-pill bg-success">Sí</span>'
    }else{
        auxVendido = '<span class="badge rounded-pill bg-secondary">No</span>'
    }
    tr = `<td>${sheep.id}</td> 
          <td>${sheep.description}</td>
          <td>${sheep.weight}Kg</td>
          <td>${sheep.sex}</td>
          <td ><img width='100px' class="img" id="img-${sheep.id}" /> </td>
          <td>${(sheep.isAcquisition)?"Sí":"No"}</td>
          <td>${birthDate}</td>
          <td>${(sheep.isAcquisition)?"$"+sheep.kiloPrice:"NA"}</td>
          <td>${(sheep.isAcquisition)?"$"+sheep.acquisitionCost:"NA"}</td>
          <td>${auxVendido}</td>
          <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
          <button onclick="weigh(${sheep.id})" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal4"><i class="fas fa-balance-scale"></i></button>
            <button onclick="update(${sheep.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="Delete(${sheep.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                ${toggle}
            </div>
          </td>`
    return tr
}
//getIndicatedDose
function getIndicatedDoseString(indicatedDose){
    quantityVolume = indicatedDose.split("/")[0].split("|")[0]
    unitVolume = indicatedDose.split("/")[0].split("|")[1]

    quantityWeight = indicatedDose.split("/")[1].split("|")[0]
    unitWeight = indicatedDose.split("/")[1].split("|")[1]

    indicatedDoseString = `${quantityVolume+" "+unitVolume} por cada ${quantityWeight+" "+unitWeight}`
    return indicatedDoseString
}

createForm.isAcquisition.addEventListener("click",(e)=>{
    if(e.target.checked){
        createForm.kiloPrice.disabled = false
        createForm.acquisitionCost.disabled = false
    }else{
        createForm.kiloPrice.disabled = true
        createForm.acquisitionCost.disabled = true
        createForm.kiloPrice.value = ""
        createForm.acquisitionCost.value = ""
    }
})
createForm.kiloPrice.addEventListener("change",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.weight.value)){
        createForm.acquisitionCost.value = createForm.kiloPrice.value * createForm.weight.value
    }
})
createForm.kiloPrice.addEventListener("keyup",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.weight.value)){
        createForm.acquisitionCost.value = createForm.kiloPrice.value * createForm.weight.value
    }
})

createForm.weight.addEventListener("change",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.kiloPrice.value)){
        createForm.acquisitionCost.value = createForm.kiloPrice.value * createForm.weight.value
    }
})
createForm.weight.addEventListener("keyup",(e)=>{
    if(createForm.isAcquisition.checked){
        if(parseFloat(e.target.value) && parseFloat(createForm.kiloPrice.value)){
            createForm.acquisitionCost.value = createForm.kiloPrice.value * createForm.weight.value
        }
    }
})
