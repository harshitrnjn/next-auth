import mongoose from "mongoose";

export const connectDB = async () => {
   try {
     const result = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
     const connection = result.connection

     connection.on("connected", () => {
      console.log(`MONGO-DB CONNECTED !! ${connection}`)
     })

     connection.on("error", (err) => {
      console.log("MONGO-DB CONNECTION ERROR :: DB IS DOWN :: " + err)
      process.exit(1)
     })
    
    } catch (error) {
    console.log("Error while connecting MONGO-DB : ", error)
   }
}