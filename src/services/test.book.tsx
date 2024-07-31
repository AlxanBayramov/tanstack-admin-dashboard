import { AxiosError } from "axios";
import axiosInstance from "lib/axiosSetup";
import { IAuth,IUser } from 'lib/zustand/auth/model'

interface ILoginData {
    userName: string;
    password: string;
  }
 
export async function postData(data:ILoginData){
 try {
    const result = await axiosInstance.post<ILoginData,IAuth>('/auth/token',data)
    return result;
 } catch (error:AxiosError|unknown) {
    if(error instanceof AxiosError){
        console.log(error.message)
    }
 }   
}

export async function getMe(){
   
    try {
       const data = await axiosInstance.get<void,IUser>('/auth/profile') 
       return data;
    } catch (error:AxiosError|unknown) {
        if(error instanceof AxiosError){
            console.log(error.message)
        }
    }
}