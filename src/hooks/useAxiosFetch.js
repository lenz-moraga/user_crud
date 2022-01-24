import httpClient from '../services/httpClient';
import { useState } from 'react';

export const useAxiosFetch = () => {
  const url = '/users';
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserList = async () => {
    try {
      const { data, status } = await httpClient({
        method: 'get',
        url,
      });
      setResponse(data);

      return { status };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (id, dataObject) => {
    const updateURL = `${url}/${id}`;
    try {
      const { data, status } = await httpClient({
        method: 'put',
        url: updateURL,
        data: { ...dataObject },
      });

      return {
        data,
        status,
      };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const deleteURL = `${url}/${id}`;
    try {
      const { status } = await httpClient({
        method: 'delete',
        url: deleteURL,
      });

      return { status };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (dataObject) => {
    try {
      const { status } = await httpClient({
        method: 'post',
        url,
        data: { ...dataObject },
      });
      return { status };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const methodCall = (method, id = null, dataObject = {}) => {
    const calls = {
      get: getUserList,
      post: createUser,
      update: updateUserInfo,
      delete: deleteUser,
    };

    const methodVar = (calls[method] || calls['get'])(id, dataObject);

    return methodVar;
  };

  return { response, error, loading, methodCall };
};
