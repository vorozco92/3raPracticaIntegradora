export const generateProductError =(product)=>{
    let error_msg = '';
    if( ! product.title )
        error_msg = error_msg + '- el titulo es requerido';
    if( ! product.description )
        error_msg = error_msg + '- la descripción es requerida';
    if( ! product.code )
        error_msg = error_msg + '-el código es requerido';
    if( ! product.price )
        error_msg = error_msg + '- el price es requerido';
    if( ! product.stock )
        error_msg = error_msg + '- el stock es requerido';
    return ` Las propiedades no estan completas: ${error_msg}`
}

export const generateCartError =()=>{
    return ` Las propiedades no estan completas 
             el usuario del carrito es requerido`
}

export const generateUserError =()=>{
    return ` Las credeciales son incorrectas.`
}