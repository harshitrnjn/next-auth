import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //get the token from the url , now only with the body
  //check the token from the db
  //isVerified : true
  //return the response

  const reqBody = await request.json();
  const { token } = reqBody;

  const alreadyVerifiedUser = await User.findOne({
    verifyToken: token,
    isVerified: true,
  });

  if (alreadyVerifiedUser) {
    return NextResponse.json(
      {
        message: "You have already verified your account",
        success: false,
      },
      { status: 200 }
    );
  } else {
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized Spam detected",
        },
        { status: 400 }
      );
    }

    const userVerified = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          isVerified: true,
          verifyToken: null,
          verifyTokenExpiry: null,
        },
      },
      { new: true }
    ).select("-password -verifyToken -verifyTokenExpiry");

    if (!userVerified) {
      return NextResponse.json(
        {
          message: "Erro while Verifying the user",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "User Verified Successfully",
        user: userVerified,
        success: true,
      },
      { status: 200 }
    );
  }
}
