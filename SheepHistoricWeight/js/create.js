createForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    if(e.target.sheepId.value == 0){
        showMessage("error","Captura de datos","Debe seleccionar un carnero.")
        return
    }
    data = {
        sheepId: e.target.sheepId.value,
        weighingDate: e.target.weighingDate.value,
        newWeight: e.target.newWeight.value
    }
    btnRequest.style.display="none"
    loading.style.display = ""


    fetchRequest(urlSheepHistoricWeight, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        btnRequest.style.display=""
        loading.style.display = "none"
        if (error) {
            //showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            tds = createSaleSheepTds(data.data)
            table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`
            allData.push(data.data)
            createForm.reset()
            
            
        }
    });
})