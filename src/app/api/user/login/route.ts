import { connectDB } from "@/db/connect";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                message: "Either of the field is missing",
                success: false
            }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "User is not registered",
                success: false
            }, { status: 400 });
        }

        const isCorrect = await bcryptjs.compare(password, user.password);

        if (!isCorrect) {
            return NextResponse.json({
                message: "Password is incorrect",
                success: false
            }, { status: 400 });
        }

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const userInfo = await User.findOne({ email }).select("-password -isVerified -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry");

        const res = NextResponse.json({
            message: "User logged in successfully",
            user: userInfo,
            success: true,
        }, { status: 200 });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: true
        });

        return res;

    } catch (error: any) {
        return NextResponse.json({
            message: "Error while logging in",
            error: error.message,
            success: false
        }, { status: 400 });
    }
}