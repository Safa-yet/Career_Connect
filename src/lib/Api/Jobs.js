import { ServerFetch } from "../ReuseableFunc/Server"


export const getRecruiterJobs=(recruiterId)=>{
    return ServerFetch(`/api/jobs?recruiterId=${recruiterId}`)
}