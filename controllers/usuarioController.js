const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
    //leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario Guardado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const {email, password} = req.body;
    const usuario = await Usuarios.findOne({email});

    if(!usuario){
        //si el usuario no Existe
        await res.status(401).json({mensaje: 'Usuario no Existe'});
        next();
    }else{
        //si el usuario existe, verificar el password que sea correcto
        if(!bcrypt.compareSync(password, usuario.password)){
            //si el password es incorrecto
            await res.status(401).json({mensaje: 'El Password es Incorrecto!'});
            next();
        }else{
            //si el password es correcto, firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            },
            'LLAVESECRETA', {
                expiresIn: '1h'
            });
            //retornar el TOKEN
            res.json({token})

        }
    }
}