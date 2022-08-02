import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ImageSlider from '../components/ImageSlider';
import IntresseanmalanModal from '../components/IntresseanmalanModal';
import { useState } from 'react';

const LagenhetDetalj = ({id}) => {
    const [visaKnapp, setVisaKnapp] = useState(true);
    const { data: lagenhet, isPending, error} = useSelect('lagenhet/' + id);

    function openModal() {
        document.getElementById('intresseanmalanModal').showModal();
    }
    return (
        <div className="lagenhet-detalj">
            {error && <Error />}
            {isPending && <Loading />}
            {lagenhet && (
            <>
                <IntresseanmalanModal lagenhetsid={id} setVisaKnapp={setVisaKnapp}/>
                <article>
                    {visaKnapp ? 
                        ( <button id='intresseBtn' onClick={openModal}>Lämna intresseanmälan</button> ) :
                        ( 
                        <p className='inskickadText'>
                            Intresseanmalan inskickad
                            <i class="fa fa-check fa-lg" aria-hidden="true"></i>
                        </p>
                        ) }
                    <div className="lagenhet-bildslider">
                        <ImageSlider lopnr={id} images={lagenhet.images} />
                    </div>
                    <hr />
                    <div className="lagenhet-info">
                        <h4>Detaljer</h4>
                        <div className="lagenhet-info-detalj">
                            <p><i className="fas fa-search-location"></i> {lagenhet.address}</p>
                            <p><i className="fa-solid fa-up-down-left-right"></i> {lagenhet.kvm} m&#178;</p>
                            <p><i className="fa-regular fa-building"></i> {lagenhet.rum} rum</p>
                            <p><i className="fas fa-coins"></i> {lagenhet.hyra} kr/månad</p>
                        </div>
                        <div className="lagenhet-info-right">
                            <p>{lagenhet.beskrivning}</p>
                        </div>
                    </div>
                </article>
            </>)}
        </div>
    );
}

export default LagenhetDetalj;