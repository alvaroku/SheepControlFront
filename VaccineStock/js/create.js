
        createForm.addEventListener("submit", (e) => {
            e.preventDefault()

            objeto = {
                acquisitionDate:e.target.acquisitionDate.value,
                vaccineId: e.target.vaccineId.value,
                netContent: e.target.netContent.value,
                unities: e.target.unities.value,
                unitPrice: e.target.unitPrice.value,
                acquisitionCost: e.target.acquisitionCost.value
              }
              btnRequest.style.display="none"
              loading.style.display = ""
            fetchRequest(urlVaccineStock, { method: 'POST', body:JSON.stringify(objeto),headers:{'Content-Type': 'application/json','Accept': 'application/json'
            ,"Authorization": `Bearer ${getCookie('auth')}`} }, function (error, data) {
                btnRequest.style.display=""
                loading.style.display = "none"
                if (error) {
                    showMessage("error","Mensaje","Ocurrió un error al registrar")
                    console.log(error)
                } else {
                    tds = createVaccineTds(data.data)
                    table.innerHTML += `<tr id="${data.data.id}">${tds}</td>`

                    showMessage("success","Mensaje","Registro creado")
                    allData.push(data.data)
                    createForm.reset()
                }
            });

        })