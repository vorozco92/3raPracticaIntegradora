const form =document.getElementById('loginForm')

form.addEventListener('submit', e =>{
    e.preventDefault();

    const data= new FormData(form);
    const obj={}
    data.forEach((value,key)=>obj[key]=value);

    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/api/products/')
        }
        else{
            Swal.fire({
                'title': 'El correo y/o la contraseña son incorrectos.',
                'icon' : 'error'
            });
        }

        
    }).catch(error => {

        console.error('Error en la solicitud:', error.message);
    
        Swal.fire({
    
          title: 'Ocurrió un error al procesar la solicitud.',
    
          icon: 'error'
    
        });
    
      });


})