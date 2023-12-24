import categoryModel from "@/libs/models/Category";
import DBConnect from "@/libs/mongoDBConntect";
import { revalidateTag } from "next/cache";
import {NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{ params }:{params:{ id: string }}) {

    const data = await req.json()
    const id = params.id
    // console.log(data);
    // console.log(id);

    DBConnect();

    const results = await categoryModel.findByIdAndUpdate(id,data)
     revalidateTag("categories")

    if(!results) return NextResponse.json({success:false,message:"Cannot Find This Doc"},{status:404})
    

    return NextResponse.json({success:true,message:"Updated"},{status:200})
}
export async function DELETE(req:NextRequest,{ params }:{params:{ id: string }}) {

    const id = params.id
    // console.log(data);
    console.log(id);

    DBConnect();

    const results = await categoryModel.findByIdAndDelete(id)
     revalidateTag("categories")

    if(!results) return NextResponse.json({success:false,message:"Cannot Find This Doc"},{status:404})

    console.log(results);
    
    

    return NextResponse.json({success:true,message:"Deleted"},{status:200})
}