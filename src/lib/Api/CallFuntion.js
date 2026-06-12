

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getDate = async (path)=>{
    const res =await fetch(`${baseUrl}${path}`)
    const data = await res.json();
    return data
}