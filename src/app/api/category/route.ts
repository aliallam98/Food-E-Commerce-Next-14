import categoryModel from "@/libs/models/Category";
import DBConnect from "@/libs/mongoDBConntect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOption);
  const id = session?.user.id;
  const data = await req.json();
  // console.log(data);

  DBConnect();

  const newCategory = await categoryModel.create({
    ...data,
    createdBy: id,
  });

  return NextResponse.json({ success: true, message: "Category Created" });
}
export async function GET(req: Request) {
  DBConnect();

  const results = await categoryModel.find({}).populate({
    path: "createdBy",
    select:"name"
  });

  console.log("GET",results);
  

  return NextResponse.json({ success: true, message: "Done", results });
}



// 5:30