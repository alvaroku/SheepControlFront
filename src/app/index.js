/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


function fetchRequest(url, options, callback) {
    fetch(url, options)
        .then(response => {
            
            if (!response.ok) {
                console.log(response.json())
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}
function requestImage(url,callback){
   
        fetch(url)
                        .then(response => response.blob())
                        .then(blob => callback(null, blob))
                        .catch(error =>callback(error, null));
 
}
function formatDate(fechaString,setHora) {
     
 
    let fecha = new Date(fechaString);

    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let anio = fecha.getFullYear().toString();
    let hora = fecha.getHours() % 12 || 12;
    let minutos = fecha.getMinutes().toString().padStart(2, '0');
    let segundos = fecha.getSeconds().toString().padStart(2, '0');
    let amPm = fecha.getHours() >= 12 ? 'PM' : 'AM';

    if(setHora){
       return fechaFormateada = `${parseInt(dia)+1}/${mes}/${anio} ${hora}:${minutos}:${segundos} ${amPm}`;
    }else{
        return fechaFormateada = `${parseInt(dia)+1}/${mes}/${anio}`;
    }
     

}
function navigate(page){
    location.href = location.href.replace(location.href.split("/")[location.href.split("/").length - 1], page+".html")
}
function findInArray(array,id){
    find =  array.find(function (elemento) {
        return elemento.id == id;
    });
    return find
}
function showMessage(type,title,message){
    switch (type) {
        case "success":
            iziToast.show({
                title: title,
                message: message,
                color: 'green',
                icon: 'fas fa-check',
                position: 'topRight',
                timeout: 3000
            });
            break;
        case "error":
            iziToast.show({
                title: title,
                message: message,
                color: 'red',
                icon: 'fas fa-times',
                position: 'topRight',
                timeout: 3000
            });
        default:
            break;
    }
    
}
function deleteToArray(array,id){
    array = array.filter(obj => obj.id !== id);
    return array
}