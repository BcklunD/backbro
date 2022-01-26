import { useState, useEffect } from 'react';

const usePost = (url, fields) => {
    url = "http://localhost:3002/" + url;
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const abortCont = new AbortController();

        fetch(url, {
            signal: abortCont.signal,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields),
            credentials: 'include'
        })
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
    }, [url, fields])

    return { data, isPending, error };
}

export default usePost;