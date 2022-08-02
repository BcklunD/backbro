import { NavLink } from 'react-router-dom';
import useElementOnScreen from '../effects/useElementOnScreen';
import { config } from '../Constants'; 

const Lagenhet = ({lagenhet, page}) => {
    const [containerRef, isVisible] = useElementOnScreen({ rootMargin: "-40px" });
    if (isVisible)
        containerRef.current.classList.add("show");

    return (
        <NavLink ref={containerRef} className="lagenhet-kort" to={`/${page}/${lagenhet.lopnr}`} key={`${lagenhet.lopnr}`}>
            <div className="lagenhet-kort-top">
                {lagenhet.ext &&
                <img src={`${config.url.DB_URL}/objekt/${lagenhet.objektid}.${lagenhet.ext}`} alt={`Lagenhet i ${lagenhet.ort}`} />}
            </div>
            <div className="lagenhet-kort-bottom">
                <p className="lagenhet-address">{lagenhet.address}</p>
                <p>{lagenhet.rum} rum &nbsp;&nbsp;&nbsp;&nbsp;{lagenhet.kvm} m&sup2;</p>
                <p>{lagenhet.hyra} kr/månad</p>
            </div>
        </NavLink>
    );
}

export default Lagenhet;