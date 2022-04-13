import { NavLink } from 'react-router-dom';
import './layout.css';
import useToken from '../effects/useToken';

const Sidebar = () => {
    const { token } = useToken();
    
	return (
		<aside className="sidemenu" id="sidemenu">
            <ul>
                <NavLink to="/" activeclassname="active">
                    <i className="fas fa-home sidebar-icon" aria-hidden="true"></i>
                    Hem
                </NavLink>
                {/* <NavLink to="/kontakt" activeclassname="active">Kontakt<i className="fas fa-info-circle sidebar-icon" aria-hidden="true"></i></NavLink> */}
                <NavLink to="/ledigt" activeclassname="active">
                    <i className="fas fa-building sidebar-icon" aria-hidden="true"></i>
                    Ledigt
                </NavLink>
                {token &&
                <NavLink to="/profil" activeclassname="active">
                    <i className="fas fa-user sidebar-icon" aria-hidden="true"></i>
                    Profil
                </NavLink>}
                {token &&
                <NavLink to="/admin" activeclassname="active">
                    <i className="fas fa-tools sidebar-icon" aria-hidden="true"></i>
                    Admin
                </NavLink>}
                {token &&
                <NavLink to="/login?logout=1" logout="1" className="signin" activeclassname="active">
                    <i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
                    Logga ut
                </NavLink>}
                {!token &&
                <NavLink to="/login" className="signin" activeclassname="active">
                    <i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
                    Logga in
                </NavLink>}
            </ul>
        </aside>
	);
}
export default Sidebar;