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

  const loginUser = async (email, password) => {
    const loginURL = `${url}?filter=${email}`;
    try {
      const { data, status } = await httpClient({
        method: 'get',
        url: loginURL,
      });

      if (data.length > 0 && data[0].password === password) {
        //we are implementing this kind of validation due the api we are using
        //the api url is https://61ead2ce7ec58900177cda6a.mockapi.io/users, in other cases,
        //we will have to Encode to Base64 format or any other format, encrypt the information
        //and send it to the backend and the condition to send the user to the home page will be
        //the kind of response of the server
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
