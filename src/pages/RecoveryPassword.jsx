import React, { useState } from "react";
import { contextProvider } from "../components/ContextApi";
import imagen3 from "../imagesLogin/image3.jpg";
import imagen1 from "../imagesLogin/image1.jpg";
import imagen4 from "../imagesLogin/image4.jpg";
import imagen5 from "../imagesLogin/image5.jpg";
import imagen8 from "../imagesLogin/image8.jpg";
import imagen6 from "../imagesLogin/image6.jpg";
import logoPixme from "../imagesLogin/LogoPIXME.png";
import axios from "axios";
import { VITE_API_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { codeValidation, setCodeValidation } = contextProvider();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };
  const changePassword = async () => {
    if (
      passwords.password === passwords.confirmPassword &&
      passwords.password.length >= 6
    ) {
      setIsLoading(!isLoading);
      const res = await axios
        .put(
          `${VITE_API_URL}/users/recoverypassword/${codeValidation.user._id}`,
          passwords
        )
        .then((response) => {
          setCodeValidation(null);
          navigate("/login");
        });
    } else {
      setPasswords({
        password: "",
        confirmPassword: "",
      });
      setIsCorrectPassword(true);
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
          <img src={logoPixme} draggable="false" />
        </div>
        <h2 className="Tittle">Cambiar contraseña</h2>
        <p className="info">
          Por favor elige tu nueva contraseña (debe contener más de 6 dígitos):
        </p>
        <form className="form">
          <input
            onChange={handleInputChange}
            value={passwords.password}
            className="Input-form"
            placeholder="Nueva contraseña"
            type="password"
            name="password"
          />
          <input
            onChange={handleInputChange}
            value={passwords.confirmPassword}
            className="Input-form"
            placeholder="Confirmar nueva contraseña"
            type="password"
            name="confirmPassword"
          />
          <div className="btn-loading">
            {!isLoading && (
              <button
                onClick={() => {
                  changePassword();
                }}
                className="btn"
                type="button"
              >
                <i className="fa-solid fa-check-to-slot" />
                Confirmar
              </button>
            )}
            {isLoading && <Loading />}
          </div>
          {isCorrectPassword && (
            <p className="alert3">Las contraseñas deben ser iguales</p>
          )}
          <Link className="btn2" to={"/login"}>
            Regresar al Inicio de Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPassword;
