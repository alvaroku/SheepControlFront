function Delete(id) {
    if (!confirm("Desea eliminar el registro?")) return
    fetchRequest(urlSaleSheep + id, { method: 'DELETE' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Error al eliminar")
        } else {
            elementToDelete = findInArray(allData,id)
            if(totalToCharge>0){
                totalToCharge-=elementToDelete.totalCharged
                document.getElementById("totalToCharge").innerHTML = `<div class="alert alert-primary" role="alert">
            Total a cobrar: $${totalToCharge}
          </div>`
            }
            document.getElementById(id).remove();
            showMessage("success","Mensaje",data.message)
            allData = deleteToArray(allData,id)
            getSheeps()
        }
    });
}
function deleteAll(){
    if (!confirm("Desea eliminar todos registros?")) return
    fetchRequest(urlSaleSheep + "DeleteAll", { method: 'DELETE' }, function (error, data) {
        if (error) {
            //showMessage("error","Mensaje","Error al eliminar")
        } else {
            showMessage("success","Mensaje",data.message)
            allData = []
            table.innerHTML = ""
        }
    });
}