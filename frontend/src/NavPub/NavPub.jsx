import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faSignInAlt, faUserPlus, faUsers, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './NavPub.css';

const NavPub = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light w-100" style={{ backgroundColor: '#343a40' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Inicio
                    </Link>
                    <Link className="navbar-brand" to="/contacto" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                        Contacto
                    </Link>
                    <Link className="navbar-brand" to="/carrito" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                        Carrito
                    </Link>
                    <Link className="navbar-brand" to="/producto" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" /> {/* Ajustar icono según necesidad */}
                        Producto
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link 
                                    className="nav-link" 
                                    to="/login" 
                                    style={{ 
                                        color: '#fff', 
                                        fontWeight: 'bold',
                                        textDecoration: 'none'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = '#ddd'} // Cambiar color al pasar el ratón
                                    onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                    Iniciar Sesión
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavPub;
