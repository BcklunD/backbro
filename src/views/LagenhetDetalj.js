import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';

const LagenhetDetalj = ({id}) => {
    const { data: lagenhet, isPending, error} = useSelect('lagenhet/' + id);

    return (
        <div className="lagenhet-detalj">
            {error && <Error />}
            {isPending && <Loading />}
            {lagenhet && (
            <article>
                <h2>Detaljer</h2>
                <p>{lagenhet.address}, {lagenhet.postnr} {lagenhet.ort}</p>
                <p>{lagenhet.kvm} kvm, {lagenhet.rum} rum, {lagenhet.hyra} kr/månad</p>
                <p>{lagenhet.beskrivning}</p>
            </article>
            )}
        </div>
    );
}

export default LagenhetDetalj;