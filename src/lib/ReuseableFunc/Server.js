"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const ServerFetch = async (path)=>{
    const res =await fetch(`${baseUrl}${path}`)
    const data = await res.json();
    return data
}


export const ServerPost =async (formData,path)=>{
    const res= await fetch(`${baseUrl}${path}`,{
        method: "POST",
        headers : {
        "Content-Type": "application/json",
        },
         body: JSON.stringify(formData),
    })
    return res.json();
}