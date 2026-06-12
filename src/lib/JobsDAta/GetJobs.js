import { CallFunction } from "../Actions/CallFuntion"


export const GetJobs = ()=>{
    return CallFunction("/api/jobs")
}


export const JobsDetrails = ({id})=>{
    return CallFunction(`/api/jobs/${id}`)
}