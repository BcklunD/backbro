import { NavLink } from 'react-router-dom';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NyhetEdit from '../views/NyhetEdit';
import { useParams } from "react-router";

function Nyheter() {
    const { data: nyheter, isPending, error, setReload} = useSelect('nyhet/');
    let { id } = useParams();

    return (
        <div className="nyheter">
            {error && <Error />}
            {isPending && <Loading />}
            {id && <NyhetEdit id={id} setReload={setReload} />}
            {!id && nyheter &&
                <NavLink to="/admin/nyheter/add" key={"add"}>
                    <div className="nyhet-kort add-kort">
                        <div className="add-top">
                            <i className="fas fa-plus fa-6x"></i>
                        </div>
                        <div className="add-bottom">
                            <p>Ny</p>
                        </div>
                    </div>
                </NavLink>}
            {!id && nyheter &&
                nyheter.map((nyhet) => (
                    <NavLink to={`/admin/nyheter/${nyhet.nyhetsid}`} key={nyhet.nyhetsid}>
                        <div className="nyhet-kort">
                            <div className="nyhet-kort-top">
                                <p>{nyhet.rubrik}</p>
                            </div>
                            <div className="nyhet-kort-bottom">
                                <p>{nyhet.text.substring(0, 160)}{nyhet.text.length > 160 && "..."}</p>
                                <div className="stick-bottom">
                                    {nyhet.till && <p className="pull-right">Visas till {nyhet.till.split("T")[0]}</p>}
                                    <p>{nyhet.skapad.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
        </div>
    );
}
  
export default Nyheter;