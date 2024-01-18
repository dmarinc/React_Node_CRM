const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Seagregó un nuevo Pedido'});
    } catch (error) {
        console.log(error);
        next();
        
    }
}

exports.mostrarPedido = async (req, res, next) => {
    
    try {
        const pedido = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
        
    }
}

//Mostrar pedido por (ID)
exports.mostrarPedidos = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate({
        path:'pedido.producto',
        model: 'Productos'
    })
    if(!pedido){
        res.json({mensaje: 'Pedido no existe'});
        return next();
    }
    //Mostrar pedido
    res.json(pedido);
}

//Actualizar el pedido
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        } )
        .populate('cliente')
        .populate({
            path:'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
        
    }
}

//Eliminar Pedido.
    exports.eliminarPedido = async (req, res, next) => {
        try {
            await Pedidos.findOneAndDelete({_id : req.params.idPedido});
            res.json({mensaje: 'El Pedido se Ha eliminado correctamente'});
        } catch (error) {
            console.log(error);
            next();
            
        }
    }