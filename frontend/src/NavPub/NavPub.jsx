import React from "react";
import { Link } from "react-router-dom";

const NavPub = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light w-100" style={{ backgroundColor: '#FFA500' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home" style={{ color: '#fff', fontWeight: 'bold' }}>Home</Link>
                    <Link className="navbar-brand" to="/contacto" style={{ color: '#fff', fontWeight: 'bold' }}>Contacto</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ backgroundColor: '#fff' }}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login" style={{ color: '#fff', fontWeight: 'bold' }}>Iniciar Sesion</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register" style={{ color: '#fff', fontWeight: 'bold' }}>Registrar</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavPub;
