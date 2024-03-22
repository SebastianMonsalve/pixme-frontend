import React, { useState } from "react";
import { VITE_API_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";
import imagen3 from "../imagesLogin/image3.jpg";
import imagen1 from "../imagesLogin/image1.jpg";
import imagen4 from "../imagesLogin/image4.jpg";
import imagen5 from "../imagesLogin/image5.jpg";
import imagen8 from "../imagesLogin/image8.jpg";
import imagen6 from "../imagesLogin/image6.jpg";
import logo from "../imagesLogin/LogoPIXME.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../components/Loading";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotMatchPassword, setIsNotMatchPassword] = useState(false);
  const [isNotDisponible, setIsNotDisponible] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (watch("password", "") !== watch("confirmPassword", "")) {
      setIsNotMatchPassword(true);
    } else {
      setIsLoading(!isLoading);
      const res = axios
        .post(`${VITE_API_URL}/users/`, data)
        .then((response) => {
          if (response.data === "Correo ya registrado") {
            setIsLoading(false);
            setIsNotDisponible(true);
          } else {
            navigate("/login");
          }
        });
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
          <img src={logo} draggable="false" />
        </div>
        <h2 className="Tittle">Crear cuenta</h2>
        <p className="info">
          ¡Bienvenido! Completa el formulario para crear tu cuenta. Todos los
          campos son obligatorios y la contraseña debe tener al menos 6
          caracteres. Recuerda que la dirección de correo no se puede cambiar
          posteriormente.
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="Input-form"
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true, maxLength: 80 })}
          />
          <input
            className="Input-form"
            type="text"
            placeholder="Correo"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <input
            className="Input-form"
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <input
            className="Input-form"
            type="password"
            placeholder="Confirmar Contraseña"
            {...register("confirmPassword", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <div className="btn-loading">
            {!isLoading && (
              <button className="btn" type="submit">
                <i className="fa-solid fa-file-import" />
                Crear cuenta
              </button>
            )}
            {isLoading && <Loading />}
          </div>
          <p className="alert1">{errors.email && "Correo Invalido"}</p>
          <p className="alert2">{errors.password && "Contraseña Invalida"}</p>
          <p className="alert3">
            {errors.confirmPassword && "Las contraseñas no coinciden"}
            {isNotMatchPassword && "Las contraseñas no coinciden"}
            {isNotDisponible && "Correo ya registrado"}
          </p>
          <Link className="btn2" to={"/login"}>
            Regresar al Inicio de Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
