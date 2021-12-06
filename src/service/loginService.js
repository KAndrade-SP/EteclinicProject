import database from '../repository/connectionDB.js';

async function login(userEmail, password) {

    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_usuarios WHERE email = ? and senha = ? and usuario_deletado = 0';
    const dataLogin = [userEmail, password];
    const [rows] = await conn.query(sql, dataLogin);

    conn.end();

    return rows;
}

async function changePassword(newPasswd, userEmail) {

    const conn = await database.connect();
    const sql = 'UPDATE tbl_usuarios SET senha = ? WHERE email = ? and usuario_deletado = 0';
    const dataNewPasswd = [newPasswd, userEmail];

    await conn.query(sql, dataNewPasswd);
    
    conn.end();
}

export default {login, changePassword};