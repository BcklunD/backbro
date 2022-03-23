import useToken from '../effects/useToken';
import { useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router";
import Objekt from './Objekt';
import Lagenheter from './Lagenheter';
import Nyheter from './Nyheter';
import Intresseanmalningar from './Intresseanmalningar';

function Admin() {
    const { token } = useToken();
    let { tab } = useParams();
    let navigate = useNavigate();

    if (token == null)
        navigate("../", { replace: true });

    return (
        <div className="admin">
            <h1 className="header-center">Admin</h1>
            <hr/>
            <div className="tabs">
                <NavLink to="/admin/objekt" className={(tab == null && "active hover-underline-animation") || "hover-underline-animation"} activeclassname="active">Objekt</NavLink>
                <NavLink to="/admin/lagenheter" className="hover-underline-animation" activeclassname="active">Lägenheter</NavLink>
                <NavLink to="/admin/parkering" className="hover-underline-animation" activeclassname="active">Parkering</NavLink>
                <NavLink to="/admin/nyheter" className="hover-underline-animation" activeclassname="active">Nyheter</NavLink>
                <NavLink to="/admin/intresse" className="hover-underline-animation" activeclassname="active">Intresse</NavLink>
            </div>
            <div className="admin-content">
                {tab === "lagenheter" && <Lagenheter />}
                {tab === "nyheter" && <Nyheter />}
                {tab === "intresse" && <Intresseanmalningar />}
                {tab !== "lagenheter" && tab !== "nyheter" && tab !== "intresse" && <Objekt />}
            </div>
        </div>
    );
}

export default Admin;