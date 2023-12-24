import userModel from "@/libs/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import DBConnect from "@/libs/mongoDBConntect";
import { NextResponse } from "next/server";

export async function PUT(req: any) {
  const session = await getServerSession(authOption);
  console.log(session);
  const id = session.user.id

  const body = await req.json();

  const {name} = body
  const phone = [body.phone_1,body.phone_2]
  const address = [body.address_1,body.address_2]
  // console.log(phone,address);
  
  
  DBConnect()
  const results = await userModel.findByIdAndUpdate(id,{name,phone,address});

  return NextResponse.json({success:true,message:"Profile Updated"},{status:200});
}



//get login user profile
export async function GET(req: any) {
  const session = await getServerSession(authOption);
  const id = session.user.id

  DBConnect()
  const user = await userModel.findById(id);
  const results = {
    name:user.name,
    email:user.email,
    phone:user.phone,
    address:user.address,
    profileImage:user.profileImage
  }
  

  return NextResponse.json({success:true,message:"Done", results },{status:200});
}

//3:15
