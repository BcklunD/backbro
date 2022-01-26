import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Lagenhet from '../components/Lagenhet';

const LagenhetList = () => {
    const { data: lagenheter, isPending, error} = useSelect('lagenhet/');
    return (
        <div className="lagenheter">
            {error && <Error />}
            {isPending && <Loading />}
            {lagenheter && (
            lagenheter.filter((lagenhet) => lagenhet.ledig === 1).map((lagenhet) => (
                <Lagenhet lagenhet={lagenhet} page="ledigt" key={`${lagenhet.objektid}-${lagenhet.lopnr}`} />
            )))}
        </div>
    );
}

export default LagenhetList;