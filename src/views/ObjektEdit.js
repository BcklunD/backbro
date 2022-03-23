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

Axios.defaults.withCredentials = true;

const ObjektEdit = ({ id, setReload }) => {
    const { data: objekt, isPending, error} = useSelect('objekt/' + id);
    const [loaded, setLoaded] = useState(false);
    const [sparad, setSparad] = useState(false);
    const [address, setAddress] = useState(0);
    const [postnr, setPostnr] = useState(0);
    const [ort, setOrt] = useState(0);
    const [ext, setExt] = useState(0);
    let navigate = useNavigate();

    if (objekt && !loaded) {
        setLoaded(true);
        setAddress(objekt.address !== undefined ? objekt.address : 1);
        setPostnr(objekt.postnr !== undefined ? objekt.postnr : "");
        setOrt(objekt.ort !== undefined ? objekt.ort : "");
        setExt(objekt.ext !== undefined ? objekt.ext : "");
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(`${config.url.DB_URL}/api/objekt/${id}`, {
            address: address,
            postnr: postnr,
            ort: ort
        }).then((response) => {
            if (id === "add") {
                window.history.replaceState(null, null, "/admin/objekt/" + response.data.objektid);
                window.location.reload();
            }
            setReload(true);
            setSparad(true);
            setTimeout(() => setSparad(false), 2000);
        });
    }

    function tabortObjekt() {
        if (id !== "add") {
            Axios.delete(`${config.url.DB_URL}/api/objekt/${id}`, {
                headers: {},
                data: {
                    type: "objekt",
                    ext: ext
                }
            }).then(() => {
                window.history.replaceState(null, null, "/admin/objekt")
                navigate("../admin/objekt", { replace: true });
                setReload(true);
            });
        }
    }
    return (
        <div className="objekt-edit">
            {(error) && <Error />}
            {(isPending) && <Loading />}
            {objekt && (
            <>
                {sparad && <p className='alert alert-success'>Sparad</p>}
                <Form className="postform" onSubmit={handleSubmit}>
                    <div className="objekt-inputs">
                        <NavLink to={`/admin/objekt`} className="backarrow"><i className="fas fa-arrow-left fa-lg"></i></NavLink>
                        <h3 className="edit-titel">Konfigurera objekt</h3>
                        <FloatingLabel controlId="address" label="Adress" className="address-field">
                            <Form.Control type="text" value={address} required onChange={e => setAddress(e.target.value)} />
                        </FloatingLabel>
                        <div className="input-row">
                            <FloatingLabel controlId="postnr" label="Postnr">
                                <Form.Control type="text" value={postnr} required onChange={e => setPostnr(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="ort" label="Ort">
                                <Form.Control type="text" value={ort} required onChange={e => setOrt(e.target.value)} />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="button-row">
                        {objekt?.lagenheter?.length === 0 && 
                        <ConfirmAlert
                            className={"btn btn-danger"}
                            buttonText={"Ta bort"}
                            title={"Är du säker?"}
                            message={"Är du säker på att du vill ta bort det här objektet?"}
                            confirmText={"Ja"}
                            denyText={"Nej"}
                            confirmFunction={tabortObjekt} />}
                        <Button variant="primary" type="submit">Spara</Button>
                    </div>
                </Form>
                { objekt.address &&
                    <>
                        <FileUpload lopnr={id} setReload={setReload} type={"objekt"} />
                        {objekt.ext &&
                        <div className="objekt-bild">
                            <Image id={id} ext={ext} alt={`objektets bild`} />
                        </div>}
                        {objekt.lagenheter.length > 0 && (
                        <>
                            <hr/>
                            <h3>Kopplade lägenheter</h3>
                            <div className="kopplade-lagenheter">
                                {objekt.lagenheter.map((lagenhet, index) => {
                                    return (
                                        <NavLink to={`/admin/lagenheter/${lagenhet.lopnr}`} key={`kopplad-lagenhet-${index}`}>
                                            <div className="kopplad-lagenhet">
                                                <p>{lagenhet.rum} rum</p>
                                                <p>{lagenhet.kvm}  m&sup2;</p>
                                                <p>{lagenhet.hyra} kr</p>
                                            </div>
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </>)}
                    </>
                }
            </>
            )}
        </div>
    );
}

export default ObjektEdit;