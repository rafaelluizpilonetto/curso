import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";



const app = express();
app.use(cors());
app.use(express.json());
let ultimoId = 1;

let candidatos = [
    {
        id: ultimoId,
        nome: "admin",
        rg: "26052024",
        expe_por: "ssp",
        cpf: "10082024",
        data_nasc: "2009-06-01",
            rua: "mario de barros",
            numero_casa: 409,
            bairro: "centro sul",
            cidade: "dois vizinhos",
            uf: "PR",
            tel_fixo: "46999414639",
            celular_a: "46999394146",
            celular_b: "46999463941",
            email: "admin@gmail.com",
            curso: "TDS"
    }
]

app.get('/candidatos', (req, res) =>{
    const limit = parseInt(req.query.limit) || candidatos.length;

    res.status(200).json(candidatos.slice(0, limit));

});

app.post('/candidatos', (req, res) => {
    const { 
        nome,
        rg,
        expe_por,
        cpf,
        data_nasc,
        rua,
        numero_casa,
        bairro,
        cidade,
        uf,
        tel_fixo,
        celular_a,
        celular_b,
        email,
        curso
    } = req.body;

  

    if (!nome || !rg || !expe_por || !cpf || !data_nasc ||
        !rua || !numero_casa || !bairro || !cidade || !uf ||
        !tel_fixo || !celular_a || !celular_b || !email || !curso) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const email_valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email_valido.test(email)){
        return res.status(400).json({mensagem: "email inválido!!"})
    }
    ultimoId++;
    const novoUsuario = {
        id: ultimoId,
        nome: nome,
        rg: rg,
        expe_por: expe_por,
        cpf: cpf,
        data_nasc: data_nasc,
        rua: rua,
        numero_casa: numero_casa,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        tel_fixo: tel_fixo,
        celular_a: celular_a,
        celular_b: celular_b,
        email: email,
        curso: curso
      };
    candidatos.push(novoUsuario);
    return res.status(201).json({mensagem: "criado"});

    
});

app.put('/candidatos/:id', (req, res) => {
    const { id } = req.params;
    let idnumero = parseInt(id)
    if(isNaN(idnumero)){
      return res.status(400).json({mensagem: "o id precisa ser um número inteiro"})
    }
    const {
      nome,
      rg,
      expe_por,
      cpf,
      data_nasc,
        rua,
        numero_casa,
        bairro,
        cidade,
        uf,
        tel_fixo,
        celular_a,
        celular_b,
        email,
        curso
    } = req.body;
  
    const usuario = candidatos.find(u => u.id == id);
  
    if (!usuario) {
      return res.status(404).json({ mensagem: "usuário não encontrado!!!" });
    }

    if (nome) usuario.nome = nome;
    if (rg) usuario.rg = rg;
    if (expe_por) usuario.expe_por = expe_por;
    if (cpf) usuario.cpf = cpf;
    if (data_nasc) usuario.data_nasc = data_nasc;
    if (rua) usuario.endereco.rua = rua;
    if (numero_casa) usuario.endereco.numero_casa = numero_casa;
    if (bairro) usuario.endereco.bairro = bairro;
    if (cidade) usuario.endereco.cidade = cidade;
    if (uf) usuario.endereco.uf = uf;
    if (tel_fixo) usuario.endereco.tel_fixo = tel_fixo;
    if (celular_a) usuario.endereco.celular_a = celular_a;
    if (celular_b) usuario.endereco.celular_b = celular_b;
    if (email) usuario.endereco.email = email;
    if (curso) usuario.endereco.curso = curso;
  
    return res.json({ mensagem: `Usuário ${usuario.nome} (id ${usuario.id}) foi alterado`, usuario });
});
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'christian.darosa0106@gmail.com',
//     pass: ''
//   }
// });

// function enviarEmail(to, subject, text, html) {
//   const mailOptions = { from: 'christian.darosa0106@gmail.com', to, subject, text, html };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) return console.log('Erro: ', error);
//     console.log('Email enviado: ', info.response);
//   });
// }
// app.post('/candidatos/enviar-email', (req, res) => {
//   const { nome, email, mensagem } = req.body;
//   enviarEmail(email, `Mensagem de ${nome}`, mensagem, `<b>${mensagem}</b>`);
//   res.send('Email enviado!');
// });
app.listen(3000)