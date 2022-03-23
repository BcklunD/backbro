import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function useToken() {
    let navigate = useNavigate();

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken?.expires < new Date().getTime()) {
            localStorage.removeItem('token');
            window.history.replaceState(null, null, "/login")
            navigate("../login", { replace: true });
            window.location.reload();
        }
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        if (userToken.token === null)
            localStorage.removeItem('token');
        else {
            let now = new Date();
            userToken.expires = now.getTime() + 1000 * 60 * 60 * 24 * 7;
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.token);
        }
    };

    return { setToken: saveToken, token }
}