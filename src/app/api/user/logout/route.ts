import { connectDB } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET( request : NextRequest) {

    try {

        const res = NextResponse.json({
            message: "User logged out successfully"
        }, {status: 200})

        res.cookies.set("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        })

        return res
        
    } catch (error) {
        return NextResponse.json({
            message: "Error in logging out"
        }, {status: 400})
    }

}