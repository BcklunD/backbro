import { NavLink } from 'react-router-dom';
import kyrkan from '../images/kyrkan.png';
import rodbetan from '../images/rodbetan.png';
import farmorhus from '../images/farmorhus.png';
import useElementOnScreen from '../effects/useElementOnScreen';

const Lagenhet = ({objekt}) => {
    const [containerRef, isVisible] = useElementOnScreen({ rootMargin: "-140px" });
    if (isVisible)
        containerRef.current.classList.add("show");

    return (
        <NavLink ref={containerRef} className="lagenhet-kort" to={`/admin/objekt/${objekt.objektid}`} key={objekt.objektid}>
            <div className="lagenhet-kort-top">
                <img src={
                    (objekt.objektid === 1 && kyrkan) ||
                    (objekt.objektid === 2 && rodbetan) ||
                    (objekt.objektid === 3 && farmorhus)} alt="Kyrkan" />
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