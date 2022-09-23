import React from "react";
import { useDispatch } from "react-redux";
import { deleteVideogame, resetAllVideogames } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ imagen, nombre, generos, rating, id }) {
  const dispatch = useDispatch();
  const handleClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteVideogame(id));
    alert(`Videojuego:${nombre} id:${id} eliminado`);
    dispatch(resetAllVideogames());
  };
  return (
    <div className="tarjeta">
      {id.toString().match(/[aA-zZ]/) && (
        <button
          className="tarjeta__btn-delete"
          onClick={(e) => handleClickDelete(e)}
        >
          X
        </button>
      )}
      <h3 className="tarjeta__title">{nombre}</h3>

      <img src={imagen} alt={nombre} width="300px" height="250px" />

      <div className="tarjeta__box-rating">
        <h4 className="box-rating__title">RATING: {rating}</h4>
      </div>

      <h4>
        <Link to={`/detail/${id}`} className="tarjeta__detail">Ir a Detalle</Link>
      </h4>

      {/* <h6 >{generos}</h6> */}
    </div>
  );
}

export default Card;
