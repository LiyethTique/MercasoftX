import React, { useState } from "react";
import '../Estilos/Sidebar.css'


function Sidebar() {
    const [isVisible, setIsVisible] = useState(false); // Estado para la visibilidad del sidebar
    const [selectedOption, setSelectedOption] = useState('/'); // Estado para la opción seleccionada

    // Función para alternar la visibilidad del sidebar
    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    // Función para manejar la selección de una opción
    const handleOptionSelect = (href) => {
        setSelectedOption(href); // Actualiza la opción seleccionada
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
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="60px" alt="Logo" />
                    <span className="fs-4"><b>MERCASOFTX</b></span>
                </a>
                <hr />

                {/* Lista de navegación */}
                <ul className="nav nav-pills flex-column mb-auto">
                    {/* {renderNavItem('/carrito/', 'shopping_cart.svg', 'Carrito', selectedOption, handleOptionSelect)} */}
                    {renderNavItem('/categoria/', 'category.svg', 'Categoria', selectedOption, handleOptionSelect)}
                    {renderNavItem('/cliente/', 'customer.svg', 'Cliente', selectedOption, handleOptionSelect)}
                    {/* {renderNavItem('/entrada/', 'transfer.svg', 'Entrada', selectedOption, handleOptionSelect)} */}
                    {renderNavItem('/pedido/', 'orders.svg', 'Pedido', selectedOption, handleOptionSelect)}
                    {/* {renderNavItem('/pedidoproducto/', 'orderproduct.svg', 'PedidoProducto', selectedOption, handleOptionSelect)} */}
                    {renderNavItem('/producto/', 'product.svg', 'Producto', selectedOption, handleOptionSelect)}
                    {renderNavItem('/responsable/', 'responsible.svg', 'Responsable', selectedOption, handleOptionSelect)}
                    {/* {renderNavItem('/traslado/', 'entrance.svg', 'Traslado', selectedOption, handleOptionSelect)} */}
                    {/* {renderNavItem('/unidad/', 'unit.svg', 'Unidad', selectedOption, handleOptionSelect)} */}
                    {renderNavItem('/venta/', 'sale.svg', 'Venta', selectedOption, handleOptionSelect)}
                </ul>
                <hr />

                {/* Menú de usuario */}
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/user-men.svg" alt="Usuario" style={{ width: '50px', height: '50px' }} />
                        <strong>Jesus</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

// Función para renderizar un ítem de la barra de navegación
function renderNavItem(href, iconSrc, text, selectedOption, handleOptionSelect) {
    return (
        <li className="nav-item">
            <a 
                href={href} 
                className={`nav-link text-white ${selectedOption === href ? 'active' : ''}`} 
                onClick={() => handleOptionSelect(href)} 
            >
                <img src={`/${iconSrc}`} alt={text} />
                {text}
            </a>
        </li>
    );
}

export default Sidebar;
