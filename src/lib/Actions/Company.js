'use server'
import { revalidatePath } from "next/cache";
import { ServerPost } from "../ReuseableFunc/Server"


export const createCompany = async(newCompanyData)=>{
return ServerPost(newCompanyData,'/api/company')
}


export const updateCompnay = async(updatedData ,id) => {
    const result =  ServerPost(updatedData, `/api/company/${id}`,"PATCH");
    revalidatePath('/dashboard/admin/company')
    return result ;
    


}