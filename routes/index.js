const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuarioController = require('../controllers/usuarioController');

//protegiendo cada ruta
const auth = require('../middleware/auth');

module.exports = function() {
   /* router.get('/', (req, res) =>{
        res.send('inicio')
    });
    router.get('/nosotros', (req, res) => {
        res.send('nosotros')
    })
*/
//agrega nuevos clientes via post
    router.post('/clientes', auth, clienteController.nuevoCliente);

    //obtiene los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes);

    //Obtener cliente por (ID)

    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente);

    //Actualizar clientes

    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente);

    //eliminar cliente

    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /**PRODUCTOS */
    //se agrega nuevo producto
    router.post('/productos', auth, productoController.subirArchivo, productoController.nuevoProducto);

    //mostrar los productos
    router.get('/productos', auth, productoController.mostrarProductos);


    //muestra un producto por ID
    router.get('/productos/:idProducto', auth, productoController.mostrarProducto);

    //Actualizar productos
    router.put('/productos/:idProducto', auth, productoController.subirArchivo,
    productoController.actualizarProducto);

    //Eliminar producto
    router.delete('/productos/:idProducto', auth, productoController.eliminarProducto);

    //busqueda de productos
    router.post('/productos/busqueda/:query', auth, productoController.buscarProducto);

    /**Pedidos */

    //ingresar pedidos
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido);

    //mostrar pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedido);

    //mostrar pedidos por {ID}
    router.get('/pedidos/:idPedido',auth, pedidosController.mostrarPedidos);

    //Actualizar Pedido
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    //Eliminar pedido
  
     router.delete('/pedidos/:idPedido',auth, pedidosController.eliminarPedido);

     //crear Usuarios
    router.post('/crear-cuenta', auth, usuarioController.registrarUsuario);

    //Autenticar Usuario
    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);
    
    return router;
}