function getCookie(name){

    const nombreCookie = name;
    const cookies = document.cookie.split(";");
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
    
      // Verificamos si la cookie comienza con el nombre buscado
      if (cookie.startsWith(`${nombreCookie}=`)) {
        // Obtenemos el valor de la cookie
        const valorCookie = cookie.substring(nombreCookie.length + 1);
        return valorCookie
      }
    }
    
    }

    function deleteCookie(nombreCookie){
        document.cookie = nombreCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.location = "/"
    }