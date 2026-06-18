import Server from "next/dist/server/base-server"
import { protectedFetch, ServerFetch } from "../ReuseableFunc/Server"

export const getApplicationByApplicant = (applicantId)=>{
    return protectedFetch(`/api/application?applicantId=${applicantId}`)
}