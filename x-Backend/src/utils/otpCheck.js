import nodemailer from 'nodemailer'
import otpStore from '../otpStore.js';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    // user: "bot54231h@gmail.com",
    // pass: "ukbmsvkhuahjzths",

  }


})


const sendCodeAndCheck = (email) => {

  if (!email) {
    return
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
  const expires = Date.now() + 10 * 60 * 1000;
  console.log(otpCode);


  otpStore.set(email, { otpCode, expires });


  const mailOptions = {
    from: `X <${process.env.EMAIL_USER}>`,
    to: `${email}`,
    subject: `${otpCode} is your verification code`,
    text: `Please enter this verification code to get started: ${otpCode}. Codes expire after two hours.`, // Plain text for email clients that don't render HTML


    html: `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <h1 style="font-size: 24px; font-weight: bold; color: #222; margin-top: 0;">Confirm your email address</h1>
        
        <p>There’s one quick step you need to complete before creating your account. Please enter this verification code to get started:</p>
        
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 30px 0; padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
          ${otpCode}
        </div>
        
        <p style="font-size: 14px; color: #555;">Verification codes expire after two hours.</p>
        
        <p style="margin-top: 30px;">Thanks,<br>The X Team</p>

        <p style="font-size: 10px color: #373737ff " > This is a not a offical x Team this is meant for testing purposes </p>
        
      </div>
    </div>
  `,
  };

  const sendMail = async () => {
    try {
      await transporter.sendMail(mailOptions);

      // console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error
    }
  };

  sendMail()
  

}


export default sendCodeAndCheck