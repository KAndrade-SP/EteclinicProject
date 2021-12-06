import database from '../repository/connectionDB.js';

//------Métodos da tabela de clientes:
async function insertClient({cpf, clientName, clientPhone, clientCell, clientEmail, clientBloodType,
    zip_code, street, number, district, city, state}) { 

    const conn = await database.connect();
    const sql = 'CALL sp_reg_cliente_e_endereco(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const newClientData = [cpf, clientName, clientPhone, clientCell, clientEmail, clientBloodType,
    zip_code, street, number, district, city, state];
        
    conn.query(sql, newClientData);
    conn.end();
}

async function updateClient({cpf, clientName, clientPhone, clientCell, clientEmail, clientBloodType,
    id_address, zip_code, street, number, district, city, state}) { 
        
    const conn = await database.connect();
    const sql = 'CALL sp_update_cliente_e_endereco(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const altClientData = [cpf, clientName, clientPhone, clientCell, clientEmail, clientBloodType,
    id_address, zip_code, street, number, district, city, state];

    conn.query(sql, altClientData);
    conn.end();
}

async function deleteClient({cpf}) { 
        
    const conn = await database.connect();
    const sql = 'CALL sp_delete_cliente(?)';
    const deleteClientData = [cpf];

    conn.query(sql, deleteClientData);
    conn.end();
}

export default {insertClient, updateClient, deleteClient};