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
        applicationDate: e.target.applicationDate.value,
        doseApplied: e.target.doseApplied.value
    }
    console.log(data)
})