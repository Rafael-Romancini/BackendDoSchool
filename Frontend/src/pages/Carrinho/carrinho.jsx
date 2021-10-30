import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Redirect } from "react-router-dom";
import Salada from "../../assets/img/salada.png";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Carrinho() {
  const [cart, setCart] = React.useState(
    JSON.parse(localStorage.getItem("carrinho"))
  );
  const [mensagem, setMensagem] = useState("");
  const [msgTrigger, setMsgTrigger] = useState(false);
  const [severity, setSeverity] = useState("");

  React.useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify([]));
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }, [cart]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    return <Redirect to="/" />;
  }
  const mostraMensagem = (mensagem, severity) => {
    setMensagem(mensagem);
    setMsgTrigger(true);
    setSeverity(severity);
  };
  const removeCarrinho = (e) => {
    setCart(cart.filter((c) => c.id !== e));
    localStorage.setItem("carrinho", JSON.stringify([]));
  };
  const finalizaPedido = (e) => {
    localStorage.setItem("carrinho", JSON.stringify([]));
  };
  return (
    <>
      <div className="carrinhoMain">
        <h2 className="title"> Carrinho </h2>

        {cart.map((e) => {
          return (
            <div className="item">
              <img loading="lazy" src={Salada} alt="Salada"></img>
              <div className="item_div">
                <div className="item_text">
                  <p> {e.nome} </p>
                  <p> R$ {e.preco.toFixed(2)} </p>
                </div>
                <div className="item_text">
                  <p> {e.descricao} </p>
                  <button
                    onClick={() => {
                      mostraMensagem("Item Removido", "error");
                      removeCarrinho(e.id);
                    }}
                    className="adicionar_produto"
                  >
                    {" "}
                    Remover{" "}
                  </button>
                  <div>
                    <button onClick={() => {e.quantidade--}}>-</button>
                    <p> {e.quantidade} </p>
                    <button onClick={() => {e.quantidade++; console.log(e.quantidade);}}>+</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <ul className="tabelaPerfil">
          <ul className="tabelaPerfil_head">
            <li>Endereço:</li>
            <li>Carteira:</li>
            <li>Email:</li>
          </ul>
          <ul className="tabelaPerfil_data">
            <li>Av Uirapuru 157</li>
            <li>Pagar na entrega</li>
            <li>Guilherme@gmail.com</li>
          </ul>
        </ul>
        <Link
          onClick={() => {
            mostraMensagem("Compra Finalizada", "success");
            finalizaPedido();
          }}
          to="/home"
          className="adicionarCarrinho"
        >
          Finalizar pedido
        </Link>
      </div>
      <Footer />
      <Snackbar
        open={msgTrigger}
        autoHideDuration={2000}
        onClose={() => {
          setMsgTrigger(false);
          console.log(mensagem);
        }}
      >
        <Alert
          onClose={() => {
            setMsgTrigger(false);
            console.log(mensagem);
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Carrinho;
