createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    selectElement = createForm.roleId
    selectedValues = [];
    for (var i = 1; i < selectElement.options.length; i++) {
      option = selectElement.options[i];
      if (option.selected) {
        selectedValues.push(parseInt(option.value));
      }
    }
    data = {
        userId:createForm.userId.value,
        roleIds:selectedValues
    }

    fetchRequest(urlRoleUser, { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Ocurrió un error al registrar")
            console.log(error);
        } else {
            showMessage("success","Mensaje",data.message)
            elementsForDelete = allData.filter(element => element.userId == createForm.userId.value );
            elementsForDelete.forEach(element => {
                document.getElementById(element.id).remove();
            });

            data.data.forEach(element => {
                tds = createRoleUserTds(element)
                table.innerHTML += `<tr id="${element.id}">${tds}</td>`
            }); 

            allData = allData.filter(element => element.userId != createForm.userId.value );
            allData = allData.concat(data.data);
            
            createForm.reset()

        }
    });

})