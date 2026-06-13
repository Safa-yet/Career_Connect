import { ServerPost } from "../ReuseableFunc/Server"

export const createJob =async (formData)=>{

    return ServerPost(formData,'/api/jobs');

}