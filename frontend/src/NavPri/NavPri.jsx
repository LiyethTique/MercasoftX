import React from "react";

function NavPri() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">Login</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavPri;