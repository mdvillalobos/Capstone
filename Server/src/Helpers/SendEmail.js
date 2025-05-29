import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import VerificationToken from '../Models/VerificationToken.js';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    }
});

export const sendEmailVerification = async (email) => {
    try {
        const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
        console.log(otp);

        const [ HashedOTP, userRecord ] = await Promise.all([
            bcrypt.hash(otp, 12),
            VerificationToken.findOne({ owner: email })
        ])

        if(!userRecord) {
            await VerificationToken.create({
                owner: email,
                Otp: HashedOTP
            })
        }
        
        else {
            await VerificationToken.updateOne({ owner: email }, { Otp: HashedOTP })
        }

        await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: 'Email Verification',
            html: 
                `<style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
                    * {
                        font-family: 'Poppins', sans-serif;
                        padding: 0px;
                        margin: 0;
                        box-sizing: border-box;
                    }

                    .tae {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 10px;
                    }
                    .otp {
                        text-align: center;
                        border: 1px solid #93adc2;
                        padding: 8px 3rem;
                        border-radius: 8px;
                        color: #41518d;
                    }
                </style>
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; padding: 0;">
                    <div style="border: 1px solid #ddd; border-radius: 0.375rem; padding: 1.25rem; max-width: 400px; width: 100%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                        <h2 style="text-align: center; color:#41518d; font-size: 2.3rem; margin: 1rem 0px 1rem;">Email Verification</h2>
                        <p style="font-size: 0.875rem; color: #666; text-align: center; margin-bottom: 1rem; ">Please use this PIN to verify your email address.</p>
                        <div class="tae">
                            <h1 class="otp">${otp}</h1>
                        </div>

                        <footer style="font-size: 2rem; color: #999; text-align: center;">
                            <p>Thank you!</p>
                        </footer>
                    </div>
                </div>`
        })

    } catch (error) {
        console.log(error)
    }
}

export const sendApplicationResponse = async (email, name, applyingFor, message) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: `Application for Re-ranking: ${name} - ${applyingFor}`,
            html: `
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
                    * {
                        font-family: 'Poppins', sans-serif;
                        box-sizing: border-box;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        padding: 2rem;
                        border: 1px solid #ddd;
                        border-radius: 0.5rem;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                        background-color: #fff;
                    }
                    h2 {
                        color: #41518d;
                        text-align: center;
                        margin-bottom: 1rem;
                    }
                    p {
                        color: #444;
                        font-size: 0.95rem;
                        line-height: 1.6;
                    }
                    ul {
                        padding-left: 1rem;
                        color: #444;
                    }
                    li {
                        margin-bottom: 0.75rem;
                    }
                    footer {
                        margin-top: 2rem;
                        text-align: center;
                        font-size: 0.85rem;
                        color: #999;
                    }
                </style>
                <div class="container">
                    <h2>Application for Re-ranking</h2>
                    <p>Dear ${name},</p>
                    <p>This is in reference to your application for <strong>${applyingFor}</strong>.</p>
                    ${message}
                    <footer>
                        <p>Thank you for your interest and application.</p>
                    </footer>
                </div>
            `
        });

    } catch (error) {
        console.log(error)
    }
}




