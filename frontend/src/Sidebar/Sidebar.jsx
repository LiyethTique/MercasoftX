import React from "react";

function Sidebar() {
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{
                width: '280px', height: '100%', position: 'fixed', bottom: '0',
                left: '0', minHeight: '100vh', overflowY: 'auto'
            }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
                    <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="60px" />
                    <span className="fs-4">MersoftX</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="/carrito/" className="nav-link active" aria-current="page">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home" /></svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512"><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg> */}
                            <img src="/shopping_cart.svg" alt="" />
                            {/* <object data="/user.svg" type="image/svg+xml" width="40" height="40"></object>
                                <iframe src="/user.svg" width="40" height="40" style={{ border: 'none' }}></iframe>
                                <div class="svg-background"></div> */}
                            Carrito
                        </a>
                    </li>
                    <li>
                        <a href="/categoria/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
                            <img src="/category.svg" alt="" />
                            Categoria
                        </a>
                    </li>
                    <li>
                        <a href="/cliente/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
                            <img src="/customer.svg" alt="" />
                            Cliente
                        </a>
                    </li>
                    <li>
                        <a href="/entrada/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid" /></svg>
                            <img src="/transfer.svg" alt="" />
                            Entrada
                        </a>
                    </li>
                    <li>
                        <a href="/pedido/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/orders.svg" alt="" />
                            Pedido
                        </a>
                    </li>
                    <li>
                        <a href="/pedidoproducto/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/orderproduct.svg" alt="" />
                            PedidoProducto
                        </a>
                    </li>
                    <li>
                        <a href="/producto/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/product.svg" alt="" />
                            Producto
                        </a>
                    </li>
                    <li>
                        <a href="/responsable/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/responsible.svg" alt="" />
                            Responsable
                        </a>
                    </li>
                    <li>
                        <a href="/traslado/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/entrance.svg" alt="" />
                            Traslado
                        </a>
                    </li>
                    <li>
                        <a href="/unidad/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/unit.svg" alt="" />
                            Unidad
                        </a>
                    </li>
                    <li>
                        <a href="/venta/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle" /></svg>
                            <img src="/sale.svg" alt="" />
                            Venta
                        </a>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/> */}
                        <img src="/user-men.svg" alt="banner" style={{ width: '50px', height: '50px' }} />
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
    )
}

export default Sidebar;