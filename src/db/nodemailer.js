import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"biswajit.nayak@kickrtechnologies.com",
        pass:"Nayak@7452"
    }
})