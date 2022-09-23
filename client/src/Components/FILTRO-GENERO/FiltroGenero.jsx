import {useSelector, useDispatch} from "react-redux";
import {filterGenero, setPage} from "../../redux/actions.js";
import "./FG.css";

function FiltroGenero() {
    
    const dispatch = useDispatch();
    const generos = useSelector((state) => state.generos);
    const genreHandleChange = async (e) => {
        dispatch(filterGenero(e.target.value));
        dispatch(setPage(1));
      };

    return (
        <div>
             <select
              onChange={(e) => genreHandleChange(e)}
              className="selectors"
              defaultValue="All"
            >
              <option value="All">Filtro por genero</option>
              {generos.map((gen) => {
                return (
                  <option key={generos.indexOf(gen)} value={gen.nombre}>
                    {gen.nombre}
                  </option>
                );
              })}
            </select>
        </div>
      );
}

export default FiltroGenero;