import { NavLink } from 'react-router-dom';
import ReactPreloadImage from 'react-preload-image';
import homeImage from '../images/home-background.jpg';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Hem() {
    const { data: nyheter, isPending, error} = useSelect('nyhet');
    const PreloadImage = ReactPreloadImage; 

    return (
        <div className="hem">
            <div className="hem-top">
                <PreloadImage className="image"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '110vh',
                        background: "linear-gradient(0deg, rgba(239,241,237,1) 35%, rgba(214,215,203,1) 69%)",
                        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#617778', endColorstr='#eff1ed', GradientType=0 )"
                    }}
                    src={homeImage}
                    duration="700ms"
                />
                <div className="hem-top-text">
                    <h1>Backbro Fastigheter AB</h1>
                    <NavLink to="/ledigt" className="hem-top-button">Hitta din nya lägenhet här!</NavLink>
                </div>
            </div>
            {error && <Error />}
            {isPending && <Loading />}
            {nyheter && (
            <div className="nyheter">
                {nyheter.slice(0, 5).map((nyhet, index) => {
                    nyhet.text = nyhet.text.replace("///", "&lt;br&gt;");
                    return (
                        <article className="nyhet" key={`Nyhet ${index}`}>
                            <div className="nyheter-content">
                                <h3>{nyhet.rubrik}</h3>
                                <p className="nyhets-text">{nyhet.text}</p>
                            </div>
                        </article>
                    )
                })}
            </div>)}
        </div>
    );
}
  
export default Hem;