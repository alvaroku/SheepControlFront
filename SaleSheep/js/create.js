createForm.addEventListener("submit", (e) => {
    e.preventDefault()

    selectElement = createForm.sheepId
    selectedValues = [];
    for (var i = 1; i < selectElement.options.length; i++) {
      option = selectElement.options[i];
      if (option.selected) {
        selectedValues.push(parseInt(option.value));
      }
    }
    data = {
        sheepIds:selectedValues,
        kiloPrice:e.target.kiloPrice.value,
        totalCharged:0,
        saleProfit: 0,
        saleDate: createForm.saleDate.value,
    }
    btnRequest.style.display="none"
            loading.style.display = ""
    fetchRequest(urlSaleSheep, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json'
    ,"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        btnRequest.style.display=""
                loading.style.display = "none"
        if (error) {
            //showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            //allSheeps.push(data.data)
            getSheeps()
            createForm.reset()
            createForm.sheepId.disabled = true
            createForm.checkAll.disabled = true
            vaccineResume.innerHTML = ""
            data.data.forEach(element => {
                tds = createSaleSheepTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</tr>`
                allData.push(element)
        });
            
        }
    });

})