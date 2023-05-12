function Delete(id) {
    if (!confirm("Desea eliminar el registro?")) return
    fetchRequest(urlVaccineSheep + id, { method: 'DELETE' ,headers:{"Authorization": `Bearer ${getCookie("auth")}`}}, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Error al eliminar")
        } else {
            document.getElementById(id).remove();
            showMessage("success","Mensaje","Registro eliminado")
            allData = deleteToArray(allData,id)
        }
    });
}
function deleteAll(){
    if (!confirm("Desea eliminar todos registros?")) return
    fetchRequest(urlVaccineSheep + "DeleteAll", { method: 'DELETE' }, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Error al eliminar")
        } else {
            showMessage("success","Mensaje",data.message)
            allData = []
            table.innerHTML = ""
        }
    });
}