import React, { useState } from "react";
import { contextProvider } from "../components/ContextApi";
import imagen3 from "../imagesLogin/image3.jpg";
import imagen1 from "../imagesLogin/image1.jpg";
import imagen4 from "../imagesLogin/image4.jpg";
import imagen5 from "../imagesLogin/image5.jpg";
import imagen8 from "../imagesLogin/image8.jpg";
import imagen6 from "../imagesLogin/image6.jpg";
import logo from "../imagesLogin/LogoPIXME.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";

const CodeRecovery = () => {
  const navigate = useNavigate();
  const [invalideCode, setInvalideCode] = useState(false);
  const { codeValidation, setCodeValidation } = contextProvider();

  const [codeInput, setCodeInput] = useState("");
  const handleCodeChange = (event) => {
    setCodeInput(event.target.value);
  };
  const handleEventClick = () => {
    if (codeValidation.code == codeInput) {
      navigate("/recoverypassword");
    } else {
      setCodeInput("");
      setInvalideCode(true);
    }
  };
  return (
    <div className="Back">
      <div className="collageCreate">
        <div className="container1Create">
          <div className="dCreate">
            <img src={imagen1} alt="" draggable="false" />
          </div>
          <div className="dCreate"></div>
          <div className="dCreate">
            <img src={imagen3} alt="" draggable="false" />
          </div>
        </div>
        <div className="container2Create">
          <div className="dCreate">
            <img src={imagen4} alt="" draggable="false" />
          </div>
          <div className="dCreate">
            <img src={imagen5} alt="" draggable="false" />
          </div>
        </div>
        <div className="container3Create">
          <div className="dCreate">
            <img src={imagen8} alt="" draggable="false" />
          </div>
          <div className="dCreate"></div>
          <div className="dCreate">
            <img src={imagen6} alt="" draggable="false" />
          </div>
        </div>
      </div>
      <div className="Pag">
        <div className="BigLogo">
          <img src={logo} alt="PixMe Logo" draggable="false" />
        </div>
        <h2 className="Tittle">Verificar el codigo</h2>
        <p className="info">
          Por favor, ingresa el código de verificación que has recibido en tu
          correo electrónico para continuar con el proceso de recuperación de tu
          cuenta.
        </p>
        <form className="form">
          <input
            onChange={handleCodeChange}
            placeholder="Codigo"
            className="Input-form"
            // type="number"
            name="code"
            value={codeInput}
          />
          <div className="btn-loading">
            <button className="btn" type="button" onClick={handleEventClick}>
              <i className="fa-solid fa-file-code" />
              Verificar Codigo
            </button>
          </div>
          {invalideCode && <p className="alert3">Codigo incorrecto</p>}
          <Link className="btn2" to={"/login"}>
            Regresar al Inicio de Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CodeRecovery;
