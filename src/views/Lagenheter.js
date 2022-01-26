import { NavLink } from 'react-router-dom';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Lagenhet from '../components/Lagenhet';
import LagenhetEdit from '../views/LagenhetEdit';
import { useParams } from "react-router";

function Lagenheter() {
    const { data: lagenheter, isPending, error} = useSelect('lagenhet/');
    let { id } = useParams();

    return (
        <div className="lagenheter">
            {error && <Error />}
            {isPending && <Loading />}
            {id && <LagenhetEdit id={id} />}
            {!id && lagenheter &&
            <NavLink className="lagenhet-kort show" to="/admin/lagenheter/add" key={"add"}>
                <div className="add-top">
                    <i className="fas fa-plus fa-6x"></i>
                </div>
                <div className="add-bottom">
                    <p>Ny</p>
                </div>
            </NavLink>}
            {!id && lagenheter &&
                lagenheter.map((lagenhet) => (
                    <Lagenhet lagenhet={lagenhet} page="admin/lagenheter" key={`${lagenhet.objektid}-${lagenhet.lopnr}`} />
                ))}
        </div>
    );
}
  
export default Lagenheter;