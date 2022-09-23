import {useDispatch} from "react-redux";
import {resetVideogames,getAllVideogames,setPage} from "../../redux/actions.js";


function ButtonRecarga() {
    const dispatch = useDispatch();
    
    const recargarHandleClick = (e) => {
        e.preventDefault();
        dispatch(resetVideogames());
        dispatch(getAllVideogames());
        dispatch(setPage(1));
      };
    return (
        <div>
            <button className="btn-crV" onClick={(e) => recargarHandleClick(e)}>
              Recargar
            </button>
        </div>
      );
}

export default ButtonRecarga;