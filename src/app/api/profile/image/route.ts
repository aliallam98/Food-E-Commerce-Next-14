import { getServerSession } from "next-auth"
import { authOption } from "../../auth/[...nextauth]/route"
import DBConnect from "@/libs/mongoDBConntect"
import userModel from "@/libs/models/User"
import { NextResponse } from "next/server"


export async function PATCH(req:Request) {
    const session = await getServerSession(authOption)
    const id = session.user.id
    
    
    const profileImage = await req.json()  //Url
    console.log("endPoint Image");
    
    DBConnect()
    const results = await userModel.findByIdAndUpdate(id,{profileImage},{new:true})

    // console.log(results);
    

    return  NextResponse.json({success:true},{status:200})
}