import { ServerFetch } from "../ReuseableFunc/Server"


export const getJobs = async ()=>{
return ServerFetch('/api/jobs')
}

export const getRecruiterJobs=(recruiterId)=>{
    return ServerFetch(`/api/jobs?recruiterId=${recruiterId}`)
}

export const getJobDetails = (jobId)=>{
    return ServerFetch(`/jobs/${jobId}`)
}