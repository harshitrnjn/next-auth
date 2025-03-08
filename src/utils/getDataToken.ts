import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const getDataToken = async ( request : NextRequest ) => {

    try {
        const token = request.cookies?.get("token")?.value || ""

        const decodedToken : any = jwt.verify( token , process.env.TOKEN_SECRET! )

        return decodedToken._id
        
    } catch (error) {
        return NextResponse.json({message: "Error while fetching  the token from cookies"}, {status: 500})
    }

}