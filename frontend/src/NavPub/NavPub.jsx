import React from "react";

const NavPublic = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container">
                    <a className="navbar-brand" href="/home">Home</a>
                    <a className="navbar-brand" href="/contact">Contact</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavPublic;
