import React from "react";
import {Link} from "react-router-dom";

import './LandingPage.css'
function LandPage() {
    
    return ( 
        <div className="principal">
            <div className="container">
            <h1>PROYECTO VIDEOJUEGOS</h1>
            <Link to="/home">
            <button className="btn">Ingresar</button>
            </Link>
            </div>
            <div className="wave">

            </div>
            
        </div>
     );
}

export default LandPage;
