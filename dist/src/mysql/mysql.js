"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySql {
    constructor() {
        this.conectado = false;
        console.log('Clase Inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'sasa',
            database: 'node_db_dev'
        });
        //this.cnn.connect(); lo comente porque tira error Cannot enqueue Handshake after invoking quit
        this.conectarDB();
    }
    //ademas corri este query en el workench para otro erro
    //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online!');
        });
    }
}
exports.default = MySql;
