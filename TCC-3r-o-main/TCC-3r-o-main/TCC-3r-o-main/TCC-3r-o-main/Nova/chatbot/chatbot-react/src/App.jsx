import { useState } from "react";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/chat";

const MENSAGEM_INICIAL = {
  id: "inicial",
  sender: "ia",
  text: "Olá, sou o assistente médico da Dornext, me conte o que está acontecendo de grave   ",
};

export default function App() {

   const [messages, setMessages] = useState([MENSAGEM_INICIAL]);
  const [isTyping, setIsTyping] = useState(false);

  async function handleSend(texto) {
    const userMsg = { id: crypto.randomUUID(), sender: "user", text: texto };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: texto }),
      });

      if (!resposta.ok) throw new Error("Falha na resposta do servidor");

      const dados = await resposta.json();
      const iaMsg = {
        id: crypto.randomUUID(),
        sender: "ia",
        text: dados.reply,
      };
      setMessages((prev) => [...prev, iaMsg]);
    } catch (erro) {
      const erroMsg = {
        id: crypto.randomUUID(),
        sender: "ia",
        text: "Não consegui me conectar ao servidor. Verifique se o backend está rodando.",
      };
      setMessages((prev) => [...prev, erroMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-page__background" />

  <div className="chat-card">
        <ChatHeader />
        <ChatMessages messages={messages} isTyping={isTyping} />
        <ChatInput onSend={handleSend} disabled={isTyping} />

        <div className="acoes">
          <button className="botao-imprimir" type="button" onClick={() => window.print()}>
            Imprimir ou salvar em PDF
          </button>
        </div>
      </div>
    </div>


  );
}