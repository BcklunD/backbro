import { NavLink } from 'react-router-dom';
import './layout.css';
import useToken from '../effects/useToken';

const Sidebar = () => {
    const { token } = useToken();
    
	return (
		<aside className="sidebar">
            <div className="sidebar-header">Backbro</div>
            <NavLink to="/" activeclassname="active">Hem<i className="fas fa-home sidebar-icon" aria-hidden="true"></i></NavLink>
            <NavLink to="/kontakt" activeclassname="active">Kontakt<i className="fas fa-info-circle sidebar-icon" aria-hidden="true"></i></NavLink>
            <NavLink to="/ledigt" activeclassname="active">Ledigt<i className="fas fa-building sidebar-icon" aria-hidden="true"></i></NavLink>
            {token &&
            <NavLink to="/profil" activeclassname="active">
                Profil<i className="fas fa-user sidebar-icon" aria-hidden="true"></i>
            </NavLink>}
            {token &&
            <NavLink to="/admin" activeclassname="active">
                Admin<i className="fas fa-tools sidebar-icon" aria-hidden="true"></i>
            </NavLink>}
            {token &&
            <NavLink to="/login?logout=1" logout="1" className="signin" activeclassname="active">
                Logga ut<i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
            </NavLink>}
            {!token &&
            <NavLink to="/login" className="signin" activeclassname="active">
                Logga in<i className="fas fa-sign-in-alt sidebar-icon" aria-hidden="true"></i>
            </NavLink>}

        </aside>
	);
}

export default Sidebar;