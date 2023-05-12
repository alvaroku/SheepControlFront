createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    data = {
        applicationDate: createForm.applicationDate.value,
        vaccineId: createForm.vaccineId.value,
        doseApplied:""
    }
    fetchRequest(urlVaccineSheep+"ApplyVaccineToAllSheeps", { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
    ,"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            //allSheeps.push(data.data)
            createForm.reset()
            data.data.forEach(element => {
                tds = createVaccineSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
                allData.push(element)

        });
            
        }
    });

})