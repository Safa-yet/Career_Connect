import { ServerPost } from "../ReuseableFunc/Server"


export const createCompany = async(newCompanyData)=>{
return ServerPost(newCompanyData,'/api/company')
}
