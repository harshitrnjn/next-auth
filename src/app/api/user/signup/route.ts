import { connectDB } from "@/db/connect";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const userExist = await User.findOne({ username });

    if (userExist) {
      return NextResponse.json({
        status: 409, // Use 409 Conflict for existing user
        message: "User  already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const registeredUser  = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser  = await User.findById(registeredUser ._id).select("-password");

    if (!savedUser ) {
      return NextResponse.json({
        message: "Failed to save user",
      });
    }

    // console.log(savedUser );

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser ._id });

    return NextResponse.json(
      {
        message: "User  registered successfully",
        user: savedUser ,
        success: true,
        mail: `Verification mail sent to your mail ${email}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
    
  }
}