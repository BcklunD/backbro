import useToken from '../effects/useToken';
import { useNavigate } from "react-router-dom";
import useSelect from '../effects/useSelect';
import { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Axios from "axios";
import { config } from '../Constants';
import AnimatedPage from '../components/AnimatedPage';

Axios.defaults.withCredentials = true;

function Profil() {
    const { token } = useToken();
    const [loaded, setLoaded] = useState(false);
    const [sparad, setSparad] = useState(false);
    const [losenord, setLosenord] = useState(0);
    const [fornamn, setFornamn] = useState(0);
    const [efternamn, setEfternamn] = useState(0);
    const [telefon, setTelefon] = useState(0);
    const [address, setAddress] = useState(0);
    let navigate = useNavigate();

    if (token == null)
        navigate("../", { replace: true });

    const handleSubmit = async e => {
        e.preventDefault();
        Axios.post(`${config.url.DB_URL}/api/person/${token.personid}`, {
            losenord: losenord,
            fornamn: fornamn,
            efternamn: efternamn,
            telefon: telefon,
            address: address
        }).then(() => {
            setSparad(true);
            setTimeout(() => setSparad(false), 2000);
        });
    }
    const { data: person, isPending, error} = useSelect('person/' + token.personid);
    
    if (!loaded && person) {
        setLoaded(true);
        setLosenord(person.losenord);
        setFornamn(person.fornamn);
        setEfternamn(person.efternamn);
        setTelefon(person.telefon);
        setAddress(person.address);
    }

    return (
        <AnimatedPage>
            <div className="profil">
                <h1 className="header-center">Din profil</h1>
                <hr/>
                {error && <Error />}
                {isPending && <Loading />}
                {person && 
                    <Form className="form" onSubmit={handleSubmit}>
                        {sparad && <p className='alert alert-success'>Sparad</p>}
                        <FloatingLabel controlId="epost" label="Epost" className="mb-4">
                            <Form.Control type="email" placeholder="name@example.com" value={person.epost ? person.epost : ""} disabled />
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Lösenord" className="mb-4">
                            <Form.Control type="password" placeholder="Lösenord" value={losenord} required onChange={e => setLosenord(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="fornamn" label="Förnamn" className="mb-4">
                            <Form.Control type="text" placeholder="Förnamn" value={fornamn} onChange={e => setFornamn(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="efternamn" label="Efternamn" className="mb-4">
                            <Form.Control type="text" placeholder="Efternamn" value={efternamn} onChange={e => setEfternamn(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="telefon" label="Telefon" className="mb-4">
                            <Form.Control type="text" placeholder="Telefon" value={telefon ? telefon : ""} onChange={e => setTelefon(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="adress" label="Adress" className="mb-4">
                            <Form.Control type="text" placeholder="Adress" value={address ? address : ""} onChange={e => setAddress(e.target.value)} />
                        </FloatingLabel>
                        <Button variant="primary" type="submit"> Spara </Button>
                    </Form>
                }
            </div>
        </AnimatedPage>
    );
}

export default Profil;