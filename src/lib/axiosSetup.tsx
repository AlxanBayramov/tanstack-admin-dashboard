import axios, { AxiosResponse,AxiosError } from "axios";
import { useStore } from "./zustand/store";




 const axiosInstance = axios.create({
  baseURL : import.meta.env.VITE_BASE_URL
 })

axiosInstance.interceptors.request.use(
    (config) => {
   
      const {token} = useStore.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
     
      return Promise.reject(error);
    }
  );
  

  axiosInstance.interceptors.response.use(
    (response:AxiosResponse) => {
      
      return response?.data;
    },
    (error:AxiosError) => {
      
     if(error?.message){
        console.log(error.message)
     }   
        
      return Promise.reject(error);
    }
  );



  export default axiosInstance;