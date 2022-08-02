import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Image from '../components/ImageEdit';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ConfirmAlert from '../components/ConfirmAlert';
import { config } from '../Constants'; 

function useForceUpdate(){
    const [value, setValue] = useState(0); // eslint-disable-line no-unused-vars
    return () => setValue(value => value + 1);
}
Axios.defaults.withCredentials = true;

const LagenhetEdit = ({ id, setReload }) => {
    const { data: objekts, isPendingObj, errorObj} = useSelect('objekt');
    const { data: lagenhet, isPending, error} = useSelect('lagenhet/' + id);
    const [loaded, setLoaded] = useState(false);
    const [sparad, setSparad] = useState(false);
    const [objektid, setObjektid] = useState(1);
    const [kvm, setKvm] = useState(0);
    const [rum, setRum] = useState(0);
    const [hyra, setHyra] = useState(0);
    const [lagenhetsnr, setLagenhetsnr] = useState(0);
    const [ledig, setLedig] = useState(1);
    const [beskrivning, setBeskrivning] = useState("");
    const [images, setImages] = useState([]);
    let navigate = useNavigate();

    const forceUpdate = useForceUpdate();

    if (lagenhet && !loaded && objekts) {
        setLoaded(true);
        setObjektid(lagenhet.objektid !== undefined ? lagenhet.objektid : 1);
        setKvm(lagenhet.kvm !== undefined ? lagenhet.kvm : "");
        setRum(lagenhet.rum !== undefined ? lagenhet.rum : "");
        setHyra(lagenhet.hyra !== undefined ? lagenhet.hyra : "");
        setLagenhetsnr(lagenhet.lagenhetsnr !== undefined ? lagenhet.lagenhetsnr : "");
        setLedig(lagenhet.ledig !== undefined ? lagenhet.ledig : 1);
        setBeskrivning(lagenhet.beskrivning !== undefined ? lagenhet.beskrivning : "");
        setImages(lagenhet.images !== undefined ? lagenhet.images : []);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(`${config.url.DB_URL}/api/lagenhet/${id}`, {
            objektid: objektid,
            kvm: kvm,
            rum: rum,
            hyra: hyra,
            lagenhetsnr: lagenhetsnr,
            ledig: ledig,
            beskrivning: beskrivning
        }).then((response) => {
            if (id === "add") {
                window.history.replaceState(null, null, "/admin/lagenheter/" + response.data.lopnr);
                window.location.reload();
            }
            setReload(true);
            setSparad(true);
            setTimeout(() => setSparad(false), 2000);
        });
    }

    function tabortLagenhet() {
        if (id !== "add") {
            Axios.delete(`${config.url.DB_URL}/api/lagenhet/${id}`, {
                headers: {},
                data: {
                    type: "lagenhet"
                }
            }).then(() => {
                window.history.replaceState(null, null, "/admin/lagenheter")
                navigate("../admin/lagenheter", { replace: true });
                setReload(true);
            });
        }
    }
    return (
        <div className="lagenhet-edit">
            {(error || errorObj) && <Error />}
            {(isPending || isPendingObj) && <Loading />}
            {lagenhet && objekts && (
            <>
                {sparad && <p className='alert alert-success'>Sparad</p>}
                <Form className="postform" onSubmit={handleSubmit}>
                    <div className="lagenhet-inputs">
                        <NavLink to={`/admin/lagenheter`} className="backarrow"><i className="fas fa-arrow-left fa-lg"></i></NavLink>
                        <h3 className="edit-titel">Konfigurera lägenhet</h3>
                        <div className="input-inline">
                            <FloatingLabel controlId="objektid" label="Objekt">
                                <Form.Select value={objektid} onChange={e => setObjektid(e.target.value)}>
                                    { objekts.map((objekt, index) => {
                                            return (<option key={`${objekt.objektid}, ${index}`} value={objekt.objektid}>{objekt.address}</option>)
                                    }) }
                                </Form.Select>
                            </FloatingLabel>
                            <NavLink to={`/admin/objekt/${lagenhet.objektid}`} className="linkarrow"><i className="fas fa-arrow-right fa-lg"></i></NavLink>
                        </div>
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
                            <FloatingLabel controlId="lagenhetsnr" label="Lagenhetsnr">
                                <Form.Control type="text" value={lagenhetsnr} required onChange={e => setLagenhetsnr(e.target.value)} />
                            </FloatingLabel>
                            <Form.Switch label="Ledig" checked={ledig} onChange={() => { setLedig(Math.abs(ledig === undefined ? 0 : ledig - 1)); }} />
                        </div>
                        <Form.Control className="lagenhet-beskrivning" placeholder="Beskrivning" as="textarea"
                        rows={10} value={beskrivning} onChange={e => setBeskrivning(e.target.value)} />
                    </div>
                    <div className="button-row">
                        {/* <Button variant="danger" onClick={tabortLagenhet}>Ta bort</Button> */}
                        <ConfirmAlert
                            className={"btn btn-danger"}
                            buttonText={"Ta bort"}
                            title={"Är du säker?"}
                            message={"Är du säker på att du vill ta bort den här lägenheten?"}
                            confirmText={"Ja"}
                            denyText={"Nej"}
                            confirmFunction={tabortLagenhet} />
                        <Button variant="primary" type="submit">Spara</Button>
                    </div>
                </Form>
                <hr/>
                { lagenhet.objektid &&
                <FileUpload lopnr={id} forceUpdate={forceUpdate} images={images} setImages={setImages} type={"lagenhet"} />}
                {images && <div className="images">
                    {images.map((image) => {
                        return (<Image 
                            id={id} 
                            image={image}
                            alt={`bild ${image}`} key={image} images={images} setImages={setImages}/>)
                    })}
                </div>}
            </>
            )}
        </div>
    );
}

export default LagenhetEdit;