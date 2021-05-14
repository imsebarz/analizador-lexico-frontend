import { useState } from "react";
import "./App.css";
import Token from "./Token";

function App() {
  const [tokens, setTokens] = useState([]);
  const [input, setInput] = useState("");
  const ejemplos = [
    `var cinco  = 5
const isCinco = function(cinco){
  if(cinco == 5){
    return true
  }else{
    return false
  }
}`,
    `let edad = 20
var cumpleaños = edad + 1
  `,
    `¿?@&`,
    `const PI = 3.141592
const R = 7 
var perimetroCirculo = PI * R * 2`,
    `const saludo = 'Hola, Bienvenido a mi analizador léxico'
while(true){
      return saludo
    }`,
  ];

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const showExample = () => {
    let ejemplo = ejemplos[Math.floor(Math.random() * ejemplos.length)];
    setInput(ejemplo);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInput("");
    setTokens([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const source = {
      source: input,
    };

    fetch("https://dry-savannah-46761.herokuapp.com/process", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(source),
    })
      .then((response) => response.json())
      .then((data) => setTokens(data.data));
  };
  return (
    <div className="App">
      <h1>Analizador Léxico</h1>
      <form action="" onSubmit={handleSubmit} onReset={handleReset}>
        <textarea
          name="input"
          placeholder="Ingresa aqui la expresión a analizar (Basado en sintaxis de Javascript)"
          onChange={handleInput}
          value={input}
        />
        <p className="ejemplo-toggle" onClick={showExample}>
          Ver un ejemplo
        </p>
        <div className="buttons">
          <button type="submit" className="submit-button">
            Analizar
          </button>
          <br />
          <button type="reset" className="reset-button">
            Limpiar
          </button>
        </div>
      </form>
      <div className="tokens-container">
        <h2>
          Tokens <span>{`[${tokens.length}]`}</span>
        </h2>
        {tokens.map((token) => (
          <Token
            type={token.type}
            literal={token.literal}
            key={tokens.indexOf(token)}
            id={tokens.indexOf(token) + 1}
          ></Token>
        ))}
      </div>
    </div>
  );
}

export default App;
