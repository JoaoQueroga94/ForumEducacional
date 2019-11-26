const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3001; //porta padrão
const mysql = require('mysql');

//////////// Conexao -- Erroor Cors ////////////

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


///////////////////////////////////////////////


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');


/////################################################ CCONFIGURACOES DA API ##########################################################


////--------------------------------------------------- GET ---------------------------------------///


////// Listar todas os professores
router.get('/professor', (req, res) =>{
    execSQLQuery('SELECT * FROM professor;', res);
})

///// Mostrar Professor pelo ID
router.get('/professor/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE professor_id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM professor' + filter, res);
})

///// Mostrar Salas de um professor
router.get('/Salas_Professor/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE sala_professor_id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM sala' + filter, res);
})

///// Mostrar Salas de um Aluno
router.get('/Salas_Aluno/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE frequencia_aluno_id =' + parseInt(req.params.id);
    execSQLQuery('SELECT frequencia_sala_id FROM frequencia' + filter, res);
})
router.get('/Salas/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE sala_id =' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM sala' + filter, res);
})

///// Mostrar Perguntas de uma sala
router.get('/Perguntas_Sala/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE pergunta_sala_id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM pergunta' + filter, res);
})
/// Pega uma sala pelo codigo
router.get('/Busca_sala/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE sala_chave=' + req.params.id;
    execSQLQuery('SELECT * FROM sala' + filter, res);
})

////////////////////////////////////////////// Funcionalidades ////////////////////////////////////////////

//Login
// retornar professor existente pelo email

router.post('/verificaProfessor', (req, res) =>{

     const email = req.body.email;
     const password = req.body.password;
     execSQLQuery(`SELECT professor_id, professor_nome, professor_email, professor_senha FROM forum.professor WHERE (professor_email = '${email}' and professor_senha = '${password}')`, res);

 });
router.post('/verificaAluno', (req, res) =>{

    const email = req.body.email;
    const password = req.body.password;
    execSQLQuery(`SELECT aluno_id, aluno_nome, aluno_email, aluno_senha FROM forum.aluno WHERE (aluno_email = '${email}' and aluno_senha = '${password}')`, res);

});

/*
////// Listar todas as contas (accounts)
router.get('/Contas', (req, res) =>{
    execSQLQuery('SELECT * FROM accounts', res);
})



////// Retorna todos as Filias de uma Conta especifica (branch_offices)
router.get('/Filial_Conta/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE account_id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM branch_offices' + filter, res);
})

////// Retorna todos os pontos de vendas de uma filial especifica (points_of_sales)
router.get('/Filial_PDV/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE branch_office_id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM points_of_sales' + filter, res);
})




/// Retorna uma Filial Especifica (ID)
router.get('/Filial/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM branch_offices' + filter, res);
})

/// Retorna o maior ID filial
router.get('/Filial_MaxID', (req, res) =>{
    execSQLQuery('SELECT MAX(id) FROM branch_offices', res);
})

/// Retorna o maior ID PDV
router.get('/PDV_MAXid', (req, res) =>{
    execSQLQuery('SELECT MAX(id) FROM points_of_sales', res);
})




////--------------------------------------------------- POST ---------------------------------------///

*/
/// Adicionar Professor 
router.post('/AddProfessor', (req, res) =>{
   // const id = parseInt(req.body.id);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    execSQLQuery(`INSERT INTO professor (professor_nome, professor_email, professor_senha) VALUES('${name}','${email}','${password}')`, res);
});

/// Adicionar Aluno 
router.post('/AddAluno', (req, res) =>{
    // const id = parseInt(req.body.id);
     const name = req.body.name;
     const email = req.body.email;
     const password = req.body.password;
 
     execSQLQuery(`INSERT INTO aluno (aluno_nome, aluno_email, aluno_senha) VALUES('${name}','${email}','${password}')`, res);
 });

 //Adicionar Sala
 router.post('/AddSala', (req, res) =>{
    // const id = parseInt(req.body.id);
     const nome = req.body.nome;
     const chave = req.body.chave;
     const id_professor = req.body.id_professor;
     const descricao = req.body.descricao;
 
     execSQLQuery(`INSERT INTO sala (sala_nome, sala_chave, sala_professor_id, sala_descricao) VALUES('${nome}','${chave}','${id_professor}','${descricao}')`, res);
 });

 //Adicionar Pergunta
 router.post('/AddPergunta', (req, res) =>{
    // const id = parseInt(req.body.id);
     const pergunta = req.body.pergunta;
     const data = req.body.data;
     const id_sala = req.body.id_sala;
 
     execSQLQuery(`INSERT INTO pergunta (pergunta_pergunta, pergunta_data, pergunta_sala_id) VALUES('${pergunta}','${data}','${id_sala}')`, res);
 });

 //Entra na Sala
 router.post('/EntrarSala', (req, res) =>{
    // const id = parseInt(req.body.id);
     const id_aluno = parseInt(req.body.id_aluno);
     const id_sala = parseInt(req.body.id_sala);
     execSQLQuery(`INSERT INTO frequencia (frequencia_aluno_id, frequencia_sala_id) VALUES('${id_aluno}','${id_sala}')`, res);
 });


