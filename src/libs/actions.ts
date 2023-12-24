
export const getUserProfile = async ()=>{

    const url = "/api/profile"
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }

    const res = await fetch(url,options)
    const results = await res.json()
    return results
}


export const getAllCategories = async ()=>{

    const url = "/api/category"
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }

    const res = await fetch(url,{
        cache:'no-cache',
    })
    const results = await res.json()
    
    return results
}

export const createNewCategory = async(values:any)=>{
    const res = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await res.json();
      return results

} 
