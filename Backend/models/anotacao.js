const conexao = require("../infraestrutura/conexao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");

class Nota{
  async adiciona(nota, res) {
      console.log(nota)
    const sql = "INSERT INTO anotacoes SET ?";
    conexao.query(sql, nota, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(nota);
      }
    });
  }
  
  lista(res) {
    const sql = "SELECT * FROM anotacoes";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }
}



module.exports = new Nota();