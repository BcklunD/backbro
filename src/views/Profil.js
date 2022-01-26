import useToken from '../effects/useToken';
import { useNavigate } from "react-router-dom";
import useSelect from '../effects/useSelect';
import { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Profil() {
    const { token } = useToken();
    const [loaded, setLoaded] = useState();
    const [losenord, setLosenord] = useState();
    const [fornamn, setFornamn] = useState();
    const [efternamn, setEfternamn] = useState();
    const [telefon, setTelefon] = useState();
    const [address, setAddress] = useState();
    let navigate = useNavigate();

    if (token == null)
        navigate("../", { replace: true });

    const handleSubmit = async e => {
        e.preventDefault();
        let changes = {};
        if (losenord !== person.losenord)
            changes.losenord = losenord;
        if (fornamn !== person.fornamn)
            changes.fornamn = fornamn;
        if (efternamn !== person.efternamn)
            changes.efternamn = efternamn;
        if (telefon !== person.telefon)
            changes.telefon = telefon;
        if (address !== person.address)
            changes.address = address;
    }

    const { data: person, isPending, error} = useSelect('person/' + token);
    
    if (!isPending && !loaded) {
        setLoaded(true);
        setLosenord(person.losenord !== null ? person.losenord : "");
        setFornamn(person.fornamn !== null ? person.fornamn : "");
        setEfternamn(person.efternamn !== null ? person.efternamn : "");
        setTelefon(person.telefon !== null ? person.telefon : "");
        setAddress(person.address !== null ? person.address : "");
    }

    return (
        <div className="profil">
            <h1 className="header-center">Din profil</h1>
            <hr/>
            {error && <Error />}
            {isPending && <Loading />}
            {person && 
                <Form className="form w-50" onSubmit={handleSubmit}>
                    <FloatingLabel controlId="epost" label="Epost" className="mb-4">
                        <Form.Control type="email" placeholder="name@example.com" value={person.epost} disabled />
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
                        <Form.Control type="text" placeholder="Telefon" value={telefon} onChange={e => setTelefon(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="adress" label="Adress" className="mb-4">
                        <Form.Control type="text" placeholder="Adress" value={address} onChange={e => setAddress(e.target.value)} />
                    </FloatingLabel>
                    <Button variant="primary" type="submit"> Spara </Button>
                </Form>
            }
        </div>
    );
}

export default Profil;