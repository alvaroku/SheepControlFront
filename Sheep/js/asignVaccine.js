sheepIdToApplyVaccine = 0

asignVaccineForm.vaccineId.addEventListener("change",(e)=>{
    let currentVaccine = findInArray(allVaccines,asignVaccineForm.vaccineId.value)
    let currentSheep = findInArray(allSheeps,sheepIdToApplyVaccine)

    quantityVolume = currentVaccine.indicatedDose.split("/")[0].split("|")[0]
    unitVolume = currentVaccine.indicatedDose.split("/")[0].split("|")[1]
    
    quantityWeight = currentVaccine.indicatedDose.split("/")[1].split("|")[0]
         
    doseRecomended = (currentSheep.weight * quantityVolume) / quantityWeight

    asignVaccineForm.doseApplied.value = doseRecomended+""+unitVolume
})


function asignVaccine(sheepId){
    let currentVaccine = findInArray(allVaccines,asignVaccineForm.vaccineId.value)
    let currentSheep = findInArray(allSheeps,sheepId)

    sheepIdToApplyVaccine = sheepId

    quantityVolume = currentVaccine.indicatedDose.split("/")[0].split("|")[0]
    unitVolume = currentVaccine.indicatedDose.split("/")[0].split("|")[1]
    
    quantityWeight = currentVaccine.indicatedDose.split("/")[1].split("|")[0]
         
    doseRecomended = (currentSheep.weight * quantityVolume) / quantityWeight

    asignVaccineForm.doseApplied.value = doseRecomended+""+unitVolume
         //asignVaccineForm.doseApplied.value
        //findInArray
}

asignVaccineForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    data = {
        vaccineId: e.target.vaccineId.value,
        sheepId: sheepIdToApplyVaccine,
        applicationDate: e.target.applicationDate.value,
        doseApplied: ""
    }
    fetchRequest(urlVaccineSheep, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            console.log(data.data)
            asignVaccineForm.reset()
        }
    });
})