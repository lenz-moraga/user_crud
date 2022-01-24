import axios from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
//'AxiosAuthRefreshRequestConfig' is declared but its value is never read. But is working, WTF!
const axiosMainInstance = axios.create();

const httpClient = (config = AxiosAuthRefreshRequestConfig) => {
  return new Promise((resolve, reject) => {
      axiosMainInstance({
          ...config,
          baseURL: process.env.REACT_APP_API_URL,
      })
          .then(resp => {
              resolve(resp);
          })
          .catch(error => {
              const { response, message } = error || {};
              if(response && response.status === 401)
                  reject(response.data.detail)
              else
                  reject(message);
          });
  });
};

export default httpClient;
