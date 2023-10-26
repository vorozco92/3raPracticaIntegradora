const form =document.getElementById('resetForm')

form.addEventListener('submit', e =>{
    e.preventDefault();

    const data= new FormData(form);
    const obj={}
    data.forEach((value,key)=>obj[key]=value);

    fetch('/api/sessions/reset',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            alert('Contraseña se reseteo correctamente.')
        }
        else if (result.status===400){
            alert('El correo no existe.')
        }
        else{
            alert('Sucedio un error inesperado.')
        }
        console.log(result)
        
    }).catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
})