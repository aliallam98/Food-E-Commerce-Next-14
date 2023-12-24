import userModel from "@/libs/models/User";
import { hash } from "@/libs/hashAndCompare";
import DBConnect from "@/libs/mongoDBConntect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let { name,email, password } = await req.json();
  

  //Connect to DB
  await DBConnect();

  //Check email exist before or not
  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist)
    return NextResponse.json({ success: false, message: "Email Already in use" },{status:409});

  //hash password
  password = hash({ plainText: password });


  const createdUser = await userModel.create({name, email, password });

  return NextResponse.json({
    success: true,
    message: "Done",
    results: createdUser,
  },{status:201});
}
