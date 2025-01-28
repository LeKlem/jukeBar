import axios, { AxiosResponse } from "axios";
import { LoginUserDTO } from "../models/UserModels";

const url = import.meta.env.VITE_API_STRING;

export const login = async (loginUserDTO: LoginUserDTO): Promise<AxiosResponse> => {
    return await axios.post(url + "auth", loginUserDTO);    
}
export const isValid = async (token : string): Promise<AxiosResponse> => {
    return (await axios.get(url + "users/isValid/" + token)).data;    
}