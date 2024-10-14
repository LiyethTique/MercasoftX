import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

function Sidebar() {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('/');
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const handleOptionSelect = (href) => {
        setSelectedOption(href);
    };

    const handleLogout = (event) => {
        event.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Cerrando sesión...',
                    text: 'Por favor espera un momento.',
                    imageUrl: '/cargando.gif',
                    imageWidth: 100,
                    imageAlt: 'Cargando...',
                    showConfirmButton: false,
                    timer: 1000,
                    willClose: () => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }
                });
            }
        });
    };

    const isAdmin = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decodedToken = jwt_decode(token);
            console.log("Decoded Token:", decodedToken);
            return decodedToken.Tip_Responsable === 'Administrador';
        } catch (error) {
            console.error('Error al decodificar el token', error);
            return false;
        }
    };

    return (
        <>
            <button 
                className={`hamburger ${isVisible ? 'open' : ''}`} 
                onClick={toggleSidebar}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="60px" alt="Logo" />
                    <span className="fs-4"><b>MERCASOFTX</b></span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    {renderNavItem('/carrito/', 'shopping_cart.svg', 'Carrito', selectedOption, handleOptionSelect)}
                    {renderNavItem('/area/', 'arae.svg', 'Area', selectedOption, handleOptionSelect)}
                    {renderNavItem('/cliente/', 'customer.svg', 'Cliente', selectedOption, handleOptionSelect)}
                    {renderNavItem('/entrada/', 'transfer.svg', 'Entrada', selectedOption, handleOptionSelect)}
                    {renderNavItem('/pedido/', 'orders.svg', 'Pedido', selectedOption, handleOptionSelect)}
                    {renderNavItem('/producto/', 'product.svg', 'Producto', selectedOption, handleOptionSelect)}
                    {renderNavItem('/traslado/', 'entrance.svg', 'Traslado', selectedOption, handleOptionSelect)}
                    {renderNavItem('/unidad/', 'unit.svg', 'Unidad', selectedOption, handleOptionSelect)}
                    {renderNavItem('/venta/', 'sale.svg', 'Venta', selectedOption, handleOptionSelect)}
                    {isAdmin() && renderNavItem('/responsable/', 'responsible.svg', 'Responsable', selectedOption, handleOptionSelect)}
                    {isAdmin() && renderNavItem('/users/', 'adminUser.svg', 'Usuarios', selectedOption, handleOptionSelect)}
                </ul>
                <hr />
                <div className="nav-item">
                    <a 
                        href="/login" 
                        className="nav-link text-white" 
                        onClick={handleLogout} 
                        style={{ cursor: 'pointer', fontSize: '1.4rem', fontWeight: 'bold' }}
                    >
                        <img src="/logout.png" alt="Cerrar Sesión" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                        Cerrar Sesión
                    </a>
                </div>
            </div>
        </>
    );
}

// Función para renderizar un ítem de la barra de navegación
function renderNavItem(href, iconSrc, text, selectedOption, handleOptionSelect) {
    return (
        <li className="nav-item">
            <Link 
                to={href} 
                className={`nav-link text-white ${selectedOption === href ? 'active' : ''}`} 
                onClick={() => handleOptionSelect(href)} 
            >
                <img 
                    src={`/${iconSrc}`} 
                    alt={text} 
                    style={{ marginRight: '10px' }} 
                />
                {text}
            </Link>
        </li>
    );
}

export default Sidebar;
