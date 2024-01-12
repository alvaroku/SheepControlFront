logout.addEventListener("click", ()=>{
    deleteCookie("auth")
    deleteInfoUSer()
})