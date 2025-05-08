const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fome'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

module.exports = connection;
