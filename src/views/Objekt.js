import { NavLink } from 'react-router-dom';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ObjektComponent from '../components/Objekt';

function Objekt() {
    const { data: objekt, isPending, error} = useSelect('objekt/');

    return (
        <div className="objekt">
            {error && <Error />}
            {isPending && <Loading />}
            { objekt &&
                <NavLink className="lagenhet-kort show" to="/admin/objekt/add" key={"add"}>
                    <div className="add-top">
                        <i className="fas fa-plus fa-6x"></i>
                    </div>
                    <div className="add-bottom">
                        <p>Ny</p>
                    </div>
                </NavLink>}
            {objekt &&
                objekt.map((objekt) => (
                    <ObjektComponent objekt={objekt} key={objekt.objektid} />
                ))}
        </div>
    );
}
  
export default Objekt;