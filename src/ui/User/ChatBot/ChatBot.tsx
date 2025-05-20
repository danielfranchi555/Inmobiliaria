"use client";
import React, { useState } from "react";

type message = {
  text: string;
  sender: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<message[]>([]); // Specify the type here
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // Aquí podrías agregar la lógica para responder automáticamente
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Respuesta automática", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1000,
      }}
    >
      {open ? (
        <div
          style={{
            width: "350px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "1rem",
              borderBottom: "1px solid #eee",
              background: "#0070f3",
              color: "white",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Chatbot</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
          <div
            style={{
              height: "300px",
              overflowY: "auto",
              padding: "1rem",
              background: "#fafafa",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "0.5rem 0",
                }}
              >
                <span
                  style={{
                    background: msg.sender === "user" ? "#0070f3" : "#eaeaea",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    display: "inline-block",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "1rem",
              borderTop: "1px solid #eee",
              background: "white",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe un mensaje..."
              style={{
                width: "75%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginRight: "0.5rem",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#0070f3",
            color: "white",
            border: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          aria-label="Abrir chatbot"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
