import React from 'react';

function NavPub() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">Login</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active text-white" aria-current="page" href="/carrito/">Carrito</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/categoria/">Categoria</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/cliente/">Cliente</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/entrada/">Entrada</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/pedido/">Pedido</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/pedidoprodcuto/">PedidoProducto</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/prodcuto/">Producto</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/responsable/">Responsable</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/traslado/">Traslado</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/unidad/">Unidad</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/venta/">Venta</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavPub;