import { NavLink } from 'react-router-dom';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Intresseanmalningar() {
    const { data: intressmalningar, isPending, error} = useSelect('intresseanmalan/');

    return (
        <div className="intresseanmalningar">
            {error && <Error />}
            {isPending && <Loading />}
            {intressmalningar &&
                intressmalningar.map((intresseanmalan) => (
                    <NavLink to={`/admin/intresseanmalningar/${intresseanmalan.id}`} key={intresseanmalan.id}>
                        <div>Intresseanmalan</div>
                    </NavLink>
                ))}
        </div>
    );
}
  
export default Intresseanmalningar;