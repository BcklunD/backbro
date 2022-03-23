import { useState, useEffect } from 'react';
import { config } from '../Constants'; 

const useSelect = (url) => {
    url = config.url.DB_URL + "/api/" + url;
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        setReload(null);
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal, credentials: 'include' })
            .then(res => {
                if(!res.ok)
                    throw Error("Kunde inte hämta data från databasen");

                return res.json();
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                    setIsPending(false)
                    setData(null)
                }
            });

        return () => abortCont.abort();
    }, [url, reload])

    return { data, isPending, error, setReload };
}

export default useSelect;