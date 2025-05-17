import axios from "axios";
import { BACKEND_API_PATHS } from "../helpers/constants/backendApiPath.constant";
import { API_BACKEND_PATH } from "../config/env";
import axiosInstance from "../helpers/constants/AxiosInstance";

export const SignIn_Service = async (email: string, password: string) => {

   try {
      const response = await axiosInstance.post(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.SIGNIN}`,
         {
            email,
            password,
         },{
            withCredentials:true,
         }
      );
      // console.log(response)
      // localStorage.setItem('Name', `${response?.data?.data?.name}`)
      // localStorage.setItem('Role', `${response?.data?.data?.role}`)
      // localStorage.setItem('Email', `${response?.data?.data?.email}`)
      // localStorage.setItem('Id',`${response?.data?.data?.id}`)
      // console.log(response, "logedin")
      return response?.data;
   } catch (error) {
      console.error("Error while SignIn :-", error)
   }
}

export const SignOut_Service = async () => {
   try {
      const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.SIGNOUT}`,
         {
           withCredentials:true,
         });
      localStorage.clear();
     return response;
   } catch (error) {
      console.error("Error while SignOut :-", error)
   }
}

