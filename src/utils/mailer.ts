import { User } from "@/model/user.model";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const token = uuidv4();

    const time = Date.now() + 3600000;

    if (emailType === "VERIFY") {
       await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: time,
        },
      });
      console.log("verifyToken Set")
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: time,
        },
      });
    }


    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "66e1fe59e9de03",
        pass: "f4a40555993913",
      },
    });

    const mailOptions = {
      from: "themalhotras2380@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      // text: emailType === "VERIFY" ? "Verification Email" : "", // plain text body
      html: ` <p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}" ><button> ${emailType} </button></a> to ${emailType} your email id or copy the url "${process.env.DOMAIN}/verifyemail?token=${token}" valid till ${time} </p> `,
    };

    const response = await transport.sendMail(mailOptions);

    return response;


  } catch (error: any) {
    return NextResponse.json({
      message: "Error in sending mail",
    });
  }
};
