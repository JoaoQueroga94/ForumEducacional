const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'password',
  database : 'Forum'
});

connection.connect(function(err){  // teste de conexao  // CALLBACK
    if(err) return console.log(err);
    console.log('conectou!');
    //createTable(connection);
})
/*
function createTable(conn){  /// criar Tabelas
 
  const sql = "CREATE TABLE IF NOT EXISTS Filiais (\n"+
              "ID int NOT NULL AUTO_INCREMENT,\n"+
              "Nome_filial varchar(150) NOT NULL,\n"+
              "UF_filial char(2) NOT NULL,\n"+
              "CNPJ_filial char(18) NOT NULL,\n"+
              "PRIMARY KEY (CNPJ_filial)\n"+
              ");";
  
  conn.query(sql, function (error, results, fields){
      if(error) return console.log(error);
      console.log('criou a tabela filial!');
      addRows(conn);
  });
}
function addRows(conn){ /// Adicionar elemento (bulk)
  const sql = "INSERT INTO Filiais(Nome_filial,UF_filial,CNPJ_filial) VALUES ?";
  const values = [
        ['Ludus_Filial', 'AM', '24.308.862/0001-44'],
        ['Elgin_Santos', 'SP', '29.305.842/0001-35'],
        ['Elgin_Rio', 'RJ', '29.305.842/3001-65'],
        ['Elgin_Belém', 'PA', '29.305.842/0001-12'],
      ];
  conn.query(sql, [values], function (error, results, fields){
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}
*/