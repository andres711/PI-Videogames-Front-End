import {useDispatch} from "react-redux";
import {filterCreacion, setPage} from "../../redux/actions.js";
import "./FO.css";

function FiltroOrigen() {
   const dispatch = useDispatch();
   const creacionHandleChange = (e) => {
    dispatch(filterCreacion(e.target.value));
    dispatch(setPage(1));
  };
    return (

        <div>
             <select
              onChange={(e) => creacionHandleChange(e)}
              className="selectors"
              defaultValue="all"
            >
              <option value="all">Filtro origen</option>
              <option value="db">Creados</option>
              <option value="api">Existentes</option>
            </select>
        </div>
      );
}

export default FiltroOrigen;