/*
//// Adicionar Conta No Sistema

router.post('/Conta', (req, res) =>{
    const id = parseInt(req.body.id);
    const company_name = req.body.company_name;
    const trade_mark = req.body.trade_mark;
    const domain = req.body.domain;
    const subdomain = req.body.subdomain;
    const email = req.body.email;
    const cellphone = req.body.cellphone;
    const landline_phone = req.body.landline_phone;
    const active = parseInt(req.body.active);
    const utc_creation_date = req.body.utc_creation_date;
    const license_url = req.body.license_url;
    const confirmed = parseInt(req.body.confirmed);
    const slug_account_type = req.body.slug_account_type;
    const parent_account_id = parseInt(req.body.parent_account_id);
    const parent_login_permission = parseInt(req.body.parent_login_permission);
    execSQLQuery(`INSERT INTO accounts (id, company_name, trade_mark, domain, subdomain,
        email, cellphone, landline_phone, active, utc_creation_date,
        license_url, confirmed, slug_account_type, parent_account_id, parent_login_permission
        ) VALUES('${id}','${company_name}','${trade_mark}','${domain}','${subdomain}','${email}',
        '${cellphone}','${landline_phone}','${active}','${utc_creation_date}','${license_url}',
        '${confirmed}','${slug_account_type}','${parent_account_id}','${parent_login_permission}')`, res);
});


//// adicionar Filail no Sistema

router.post('/Filial', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const landline_phone = req.body.landline_phone;
    const cnpj = req.body.cnpj;
    const inscricao_estadual = req.body.inscricao_estadual;
    const account_id = parseInt(req.body.account_id);
    const branch_office_type = parseInt(req.body.branch_office_type);
    const taxation_system_id = parseInt(req.body.taxation_system_id);
    const sefaz_security_key = req.body.sefaz_security_key;
    const status = parseInt(req.body.status);
    const zipcode = req.body.zipcode;
    const neighborhood = req.body.neighborhood;
    const country = req.body.country;
    const city = req.body.city;
    const uf = req.body.uf;
    const street = req.body.street;
    const number = req.body.number;
    const complement = req.body.complement;
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    execSQLQuery(`INSERT INTO branch_offices (id, name, landline_phone, cnpj, inscricao_estadual,
        account_id, branch_office_type, taxation_system_id, sefaz_security_key, status,
        zipcode, neighborhood, country, city, uf,street , number,complement , latitude, longitude
        ) VALUES('${id}','${name}','${landline_phone}','${cnpj}','${inscricao_estadual}','${account_id}',
        '${branch_office_type}','${taxation_system_id}','${sefaz_security_key}','${status}','${zipcode}',
        '${neighborhood}','${country}','${city}','${uf}','${street}','${number}','${complement}','${latitude}',
        '${longitude}')`, res);
});


/// adiciona um Ponto de venda no Banco (points_of_sales)

router.post('/PontoDeVenda', (req, res) =>{
    const id = parseInt(req.body.id);
    const name = req.body.name;
    const description = req.body.description;
    const branch_office_id = req.body.branch_office_id;
    const mac_addr = req.body.mac_addr;
    const hash = req.body.hash;
    const key_hash = req.body.key_hash;
    const last_comm = req.body.last_comm;
    const active = parseInt(req.body.active);
    
    execSQLQuery(`INSERT INTO points_of_sales (id, name, description, branch_office_id, mac_addr,
        hash, key_hash, last_comm, active
        ) VALUES('${id}','${name}','${description}','${branch_office_id}','${mac_addr}','${hash}',
        '${key_hash}','${last_comm}','${active}')`, res);
});


*/



/*
/// Criar pesquisa de um unico cliente pelo id

router.get('/filial/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Filiais' + filter, res);
})

/// Excluir um cliente

router.delete('/filial/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Filiais WHERE ID=' + parseInt(req.params.id), res);
})

*/
/// Conexao com o banco de dados

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : 'password',
        database : 'forum'
    });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }