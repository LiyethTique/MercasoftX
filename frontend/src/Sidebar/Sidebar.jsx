import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';  // Importa SweetAlert2
import '../Sidebar/Sidebar.css';
import jwt_decode from 'jwt-decode';

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
                    imageUrl: '/cargando.gif', // Usar GIF de carga
                    imageWidth: 100, // Ajusta el tamaño del GIF
                    imageAlt: 'Cargando...',
                    showConfirmButton: false,  // Oculta el botón de confirmación
                    timer: 1000,  // Alerta visible durante 1 segundo
                    willClose: () => {
                        // Limpiar el token de autenticación o cualquier dato relacionado con la sesión
                        localStorage.removeItem('token');
                        // Redirigir al usuario a la página de inicio de sesión
                        navigate('/');
                    }
                });
            }
        });
    };

    // Función para verificar si el usuario es administrador
    const isAdmin = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decodedToken = jwt_decode(token); // Usamos jwt_decode para decodificar el token
            console.log("Decoded Token:", decodedToken);
            return decodedToken.Tip_Responsable === 'Administrador'; // Verifica si el rol es "Administrador"
        } catch (error) {
            console.error('Error al decodificar el token', error);
            return false;
        }
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
                <Link className="sidebar-header text-white text-decoration-none">
                    <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" alt="Logo" />
                    <span>MERCASOFTX</span>
                </Link>

                <hr />

                <ul className="nav nav-pills flex-column mb-auto">
                    {renderNavItem('/pedido', 'entrega.svg', 'Pedidos', selectedOption, handleOptionSelect)}
                    {renderNavItem('/area/', 'arae.svg', 'Area', selectedOption, handleOptionSelect)}
                    {renderNavItem('/unidad/', 'unit.svg', 'Unidad', selectedOption, handleOptionSelect)}
                    {renderNavItem('/cliente/', 'customer.svg', 'Cliente', selectedOption, handleOptionSelect)}
                    {renderNavItem('/entrada/', 'transfer.svg', 'Entrada', selectedOption, handleOptionSelect)}
                    {renderNavItem('/producto/', 'product.svg', 'Producto', selectedOption, handleOptionSelect)}
                    {renderNavItem('/traslado/', 'entrance.svg', 'Traslado', selectedOption, handleOptionSelect)}
                    {renderNavItem('/venta/', 'sale.svg', 'Venta', selectedOption, handleOptionSelect)}
                    {isAdmin() && renderNavItem('/responsable/', 'responsible.svg', 'Responsable', selectedOption, handleOptionSelect)}
                    {isAdmin() && renderNavItem('/users/', 'adminUser.svg', 'Usuarios', selectedOption, handleOptionSelect)} {/* Nuevo enlace para Usuarios */}
                </ul>
                <hr />

                {/* Opción de cerrar sesión */}
                <div className="logout-container">
                    <a
                        href="/login"
                        onClick={handleLogout}
                    >
                        <img src="/logout.png" alt="Cerrar Sesión" className="logout-icon" /> {/* Aplica la clase CSS */}
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
                    style={{ marginRight: '10px' }} // Estilo en línea para separar el icono del texto
                />
                {text}
            </Link>
        </li>
    );
}

export default Sidebar;
