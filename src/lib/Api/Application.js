import Server from "next/dist/server/base-server"
import { ServerFetch } from "../ReuseableFunc/Server"

export const getApplicationByApplicant = (applicantId)=>{
    return ServerFetch(`/api/application?applicantId=${applicantId}`)
}