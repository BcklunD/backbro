import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import Axios from "axios";
import { config } from '../Constants'; 

Axios.defaults.withCredentials = true;

const IntresseanmalanModal = ({lagenhetsid, setVisaKnapp}) => {
    const [inskickad, setInskickad] = useState(false);
    const [namn, setNamn] = useState("");
    const [epost, setEpost] = useState("");
    const [telefonnr, setTelefonnr] = useState("");
    const [fritext, setFritext] = useState("");

    function closeModal() {
        document.getElementById("intresseanmalanModal").close();
    }
    function handleSubmit(e) {
        e.preventDefault();
        Axios.post(`${config.url.DB_URL}/api/intresseanmalan`, {
            namn: namn,
            epost: epost,
            telefonnr: telefonnr,
            fritext: fritext,
            lagenhetsid: lagenhetsid
        }).then(() => {
            setVisaKnapp(false);
            setInskickad(true);
            setTimeout(() => closeModal(), 2000);
        });
    }

    return (
        <dialog id='intresseanmalanModal'>
            <h3 className='title'>Intresseanmälan</h3>
            <div className={inskickad ? "inskickad" : "inskickad hide"}>
                <i className="fa fa-check fa-6x" aria-hidden="true"></i>
                <p>Inskickad!</p>
            </div>
            <Form className={inskickad ? "postform hide" : "postform"} onSubmit={handleSubmit}>
                <FloatingLabel controlId="namn" label="Ditt namn">
                    <Form.Control type="text" value={namn} required onChange={e => setNamn(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="email" label="Din epost">
                    <Form.Control type="text" value={epost} required onChange={e => setEpost(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="telefon" label="Ditt telefonnr">
                    <Form.Control type="text" value={telefonnr} required onChange={e => setTelefonnr(e.target.value)} />
                </FloatingLabel>
                <Form.Control className="lagenhet-beskrivning" placeholder="Fritext" as="textarea"
                    rows={4} value={fritext} onChange={e => setFritext(e.target.value)} />
                <div className="button-row">
                    <Button variant="outline-secondary" onClick={closeModal}>Stäng</Button>
                    <Button variant="outline-success" type="submit">Skicka in</Button>
                </div>
            </Form>
        </dialog>
    );
}

export default IntresseanmalanModal;