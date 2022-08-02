import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { NavLink } from 'react-router-dom';

const IntressanmalanDetalj = ({id, removeIntresseanmalan}) => {
    const { data: intresseanmalan, isPending, error} = useSelect('intresseanmalan/' + id);

    return (
        <div className='intresseanmalan-detalj'>
            {(error) && <Error />}
            {(isPending) && <Loading />}
            {intresseanmalan && (
                <>
                    <div className='intresseanmalan-titel'>
                        <NavLink to={`/admin/intresse`} className="backarrow"><i className="fas fa-arrow-left fa-lg"></i></NavLink>
                        <h3 className="edit-titel">Intresseanmälan</h3>
                    </div>
                    <div className='intresse-detaljer'>
                      <p>{intresseanmalan.namn}</p>
                      <p><NavLink to={`/ledigt/${intresseanmalan.lopnr}`}>Lagenhet</NavLink></p>
                      <p>{intresseanmalan.epost} - {intresseanmalan.telefon}</p>
                      <p>Inskickad: {intresseanmalan.skapad.split("T")[0] + " " + intresseanmalan.skapad.split("T")[1].split(".")[0]}</p>
                    </div>
                    <p className='intresse-fritext'>"{intresseanmalan.fritext}"</p>
                </>
            )}
      </div>
    )
}

export default IntressanmalanDetalj;
