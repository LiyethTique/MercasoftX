import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';  // Importa SweetAlert2
import '../Estilos/Sidebar.css';

function Sidebar() {
    const [isVisible, setIsVisible] = useState(false); // Estado para la visibilidad del sidebar
    const [selectedOption, setSelectedOption] = useState('/'); // Estado para la opción seleccionada
    const navigate = useNavigate(); // Hook para redirección

    // Función para alternar la visibilidad del sidebar
    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    // Función para manejar la selección de una opción
    const handleOptionSelect = (href) => {
        setSelectedOption(href); // Actualiza la opción seleccionada
    };

    // Función para manejar el cierre de sesión
    const handleLogout = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace

        // Mostrar alerta de confirmación
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
                // Mostrar alerta de "Cerrando sesión" si se confirma
                Swal.fire({
                    title: 'Cerrando sesión...',
                    text: 'Por favor espera un momento.',
                    icon: 'info',
                    showConfirmButton: false,  // Oculta el botón de confirmación
                    timer: 1000,  // Alerta visible durante 1 segundo
                    willClose: () => {
                        // Limpiar el token de autenticación o cualquier dato relacionado con la sesión
                        localStorage.removeItem('token');
                        // Redirigir al usuario a la página de inicio de sesión
                        navigate('/login');
                    }
                });
            }
        });
    };

    return (
        <>
            {/* Botón de menú hamburguesa */}
            <button 
                className={`hamburger ${isVisible ? 'open' : ''}`} 
                onClick={toggleSidebar}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Sidebar con clases condicionales para transiciones */}
            <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
                {/* Encabezado del Sidebar */}
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="60px" alt="Logo" />
                    <span className="fs-4"><b>MERCASOFTX</b></span>
                </Link>
                <hr />

                {/* Lista de navegación */}
                <ul className="nav nav-pills flex-column mb-auto">
                    {renderNavItem('/categoria/', 'category.svg', 'Categoria', selectedOption, handleOptionSelect)}
                    {renderNavItem('/cliente/', 'customer.svg', 'Cliente', selectedOption, handleOptionSelect)}
                    {renderNavItem('/pedido/', 'orders.svg', 'Pedido', selectedOption, handleOptionSelect)}
                    {renderNavItem('/producto/', 'product.svg', 'Producto', selectedOption, handleOptionSelect)}
                    {renderNavItem('/responsable/', 'responsible.svg', 'Responsable', selectedOption, handleOptionSelect)}
                    {renderNavItem('/venta/', 'sale.svg', 'Venta', selectedOption, handleOptionSelect)}
                </ul>
                <hr />

                {/* Opción de cerrar sesión */}
                <div className="nav-item">
                    <a 
                        href="/login" 
                        className="nav-link text-white" 
                        onClick={handleLogout} 
                        style={{ cursor: 'pointer' }}
                    >
                        <img src="/logout.svg" alt="Cerrar Sesión" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
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
                <img src={`/${iconSrc}`} alt={text} />
                {text}
            </Link>
        </li>
    );
}

export default Sidebar;
