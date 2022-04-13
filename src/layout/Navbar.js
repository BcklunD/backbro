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

    const toggleSidemenu = () => {
        document.getElementById("sidemenu").classList.toggle('active');
        document.getElementById("burger").classList.toggle('activeMenu');
        document.getElementById("cross").classList.toggle('activeMenu');
    }

    document.body.addEventListener('click', (e) => {
        const sidemenu = document.getElementById("sidemenu");
        const burger = document.getElementById("burger");
        if ((!sidemenu.classList.contains('active') && burger.parentElement.parentElement.contains(e.target)) || (sidemenu.classList.contains('active') && !e.target.classList.contains("sidemenu")))
            toggleSidemenu();
    });

    window.addEventListener('scroll', changeBackground);

    return (
        <div className="navbar-wrapper">
            <Navbar bg="dark" variant="dark" className={visaNavbar || isHome ? "sticky-nav active" : "sticky-nav"}>
                <div className={visaNavbar || isHome ? "nav-color active-color" : "nav-color"}></div>
                <Navbar.Brand>
                    <NavLink to="/" className="navbar-link">Backbro Fastigheter</NavLink>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end navbar-links">
                    {/* <NavLink to="/kontakt" className="hover-underline-animation navbar-link" activeclassname="active">Om oss</NavLink> */}
                    <NavLink to="/ledigt" className="hover-underline-animation navbar-link" activeclassname="active">Ledigt</NavLink>
                    {token &&
                    <NavLink to="/admin" className="hover-underline-animation navbar-link" activeclassname="active">Admin</NavLink>}
                    {token &&
                    <NavLink to="/profil" className="hover-underline-animation navbar-link" activeclassname="active">{token.fornamn}</NavLink>}
                    {token &&
                    <NavLink to="/login?logout=1" logout="1" className="signin navbar-link" activeclassname="active">
                        Logga ut <i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
                    </NavLink>}
                    {!token &&
                    <NavLink to="/login" className="signin navbar-link" activeclassname="active">
                        Logga in <i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
                    </NavLink>}
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end navbar-burger">
                    <Navbar.Text>
                        <span onClick={toggleSidemenu} className='activeMenu' id='burger'>
                            <i className="fa-solid fa-bars"></i>
                        </span>
                        <span onClick={toggleSidemenu} id='cross'>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarJs;