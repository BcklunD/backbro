import { NavLink } from 'react-router-dom';
import ReactPreloadImage from 'react-preload-image';
import AnimatedPage from '../components/AnimatedPage';
import homeImage from '../images/home-background3.jpg';
import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Hem = () => {
    const { data: nyheter, isPending, error} = useSelect('nyhet');
    const PreloadImage = ReactPreloadImage; 

    return (
        <AnimatedPage>
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
                        <h1>Hitta din drömlägenhet i Frövi</h1>
                        <NavLink to="/ledigt" className="hem-top-button">Sök här!</NavLink>
                    </div>
                </div>
                <div className="hem-info">
                    <div className="hem-info-left">
                        <h3>Backbro Fastigheter</h3>
                        <p>Söker du din nya drömlägenhetlägenhet i Frövi?<br/>Perfekt, då har du hittat rätt!</p>
                        <p>Vi har mer än 40 lägenheter i hjärtat av Frövi i olika storlekar.</p>
                        <p>
                            Spana in vad som är ledigt och lämna en intresseanmälan, eller kontakta oss
                            på <a href="mailto:info@backbro.se">info@backbro.se</a>, så hör vi av oss!
                        </p>
                    </div>
                    <div className="hem-info-right">
                        <h3>Om oss</h3>
                        <p>
                            Allting startade när Gustav och Margit Bäcklund, som ägde en cykelaffär i centrala Frövi,
                            bestämde sig för att köpa ett hyreshus. Ett hus blev till två och skötseln av fastigheterna
                            gick senare över till sönerna.
                        </p>
                        <p>
                            Idag består Backbro av bröderna Kent, Håkan och Stefan och antalet fastigheter har stigit till
                            6 objekt och över 40 lägenheter - alla i centrala Frövi.
                        </p>
                    </div>
                </div>
                <h3 className='nyheter-title'>Nyheter</h3>
                <hr/>
                {error && <Error />}
                {isPending && <Loading />}
                {nyheter && (
                <div className="nyheter">
                    {nyheter.slice(0, 5).map((nyhet, index) => {
                        nyhet.text = nyhet.text.replace("///", "&lt;br&gt;");
                        return (
                            <article className="nyhet" key={`Nyhet ${index}`}>
                                <div className="nyheter-content">
                                    <h4>{nyhet.rubrik}</h4>
                                    <p className="nyhets-text">{nyhet.text}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>)}
            </div>
        </AnimatedPage>
    );
}
  
export default Hem;