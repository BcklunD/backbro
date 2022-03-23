import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React from "react";
import { useState } from 'react';
import useToken from '../effects/useToken';
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { config } from '../Constants'; 

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Login() {
    const { token, setToken } = useToken();
    const [epost, setEpost] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    let navigate = useNavigate();
    let query = useQuery();

    Axios.defaults.withCredentials = true;

    const login = (e) => {
        e.preventDefault();
        Axios.post(`${config.url.DB_URL}/api/login`, {
            epost: epost,
            password: password,
        }).then((response) => {
            if (response.data.res === false) 
                setError(true);
            else {
                setError(false);
                setToken({token: response.data.res});
                navigate("../profil", { replace: true });
            }
        });
    }
     
    if (token) {
        if (query.get("logout")) {
            setToken({token: null});
            Axios.post(`${config.url.DB_URL}/api/logout`);
            window.history.replaceState(null, null, "/login")
            navigate("../login", { replace: true });
        }
        else
            navigate("../profil", { replace: true });
        window.location.reload();
    }

    return (
        <div className="login mt-5">
            <h1>Logga in</h1>
            <hr/>
            {error && <p className="alert alert-danger">Felaktiga inloggningsuppgifter</p>}
            <Form className="loginForm" onSubmit={login}>
                <FloatingLabel controlId="epost" label="Epost" className="mb-4">
                    <Form.Control type="email" placeholder="name@example.com" required onChange={e => setEpost(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Lösenord" className="mb-4">
                    <Form.Control type="password" placeholder="Lösenord" required onChange={e => setPassword(e.target.value)} />
                </FloatingLabel>
                <Button variant="primary" type="submit">
                    Logga in
                </Button>
            </Form>
        </div>
    );
}

export default Login;