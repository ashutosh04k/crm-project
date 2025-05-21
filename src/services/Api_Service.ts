import axios from "axios";
import { BACKEND_API_PATHS } from "../helpers/constants/backendApiPath.constant";
import { API_BACKEND_PATH } from "../config/env";

export const GetAllUser = async() =>{
    try {
      const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}`,{
        withCredentials:true
      })
      return response?.data?.data;
    } catch (error) {
        console.error("Error while Fetching Users :-", error)
    }
};

export const CreateLead = async(FormData:any) =>{
    try{
        const response = await axios.post(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.LEADS}`,
        {
            FormData
        },{
            withCredentials:true
        })
        return response.data;
    }catch(error){
      console.error("Error in Creating Lead :- ", error); 
    }
};

export const GetAllLead = async() =>{
  try{
      const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.LEADS}`,{
          withCredentials:true
      })
      return response.data;
  }catch(error){
    console.error("Error in Creating Lead :- ", error); 
  }
};

export const CreateCRMUser = async (FormData:any)=>{
  try{
    const response = await axios.post(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.AUTH}/${BACKEND_API_PATHS.CREATEUSER}`,
    {
        FormData
    },{
        withCredentials:true
    })
    return response.data;
}catch(error){
  console.error("Error in Creating CRMUser :- ", error); 
}
};

export const FetchLeadById = async(id:string) =>{
  try {
    const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}/${id}/${BACKEND_API_PATHS.LEADS}`,{
      withCredentials:true
    })
    return response?.data;
    
  } catch (error) {
    console.error("Error in Fetching lead by id :- ", error); 
  }
}


export const FetchLeadofTeamLeads = async(id:string) =>{
  try {
    const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.LEADS}/${BACKEND_API_PATHS.LEADSTEAM}/${id}`,{
      withCredentials:true
    })
    return response?.data;
    
  } catch (error) {
    console.error("Error in Fetching lead by id :- ", error); 
  }
}

export const FetchUserById = async(id:string)=>{
  try {
    const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}/${id}`,{
      withCredentials:true
    })
    return response?.data;
    
  } catch (error) {
    console.error("Error in Fetching lead by id :- ", error); 
  }
}

export const FetchAllTeamLead = async() =>{
  try {
    const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}/${BACKEND_API_PATHS.TEAMLEAD}`,{
      withCredentials:true,
    })
    return response?.data?.data;
  } catch (error) {
    console.error("Error in Fetching All Team Leads :- ", error); 
  }
}

export const FetchAllAdmin = async() =>{
  try {
    const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}/${BACKEND_API_PATHS.ADMINS}`,{
      withCredentials:true,
    })
    return response?.data?.data;
  } catch (error) {
    
  }
}

export const FetchAllExecutiveByManagerId = async(Id:string) =>{
  try {
    const response = await axios.get(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}/${Id}/${BACKEND_API_PATHS.EXECUTIVESINTEAM}`,{
      withCredentials:true,
    })
    return response?.data?.data;
  } catch (error) {
    console.error("Error in Fetching All Team Executive :- ", error); 
  }
}

export const LeadAssign = async(AssignToId:string,FormData:any) =>{
  try {
    const response = await axios.patch(`${API_BACKEND_PATH}/${BACKEND_API_PATHS.USERS}/${AssignToId}/${BACKEND_API_PATHS.LEADSASSIGN}`,
      {
        FormData
      },
      {
      withCredentials:true,
    })
    return response.data;
  } catch (error) {
    
  }
}