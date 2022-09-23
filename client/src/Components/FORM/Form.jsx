import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPlatforms,
  createVideogame,
  resetVideogames,
  resetAllVideogames,
  setPage
} from "../../redux/actions.js";

import "./Form.css";

//nombre, descripcion, plataformas obligatorios
//ademas rating, fecha de lanzamiento y generos
function validate(input) {
  let errors = {};
  if (!input.nombre) errors.nombre = "nombre requerido";
  if (input.nombre.match(/[0-9-_@]/)) errors.nombre = "solo se aceptan letras";
  if (!input.descripcion) errors.descripcion = "descripcion requerida";
  if (input.plataformas.length === 0)
    errors.plataformas = "plataformas requerida";
  if (input.rating < 0 || input.rating > 5)
    errors.rating = "solo se permiten nros del 1 al 5";
  return errors;
}

export const Form = ({ history }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  const generos = useSelector((state) => state.generos);
  const plataformas = useSelector((state) => state.plataformas);

  //ESTADOS LOCALES
  const [input, setInput] = useState({
    nombre: "",
    descripcion: "",
    fechaDeLanzamiento: "",
    rating: null,
    generos: [],
    plataformas: [],
  });
  const [errors, setError] = useState({});

  //MANEJADORES DE EVENTOS
  const eventhandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGeneros = (e) => {
    if (!input.generos.includes(e.target.value)) {
      setInput({
        ...input,
        generos: [...input.generos, e.target.value]
      });
    } else {
      setInput({
        ...input
      })
    }
  };
  
  const handleSelectPlataformas = (e) => {
    if (!input.plataformas.includes(e.target.value)) {
      setInput({
        ...input,
        plataformas: [...input.plataformas, e.target.value]
      })
    }
    else {
      setInput({
        ...input,
      })
    };

    setError(
      validate({
        ...input,
        plataformas: [...new Set([...input.plataformas, e.target.value])],
      })
    );
  };

  const crearVideogame = (e) => {
    e.preventDefault();
    const { nombre, descripcion, plataformas } = input;
    if (!nombre || !descripcion || plataformas.length === 0) {
      alert("complete campos requeridos");
    } else if (errors.rating) {
      alert("verifique los datos");
    } else {
      dispatch(createVideogame(input));
      alert("Creado con exito");
      setInput({
        nombre: "",
        descripcion: "",
        plataformas: [],
        fechaDeLanzamiento: "",
        rating: 0,
        generos: [],
      });
      dispatch(resetVideogames());
      dispatch(resetAllVideogames());
      dispatch(setPage(1));
      history.push("/home");
    }
  };

  const handleDeleteGeneros = (gen) => {
    setInput({
      ...input,
      generos: input.generos.filter((e) => e !== gen),
    });
  };
  const handleDeletePlataformas = (pl) => {
    setInput({
      ...input,
      plataformas: input.plataformas.filter((e) => e !== pl),
    });
  };

  return (
    <div className="container-div">
      <Link to="/home">
        <button className="btn-Volver">Home</button>
      </Link>
      <h1>Creá tu videojuego</h1>

      <form onSubmit={(e) => crearVideogame(e)} className="formulario">
        <div>
          <div>
            <label>Nombre</label>
          </div>
          <input
            placeholder="Nombre..."
            className="dataForm"
            type="text"
            name="nombre"
            value={input.nombre}
            onChange={(e) => eventhandler(e)}
          ></input>
          <span>
            {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
          </span>
        </div>

        <div>
          <div>
            <label>Descripcion</label>
          </div>
          <input
            placeholder="Descripcion..."
            className="dataForm"
            type="text"
            name="descripcion"
            value={input.descripcion}
            onChange={(e) => eventhandler(e)}
          ></input>
          <span>
            {errors.descripcion && (
              <p style={{ color: "red" }}>{errors.descripcion}</p>
            )}
          </span>
        </div>

        <div>
          <div>
            <label>Fecha de lanzamiento</label>
          </div>
          <input
            placeholder="Fecha de lanzamiento..."
            className="dataForm"
            type="date"
            name="fechaDeLanzamiento"
            value={input.fechaDeLanzamiento}
            onChange={(e) => eventhandler(e)}
          ></input>
        </div>

        <div>
          <div>
            <label>Rating</label>
          </div>
          <input
            placeholder="Rating..."
            className="dataForm"
            type="number"
            name="rating"
            value={input.rating}
            onChange={(e) => eventhandler(e)}
          ></input>
          <span>
            {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
          </span>
        </div>

        <div>
          <div>
            <label className="genero">Generos</label>
          </div>
          <select
            onChange={(e) => handleSelectGeneros(e)}
            className="selectors"
          >
            <option selected>Elegir...</option>
            {generos.map((g) => {
              return <option key={g.nombre} value={g.nombre}>{g.nombre}</option>;
            })}
          </select>
          <div>
            {input.generos.map((gen) => {
              return (
                <div key={gen}>
                  <span>{gen}</span>
                  <button onClick={() => handleDeleteGeneros(gen)}>X</button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div>
            <label>Plataformas</label>
          </div>
          <select
            onChange={(e) => handleSelectPlataformas(e)}
            className="selectors"
          >
            <option selected>Elegir...</option>
            {plataformas.map((p) => {
              return <option value={p} key={p}>{p}</option>;
            })}

          </select>
          <span>
            {errors.plataformas && (
              <p style={{ color: "red" }}>{errors.plataformas}</p>
            )}
          </span>

          <div>
            {input.plataformas.map((pla) => {
              return (
                <div key={pla}>
                  <span>{pla}</span>
                  <button onClick={() => handleDeletePlataformas(pla)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit">CREAR</button>
      </form>
    </div>
  );
};
