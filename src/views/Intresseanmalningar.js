import { NavLink } from 'react-router-dom';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useParams } from "react-router";
import IntresseanmalanDetalj from "../views/IntressanmalanDetalj"

function Intresseanmalningar() {
    const { data: intressmalningar, isPending, error} = useSelect('intresseanmalan/');
    console.log(intressmalningar);
    let { id } = useParams();

    function removeIntresseanmalan(lopnr) {
        console.log("Ta bort intresseanmalan: " + lopnr);
    }
    
    if (id) {
        return (
            <div className="intresseanmalningar">
                {error && <Error />}
                {isPending && <Loading />}
                {<IntresseanmalanDetalj id={id} removeIntresseanmalan={removeIntresseanmalan} />}
            </div>
        )
    } else {
        return (
            <div className="intresseanmalningar">
                {error && <Error />}
                {isPending && <Loading />}
                {intressmalningar &&
                    intressmalningar.map((intresseanmalan) => (
                        <NavLink to={`/admin/intresse/${intresseanmalan.id}`} key={intresseanmalan.id}>
                            <div className='intresseanmalan-kort'>
                                <h5>{intresseanmalan.namn}</h5>
                                <p>{intresseanmalan.epost}</p>
                                <p>{intresseanmalan.skapad.split("T")[0]}</p>
                            </div>
                        </NavLink>
                    ))}
            </div>
        );
    }
}
  
export default Intresseanmalningar;