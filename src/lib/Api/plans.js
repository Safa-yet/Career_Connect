import { ServerFetch } from "../ReuseableFunc/Server"

export const getPlanById = (planId)=>{
    return ServerFetch(`/api/plans?plan_id=${planId}`);
}