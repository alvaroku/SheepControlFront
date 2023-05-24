sheepIdToweigh = 0
function weigh(sheepId){
    weighForm.sheepId.value = sheepId
    sheepIdToweigh = sheepId
}


weighForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    data = {
        sheepId: sheepIdToweigh,
        weighingDate: e.target.weighingDate.value,
        newWeight: e.target.newWeight.value
    }
     
    fetchRequest(urlSheepHistoricWeight, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje","Registro creado")
            console.log(data.data)
            sheepIdToweigh = 0
            weighForm.reset()
        }
    });
})