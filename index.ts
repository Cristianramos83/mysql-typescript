import Server from './src/server/server';
import router from './src/router/router';
import MySql from './src/mysql/mysql';

const server=Server.init(3000);
server.app.use(router);

///const mysql= new MySql();

MySql.instance;


server.start( ()=>{
    console.log('Servidor corriendo en el puerto 3000');
});
