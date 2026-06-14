import { ServerFetch } from "../ReuseableFunc/Server"


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getJobs = async ()=>{
return ServerFetch('/api/jobs')
}