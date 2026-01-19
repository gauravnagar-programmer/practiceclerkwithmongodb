import mongoose from "mongoose";

const MONGO_CONN = process.env.MONGO_URL

let cashed = global.mongoose
if(!cashed){
  cashed = global.mongoose = { conn: null, promise: null }
}




export default async function Connection (){
  if(cashed.conn) return cashed.conn

  if(!cashed.promise){
    cashed.promise = mongoose.connect(MONGO_CONN,{
      bufferCommands: false,
    })
  }

  cashed.conn = await cashed.promise
  return cashed.conn

}