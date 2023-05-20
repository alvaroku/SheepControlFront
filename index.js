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
                response.json().then(w=>{
                    if(w.title){
                      console.log(w.title)
                      showMessage("error","Error",w.title)
                    }
                    if(w.message){
                      console.log(w.message)
                      showMessage("error","Error",w.message)
                    }
                  })
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
       return fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos} ${amPm}`;
    }else{
        return fechaFormateada = `${dia}/${mes}/${anio}`;
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
function foliator(myString,lenght){
    myString = myString.padStart(lenght, '0');
    return myString
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
    
function setInfoUSer(user){
    userInfo.innerHTML = `
        ${user.email}
    `
}
function deleteInfoUSer(){
    userInfo.innerHTML = ""
    window.location.href = "/login.html"
}
verifyLogin()

function verifyLogin(){
    if(getCookie("auth")){
        data = {
            token:getCookie("auth")
        }
        fetchRequest(urlUser+"GetEmailFromToken", { method: 'POST', body: JSON.stringify(data) ,headers: {'Content-Type': 'application/json','Accept': 'application/json',"Authorization": `Bearer ${getCookie('auth')}`}}, function (error, data) {
            if (error) {
                // if(loginForm){
                //     loginForm.style.display = ""
                // }
                window.location = "/login.html"
            } else {
                if(data.data){
                    setInfoUSer(data.data)
                    console.log(data)
                    // if(loginForm){
                    //     loginForm.style.display = "none"
                    // }
                    //console.log(data)
                    //showMessage("success","Mensaje",`logueado como: ${data.data.email}`)
                }else{
                   // window.location = "/"
                   deleteCookie("auth")
                }
            }
        });
    }else{
        
    }
}
// logout.addEventListener("click", ()=>{
//     deleteCookie("auth")
//     deleteInfoUSer()
// })