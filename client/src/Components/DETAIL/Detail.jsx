import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { detailVideogame, resetDetail } from "../../redux/actions.js";
import "./Detail.css";

function Detail() {
  let { id } = useParams();
  const objHistory = useHistory();
  const dispatch = useDispatch();

  let detail = useSelector((state) => state.detailVideogame);


  useEffect(() => {
    dispatch(detailVideogame(id));
    return () => {
    dispatch(resetDetail());
    }
  }, [dispatch, id])
  

  function handleClick(e) {
    e.preventDefault();
    objHistory.push("/home");
  }

  return (
    <div className="container-Principal">
      {Object.keys(detail).length ? (
        <div>
          <div className="card-grande">
            <img
              src={detail.imagen}
              alt="not exist"
              width="500px"
              height="500px"
            />
            <h1>{detail.nombre}</h1>
            <h3>Descripcion:</h3>
            <p>{detail.descripcion}</p>
            <h2>Rating: {detail.rating} </h2>
            <h3>Generos:</h3>
            <p>{detail.generos.map((g) => g + ", ")}</p>
            <h3>Fecha de lanzamiento:</h3>
            <p>{detail.fechaDeLanzamiento}</p>
            <h3>Plataformas:</h3>
            <p>{detail.plataformas.map((e) => e + ", ")}</p>
          </div>
          
          <button onClick={(e) => handleClick(e)}>Volver a Home</button>
          
          
        </div>
      ) : (
        <h2>Cargando...</h2>
      )}
    </div>
  );
}

export default Detail;
