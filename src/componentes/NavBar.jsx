import React, { useState, useEffect } from 'react';
import '../hojas-de-estilo/NavBar.css';
import icono from '../imagenes/Navbar-img/ico.png';
import { Link, useLocation } from 'react-router-dom';

const links = [{ href: "/login" }];
const links2 = [{ href: "/servicios" }];
const links3 = [{ href: "/" }]; // Enlace para Inicio
const links4 = [{ href: "/galeria" }]; // Enlace para Galería de Cortes

function NavBar() {
  const [selected, setSelected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú responsive
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/servicios' || location.pathname === '/' || location.pathname === '/galeria') {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [location]);

  return (
    <nav>
      <div className="nav-left">
        <img src={icono} alt="Icon" />
      </div>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776; {/* Icono de menú hamburguesa */}
      </div>
      <ul className={`nav-right ${menuOpen ? 'show' : ''}`}>
        <li>
          <Link
            className={selected && location.pathname === '/' ? 'servicio2 selected' : 'servicio'}
            style={{ textDecoration: 'none', color: '#fff' }}
            to={links3[0].href}
          >
            <span>Inicio</span>
          </Link>
        </li>
        {links2.map((x, index) => (
          <li key={index}>
            <Link
              className={selected && location.pathname === '/servicios' ? 'servicio2 selected' : 'servicio2'}
              style={{ textDecoration: 'none', color: '#fff' }}
              to={x.href}
            >
              <span>Nuestros servicios</span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            className={selected && location.pathname === '/galeria' ? 'servicio2 selected' : 'servicio2'}
            style={{ textDecoration: 'none', color: '#fff' }}
            to={links4[0].href}
          >
            <span>Galeria de Cortes</span>
          </Link>
        </li>
        <li className='Inicio' style={{ marginRight: '10px' }}>
          {links.map((x) => (
            <Link
              className='link'
              style={{ textDecoration: 'none', color: '#fff' }}
              to={x.href}
            >
              <span>Iniciar Sesion</span>
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;