import React, { useEffect, useState } from "react";
import { VITE_API_URL } from "../config";
import imagen3 from "../imagesLogin/image3.jpg";
import imagen1 from "../imagesLogin/image1.jpg";
import imagen4 from "../imagesLogin/image4.jpg";
import imagen5 from "../imagesLogin/image5.jpg";
import imagen8 from "../imagesLogin/image8.jpg";
import imagen6 from "../imagesLogin/image6.jpg";
import logo from "../imagesLogin/LogoPIXME.png";
import { contextProvider } from "../components/contextApi";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const Config = () => {
  const [isNotValid, setIsNotValid] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const { section, setSection } = contextProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [userSection, setUserSection] = useState({
    name: section[0].name,
    password: "",
  });
  const params = useParams();
  useEffect(() => {
    document.title = `PixMe/${section[0].name}`;
    return () => {
      document.title = "PixMe";
    };
  });
  const handleInputValue = (event) => {
    const { name, value } = event.target;
    setUserSection((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const sendData = async () => {
    let dataUpdate = null;
    if (!userSection.name) {
      setIsNotValid(!isNotValid);
      return;
    } else {
      setIsLoading(!isLoading);
      setIsToast(!isToast);
      if (!userSection.password) {
        dataUpdate = {
          name: userSection.name,
        };
      } else {
        dataUpdate = {
          name: userSection.name,
          password: userSection.password,
        };
      }
    }
    await axios
      .put(`${VITE_API_URL}/users/${params.id}`, dataUpdate)
      .then((response) => {
        setSection([response.data]);
        if (isNotValid) {
          setIsNotValid(!isNotValid);
        }
      });
    setIsLoading((prevState) => !prevState);
    setTimeout(() => {
      setIsToast((prevState) => !prevState);
    }, 2000);
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
          <img src={logo} draggable="false" />
        </div>
        <h2 className="Tittle">Configuración</h2>
        <p className="info">
          ¡Bienvenido a tu Perfil! En este formulario, puedes actualizar tu
          nombre de usuario y cambiar tu contraseña de manera rápida y sencilla.
        </p>
        <form className="form">
          <input
            className="Input-form"
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handleInputValue}
            value={userSection.name}
          />
          <input
            className="Input-form"
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleInputValue}
            value={userSection.password}
          />
          <div className="btn-loading">
            {!isLoading && (
              <button className="btn" type="button" onClick={sendData}>
                <i className="fa-solid fa-cloud-arrow-down" />
                Guardar
              </button>
            )}
            {isLoading && <Loading />}
          </div>
          {isNotValid && <p className="alert3">Nombre requerido</p>}
          <Link className="btn2" to={"/home"}>
            Regresar al Home
          </Link>
        </form>
      </div>
      {isToast && (
        <div className="toast">
          <span className="icon-toast">
            <i className="fa-regular fa-circle-check" />
          </span>
          <span className="text-toast">Actualizado</span>
        </div>
      )}
    </div>
  );
};

export default Config;
