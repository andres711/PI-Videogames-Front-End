//importaciones
import axios from "axios";

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

//-------------------------------ACTIONS------------------------------------------------

//TODOS LOS VIDEOJUEGOS
export const getAllVideogames = () => async(dispatch) => {
 
   
    const videogames = await axios.get("http://localhost:3001/videogames")
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: videogames.data,
    });
};

//DETALLE DE VIDEOJUEGO POR ID
export const detailVideogame = (id) => async (dispatch) => {
  const videogame = await axios.get(`http://localhost:3001/videogames/${id}`);

  return dispatch({
    type: GET_DETAIL_VIDEOGAME,
    payload: videogame.data,
  });
};
//RESETAER DETALLE
export const resetDetail = () => (dispatch) => {
  return dispatch({
    type: RESET_DETAIL,
  });
};
//SETEAR PAGINA ACTUAL
export const setPage = (page)=> (dispatch)=>{
  return dispatch({
    type: SET_CURRENT_PAGE,
    payload: page
  })
}

//VIDEOJUEGO POR NOMBRE
export const videogameByName = (name) => async (dispatch) => {
  try {
    const videoName = await axios.get(
      `http://localhost:3001/videogames?nombre=${name}`
    );
    const video = videoName.data;
    return dispatch({
      type: VIDEO_BYNAME,
      payload: video,
    });
  } catch (error) {
    return dispatch({
      type: VIDEO_BYNAME,
      payload: error
    })
  }
 
};

//GET GENEROS
export const getGeneros = () => async (dispatch) => {
  const generos = await axios.get("http://localhost:3001/genres");

  return dispatch({
    type: GET_GENEROS,
    payload: generos.data,
  });
};
//FILTRO POR GENERO
export const filterGenero = (genero) => (dispatch) => {
  return dispatch({
    type: FILTER_GENERO,
    payload: genero,
  });
};
//FILTRO POR CREACION
export const filterCreacion = (dato) => (dispatch) => {
  return dispatch({
    type: FILTER_CREACION,
    payload: dato,
  });
};
//ORDENAMIENTO POR NOMBRE
export const orderName = (orden) => (dispatch) => {
  return dispatch({
    type: ORDER_NAME,
    payload: orden,
  });
};
//ORDENAMIENTO POR RATING
export const orderRating = (orden) => (dispatch) => {
  return dispatch({
    type: ORDER_RATING,
    payload: orden,
  });
};
//CREAR VIDEOJUEGO
export const createVideogame = (datos) => async (dispatch) => {
  await axios.post("http://localhost:3001/videogames", datos);
  return dispatch({
    type: CREATE_VIDEOGAME,
  });
};
//RESET VIDEOGAMES
export const resetAllVideogames = () => (dispatch) => {
  return dispatch({
    type: RESET_ALLVIDEOGAMES,
  });
};
export const resetVideogames = ()=> (dispatch)=>{
  return dispatch({
    type: RESET_VIDEOGAMES,
  })
}
//TRAER PLATAFORMAS
export const getPlatforms = () => async (dispatch) => {
  return dispatch({
    type: GET_PLATFORMS,
  });
};

//ELIMINAR VIDEOJUEGO
export const deleteVideogame = (id)=> async (dispatch)=>{
  await axios.delete("http://localhost:3001/videogames/" + id)
  return dispatch({
    type:DELETE_VIDEOGAME
  })
}
