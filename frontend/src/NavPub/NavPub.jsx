import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSignInAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './NavPub.css';

const NavPub = ({ cartItemCount }) => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light w-100" style={{ backgroundColor: '#343a40' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <img src="/Logo-Icono.svg" alt="Logo" style={{ height: '70px', marginLeft: '15px' }} />
                    </Link>

                    <Link className="navbar-brand" to="/producto" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        Producto
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacto" style={{ color: '#fff' }}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '2rem' }} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/carrito" style={{ color: '#fff' }}>
                                    <div style={{ position: 'relative' }}>
                                        <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '2rem' }} />
                                        {cartItemCount > 0 && (
                                            <span style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-10px',
                                                backgroundColor: 'red',
                                                borderRadius: '50%',
                                                color: 'white',
                                                padding: '2px 5px',
                                                fontSize: '0.75rem'
                                            }}>
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textDecoration: 'none'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.color = '#ddd'}
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
