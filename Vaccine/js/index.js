////////////////////////////////////SheepTable/////////////////////////////////////////////
table = document.getElementById("sheepTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []

objToUpdate = null

fetchRequest(urlVaccine, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
    if (error) {
        //showMessage("error","Mensaje","Error al cargar los datos")
        console.log(error);
    } else {
        document.getElementById("error").innerHTML = ""
        allData = data
        data.forEach(element => {
            tds = createVaccineTds(element)

            table.innerHTML += `<tr id="${element.id}">${tds}</tr>`

            // requestImage(urlVaccine + "GetImage/" + element.photo, function (error, data) {
            //     if (data) {
            //         img = document.getElementById('img-' + element.id);
            //         img.src = URL.createObjectURL(data);
            //     }
            // })


        });
    }
});


/////////Extras///////////

function createVaccineTds(vaccine) {
    creationDate = formatDate(vaccine.creationDate,true)
    modificationDate = formatDate(vaccine.modificationDate,true)

    quantityVolume = vaccine.indicatedDose.split("/")[0].split("|")[0]
    unitVolume = vaccine.indicatedDose.split("/")[0].split("|")[1]

    quantityWeight = vaccine.indicatedDose.split("/")[1].split("|")[0]
    unitWeight = vaccine.indicatedDose.split("/")[1].split("|")[1]

    indicatedDose = `${quantityVolume+" "+unitVolume} por cada ${quantityWeight+" "+unitWeight}`

    auxActive = ""
    toggle = ""
    if(vaccine.active){
        auxActive = '<span class="badge rounded-pill bg-success">Activo</span>'
        toggle = `<input onclick="toggleActive(event,${vaccine.id})" class="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault">`
    }else{
        auxActive = '<span class="badge rounded-pill bg-secondary">Inactivo</span>'
        toggle = `<input onclick="toggleActive(event,${vaccine.id})" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">`
    }
    tr = `<td>${vaccine.id}</td> 
          <td>${vaccine.observations}</td>
          <td>${vaccine.name}</td>
          <td>${indicatedDose}</td>
          <td ><img width='100px' class="img" id="img-${vaccine.id}" src='${urlVaccine+"getImage/"+vaccine.photo}' /> </td>
          
          <td>${creationDate}</td>
          <td>${modificationDate}</td>
          <td>${auxActive}</td>
          <td>
            <button onclick="update(${vaccine.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger" onclick="Delete(${vaccine.id})"><i class="fas fa-trash-alt"></i></button>
            <div class="form-check form-switch">
                ${toggle}
            </div>
          </td>`
    return tr
    // <td>${vaccine.netContent}ml</td>
    //       <td>${vaccine.unities}</td>
    //       <td>$${vaccine.unitPrice}</td>
    //       <td>$${vaccine.acquisitionCost}</td>
}


createForm.unitPrice.addEventListener("change",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.unities.value)){
        createForm.acquisitionCost.value = createForm.unitPrice.value * createForm.unities.value
    }
})
createForm.unitPrice.addEventListener("keyup",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.unities.value)){
        createForm.acquisitionCost.value = createForm.unitPrice.value * createForm.unities.value
    }
})

createForm.unities.addEventListener("change",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.unitPrice.value)){
        createForm.acquisitionCost.value = createForm.unitPrice.value * createForm.unities.value
    }
})
createForm.unities.addEventListener("keyup",(e)=>{
    if(parseFloat(e.target.value) && parseFloat(createForm.unitPrice.value)){
        createForm.acquisitionCost.value = createForm.unitPrice.value * createForm.unities.value
    }
})