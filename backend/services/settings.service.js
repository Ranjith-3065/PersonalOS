const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// tarnsport creation for the sending mail 
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.USER,
            pass:process.env.PASS
        }
    })
// otp sending to mail using sendmail function
const sendmail= async(to,otp)=>{
    await transport.sendMail({
        from:"personalOS <no-reply@personalOS.com>",
        to,
        subject:"your otp for email verify",
        html:`
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        
        <!-- Card -->
        <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.08); padding:32px;">
          
          <!-- Header -->
          <tr>
            <td align="center">
              <h2 style="margin:0; color:#111827;">Email Verification</h2>
              <p style="margin:10px 0 0; color:#6b7280; font-size:14px;">
                PersonalOS Security
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:20px 0;">
              <hr style="border:none; border-top:1px solid #e5e7eb;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td align="center">
              <p style="color:#374151; font-size:15px; line-height:1.6; margin:0 0 18px;">
                Use the OTP below to verify your email address.
                This code is valid for a short time only.
              </p>

              <!-- OTP Box -->
              <div style="
                display:inline-block;
                background:#f9fafb;
                border:1px dashed #2563eb;
                border-radius:10px;
                padding:14px 28px;
                font-size:32px;
                font-weight:700;
                letter-spacing:6px;
                color:#2563eb;
                margin:10px 0 20px;
              ">
                ${otp}
              </div>

              <p style="color:#6b7280; font-size:13px; margin:0;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>

        <!-- Footer -->
        <p style="margin-top:18px; color:#9ca3af; font-size:12px;">
          © PersonalOS • Secure Account System
        </p>

      </td>
    </tr>
  </table>

</body>
</html>

        `
    })
}
//sending link to mail using sendmail function with the help of transport variable created using nodemailer of keyword createtransport
const sendmaillink= async(to,link)=>{
    await transport.sendMail({
        from:"personalOS <no-reply@personalOS.com>",
        to,
        subject:"your otp for email verify",
        html:`
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        
        <!-- Card -->
        <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.08); padding:32px;">
          
          <!-- Header -->
          <tr>
            <td align="center">
              <h2 style="margin:0; color:#111827;">Email Verification</h2>
              <p style="margin:10px 0 0; color:#6b7280; font-size:14px;">
                PersonalOS Security
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:20px 0;">
              <hr style="border:none; border-top:1px solid #e5e7eb;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td align="center">
              <p style="color:#374151; font-size:15px; line-height:1.6; margin:0 0 18px;">
                Use the OTP below to verify your email address.
                This code is valid for a short time only.
              </p>

              <!-- OTP Box -->
              <div style="
                display:inline-block;
                background:#f9fafb;
                border:1px dashed #2563eb;
                border-radius:10px;
                padding:14px 28px;
                font-size:32px;
                font-weight:700;
                letter-spacing:6px;
                color:#2563eb;
                margin:10px 0 20px;
              ">
                ${link}
              </div>

              <p style="color:#6b7280; font-size:13px; margin:0;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>

        <!-- Footer -->
        <p style="margin-top:18px; color:#9ca3af; font-size:12px;">
          © PersonalOS • Secure Account System
        </p>

      </td>
    </tr>
  </table>

</body>
</html>

        `
    })
}



module.exports = {
    sendmail,
    sendmaillink
};