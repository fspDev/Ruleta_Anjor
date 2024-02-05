import React, { useState, useRef } from "react";

function App() {
  // Estados para controlar la visibilidad de la imagen y el número de la casilla
  const [mostrarImagen, setMostrarImagen] = useState(false);
  const [numeroCasilla, setNumeroCasilla] = useState(null);
  
  // Estado para controlar el premio actual
  const [premio, setPremio] = useState("Suerte!");
  
  // Estado para controlar la rotación de la ruleta
  const [rotation, setRotation] = useState(0);
  
  // Referencia para acceder al elemento de la barra de girar
  const barraRef = useRef(null);

  // Función para realizar la rotación de la ruleta
  const girar = () => {
    const nuevaRotacion = Math.floor(Math.random() * 210) + 340;
    setRotation(rotation + 2 * nuevaRotacion);
  };

  // Función ejecutada al finalizar la animación de la ruleta
  const final = () => {
    // Función para mostrar la imagen correspondiente a la casilla
    const mostrarImagenCasilla = (numero) => {
      setMostrarImagen(true);
      setNumeroCasilla(numero);

      // Agregar la clase blurred al contenedor principal
      document.body.classList.add('blurred');

      // Ocultar la imagen después de 3 segundos
      setTimeout(() => {
        setMostrarImagen(false);
        setNumeroCasilla(null);

        // Quitar la clase blurred al contenedor principal
        document.body.classList.remove('blurred');
      }, 3000);
    };

    const grados = (rotation % 360 + 360) % 360;
    let nuevoPremio = "";

    // Determinar el premio según el rango de grados
    if (grados >= 0 && grados <= 44) {
      nuevoPremio = "Ganaste una Gorra";
      mostrarImagenCasilla(1);
    } else if (grados >= 45 && grados <= 89) {
      nuevoPremio = "Ganaste una Lapicera";
      mostrarImagenCasilla(2);
    } else if (grados >= 90 && grados <= 134) {
      nuevoPremio = "Gracias por jugar";
      mostrarImagenCasilla(3);
    } else if (grados >= 135 && grados <= 179) {
      nuevoPremio = "Volvé a Tirar";
      mostrarImagenCasilla(4);
    } else if (grados >= 180 && grados <= 224) {
      nuevoPremio = "Ganaste una gorra";
      mostrarImagenCasilla(5);
    } else if (grados >= 225 && grados <= 269) {
      nuevoPremio = "Ganaste una Lapicera";
      mostrarImagenCasilla(6);
    } else if (grados >= 270 && grados <= 314) {
      nuevoPremio = "Ganaste un llavero";
      mostrarImagenCasilla(7);
    } else if (grados >= 315 && grados <= 359) {
      nuevoPremio = "Volvé a Tirar";
      mostrarImagenCasilla(8);
    }

    // Actualizar el premio
    setPremio(nuevoPremio);

    // Restaurar el texto de "Suerte!" después de 3 segundos
    setTimeout(() => {
      setPremio("Suerte!");
    }, 3000);
  };

  // Función para manejar el evento de clic en el botón de girar
  const lanzar = () => {
    setMostrarImagen(false);
    girar();
  };

  return (
    <>
      <div className="plafon">
        {/* Elemento de la ruleta */}
        <div
          className="ruleta"
          style={{
            backgroundImage: `url('./assets/ruleta.png')`,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4s cubic-bezier(0.2, 1.2, 1.0, 0.99)",
            filter: mostrarImagen ? "blur(5px)" : "none",
          }}
          onTransitionEnd={final}
        ></div>

        {/* Contenedor de la imagen de la casilla */}
        <div className="imagen-casilla-container">
          {/* Mostrar la imagen de la casilla si está activa */}
          {mostrarImagen && numeroCasilla && (
            <div className="imagen-casilla">
              <img src={`./assets/${numeroCasilla}.png`} alt={`Casilla ${numeroCasilla}`} />
            </div>
          )}
        </div>

        {/* Elemento para mostrar el premio actual */}
        <div className="premio">{premio}</div>

        {/* Barra inferior con el botón de girar */}
        <div className="barraInferior">
          <button className="lanzar" onClick={lanzar}>
            Girar
          </button>
        </div>

        {/* Elemento central con imagen */}
        <div className="central">
          <img src="./assets/centro.png" alt="centro" style={{ filter: mostrarImagen ? "blur(5px)" : "none" }} />
        </div>
      </div>
    </>
  );
}

export default App;
