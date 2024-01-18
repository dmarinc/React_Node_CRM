const Clientes =  require('../models/Clientes');

//agregar nuevo cliente

exports.nuevoCliente = async(req, res, next) => {
    const cliente = new Clientes(req.body);

    try{
        //se almacena el registro a la bd
        await cliente.save();
        res.json({ mensaje: 'Se agrego nuevo registro'});
    }catch(error){
        //si hay error, muestre por console.log y next
        //console.log(error);
        res.json(error);
        next();
    }
}
//muestra todos los clientes
exports.mostrarClientes = async(req, res, next) => {
   try {
    //mostrar clientes, si no lo encuentra muestra uno en blanco
    const clientes = await Clientes.find({});
        res.json(clientes);

   } catch (error) {
    console.log(error);
    next();
   }
}

//Obtener cliente por ID
exports.mostrarCliente = async(req, res, next) => {
    const clientes = await Clientes.findById(req.params.idCliente);
    //se validad que exista el cliente
    if(!clientes){
        res.json({mensaje: 'No existe el cliente'});
        next();
    }
    res.json(clientes);
}

//Actualiar cliente

exports.actualizarCliente = async(req, res, next) => {
   try {
    const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente} ,
        req.body, {
            new: true
        });
        res.json(cliente);
    } catch (error) {
        //console.log(error)
        res.send(error);
        next();    
    }   
}

exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'el cliente ya ha sido eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}