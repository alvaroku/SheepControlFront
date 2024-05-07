table = document.getElementById("saleSheepTable")
updateForm = document.getElementById("updateForm")
createForm = document.getElementById("createForm")
allData = []
allSheeps = []
objToUpdate = null
totalToCharge = 0
filterCriteriaForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    _startDate = e.target.startDate.value
    _finishDate = e.target.finishDate.value
    // vaccineId = e.target.vaccineId.value
    // sheepId = e.target.sheepId.value

    if(!finishDate || !startDate){
        showMessage("error","Error","Seleccione el rango de fechas")
        return
    }
    objeto = {
        startDate:_startDate,
        finishDate:_finishDate,
        //sheepId:sheepId,
        //vaccineId:vaccineId
    }
    newUrl = urlSaleSheep+"GetWithFilters"
    fetchRequest(newUrl, { method: 'POST', body: JSON.stringify(objeto) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Error al cargar los datos")
            console.log(error);
        } else {
            totalToCharge = 0
            table.innerHTML = ""
            document.getElementById("error").innerHTML = ""
            allData = data.data
            data.data.forEach(element => {
                totalToCharge+=element.totalCharged
                tds = createSaleSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
            });
            document.getElementById("totalToCharge").innerHTML = `<div class="alert alert-primary" role="alert">
            Total de venta: $${totalToCharge}
          </div>`
        }
    });
})
cleanFilters.addEventListener("click",(e)=>{
    filterCriteriaForm.reset()
    getAllSaleSheep()
    e.preventDefault()
})
getAllSaleSheep()
function getAllSaleSheep(){
    fetchRequest(urlSaleSheep, { method: 'GET' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Error al cargar los datos")
            console.log(error);
        } else {
            totalToCharge = 0
            saleProfit = 0
            table.innerHTML = ""
            document.getElementById("error").innerHTML = ""
            allData = data.data
            data.data.forEach(element => {
                totalToCharge+=element.totalCharged
                saleProfit+=element.saleProfit
                tds = createSaleSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
            });
            document.getElementById("totalToCharge").innerHTML = 
            `<div class="alert alert-primary" role="alert">
                <p>Total de venta: $${totalToCharge}</p>
                <p>Total de ganancia: $${saleProfit}</p>
            </div>`
        }
    });
}
getSheeps()
//getSheeps
function getSheeps(){
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
            updateForm.sheepId.innerHTML = options
        }
    });
}
createForm.kiloPrice.addEventListener('keyup',(e)=>{
    checkAll.disabled = false
    createForm.sheepId.disabled = false

    selectElement = createForm.sheepId
    // selectElement.options[0].selected=false
    selectedValues = [];
    for (var i = 1; i < selectElement.options.length; i++) {
      option = selectElement.options[i];
      if (option.selected) {
        selectedValues.push(parseInt(option.value));
      }
    }
    if(selectedValues.length>0 && parseFloat(e.target.value)){
        vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeSale(selectedValues,e.target.value)}</p>`
    }else{
        // vaccineResume.innerHTML = ""
        // selectElement.options[0].selected=true
    }

})
createForm.kiloPrice.addEventListener('change',(e)=>{
    checkAll.disabled = false
    createForm.sheepId.disabled = false

    selectElement = createForm.sheepId
    // selectElement.options[0].selected=false
    selectedValues = [];
    for (var i = 1; i < selectElement.options.length; i++) {
      option = selectElement.options[i];
      if (option.selected) {
        selectedValues.push(parseInt(option.value));
      }
    }
    if(selectedValues.length>0 && parseFloat(e.target.value)){
        vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeSale(selectedValues,e.target.value)}</p>`
    }else{
        // vaccineResume.innerHTML = ""
        // selectElement.options[0].selected=true
    }

})
createForm.checkAll.addEventListener('change',(e)=>{
    selectElement = createForm.sheepId
    selectedValues = [];
    if(e.target.checked){
        selectElement.options[0].selected = false;
        for (var i = 1; i < selectElement.options.length; i++) {
            option = selectElement.options[i];  
            option.selected = true
            selectedValues.push(parseInt(option.value));
        }
        vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeSale(selectedValues,createForm.kiloPrice.value)}</p>`
    }else{
        selectElement.options[0].selected = true;
        for (var i = 1; i < selectElement.options.length; i++) {
            option = selectElement.options[i];  
            option.selected = false
        }
        vaccineResume.innerHTML = ""
    }
})
createForm.sheepId.addEventListener('change',(e)=>{
    selectElement = createForm.sheepId
    selectElement.options[0].selected=false
    selectedValues = [];
    for (var i = 1; i < selectElement.options.length; i++) {
      option = selectElement.options[i];
      if (option.selected) {
        selectedValues.push(parseInt(option.value));
      }
    }
    if(selectedValues.length == allSheeps.length){checkAll.checked=true}else{checkAll.checked=false}
    if(selectedValues.length>0){
        vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeSale(selectedValues,createForm.kiloPrice.value)}</p>`
    }else{
        vaccineResume.innerHTML = ""
        selectElement.options[0].selected=true
    }
})
// btnApplyVaccineToAllSheeps.addEventListener('click',(e)=>{
//     //vaccineResume.innerHTML = `<p class="alert alert-primary">${getResumeSale()}</p>`
// })
 function clearResume(){
    selectElement = createForm.sheepId
    vaccineResume.innerHTML = ``
    selectElement.options[0].selected = true;
        for (var i = 1; i < selectElement.options.length; i++) {
            option = selectElement.options[i];  
            option.selected = false
        }
        checkAll.checked = false
 }

function getResumeSale(sheepIds,kiloPrice){
    total = 0
    cadena = ""
    sheepIds.forEach(element => {

        sheep = findInArray(allSheeps,element)
        totalCharged = parseFloat(kiloPrice) * parseFloat(sheep.weight)
        total+=totalCharged
        cadena += `Carnero ${foliator(sheep.id+"",lengthFolio)}(${sheep.weight}Kg) -> $${kiloPrice} = $${totalCharged}<br>`
    });
    return cadena+"==============<br>Total = $"+total
}
function calculateTotalCharged(kiloPrice,weight){
    return kiloPrice * weight
}
 
function createSaleSheepTds(vaccineSheep) {
    creationDate = formatDate(vaccineSheep.creationDate,true)
    modificationDate = formatDate(vaccineSheep.modificationDate,true)
    saleDate  = formatDate(vaccineSheep.saleDate,false)
    birthDate = formatDate(vaccineSheep.sheep.birthDate,false)
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
          <td>${vaccineSheep.sheep.id}</td>
          <td>${(vaccineSheep.sheep.isAcquisition)?"Sí":"No"}</td>
          <td>${birthDate}</td>
          <td>${vaccineSheep.sheep.weight}Kg</td>
          <td>${(vaccineSheep.sheep.isAcquisition)?"$"+vaccineSheep.sheep.kiloPrice:"NA"}</td>
          <td>${(vaccineSheep.sheep.isAcquisition)?"$"+vaccineSheep.sheep.acquisitionCost:"NA"}</td>
          
          <td>$${vaccineSheep.kiloPrice}</td>
          <td>$${vaccineSheep.totalCharged}</td>
          <td>$${vaccineSheep.saleProfit}</td>
          <td>${saleDate}</td>
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
}//            <button onclick="update(${vaccineSheep.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i class="fas fa-edit"></i></button>

 