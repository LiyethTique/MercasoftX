import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";
import './NavPub.css';
import Cart from '../Carrito/crudCarrito'; 

const NavPub = ({ cartItemCount, carrito, setCarrito }) => {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const closeCart = () => {
        setIsCartVisible(false);
    };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light w-100" style={{ backgroundColor: '#343a40' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <img src="/Logo-Icono.svg" alt="Logo" style={{ height: '70px', marginLeft: '15px' }} />
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacto" style={{ color: '#fff' }} title="Equipo de Desarrollo">
                                    <FontAwesomeIcon icon={faUsers} style={{ fontSize: '2rem' }} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div style={{ position: 'relative' }} onClick={toggleCartVisibility}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '2rem', cursor: 'pointer', color: '#fff' }} title="Carrito de compras" />
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
                                    title="Iniciar Sesion"
                                >
                                    <FontAwesomeIcon 
                                        icon={faSignInAlt} 
                                        className="me-2" 
                                        style={{ fontSize: '1.8rem' }} 
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Componente del carrito */}
            {isCartVisible && (
                <div className="cart-overlay">
                    <div className="cart-window">
                        <button className="close-cart" onClick={closeCart}>✖</button>
                        <Cart carrito={carrito} setCarrito={setCarrito} /> {/* Pasar las props al carrito */}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default NavPub;
