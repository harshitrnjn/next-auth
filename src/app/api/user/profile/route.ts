import { connectDB } from "@/db/connect";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "@/utils/getDataToken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const id = await getDataToken(request);

    // console.log(id)

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized User" },
        { status: 400 }
      );
    }

    const user = await User.findById(id).select("-password");

    // const user = await User.findOne({_id: id}).select("-password")

    // console.log(user)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // console.log("User fetched Successfully") 

    return NextResponse.json(
      {
        message: "User fetched successfully",
        user: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching user details" },
      { status: 500 }
    );
  }
}
