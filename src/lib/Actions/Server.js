"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const CreateComapny=async (formData)=>{
    const res= await fetch('http://localhost:5000/api/company',{
        method: "POST",
        headers : {
        "Content-Type": "application/json",
        },
         body: JSON.stringify(formData),
    })
    return res.json();
}