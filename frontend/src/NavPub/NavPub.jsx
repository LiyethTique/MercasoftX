import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";
import Cart from '../Carrito/crudCarrito';

const NavPub = ({ cartItemCount, carrito, setCarrito }) => {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const closeCart = () => {
        setIsCartVisible(false);
    };

    // Define los estilos directamente en JSX
    const navStyle = {
        backgroundColor: '#343a40',
     // Ocupa todo el ancho
        height: '68px', // Altura de la barra de navegación
        width: "1100px",
    };

    const linkStyle = {
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none',
    };

    const iconStyle = {
        fontSize: '2rem',
        cursor: 'pointer',
        color: '#fff',
    };

    const badgeStyle = {
        position: 'absolute',
        top: '-5px',
        right: '-10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        color: 'white',
        padding: '2px 5px',
        fontSize: '0.75rem',
    };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light" style={navStyle}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={linkStyle}>
                        <img src="/Logo-Icono.svg" alt="Logo" style={{ height: '70px', marginLeft: '15px' }} />
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacto" style={linkStyle} title="Equipo de Desarrollo">
                                    <FontAwesomeIcon icon={faUsers} style={{ fontSize: '2rem' }} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div style={{ position: 'relative' }} onClick={toggleCartVisibility}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} title="Carrito de compras" />
                                    {cartItemCount > 0 && (
                                        <span style={badgeStyle}>
                                            {cartItemCount}
                                        </span>
                                    )}
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                    style={linkStyle}
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
                        <Cart carrito={carrito} setCarrito={setCarrito} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default NavPub;
