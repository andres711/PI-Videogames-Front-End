import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setPage } from "../../redux/actions";
import "./Paginado.css";


function Paginado({ videogames, videoPerpage }) {
  const dispatch = useDispatch();
  const page = useSelector(state=> state.page)
  
  const arrayNumber = []; 
  for (let i = 0; i < Math.ceil(videogames / videoPerpage); i++) {
    arrayNumber.push(i+1);
  }

  return (
    <nav>
      <ul className="paginado">
        {arrayNumber.map((n) => {
          return (
            <button key={n} 
            onClick={() => 
             { 
            dispatch(setPage(n))}} 
            className={page===n ? "number" : ""}>
              {n}
            </button>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginado;
