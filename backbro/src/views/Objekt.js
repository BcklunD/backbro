import { NavLink } from 'react-router-dom';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ObjektComponent from '../components/Objekt';
import ObjektEdit from '../views/ObjektEdit';
import { useParams } from "react-router";

function Objekt() {
    const { data: objekt, isPending, error, setReload} = useSelect('objekt/');
    let { id } = useParams();

    return (
        <div className="objekt">
            {error && <Error />}
            {isPending && <Loading />}
            {id && <ObjektEdit id={id} setReload={setReload} />}
            {!id && objekt &&
                <NavLink className="lagenhet-kort show" to="/admin/objekt/add" key={"add"}>
                    <div className="add-top">
                        <i className="fas fa-plus fa-6x"></i>
                    </div>
                    <div className="add-bottom">
                        <p>Ny</p>
                    </div>
                </NavLink>}
            {!id && objekt &&
                objekt.map((objekt) => (
                    <ObjektComponent objekt={objekt} key={objekt.objektid} />
                ))}
        </div>
    );
}
  
export default Objekt;