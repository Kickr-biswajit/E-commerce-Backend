import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    host:process.env.HOST || "smtp.hostinger.com",
    port:Number(process.env.PORTMAIL),
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.PASSWORD
    }
})
console.log('/////////',process.env.EMAIL_USER);

export default transporter; 