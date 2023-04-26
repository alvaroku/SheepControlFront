////////////////////////////////////SheepTable/////////////////////////////////////////////
table = document.getElementById("sheepTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
asignVaccineForm = document.getElementById("asignVaccineForm")
allSheeps = []
allVaccines = []
objToUpdate = null

fetchRequest(urlSheep, { method: 'GET' }, function (error, data) {
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
fetchRequest(urlVaccine, { method: 'GET' }, function (error, data) {
    if (error) {
        showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        allVaccines = data
        options = ""
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
    if(sheep.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
    }
    tr = `<td>${sheep.id}</td> 
          <td>${sheep.description}</td>
          <td>${sheep.weight}Kg</td>
          <td>${sheep.sex}</td>
          <td ><img width='100px' class="img" id="img-${sheep.id}" /> </td>
          <td>${birthDate}</td>
          <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
          <button onclick="asignVaccine(${sheep.id})" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal3"><i class="fas fa-syringe"></i></button>
            <button onclick="update(${sheep.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="Delete(${sheep.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
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