import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LagenhetEdit = ({id}) => {
    const [loaded, setLoaded] = useState();
    const [objektid, setObjektid] = useState(0);
    const [kvm, setKvm] = useState(0);
    const [rum, setRum] = useState(0);
    const [hyra, setHyra] = useState(0);
    const [ledig, setLedig] = useState(0);
    const [beskrivning, setBeskrivning] = useState("");
    const { data: objekts, isPendingObj, errorObj} = useSelect('objekt');
    const { data: lagenhet, isPending, error} = useSelect('lagenhet/' + id);

    if (!isPending && !loaded) {
        setLoaded(true);
        setObjektid(lagenhet.objektid !== null ? lagenhet.objektid : "");
        setKvm(lagenhet.kvm !== null ? lagenhet.kvm : "");
        setRum(lagenhet.rum !== null ? lagenhet.rum : "");
        setHyra(lagenhet.hyra !== null ? lagenhet.hyra : "");
        setLedig(lagenhet.ledig !== null ? lagenhet.ledig : "");
        setBeskrivning(lagenhet.beskrivning !== null ? lagenhet.beskrivning : "");
    }

    const onSwitchLedig = () => {
        setLedig(Math.abs(ledig - 1));
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("handle submit!");
    }

    function tabortLagenhet() {
        console.log("ta bort l�genhet!");
    }
    return (
        <div className="lagenhet-edit">
            {(error || errorObj) && <Error />}
            {(isPending || isPendingObj) && <Loading />}
            {lagenhet && objekts && (
            <Form className="postform" onSubmit={handleSubmit}>
                <div className="lagenhet-inputs">
                    <NavLink to={`/admin/lagenheter`} className="backarrow"><i className="fas fa-arrow-left fa-lg"></i></NavLink>
                    <h3 className="lagenhet-titel">Konfigurera lägenhet</h3>
                    <FloatingLabel controlId="objektid" label="Objekt">
                        <Form.Select value={objektid} onChange={e => setObjektid(e.target.value)}>
                            { objekts.map((objekt) => {
                                    return (<option key={objekt.objektid} value={objekt.objektid}>{objekt.address}</option>)
                                }) }
                        </Form.Select>
                    </FloatingLabel>
                    <div className="input-row">
                        <FloatingLabel controlId="kvm" label="Kvadratmeter">
                            <Form.Control type="text" value={kvm} required onChange={e => setKvm(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="rum" label="Antal rum">
                            <Form.Control type="text" value={rum} required onChange={e => setRum(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="hyra" label="Hyra">
                            <Form.Control type="text" value={hyra} required onChange={e => setHyra(e.target.value)} />
                        </FloatingLabel>
                        <Form.Switch label="Ledig" checked={ledig} onChange={onSwitchLedig} />
                    </div>
                    <Form.Control className="lagenhet-beskrivning" placeholder="Beskrivning" as="textarea"
                    rows={10} value={beskrivning} onChange={e => setBeskrivning(e.target.value)} />
                </div>
                <div className="button-row">
                    <Button variant="danger" onClick={tabortLagenhet}>Ta bort</Button>
                    <Button variant="primary" type="submit">Spara</Button>
                </div>
                </Form>
            )}
        </div>
    );
}

export default LagenhetEdit;