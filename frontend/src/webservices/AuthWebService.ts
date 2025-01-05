import axios, { AxiosResponse } from "axios";
import { LoginUserDTO } from "../models/UserModels";

const url = import.meta.env.VITE_API_STRING + 'auth';

export const login = async (loginUserDTO: LoginUserDTO): Promise<AxiosResponse> => {
    return await axios.post(url, loginUserDTO);    
}