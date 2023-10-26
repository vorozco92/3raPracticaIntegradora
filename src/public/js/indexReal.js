
const socket = io();
console.log('Iniciando conexión');
socket.emit("message","Me escuchais?")

socket.on('update_data', data =>{
    console.log(data);
    addProduct(data);
})

socket.on('delete_product', data =>{
    console.log('delete_product:'+data);
    let table  = document.getElementById('listTable');
    let row = document.getElementById('rowNo'+data);
    if (row)
        table.deleteRow(row.rowIndex);  
})

addProduct=(data)=>{
    let table  = document.getElementById('listTable').getElementsByTagName('tbody')[0];
    addRow(table, data.id, data.product);
}

addRow=(table, id, data)=>{
    let row = table.insertRow();
    row.setAttribute("id","rowNo"+id);

    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
        if (key != '_id' && key != '__v'){
            let cell = row.insertCell();
            // Append a text node to the cell
            let text = document.createTextNode(value);
            if (key === "status"){
                if (value){
                    text = document.createTextNode("Activo");
                    cell.setAttribute("class","green");
                }
                else{ 
                    text = document.createTextNode("Inactivo");
                    cell.setAttribute("class","red");
                }
            }
            if (key === "price")
                text = document.createTextNode('$'+value);
            cell.appendChild(text);   
        } 
    }

      
}
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
 */