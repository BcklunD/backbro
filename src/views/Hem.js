import { NavLink } from 'react-router-dom';
import ReactPreloadImage from 'react-preload-image';
import homeImage from '../images/home-background.jpg';

function Hem() {
    const PreloadImage = ReactPreloadImage; 

    return (
        <div className="hem">
            <div className="hem-top">
                <PreloadImage
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '500px',
                        background: "linear-gradient(to bottom, rgba(151,151,126,1) 0%, rgba(230,230,209,1) 70%, rgba(239,241,237,1) 100%)",
                        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#97977e', endColorstr='#eff1ed', GradientType=0 )"
                    }}
                    src={homeImage}
                    duration="1000ms"
                />
                <div className="hem-top-text">
                    <h1>Backbro Fastigheter AB</h1>
                    <NavLink to="/ledigt" className="hem-top-button">Hitta din nya lägenhet här!</NavLink>
                </div>
            </div>
            <div className="nyheter">
                <h1>Senaste nytt</h1>
                <article className="nyhet">
                    <h3>Ny värmepump</h3>
                    <p>
                        Vi har nu installerat en ny värmepump i det blåa huset. Detta kommer förhoppningsvis resultera i lägre elkostnader
                        vilket gör att vi kommer kunna sänka hyran för er som bor i detta hus.
                    </p>
                    <p>
                        Värmepump kommer också att installeras i alla resterande hus för att även ni ska få lägre hyra.
                    </p>
                </article>
                <article className="nyhet">
                    <h3>Årsmöte</h3>
                    <p>
                        Den 15e oktober kommer vi att hålla i ett årsmöte där vi kommer berätta mer om våra planer för kyrkan som ska byggas
                        om till lägenheter, samt vad vi har för planer angående renoveringar och liknande.
                    </p>
                    <p>Anmäl er till mötet genom att kontakta Kent på mobil eller via e-post.</p>
                </article>
                <article className="nyhet">
                    <h3>Årsmöte</h3>
                    <p>
                        Den 15e oktober kommer vi att hålla i ett årsmöte där vi kommer berätta mer om våra planer för kyrkan som ska byggas
                        om till lägenheter, samt vad vi har för planer angående renoveringar och liknande.
                    </p>
                    <p>Anmäl er till mötet genom att kontakta Kent på mobil eller via e-post.</p>
                </article>
                <article className="nyhet">
                    <h3>Årsmöte</h3>
                    <p>
                        Den 15e oktober kommer vi att hålla i ett årsmöte där vi kommer berätta mer om våra planer för kyrkan som ska byggas
                        om till lägenheter, samt vad vi har för planer angående renoveringar och liknande.
                    </p>
                    <p>Anmäl er till mötet genom att kontakta Kent på mobil eller via e-post.</p>
                </article>
                <article className="nyhet">
                    <h3>Årsmöte</h3>
                    <p>
                        Den 15e oktober kommer vi att hålla i ett årsmöte där vi kommer berätta mer om våra planer för kyrkan som ska byggas
                        om till lägenheter, samt vad vi har för planer angående renoveringar och liknande.
                    </p>
                    <p>Anmäl er till mötet genom att kontakta Kent på mobil eller via e-post.</p>
                </article>
                <article className="nyhet">
                    <h3>Årsmöte</h3>
                    <p>
                        Den 15e oktober kommer vi att hålla i ett årsmöte där vi kommer berätta mer om våra planer för kyrkan som ska byggas
                        om till lägenheter, samt vad vi har för planer angående renoveringar och liknande.
                    </p>
                    <p>Anmäl er till mötet genom att kontakta Kent på mobil eller via e-post.</p>
                </article>
            </div>
        </div>
    );
}
  
export default Hem;