////////////////SheepUpdate///////////////
function update(id) {
    objToUpdate = findInArray(allData,id)
      
    updateForm.saleDate.value = objToUpdate.saleDate.substring(0, 10)
    updateForm.kiloPrice.value = objToUpdate.kiloPrice
    updateForm.sheepId.value = objToUpdate.sheepId

    updateResume.innerHTML = `<p class="alert alert-primary">${getResumeSale([objToUpdate.sheepId],updateForm.kiloPrice.value)}</p>`
}
updateForm.kiloPrice.addEventListener('keyup',(e)=>{
    updateResume.innerHTML = `<p class="alert alert-primary">${getResumeSale([objToUpdate.sheepId],e.target.value)}</p>`

})
updateForm.kiloPrice.addEventListener('change',(e)=>{
    updateResume.innerHTML = `<p class="alert alert-primary">${getResumeSale([objToUpdate.sheepId],e.target.value)}</p>`
})
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault()

            data = {
                sheepId:e.target.sheepId.value,
                kiloPrice:e.target.kiloPrice.value,
                totalCharged:0,
                saleProfit: 0,
                saleDate: e.target.saleDate.value,
            }
            btnRequest1.style.display="none"
            loading1.style.display = ""
            fetchRequest(urlSaleSheep + objToUpdate.id, { method: 'PUT', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
            ,"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                btnRequest1.style.display=""
                loading1.style.display = "none"
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    console.log(error);
                } else {
                    tr = document.getElementById(data.data.id)

                    tr.innerHTML = createSaleSheepTds(data.data)
                    
                    objToUpdate = null
                    updateForm.reset()
                    updateResume.innerHTML = ""
                    showMessage("success","Mensaje","Registro actualizado")

                    let index = allData.findIndex(obj => obj.id === data.data.id); // busca el objeto con id 3 y devuelve su posición en el array

                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = data.data; // asigna el nuevo objeto en su posición
                    }

                    //document.querySelector('#exampleModal2').classList.remove('show');
                    //document.querySelector('.modal-backdrop').remove();

                }
            });

        })
        function toggleActive(event,id){

            console.log(id)
            fetchRequest(urlSaleSheep+"toggleActive/" + id, {headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
                if (error) {
                    showMessage("error","Mensaje","Error al actualizar")
                    event.preventDefault()
                } else {
                    tr = document.getElementById(id)
                    
                    dataToogle = findInArray(allData,id)
                    dataToogle.active = data.data
        
                    tr.innerHTML = createSaleSheepTds(dataToogle)
        
                    let index = allData.findIndex(obj => obj.id === id); // busca el objeto con id 3 y devuelve su posición en el array
        
                    if (index !== -1) { // si el objeto se encontró en el array
                        allData[index] = dataToogle; // asigna el nuevo objeto en su posición
                    }
        
                    showMessage("success","Mensaje","Registro actualizado")
        
                }
            });
            
        }