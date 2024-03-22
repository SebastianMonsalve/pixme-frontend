import { useState, useEffect } from "react";
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
import { contextProvider } from "../components/ContextApi";
import Loading from "../components/Loading";
import { Format } from "../components/Funtions";

const CreateImage = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const { setSection, section, setImages, images } = contextProvider();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(!isLoading);
    const ImageBody = {
      name: data.name,
      image: data.image[0],
      author: section[0]._id,
    };
    const form = new FormData();
    for (let key in ImageBody) {
      form.append(key, ImageBody[key]);
    }
    const res = await axios.post(`${VITE_API_URL}/images/`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setImages([...images, res.data]);
    setIsLoading(!isLoading);
    navigate("/home");
  };
  const inputImageValue = watch("image", "");
  useEffect(() => {
    setImageSelected(inputImageValue[0]);
  }, [inputImageValue]);
  return (
    <>
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
            {imageSelected ? (
              Format(inputImageValue[0].name) == "mp4" ||
              Format(inputImageValue[0].name) == "mov" ? (
                <video
                  src={URL.createObjectURL(imageSelected)}
                  autoPlay
                  muted
                  loop
                ></video>
              ) : (
                <img
                  draggable="false"
                  src={URL.createObjectURL(imageSelected)}
                  alt="image"
                />
              )
            ) : (
              <img src={logo} draggable="false" alt="false" />
            )}
          </div>
          <h2 className="Tittle">Subir Multimedia</h2>
          <p className="info">
            Por favor, sube una imagen o video y proporciona un título
            obligatorio.
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="Input-form"
              type="text"
              placeholder="Título de la Imagen o Video"
              {...register("name", {
                required: true,
                // maxLength: 20,
              })}
            />
            <div className="input-File">
              <input
                ref={control.register}
                type="file"
                className="File-form"
                {...register("image", {
                  required: true,
                })}
              />
              <button className="btn-add">
                <i className="fa-regular fa-image" />
                Seleccionar
              </button>
            </div>
            <div className="btn-loading">
              {!isLoading && (
                <button type="submit" className="btn">
                  <i className="fa-solid fa-cloud-arrow-up" />
                  Guardar
                </button>
              )}
              {isLoading && <Loading />}
            </div>
            <Link className="btn2" to={"/home"}>
              Regresar al home
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateImage;
