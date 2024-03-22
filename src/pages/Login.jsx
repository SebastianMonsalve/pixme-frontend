import React, { useState } from "react";
import { VITE_API_URL } from "../config";
import logo from "../imagesLogin/LogoPIXME.png";
import imagen3 from "../imagesLogin/image3.jpg";
import imagen1 from "../imagesLogin/image1.jpg";
import imagen2 from "../imagesLogin/image2.jpg";
import imagen4 from "../imagesLogin/image4.jpg";
import imagen5 from "../imagesLogin/image5.jpg";
import imagen7 from "../imagesLogin/image7.jpg";
import imagen8 from "../imagesLogin/image8.jpg";
import imagen6 from "../imagesLogin/image6.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { contextProvider } from "../components/contextApi";
import Loading from "../components/Loading";

const Login = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setSection, section, setImages } = contextProvider();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(!isLoading);
    const res = axios
      .post(`${VITE_API_URL}/users/login/`, data)
      .then((response) => {
        setSection(response.data);
        if (response.data !== "Not found") {
          setImages(response.data[0].images);
        }
        setIsLoading(!isLoading);
        navigate("/home");
      });
  };

  return (
    <>
      <div className="Main">
        <div className="bar"></div>
        <div className="Photos">
          <div className="collage">
            <div className="container1">
              <div className="diamond">
                <img src={imagen1} alt="" draggable="false" />
              </div>
              <div className="diamond">
                <img src={imagen2} alt="" draggable="false" />
              </div>
              <div className="diamond">
                <img src={imagen3} alt="" draggable="false" />
              </div>
            </div>
            <div className="container2">
              <div className="diamond">
                <img src={imagen4} alt="" draggable="false" />
              </div>
              <div className="diamond">
                <img src={imagen5} alt="" draggable="false" />
              </div>
            </div>
            <div className="container3">
              <div className="diamond">
                <img src={imagen8} alt="" draggable="false" />
              </div>
              <div className="diamond">
                <img src={imagen7} alt="" draggable="false" />
              </div>
              <div className="diamond">
                <img src={imagen6} alt="" draggable="false" />
              </div>
            </div>
          </div>
        </div>
        <div className="SideBar">
          <div className="BigLogo">
            <img src={logo} draggable="false" />
          </div>
          <h2 className="Tittle">Iniciar sesión</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="Input-form"
              type="text"
              placeholder="Correo"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <div className="input-container">
              <input
                type={isVisiblePassword ? "text" : "password"}
                className="Input-form"
                placeholder="Contraseña"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              {isVisiblePassword ? (
                <i
                  onClick={() => {
                    setIsVisiblePassword(!isVisiblePassword);
                  }}
                  className="fa-solid fa-eye-slash"
                  id="password-toggle"
                />
              ) : (
                <i
                  onClick={() => {
                    setIsVisiblePassword(!isVisiblePassword);
                  }}
                  className="fa-solid fa-eye"
                  id="password-toggle"
                />
              )}
            </div>

            <div className="btn-loading">
              {!isLoading && (
                <button type="submit" className="btn">
                  <i className="fa-solid fa-arrow-right" />
                  Ingresar
                </button>
              )}
              {isLoading && <Loading />}
            </div>
            <p className="alert1">{errors.email && "Correo invalido"}</p>
            <p className="alert2">{errors.password && "Contraseña invalida"}</p>
            <Link className="btn2rec" to={"/recoveryaccount"}>
              Restablecer Contraseña
            </Link>
            <Link className="btn2" to={"/createaccount"}>
              Crear una cuenta
            </Link>
          </form>
          {<p className="alert3">{section === "Not found" && section}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
