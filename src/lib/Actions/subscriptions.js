import { ServerPost } from "../ReuseableFunc/Server"


export const createSubsction = async(subInfo)=>{
    return ServerPost(subInfo,'/api/subscriptions');
}