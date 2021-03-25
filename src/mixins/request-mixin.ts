import axios, { AxiosRequestConfig } from 'axios';
import env from '../../config/env';

const requestMixin = {
  methods: {
    setAuthToken(token: string): void {
      window.localStorage.setItem('userToken', token);
    },
    getAuthToken(): string | null {
      return window.localStorage.getItem('userToken');
    },
    async get(url: string, options?: AxiosRequestConfig) {
      if (! (url.startsWith('http://') || url.startsWith('https://'))) {
        url = `${env.ADMIN_API_BASE}${url}`;
      }

      return axios.get(
        url,
        {
          ...options,
          headers: {
            ...options?.headers,
            'Authorization': this.getAuthToken()
          }
        }
      )
    },
    async post(url: string, data?: any, options?: AxiosRequestConfig) {
      if (! (url.startsWith('http://') || url.startsWith('https://'))) {
        url = `${env.ADMIN_API_BASE}${url}`;
      }

      return axios.post(
        url,
        data,
        {
          ...options,
          headers: {
            ...options?.headers,
            'Authorization': this.getAuthToken()
          }
        }
      )
    },
    async delete(url: string, data?: any, options?: AxiosRequestConfig) {
      if (! (url.startsWith('http://') || url.startsWith('https://'))) {
        url = `${env.ADMIN_API_BASE}${url}`;
      }

      return axios.delete(
        url,
        {
          ...options,
          headers: {
            ...options?.headers,
            'Authorization': this.getAuthToken()
          },
          data
        }
      )
    }
  }
};

export default requestMixin;