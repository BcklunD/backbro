import LagenhetList from './LagenhetList';
import LagenhetDetalj from './LagenhetDetalj';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';

const Ledigt = () => {
    let { id } = useParams();

    return (
        <div className="ledigt">
            { id && <NavLink to={`/ledigt`} className="backarrow"><i className="fas fa-arrow-left fa-2x"></i></NavLink>}
            <h1 className="header-center">Lediga lägenheter</h1>
            <hr/>
            {id && <LagenhetDetalj id={id} />}
            {!id && <LagenhetList />}
        </div>
    )
}

export default Ledigt;