import { data } from "framer-motion/client"
import { auth } from "../auth"
import { headers } from "next/headers";

export const getUserSession = async()=>{
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    const data = session?.user;
    return  data
}