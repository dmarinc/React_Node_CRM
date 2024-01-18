const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //se crea la autorización por cabecera (header)
    const authHeader = req.get('Authorization');

    //si no se pasa el header, pasa un error
    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT');
        //Se envia el error
        error.statusCode = 401;
        throw error;
    }

    //obteniendo el token usando un bearer y luego el token.
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        //se verifica  el token, y toma la llave que se creo en usuarioController.js
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
        
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //si es token valido o si hay error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}