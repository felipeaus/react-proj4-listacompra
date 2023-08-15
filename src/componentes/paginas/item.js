import React, { useState, useEffect } from "react";
import "./style.css"

export function Item(props) {

    const [textos, setTextos] = useState(["", "", ""]);
    const [resultado, setResultado] = useState(0);
  
    const handleTextoChange = (index, novoTexto) => {
        const newTextos = [...textos];
        newTextos[index] = novoTexto;
        setTextos(newTextos);
    };

    const handleSave = () => {
        localStorage.setItem("textos", JSON.stringify(textos));
        alert("Informações salvas com sucesso!");
    };

    const calcularResultado = () => {
        const segundoValor = parseFloat(textos[1]);
        const terceiroValor = parseFloat(textos[2]);

        if (!isNaN(segundoValor) && !isNaN(terceiroValor)) {
            setResultado(segundoValor * terceiroValor);
        } else {
            setResultado(0);
        }
    };

    useEffect(() => {
        const storedTexts = JSON.parse(localStorage.getItem("textos"));
        if (storedTexts) {
          setTextos(storedTexts);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem("textos", JSON.stringify(textos));
        calcularResultado();
    }, [textos]);

    useEffect(() => {
        calcularResultado();
    }, [textos[1], textos[2]]);
  
    return (
        <div>
        <ul className="itens-li">
          {textos.map((texto, index) => (
            <li key={index} className="preencher">
              <input
                type="text"
                value={texto}
                onChange={(e) => handleTextoChange(index, e.target.value)}
              />
            </li>
          ))}
          <li className="nao-preencher">{resultado}</li>
          <button onClick={handleSave}>Salvar</button>
        </ul>
      </div>
    );
}