import database from '../repository/connectionDB.js';

//------Métodos da tabela de especialistas:
async function insertSpecialist({reg_id, specialistName, specialistPhone, specialistCell, specialistEmail, fk_profession,
    zip_code, street, number, district, city, state}) { 

    const conn = await database.connect();
    const sql = 'CALL sp_reg_especialista_e_endereco(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const newSpecialistData = [reg_id, specialistName, specialistPhone, specialistCell, specialistEmail, fk_profession,
    zip_code, street, number, district, city, state];
        
    conn.query(sql, newSpecialistData);
    conn.end();
}

async function updateSpecialist({reg_id, specialistName, specialistPhone, specialistCell, specialistEmail, fk_profession,
    id_address, zip_code, street, number, district, city, state}) { 
        
    const conn = await database.connect();
    const sql = 'CALL sp_update_especialista_e_endereco(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const altSpecialistData = [reg_id, specialistName, specialistPhone, specialistCell, specialistEmail, fk_profession,
    id_address, zip_code, street, number, district, city, state];

    conn.query(sql, altSpecialistData);
    conn.end();
}

async function deleteSpecialist({reg_id}) { 
        
    const conn = await database.connect();
    const sql = 'CALL sp_delete_especialista(?)';
    const deleteSpecialistData = [reg_id];

    conn.query(sql, deleteSpecialistData);
    conn.end();
}

export default {insertSpecialist, updateSpecialist, deleteSpecialist};