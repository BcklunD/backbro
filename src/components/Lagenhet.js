import { NavLink } from 'react-router-dom';
import kyrkan from '../images/kyrkan.png';
import rodbetan from '../images/rodbetan.png';
import farmorhus from '../images/farmorhus.png';
import useElementOnScreen from '../effects/useElementOnScreen';

const Lagenhet = ({lagenhet, page}) => {
    const [containerRef, isVisible] = useElementOnScreen({ rootMargin: "-140px" });
    if (isVisible)
        containerRef.current.classList.add("show");

    return (
        <NavLink ref={containerRef} className="lagenhet-kort" to={`/${page}/${lagenhet.objektid}-${lagenhet.lopnr}`} key={`${lagenhet.objektid}-${lagenhet.lopnr}`}>
            <div className="lagenhet-kort-top">
                <img src={
                    (lagenhet.objektid === 1 && kyrkan) ||
                    (lagenhet.objektid === 2 && rodbetan) ||
                    (lagenhet.objektid === 3 && farmorhus)} alt="Kyrkan" />
            </div>
            <div className="lagenhet-kort-bottom">
                <p className="lagenhet-address">{lagenhet.address}</p>
                <p>{lagenhet.rum} rum &nbsp;&nbsp;&nbsp;&nbsp;{lagenhet.kvm} kvm</p>
                <p>{lagenhet.hyra} kr/månad</p>
            </div>
        </NavLink>
    );
}

export default Lagenhet;