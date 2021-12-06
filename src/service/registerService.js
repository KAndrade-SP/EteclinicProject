import database from '../repository/connectionDB.js';

//------Métodos da tabela de usuários:
async function insertUser(email, password, userName) {

    const conn = await database.connect();
    const sql = 'INSERT INTO tbl_usuarios(email, senha, usuario) VALUES (?,?,?)';
    const newUserData = [email, password, userName];

    conn.query(sql, newUserData);
    conn.end();
}

async function updateUser(email, password, userName) {

    const conn = await database.connect();
    const sql = 'UPDATE tbl_usuarios SET email = ?,  senha = ?, usuario = ? WHERE email = email';
    const altUserData = [email, password, userName];

    conn.query(sql, altUserData);
    conn.end();
}

async function checkEmail(userEmail) {

    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuarios WHERE email = ?';
    const [rows] = await conn.query(sql, userEmail);
    conn.end();
    return rows;
}

export default {insertUser, updateUser, checkEmail};