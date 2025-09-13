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
            curso: "TDS",
            beneficiario: "T",        // sim ou nao
            nis: "12345678900",          // só se for sim
            valor_beneficiario: 10,

            origem_escolar: "Rede Pública / Bolsista integral",
            valor_origem: 85,

            portugues_6ano: 80,
            portugues_7ano: 85,
            portugues_8ano: 78,
            portugues_9ano: 90,

            matematica_6ano: 70,
            matematica_7ano: 75,
            matematica_8ano: 72,
            matematica_9ano: 88,

            media_9ano: 82,
            media_final_disciplinas: 82,

            pontuacao_benef_origem: 95,
            entrevista: 88,
            total_geral: 265
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
    curso,
    turno,
    beneficiario,
    nis,
    valor_beneficiario,
    origem_escolar,
    valor_origem,
    portugues_6ano,
    portugues_7ano,
    portugues_8ano,
    portugues_9ano,
    matematica_6ano,
    matematica_7ano,
    matematica_8ano,
    matematica_9ano,
    media_9ano,
    media_final_disciplinas,
    pontuacao_benef_origem,
    entrevista,
    total_geral
} = req.body;
  

    if (!nome || !rg || !expe_por || !cpf || !data_nasc ||
        !rua || !numero_casa || !bairro || !cidade || !uf  || !email || !curso) {
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
    curso: curso,
    turno: turno,

    beneficiario: beneficiario,
    nis: nis,
    valor_beneficiario: valor_beneficiario,

    origem_escolar: origem_escolar,
    valor_origem: valor_origem,

    portugues_6ano: portugues_6ano,
    portugues_7ano: portugues_7ano,
    portugues_8ano: portugues_8ano,
    portugues_9ano: portugues_9ano,

    matematica_6ano: matematica_6ano,
    matematica_7ano: matematica_7ano,
    matematica_8ano: matematica_8ano,
    matematica_9ano: matematica_9ano,

    media_9ano: media_9ano,
    media_final_disciplinas: media_final_disciplinas,

    pontuacao_benef_origem: pontuacao_benef_origem,
    entrevista: entrevista,
    total_geral: total_geral
};

    candidatos.push(novoUsuario);
    return res.status(201).json({mensagem: "criado"});

    
});

app.patch('/candidatos', (req, res) => {
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
    curso,
    turno,
    beneficiario,
    nis,
    valor_beneficiario,
    origem_escolar,
    valor_origem,
    portugues_6ano,
    portugues_7ano,
    portugues_8ano,
    portugues_9ano,
    matematica_6ano,
    matematica_7ano,
    matematica_8ano,
    matematica_9ano,
    media_9ano,
    media_final_disciplinas,
    pontuacao_benef_origem,
    entrevista,
    total_geral
} = req.body;
  
    const usuario = candidatos.find(u => u.id === idnumero);
  
    if (!usuario) {
      return res.status(404).json({ mensagem: "usuário não encontrado!!!" });
    }
if (nome) usuario.nome = nome;
if (rg) usuario.rg = rg;
if (expe_por) usuario.expe_por = expe_por;
if (cpf) usuario.cpf = cpf;
if (data_nasc) usuario.data_nasc = data_nasc;
if (rua) usuario.rua = rua;
if (numero_casa) usuario.numero_casa = numero_casa;
if (bairro) usuario.bairro = bairro;
if (cidade) usuario.cidade = cidade;
if (uf) usuario.uf = uf;
if (tel_fixo) usuario.tel_fixo = tel_fixo;
if (celular_a) usuario.celular_a = celular_a;
if (celular_b) usuario.celular_b = celular_b;
if (email) usuario.email = email;
if (curso) usuario.curso = curso;
if (turno) usuario.turno = turno;

if (beneficiario) usuario.beneficiario = beneficiario;
if (nis) usuario.nis = nis;
if (valor_beneficiario) usuario.valor_beneficiario = valor_beneficiario;

if (origem_escolar) usuario.origem_escolar = origem_escolar;
if (valor_origem) usuario.valor_origem = valor_origem;

if (portugues_6ano) usuario.portugues_6ano = portugues_6ano;
if (portugues_7ano) usuario.portugues_7ano = portugues_7ano;
if (portugues_8ano) usuario.portugues_8ano = portugues_8ano;
if (portugues_9ano) usuario.portugues_9ano = portugues_9ano;

if (matematica_6ano) usuario.matematica_6ano = matematica_6ano;
if (matematica_7ano) usuario.matematica_7ano = matematica_7ano;
if (matematica_8ano) usuario.matematica_8ano = matematica_8ano;
if (matematica_9ano) usuario.matematica_9ano = matematica_9ano;

if (media_9ano) usuario.media_9ano = media_9ano;
if (media_final_disciplinas) usuario.media_final_disciplinas = media_final_disciplinas;

if (pontuacao_benef_origem) usuario.pontuacao_benef_origem = pontuacao_benef_origem;
if (entrevista) usuario.entrevista = entrevista;
if (total_geral !== undefined) usuario.total_geral = total_geral;

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