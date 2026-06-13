import { ServerFetch } from "../ReuseableFunc/Server"

export const getMyCompany = async(recruiterId)=>{
return ServerFetch(`/api/my/company?recruiterId=${recruiterId}`)
}