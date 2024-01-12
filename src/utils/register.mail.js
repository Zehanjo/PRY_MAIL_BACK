const { mysqlConfig } = require('../config/mysql.connection');

async function clientAdd(params){
    const data = JSON.parse(params);
    const SQL = `CALL sp_insertSentMail(?,?,?);`;
    const addressee = data.mail;
    const affair = `Se registro sus datos ${data.name}`;
    const body = `Los datos registrados fueron los siguiente : \n nombre: ${data.name} \n apellido: ${data.lastname} \n correo:${data.mail} \n Nro Celular: ${data.phone} \n Documento: ${data.dni_ruc} \n Direccion : ${data.address}`;

    const response = await mysqlConfig.query(SQL,[addressee,affair,body]);
    if(response[0].affectedRows === 1){
        console.log({succes:true,message:"Successfully created"});
    }else{
        console.error({ success: false, message: 'Error to register user in BD' });
    }
}

module.exports = clientAdd;