import database from '../repository/connectionDB.js';

//------Métodos da tabela de profissões:
async function insertProfession({name_profession}) { 

    const conn = await database.connect();
    const sql = 'CALL sp_reg_profissoes(?)';
    const newProfessionData = [name_profession];
        
    conn.query(sql, newProfessionData);
    conn.end();
}

async function updateProfession({name_profession, id_profession}) { 
        
    const conn = await database.connect();
    const sql = 'CALL sp_update_profissoes(?, ?)';
    const altProfessionData = [name_profession, id_profession];

    conn.query(sql, altProfessionData);
    conn.end();
}

async function deleteProfession({name_profession}) { 
        
    const conn = await database.connect();
    const sql = 'CALL sp_delete_profissoes(?)';
    const deleteProfessionData = [name_profession];

    conn.query(sql, deleteProfessionData);
    conn.end();
}

export default {insertProfession, updateProfession, deleteProfession};