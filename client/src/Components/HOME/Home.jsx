import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//ACTIONS
import { getAllVideogames, getGeneros } from "../../redux/actions.js";
//COMPONENTES
import Card from "../CARD/Card";
import Paginado from "../PAGINADO/Paginado";
import Search from "../SEARCHBAR/SearchBar";
import FiltroGenero from "../FILTRO-GENERO/FiltroGenero.jsx";
import FiltroOrigen from "../FILTRO-ORIGEN/FiltroOrigen.jsx";
import OrderName from "../ORD-NAME/OrderName.jsx";
import OrderRating from "../ORD-RATING/OrderRating.jsx";
import ButtonRecarga from "../BTN-RECARGA/ButtonRecarga.jsx";
//ESTILOS
import "./Home1.css";

//COMPONENTE HOME
function Home() {
  const dispatch = useDispatch();

  //SELECTORES
  const allVideogames = useSelector((state) => state.allVideogames);
  const videogames = useSelector((state) => state.videogames);
  const generos = useSelector((state) => state.generos);
  const pagina = useSelector((state) => state.page);

  //EFECTOS
  useEffect(() => {
    if (allVideogames.length === 0) {
      dispatch(getAllVideogames());
    } else if (generos.length === 0) {
      dispatch(getGeneros());
    }
    setCurrentPage(pagina);
  }, [dispatch, pagina, allVideogames, generos]);

  //ESTADO LOCAL PAGINADO
  const [videogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(pagina);
  const lastPositionPerPage = videogamesPerPage * currentPage;
  const firstPositionPerPage = lastPositionPerPage - videogamesPerPage;
  const currentVideogames = videogames.slice(
    firstPositionPerPage,
    lastPositionPerPage
  );

  //RENDERIZADOOO
  return (
    <div className="main-container">

      <div className="main-container__menu">
        <div >
          <Link to="/">
            <button className="menu__btn">Inicio</button>
          </Link>
        </div>
        <div  >
          <Link to="/create">
            <button className="menu__btn" >Crear videojuego</button>
          </Link>
        </div>
        <div>
        <Search />
        </div>
        {/* <div >
          <button className="menu__btn">
          <ButtonRecarga />
          </button>
         
        </div> */}
      </div>

      <div className="main-container__body-container">
        
        <div className="body-container__side-bar">

          {/* <div className="side-bar__search-bar">
            <Search />
          </div> */}
          <div>
            <h1 style={{color:"white"}}>Filtros</h1>
          </div>
          <div className="side-bar__selectors">
            <FiltroGenero />

            <FiltroOrigen />
          <div>
            <h1 style={{color:"white"}}>
              Ordenamientos
            </h1>
          </div>
            <OrderName />

            <OrderRating />
          </div>
        </div>

        <div className="body-container__cards-container">
          
          <div className="cards-container__paginado">
          <Paginado
              videogames={videogames.length}
              videoPerpage={videogamesPerPage}
            />
          </div>
          <div>
          <ButtonRecarga />
          </div>
            
          
          <div className="cards-container__cards">
            {currentVideogames.length === 0 ? (
              <h2 >Cargando</h2>
            ) : currentVideogames[0] === "no se encontraron videojuegos" ? (
              <h2>No se encontraron videojuegos</h2>
            ) : (
              currentVideogames.map((elemento) => {
                return (
                  <div key={elemento.id}>
                    <Card
                      imagen={elemento.imagen}
                      nombre={elemento.nombre}
                      generos={elemento.generos.map((e) => e + " ")}
                      rating={elemento.rating}
                      id={elemento.id}
                    />
                  </div>
                );
              })
            )}
          </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
