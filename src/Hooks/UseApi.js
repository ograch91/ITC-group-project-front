import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../Context/UserAuthContext';

const baseUrl = 'http://localhost:4000';

export const useApi = (method, path, args) => {
  const [auth, setAuth] = useContext(UserAuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setError] = useState('');
  const [data, setData] = useState(null);

  const verifyPayload = resp => {
    // if (!resp.ok) {
    //   console.log('resp is not ok ', resp);
    //   throw new Error(resp.error);
    // }
    const payload = resp.data;
    if (!payload.success) {
      console.log('payload is not success ', payload);
      throw new Error(payload.error);
    }
    return payload.data;
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = () => {
      setIsLoading(true);

      // const token = auth?.token; todo:
      const token = auth?.token;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },

        validateStatus: status => status >= 200 && status < 300,

        // body: JSON.stringify({ image: imgurl }),
        ...args,
      };

      axios[method](`${baseUrl}/${path}`, {
        ...options,
        cancelToken: source.token,
      })
        .then(resp => {
          const data = verifyPayload(resp);
          setData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          if (err.code !== 'ERR_CANCELED') {
            setError(err.message);
          }
        });
    };
    fetchData();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return {
    data,
    isLoading,
    err,
  };
};
