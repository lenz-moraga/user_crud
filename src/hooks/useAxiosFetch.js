import httpClient from '../services/httpClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAxiosFetch = () => {
  const url = '/users';
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

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

  const loginUser = async (email, password) => {
    const loginURL = `${url}?filter=${email}`;
    try {
      const { data, status } = await httpClient({
        method: 'get',
        url: loginURL,
      });

      if (data.length > 0 && data[0].password === password) {
        navigate('/user-list');
        return { status };
      } else if (data.length < 1 || data[0].password !== password) {
        alert('user or password incorrect');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const methodCall = (
    method,
    id = null,
    dataObject = {},
    email = '',
    password = ''
  ) => {
    const calls = {
      get: getUserList,
      post: createUser,
      update: updateUserInfo,
      delete: deleteUser,
      login: loginUser,
    };

    const methodVar = (calls[method] || calls['get'])(
      id,
      dataObject,
      email,
      password
    );

    return methodVar;
  };

  return { response, error, loading, methodCall };
};
