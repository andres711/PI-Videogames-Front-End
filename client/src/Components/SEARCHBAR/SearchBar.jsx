import React from "react";
import { videogameByName, resetVideogames } from "../../redux/actions.js";
import { useState } from "react";
import { useDispatch } from "react-redux";

import './Searchbar.css';

function Search() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetVideogames())
    dispatch(videogameByName(name));
    setName("")
  }

  return (
    <div className="container-searchBar">
      <input
      className="searchBar__input"
        placeholder="Buscar por nombre"
        type="text"
        onChange={(e)=>handleChange(e)}
        value={name}
      />
      <button type={"submit"} className="searchBar__btn" onClick={(e)=>handleSubmit(e)}>Buscar</button>
    </div>
    
  );
}

export default Search;
