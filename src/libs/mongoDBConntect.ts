import mongoose from "mongoose";


const DBConnect = async()=>{
   await mongoose.connect(`${process.env.DB_URL}`).catch(() => console.log("DB Error"));
}

export default DBConnect