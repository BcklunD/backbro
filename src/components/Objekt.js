import { NavLink } from 'react-router-dom';
import useElementOnScreen from '../effects/useElementOnScreen';
import { config } from '../Constants'; 

const Lagenhet = ({objekt}) => {
    const [containerRef, isVisible] = useElementOnScreen({ rootMargin: "-40px" });
    if (isVisible)
        containerRef.current.classList.add("show");

    return (
        <NavLink ref={containerRef} className="lagenhet-kort" to={`/admin/objekt/${objekt.objektid}`} key={objekt.objektid}>
            <div className="lagenhet-kort-top">
                {objekt.ext &&
                <img src={`${config.url.DB_URL}/objekt/${objekt.objektid}.${objekt.ext}`} alt={`Lagenhet i ${objekt.ort}`} />}
            </div>
            <div className="lagenhet-kort-bottom">
                <p className="lagenhet-address">{objekt.namn}</p>
                <p>{objekt.address}</p>
                <p>{objekt.postnr} {objekt.ort}</p>
            </div>
        </NavLink>
    );
}

export default Lagenhet;