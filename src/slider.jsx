import React from "react";
import { ReactDOM } from "react";
import { useEffect, useState, useRef } from "react";
import "./slider.css"

export function Slider(props) {
  const [widthDiv, setWidthDiv] = useState(0)
  let inputRef = useRef(null)
  let barraProgresoContainerRef = useRef(null);
  let barraProgresoRef = useRef(null);
  let div = null;
  const handleRangeChange = (e) => {
    // Llama a la función onChange proporcionada en la prop
    props.eventChange(e);
    if (inputRef.current.value > 10) {
      console.log("ee");
    }
    // Ajusta el ancho del elemento de progres
  };

  const cambiaAnchoBarraProgress = (valorAudio, duracionMusica) => {
    if (duracionMusica > 0) {
      const progress = (valorAudio / duracionMusica) * 100;
      setWidthDiv(progress)
      console.log(progress);
    }

  }
  useEffect(() => {
    //div = document.querySelector(".barra-progreso");
    ///div.style.width = "10px";
    cambiaAnchoBarraProgress(props.valorAudio, props.valorDuracionMusica);
    console.log(props.valorAudio);
  }, [props.valorAudio]);

  return (
    <>
      <div className="input-container">
        <input
          className="input-musica"
          ref={inputRef}
          type="range"
          value={props.value}
          min="0"
          max={props.max}
          onChange={handleRangeChange}
          onMouseUp={props.eventMouseUp}
          onInput={cambiaAnchoBarraProgress}
        />
        <div className="container-principal">
          <div ref={barraProgresoContainerRef}className="container-barra-progreso">
            <div ref={barraProgresoRef} className="barra-progreso"
              style={{ width: `${widthDiv}%`, }}>
              </div>
          </div>

        </div>
      </div>

    </>
  )
}












