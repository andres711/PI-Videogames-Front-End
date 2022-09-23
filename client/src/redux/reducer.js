import {
    GET_ALL_VIDEOGAMES,
    GET_DETAIL_VIDEOGAME,
    SET_CURRENT_PAGE,
    VIDEO_BYNAME,
    GET_GENEROS,
    FILTER_GENERO,
    FILTER_CREACION,
    ORDER_NAME,
    ORDER_RATING,
    CREATE_VIDEOGAME,
    GET_PLATFORMS,
    RESET_DETAIL,
    RESET_ALLVIDEOGAMES,
    RESET_VIDEOGAMES,
    DELETE_VIDEOGAME
} from './constantes'

//REDUCER
const initialState = {
    allVideogames: [],
    videogames: [],
    detailVideogame: [],
    generos: [],
    plataformas: [],
    page:1
  };

  const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_ALL_VIDEOGAMES:
        return {
          ...state,
          allVideogames: payload,
          videogames: payload,
        };
      case RESET_ALLVIDEOGAMES:
        return {
          ...state,
          allVideogames: [],
        };
      case RESET_VIDEOGAMES:
        return {
          ...state,
          videogames:[]
        };
      case GET_DETAIL_VIDEOGAME:
        return {
          ...state,
          detailVideogame: payload,
        };

      case SET_CURRENT_PAGE:
        return {
          ...state,
          page: payload
        }
      case RESET_DETAIL:
        return {
          ...state,
          detailVideogame: [],
        };
      case VIDEO_BYNAME:
        return {
          ...state,
          videogames: payload.length> 0 ? payload : ["no se encontraron videojuegos"]
        };
  
      case GET_GENEROS:
        return {
          ...state,
          generos: payload,
        };
      case FILTER_GENERO:
        const filtered =
          payload === "All"
            ? state.allVideogames
            : state.allVideogames.filter((e) => {
                for (let i = 0; i < e.generos.length; i++) {
                  if (e.generos[i] === payload) {
                    return true;
                  }
                }
                return false;
              });
        return {
          ...state,
          videogames: filtered.length>0 ? filtered : ["no se encontraron videojuegos"]
        };
  
      case FILTER_CREACION:
        const filteredCreacion =
          payload === "db"
            ? state.allVideogames.filter((v) => v.created === true)
            : state.allVideogames.filter((v) => !v.created);
        return {
          ...state,
          videogames: payload === "all" ? state.allVideogames : filteredCreacion,
        };
      case ORDER_NAME:
        const sorted =
          payload === "asc"
            ? [...state.videogames].sort((a, b) => {
                if (a.nombre > b.nombre) {
                  return 1;
                }
                if (b.nombre > a.nombre) {
                  return -1;
                } else {
                  return 0;
                }
              })
            : [...state.videogames].sort((a, b) => {
                if (a.nombre > b.nombre) {
                  return -1;
                }
                if (b.nombre > a.nombre) {
                  return 1;
                } else {
                  return 0;
                }
              });
        return {
          ...state,
          videogames: sorted,
        };
      case ORDER_RATING:
        const ordered =
          payload === "mejor"
            ? [...state.videogames].sort((a, b) => {
                if (a.rating > b.rating) {
                  return -1;
                }
                if (a.rating < b.rating) {
                  return 1;
                } else {
                  return 0;
                }
              })
            : [...state.videogames].sort((a, b) => {
                if (a.rating > b.rating) {
                  return 1;
                }
                if (a.rating < b.rating) {
                  return -1;
                } else {
                  return 0;
                }
              });
        return {
          ...state,
          videogames: ordered,
        };
      case CREATE_VIDEOGAME:
        
        return {
          ...state,
        };
      case GET_PLATFORMS:
        const plataformas = state.allVideogames.map((v) => v.plataformas);
  
        const data = [...new Set(plataformas.flat())];
  
        return {
          ...state,
          plataformas: data,
        };
      case DELETE_VIDEOGAME:
        return {
          ...state
        }
        
      default:
        return state;
    }
  };
  
  export default rootReducer;

 