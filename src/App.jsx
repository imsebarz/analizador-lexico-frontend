import { useState } from "react";
import "./App.css";
import Token from "./Token";

function App() {
  const [tokens, setTokens] = useState([]);
  const [tree, setTree] = useState("");
  const [errors, setErrors] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const source = {
      source: input,
    };
    const response = await fetch(
      "https://analizador-lexico-server.herokuapp.com/process",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(source),
      }
    );
    const data = await response.json();
    setErrors(data.errors);
    setTree(JSON.stringify(data.program, null, 2));
    setTokens(data.tokens);
    console.log(tree);
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
      {tree ? (
        <>
          <h1>Arbol de Sintaxis abstracto</h1>
          <textarea className="tree" value={tree} disabled />
        </>
      ) : (
        ""
      )}
      {errors ? (
        <>
          <h1>Errores</h1>
          {errors.map((error) => (
            <div className="token illegal">{error}</div>
          ))}
        </>
      ) : (
        ""
      )}
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
