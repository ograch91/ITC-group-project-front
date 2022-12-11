import axios from "axios";
import { useEffect, useState } from "react";

export const useApi = (method, path, args) => {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setError] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const fetchData = () => {
            setIsLoading(true);

            axios[method](
                `https://jsonplaceholder.typicode.com${path}`,
                {
                    ...args,
                    cancelToken: source.token
                }
            )
                .then(resp => {
                    const data = resp.data;
                    console.log(data);
                    setData(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log("ERRRRRRRRR", err.code);
                    if (err.code !== 'ERR_CANCELED') {
                        setError(err.message);
                    }
                })
        }
        fetchData();

        return () => {
            source.cancel('Operation canceled by the user.');
        }
    }, []);



    return {
        data,
        isLoading,
        err
    };
}