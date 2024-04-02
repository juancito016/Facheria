import React from "react";
import json from '../json/Servicios.json';
import '../hojas-de-estilo/Servicios.css'
import NavBar from "./NavBar";
import Footer from './Footer'
import ubicacion from '../imagenes/Ubicacion-img/image.png'
export default function NuestrosServicios() {
    return (
        
        <div className="Contenedor">
            <NavBar/>
            <div className="titulo">
                <h2>Nuestros Servicios</h2>
            </div>
            <div className="filas-container">
                {json.map((valor, index) => (
                    <div className="fila" key={index}>
                        <div className="caja1">
                            <img
                                src={valor.img}
                                alt="servicio1"
                            />
                        </div>
                        <div className="contenido">
                            <p className="title">{valor.title}</p>
                            <div className="dato">
                                <p>{valor.datos}</p>
                            </div>
                            <a href={'/login'}>{valor.url}</a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="TituloGps">
                <p>Estamos ubicados en:</p>
            </div>
            <div className="Ubicacion">
                    <a href="https://maps.app.goo.gl/S3rAnN8BjHv7dXTb6">< img src={ubicacion} alt="Gps" /></a>
            </div>
            <Footer/>
        </div>

    );
}

