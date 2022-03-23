import useSelect from '../effects/useSelect';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ConfirmAlert from '../components/ConfirmAlert';
import { config } from '../Constants'; 

Axios.defaults.withCredentials = true;

const NyhetEdit = ({ id, setReload }) => {
    const { data: nyhet, isPending, error} = useSelect('nyhet/' + id);
    const [loaded, setLoaded] = useState(false);
    const [sparad, setSparad] = useState(false);
    const [rubrik, setRubrik] = useState("");
    const [text, setText] = useState("");
    const [skapad, setSkapad] = useState("2022-01-01");
    const [till, setTill] = useState("2022-01-01");
    let navigate = useNavigate();

    if (nyhet && !loaded) {
        setLoaded(true);
        setRubrik(nyhet.rubrik !== null ? nyhet.rubrik : "");
        setText(nyhet.text !== null ? nyhet.text : "");
        setSkapad(nyhet.skapad !== null ? nyhet.skapad : "");
        setTill(nyhet.till !== null ? nyhet.till : "");
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(`${config.url.DB_URL}/api/nyhet/${id}`, {
            rubrik: rubrik,
            text: text,
            till: till === "0000-00-00 00:00:00" ? null : till
        }).then((response) => {
            if (id === "add") {
                window.history.replaceState(null, null, "/admin/nyhet/" + response.data.nyhetsid);
                window.location.reload();
            }
            setReload(true);
            setSparad(true);
            setTimeout(() => setSparad(false), 2000);
        });
    }

    function tabortNyhet() {
        if (id !== "add") {
            Axios.delete(`${config.url.DB_URL}/api/nyhet/${id}`, {
                headers: {},
                data: { type: "nyhet" }
            }).then(() => {
                window.history.replaceState(null, null, "/admin/nyhet")
                navigate("../admin/nyhet", { replace: true });
                setReload(true);
            });
        }
    }
    return (
        <div className="nyhet-edit">
            {(error) && <Error />}
            {(isPending) && <Loading />}
            {nyhet && (
            <>
                {sparad && <p className='alert alert-success'>Sparad</p>}
                <Form className="postform" onSubmit={handleSubmit}>
                    <div className="nyhet-inputs">
                        <NavLink to={`/admin/nyheter`} className="backarrow"><i className="fas fa-arrow-left fa-lg"></i></NavLink>
                        <h3 className="edit-titel">Konfigurera nyhet</h3>
                        <FloatingLabel controlId="rubrik" label="Rubrik">
                            <Form.Control type="text" value={rubrik} required onChange={e => setRubrik(e.target.value)} />
                        </FloatingLabel>
                        <div className="input-row">
                            <FloatingLabel controlId="skapad" label="Skapad">
                                <Form.Control type="text" value={skapad} disabled onChange={e => setSkapad(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="till" label="Visas till">
                                <Form.Control type="date" value={till} onChange={e => setTill(e.target.value)} />
                            </FloatingLabel>
                        </div>
                        <Form.Control className="lagenhet-beskrivning" placeholder="Text" as="textarea"
                        rows={10} value={text} onChange={e => setText(e.target.value)} />
                    </div>
                    <div className="button-row">
                        <ConfirmAlert
                            className={"btn btn-danger"}
                            buttonText={"Ta bort"}
                            title={"Är du säker?"}
                            message={"Är du säker på att du vill ta bort det här objektet?"}
                            confirmText={"Ja"}
                            denyText={"Nej"}
                            confirmFunction={tabortNyhet} />
                        <Button variant="primary" type="submit">Spara</Button>
                    </div>
                </Form>
            </>
            )}
        </div>
    );
}

export default NyhetEdit;