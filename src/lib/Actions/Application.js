import { ServerPost } from "../ReuseableFunc/Server"


export const submitApplication = (formData)=>{
    return ServerPost(formData,'/api/application' )
}