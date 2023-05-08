function Delete(id) {
    if (!confirm("Desea eliminar el registro?")) return
    fetchRequest(urlAction + id, { method: 'DELETE' }, function (error, data) {
        if (error) {
            showMessage("error","Mensaje","Error al eliminar")
        } else {
            document.getElementById(id).remove();
            showMessage("success","Mensaje","Registro eliminado")
            allData = deleteToArray(allData,id)
        }
    });
}