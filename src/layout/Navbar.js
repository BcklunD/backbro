import { Navbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import './layout.css';
import useToken from '../effects/useToken';
import { useState } from 'react';

const NavbarJs = () => {
    const [visaNavbar, setVisaNavbar] = useState(false);
    const { token } = useToken();

    const isHome = window.location.pathname !== "/";

    const changeBackground = () => {
        if (window.scrollY > 150)
            setVisaNavbar(true);
        else
            setVisaNavbar(false);
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className="navbar-wrapper">
            <Navbar bg="dark" variant="dark" className={visaNavbar || isHome ? "sticky-nav active" : "sticky-nav"}>
                <div className={visaNavbar || isHome ? "nav-color active-color" : "nav-color"}></div>
                <Navbar.Brand>
                    <NavLink to="/" className="navbar-link">Backbro Fastigheter</NavLink>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <NavLink to="/kontakt" className="hover-underline-animation navbar-link" activeclassname="active">Kontakt</NavLink>
                    <NavLink to="/ledigt" className="hover-underline-animation navbar-link" activeclassname="active">Ledigt</NavLink>
                    {token &&
                    <NavLink to="/admin" className="hover-underline-animation navbar-link" activeclassname="active">Admin</NavLink>}
                    {token &&
                    <NavLink to="/profil" className="hover-underline-animation navbar-link" activeclassname="active">{token.fornamn}</NavLink>}
                    {token &&
                    <NavLink to="/login?logout=1" logout="1" className="hover-underline-animation signin navbar-link" activeclassname="active">
                        Logga ut <i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
                    </NavLink>}
                    {!token &&
                    <NavLink to="/login" className="hover-underline-animation signin navbar-link" activeclassname="active">
                        Logga in <i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
                    </NavLink>}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarJs;