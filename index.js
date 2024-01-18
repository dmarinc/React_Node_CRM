const express = require('express');

const routes = require('./routes');

const mongoose = require('mongoose');

const bodyParser = require('body-parser')

//se importa la ruta de la variable de entorno
require('dotenv').config({path: 'variables.env'});

//cors permite que un cliente se conecte a otro servidor para intercambiar recursos
const cors = require('cors');

mongoose.set('strictQuery', true);

//conexion de mongoose
mongoose.Promise = global.Promise;
/**mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});**/
mongoose
.connect(process.env.DB_NUBE)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.log(error));

//crear servidor

const app = express();

//habilitar bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir los dominio(s), a los que se va tener acceso a las peticiones.
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //Revisar si las peticiones vienen de un servidor que se encuentra en la listaBlanca
        const existe = whiteList.some( dominio => dominio === origin );
        if(existe){
            callback(null, true);
        }
        else{
            callback(new Error('No permitido CORS'));
        }
    }
}

//habilitar cors
app.use(cors(corsOptions));

//rutas app

app.use('/', routes());

//carpeta publica para la imagen
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//iniciar app
//app.listen(5000);
app.listen(port, host, () => {
    console.log('El Servidor esta corriendo');
})