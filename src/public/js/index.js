
const socket = io();

let user;
let chatBox = document.getElementById("chatBox");
/*Swal.fire({
    'title': 'Ingresa por favor tu correo:',
    'input' : 'email',
    validationMessage:  "Se requiere un correo para continuar",
    allowOutsideClick: false,
    'icon' : 'success'
}).then((result)=>{
    user = result.value;
    socket.emit("newUser",{user});
});
*/
chatBox.addEventListener("keyup",(evt)=>{
    if (evt.key === "Enter"){
        if (chatBox.value.trim().length > 0){
            console.log('user:'+user);
            socket.emit("message",{user:user, message:chatBox.value});
            chatBox.value ="";
        }
    }
    return;
});

socket.on('messagesLogs',data=>{
    let log =document.getElementById('messageLogs');
    let messages = "";
    console.log(data)
    data.forEach(log=>{
        messages = messages + `<b>${log.user} </b>: ${log.message}<br/>`
    })
    log.innerHTML=messages;
})

socket.on('newUserFront',data=>{
    if (user === data.user) return;
    Swal.fire({
        'text' : 'Nuevo usuario conectado: '+ data.user,
        toast: true,
        'position' :'top-right'
    })
})
/**
 * 
 * const socket=io();

const input  = document.getElementById('textbox');
const log = document.getElementById('log');
input.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        socket.emit('message',input.value);
        input.value=""
    }
})
socket.on('log',data=>{
    let logs='';
    data.logs.forEach(log=>{
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML=logs;
})
 

const form =document.getElementsByClassName('addForm')

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
            window.location.replace('/')
        }
    })
})
*/