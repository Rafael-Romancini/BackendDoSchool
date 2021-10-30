import "./style.css";
import { Link } from "react-router-dom";
import React from "react";
import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Footer from "../../components/Footer/Footer";

function anotacao() {
  const [msgTrigger, setMsgTrigger] = useState(false);
  const [severity, setSeverity] = useState("");
  const [mensagem, setMensagem] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [notaAux,setNotaAux] = useState({ nota: ""});
  const [sair, setSair] = useState(false);
  const mostraMensagem = (mensagem, severity) => {
    setMensagem(mensagem);
    setSeverity(severity);
    setMsgTrigger(true);
  };
  const handleNota = async (e) => {
    e.preventDefault();
    if(notaAux.nota.length <= 0 || notaAux.nota == null  ) {
      console.log("Insira alguma mensagem");
    }  
    else if (notaAux.nota.length >= 100 ) {
      console.log(notaAux.nome.length);
      console.log("nota grande demais");
      mostraMensagem("Insira uma nota menor", "warning")
    } else {
      console.log(notaAux);
      try {
        const res = await api.post("/anotacao", notaAux);
        
        
      } catch (err) {
        setMensagem("Valores inválidos");
        setSeverity("error");
        setMsgTrigger(true);
        console.log(err);
      }
    }
  };

  if (sair === true) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login_body">
      <div className="login_main">
        <form className="loginForm">
          <input
            className="loginInput"
            name="nota"
            placeholder="Nome Completo"
            onChange={(e) => {
              notaAux.nota = e.target.value;
            }}
          ></input>
          
          <button onClick={handleNota} to="/home" className="login_entrar">
            Criar conta
          </button>
        </form>
      </div>
        <Snackbar open={msgTrigger} autoHideDuration={2000} onClose={() => {setMsgTrigger(false)}}>
          <Alert onClose={() => {setMsgTrigger(false)}} severity={severity} sx={{ width: '100%' }}>
          {mensagem}
          </Alert>
        </Snackbar>
        <Footer />
    </div>
    
    
  );
}

export default anotacao;
