import nodemailer from "nodemailer";


 export const sendMail=async(email,subject,template)=>{

try{
    const config=nodemailer.createTransport({
        // service:"gmail",

        host:"smtp.gmail.com",
        port:"465",
        secure:true,
        family:4,
        auth :{
            user:process.env.SENDER_EMAIL,
            pass:process.env.SENDER_PASSWORD,
        }
    });
    const option = {
        from:process.env.SENDER_EMAIL,
        to:email,
        subject:subject,
        html:template
    }

    await config.sendMail(option);
    return true;


}  catch(err){
    console.log("mail err",err);
    return false;
}
}