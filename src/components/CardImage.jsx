import React, { useState } from "react";
import Menu from "./Menu";
import ModalImage from "./ModalImage";
import { Format } from "../components/Funtions";
const CardImage = ({
  item,
  isOpen,
  setIsOpen,
  isModal,
  setIsModal,
  idDelete,
}) => {
  const [isDelete, setIsDelete] = useState(false);
  const getDate = (dateBackend) => {
    const date = new Date(dateBackend);
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    return `${mes}/${dia}/${ano}`;
  };

  return (
    <div className="card">
      {isDelete && (
        <Menu
          id={item._id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          item={item}
          setIsDelete={setIsDelete}
          isDelete={isDelete}
          idDelete={idDelete}
        />
      )}
      {Format(item.image.url) == "mp4" || Format(item.image.url) == "mov" ? (
        <video src={item.image.url} autoPlay muted controls loop></video>
      ) : (
        <img
          src={item.image.url}
          alt="Images"
          loading="lazy"
          draggable="false"
          onClick={() => {
            document.body.style.overflow = "hidden";
            setIsModal((prevState) => ({
              ...prevState,
              ismodal: !prevState.ismodal,
              image: item.image.url,
            }));
          }}
        />
      )}

      <div className="card-layer">
        <button
          className="Menu"
          onClick={() => {
            setIsOpen((prevState) => ({
              ...prevState,
              isopen: !prevState.isopen,
              id: item._id,
            }));
            setIsDelete(!isDelete);
          }}
        >
          <i className="fa-solid fa-ellipsis-vertical" />
        </button>
        <div className="fav">
          {item.isFavorite ? <i className="fa-solid fa-heart" /> : null}
        </div>
        <p className="name">{item.name}</p>
        <p className="date">{getDate(item.createdAt)}</p>
      </div>
    </div>
  );
};

export default CardImage;
